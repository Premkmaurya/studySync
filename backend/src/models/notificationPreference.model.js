const mongoose = require("mongoose");

const notificationPreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
      index: true,
    },
    groupMessages: {
      type: Boolean,
      default: true,
    },
    groupActivities: {
      type: Boolean,
      default: true,
    },
    notesAndKnowledge: {
      type: Boolean,
      default: true,
    },
    aiNotifications: {
      type: Boolean,
      default: true,
    },
    systemErrors: {
      type: Boolean,
      default: true,
    },
    academicActivities: {
      type: Boolean,
      default: true,
    },
    browserNotifications: {
      type: Boolean,
      default: false,
    },
    soundNotifications: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const notificationPreferenceModel = mongoose.model(
  "notificationPreference",
  notificationPreferenceSchema
);

module.exports = notificationPreferenceModel;
