const { promises: fsPromises } = require("fs");
const path = require("path");
const {
  listFiles: fileList,
  errorResponse,
  asyncHandler,
} = require("../handlers/index");

module.exports = {
  // endpoint controller functions goes here
  getAllFiles: asyncHandler(async (req, res, next) => {
    let data = await fileList();
    res.json({
      status: true,
      data,
    });
  }),

  getOneFile: asyncHandler(async (req, res, next) => {
    let fileName = req.params.id;
    let data = await fileList();
    let file = data.filter((item) => item.filename == fileName);
    if (!file || file.length < 1) {
      return next(errorResponse("Error: Resource not found", 404));
    }

    res.json({
      status: true,
    });
  }),

  uploadFile: asyncHandler(async (req, res, next) => {
    // run express file upload to handle file uploading
  }),

  downloadFile: asyncHandler(async (req, res, next) => {
    let fileName = req.params.id;
    let filePath = path.resolve(__dirname, "..", "files", fileName);
    res.download(filePath, fileName);
  }),

  deleteFile: asyncHandler(async (req, res, next) => {
    let fileName = req.params.id;
    let filePath = path.resolve(__dirname, "..", "files", fileName);
    await fsPromises.unlink(fileName);
    res.json({
      status: true,
    });
  }),
};
