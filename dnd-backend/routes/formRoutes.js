const express = require("express");
const {
  saveForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
} = require("../controllers/formController");

const authenticateJWT = require("../middlewares/authMiddleWare");

const router = express.Router();

// Define routes
router.post("/", authenticateJWT, saveForm); // Create a new form
router.get("/", authenticateJWT, getForms); // Get all forms
router.get("/:id", authenticateJWT, getFormById); // Get a specific form by ID
router.put("/:id", authenticateJWT, updateForm); // Update a form
router.delete("/:id", authenticateJWT, deleteForm); // Delete a form

module.exports = router;
