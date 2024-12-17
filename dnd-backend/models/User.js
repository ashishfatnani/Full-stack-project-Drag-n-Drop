// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  forms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form", // Reference to the Form model
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
