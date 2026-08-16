const messageModel = require("../models/groupChats.model");
const aiMessageModel = require("../models/aiMessage.model");
const {
  buildCacheKey,
  getCachedData,
  setCachedData,
} = require("../services/cache.service");
const asyncHandler = require("../utils/asyncHandler");

const getMessages = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const user = req.user;
  const cacheKey = buildCacheKey("messages:group", groupId);

  const cached = await getCachedData(cacheKey);
  if (cached) {
    return res.status(200).json({
      ...cached,
      userId: user.id,
    });
  }

  const chat = await messageModel
    .find({
      group: groupId,
    })
    .populate("user", "fullname");

  const payload = {
    message: "message find successfully.",
    chat,
  };

  await setCachedData(cacheKey, payload, 30);

  res.status(200).json({
    ...payload,
    userId: user.id,
  });
});

const getAiChats = asyncHandler(async (req, res) => {
  const { groupId, id } = req.params;

  const user = req.user;
  const cacheKey = buildCacheKey("aiChats:group", groupId);

  const cached = await getCachedData(cacheKey);
  if (cached) {
    return res.status(200).json({
      ...cached,
      userId: user.id,
    });
  }
  const chat = await aiMessageModel.find({
    noteId: id,
    groupId: groupId,
    userId: user.id,
  });
  const payload = {
    message: "AI chats find successfully.",
    chat,
  };

  await setCachedData(cacheKey, payload, 30);

  res.status(200).json({
    ...payload,
    userId: user.id,
  });
});

module.exports = {
  getMessages,
  getAiChats,
};
