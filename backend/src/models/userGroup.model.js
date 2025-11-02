const mongoose = require("mongoose");

const userGroupSchema = new mongoose.Schema({
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

const userGroupModel = mongoose.model("userGroup", userGroupSchema);

module.exports = userGroupModel;
