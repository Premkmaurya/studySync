const groupModel = require("../models/group.model");
const userGroupModel = require("../models/joinGroup.model");
const noteModel = require("../models/note.model");
const aiMessageModel = require("../models/aiMessage.model");
const groupChatsModel = require("../models/groupChats.model");
const savedNoteModel = require("../models/savedNote.model");
const uploadImage = require("../services/image.service");
const {
  buildCacheKey,
  getCachedData,
  setCachedData,
  invalidateByPrefix,
} = require("../services/cache.service");

async function getAllGroups(req, res) {
  const cacheKey = buildCacheKey("groups:all:limit10");
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  const groups = await groupModel.find().skip(0).limit(10);
  const payload = { groups };

  await setCachedData(cacheKey, payload, 90);

  return res.status(200).json(payload);
}

async function searchGroup(req, res) {
  const { q = "" } = req.query;
  const cacheKey = buildCacheKey("groups:search", q.trim().toLowerCase());
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  let filter = {};
  if (q) {
    filter.$text = { $search: q };
  }
  try {
    const groups = await groupModel.find(filter).skip(0);
    const payload = { groups };
    await setCachedData(cacheKey, payload, 60);

    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products", error });
  }
}

async function searchGroupById(req, res) {
  const { id } = req.params;
  const cacheKey = buildCacheKey("groups:single", id);
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  const group = await groupModel.findById(id).lean();
  if (!group) {
    return res.status(400).json({
      message: "no group found.",
    });
  }

  const payload = {
    message: "group found successfully.",
    group,
  };

  await setCachedData(cacheKey, payload, 120);

  return res.status(200).json(payload);
}

async function createGroup(req, res) {
  const { name, description } = req.body;
  const image = req.file;
  const user = req.user;
  let response = {};
  if (image) {
    response = await uploadImage(image.buffer);
  }
  const group = await groupModel.create({
    name,
    description,
    image: response.url,
    owner: user.id,
    members: 1,
  });
  await userGroupModel.create({
    userId: user.id,
    groupId: group._id,
  });

  await Promise.all([
    invalidateByPrefix("groups:all"),
    invalidateByPrefix("groups:search"),
    invalidateByPrefix(`groups:my:${user.id}`),
    invalidateByPrefix(`groups:joined:${user.id}`),
    invalidateByPrefix(`groups:suggested:${user.id}`),
  ]);

  return res.status(201).json({
    group,
  });
}

async function getGroups(req, res) {
  const user = req.user;
  const cacheKey = buildCacheKey("groups:my", user.id);
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  const groups = await groupModel.find({ owner: user._id });
  const payload = { groups };

  await setCachedData(cacheKey, payload, 120);

  return res.status(200).json(payload);
}

async function deleteGroup(req, res) {
  const { groupId } = req.params;
  const user = req.user;

  const group = await groupModel.findOne({
    _id: groupId,
    owner: user.id,
  });

  if (!group) {
    return res.status(404).json({
      message: "Group not found or you are not the owner",
    });
  }

  const notes = await noteModel.find({ groupId }, "_id");
  const noteIds = notes.map((note) => note._id);

  await noteModel.deleteMany({ groupId });
  await aiMessageModel.deleteMany({ groupId });
  await groupChatsModel.deleteMany({ group: groupId });
  await savedNoteModel.deleteMany({ noteId: { $in: noteIds } });
  await userGroupModel.deleteMany({ groupId });
  await groupModel.findByIdAndDelete(groupId);

  await Promise.all([
    invalidateByPrefix("groups:all"),
    invalidateByPrefix("groups:search"),
    invalidateByPrefix(`groups:single:${groupId}`),
    invalidateByPrefix(`groups:my:${user.id}`),
    invalidateByPrefix(`groups:members:${groupId}`),
    invalidateByPrefix("messages:group"),
    invalidateByPrefix(`notes:group:${groupId}`),
    invalidateByPrefix("notes:latest"),
    invalidateByPrefix("notes:search"),
  ]);

  return res.status(200).json({
    message: "Group and all related data deleted successfully",
  });
}

