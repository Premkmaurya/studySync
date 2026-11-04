const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        // Group activities
        "group_message",
        "group_mention",
        "group_join",
        "group_leave",
        "group_member_add",
        "group_member_remove",
        "group_update",
        "group_delete",

        // Notes and knowledge
        "note_create",
        "note_update",
        "note_delete",
        "note_share",

        // Academic activities
        "academic_resource",
        "academic_quiz",
        "academic_quiz_completed",
        "academic_announcement",

        // AI assistant & Syncie
        "ai_task_completed",
        "ai_error",
        "ai_timeout",
        "ai_long_running",
        "ai_service_outage",
        "ai_service_recovered",

        // Application and system errors
        "system_error",
        "system_auth_expired",
        "system_network_error",
        "file_upload_error",
        "system_alert",
      ],
    },
    category: {
      type: String,
      required: true,
      enum: ["group", "notes", "ai", "system", "academic", "message"],
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    resourceType: {
      type: String,
      enum: ["group", "note", "ai", "system", "message", "academic", "user"],
      default: "system",
    },
    resourceId: {
      type: String,
      default: null,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group",
      default: null,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
    readAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for optimal queries and unread counting
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, category: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, createdAt: -1 });

// Automatically expire notifications older than 45 days
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 45 * 24 * 3600 });

const notificationModel = mongoose.model("notification", notificationSchema);

module.exports = notificationModel;
