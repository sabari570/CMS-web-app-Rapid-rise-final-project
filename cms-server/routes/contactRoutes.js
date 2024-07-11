const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  fetchContacts,
  fetchContactById,
  updateContactById,
  createContact,
  changeContactAvatarById,
  deleteContactById,
} = require("../controllers/contactController");
const {
  handleFileUpload,
  multerErrorHandler,
} = require("../utils/fileStorageConfig");

const router = Router();

// route for fetching contacts with pagination
router.get("/fetch-contacts", authMiddleware, fetchContacts);

// route for fetching a single contact detail with id
router.get("/fetch-contact/:id", authMiddleware, fetchContactById);

// route for creating a contact
router.post(
  "/create-contact",
  authMiddleware,
  handleFileUpload,
  multerErrorHandler,
  createContact
);

// route for updating contact by id
router.patch("/update-contact/:id", authMiddleware, updateContactById);

// route for updating profilePic of contact
router.patch(
  "/change-contact-avatar/:id",
  authMiddleware,
  handleFileUpload,
  multerErrorHandler,
  changeContactAvatarById
);

// route for deleting a contact by id
router.delete("/delete-contact/:id", authMiddleware, deleteContactById);

module.exports = router;
