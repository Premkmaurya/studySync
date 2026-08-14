import React from "react";
import { Users, FileText, Tag } from "lucide-react";

/**
 * DashboardOverview
 * Compact 3-metric context bar replacing oversized generic cards.
 */
const DashboardOverview = ({ joinedCount = 0, notesCount = 0, topicsCount = 0 }) => {
  const metrics = [
    {
      label: "Study groups",
      value: joinedCount,
      icon: Users,
      color: "#0075de",
      bg: "bg-[#0075de]/10",
    },
    {
      label: "Saved notes",
      value: notesCount,
      icon: FileText,
      color: "#ffb110",
      bg: "bg-[#ffb110]/15",
    },
    {
      label: "Active topics",
      value: topicsCount,
      icon: Tag,
      color: "#10b981",
      bg: "bg-[#10b981]/10",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className="bg-white rounded-[12px] border border-black/[0.08] p-3.5 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-2xs"
          >
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] ${m.bg} flex items-center justify-center shrink-0`}
              style={{ color: m.color }}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-[18px] sm:text-[22px] font-bold text-[#111111] leading-tight">
                {m.value}
              </div>
              <div className="text-[11px] sm:text-[13px] text-[#615d59] font-medium">
                {m.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardOverview;
