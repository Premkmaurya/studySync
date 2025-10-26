const groupModel = require("../models/group.model");

async function getAllGroups(req, res) {
  const groups = await groupModel.find();
  return res.status(200).json({
    groups,
  });
}

async function createGroup(req, res) {
  const { name, description } = req.body;
  const user = req.user;

  const group = await groupModel.create({
    name,
    description,
    owner: user.id,
  });

  return res.status(201).json({
    message: "Group created successfully",
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
  const group = await groupModel.findOneAndUpdate(
    { _id: groupId },
    { $addToSet: { members: user.id } },
    { new: true }
  );
  if (!group) {
    return res.status(400).json({
      message: "Group not found",
    });
  }
  return res.status(200).json({
    message: "Joined group successfully",
    group,
  }); 
}

module.exports = {
  createGroup,
  getGroups,
  deleteGroup,
  getAllGroups,
  updateGroup,
};
