const mongoose = require("mongoose");
const notificationModel = require("../models/notification.model");
const notificationPreferenceModel = require("../models/notificationPreference.model");
const notificationService = require("../services/notification.service");
const aiHealthService = require("../services/aiHealth.service");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Get paginated notifications for current user with optional category & unread filters
 */
const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 15, category, unreadOnly } = req.query;

  const query = { userId };

  if (unreadOnly === "true" || unreadOnly === true) {
    query.isRead = false;
  }

  if (category && category !== "all") {
    query.category = category;
  }

  const skip = (Math.max(1, parseInt(page, 10)) - 1) * Math.max(1, parseInt(limit, 10));
  const parsedLimit = Math.min(50, Math.max(1, parseInt(limit, 10)));

  const [notifications, total, unreadCount] = await Promise.all([
    notificationModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit)
      .populate("senderId", "fullname profilePicture")
      .populate("groupId", "name image")
      .lean(),
    notificationModel.countDocuments(query),
    notificationModel.countDocuments({ userId, isRead: false }),
  ]);

  return res.status(200).json({
    notifications,
    total,
    page: parseInt(page, 10),
    totalPages: Math.ceil(total / parsedLimit) || 1,
    unreadCount,
  });
});

/**
 * Get unread notification count
 */
const getUnreadCount = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const unreadCount = await notificationModel.countDocuments({
    userId,
    isRead: false,
  });

  return res.status(200).json({ unreadCount });
});

/**
 * Mark a single notification as read
 */
const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid notification ID" });
  }

  const notification = await notificationService.markAsRead(id, userId);

  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  return res.status(200).json({
    message: "Notification marked as read",
    notification,
  });
});

/**
 * Mark all notifications as read for current user
 */
const markAllAsRead = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await notificationService.markAllAsRead(userId);

  return res.status(200).json({
    message: "All notifications marked as read",
  });
});

/**
 * Delete a single notification
 */
const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid notification ID" });
  }

  const deleted = await notificationService.deleteNotification(id, userId);

  if (!deleted) {
    return res.status(404).json({ message: "Notification not found" });
  }

  return res.status(200).json({
    message: "Notification deleted successfully",
  });
});

/**
 * Clear all notifications for current user
 */
const clearAllNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await notificationService.clearAllNotifications(userId);

  return res.status(200).json({
    message: "All notifications cleared",
  });
});

/**
 * Get current user notification preferences
 */
const getPreferences = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const preferences = await notificationService.getUserPreferences(userId);

  return res.status(200).json({ preferences });
});

/**
 * Update current user notification preferences
 */
const updatePreferences = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const allowedKeys = [
    "groupMessages",
    "groupActivities",
    "notesAndKnowledge",
    "aiNotifications",
    "systemErrors",
    "academicActivities",
    "browserNotifications",
    "soundNotifications",
  ];

  const updateData = {};
  allowedKeys.forEach((key) => {
    if (typeof req.body[key] === "boolean") {
      updateData[key] = req.body[key];
    }
  });

  const preferences = await notificationPreferenceModel.findOneAndUpdate(
    { userId },
    { $set: updateData },
    { new: true, upsert: true }
  );

  return res.status(200).json({
    message: "Notification preferences updated successfully",
    preferences,
  });
});

/**
 * Get real-time AI service health status
 */
const getAiStatus = asyncHandler(async (req, res) => {
  const status = aiHealthService.getStatus();
  return res.status(200).json({ status });
});

/**
 * Test event trigger endpoint (for verifying all notification categories)
 */
const triggerTestNotification = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { category = "system", type, title, message, priority = "medium" } = req.body;

  const validTypes = {
    group: "group_update",
    notes: "note_create",
    ai: "ai_task_completed",
    system: "system_alert",
    academic: "academic_quiz",
    message: "group_message",
  };

  const notification = await notificationService.notifyUser({
    userId,
    type: type || validTypes[category] || "system_alert",
    category,
    title: title || `Test ${category} Notification`,
    message: message || `This is a test notification verifying the ${category} pipeline.`,
    priority,
    metadata: { isTest: true },
  });

  return res.status(201).json({
    message: "Test notification generated successfully",
    notification,
  });
});

module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  getPreferences,
  updatePreferences,
  getAiStatus,
  triggerTestNotification,
};
