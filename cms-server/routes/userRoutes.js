const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  fetchUserDetail,
  updateUserDetail,
  changeUserAvatar,
  dashboardData,
} = require("../controllers/userController");
const {
  handleFileUpload,
  multerErrorHandler,
} = require("../utils/fileStorageConfig");

const router = Router();

// route for fetching user profile details
router.get("/fetch-user-profile", authMiddleware, fetchUserDetail);

// route for updating user profile
router.patch("/update-user-profile", authMiddleware, updateUserDetail);

// route for updating user profile pic
router.patch(
  "/change-user-avatar",
  authMiddleware,
  handleFileUpload,
  multerErrorHandler,
  changeUserAvatar
);

// route for fetching totals section
router.get("/dashboard-data", authMiddleware, dashboardData);

module.exports = router;
