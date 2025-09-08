//routes/noteRoutes.js

const express = require('express');
const router = express.Router();
const { createNote, getAllNotes, getNote, updateNote, deleteNote } = require('../controllers/noteController');
const {protect} = require('../middleware/authMiddleware');

router.post('/note', protect, createNote);
router.get('/note', protect, getAllNotes );
router.get('/note/:id', protect, getNote);
router.put('/note/:id', protect, updateNote);
router.delete('/note/:id', protect, deleteNote)

module.exports = router;
