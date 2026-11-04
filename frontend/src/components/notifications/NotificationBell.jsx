import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bell } from "lucide-react";
import { togglePanel, clearNewArrivalFlag } from "../../features/notifications/notificationsSlice";

const NotificationBell = ({ className = "" }) => {
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.notifications.unreadCount);
  const isPanelOpen = useSelector((state) => state.notifications.isPanelOpen);
  const hasNewArrival = useSelector((state) => state.notifications.hasNewArrival);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (hasNewArrival) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        dispatch(clearNewArrivalFlag());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasNewArrival, dispatch]);

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(togglePanel());
  };

  const displayCount = unreadCount > 99 ? "99+" : unreadCount;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 outline-none
        ${
          isPanelOpen
            ? "bg-[#0075de]/15 text-[#0075de]"
            : "text-[#615d59] hover:text-[#000000] hover:bg-black/[0.05]"
        }
        ${className}
      `}
    >
      {/* Animated Ping Wave on New Arrival */}
      {isAnimating && (
        <span className="absolute inset-0 rounded-full bg-[#0075de]/30 animate-ping pointer-events-none" />
      )}

      {/* Bell Icon with wiggle animation on incoming notification */}
      <Bell
        className={`w-5 h-5 transition-transform duration-300 ${
          isAnimating ? "animate-bounce text-[#0075de]" : ""
        }`}
      />

      {/* Unread Count Badge */}
      {unreadCount > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#0075de] text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-in zoom-in-50 duration-200"
        >
          {displayCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;
