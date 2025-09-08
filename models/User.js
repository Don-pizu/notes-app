// models/User.js

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');    // For hashing password

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
    required: true
  },
    email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
    phone: { 
    type: String,
    required:true,                 //it is needed
    unique: true,                  // must be unique for each users
    minlength: 11,                 
    maxLength: 11,
    validate: {
      validator: function (v) {
          return /^[0-9]{11}$/.test(v);  // only 11 digits allowed
        },
        message: "Phone number must be exactly 11 digits"
      }
  },
    password: { 
    type: String, 
    required: true,
    minlength: 6, 
  },
    isVerified: { 
    type: Boolean, 
    default: false 
  },
    otp: {
    type: String 
   },
    otpExpires: { 
    type: Date 
  }
  },
  { timestamps: true }
);

// Password hashing before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password'))
    return next();          /// If password id not change

  const salt = await bcrypt.genSalt(10);   //Generate salt
  this.password = await bcrypt.hash(this.password, salt);  //Hash password
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);     //using bcrypt to compare passwords
};

module.exports = mongoose.model("User", userSchema);
