import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, FileText, Plus, Users, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { joinGroup } from "../../features/groups/groupsSlice";

/**
 * StudyGroupCard
 * Redesigned group card with clear visual hierarchy:
 * Category Tag → Group Title → Description → Metadata → Action Triggers.
 */
const StudyGroupCard = ({ group, isSuggested = false }) => {
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

  return (
    <div
      onClick={() => navigate(`/group/${groupId}`)}
      className="group bg-white rounded-[16px] border border-black/[0.08] p-5 flex flex-col justify-between h-full shadow-2xs hover:border-[#0075de]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div className="space-y-3">
        {/* Top Header Tags */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#f6f5f4] text-[#615d59] border border-black/[0.06] text-[11px] font-mono font-semibold uppercase tracking-wider">
            {group.field || "General"}
          </span>
          {isSuggested && group.match !== undefined && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de] text-[11px] font-mono font-semibold">
              {group.match}% Match
            </span>
          )}
        </div>

        {/* Group Title & Description */}
        <div>
          <h3 className="text-[18px] font-bold text-[#111111] tracking-[-0.3px] group-hover:text-[#0075de] transition-colors line-clamp-1">
            {group.name}
          </h3>
          {group.description && (
            <p className="text-[13px] text-[#615d59] line-clamp-2 mt-1.5 leading-relaxed">
              {group.description}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons Footer Row */}
      <div
        className="flex items-center gap-2 pt-4 border-t border-black/[0.06] mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => navigate(`/group/${groupId}/chats`)}
          className="flex-1 py-1.5 px-3 bg-[#f6f5f4] hover:bg-black/5 active:bg-black/10 text-[#111111] text-[12px] font-semibold rounded-[6px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#0075de]" />
          <span>Chat</span>
        </button>

        <button
          onClick={() => navigate(`/group/${groupId}`)}
          className="flex-1 py-1.5 px-3 bg-white hover:bg-black/5 border border-black/15 text-[#111111] text-[12px] font-semibold rounded-[6px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-[#615d59]" />
          <span>Notes</span>
        </button>

        {isSuggested && (
          <button
            onClick={handleJoin}
            className="py-1.5 px-3 bg-[#0075de] hover:bg-[#097fe8] text-white text-[12px] font-semibold rounded-[6px] transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
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
