const Form = require("../models/Form");

// Save a new form
const saveForm = async (req, res) => {
  try {
    const { form_name, form_data } = req.body;

    // Validation
    if (!form_name || !form_data) {
      return res
        .status(400)
        .json({ error: "Form name and form data are required." });
    }

    const newForm = new Form({ form_name, form_data });
    await newForm.save();

    res
      .status(201)
      .json({ message: "Form saved successfully.", form: newForm });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ error: "Failed to save form." });
  }
};

// Get all forms
const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "Failed to fetch forms." });
  }
};

// Get a specific form by ID
const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ error: "Form not found." });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ error: "Failed to fetch form." });
  }
};

// Update an existing form
const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { form_name, form_data } = req.body;

    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { form_name, form_data },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ error: "Form not found." });
    }

    res
      .status(200)
      .json({ message: "Form updated successfully.", form: updatedForm });
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ error: "Failed to update form." });
  }
};

// Delete a form
const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ error: "Form not found." });
    }

    res.status(200).json({ message: "Form deleted successfully." });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ error: "Failed to delete form." });
  }
};

module.exports = { saveForm, getForms, getFormById, updateForm, deleteForm };
