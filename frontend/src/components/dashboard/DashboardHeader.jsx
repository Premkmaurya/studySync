import React from "react";
import { Link } from "react-router-dom";
import { Plus, Compass, ArrowRight, Sparkles, BookOpen, Users } from "lucide-react";

/**
 * DashboardHeader
 * Personalized welcome header for logged-in users.
 * Displays dynamic username, learning context line, and primary workspace action triggers.
 */
const DashboardHeader = ({ user, joinedCount = 0, notesCount = 0 }) => {
  const firstName =
    user?.fullname?.firstname || user?.username || "Student";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-[6rem] pb-6 border-b border-black/[0.08] mb-8">
      {/* Left: Dynamic Greeting & Context */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de] text-[11px] font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Learning Workspace
          </span>
          {joinedCount > 0 && (
            <span className="text-[12px] font-mono text-[#757575]">
              • {joinedCount} active group{joinedCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <h1 className="text-[28px] sm:text-[36px] font-bold text-[#000000] tracking-[-1px] leading-tight">
          Welcome back, {firstName}.
        </h1>

        <p className="text-[14px] sm:text-[16px] text-[#615d59] font-normal">
          Pick up where you left off or find something new to learn today.
        </p>
      </div>

      {/* Right: Primary Workspace Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/create-group"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white font-semibold text-[14px] rounded-[8px] transition-all duration-150 shadow-2xs hover:-translate-y-0.5"
        >
          <Plus className="w-16 h-16" />
          <span>Create group</span>
        </Link>

        <Link
          to="/find-groups"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-black/[0.03] text-[#111111] font-semibold text-[14px] rounded-[8px] border border-black/15 transition-all duration-150 hover:border-black/30"
        >
          <Compass className="w-16 h-16 text-[#757575]" />
          <span>Explore groups</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#757575]" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
