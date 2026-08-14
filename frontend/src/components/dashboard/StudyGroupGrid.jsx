import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, ArrowRight, Compass } from "lucide-react";
import StudyGroupCard from "./StudyGroupCard";

/**
 * StudyGroupGrid
 * Renders user's joined study groups in a structured responsive grid with load more functionality.
 */
const StudyGroupGrid = ({ groups = [], hasMore = false, onLoadMore }) => {
  const navigate = useNavigate();

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[20px] font-bold text-[#000000] tracking-[-0.3px]">
            Your study groups
          </h2>
          <p className="text-[13px] text-[#615d59]">
            Groups you're actively learning with.
          </p>
        </div>
        {groups.length > 0 && (
          <Link
            to="/find-groups"
            className="group text-[13px] font-semibold text-[#0075de] hover:underline flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Grid or Empty State */}
      {groups.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {groups.map((group) => (
              <StudyGroupCard key={group._id || group.id} group={group} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={onLoadMore}
                className="px-5 py-2 bg-white hover:bg-black/5 text-[#111111] text-[13px] font-semibold rounded-[8px] border border-black/15 transition-colors cursor-pointer"
              >
                Load more groups
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-[16px] border border-black/[0.08] p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-[#0075de]/10 text-[#0075de] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-[17px] font-bold text-[#111111]">
            No study groups joined yet.
          </h3>
          <p className="text-[13px] text-[#615d59] max-w-sm leading-relaxed">
            Find a community around something you're learning to start collaborating with peers.
          </p>
          <div className="pt-1">
            <button
              onClick={() => navigate("/find-groups")}
              className="inline-flex items-center gap-2 px-4.5 py-2 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore groups</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudyGroupGrid;
