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

async function searchGroupById(req,res){
  const {id} = req.params;
  const group = await groupModel.findById(id).lean();
  if(!group){
    return res.status(400).json({
      message:"no group found."
    })
  }
  return res.status(200).json({
    message:"group found successfully.",
    group
  })
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

  const groupDetails = await groupModel.find({ _id: { $in: groups.map(g => g.groupId) } });

  return res.status(200).json({
    message: "groups fetched successfully.",
    groups: groupDetails,
  });
}

async function getGroupMembers(req, res) {
  try {
    const { groupId } = req.query;
    if (!groupId || groupId === "undefined" || groupId === "preview-node" || groupId === "nexus-01") {
      return res.status(400).json({ message: "Invalid or missing groupId", members: [] });
    }

    const members = await userGroupModel
      .find({ groupId })
      .populate("userId", "fullname")
      .sort({ createdAt: -1 });

    if (!members) {
      return res.status(404).json({
        message: "no members found.",
        members: []
      });
    }

    res.status(200).json({
      message: "members fetch successfully.",
      members,
    });
  } catch (error) {
    console.error("Error in getGroupMembers:", error);
    res.status(500).json({ message: "Internal server error fetching members", error: error.message });
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
  searchGroupById
};
