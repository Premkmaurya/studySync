import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, ArrowRight, Clock, Code, BookOpen } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * RecentKnowledge
 * Surfaces user's recently created or saved Markdown knowledge notes with explicit note-type tags,
 * clean dividers, and open library CTA.
 */
const RecentKnowledge = ({ notes = [] }) => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const displayedNotes = notes.slice(0, 4);

  return (
    <motion.section
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: DURATION.STORYTELLING, ease: EASING.SMOOTH }}
      className="bg-white rounded-[20px] border border-black/[0.08] p-6 sm:p-7 shadow-2xs h-full flex flex-col justify-between"
    >
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-4">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
              MY KNOWLEDGE BASE
            </span>
            <h3 className="text-[20px] font-bold text-[#111111] tracking-[-0.5px]">
              Recent knowledge
            </h3>
            <p className="text-[12px] text-[#615d59]">
              Notes created or saved across your study groups.
            </p>
          </div>
          {notes.length > 0 && (
            <Link
              to="/saved-notes"
              className="group text-[12px] font-semibold text-[#0075de] hover:underline flex items-center gap-1"
            >
              <span>Library</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        {/* Notes List with Clean Dividers & Type Badges */}
        {displayedNotes.length > 0 ? (
          <div className="divide-y divide-black/[0.06]">
            {displayedNotes.map((note) => {
              const noteId = note._id || note.id;
              const hasCode = (note.content || "").includes("```") || (note.title || "").toLowerCase().includes("code");
              return (
                <div
                  key={noteId}
                  onClick={() => navigate(`/saved-notes`)}
                  className="group/note py-3.5 hover:bg-[#eaf4ff]/50 px-2 -mx-2 rounded-[8px] transition-all duration-150 cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-[14px] font-bold text-[#111111] group-hover/note:text-[#0075de] transition-colors truncate">
                      {note.title || "Untitled Knowledge Note"}
                    </h4>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="px-2 py-0.5 rounded bg-[#0075de]/10 text-[#0075de] text-[10px] font-mono font-semibold">
                        {hasCode ? "Code Snippet" : "Markdown"}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#f6f5f4] text-[#615d59] text-[10px] font-mono font-semibold border border-black/[0.06]">
                        {note.field || note.category || "General"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#757575] font-mono">
                    <span className="truncate max-w-[220px]">
                      {note.groupName || note.description || "Shared note"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Updated recently</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-10 text-center flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#ffb110]/15 text-[#b18164] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-[15px] font-bold text-[#111111]">
              No notes saved yet
            </h4>
            <p className="text-[13px] text-[#615d59] max-w-xs leading-normal font-sans">
              Capture useful Markdown notes inside group workspaces to build your personal knowledge library.
            </p>
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-black/[0.06] mt-4 flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#757575]">
          Markdown Knowledge Repository
        </span>
        <Link
          to="/saved-notes"
          className="text-[12px] font-semibold text-[#0075de] hover:underline flex items-center gap-1"
        >
          <span>Open Notes Library →</span>
        </Link>
      </div>
    </motion.section>
  );
};

export default RecentKnowledge;
