import React from "react";
import { Link } from "react-router-dom";
import { Plus, Compass, ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * DashboardHeader
 * Editorial welcome header for logged-in workspace users.
 * Combines dynamic greeting, live activity context badge, subtle SVG knowledge network accent,
 * and primary CTA triggers with custom cursor protection.
 */
const DashboardHeader = ({ user, joinedCount = 0, notesCount = 0 }) => {
  const shouldReduceMotion = useReducedMotion();
  const firstName =
    user?.fullname?.firstname || user?.username || "Student";

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
      className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 sm:pt-6 pb-8 border-b border-black/[0.08] mb-10 overflow-hidden"
    >
      {/* Background Subtle Knowledge Node Accent (Non-intrusive) */}
      <div className="absolute right-0 top-0 -z-10 opacity-35 pointer-events-none hidden md:block">
        <svg width="280" h="120" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="40" r="4" fill="#0075de" />
          <circle cx="240" cy="80" r="3" fill="#0075de" />
          <circle cx="160" cy="90" r="3" fill="#757575" />
          <line x1="200" y1="40" x2="240" y2="80" stroke="#0075de" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <line x1="200" y1="40" x2="160" y2="90" stroke="#757575" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        </svg>
      </div>

      {/* Left: Dynamic Editorial Greeting & Live Workspace Status */}
      <div className="space-y-2 max-w-2xl">
        <div className="flex items-left flex-col sm:items-center sm:flex-row gap-2.5">
          <span className="inline-flex items-center w-fit gap-1.5 px-3 py-0.5 whitespace-nowrap rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] text-[11px] font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> LEARNING WORKSPACE
          </span>
          <span className="text-[12px] font-mono text-[#757575]">
            • {joinedCount} active group{joinedCount !== 1 ? "s" : ""}
            {notesCount > 0 && ` • ${notesCount} note${notesCount !== 1 ? "s" : ""} in library`}
          </span>
        </div>

        <h1 className="text-[36px] sm:text-[48px] font-bold text-[#000000] tracking-[-1.8px] leading-[1.08]">
          Welcome back, {firstName}.
        </h1>

        <p className="text-[15px] sm:text-[17px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.5]">
          Pick up where you left off or find something new to learn today.
        </p>
      </div>

      {/* Right: Primary Workspace Actions */}
      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <Link
          to="/create-group"
          data-cursor-ignore="true"
          className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white font-semibold text-[13px] rounded-[8px] transition-all duration-150 shadow-2xs hover:-translate-y-0.5"
        >
          <Plus className="w-16 h-16" />
          <span>Create group</span>
        </Link>

        <Link
          to="/find-groups"
          data-cursor-ignore="true"
          className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-black/[0.03] text-[#111111] font-semibold text-[13px] rounded-[8px] border border-black/15 transition-all duration-150 hover:border-black/30"
        >
          <Compass className="w-16 h-16 text-[#757575]" />
          <span>Explore groups</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#757575] transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
