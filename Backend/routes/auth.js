const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

// Login route with validation
router.post(
  "/login",
  [
    body("username", "Username is required").notEmpty(),
    body("password", "Password is required").notEmpty(),
  ],
  validate,
  login
);

router.get("/test", (req, res) => {
  res.send("Auth route is working!");
});

module.exports = router;