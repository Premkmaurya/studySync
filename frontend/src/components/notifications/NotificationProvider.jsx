import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSocket } from "../../services/socket";
import {
  addRealtimeNotification,
  setUnreadCount,
  setAiStatus,
  addToast,
  fetchUnreadCount,
  fetchPreferences,
  fetchAiStatus,
} from "../../features/notifications/notificationsSlice";
import NotificationPanel from "./NotificationPanel";
import NotificationSettings from "./NotificationSettings";
import NotificationToastContainer from "./NotificationToast";
import { playNotificationSound } from "../../utils/notificationSound";
import { showDesktopNotification } from "../../utils/browserNotifications";

export const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const preferences = useSelector((state) => state.notifications.preferences);
  const isSettingsOpen = useSelector((state) => state.notifications.isSettingsOpen);
  const wasDisconnectedRef = useRef(false);

  const preferencesRef = useRef(preferences);
  useEffect(() => {
    preferencesRef.current = preferences;
  }, [preferences]);

  // Initial data load when user logs in
  useEffect(() => {
    if (user) {
      dispatch(fetchUnreadCount());
      dispatch(fetchPreferences());
      dispatch(fetchAiStatus());
    }
  }, [user, dispatch]);

  // Listen for decoupled toast events from outside React/Redux context (api, sockets)
  useEffect(() => {
    const handleCustomToast = (event) => {
      if (event?.detail) {
        dispatch(addToast(event.detail));
      }
    };
    window.addEventListener("studysync:toast", handleCustomToast);
    return () => window.removeEventListener("studysync:toast", handleCustomToast);
  }, [dispatch]);

  // Real-time socket event binding
  useEffect(() => {
    if (!user) return;

    const socket = getSocket();

    const handleNewNotification = (notification) => {
      if (!notification) return;

      dispatch(addRealtimeNotification(notification));

      const currentPrefs = preferencesRef.current;

      // Play audio chime if enabled
      if (currentPrefs?.soundNotifications !== false) {
        playNotificationSound();
      }

      // Show desktop browser notification if enabled
      if (currentPrefs?.browserNotifications === true) {
        showDesktopNotification({
          title: notification.title,
          message: notification.message,
          actionUrl: notification.metadata?.actionUrl,
        });
      }

      // Determine toast style variant
      let variant = "info";
      if (notification.type === "ai_error" || notification.type === "system_error") {
        variant = "error";
      } else if (
        notification.type === "ai_service_recovered" ||
        notification.type === "ai_task_completed"
      ) {
        variant = "success";
      } else if (
        notification.type === "ai_service_outage" ||
        notification.type === "ai_timeout" ||
        notification.type === "ai_long_running"
      ) {
        variant = "warning";
      }

      // Enqueue toast
      dispatch(
        addToast({
          id: `toast_${notification._id || Date.now()}`,
          title: notification.title,
          message: notification.message,
          category: notification.category,
          variant,
          actionUrl: notification.metadata?.actionUrl,
          duration: 5000,
        })
      );
    };

    const handleUnreadCount = (data) => {
      if (typeof data?.unreadCount === "number") {
        dispatch(setUnreadCount(data.unreadCount));
      }
    };

    const handleAiStatus = (data) => {
      if (!data) return;
      dispatch(setAiStatus(data));

      if (data.isRecovery) {
        dispatch(
          addToast({
            title: "AI Service Recovered",
            message: "Syncie and AI operations are back online and fully operational.",
            variant: "success",
            category: "ai",
          })
        );
      } else if (data.status === "unavailable") {
        dispatch(
          addToast({
            title: "AI Service Outage",
            message: "Syncie AI is currently unavailable. Retrying in background...",
            variant: "error",
            category: "ai",
          })
        );
      }
    };

    const handleSystemAlert = (data) => {
      if (!data) return;
      dispatch(
        addToast({
          title: data.title || "System Alert",
          message: data.message || "Important system notification.",
          variant: data.priority === "urgent" || data.priority === "high" ? "warning" : "info",
          category: "system",
        })
      );
    };

    const handleConnect = () => {
      if (wasDisconnectedRef.current) {
        wasDisconnectedRef.current = false;
        dispatch(
          addToast({
            title: "Connected",
            message: "Real-time sync restored.",
            variant: "success",
            duration: 3000,
          })
        );
        dispatch(fetchUnreadCount());
      }
    };

    const handleDisconnect = (reason) => {
      if (reason !== "io client disconnect") {
        wasDisconnectedRef.current = true;
      }
    };

    // Attach listeners
    socket.on("notification:new", handleNewNotification);
    socket.on("notification:unread-count", handleUnreadCount);
    socket.on("ai:status", handleAiStatus);
    socket.on("system:alert", handleSystemAlert);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("notification:new", handleNewNotification);
      socket.off("notification:unread-count", handleUnreadCount);
      socket.off("ai:status", handleAiStatus);
      socket.off("system:alert", handleSystemAlert);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [user, dispatch]);

  return (
    <>
      {children}
      <NotificationPanel />
      {isSettingsOpen && <NotificationSettings />}
      <NotificationToastContainer />
    </>
  );
};

export default NotificationProvider;
