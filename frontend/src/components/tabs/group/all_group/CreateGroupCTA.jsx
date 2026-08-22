import React from "react";
import { Link } from "react-router-dom";
import { Plus, Users } from "lucide-react";

/**
 * CreateGroupCTA
 * Compact bottom directory CTA inviting users to create their own group if they couldn't find a matching one.
 */
const CreateGroupCTA = () => {
  return (
    <section className="mt-16 pt-10 border-t border-black/[0.08]">
      <div className="bg-white rounded-[20px] border border-black/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xs">
        
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0075de] inline-block" />
            <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider">
              START A NEW COHORT
            </span>
          </div>

          <h3 className="text-[20px] sm:text-[22px] font-bold text-[#111111] tracking-[-0.4px]">
            Can't find the right group?
          </h3>

          <p className="text-[13px] sm:text-[14px] text-[#615d59] leading-relaxed font-sans">
            Create one and bring other learners together around your course, subject, or project.
          </p>
        </div>

        <Link
          to="/create-group"
          data-cursor-ignore="true"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white text-[13px] font-semibold rounded-[8px] transition-all duration-150 shadow-2xs hover:-translate-y-0.5 shrink-0"
        >
          <Plus className="w-16 h-16" />
          <span>Create group</span>
        </Link>

      </div>
    </section>
  );
};

export default CreateGroupCTA;
