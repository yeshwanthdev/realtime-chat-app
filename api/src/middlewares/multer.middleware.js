const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

// Middlewares
module.exports = {
  uploadSingleFile: (fieldName) => upload.single(fieldName),
  uploadMultipleFiles: (fieldName, maxCount = 5) =>
    upload.array(fieldName, maxCount),
  rawMulterInstance: upload,
};
