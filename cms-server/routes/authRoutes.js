const { Router } = require("express");
const {
  login,
  regenerateToken,
  register,
  logout,
  loginSuccessController,
  fetchSessionMessage,
} = require("../controllers/authController.js");
const {
  handleFileUpload,
  multerErrorHandler,
} = require("../utils/fileStorageConfig.js");
const passport = require("passport");
const { CLIENT_URL } = require("../constants/constants.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = Router();

// route for registering user
router.post("/register", handleFileUpload, multerErrorHandler, register);

// route for logging users in
router.post("/login", login);

// route to handle successfull login while using passport
router.get("/login/success", loginSuccessController);

// route for logging in with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      console.log("Inside err: ", err);
      req.session.message = `Error while signing in using google: ${err}`;
      return res.redirect(`${CLIENT_URL}/login`); // Redirect to login on error
    }
    if (!user) {
      console.log("Inside !user: ", err);
      req.session.message = `Error while signing in using google: ${err}`;
      return res.redirect(`${CLIENT_URL}/login`); // Redirect to login if user is not found
    }

    loginSuccessController(req, res);
  })(req, res, next);
});

// route for re-generating token
router.post("/regenerate-token", regenerateToken);

// route for accessing the session message
router.get("/fetch-session", fetchSessionMessage);

// route for logging users out
router.get("/logout", authMiddleware, logout);

module.exports = router;