async function updateGroup(req, res) {
  const { groupId } = req.params;
  const { name, description, field } = req.body;
  const user = req.user;

  if (!groupId || groupId.length < 24) {
    return res.status(400).json({
      message: "Invalid group ID",
    });
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (field) updateData.field = field;

  const group = await groupModel.findOneAndUpdate(
    {
      _id: groupId,
      owner: user.id,
    },
    updateData,
    { new: true }
  );

  if (!group) {
    return res.status(404).json({
      message: "Group not found or you don't have permission to update it",
    });
  }

  await Promise.all([
    invalidateByPrefix("groups:all"),
    invalidateByPrefix("groups:search"),
    invalidateByPrefix(`groups:single:${groupId}`),
    invalidateByPrefix(`groups:my:${user.id}`),
  ]);

  return res.status(200).json({
    message: "Group updated successfully",
    group,
  });
}

async function joinGroup(req, res) {
  const { groupId } = req.params;
  const user = req.user;

  const isUserExist = await userGroupModel.findOne({
    userId: user.id,
    groupId,
  });

  if (isUserExist) {
    return res.status(200).json({
      message: "you already joined.",
    });
  }

  await userGroupModel.create({
    userId: user.id,
    groupId,
  });
  const group = await groupModel.findByIdAndUpdate(
    groupId,
    {
      $inc: { members: 1 },
    },
    { new: true }
  );

  await Promise.all([
    invalidateByPrefix("groups:all"),
    invalidateByPrefix("groups:search"),
    invalidateByPrefix(`groups:single:${groupId}`),
    invalidateByPrefix(`groups:joined:${user.id}`),
    invalidateByPrefix(`groups:suggested:${user.id}`),
    invalidateByPrefix(`groups:members:${groupId}`),
  ]);

  return res.status(200).json({
    message: "Joined group successfully",
    group,
  });
}

async function joinedGroup(req, res) {
  const user = req.user;
  const cacheKey = buildCacheKey("groups:joined", user.id);
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  const groups = await userGroupModel.find({ userId: user.id });
  if (!groups) {
    return res.status(400).json({
      message: "you didn't join any group yet.",
    });
  }

  const groupDetails = await groupModel.find({
    _id: { $in: groups.map((g) => g.groupId) },
  });

  const payload = {
    message: "groups fetched successfully.",
    groups: groupDetails,
  };

  await setCachedData(cacheKey, payload, 90);

  return res.status(200).json(payload);
}

async function getGroupMembers(req, res) {
  try {
    const { groupId } = req.query;
    if (
      !groupId ||
      groupId === "undefined" ||
      groupId === "preview-node" ||
      groupId === "nexus-01"
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or missing groupId", members: [] });
    }

    const cacheKey = buildCacheKey("groups:members", groupId);
    const cached = await getCachedData(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const members = await userGroupModel
      .find({ groupId })
      .populate("userId", "fullname")
      .sort({ createdAt: -1 });

    if (!members) {
      return res.status(404).json({
        message: "no members found.",
        members: [],
      });
    }

    const payload = {
      message: "members fetch successfully.",
      members,
    };

    await setCachedData(cacheKey, payload, 60);

    res.status(200).json(payload);
  } catch (error) {
    console.error("Error in getGroupMembers:", error);
    res
      .status(500)
      .json({ message: "Internal server error fetching members", error: error.message });
  }
}

async function getSuggestedGroups(req, res) {
  const user = req.user;
  const cacheKey = buildCacheKey("groups:suggested", user.id);
  const cached = await getCachedData(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  try {
    const joinedGroupsRecords = await userGroupModel.find({ userId: user.id });

    if (joinedGroupsRecords.length === 0) {
      const allGroups = await groupModel.find().limit(5).sort({ members: -1 });
      const payload = {
        message: "No groups joined yet. Here are popular groups",
        fieldPercentages: {},
        suggestedGroups: allGroups,
      };

      await setCachedData(cacheKey, payload, 120);

      return res.status(200).json(payload);
    }

    const joinedGroupIds = joinedGroupsRecords.map((g) => g.groupId);
    const joinedGroups = await groupModel.find({ _id: { $in: joinedGroupIds } });

    const fieldCount = {};
    joinedGroups.forEach((group) => {
      const groupField = group.field || "Engineering";
      fieldCount[groupField] = (fieldCount[groupField] || 0) + 1;
    });

    const totalJoinedGroups = joinedGroups.length;
    const fieldPercentages = {};

    Object.keys(fieldCount).forEach((groupField) => {
      fieldPercentages[groupField] = Math.round(
        (fieldCount[groupField] / totalJoinedGroups) * 100
      );
    });

    const suggestedGroups = await groupModel.find({
      _id: { $nin: joinedGroupIds },
    });

    const sortedSuggestions = suggestedGroups.sort((a, b) => {
      const fieldA = a.field || "Engineering";
      const fieldB = b.field || "Engineering";
      const percentA = fieldPercentages[fieldA] || 0;
      const percentB = fieldPercentages[fieldB] || 0;
      return percentB - percentA;
    });

    const payload = {
      message: "Suggested groups fetched successfully",
      fieldPercentages,
      suggestedGroups: sortedSuggestions,
    };

    await setCachedData(cacheKey, payload, 120);

    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching suggested groups",
      error: error.message,
    });
  }
}

module.exports = {
  createGroup,
  getGroups,
  deleteGroup,
  getAllGroups,
  updateGroup,
  joinGroup,
  searchGroup,
  joinedGroup,
  getGroupMembers,
  searchGroupById,
  getSuggestedGroups,
};
