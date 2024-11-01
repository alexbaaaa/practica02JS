const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  type: { type: String, enum: ['normal', 'critica'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
