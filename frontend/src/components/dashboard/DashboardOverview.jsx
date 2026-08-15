import React from "react";
import { Users, FileText, Tag, Activity } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * DashboardOverview
 * Compact 3-column horizontal activity strip with numbered metrics & tiny visual indicators.
 */
const DashboardOverview = ({ joinedCount = 0, notesCount = 0, topicsCount = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  const metrics = [
    {
      index: "01",
      label: "Study groups",
      value: joinedCount,
      icon: Users,
      color: "#0075de",
      indicatorBg: "bg-[#0075de]/10",
    },
    {
      index: "02",
      label: "Saved notes",
      value: notesCount,
      icon: FileText,
      color: "#ffb110",
      indicatorBg: "bg-[#ffb110]/15",
    },
    {
      index: "03",
      label: "Active topics",
      value: topicsCount,
      icon: Tag,
      color: "#10b981",
      indicatorBg: "bg-[#10b981]/10",
    },
  ];

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.COMPONENT, delay: 0.1, ease: EASING.SMOOTH }}
      className="bg-white/80 backdrop-blur-xs rounded-[14px] border border-black/[0.08] p-4 sm:p-5 mb-10 shadow-2xs"
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

              {/* Tiny Visual Indicator */}
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
  );
};

export default DashboardOverview;
