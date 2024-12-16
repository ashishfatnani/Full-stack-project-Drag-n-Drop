const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const formRoutes = require("./routes/formRoutes");
const authRoutes = require("./routes/authRoutes");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API routes
app.use("/api/forms", formRoutes);

// Authentication
app.use("/", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
