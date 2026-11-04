import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  X,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { removeToast } from "../../features/notifications/notificationsSlice";

const ToastCard = ({ toast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, title, message, variant = "info", category, actionUrl, duration = 5000 } = toast;

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        dispatch(removeToast(id));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [id, duration, dispatch]);

  const handleDismiss = (e) => {
    e.stopPropagation();
    dispatch(removeToast(id));
  };

  const handleClick = () => {
    dispatch(removeToast(id));
    if (actionUrl) {
      navigate(actionUrl);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          icon: CheckCircle2,
          border: "border-emerald-500/20",
          iconColor: "text-emerald-500",
          progressBar: "bg-emerald-500",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          border: "border-amber-500/20",
          iconColor: "text-amber-500",
          progressBar: "bg-amber-500",
        };
      case "error":
        return {
          icon: XCircle,
          border: "border-rose-500/20",
          iconColor: "text-rose-500",
          progressBar: "bg-rose-500",
        };
      case "info":
      default:
        if (category === "ai") {
          return {
            icon: Sparkles,
            border: "border-purple-500/20",
            iconColor: "text-purple-600",
            progressBar: "bg-purple-600",
          };
        }
        return {
          icon: Info,
          border: "border-[#0075de]/20",
          iconColor: "text-[#0075de]",
          progressBar: "bg-[#0075de]",
        };
    }
  };

  const { icon: ToastIcon, border, iconColor, progressBar } = getVariantStyles();

  return (
    <div
      onClick={handleClick}
      className={`relative w-full max-w-[360px] bg-white/95 backdrop-blur-md rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] border ${border} p-3.5 flex items-start gap-3 cursor-pointer overflow-hidden transition-all hover:scale-[1.01] hover:shadow-lg animate-in slide-in-from-right-5 fade-in-50 duration-200`}
    >
      {/* Icon */}
      <div className={`mt-0.5 shrink-0 ${iconColor}`}>
        <ToastIcon className="w-5 h-5" />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0 pr-4">
        <h5 className="text-[13px] font-bold text-[#000000] leading-snug truncate">
          {title}
        </h5>
        <p className="text-[12px] text-[#615d59] leading-relaxed line-clamp-2 mt-0.5">
          {message}
        </p>
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={handleDismiss}
        className="p-1 rounded-[6px] text-[#9e9e9e] hover:text-[#000000] hover:bg-black/5 transition-colors shrink-0"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress countdown bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/[0.04]">
        <div
          className={`h-full transition-all duration-75 ${progressBar}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const NotificationToastContainer = () => {
  const toasts = useSelector((state) => state.notifications.toasts);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-80 flex flex-col gap-2.5 pointer-events-none items-end">
      {toasts.slice(-4).map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastCard toast={toast} />
        </div>
      ))}
    </div>
  );
};

export default NotificationToastContainer;
