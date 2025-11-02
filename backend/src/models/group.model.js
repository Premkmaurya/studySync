const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    image: {
      type: String,
    },
    members: {
      type:Number,
      default:0,
      min:0
    },
    notes: {
      type: Number,
      default:0,
      min:0
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

groupSchema.index({ name: "text" });

const groupModel = mongoose.model("group", groupSchema);

module.exports = groupModel;
