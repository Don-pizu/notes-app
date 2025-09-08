// app.js
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require ('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');


//configure and Load .env variables
dotenv.config();

//DB connect
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/auth', authRoutes);

module.exports = app;