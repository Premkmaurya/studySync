import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, Volume2, Bell, Shield, Sparkles, FileText, Users, MessageSquare } from "lucide-react";
import {
  setSettingsOpen,
  updatePreferences,
} from "../../features/notifications/notificationsSlice";
import {
  isBrowserNotificationSupported,
  requestBrowserNotificationPermission,
  getBrowserNotificationPermission,
} from "../../utils/browserNotifications";
import { playNotificationSound } from "../../utils/notificationSound";

const SettingToggle = ({ icon: Icon, title, description, checked, onChange, disabled = false }) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-black/[0.05] last:border-b-0">
    <div className="flex items-start gap-3 flex-1">
      <div className="p-2 rounded-[8px] bg-black/[0.03] text-[#0075de] shrink-0 mt-0.5">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h4 className="text-[13px] font-semibold text-[#000000] leading-snug">{title}</h4>
        <p className="text-[12px] text-[#757575] leading-relaxed mt-0.5">{description}</p>
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-9 h-5 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0075de]" />
    </label>
  </div>
);

const NotificationSettings = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.notifications.preferences);
  const [browserPermission, setBrowserPermission] = useState(getBrowserNotificationPermission());

  const handleToggle = (key, value) => {
    dispatch(updatePreferences({ [key]: value }));
  };

  const handleBrowserToggle = async (checked) => {
    if (checked) {
      const granted = await requestBrowserNotificationPermission();
      setBrowserPermission(getBrowserNotificationPermission());
      if (granted) {
        dispatch(updatePreferences({ browserNotifications: true }));
      } else {
        dispatch(updatePreferences({ browserNotifications: false }));
      }
    } else {
      dispatch(updatePreferences({ browserNotifications: false }));
    }
  };

  const handleTestSound = () => {
    playNotificationSound();
  };

  return (
    <div className="fixed inset-0 z-70 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-[16px] shadow-2xl border border-black/[0.08] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in-50 zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-[#0075de]/10 text-[#0075de] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="text-[16px] font-bold text-[#000000]">Notification Settings</h3>
          </div>
          <button
            onClick={() => dispatch(setSettingsOpen(false))}
            className="p-1.5 rounded-[8px] text-[#757575] hover:text-[#000000] hover:bg-black/5 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-1">
          <SettingToggle
            icon={MessageSquare}
            title="Group Chat Messages"
            description="Receive real-time alerts for incoming group messages and @mentions."
            checked={preferences.groupMessages !== false}
            onChange={(val) => handleToggle("groupMessages", val)}
          />

          <SettingToggle
            icon={Users}
            title="Group Activities"
            description="Notifications when members join, leave, or group details are updated."
            checked={preferences.groupActivities !== false}
            onChange={(val) => handleToggle("groupActivities", val)}
          />

          <SettingToggle
            icon={FileText}
            title="Notes and Knowledge"
            description="Alerts when notes are created, updated, or shared with you."
            checked={preferences.notesAndKnowledge !== false}
            onChange={(val) => handleToggle("notesAndKnowledge", val)}
          />

          <SettingToggle
            icon={Sparkles}
            title="Syncie AI & Learning Ops"
            description="Status updates, task completions, and health notifications for AI tools."
            checked={preferences.aiNotifications !== false}
            onChange={(val) => handleToggle("aiNotifications", val)}
          />

          <SettingToggle
            icon={Shield}
            title="System & Connection Alerts"
            description="Warnings for connection interruptions and important system updates."
            checked={preferences.systemErrors !== false}
            onChange={(val) => handleToggle("systemErrors", val)}
          />

          <SettingToggle
            icon={Volume2}
            title="Notification Sound"
            description="Play a subtle 2-tone audio chime on incoming notifications."
            checked={preferences.soundNotifications !== false}
            onChange={(val) => handleToggle("soundNotifications", val)}
          />

          {isBrowserNotificationSupported() && (
            <div className="flex items-start justify-between gap-4 py-3 border-b border-black/[0.05] last:border-b-0">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 rounded-[8px] bg-black/[0.03] text-[#0075de] shrink-0 mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-[#000000] leading-snug">
                    Desktop Browser Notifications
                  </h4>
                  <p className="text-[12px] text-[#757575] leading-relaxed mt-0.5">
                    Show desktop popups even when StudySync is running in the background.
                    {browserPermission === "denied" && (
                      <span className="block text-rose-600 font-medium mt-1">
                        (Blocked in browser settings)
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={preferences.browserNotifications === true && browserPermission === "granted"}
                  onChange={(e) => handleBrowserToggle(e.target.checked)}
                  disabled={browserPermission === "denied"}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0075de]" />
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black/[0.02] border-t border-black/[0.08]">
          <button
            type="button"
            onClick={handleTestSound}
            className="text-[12px] font-semibold text-[#0075de] hover:underline"
          >
            Test sound chime
          </button>
          <button
            type="button"
            onClick={() => dispatch(setSettingsOpen(false))}
            className="px-4 py-1.5 rounded-[8px] bg-[#0075de] text-white text-[13px] font-semibold hover:bg-[#0068c7] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
