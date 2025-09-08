//routes/authRoutes.js

const express = require("express");
const router = express.Router();
const { signup, verifyOtp, resendOtp, login } = require("../controllers/authController");


router.post("/signup", signup);
router.post("/verifyOtp", verifyOtp);
router.post("/resendOtp", resendOtp);
router.post("/login", login);

module.exports = router;
