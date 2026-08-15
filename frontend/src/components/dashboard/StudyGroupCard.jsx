import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, FileText, Plus, Users, ArrowRight, Shield, Cpu, Palette, BookOpen } from "lucide-react";
import { useDispatch } from "react-redux";
import { joinGroup } from "../../features/groups/groupsSlice";

/**
 * StudyGroupCard
 * Redesigned group card with distinct category visual accents, structured metadata row,
 * and responsive action buttons.
 */
const StudyGroupCard = ({ group, isSuggested = false, isDominant = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoin = async (e) => {
    e.stopPropagation();
    const res = await dispatch(joinGroup(group._id));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(`/group/${group._id}`);
    }
  };

  const groupId = group._id || group.id;
  const categoryName = (group.field || "General").toLowerCase();

  // Category visual accent configuration
  const getCategoryTheme = (field) => {
    if (field.includes("cyber") || field.includes("security")) {
      return {
        bg: "bg-[#0075de]/10 text-[#0075de] border-[#0075de]/20",
        icon: Shield,
        accentBorder: "group-hover:border-[#0075de]/40",
      };
    }
    if (field.includes("ai") || field.includes("machine") || field.includes("algo") || field.includes("computer")) {
      return {
        bg: "bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20",
        icon: Cpu,
        accentBorder: "group-hover:border-[#6366f1]/40",
      };
    }
    if (field.includes("design") || field.includes("art")) {
      return {
        bg: "bg-[#f59e0b]/10 text-[#d97706] border-[#f59e0b]/20",
        icon: Palette,
        accentBorder: "group-hover:border-[#f59e0b]/40",
      };
    }
    return {
      bg: "bg-[#f6f5f4] text-[#615d59] border-black/[0.08]",
      icon: BookOpen,
      accentBorder: "group-hover:border-black/30",
    };
  };

  const theme = getCategoryTheme(categoryName);
  const CategoryIcon = theme.icon;

  return (
    <div
      onClick={() => navigate(`/group/${groupId}`)}
      className={`group bg-white rounded-[18px] border border-black/[0.08] p-5 sm:p-6 flex flex-col justify-between shadow-2xs ${theme.accentBorder} hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${
        isDominant ? "lg:col-span-2 border-l-4 border-l-[#0075de]" : ""
      }`}
    >
      <div className="space-y-4">
        {/* Category Badge & Match Metadata */}
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono font-semibold uppercase tracking-wider ${theme.bg}`}>
            <CategoryIcon className="w-3 h-3" />
            {group.field || "General"}
          </span>

          {isSuggested && group.match !== undefined && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de] text-[11px] font-mono font-semibold">
              {group.match}% Match
            </span>
          )}

          {isDominant && !isSuggested && (
            <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-[#615d59] text-[11px] font-mono font-semibold">
              ★ Active Cohort
            </span>
          )}
        </div>

        {/* Group Identity */}
        <div>
          <h3 className={`font-bold text-[#111111] tracking-[-0.4px] group-hover:text-[#0075de] transition-colors ${
            isDominant ? "text-[22px] sm:text-[24px]" : "text-[18px]"
          }`}>
            {group.name}
          </h3>

          {group.description && (
            <p className="text-[13px] text-[#615d59] mt-2 leading-relaxed font-sans line-clamp-2">
              {group.description}
            </p>
          )}
        </div>

        {/* Structured Metadata Row */}
        <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[12px] font-mono text-[#757575]">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#0075de]" />
            <span>Community Workspace</span>
          </span>
          <span>Open Group</span>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div
        className="flex items-center gap-2 pt-4 border-t border-black/[0.06] mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => navigate(`/group/${groupId}/chats`)}
          data-cursor-ignore="true"
          className="flex-1 py-2 px-3 bg-[#f6f5f4] hover:bg-black/5 active:bg-black/10 text-[#111111] text-[12px] font-semibold rounded-[8px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#0075de]" />
          <span>Chat</span>
        </button>

        <button
          onClick={() => navigate(`/group/${groupId}`)}
          data-cursor-ignore="true"
          className="flex-1 py-2 px-3 bg-white hover:bg-black/5 border border-black/15 text-[#111111] text-[12px] font-semibold rounded-[8px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-[#615d59]" />
          <span>Notes</span>
        </button>

        {isSuggested && (
          <button
            onClick={handleJoin}
            data-cursor-ignore="true"
            className="py-2 px-4 bg-[#0075de] hover:bg-[#097fe8] text-white text-[12px] font-semibold rounded-[8px] transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Join</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default StudyGroupCard;
