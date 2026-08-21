const userModel = require("../models/user.model");
const groupModel = require("../models/group.model");
const joinGroupModel = require("../models/joinGroup.model");
const groupKeyModel = require("../models/groupKey.model");
const asyncHandler = require("../utils/asyncHandler");

// 1. Update User Public Key
const updatePublicKey = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { publicKey } = req.body;

  if (!publicKey) {
    return res.status(400).json({ message: "Public key is required" });
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { publicKey },
    { new: true }
  ).select("-password");

  return res.status(200).json({
    message: "Public key updated successfully",
    publicKey: updatedUser.publicKey,
  });
});

// 2. Get Group Key Envelopes & Member Public Keys
const getGroupKeys = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user.id;

  const group = await groupModel.findById(groupId);
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  const isOwner = group.owner && group.owner.toString() === userId;
  const isMember = await joinGroupModel.findOne({ userId, groupId });

  if (!isOwner && !isMember) {
    return res.status(403).json({ message: "Access denied: Not a member of this group" });
  }

  // Get current user's envelope
  const groupKeyRecord = await groupKeyModel.findOne({ group: groupId }).sort({ keyVersion: -1 });

  let myEnvelope = null;
  if (groupKeyRecord && groupKeyRecord.envelopes) {
    const found = groupKeyRecord.envelopes.find(
      (env) => env.userId.toString() === userId.toString()
    );
    if (found) {
      myEnvelope = {
        keyVersion: groupKeyRecord.keyVersion,
        encryptedGroupKey: found.encryptedGroupKey,
      };
    }
  }

  // Fetch all group members' public keys so client can wrap key for new/missing members if needed
  const memberDocs = await joinGroupModel.find({ groupId }).select("userId");
  const memberUserIds = memberDocs.map((m) => m.userId);
  if (group.owner) memberUserIds.push(group.owner);

  const membersWithKeys = await userModel
    .find({ _id: { $in: memberUserIds } })
    .select("_id fullname publicKey");

  return res.status(200).json({
    groupId,
    keyVersion: groupKeyRecord ? groupKeyRecord.keyVersion : 1,
    myEnvelope,
    members: membersWithKeys,
  });
});

// 3. Save / Provision Group Key Envelopes
const saveGroupKeys = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const { keyVersion = 1, envelopes } = req.body;
  const userId = req.user.id;

  if (!Array.isArray(envelopes) || envelopes.length === 0) {
    return res.status(400).json({ message: "Envelopes array is required" });
  }

  const group = await groupModel.findById(groupId);
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  const isOwner = group.owner && group.owner.toString() === userId;
  const isMember = await joinGroupModel.findOne({ userId, groupId });

  if (!isOwner && !isMember) {
    return res.status(403).json({ message: "Access denied: Not a member of this group" });
  }

  let record = await groupKeyModel.findOne({ group: groupId, keyVersion });
  if (!record) {
    record = new groupKeyModel({
      group: groupId,
      keyVersion,
      envelopes: [],
    });
  }

  // Merge incoming envelopes into existing envelopes array
  for (const newEnv of envelopes) {
    if (!newEnv.userId || !newEnv.encryptedGroupKey) continue;
    const existingIndex = record.envelopes.findIndex(
      (env) => env.userId.toString() === newEnv.userId.toString()
    );
    if (existingIndex !== -1) {
      record.envelopes[existingIndex].encryptedGroupKey = newEnv.encryptedGroupKey;
    } else {
      record.envelopes.push({
        userId: newEnv.userId,
        encryptedGroupKey: newEnv.encryptedGroupKey,
      });
    }
  }

  await record.save();

  return res.status(200).json({
    message: "Group key envelopes saved successfully",
    keyVersion: record.keyVersion,
    count: record.envelopes.length,
  });
});

module.exports = {
  updatePublicKey,
  getGroupKeys,
  saveGroupKeys,
};
