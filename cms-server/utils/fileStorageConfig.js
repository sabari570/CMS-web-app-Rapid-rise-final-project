const multer = require("multer");

// multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploaded_files");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now().toString() + "-" + file.originalname;
    cb(null, fileName);
  },
});

// defining the type of file and file size acceptable
const upload = multer({
  storage: storage,
  limits: {
    // limiting file size to 3MB
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = {
        code: "INVALID_FILE_TYPE",
        message: "Invalid file type. Only JPEG, JPG and PNG files are allowed",
      };
      cb(error, false);
    }
  },
}).single("profilePic");

// Middleware to handle multer errors
const multerErrorHandler = (err, req, res, next) => {
  console.log("Error in handler: ", err);
  if (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res
          .status(415)
          .json({ error: { message: "File size exceeds the 3MB limit" } });
      } else {
        res.status(415).json({ error: { message: err.message } });
      }
    } else if (err.code === "INVALID_FILE_TYPE") {
      res.status(415).json({ error: { message: err.message } });
    } else {
      res.status(500).json({
        error: {
          message: "An unknown error occurred while uploading the file",
        },
      });
    }
  } else {
    next();
  }
};

const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) next(err);
    else next();
  });
};

module.exports = { upload, multerErrorHandler, handleFileUpload };
