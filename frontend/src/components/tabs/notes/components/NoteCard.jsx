import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, FileText, Code, Shield, Cpu, Palette, BookOpen } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/**
 * NoteCard
 * Redesigned knowledge object card with category theme accents, note-type indicators,
 * plain-text preview, group context, and read note trigger.
 */
const NoteCard = ({ note, isDominant = false }) => {
  const navigate = useNavigate();

  const handleNoteClick = () => {
    const groupId = note.groupId?._id || note.groupId;
    if (groupId) {
      navigate(`/group/${groupId}`);
      setTimeout(() => {
        navigate(`/group/${groupId}/note`, {
          state: {
            title: note.title,
            content: note.content,
            isViewOnly: true,
            groupName: note.groupId?.name || note.group,
            profession: note.groupId?.field,
          },
        });
      }, 200);
    }
  };

  const groupName = note.groupId?.name || note.group || "Study Group";
  const categoryField = note.groupId?.field || note.field || "General";
  const categoryLower = categoryField.toLowerCase();

  // Category theme accent helper
  const getTheme = (f) => {
    if (f.includes("cyber") || f.includes("security")) {
      return { bg: "bg-[#0075de]/10 text-[#0075de]", border: "group-hover:border-[#0075de]/40", icon: Shield };
    }
    if (f.includes("ai") || f.includes("machine") || f.includes("algo")) {
      return { bg: "bg-[#6366f1]/10 text-[#6366f1]", border: "group-hover:border-[#6366f1]/40", icon: Cpu };
    }
    if (f.includes("design") || f.includes("art")) {
      return { bg: "bg-[#f59e0b]/10 text-[#d97706]", border: "group-hover:border-[#f59e0b]/40", icon: Palette };
    }
    return { bg: "bg-[#f6f5f4] text-[#615d59]", border: "group-hover:border-black/30", icon: BookOpen };
  };

  const theme = getTheme(categoryLower);
  const CategoryIcon = theme.icon;

  // Plain-text preview cleaning (stripping Markdown & HTML)
  const cleanPreview = (note.content || "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[#*`_~]/g, "")
    .trim();

  const isCodeNote = (note.content || "").includes("```") || (note.title || "").toLowerCase().includes("code");

  return (
    <div
      onClick={handleNoteClick}
      className={`group bg-white rounded-[18px] border border-black/[0.08] p-5 sm:p-6 flex flex-col justify-between shadow-2xs ${theme.border} hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full ${
        isDominant ? "lg:col-span-2 border-l-4 border-l-[#0075de]" : ""
      }`}
    >
      <div className="space-y-4">
        {/* Top Header Category & Note Type Metadata */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider ${theme.bg}`}>
              <CategoryIcon className="w-3.5 h-3.5" />
              {categoryField}
            </span>
            <span className="px-2 py-0.5 rounded bg-black/5 text-[#615d59] text-[10px] font-mono font-semibold">
              {isCodeNote ? "CODE" : "MARKDOWN"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-[#757575]">
            <Clock className="w-3 h-3 text-[#0075de]" />
            <span>{dayjs(note.createdAt).fromNow()}</span>
          </div>
        </div>

        {/* Note Title */}
        <h3 className={`font-bold text-[#111111] tracking-[-0.4px] group-hover:text-[#0075de] transition-colors ${
          isDominant ? "text-[22px] sm:text-[24px]" : "text-[18px]"
        }`}>
          {note.title || "Untitled Knowledge Note"}
        </h3>

        {/* Plain Text Content Preview */}
        {cleanPreview && (
          <p className="text-[13px] text-[#615d59] leading-relaxed font-sans line-clamp-3">
            {cleanPreview}
          </p>
        )}
      </div>

      {/* Footer Group Context & Read Trigger */}
      <div className="pt-4 border-t border-black/[0.06] mt-4 flex items-center justify-between">
        <span className="text-[12px] font-mono text-[#757575] truncate max-w-[200px]">
          {groupName}
        </span>

        <button
          onClick={handleNoteClick}
          data-cursor-ignore="true"
          className="group/btn text-[12px] font-semibold text-[#0075de] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Read note</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
