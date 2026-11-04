const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const notificationController = require("../controllers/notification.controller");

const router = express.Router();

// Fetch paginated notifications
router.get("/", authMiddleware, notificationController.getNotifications);

// Fetch unread count
router.get("/unread-count", authMiddleware, notificationController.getUnreadCount);

// Preferences
router.get("/preferences", authMiddleware, notificationController.getPreferences);
router.patch("/preferences", authMiddleware, notificationController.updatePreferences);

// AI Health status
router.get("/ai-status", authMiddleware, notificationController.getAiStatus);

// Mark read
router.patch("/read-all", authMiddleware, notificationController.markAllAsRead);
router.patch("/:id/read", authMiddleware, notificationController.markAsRead);

// Deletions
router.delete("/:id", authMiddleware, notificationController.deleteNotification);
router.delete("/", authMiddleware, notificationController.clearAllNotifications);

// Dev / test triggering endpoint
router.post("/test-event", authMiddleware, notificationController.triggerTestNotification);

module.exports = router;
