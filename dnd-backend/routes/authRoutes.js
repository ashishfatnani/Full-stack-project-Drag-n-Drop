const express = require("express");
const { login, register } = require("../controllers/authController");
const router = express.Router();

// Define routes
router.post("/login", login); // Login Route
router.post("/register", register); // Register route

module.exports = router;
