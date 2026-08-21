import React from "react";
import { Users, FileText, Tag } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * DashboardOverview
 * Responsive activity Overview component:
 * - Mobile (< 640px): 2 + 1 responsive card grid with 16px padding & clear hierarchy.
 * - Desktop (640px+): Clean 3-column horizontal divide strip layout.
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
      className="mb-10"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-0 sm:bg-white/80 sm:backdrop-blur-xs sm:rounded-[16px] sm:border sm:border-black/[0.08] sm:p-5 sm:shadow-2xs sm:divide-x sm:divide-black/[0.08]">
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

                {/* Clean Indicator Icon */}
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
  );
};

export default DashboardOverview;
