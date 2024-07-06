const { Router } = require("express");
const {
  login,
  regenerateToken,
  register,
  logout,
} = require("../controllers/authController.js");
const { upload, multerErrorHandler } = require("../utils/fileStorageConfig.js");

const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) next(err);
    else next();
  });
};

const router = Router();

// route for registering user
router.post("/register", handleFileUpload, multerErrorHandler, register);

// route for logging users in
router.post("/login", login);

// route for re-generating token
router.post("/regenerate-token", regenerateToken);

// route for logging users out
router.get("/logout", logout);

module.exports = router;
