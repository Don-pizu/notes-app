//contrpllers/noteController.js

const Note = require('../models/note');
const User = require('../models/User');

//POST  Create Note
exports.createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const user = req.user;

    //validate title 
    if (!title || !content) 
      return res.status(400).json({ message: 'Title and Content are required' });

    if (!user) 
      return res.status(401).json({ message: 'User not authenticated' });
    

  //fetch user data
  const dbUser = await User.findById(user._id);
  if (!dbUser) 
    return res.status(400).json({ message: 'User not found'});
    

    const note = await Note.create({
      user: dbUser._id,
      title,
      content,
      tags: tags || []
    });

    res.status(201).json({
      message: 'Note created successfully',
      note
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all notes (with optional tag filtering)
exports.getAllNotes = async (req, res) => {
  try {
    const { tag, tags } = req.query;
    const filter = { };

    if (tag) {
      filter.tags = tag;       // match single tag
    } else if (tags) {
      const arr = tags.split(',').map(t => t.trim()).filter(Boolean);
      if (arr.length) filter.tags = { $in: arr }; // match any tag
    }

    const notes = await Note.find(filter)
                                .populate('user', 'name')
                                .sort({ updatedAt: -1 });

    res.json(notes);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get single note by ID (only owner can view)
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
                                      .populate('user', 'name');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Update note (only owner can update)
exports.updateNote = async (req, res) => {
  try {

    const getNote = await Note.findById(req.params.id);

    if (!getNote) {
      return res.status(404).json({ message: 'Note not found'});
    } 

    //Check if accessing user is note owner
    const notOwner = getNote.user.toString() !== req.user._id.toString();   //note owerner  !== the user requesting

    if(notOwner)
      return res.status(403).json({ message: 'Not authorized to update note, only for post owner'});

    const { title, content, tags } = req.body;

    if(title)
      getNote.title = title;
    if(content)
      getNote.content = content;
    if(tags)
      getNote.tags = tags;

    await getNote.save();
    res.status(200).json(getNote);


  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete note (only owner can delete)
exports.deleteNote = async (req, res) => {
  try {
     const getNote = await Note.findById(req.params.id);

    if (!getNote) {
      return res.status(404).json({ message: 'Note not found'});
    } 

    //Check if accessing user is note owner
    const notOwner = getNote.user.toString() !== req.user._id.toString();   //note owerner  !== the user requesting

    if(notOwner)
      return res.status(403).json({ message: 'Not authorized to delete note, only for post owner'});

    //Delete Note
    await getNote.deleteOne();
    res.status(200).json({ message: 'Note deleted successfully'});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
