import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Compass, Shield, Cpu, Palette, BookOpen } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectJoinedGroups } from "../../../../../../features/groups/groupsSelectors";
import { joinedGroup } from "../../../../../../features/groups/groupsSlice";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../../../../../motion/motionTokens";

/**
 * GroupSection
 * Displays the user's joined study groups in a learning-community grid with category accents.
 */
const GroupSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const joinedGroups = useSelector(selectJoinedGroups) || [];
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!joinedGroups || joinedGroups.length === 0) {
      dispatch(joinedGroup());
    }
  }, [dispatch, joinedGroups.length]);

  const getTheme = (field) => {
    const f = (field || "general").toLowerCase();
    if (f.includes("cyber") || f.includes("security")) {
      return { bg: "bg-[#0075de]/10 text-[#0075de]", border: "hover:border-[#0075de]/40", icon: Shield };
    }
    if (f.includes("ai") || f.includes("machine") || f.includes("algo")) {
      return { bg: "bg-[#6366f1]/10 text-[#6366f1]", border: "hover:border-[#6366f1]/40", icon: Cpu };
    }
    if (f.includes("design") || f.includes("art")) {
      return { bg: "bg-[#f59e0b]/10 text-[#d97706]", border: "hover:border-[#f59e0b]/40", icon: Palette };
    }
    return { bg: "bg-[#f6f5f4] text-[#615d59]", border: "hover:border-black/30", icon: BookOpen };
  };

  if (!joinedGroups || joinedGroups.length === 0) {
    return (
      <div className="bg-white rounded-[20px] border border-black/[0.08] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-2xs my-4">
        <div className="w-12 h-12 rounded-full bg-[#0075de]/10 text-[#0075de] flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
        <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111]">
          Your learning community starts here.
        </h3>
        <p className="text-[13px] text-[#615d59] max-w-md leading-relaxed font-sans">
          Join a study group and start learning with peers across engineering, algorithms, AI, and design.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigate("/find-groups")}
            data-cursor-ignore="true"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-colors shadow-2xs cursor-pointer"
          >
            <Compass className="w-16 h-16" />
            <span>Explore groups →</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
            MY COMMUNITIES
          </span>
          <h3 className="text-[20px] font-bold text-[#111111] tracking-[-0.5px]">
            Joined Study Groups
          </h3>
        </div>
        <span className="text-[12px] font-mono text-[#757575]">
          {joinedGroups.length} community{joinedGroups.length !== 1 ? "ies" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {joinedGroups.map((group, i) => {
          const theme = getTheme(group.field);
          const CategoryIcon = theme.icon;
          return (
            <motion.div
              key={group._id || i}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.COMPONENT, delay: i * 0.05, ease: EASING.SMOOTH }}
              onClick={() => navigate(`/group/${group._id}`)}
              className={`group bg-white rounded-[18px] border border-black/[0.08] p-5 flex flex-col justify-between shadow-2xs ${theme.border} hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full`}
            >
              <div className="space-y-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider ${theme.bg}`}>
                  <CategoryIcon className="w-3 h-3" />
                  {group.field || "General"}
                </span>

                <div>
                  <h4 className="text-[18px] font-bold text-[#111111] tracking-[-0.3px] group-hover:text-[#0075de] transition-colors truncate">
                    {group.name}
                  </h4>
                  <p className="text-[13px] text-[#615d59] line-clamp-2 mt-1 leading-relaxed font-sans">
                    {group.description || "Active study group workspace."}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between mt-4">
                <span className="text-[11px] font-mono text-[#757575]">Member</span>
                <span className="text-[12px] font-semibold text-[#0075de] flex items-center gap-1">
                  <span>Open workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupSection;
