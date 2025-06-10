const express = require("express");
const router = express.Router();
const {
  getVehicles,
  addVehicle,
  deleteVehicle
} = require("../controllers/vehicleController");

const auth = require("../middleware/authMiddleware");
const { uploadMultiple } = require("../middleware/uploadMiddleware"); // <-- add this import

router.get("/", auth, getVehicles);

// Add this line for vehicle creation with multiple image upload
router.post("/", auth, uploadMultiple.array("images", 5), addVehicle);

router.delete("/:id", auth, deleteVehicle);

module.exports = router;