const messageModel = require("../models/groupChats.model");
const {
  buildCacheKey,
  getCachedData,
  setCachedData,
} = require("../services/cache.service");

const getMessages = async (req, res) => {
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
};

module.exports = getMessages;
