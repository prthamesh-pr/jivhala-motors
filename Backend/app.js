// app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const vehicleRoutes = require("./routes/vehicles");
const buyerRoutes = require("./routes/buyers");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Test route to check if server is running
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/buyers", buyerRoutes);

module.exports = app;
