#  Note App

## Description
The Notes App API is a simple and efficient backend service for creating, organizing, and managing notes. It supports full CRUD operations, along with search and tagging features for easy categorization and retrieval of notes. This project is ideal for productivity applications and personal organization tools.

## Features
-User authentication & authorization with JWT

-Create, update, delete, and view notes

-Search notes by content or title

-Tagging system for organizing notes

-Protected routes for authenticated users

-RESTful API design

-Environment configuration with .env


## Installation & Usage

``bash
# Clone the repository
git clone https://github.com/Don-pizu/notes-app.git

# Navigate into the project folder
cd notes-app

# Install dependencies
npm install

# Start the server
node server.js

project-root/
├── controllers/
│   ├── authController.js
│   └── noteController.js
├── models/
│   ├── User.js
│   └── Note.js
├── routes/ 
│   ├── authRoutes.js
│   └── noteRoutes.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── tests/
├── utility/
│   └── emailService.js
├── server.js
├── .env
├── .gitignore
└── README.md

# API Routes
# Authentication Routes (/api/auth)
Method  	Endpoint	            Description
POST	   /auth/signup	          Register a new user (with OTP verification)
POST	   /auth/verifyOtp        Verify OTP for user signup
POST	   /auth/resendOtp	      Resend OTP if expired
POST	   /auth/login	          Login and receive JWT token


# Note Routes (/api/note)      (Protected – requires JWT)
Method	    Endpoint	             Description
POST	    /note	                 Create a new note
GET	        /note	                 Get all notes for the logged-in user
GET	        /note/:id	             Get a specific note by ID
PUT	        /note/:id	             Update a note (only by the owner)
DELETE	    /note/:id	             Delete a note (only by the owner)


## Technologies used
-Node.js
-Express.js
-MongoDB
-JWT Authentication
-Bcrypt.js (password hashing)
-dotenv (environment variables)
-Helmet, Express-rate-limit, Mongo-sanitize, XSS-clean


## Deployed link
  https://notes-app-55ha.onrender.com



## Author name

-Asiru Adedolapo

## Stage, Commit, and Push**

``bash
git add .
git commit -m "feat: initial project setup with folder structure and README"
git branch -M main
git remote add origin https://github.com/Don-pizu/notes-app.git
git push -u origin main

