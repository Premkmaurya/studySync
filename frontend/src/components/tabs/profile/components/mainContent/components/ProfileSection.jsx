import React, { useEffect } from "react";
import { FileText, Users, Bookmark } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { selectJoinedGroups, selectGroupsLoading } from "../../../../../../features/groups/groupsSelectors";
import {
  selectMyNotes,
  selectSavedNotes,
  selectNotesLoading,
} from "../../../../../../features/notes/notesSelectors";
import { getMyNotes, getSavedNotes } from "../../../../../../features/notes/notesSlice";
import { joinedGroup } from "../../../../../../features/groups/groupsSlice";
import { DURATION, EASING } from "../../../../../motion/motionTokens";

/**
 * ProfileSection
 * Displays "Your learning snapshot" as a compact 3-metric horizontal activity strip with visual icons.
 */
const ProfileSection = () => {
  const dispatch = useDispatch();
  const shouldReduceMotion = useReducedMotion();

  const joinedGroups = useSelector(selectJoinedGroups) || [];
  const notes = useSelector(selectMyNotes) || [];
  const savedNotes = useSelector(selectSavedNotes) || [];
  const groupsLoading = useSelector(selectGroupsLoading);
  const notesLoading = useSelector(selectNotesLoading);

  useEffect(() => {
    dispatch(getMyNotes());
    dispatch(getSavedNotes());
    dispatch(joinedGroup());
  }, [dispatch]);

  const metrics = [
    {
      index: "01",
      label: "Study groups",
      value: groupsLoading && joinedGroups.length === 0 ? "—" : joinedGroups.length,
      icon: Users,
      color: "#0075de",
      indicatorBg: "bg-[#0075de]/10",
    },
    {
      index: "02",
      label: "Created notes",
      value: notesLoading && notes.length === 0 ? "—" : notes.length,
      icon: FileText,
      color: "#ffb110",
      indicatorBg: "bg-[#ffb110]/15",
    },
    {
      index: "03",
      label: "Saved library",
      value: notesLoading && savedNotes.length === 0 ? "—" : savedNotes.length,
      icon: Bookmark,
      color: "#10b981",
      indicatorBg: "bg-[#10b981]/10",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
            WORKSPACE CONTEXT
          </span>
          <h3 className="text-[20px] font-bold text-[#111111] tracking-[-0.5px]">
            Your learning snapshot
          </h3>
        </div>
      </div>

      {/* Compact 3-Column Metric Strip / Mobile 2+1 Grid */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.COMPONENT, ease: EASING.SMOOTH }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-0 bg-transparent sm:bg-white sm:rounded-[16px] sm:border sm:border-black/[0.08] sm:p-5 sm:shadow-2xs sm:divide-x sm:divide-black/[0.08]">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            const isFullWidthMobile = idx === 2;
            return (
              <div
                key={m.label}
                className={`
                  bg-white sm:bg-transparent rounded-[14px] sm:rounded-none border sm:border-none border-black/[0.08] p-4 sm:p-0 shadow-2xs sm:shadow-none
                  ${isFullWidthMobile ? "col-span-2 sm:col-span-1" : "col-span-1"}
                  ${idx === 0 ? "sm:pl-2 sm:pr-6" : idx === 1 ? "sm:px-6" : "sm:pl-6 sm:pr-2"}
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#757575]">
                      <span>{m.index}</span>
                      <span className="hidden sm:inline-block">• {m.label}</span>
                    </div>
                    <div className="text-[24px] sm:text-[28px] font-bold text-[#111111] leading-none tracking-tight pt-1">
                      {m.value}
                    </div>
                    <div className="text-[12px] sm:text-[13px] text-[#615d59] font-medium truncate pt-1 sm:hidden">
                      {m.label}
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-[8px] ${m.indicatorBg} flex items-center justify-center shrink-0`}
                    style={{ color: m.color }}
                  >
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSection;
