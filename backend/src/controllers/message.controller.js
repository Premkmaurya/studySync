const messageModel = require("../models/groupChats.model");

const getMessages = async (req, res) => {
  const { groupId } = req.params;
  const user = req.user;

  const chat = await messageModel.find({
    group: groupId,
  }).populate("user","fullname");
  
  res.status(201).json({
    message: "message find successfully.",
    chat,
    userId:user.id
  });
};

module.exports = getMessages;
