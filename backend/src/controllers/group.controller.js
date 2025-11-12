const groupModel = require("../models/group.model");
const userGroupModel = require("../models/userGroup.model");
const uploadImage = require("../services/image.service");
const messageModel = require("../models/message.model");

async function getAllGroups(req, res) {
  const groups = await groupModel.find().skip(0).limit(10);
  return res.status(200).json({
    groups,
  });
}

async function searchGroup(req, res) {
  const { q } = req.query;
  let filter = {};
  if (q) {
    filter.$text = { $search: q };
  }
  try {
    const groups = await groupModel.find(filter).skip(0);
    return res.status(200).json({ groups });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products", error });
  }
}

async function createGroup(req, res) {
  const { name, description } = req.body;
  const image = req.file;
  const user = req.user;
  let response = {};
  if(image){
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
  const io = req.app.get("io");

  io.emit("groupCreated", group);

  return res.status(201).json({
    group,
  });
}

async function getGroups(req, res) {
  const user = req.user;
  const groups = await groupModel.find({ owner: user._id });

  return res.status(200).json({
    groups,
  });
}

async function deleteGroup(req, res) {
  const { groupId } = req.params;
  const user = req.user;
  const group = await groupModel.findOneAndDelete({
    _id: groupId,
    owner: user.id,
  });

  if (!group) {
    return res.status(404).json({
      message: "Group not found",
    });
  }

  return res.status(200).json({
    message: "Group deleted successfully",
    group,
  });
}

async function updateGroup(req, res) {
  const { groupId } = req.params;
  const { name, description } = req.body;
  const image = req.file;
  const user = req.user;
  const group = await groupModel.findOneAndUpdate(
    {
      _id: groupId,
      owner: user.id,
    },
    {
      name,
      description,
    },
    { new: true }
  );

  if (!group) {
    return res.status(404).json({
      message: "Group not found",
    });
  }

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
  const io = req.app.get("io");

  io.emit("groupUpdated", group);

  return res.status(200).json({
    message: "Joined group successfully",
    group,
  });
}

async function joinedGroup(req, res) {
  const user = req.user;
  const groups = await userGroupModel.find({ userId: user.id });
  if (!groups) {
    return res.status(400).json({
      message: "you didn't join any group yet.",
    });
  }

  return res.status(200).json({
    message: "groups fetched successfully.",
    groups,
  });
}

async function getGroupMembers(req, res) {
  const { groupId } = req.query;
  const members = await userGroupModel
    .find({ groupId })
    .populate("userId", "fullname")
    .sort({ createdAt: -1 });

  if (!members) {
    return res.status(403).json({
      message: "no members found.",
    });
  }

  res.status(200).json({
    message: "members fetch successfully.",
    members,
  });
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
};
