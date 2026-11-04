import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckCheck,
  Trash2,
  Settings,
  X,
  BellOff,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Activity,
} from "lucide-react";
import NotificationItem from "./NotificationItem";
import {
  fetchNotifications,
  markAllAsRead,
  clearAllNotifications,
  setFilter,
  setPanelOpen,
  setSettingsOpen,
} from "../../features/notifications/notificationsSlice";

const FilterTab = ({ label, active, count, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5
      ${
        active
          ? "bg-[#0075de] text-white shadow-xs"
          : "bg-black/[0.04] text-[#615d59] hover:bg-black/[0.08] hover:text-[#000000]"
      }
    `}
  >
    <span>{label}</span>
    {typeof count === "number" && count > 0 && (
      <span
        className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
          active ? "bg-white/25 text-white" : "bg-[#0075de]/15 text-[#0075de]"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

const NotificationPanel = () => {
  const dispatch = useDispatch();
  const panelRef = useRef(null);

  const {
    items,
    unreadCount,
    loading,
    activeFilter,
    isPanelOpen,
    page,
    totalPages,
    aiStatus,
  } = useSelector((state) => state.notifications);

  // Close panel on clicking outside or ESC
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        dispatch(setPanelOpen(false));
      }
    };

    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        dispatch(setPanelOpen(false));
      }
    };

    if (isPanelOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isPanelOpen, dispatch]);

  // Fetch when panel opens or activeFilter changes
  useEffect(() => {
    if (isPanelOpen) {
      dispatch(fetchNotifications({ page: 1, limit: 20, category: activeFilter }));
    }
  }, [isPanelOpen, activeFilter, dispatch]);

  if (!isPanelOpen) return null;

  const handleFilterClick = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      dispatch(fetchNotifications({ page: page + 1, limit: 15, category: activeFilter }));
    }
  };

  // Filter items client-side if needed
  const filteredItems = items.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !item.isRead;
    return item.category === activeFilter;
  });

  // AI Status Pill Styling
  const getAiBadge = () => {
    const status = aiStatus?.status || "operational";
    if (status === "unavailable") {
      return {
        label: "AI Offline",
        color: "bg-rose-100 text-rose-700 border-rose-200",
        pulse: "bg-rose-500",
      };
    }
    if (status === "degraded" || status === "recovering") {
      return {
        label: `AI ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        color: "bg-amber-100 text-amber-800 border-amber-200",
        pulse: "bg-amber-500",
      };
    }
    return {
      label: "Syncie AI Active",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      pulse: "bg-emerald-500",
    };
  };

  const aiBadge = getAiBadge();

  return (
    <div
      ref={panelRef}
      className="fixed top-18 right-4 md:right-8 z-60 w-[92vw] max-w-[420px] bg-white/95 backdrop-blur-xl border border-black/[0.08] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden max-h-[82vh] animate-in fade-in-50 zoom-in-95 duration-200"
    >
      {/* Top Header */}
      <div className="p-4 border-b border-black/[0.06] bg-white/60">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-bold text-[#000000] tracking-tight">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#0075de] text-white">
                {unreadCount} new
              </span>
            )}
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-1">
            {items.length > 0 && unreadCount > 0 && (
              <button
                type="button"
                onClick={() => dispatch(markAllAsRead())}
                title="Mark all as read"
                className="p-1.5 rounded-[8px] text-[#615d59] hover:text-[#0075de] hover:bg-black/[0.04] transition-colors"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}

            {items.length > 0 && (
              <button
                type="button"
                onClick={() => dispatch(clearAllNotifications())}
                title="Clear all notifications"
                className="p-1.5 rounded-[8px] text-[#615d59] hover:text-rose-600 hover:bg-black/[0.04] transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => dispatch(setSettingsOpen(true))}
              title="Notification settings"
              className="p-1.5 rounded-[8px] text-[#615d59] hover:text-[#000000] hover:bg-black/[0.04] transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => dispatch(setPanelOpen(false))}
              title="Close panel"
              className="p-1.5 rounded-[8px] text-[#615d59] hover:text-[#000000] hover:bg-black/[0.04] transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Health Status Banner */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-[10px] bg-black/[0.02] border border-black/[0.04]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${aiBadge.pulse}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${aiBadge.pulse}`} />
            </span>
            <span className="text-[11px] font-medium text-[#615d59]">
              {aiBadge.label}
            </span>
          </div>
          <span className="text-[10px] text-[#9e9e9e] font-mono">
            uptime: {aiStatus?.successRate || "100%"}
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto mt-3 pb-1 no-scrollbar">
          <FilterTab
            label="All"
            active={activeFilter === "all"}
            onClick={() => handleFilterClick("all")}
          />
          <FilterTab
            label="Unread"
            count={unreadCount}
            active={activeFilter === "unread"}
            onClick={() => handleFilterClick("unread")}
          />
          <FilterTab
            label="Messages"
            active={activeFilter === "message"}
            onClick={() => handleFilterClick("message")}
          />
          <FilterTab
            label="Groups"
            active={activeFilter === "group"}
            onClick={() => handleFilterClick("group")}
          />
          <FilterTab
            label="Notes"
            active={activeFilter === "notes"}
            onClick={() => handleFilterClick("notes")}
          />
          <FilterTab
            label="AI"
            active={activeFilter === "ai"}
            onClick={() => handleFilterClick("ai")}
          />
          <FilterTab
            label="System"
            active={activeFilter === "system"}
            onClick={() => handleFilterClick("system")}
          />
        </div>
      </div>

      {/* Notification Items List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[200px]">
        {loading && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#9e9e9e] gap-2">
            <RotateCcw className="w-5 h-5 animate-spin text-[#0075de]" />
            <span className="text-[13px]">Loading notifications...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-black/[0.03] text-[#9e9e9e] flex items-center justify-center mb-3">
              <BellOff className="w-6 h-6" />
            </div>
            <h4 className="text-[14px] font-bold text-[#000000]">No notifications</h4>
            <p className="text-[12px] text-[#757575] max-w-[240px] mt-1">
              {activeFilter === "unread"
                ? "You're all caught up! No unread notifications."
                : "You don't have any activity in this category yet."}
            </p>
          </div>
        ) : (
          filteredItems.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))
        )}

        {/* Pagination Load More */}
        {page < totalPages && (
          <div className="pt-2 text-center">
            <button
              type="button"
              disabled={loading}
              onClick={handleLoadMore}
              className="text-[12px] font-semibold text-[#0075de] hover:underline disabled:opacity-50 py-1"
            >
              {loading ? "Loading more..." : "Load earlier notifications"}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 bg-black/[0.02] border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#757575]">
        <span>StudySync Centralized Sync</span>
        <button
          type="button"
          onClick={() => dispatch(setSettingsOpen(true))}
          className="hover:text-[#0075de] hover:underline transition-colors"
        >
          Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;
