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
    message: {
      type: String,
      required: false,
      trim: true,
      maxlength: 2000,
    },
    ciphertext: {
      type: String,
      default: null,
    },
    iv: {
      type: String,
      default: null,
    },
    keyVersion: {
      type: Number,
      default: 1,
    },
    isEncrypted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const groupChatModel = mongoose.model("groupChat", groupChatSchema);
module.exports = groupChatModel;

