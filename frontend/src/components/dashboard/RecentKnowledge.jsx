import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, ArrowRight, Clock, Plus } from "lucide-react";

/**
 * RecentKnowledge
 * Surfaces user's recently created or saved Markdown knowledge notes.
 */
const RecentKnowledge = ({ notes = [] }) => {
  const navigate = useNavigate();
  const displayedNotes = notes.slice(0, 4);

  return (
    <section className="bg-white rounded-[16px] border border-black/[0.08] p-5 sm:p-6 shadow-2xs h-full flex flex-col justify-between">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-4">
          <div>
            <h3 className="text-[18px] font-bold text-[#111111] tracking-[-0.3px]">
              Recent knowledge
            </h3>
            <p className="text-[12px] text-[#615d59]">
              Notes created or saved across study groups.
            </p>
          </div>
          {notes.length > 0 && (
            <Link
              to="/saved-notes"
              className="group text-[12px] font-semibold text-[#0075de] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        {/* Notes List */}
        {displayedNotes.length > 0 ? (
          <div className="space-y-3">
            {displayedNotes.map((note) => {
              const noteId = note._id || note.id;
              return (
                <div
                  key={noteId}
                  onClick={() => navigate(`/saved-notes`)}
                  className="group/note p-3 rounded-[10px] bg-[#f6f5f4] hover:bg-[#e6f3fe]/60 border border-black/[0.06] hover:border-[#0075de]/30 transition-all duration-150 cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-bold text-[#111111] group-hover/note:text-[#0075de] transition-colors truncate">
                      {note.title || "Untitled Knowledge Note"}
                    </h4>
                    <span className="px-2 py-0.5 rounded bg-white text-[#615d59] text-[10px] font-mono font-semibold shrink-0 border border-black/[0.06]">
                      {note.field || note.category || "General"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#757575] font-mono">
                    <span className="truncate max-w-[200px]">
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
          <div className="py-8 text-center flex flex-col items-center justify-center space-y-2">
            <div className="w-9 h-9 rounded-full bg-[#ffb110]/15 text-[#b18164] flex items-center justify-center">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-[14px] font-bold text-[#111111]">
              No notes saved yet
            </h4>
            <p className="text-[12px] text-[#615d59] max-w-xs leading-normal">
              Capture useful Markdown notes inside group workspaces to build your knowledge library.
            </p>
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-black/[0.06] mt-4 flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#757575]">
          Markdown Knowledge Base
        </span>
        <Link
          to="/saved-notes"
          className="text-[12px] font-semibold text-[#0075de] hover:underline flex items-center gap-1"
        >
          <span>Open Notes Library</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </section>
  );
};

export default RecentKnowledge;
