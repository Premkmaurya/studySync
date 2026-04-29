const noteModel = require("../models/note.model");
const savedNoteModel = require("../models/savedNote.model");
const {
  buildCacheKey,
  getCachedData,
  setCachedData,
  invalidateByPrefix,
} = require("../services/cache.service");

async function createNote(req, res) {
  const user = req.user;

  const { content, title, groupId } = req.body;

  await noteModel.create({
    userId: user.id,
    groupId,
    content,
    title,
  });

  await Promise.all([
    invalidateByPrefix("notes:latest"),
    invalidateByPrefix(`notes:group:${groupId}`),
    invalidateByPrefix(`notes:user:${user.id}`),
    invalidateByPrefix("notes:search"),
  ]);

  return res.status(201).json({
    message: "your note created successfully.",
  });
}

async function getNotes(req, res) {
  const { field, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const cacheKey = buildCacheKey("notes:latest", `${field || "none"}:p${page}`);
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  let filter = {};
  if (field) {
    const groupModel = require("../models/group.model");
    const groups = await groupModel.find({ field }).select("_id");
    const groupIds = groups.map((g) => g._id);
    filter.groupId = { $in: groupIds };
  }

  const notes = await noteModel
    .find(filter)
    .skip(Number(skip))
    .limit(Number(limit))
    .populate("userId", "fullname")
    .populate("groupId")
    .sort({ createdAt: -1 });

  const payload = {
    message: "notes fetch successfully.",
    notes,
  };

  await setCachedData(cacheKey, payload, 60);

  return res.status(200).json(payload);
}

async function getNoteById(req, res) {
  const { groupId } = req.params;
  const cacheKey = buildCacheKey("notes:group", groupId);
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  const note = await noteModel
    .find({ groupId: groupId })
    .sort({ createdAt: -1 })
    .populate("userId", "fullname")
    .populate("groupId")
    .lean();

  if (!note) {
    return res.status(200).json({
      message: "Note fetched successfully.",
      note: [],
    });
  }

  const payload = {
    message: "Note fetched successfully.",
    note,
  };

  await setCachedData(cacheKey, payload, 120);

  return res.status(200).json(payload);
}

async function getMyNotes(req, res) {
  const user = req.user;
  const cacheKey = buildCacheKey("notes:user", user.id);
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  const notes = await noteModel
    .find({ userId: user.id })
    .populate("groupId")
    .sort({ createdAt: -1 });
  const payload = {
    message: "your notes fetch successfully.",
    notes,
  };

  await setCachedData(cacheKey, payload, 90);

  return res.status(200).json(payload);
}

async function searchNotes(req, res) {
  const { q, groupId } = req.query;
  const cacheKey = buildCacheKey(
    "notes:search",
    `${q ? `q:${q}` : ""}${groupId ? `:group:${groupId}` : ""}`,
  );
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  let filter = {};
  if (q) {
    filter.$text = { $search: q.toLowerCase() };
  }
  if (groupId) {
    filter.groupId = groupId;
  }

  try {
    if (field) {
      const groupModel = require("../models/group.model");
      const groups = await groupModel.find({ field }).select("_id");
      const groupIds = groups.map((g) => g._id);
      filter.groupId = { $in: groupIds };
    }

    const notes = await noteModel
      .find(filter)
      .skip(Number(skip))
      .limit(Number(limit))
      .populate("userId", "fullname")
      .populate("groupId")
      .sort({ createdAt: -1 });

    const payload = { notes };
    await setCachedData(cacheKey, payload, 45);

    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching notes", error });
  }
}

async function saveNote(req, res) {
  const user = req.user;
  const { noteId, groupId } = req.body;

  
  const note = await noteModel.findById(noteId);

  if (!note) {
    return res.status(404).json({
      message: "Note not found.",
    });
  }

  const isAlreadySaved = await savedNoteModel.findOne({
    userId: user.id,
    noteId,
    groupId,
  });

  if (isAlreadySaved) {
    await savedNoteModel.deleteOne({ _id: isAlreadySaved._id });
    await invalidateByPrefix(`notes:saved:${user.id}`);

    return res.status(200).json({
      message: "Note unsaved successfully.",
    });
  }

  await savedNoteModel.create({
    userId: user.id,
    noteId,
    groupId,
  });

  await invalidateByPrefix(`notes:saved:${user.id}`);

  return res.status(200).json({
    message: "Note saved successfully.",
  });
}

async function getSavedNotes(req, res) {
  const user = req.user;
  const cacheKey = buildCacheKey("notes:saved", user.id);
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  const savedNotes = await savedNoteModel
    .find({ userId: user.id })
    .populate("userId", "fullname")
    .populate("noteId")
    .populate("groupId")
    .sort({ createdAt: -1 });

  const payload = {
    message: "Your saved notes fetched successfully.",
    savedNotes,
  };

  await setCachedData(cacheKey, payload, 90);

  return res.status(200).json(payload);
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
