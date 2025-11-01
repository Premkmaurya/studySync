const groupModel = require("../models/group.model");
const uploadImage = require("../services/image.service");

async function getAllGroups(req, res) {
  const groups = await groupModel.find().skip(0).limit(10);
  return res.status(200).json({
    groups,
  });
}

async function searchGroup(req, res) {
  const { q } = req.qurey;
  let filter = {};
  if (q) {
    filter.$text = { $search: q };
  }
  try {
    const products = await productModel.find(filter).skip(0);
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products", error });
  }
}

async function createGroup(req, res) {
  const { name, description } = req.body;
  const image = req.file;
  const user = req.user;
  console.log(image);

  const response = await uploadImage(image.buffer);
  const group = await groupModel.create({
    name,
    description,
    image: response.url,
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
  joinGroup,
  searchGroup
};
