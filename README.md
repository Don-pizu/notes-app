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
├── models/
├── routes/ 
├── middleware/
├── config/
├── tests/
├── server.js
├── .env
├── .gitignore
└── README.md


## Technologies used
-Node.js
-Express.js
-MongoDB
-JWT Authentication
-Bcrypt.js (password hashing)
-dotenv (environment variables)
-Helmet, Express-rate-limit, Mongo-sanitize, XSS-clean


## Author name

-Asiru Adedolapo

## Stage, Commit, and Push**

``bash
git add .
git commit -m "feat: initial project setup with folder structure and README"
git branch -M main
git remote add origin https://github.com/Don-pizu/notes-app.git
git push -u origin main

