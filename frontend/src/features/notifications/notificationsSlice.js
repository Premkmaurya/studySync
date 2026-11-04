import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async ({ page = 1, limit = 15, category = "all", unreadOnly = false } = {}, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (category && category !== "all" && category !== "unread") {
        params.category = category;
      }
      if (category === "unread" || unreadOnly) {
        params.unreadOnly = true;
      }
      const response = await api.get("/notifications", { params });
      return { ...response.data, isNextPage: page > 1 };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchUnreadCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/notifications/unread-count");
      return response.data?.unreadCount || 0;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/notifications/${id}/read`);
      return response.data?.notification || { _id: id };
    } catch (err) {
      return rejectWithValue({ id, message: err.response?.data?.message || err.message });
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      await api.patch("/notifications/read-all");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/notifications/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue({ id, message: err.response?.data?.message || err.message });
    }
  }
);

export const clearAllNotifications = createAsyncThunk(
  "notifications/clearAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/notifications");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchPreferences = createAsyncThunk(
  "notifications/fetchPreferences",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/notifications/preferences");
      return response.data?.preferences;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updatePreferences = createAsyncThunk(
  "notifications/updatePreferences",
  async (preferences, { rejectWithValue }) => {
    try {
      const response = await api.patch("/notifications/preferences", preferences);
      return response.data?.preferences;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchAiStatus = createAsyncThunk(
  "notifications/fetchAiStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/notifications/ai-status");
      return response.data?.status;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  items: [],
  unreadCount: 0,
  page: 1,
  totalPages: 1,
  total: 0,
  loading: false,
  error: null,
  activeFilter: "all", // all | unread | message | group | notes | ai | system
  isPanelOpen: false,
  isSettingsOpen: false,
  hasNewArrival: false,
  aiStatus: {
    status: "operational",
    successRate: "100%",
    lastSuccessTime: null,
  },
  preferences: {
    groupMessages: true,
    groupActivities: true,
    notesAndKnowledge: true,
    aiNotifications: true,
    systemErrors: true,
    academicActivities: true,
    browserNotifications: false,
    soundNotifications: true,
  },
  toasts: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    togglePanel: (state) => {
      state.isPanelOpen = !state.isPanelOpen;
      if (state.isPanelOpen) {
        state.hasNewArrival = false;
      }
    },
    setPanelOpen: (state, action) => {
      state.isPanelOpen = action.payload;
      if (action.payload) {
        state.hasNewArrival = false;
      }
    },
    toggleSettings: (state) => {
      state.isSettingsOpen = !state.isSettingsOpen;
    },
    setSettingsOpen: (state, action) => {
      state.isSettingsOpen = action.payload;
    },
    clearNewArrivalFlag: (state) => {
      state.hasNewArrival = false;
    },
    setUnreadCount: (state, action) => {
      state.unreadCount = Math.max(0, action.payload);
    },
    setAiStatus: (state, action) => {
      state.aiStatus = { ...state.aiStatus, ...action.payload };
    },
    addRealtimeNotification: (state, action) => {
      const notification = action.payload;
      if (!notification || !notification._id) return;

      // Avoid duplicates
      const exists = state.items.some((item) => item._id === notification._id);
      if (!exists) {
        state.items.unshift(notification);
        if (!notification.isRead) {
          state.unreadCount += 1;
        }
        state.hasNewArrival = true;
      }
    },
    addToast: (state, action) => {
      const toast = action.payload;
      if (!toast) return;

      // Prevent exact duplicates within recent list
      const isDuplicate = state.toasts.some(
        (t) =>
          t.title === toast.title &&
          t.message === toast.message &&
          Date.now() - (t.timestamp || 0) < 4000
      );

      if (!isDuplicate) {
        const id = toast.id || `${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        state.toasts.push({
          ...toast,
          id,
          timestamp: Date.now(),
        });
      }
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearAllToasts: (state) => {
      state.toasts = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch notifications
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        const { notifications, total, page, totalPages, unreadCount, isNextPage } = action.payload;
        if (isNextPage) {
          // Append while avoiding duplicates
          const existingIds = new Set(state.items.map((i) => i._id));
          const newItems = notifications.filter((i) => !existingIds.has(i._id));
          state.items = [...state.items, ...newItems];
        } else {
          state.items = notifications || [];
        }
        state.total = total;
        state.page = page;
        state.totalPages = totalPages;
        if (typeof unreadCount === "number") {
          state.unreadCount = unreadCount;
        }
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Unread count
    builder.addCase(fetchUnreadCount.fulfilled, (state, action) => {
      state.unreadCount = action.payload;
    });

    // Mark as read (Optimistic)
    builder
      .addCase(markAsRead.pending, (state, action) => {
        const id = action.meta.arg;
        const item = state.items.find((i) => i._id === id);
        if (item && !item.isRead) {
          item.isRead = true;
          item.readAt = new Date().toISOString();
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        const id = action.payload?.id;
        const item = state.items.find((i) => i._id === id);
        if (item) {
          item.isRead = false;
          state.unreadCount += 1;
        }
      });

    // Mark all as read (Optimistic)
    builder
      .addCase(markAllAsRead.pending, (state) => {
        state.items.forEach((item) => {
          item.isRead = true;
          item.readAt = new Date().toISOString();
        });
        state.unreadCount = 0;
      })
      .addCase(markAllAsRead.rejected, (state) => {
        // Fallback: recompute from items if needed
      });

    // Delete single (Optimistic)
    builder.addCase(deleteNotification.pending, (state, action) => {
      const id = action.meta.arg;
      const index = state.items.findIndex((i) => i._id === id);
      if (index !== -1) {
        if (!state.items[index].isRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.items.splice(index, 1);
      }
    });

    // Clear all (Optimistic)
    builder.addCase(clearAllNotifications.pending, (state) => {
      state.items = [];
      state.unreadCount = 0;
    });

    // Preferences
    builder
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        if (action.payload) {
          state.preferences = { ...state.preferences, ...action.payload };
        }
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        if (action.payload) {
          state.preferences = { ...state.preferences, ...action.payload };
        }
      });

    // AI Status
    builder.addCase(fetchAiStatus.fulfilled, (state, action) => {
      if (action.payload) {
        state.aiStatus = { ...state.aiStatus, ...action.payload };
      }
    });
  },
});

export const {
  setFilter,
  togglePanel,
  setPanelOpen,
  toggleSettings,
  setSettingsOpen,
  clearNewArrivalFlag,
  setUnreadCount,
  setAiStatus,
  addRealtimeNotification,
  addToast,
  removeToast,
  clearAllToasts,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
