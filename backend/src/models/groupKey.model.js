const mongoose = require("mongoose");

const groupKeyEnvelopeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  encryptedGroupKey: {
    type: String,
    required: true,
  },
});

const groupKeySchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group",
      required: true,
    },
    keyVersion: {
      type: Number,
      default: 1,
    },
    envelopes: [groupKeyEnvelopeSchema],
  },
  { timestamps: true }
);

groupKeySchema.index({ group: 1, keyVersion: 1 }, { unique: true });

const groupKeyModel = mongoose.model("groupKey", groupKeySchema);
module.exports = groupKeyModel;
