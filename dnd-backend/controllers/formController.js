const Form = require("../models/Form");
const User = require("../models/User");

// Save a new form
const saveForm = async (req, res) => {
  try {
    const { form_name, form_data } = req.body;
    const userId = req.user.userId;

    // Validation
    if (!form_name || !form_data) {
      return res
        .status(400)
        .json({ error: "Form name and form data are required." });
    }

    const newForm = new Form({ form_name, form_data, createdBy: userId });
    await newForm.save();
    await User.findByIdAndUpdate(userId, { $push: { forms: newForm._id } });

    res
      .status(201)
      .json({ message: "Form saved successfully.", form: newForm });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ error: "Failed to save form." });
  }
};

// Get all forms by a user
const getForms = async (req, res) => {
  const userId = req.user.userId;
  try {
    const forms = await Form.find({ createdBy: userId });
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
    const userId = req.user.userId;
    const form = await Form.find({
      id,
      createdBy: userId,
    });

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
    const userId = req.user.userId;
    const { form_name, form_data } = req.body;

    const isFormPresent = await Form.findById(
      id
      // { form_name, form_data },
      // { new: true }
    );

    if (!isFormPresent) {
      return res.status(404).json({ error: "Form not found." });
    }
    // Check if the logged-in user is the creator of the form
    if (isFormPresent.createdBy.toString() !== userId) {
      return res.status(403).send("You are not authorized to edit this form");
    }

    // Update the form
    isFormPresent.form_name = form_name || isFormPresent.form_name;
    isFormPresent.form_data = form_data || isFormPresent.form_data;
    await isFormPresent.save();

    res
      .status(200)
      .json({ message: "Form updated successfully.", form: isFormPresent });
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ error: "Failed to update form." });
  }
};

// Delete a form
const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const deletedForm = await Form.findById(id);

    if (!deletedForm) {
      return res.status(404).json({ error: "Form not found." });
    }
    // Check if the logged-in user is the creator of the form
    if (deletedForm.createdBy.toString() !== userId) {
      return res.status(403).send("You are not authorized to delete this form");
    }
    await Form.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { forms: id } });

    res.status(200).json({ message: "Form deleted successfully." });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ error: "Failed to delete form." });
  }
};

module.exports = { saveForm, getForms, getFormById, updateForm, deleteForm };
