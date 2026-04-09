const mongoose = require('mongoose');

const savedNoteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'note',
        required: true
    },
    savedAt: {
        type: Date,
        default: Date.now
    }
});

const SavedNote = mongoose.model('savedNote', savedNoteSchema);

module.exports = SavedNote;