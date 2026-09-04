import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, FileText, Compass, Sparkles, Clock, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * ContinueLearning — Hero Workspace Centerpiece
 * The dominant section on the dashboard highlighting the user's active session.
 * Features an active session timeline indicator, subject tag, description, and direct workspace triggers.
 */
const ContinueLearning = ({ latestGroup }) => {
  const shouldReduceMotion = useReducedMotion();

  if (!latestGroup) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
              PRIMARY WORKSPACE FOCUS
            </span>
            <h2 className="text-[24px] sm:text-[28px] font-bold text-[#000000] tracking-[-0.8px]">
              Continue learning
            </h2>
            <p className="text-[13px] text-[#615d59]">Pick up where you left off.</p>
          </div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.STORYTELLING, delay: 0.15, ease: EASING.SMOOTH }}
          className="bg-white rounded-[20px] border-2 border-dashed border-black/[0.12] p-8 sm:p-10 text-center flex flex-col items-center justify-center space-y-4 shadow-2xs"
        >
          <div className="w-12 h-12 rounded-full bg-[#0075de]/10 text-[#0075de] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-[20px] font-bold text-[#111111]">
            Your learning workspace is ready.
          </h3>
          <p className="text-[14px] text-[#615d59] max-w-md leading-relaxed font-sans">
            Join a study group to start collaborating, building shared Markdown notes, and participating in course discussions.
          </p>
          <div className="pt-2">
            <Link
              to="/find-groups"
              data-cursor-ignore="true"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-all duration-150 shadow-2xs hover:-translate-y-0.5"
            >
              <span>Explore study groups</span>
              <ArrowRight className="w-16 h-16" />
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="mb-14 px-1 sm:px-5">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
            PRIMARY WORKSPACE FOCUS
          </span>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#000000] tracking-[-0.8px]">
            Continue learning
          </h2>
          <p className="text-[13px] text-[#615d59]">Pick up where you left off.</p>
        </div>
      </div>

      {/* Hero Workspace Card (Dominant Surface) */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.STORYTELLING, delay: 0.15, ease: EASING.SMOOTH }}
        className="bg-white rounded-[20px] border border-black/[0.1] p-6 sm:p-8 shadow-[0px_8px_32px_rgba(0,0,0,0.04)] space-y-6 relative overflow-hidden group hover:border-[#0075de]/40 transition-all duration-300"
      >
        {/* Subtle Accent Stripe on Left */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0075de]" />

        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#0075de]/10 text-[#0075de] text-[11px] font-mono font-bold uppercase tracking-wider">
              {latestGroup.field || "Active Subject"}
            </span>
            <span className="text-[12px] text-[#757575] font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#0075de]" /> RECENT WORKSPACE SESSION
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#10b981] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Workspace Live
          </span>
        </div>

        {/* Main Content Area */}
        <div className="space-y-2">
          <h3 className="text-[24px] sm:text-[28px] font-bold text-[#111111] tracking-[-0.6px] group-hover:text-[#0075de] transition-colors">
            {latestGroup.name}
          </h3>

          <p className="text-[14px] sm:text-[15px] text-[#615d59] leading-relaxed max-w-3xl font-sans">
            {latestGroup.description || "Active collaborative study group and shared knowledge library."}
          </p>
        </div>

        {/* Subtle Active Session Indicator / Timeline */}
        <div className="p-3.5 rounded-[12px] bg-[#f6f5f4] border border-black/[0.06] flex flex-wrap items-center justify-between gap-3 text-[12px]">
          <div className="flex items-center gap-2 font-mono text-[#615d59]">
            <span className="text-[#111111] font-bold">SESSION TIMELINE:</span>
            <span className="flex items-center gap-1 text-[#0075de] font-semibold">
              ● Discussion
            </span>
            <span>──</span>
            <span className="flex items-center gap-1 text-[#ffb110] font-semibold">
              ● Shared note
            </span>
            <span>──</span>
            <span className="flex items-center gap-1 text-[#10b981] font-semibold">
              ● Active workspace
            </span>
          </div>

          <span className="text-[11px] font-mono text-[#757575]">Ready to pick up</span>
        </div>

        {/* Bottom Actions Row */}
        <div className="pt-2 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[13px] font-semibold">
            <Link
              to={`/group/${latestGroup._id}/chats`}
              className="text-[#615d59] hover:text-[#0075de] flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-16 h-16 text-[#0075de]" />
              <span>Group Chat</span>
            </Link>

            <Link
              to={`/group/${latestGroup._id}`}
              className="text-[#615d59] hover:text-[#0075de] flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-16 h-16 text-[#ffb110]" />
              <span>Group Notes</span>
            </Link>
          </div>

          <Link
            to={`/group/${latestGroup._id}`}
            data-cursor-ignore="true"
            className="group/btn inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-all duration-150 shadow-2xs hover:-translate-y-0.5"
          >
            <span>Continue workspace</span>
            <ArrowRight className="w-16 h-16 transition-transform duration-150 group-hover/btn:translate-x-1" />
          </Link>
        </div>

      </motion.div>
    </section>
  );
};

export default ContinueLearning;
