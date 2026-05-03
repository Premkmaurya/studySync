const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group",
      required: true,
    },
  },
  { timestamps: true },
);

const groupChatModel = mongoose.model("groupChat", groupChatSchema);
module.exports = groupChatModel;
