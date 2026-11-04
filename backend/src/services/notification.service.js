const mongoose = require("mongoose");
const notificationModel = require("../models/notification.model");
const notificationPreferenceModel = require("../models/notificationPreference.model");
const joinGroupModel = require("../models/joinGroup.model");
const groupModel = require("../models/group.model");
const { getIO } = require("../sockets/socket.server");

class NotificationService {
  /**
   * Get user preferences or return default preferences
   */
  async getUserPreferences(userId) {
    try {
      let prefs = await notificationPreferenceModel.findOne({ userId });
      if (!prefs) {
        prefs = await notificationPreferenceModel.create({ userId });
      }
      return prefs;
    } catch (err) {
      console.error("[NotificationService] getUserPreferences error:", err);
      // Return safe defaults
      return {
        groupMessages: true,
        groupActivities: true,
        notesAndKnowledge: true,
        aiNotifications: true,
        systemErrors: true,
        academicActivities: true,
        browserNotifications: false,
        soundNotifications: true,
      };
    }
  }

  /**
   * Check if notification should be sent based on user preferences
   */
  shouldDeliver(preferences, category, priority = "medium") {
    // Critical security alerts or urgent priorities are always delivered
    if (priority === "urgent") return true;

    if (!preferences) return true;

    switch (category) {
      case "message":
        return preferences.groupMessages !== false;
      case "group":
        return preferences.groupActivities !== false;
      case "notes":
        return preferences.notesAndKnowledge !== false;
      case "ai":
        return preferences.aiNotifications !== false;
      case "system":
        return preferences.systemErrors !== false;
      case "academic":
        return preferences.academicActivities !== false;
      default:
        return true;
    }
  }

  /**
   * Create a single notification for a specific user
   */
  async notifyUser({
    userId,
    type,
    category,
    title,
    message,
    resourceType = "system",
    resourceId = null,
    groupId = null,
    senderId = null,
    priority = "medium",
    metadata = {},
  }) {
    try {
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return null;
      }

      const prefs = await this.getUserPreferences(userId);
      if (!this.shouldDeliver(prefs, category, priority)) {
        return null;
      }

      // Sanitize metadata - never allow sensitive keys
      const safeMetadata = { ...metadata };
      delete safeMetadata.token;
      delete safeMetadata.password;
      delete safeMetadata.apiKey;
      delete safeMetadata.GEMINI_API_KEY;

      const notification = await notificationModel.create({
        userId,
        type,
        category,
        title,
        message,
        resourceType,
        resourceId: resourceId ? String(resourceId) : null,
        groupId: groupId && mongoose.Types.ObjectId.isValid(groupId) ? groupId : null,
        senderId: senderId && mongoose.Types.ObjectId.isValid(senderId) ? senderId : null,
        priority,
        metadata: safeMetadata,
      });

      // Fetch populated notification for socket delivery
      const populated = await notificationModel
        .findById(notification._id)
        .populate("senderId", "fullname profilePicture")
        .populate("groupId", "name image")
        .lean();

      // Emit via Socket.IO
      const io = getIO();
      if (io) {
        const userRoom = `user:${userId}`;
        io.to(userRoom).emit("notification:new", populated);

        const unreadCount = await notificationModel.countDocuments({
          userId,
          isRead: false,
        });
        io.to(userRoom).emit("notification:unread-count", { unreadCount });
      }

      return populated;
    } catch (err) {
      console.error("[NotificationService] notifyUser error:", err);
      return null;
    }
  }

  /**
   * Distribute notifications to all members of a group (excluding the action initiator)
   */
  async notifyGroupMembers({
    groupId,
    excludeUserId = null,
    type,
    category = "group",
    title,
    message,
    resourceType = "group",
    resourceId = null,
    priority = "medium",
    metadata = {},
  }) {
    try {
      if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
        return [];
      }

      const [group, members] = await Promise.all([
        groupModel.findById(groupId).select("owner name").lean(),
        joinGroupModel.find({ groupId }).select("userId").lean(),
      ]);

      if (!group) return [];

      const recipientSet = new Set();

      // Add group owner
      if (group.owner) {
        recipientSet.add(group.owner.toString());
      }

      // Add joined members
      members.forEach((m) => {
        if (m.userId) {
          recipientSet.add(m.userId.toString());
        }
      });

      // Exclude sender / actor
      if (excludeUserId) {
        recipientSet.delete(excludeUserId.toString());
      }

      const recipientIds = Array.from(recipientSet);
      if (recipientIds.length === 0) return [];

      const enrichedMetadata = {
        groupName: group.name,
        ...metadata,
      };

      const promises = recipientIds.map((userId) =>
        this.notifyUser({
          userId,
          type,
          category,
          title,
          message,
          resourceType,
          resourceId: resourceId || groupId,
          groupId,
          senderId: excludeUserId,
          priority,
          metadata: enrichedMetadata,
        })
      );

      const results = await Promise.allSettled(promises);
      return results.filter((r) => r.status === "fulfilled" && r.value).map((r) => r.value);
    } catch (err) {
      console.error("[NotificationService] notifyGroupMembers error:", err);
      return [];
    }
  }

  /**
   * Mark a single notification as read
   */
  async markAsRead(notificationId, userId) {
    const notification = await notificationModel.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true, readAt: new Date() },
      { new: true }
    );

    if (notification) {
      const io = getIO();
      if (io) {
        const userRoom = `user:${userId}`;
        io.to(userRoom).emit("notification:read", {
          id: notification._id,
          readAt: notification.readAt,
        });

        const unreadCount = await notificationModel.countDocuments({
          userId,
          isRead: false,
        });
        io.to(userRoom).emit("notification:unread-count", { unreadCount });
      }
    }

    return notification;
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId) {
    const now = new Date();
    const result = await notificationModel.updateMany(
      { userId, isRead: false },
      { isRead: true, readAt: now }
    );

    const io = getIO();
    if (io) {
      const userRoom = `user:${userId}`;
      io.to(userRoom).emit("notification:read-all", { readAt: now });
      io.to(userRoom).emit("notification:unread-count", { unreadCount: 0 });
    }

    return result;
  }

  /**
   * Delete a single notification
   */
  async deleteNotification(notificationId, userId) {
    const deleted = await notificationModel.findOneAndDelete({
      _id: notificationId,
      userId,
    });

    if (deleted) {
      const io = getIO();
      if (io) {
        const userRoom = `user:${userId}`;
        io.to(userRoom).emit("notification:deleted", { id: notificationId });

        const unreadCount = await notificationModel.countDocuments({
          userId,
          isRead: false,
        });
        io.to(userRoom).emit("notification:unread-count", { unreadCount });
      }
    }

    return deleted;
  }

  /**
   * Clear all notifications for a user
   */
  async clearAllNotifications(userId) {
    const result = await notificationModel.deleteMany({ userId });

    const io = getIO();
    if (io) {
      const userRoom = `user:${userId}`;
      io.to(userRoom).emit("notification:deleted", { all: true });
      io.to(userRoom).emit("notification:unread-count", { unreadCount: 0 });
    }

    return result;
  }

  /**
   * Broadcast a system-wide alert to all connected sockets
   */
  broadcastSystemAlert({
    type = "system_alert",
    category = "system",
    title,
    message,
    priority = "high",
    metadata = {},
  }) {
    const io = getIO();
    if (io) {
      const alertPayload = {
        type,
        category,
        title,
        message,
        priority,
        metadata,
        createdAt: new Date().toISOString(),
      };
      io.emit("system:alert", alertPayload);
    }
  }
}

const notificationService = new NotificationService();
module.exports = notificationService;
