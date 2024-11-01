const express = require('express');
const router = express.Router();
const Note = require('../models/Note.js');

// Obtener todas las notas
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Insertar una nueva nota
router.post('/', async (req, res) => {
  const note = new Note({
    type: req.body.type,
    content: req.body.content,
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
