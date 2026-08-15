import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Users, ArrowRight, Check, Shield, Cpu, Palette, BookOpen } from "lucide-react";
import { selectJoinedGroups } from "../../../../../features/groups/groupsSelectors";
import { joinGroup, setJoinedGroups } from "../../../../../features/groups/groupsSlice";

/**
 * DiscoveryCard
 * Redesigned group card for directory grid with category visual accents,
 * clear hierarchy, structured metadata row, and refined join state.
 */
const DiscoveryCard = ({ group }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const joinedGroups = useSelector(selectJoinedGroups) || [];

  const isJoined = joinedGroups.some((g) => g._id === group._id);

  const handleJoinGroup = async (e) => {
    e.stopPropagation();
    if (isJoined) {
      navigate(`/group/${group._id}`);
      return;
    }
    const res = await dispatch(joinGroup(group._id));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(setJoinedGroups([...joinedGroups, res.payload.group]));
      navigate(`/group/${group._id}`);
    }
  };

  const fieldName = group.field || "General";
  const categoryLower = fieldName.toLowerCase();

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

  return (
    <div
      onClick={() => navigate(`/group/${group._id}`)}
      className={`group bg-white rounded-[18px] border border-black/[0.08] p-5 sm:p-6 flex flex-col justify-between shadow-2xs ${theme.border} hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full`}
    >
      <div className="space-y-4">
        {/* Top Header Category Badge & Join Indicator */}
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider ${theme.bg}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            {fieldName}
          </span>

          {isJoined && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de] text-[11px] font-mono font-semibold flex items-center gap-1">
              <Check className="w-3 h-3 text-[#0075de]" /> Joined
            </span>
          )}
        </div>

        {/* Group Identity */}
        <div>
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111] tracking-[-0.4px] group-hover:text-[#0075de] transition-colors truncate">
            {group.name}
          </h3>

          <p className="text-[13px] text-[#615d59] mt-2 leading-relaxed font-sans line-clamp-2">
            {group.description || "Active collaborative study group and shared knowledge library."}
          </p>
        </div>

        {/* Structured Metadata Row */}
        <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[12px] font-mono text-[#757575]">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#0075de]" />
            <span>{group.members || 1} member{group.members !== 1 ? "s" : ""}</span>
          </span>
          <span>Open Group</span>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div
        className="flex items-center justify-between gap-2 pt-4 border-t border-black/[0.06] mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => navigate(`/group/${group._id}`)}
          data-cursor-ignore="true"
          className="px-3.5 py-1.5 bg-[#f6f5f4] hover:bg-black/5 text-[#111111] text-[12px] font-semibold rounded-[8px] transition-colors cursor-pointer"
        >
          View workspace
        </button>

        <button
          onClick={handleJoinGroup}
          data-cursor-ignore="true"
          className={`px-4 py-1.5 text-[12px] font-semibold rounded-[8px] transition-all duration-150 flex items-center gap-1 cursor-pointer shrink-0 ${
            isJoined
              ? "bg-[#0075de]/10 text-[#0075de] hover:bg-[#0075de]/20"
              : "bg-[#0075de] hover:bg-[#097fe8] text-white shadow-2xs"
          }`}
        >
          {isJoined ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#0075de]" />
              <span>Joined ✓</span>
            </>
          ) : (
            <>
              <span>Join group</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DiscoveryCard;
