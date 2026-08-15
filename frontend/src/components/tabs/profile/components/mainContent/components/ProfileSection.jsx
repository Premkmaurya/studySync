import React, { useEffect } from "react";
import { FileText, Users, Bookmark } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { selectJoinedGroups } from "../../../../../../features/groups/groupsSelectors";
import {
  selectMyNotes,
  selectSavedNotes,
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

  useEffect(() => {
    dispatch(getMyNotes());
    dispatch(getSavedNotes());
    dispatch(joinedGroup());
  }, [dispatch]);

  const metrics = [
    {
      index: "01",
      label: "Study groups",
      value: joinedGroups.length,
      icon: Users,
      color: "#0075de",
      indicatorBg: "bg-[#0075de]/10",
    },
    {
      index: "02",
      label: "Created notes",
      value: notes.length,
      icon: FileText,
      color: "#ffb110",
      indicatorBg: "bg-[#ffb110]/15",
    },
    {
      index: "03",
      label: "Saved library",
      value: savedNotes.length,
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

      {/* Compact 3-Column Metric Strip */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.COMPONENT, ease: EASING.SMOOTH }}
        className="bg-white rounded-[16px] border border-black/[0.08] p-5 shadow-2xs"
      >
        <div className="grid grid-cols-3 divide-x divide-black/[0.08]">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className={`flex items-center justify-between px-3 sm:px-6 ${idx === 0 ? "pl-1 sm:pl-2" : ""}`}>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#757575]">
                    <span>{m.index}</span>
                    <span className="hidden sm:inline-block">• {m.label}</span>
                  </div>
                  <div className="text-[20px] sm:text-[26px] font-bold text-[#111111] leading-none tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-[#615d59] font-medium sm:hidden truncate">
                    {m.label}
                  </div>
                </div>

                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] ${m.indicatorBg} flex items-center justify-center shrink-0`}
                  style={{ color: m.color }}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
