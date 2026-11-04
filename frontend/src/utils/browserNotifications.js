/**
 * Browser Desktop Notifications Helper
 */

export const isBrowserNotificationSupported = () => {
  return typeof window !== "undefined" && "Notification" in window;
};

export const getBrowserNotificationPermission = () => {
  if (!isBrowserNotificationSupported()) return "denied";
  return Notification.permission;
};

export const requestBrowserNotificationPermission = async () => {
  if (!isBrowserNotificationSupported()) return false;
  try {
    const result = await Notification.requestPermission();
    return result === "granted";
  } catch (err) {
    console.error("Error requesting browser notification permission:", err);
    return false;
  }
};

export const showDesktopNotification = ({ title, message, actionUrl, icon = "/img/icon.png" }) => {
  if (!isBrowserNotificationSupported()) return null;
  if (Notification.permission !== "granted") return null;

  try {
    const notification = new Notification(title, {
      body: message,
      icon,
      badge: icon,
      silent: true, // We handle sound via our custom synthesized chime
    });

    notification.onclick = () => {
      window.focus();
      if (actionUrl) {
        window.location.href = actionUrl;
      }
      notification.close();
    };

    return notification;
  } catch (err) {
    console.warn("Could not display desktop notification:", err);
    return null;
  }
};
