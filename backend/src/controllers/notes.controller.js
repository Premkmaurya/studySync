const noteModel = require("../models/note.model");
const savedNoteModel = require("../models/savedNote.model");
const groupModel = require("../models/group.model");
const userModel = require("../models/user.model");
const notificationService = require("../services/notification.service");
const {
  buildCacheKey,
  getCachedData,
  setCachedData,
  invalidateByPrefix,
} = require("../services/cache.service");
const asyncHandler = require("../utils/asyncHandler");

const createNote = asyncHandler(async (req, res) => {
  const user = req.user;
  const { content, title, groupId } = req.body;

  const note = await noteModel.create({
    userId: user.id,
    groupId,
    content,
    title,
  });

  // Distribute notification if associated with a group
  if (groupId) {
    const group = await groupModel.findById(groupId).select("name").lean();
    const groupName = group?.name || "Study Group";
    const authorName = user.fullname?.firstname || "A member";

    notificationService.notifyGroupMembers({
      groupId,
      excludeUserId: user.id,
      type: "note_create",
      category: "notes",
      title: `New note in ${groupName}`,
      message: `${authorName} added a new note: "${title}".`,
      resourceType: "note",
      resourceId: note._id.toString(),
      metadata: {
        actionUrl: `/group/${groupId}`,
        groupName,
        noteTitle: title,
      },
    });
  }

  await Promise.all([
    invalidateByPrefix("notes:latest"),
    invalidateByPrefix(`notes:group:${groupId}`),
    invalidateByPrefix(`notes:user:${user.id}`),
    invalidateByPrefix("notes:search"),
  ]);

  return res.status(201).json({
    message: "your note created successfully.",
    note,
  });
});

const updateNote = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { title, content } = req.body;

  const note = await noteModel.findById(id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  if (title) note.title = title;
  if (content) note.content = content;
  await note.save();

  if (note.groupId) {
    const group = await groupModel.findById(note.groupId).select("name").lean();
    const groupName = group?.name || "Study Group";
    const authorName = user.fullname?.firstname || "A member";

    notificationService.notifyGroupMembers({
      groupId: note.groupId,
      excludeUserId: user.id,
      type: "note_update",
      category: "notes",
      title: `Note updated: "${note.title}"`,
      message: `${authorName} updated notes in ${groupName}.`,
      resourceType: "note",
      resourceId: note._id.toString(),
      metadata: {
        actionUrl: `/group/${note.groupId}`,
        groupName,
        noteTitle: note.title,
      },
    });
  }

  await Promise.all([
    invalidateByPrefix("notes:latest"),
    invalidateByPrefix(`notes:group:${note.groupId}`),
    invalidateByPrefix(`notes:user:${user.id}`),
    invalidateByPrefix("notes:search"),
  ]);

  return res.status(200).json({
    message: "Note updated successfully",
    note,
  });
});

const deleteNote = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const note = await noteModel.findById(id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  const groupId = note.groupId;
  const noteTitle = note.title;

  await noteModel.findByIdAndDelete(id);
  await savedNoteModel.deleteMany({ noteId: id });

  if (groupId) {
    const group = await groupModel.findById(groupId).select("name").lean();
    const groupName = group?.name || "Study Group";

    notificationService.notifyGroupMembers({
      groupId,
      excludeUserId: user.id,
      type: "note_delete",
      category: "notes",
      title: `Note deleted in ${groupName}`,
      message: `"${noteTitle}" was deleted from ${groupName}.`,
      resourceType: "note",
      resourceId: id,
      metadata: {
        actionUrl: `/group/${groupId}`,
        groupName,
        noteTitle,
      },
    });
  }

  await Promise.all([
    invalidateByPrefix("notes:latest"),
    invalidateByPrefix(`notes:group:${groupId}`),
    invalidateByPrefix(`notes:user:${user.id}`),
    invalidateByPrefix("notes:search"),
  ]);

  return res.status(200).json({
    message: "Note deleted successfully",
  });
});

const shareNote = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { targetUserId } = req.body;

  const note = await noteModel.findById(id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  const targetUser = await userModel.findById(targetUserId);
  if (!targetUser) {
    return res.status(404).json({ message: "Recipient user not found" });
  }

  const senderName = user.fullname?.firstname || "A peer";

  notificationService.notifyUser({
    userId: targetUserId,
    type: "note_share",
    category: "notes",
    title: "Note shared with you",
    message: `${senderName} shared "${note.title}" with you.`,
    resourceType: "note",
    resourceId: note._id.toString(),
    senderId: user.id,
    priority: "medium",
    metadata: {
      actionUrl: `/dashboard/notes`,
      noteTitle: note.title,
      senderName,
    },
  });

  return res.status(200).json({
    message: "Note shared successfully",
  });
});

const createAcademicActivity = asyncHandler(async (req, res) => {
  const user = req.user;
  const { groupId, type = "academic_resource", title, message, actionUrl } = req.body;

  if (!groupId) {
    return res.status(400).json({ message: "GroupId is required" });
  }

  const group = await groupModel.findById(groupId).select("name").lean();
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  const senderName = user.fullname?.firstname || "A member";

  await notificationService.notifyGroupMembers({
    groupId,
    excludeUserId: user.id,
    type,
    category: "academic",
    title: title || `New academic resource in ${group.name}`,
    message: message || `${senderName} shared new study materials in ${group.name}.`,
    resourceType: "academic",
    resourceId: groupId,
    metadata: {
      actionUrl: actionUrl || `/group/${groupId}`,
      groupName: group.name,
      senderName,
    },
  });

  return res.status(201).json({
    message: "Academic activity broadcasted successfully",
  });
});

const getNotes = asyncHandler(async (req, res) => {
  const { field, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const cacheKey = buildCacheKey("notes:latest", `${field || "none"}:p${page}`);
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  let filter = {};
  if (field) {
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
});

const getNoteById = asyncHandler(async (req, res) => {
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
});

const getMyNotes = asyncHandler(async (req, res) => {
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
});

const searchNotes = asyncHandler(async (req, res) => {
  const { q, groupId, field, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

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

  if (field) {
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
});

const saveNote = asyncHandler(async (req, res) => {
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
});

const getSavedNotes = asyncHandler(async (req, res) => {
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
});

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  shareNote,
  createAcademicActivity,
  getNotes,
  getMyNotes,
  saveNote,
  getNoteById,
  getSavedNotes,
  searchNotes,
};
