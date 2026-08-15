import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, ArrowRight, Sparkles, Compass as DirectoryIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import StudyGroupCard from "./StudyGroupCard";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * RecommendedGroups
 * Redesigned discovery section surfacing academic groups matching interests.
 * Features connected topic node visual accent and an intentional discovery invitation state.
 */
const RecommendedGroups = ({
  groups = [],
  fieldPercentages = {},
  hasMore = false,
  onLoadMore,
}) => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: DURATION.STORYTELLING, delay: 0.1, ease: EASING.SMOOTH }}
      className="bg-white rounded-[20px] border border-black/[0.08] p-6 sm:p-7 shadow-2xs h-full flex flex-col justify-between"
    >
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-4">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
              COMMUNITY DISCOVERY
            </span>
            <h3 className="text-[20px] font-bold text-[#111111] tracking-[-0.5px]">
              Find something new to learn
            </h3>
            <p className="text-[12px] text-[#615d59]">
              Explore communities across different subjects and interests.
            </p>
          </div>
          {groups.length > 0 && (
            <Link
              to="/find-groups"
              className="group text-[12px] font-semibold text-[#0075de] hover:underline flex items-center gap-1"
            >
              <span>Directory</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        {/* Connected Topic Node Visual Accent */}
        <div className="p-3 mb-4 rounded-[12px] bg-[#f6f5f4] border border-black/[0.06] flex items-center justify-between text-[11px] font-mono text-[#615d59]">
          <span className="text-[#0075de] font-semibold">Security</span>
          <span>──────</span>
          <span className="w-2 h-2 rounded-full bg-[#0075de] inline-block" />
          <span>──────</span>
          <span className="text-[#6366f1] font-semibold">AI & ML</span>
          <span>──────</span>
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] inline-block" />
          <span>──────</span>
          <span className="text-[#d97706] font-semibold">Design</span>
        </div>

        {/* Recommended Cards or Discovery Empty State */}
        {groups.length > 0 ? (
          <div className="space-y-4">
            {groups.slice(0, 2).map((group) => {
              const matchPercentage = fieldPercentages[group.field] || 0;
              return (
                <StudyGroupCard
                  key={group._id || group.id}
                  group={{ ...group, match: matchPercentage }}
                  isSuggested
                />
              );
            })}

            {hasMore && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={onLoadMore}
                  data-cursor-ignore="true"
                  className="px-4 py-2 bg-[#f6f5f4] hover:bg-black/5 text-[#111111] text-[12px] font-semibold rounded-[8px] border border-black/[0.08] transition-colors cursor-pointer"
                >
                  More recommendations
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#0075de]/10 text-[#0075de] flex items-center justify-center">
              <DirectoryIcon className="w-5 h-5" />
            </div>
            <h4 className="text-[16px] font-bold text-[#111111]">
              Explore open study groups
            </h4>
            <p className="text-[13px] text-[#615d59] max-w-xs leading-relaxed font-sans">
              Discover active study groups across computer science, engineering, security, and design.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate("/find-groups")}
                data-cursor-ignore="true"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer shadow-2xs"
              >
                <Compass className="w-16 h-16" />
                <span>Browse directory →</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="pt-4 border-t border-black/[0.06] mt-4 flex items-center justify-between text-[11px] font-mono text-[#757575]">
        <span>Subject Directory</span>
        <Link
          to="/find-groups"
          className="text-[12px] font-semibold text-[#0075de] hover:underline flex items-center gap-1"
        >
          <span>Explore All Groups →</span>
        </Link>
      </div>
    </motion.section>
  );
};

export default RecommendedGroups;
