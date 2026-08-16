import React, { useState } from "react";
import { selectSavedNotes } from "../../../../../../features/notes/notesSelectors";
import { useSelector } from "react-redux";
import { Bookmark, ArrowRight, Compass } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../../../../../motion/motionTokens";

/**
 * SavedNote
 * Displays bookmarked notes in a compact profile-oriented saved knowledge view.
 */
const SavedNote = () => {
  const savedNotes = useSelector(selectSavedNotes) || [];
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [visibleSavedNotes, setVisibleSavedNotes] = useState(6);

  const handleClick = (note) => {
    const groupId = note.groupId?._id || note.groupId;
    if (groupId) {
      navigate(`/group/${groupId}`);
      setTimeout(() => {
        navigate(`/group/${groupId}/note`, {
          state: {
            title: note.noteId?.title || "Saved Note",
            content: note.noteId?.content || "",
            isViewOnly: true,
            groupName: note.groupId?.name || "Group Note",
            profession: note.groupId?.field || "General",
          },
        });
      }, 200);
    }
  };

  if (!savedNotes || savedNotes.length === 0) {
    return (
      <div className="bg-white rounded-[20px] border border-black/[0.08] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-2xs my-4">
        <div className="w-12 h-12 rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center">
          <Bookmark className="w-16 h-16 fill-[#10b981]" />
        </div>
        <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111]">
          Nothing Saved Yet
        </h3>
        <p className="text-[13px] text-[#615d59] max-w-md leading-relaxed font-sans">
          Save useful notes while browsing group knowledge bases to return to them quickly here.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigate("/saved-notes")}
            data-cursor-ignore="true"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-colors shadow-2xs cursor-pointer"
          >
            <Compass className="w-16 h-16" />
            <span>Explore Notes →</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
            SAVED KNOWLEDGE
          </span>
          <h3 className="text-[20px] font-bold text-[#111111] tracking-[-0.5px]">
            Bookmarked Notes
          </h3>
        </div>

        <Link
          to="/saved-notes"
          data-cursor-ignore="true"
          className="text-[12px] font-semibold text-[#0075de] hover:underline flex items-center gap-1"
        >
          <span>View library</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedNotes.slice(0, visibleSavedNotes).map((note, i) => (
          <motion.div
            key={note._id || i}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.COMPONENT, delay: i * 0.05, ease: EASING.SMOOTH }}
            onClick={() => handleClick(note)}
            className="group bg-white rounded-[16px] border border-black/[0.08] p-5 flex items-center justify-between hover:border-[#0075de]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-[8px] bg-[#0075de]/10 text-[#0075de] shrink-0">
                <Bookmark className="w-16 h-16 fill-[#0075de]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[16px] font-bold text-[#111111] tracking-[-0.3px] group-hover:text-[#0075de] transition-colors line-clamp-1">
                  {note.noteId?.title || "Saved Note"}
                </h4>
                <span className="text-[12px] font-mono text-[#757575] block">
                  {note.groupId?.name || "Group Knowledge Entry"}
                </span>
              </div>
            </div>

            <span className="text-[12px] font-semibold text-[#0075de] shrink-0 flex items-center gap-1">
              <span>Read note</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </motion.div>
        ))}
      </div>

      {savedNotes.length > visibleSavedNotes && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleSavedNotes((prev) => prev + 6)}
            data-cursor-ignore="true"
            className="px-6 py-2.5 bg-white hover:bg-black/5 text-[#111111] text-[13px] font-semibold rounded-[8px] border border-black/15 transition-colors cursor-pointer shadow-2xs"
          >
            Load more saved notes
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedNote;
