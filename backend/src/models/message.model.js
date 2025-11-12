const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
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

const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
