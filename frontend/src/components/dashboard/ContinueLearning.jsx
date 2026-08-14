import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, MessageSquare, FileText, Compass, Sparkles } from "lucide-react";

/**
 * ContinueLearning
 * High-priority hero card that directs the user to pick up their latest active study session.
 * Features an intentional empty state if no groups have been joined yet.
 */
const ContinueLearning = ({ latestGroup }) => {
  if (!latestGroup) {
    return (
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[20px] font-bold text-[#000000] tracking-[-0.3px]">
              Continue learning
            </h2>
            <p className="text-[13px] text-[#615d59]">Pick up where you left off.</p>
          </div>
        </div>

        <div className="bg-white rounded-[16px] border border-black/[0.08] p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#0075de]/10 text-[#0075de] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-[18px] font-bold text-[#111111]">
            Your learning space is ready.
          </h3>
          <p className="text-[14px] text-[#615d59] max-w-md leading-relaxed">
            Join a study group to start collaborating, sharing notes, and discussing course topics with peers.
          </p>
          <div className="pt-2">
            <Link
              to="/find-groups"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-all duration-150"
            >
              <span>Explore study groups</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[20px] font-bold text-[#000000] tracking-[-0.3px]">
            Continue learning
          </h2>
          <p className="text-[13px] text-[#615d59]">Pick up where you left off.</p>
        </div>
      </div>

      {/* Active Session Continuation Card */}
      <div className="bg-white rounded-[16px] border border-black/[0.08] p-5 sm:p-6 shadow-2xs hover:border-[#0075de]/30 transition-all duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0075de]/10 text-[#0075de] text-[11px] font-mono font-semibold">
                {latestGroup.field || "Active Group"}
              </span>
              <span className="text-[12px] text-[#757575] font-mono">
                Recent Workspace Session
              </span>
            </div>

            <h3 className="text-[20px] sm:text-[22px] font-bold text-[#111111] tracking-[-0.4px]">
              {latestGroup.name}
            </h3>

            <p className="text-[13px] text-[#615d59] line-clamp-2 max-w-2xl leading-relaxed">
              {latestGroup.description || "Active collaborative study group and shared knowledge library."}
            </p>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/[0.06]">
            <Link
              to={`/group/${latestGroup._id}`}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-all duration-150 shadow-2xs hover:-translate-y-0.5"
            >
              <span>Continue workspace</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center gap-3 text-[12px]">
              <Link
                to={`/group/${latestGroup._id}/chats`}
                className="text-[#615d59] hover:text-[#0075de] flex items-center gap-1 font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Chat
              </Link>
              <Link
                to={`/group/${latestGroup._id}`}
                className="text-[#615d59] hover:text-[#0075de] flex items-center gap-1 font-medium"
              >
                <FileText className="w-3.5 h-3.5" /> Notes
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContinueLearning;
