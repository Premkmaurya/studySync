import React from "react";
import { FileText, Tag, Clock } from "lucide-react";

/**
 * LibraryOverview
 * Compact editorial metadata strip displaying live knowledge repository stats.
 */
const LibraryOverview = ({ notesCount = 0, subjectsCount = 0 }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xs rounded-[12px] border border-black/[0.08] sm:px-6 py-3 mb-8 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-4 text-[12px] font-mono text-[#615d59]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold text-[#111111]">
            <FileText className="w-3.5 h-3.5 text-[#0075de]" />
            <span>{notesCount} NOTE{notesCount !== 1 ? "S" : ""}</span>
          </span>

          <span className="text-black/20">•</span>

          <span className="flex items-center gap-1.5 font-bold text-[#111111]">
            <Tag className="w-3.5 h-3.5 text-[#ffb110]" />
            <span>{subjectsCount > 0 ? subjectsCount : 1} SUBJECT{subjectsCount !== 1 ? "S" : ""}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[#757575]">
          <Clock className="w-3.5 h-3.5 text-[#10b981]" />
          <span>UPDATED RECENTLY</span>
        </div>
      </div>
    </div>
  );
};

export default LibraryOverview;
