const noteModel = require("../models/note.model");
const savedNoteModel = require("../models/savedNote.model");

async function createNote(req, res) {
  const user = req.user;

  const { content, title, groupId } = req.body;

  const note = await noteModel.create({
    userId: user.id,
    groupId,
    content,
    title,
  });

  return res.status(201).json({
    message: "your note created successfully.",
  });
}

async function getNotes(req, res) {
  const notes = await noteModel.find({}).limit(10).sort({ createdAt: -1 });
  return res.status(200).json({
    message: "notes fetch successfully.",
    notes,
  });
}

async function getNoteById(req, res) {
  const { groupId } = req.params;
  const note = await noteModel
    .find({ groupId: groupId })
    .sort({ createdAt: -1 })
    .populate("userId", "fullname");
  if (!note) {
    return res.status(404).json({
      message: "Note not found.",
    });
  }
  return res.status(200).json({
    message: "Note fetched successfully.",
    note,
  });
}

async function getMyNotes(req, res) {
  const user = req.user;
  const notes = await noteModel
    .find({ userId: user.id })
    .sort({ createdAt: -1 });
  return res.status(200).json({
    message: "your notes fetch successfully.",
    notes,
  });
}

async function searchNotes(req, res) {
  const { q } = req.query;
  let filter = {};
  if (q) {
    filter.$text = { $search: q };
  }
  try {
    const notes = await noteModel
      .find(filter)
      .skip(0)
      .populate("userId", "fullname")
      .sort({ createdAt: -1 });
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching notes", error });
  }
}

async function saveNote(req, res) {
  const user = req.user;
  const { noteId } = req.params;

  const note = await noteModel.findById(noteId);

  if (!note) {
    return res.status(404).json({
      message: "Note not found.",
    });
  }
  if (note.userId.toString() === user.id.toString()) {
    return res.status(400).json({
      message: "You cannot save your own note.",
    });
  }

  const isAlreadySaved = await savedNoteModel.findOne({
    userId: user.id,
    noteId,
  });

  if (isAlreadySaved) {
    return res.status(400).json({
      message: "You have already saved this note.",
    });
  }

  await savedNoteModel.create({
    userId: user.id,
    noteId,
  });

  return res.status(200).json({
    message: "Note saved successfully.",
  });
}

async function getSavedNotes(req, res) {
  const user = req.user;
  const savedNotes = await savedNoteModel
    .find({ userId: user.id })
    .populate("userId", "fullname")
    .sort({ createdAt: -1 });
  return res.status(200).json({
    message: "Your saved notes fetched successfully.",
    savedNotes,
  });
}

module.exports = {
  createNote,
  getNotes,
  getMyNotes,
  saveNote,
  getNoteById,
  getSavedNotes,
  searchNotes,
};
