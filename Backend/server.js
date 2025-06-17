// server.js

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "JivhalaMotors" // Optional: explicitly specify DB name
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Start the server only after DB connection is successful
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit process if DB connection fails
  });

// Optional: Graceful error handling for unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  process.exit(1);
});
