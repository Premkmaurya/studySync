import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  MessageSquare,
  Users,
  FileText,
  Sparkles,
  AlertTriangle,
  GraduationCap,
  Check,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  markAsRead,
  deleteNotification,
  setPanelOpen,
} from "../../features/notifications/notificationsSlice";

dayjs.extend(relativeTime);

const NotificationItem = ({ notification }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    _id,
    category,
    type,
    title,
    message,
    isRead,
    createdAt,
    metadata = {},
    groupId,
  } = notification;

  // Category Configuration (Icon & Theme Colors)
  const getCategoryConfig = () => {
    switch (category) {
      case "message":
        return {
          icon: MessageSquare,
          bgColor: "bg-blue-50 text-[#0075de]",
          badgeColor: "bg-blue-100/60 text-[#0075de]",
          label: "Chat",
        };
      case "group":
        return {
          icon: Users,
          bgColor: "bg-indigo-50 text-indigo-600",
          badgeColor: "bg-indigo-100/60 text-indigo-700",
          label: "Group",
        };
      case "notes":
        return {
          icon: FileText,
          bgColor: "bg-amber-50 text-amber-600",
          badgeColor: "bg-amber-100/60 text-amber-700",
          label: "Notes",
        };
      case "ai":
        return {
          icon: Sparkles,
          bgColor:
            type === "ai_error" || type === "ai_service_outage"
              ? "bg-rose-50 text-rose-600"
              : "bg-purple-50 text-purple-600",
          badgeColor: "bg-purple-100/60 text-purple-700",
          label: "Syncie AI",
        };
      case "academic":
        return {
          icon: GraduationCap,
          bgColor: "bg-emerald-50 text-emerald-600",
          badgeColor: "bg-emerald-100/60 text-emerald-700",
          label: "Academic",
        };
      case "system":
      default:
        return {
          icon: AlertTriangle,
          bgColor: "bg-rose-50 text-rose-600",
          badgeColor: "bg-rose-100/60 text-rose-700",
          label: "System",
        };
    }
  };

  const { icon: CategoryIcon, bgColor, badgeColor, label } = getCategoryConfig();

  const handleItemClick = () => {
    // Optimistically mark as read
    if (!isRead) {
      dispatch(markAsRead(_id));
    }

    // Determine target navigation URL
    const targetUrl =
      metadata.actionUrl ||
      (groupId ? `/group/${groupId}` : null);

    if (targetUrl) {
      dispatch(setPanelOpen(false));
      navigate(targetUrl);
    }
  };

  const handleMarkRead = (e) => {
    e.stopPropagation();
    dispatch(markAsRead(_id));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteNotification(_id));
  };

  const timeAgo = dayjs(createdAt).fromNow();
  const groupName = metadata.groupName || (typeof groupId === "object" ? groupId?.name : null);

  return (
    <div
      onClick={handleItemClick}
      className={`group relative flex items-start gap-3 p-3.5 rounded-[12px] border transition-all cursor-pointer select-none
        ${
          isRead
            ? "bg-white/60 border-black/[0.04] hover:bg-black/[0.02]"
            : "bg-[#eaf4ff]/40 border-[#0075de]/20 hover:bg-[#eaf4ff]/70"
        }
      `}
    >
      {/* Category Icon */}
      <div
        className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${bgColor}`}
      >
        <CategoryIcon className="w-4 h-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-6">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          {/* Unread Indicator Dot */}
          {!isRead && (
            <span className="w-2 h-2 rounded-full bg-[#0075de] shrink-0" />
          )}

          <span className="text-[13px] font-semibold text-[#000000] truncate">
            {title}
          </span>

          {/* Group / Category Tag */}
          {groupName ? (
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full truncate max-w-[140px] ${badgeColor}`}
            >
              {groupName}
            </span>
          ) : (
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeColor}`}
            >
              {label}
            </span>
          )}
        </div>

        <p className="text-[12px] text-[#615d59] line-clamp-2 leading-relaxed mb-1.5">
          {message}
        </p>

        <span className="text-[11px] text-[#9e9e9e] font-normal">
          {timeAgo}
        </span>
      </div>

      {/* Action Buttons (visible on hover or focus) */}
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isRead && (
          <button
            type="button"
            onClick={handleMarkRead}
            title="Mark as read"
            className="p-1 rounded-[6px] text-[#757575] hover:text-[#0075de] hover:bg-black/[0.05] transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="button"
          onClick={handleDelete}
          title="Delete notification"
          className="p-1 rounded-[6px] text-[#757575] hover:text-rose-600 hover:bg-black/[0.05] transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
