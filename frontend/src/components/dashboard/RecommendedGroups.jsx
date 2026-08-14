import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, ArrowRight, Sparkles } from "lucide-react";
import StudyGroupCard from "./StudyGroupCard";

/**
 * RecommendedGroups
 * Redesigned recommendation section surfacing group discoveries matching academic interests.
 * Features a helpful, compact empty state if recommendations aren't ready yet.
 */
const RecommendedGroups = ({
  groups = [],
  fieldPercentages = {},
  hasMore = false,
  onLoadMore,
}) => {
  const navigate = useNavigate();

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[20px] font-bold text-[#000000] tracking-[-0.3px]">
            Find something new to learn
          </h2>
          <p className="text-[13px] text-[#615d59]">
            Study groups matching your academic interests.
          </p>
        </div>
        {groups.length > 0 && (
          <Link
            to="/find-groups"
            className="group text-[13px] font-semibold text-[#0075de] hover:underline flex items-center gap-1"
          >
            <span>Browse directory</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Recommended Grid or Intentional Empty State */}
      {groups.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {groups.map((group) => {
              const matchPercentage = fieldPercentages[group.field] || 0;
              return (
                <StudyGroupCard
                  key={group._id || group.id}
                  group={{ ...group, match: matchPercentage }}
                  isSuggested
                />
              );
            })}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={onLoadMore}
                className="px-5 py-2 bg-white hover:bg-black/5 text-[#111111] text-[13px] font-semibold rounded-[8px] border border-black/15 transition-colors cursor-pointer"
              >
                Load more recommendations
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-[16px] border border-black/[0.08] p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-[#ffb110]/15 text-[#e89d01] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-[17px] font-bold text-[#111111]">
            We couldn't find recommendations yet.
          </h3>
          <p className="text-[13px] text-[#615d59] max-w-md leading-relaxed">
            Explore the directory to discover communities across engineering, algorithms, AI, security, and design.
          </p>
          <div className="pt-1">
            <button
              onClick={() => navigate("/find-groups")}
              className="inline-flex items-center gap-2 px-4.5 py-2 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Browse directory</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecommendedGroups;
