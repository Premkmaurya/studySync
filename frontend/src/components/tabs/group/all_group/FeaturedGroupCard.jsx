import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Users, ArrowRight, Check, Sparkles, Shield, Cpu, Palette, BookOpen } from "lucide-react";
import { selectJoinedGroups } from "../../../../features/groups/groupsSelectors";
import { joinGroup, setJoinedGroups } from "../../../../features/groups/groupsSlice";

/**
 * FeaturedGroupCard
 * Dominant featured community surface displaying the primary active or recommended group.
 */
const FeaturedGroupCard = ({ group }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const joinedGroups = useSelector(selectJoinedGroups) || [];

  if (!group) return null;

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
      return { bg: "bg-[#0075de]/10 text-[#0075de]", icon: Shield };
    }
    if (f.includes("ai") || f.includes("machine") || f.includes("algo")) {
      return { bg: "bg-[#6366f1]/10 text-[#6366f1]", icon: Cpu };
    }
    if (f.includes("design") || f.includes("art")) {
      return { bg: "bg-[#f59e0b]/10 text-[#d97706]", icon: Palette };
    }
    return { bg: "bg-black/5 text-[#615d59]", icon: BookOpen };
  };

  const theme = getTheme(categoryLower);
  const CategoryIcon = theme.icon;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
          FEATURED COMMUNITY
        </span>
        <span className="text-[12px] font-mono text-[#757575]">Start here</span>
      </div>

      <div
        onClick={() => navigate(`/group/${group._id}`)}
        className="group relative bg-white rounded-[20px] border border-black/[0.1] p-6 sm:p-8 shadow-[0px_8px_32px_rgba(0,0,0,0.04)] overflow-hidden cursor-pointer hover:border-[#0075de]/40 transition-all duration-300 space-y-5"
      >
        {/* Subtle Category Left Accent Stripe */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0075de]" />

        {/* Top Metadata Header */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono font-bold text-[11px] uppercase tracking-wider ${theme.bg}`}>
              <CategoryIcon className="w-3.5 h-3.5" />
              {fieldName}
            </span>
            <span className="text-[12px] font-mono text-[#757575]">
              • Recommended Cohort
            </span>
          </div>

          <span className="text-[12px] font-mono text-[#757575] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#0075de]" />
            <span>{group.members || 1} member{group.members !== 1 ? "s" : ""}</span>
          </span>
        </div>

        {/* Main Content Area */}
        <div className="space-y-2">
          <h3 className="text-[24px] sm:text-[28px] font-bold text-[#111111] tracking-[-0.6px] group-hover:text-[#0075de] transition-colors">
            {group.name}
          </h3>

          <p className="text-[14px] sm:text-[15px] text-[#615d59] leading-relaxed max-w-3xl font-sans">
            {group.description || "Active collaborative study group and shared knowledge workspace."}
          </p>
        </div>

        {/* Actions Row */}
        <div
          className="pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[12px] font-mono text-[#757575]">
            Open Community Workspace
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/group/${group._id}`)}
              data-cursor-ignore="true"
              className="px-5 py-2 bg-white hover:bg-black/5 border border-black/15 text-[#111111] text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer"
            >
              View workspace →
            </button>

            <button
              onClick={handleJoinGroup}
              data-cursor-ignore="true"
              className={`px-5 py-2 text-[13px] font-semibold rounded-[8px] transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                isJoined
                  ? "bg-[#0075de]/10 text-[#0075de] hover:bg-[#0075de]/20"
                  : "bg-[#0075de] hover:bg-[#097fe8] text-white"
              }`}
            >
              {isJoined ? (
                <>
                  <Check className="w-16 h-16 text-[#0075de]" />
                  <span>Joined ✓</span>
                </>
              ) : (
                <>
                  <span>Join group</span>
                  <ArrowRight className="w-16 h-16" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedGroupCard;
