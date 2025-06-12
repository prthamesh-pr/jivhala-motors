const Vehicle = require("../models/Vehicle");
const cloudinary = require("../config/cloudinary");

exports.addVehicle = async (req, res) => {
  try {
    const files = req.files;
    const imageUrls = [];

    // Collect Cloudinary URLs from multer-storage-cloudinary
    for (const file of files) {
      imageUrls.push(file.path); // file.path is the Cloudinary URL
    }

    const vehicle = new Vehicle({ ...req.body, images: imageUrls });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ message: "Failed to add vehicle", error: err.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("buyer");
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch vehicles", error: err.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete vehicle", error: err.message });
  }
};