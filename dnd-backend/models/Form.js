const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    form_name: { type: String, required: true },
    form_data: { type: mongoose.Schema.Types.Mixed, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User who created the form
      required: true,
    }, // JSON field for form structure
  },

  { timestamps: true } // Automatically adds `created_at` and `updated_at` fields
);

module.exports = mongoose.model("Form", formSchema);
