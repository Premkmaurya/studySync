const noteModel = require("../models/note.model");

async function createNote(req, res) {
  const user = req.user;

  const { content, title } = req.body;

  const note = await noteModel.create({
    userId: user.id,
    content,
    title,
  });

  return res.status(201).json({
    message: "your note created successfully.",
  });
}

async function getNotes(req, res) {
  const notes = await noteModel
    .find({})
    .populate("userId", "fullname")
    .sort({ createdAt: -1 });
  return res.status(200).json({
    message: "notes fetch successfully.",
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
    const notes = await noteModel.find(filter).skip(0).populate("userId", "fullname").sort({ createdAt: -1 });
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching notes", error });
  }
}

module.exports = {
  createNote,
  getNotes,
  searchNotes,
};
