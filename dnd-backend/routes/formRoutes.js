const express = require("express");
const {
  saveForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
} = require("../controllers/formController");

const router = express.Router();

// Define routes
router.post("/", saveForm); // Create a new form
router.get("/", getForms); // Get all forms
router.get("/:id", getFormById); // Get a specific form by ID
router.put("/:id", updateForm); // Update a form
router.delete("/:id", deleteForm); // Delete a form

module.exports = router;
