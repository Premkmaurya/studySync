const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema(
  {
    encryptedContent: {
      ciphertext: { type: String, required: true },
      iv: { type: String, required: true },
      algorithm: { type: String, default: "AES-GCM" },
    },
    keyVersion: {
      type: Number,
      default: 1,
      min: 1,
    },
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
  { timestamps: true }
);

const groupChatModel = mongoose.model("groupChat", groupChatSchema);
module.exports = groupChatModel;
