const mongoose = require("mongoose");

const joinGroupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    required: true,
  },
});

const joinGroupModel = mongoose.model("joinGroup", joinGroupSchema);

module.exports = joinGroupModel;
