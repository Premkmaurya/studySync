import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotifications,
  fetchUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  updatePreferences,
  setFilter,
  togglePanel,
  setPanelOpen,
  toggleSettings,
  setSettingsOpen,
  addToast,
} from "../features/notifications/notificationsSlice";

export const useNotifications = () => {
  const dispatch = useDispatch();
  const notificationsState = useSelector((state) => state.notifications);

  return {
    ...notificationsState,
    fetchNotifications: (params) => dispatch(fetchNotifications(params)),
    fetchUnreadCount: () => dispatch(fetchUnreadCount()),
    markAsRead: (id) => dispatch(markAsRead(id)),
    markAllAsRead: () => dispatch(markAllAsRead()),
    deleteNotification: (id) => dispatch(deleteNotification(id)),
    clearAllNotifications: () => dispatch(clearAllNotifications()),
    updatePreferences: (prefs) => dispatch(updatePreferences(prefs)),
    setFilter: (filter) => dispatch(setFilter(filter)),
    togglePanel: () => dispatch(togglePanel()),
    setPanelOpen: (isOpen) => dispatch(setPanelOpen(isOpen)),
    toggleSettings: () => dispatch(toggleSettings()),
    setSettingsOpen: (isOpen) => dispatch(setSettingsOpen(isOpen)),
    showToast: (toast) => dispatch(addToast(toast)),
  };
};

export default useNotifications;
