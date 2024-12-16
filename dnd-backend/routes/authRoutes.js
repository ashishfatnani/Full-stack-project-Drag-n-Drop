const express = require("express");
const { login, register } = require("../controllers/authController");
const router = express.Router();

// Define routes
router.post("/login", login); // Login Route
router.get("/register", register); // Register route

module.exports = router;
