//models/note.js

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true, 
    index: true 
  },
    title: { 
    type: String, 
    required: true 
  },
    content: { 
    type: String, 
    required: true 
  },
    tags: { 
    type: [String], 
    default: [] 
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
