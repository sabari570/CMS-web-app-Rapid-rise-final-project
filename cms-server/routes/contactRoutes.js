const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getContacts } = require("../controllers/contactController");

const router = Router();

// route for fetching contacts with pagination
router.get("/fetch-contacts", authMiddleware, getContacts);

module.exports = router;
