// controllers/authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOtpEmail } = require('../utility/emailService');

//Generate JWT Token
const createToken = (user) => {
  return jwt.sign (
    {id: user._id},
    process.env.JWT_SECRET,
    {expiresIn: '1h'}
    );
};


// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password)
    return res.status(400).json({ message: 'All the fields are required'});

    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return res.status(400).json({ message: 'Email already exists' });

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) 
      return res.status(400).json({ message: 'Phone number already exists' });

    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const user = await User.create({
      name,
      email,
      phone,
      password,
      otp,
      otpExpires
    });

    await sendOtpEmail(email, otp);

    res.status(201).json({ 
      message: 'User registered. Verify OTP sent to email',
      _id: user._id,
      email: user.email
       });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) 
      return res.status(400).json({ message: 'User not found' });

    if (user.otp !== otp)
      return res.status(400).json({ message: 'Invalid OTP' });

    if(user.otpExpires < Date.now()) 
      return res.status(400).json({ message: 'Expired OTP' });


    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.json({ 
      message: 'Account verified successfully',
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: createToken(user)
       });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Resend OTP
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(!email)
      return res.status(400).json({ message: 'Email is required'});

    if (!user) 
      return res.status(400).json({ message: "User not found" });

    if (user.isVerified) 
      return res.status(400).json({ message: "Account already verified" });

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 min

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOtpEmail(email, otp);

    res.json({ 
      message: "New OTP sent to email",
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) 
      return res.status(400).json({ message: "User not found" });

    if (!user.isVerified) 
      return res.status(400).json({ message: "Verify account first" });

    if ( !(await user.matchPassword(password)) ) 
      return res.status(401).json({ message: 'Invalid credentials' }); 
    
    res.json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      phone: user.phone,
      token: createToken(user) 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
