import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMyNotes } from "../../../../../../features/notes/notesSelectors";
import { FileText, ArrowRight, Clock } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../../../../../motion/motionTokens";

dayjs.extend(relativeTime);

/**
 * NoteSection
 * Displays notes created by the user in a clean knowledge grid.
 */
const NoteSection = () => {
  const myNotes = useSelector(selectMyNotes) || [];
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (note) => {
    const groupId = note.groupId?._id || note.groupId;
    if (groupId) {
      navigate(`/group/${groupId}`);
      setTimeout(() => {
        navigate(`/group/${groupId}/note`, {
          state: {
            title: note.title,
            content: note.content,
            isViewOnly: true,
            groupName: note.groupId?.name || "Group Note",
            profession: note.groupId?.field || "General",
          },
        });
      }, 200);
    }
  };

  if (!myNotes || myNotes.length === 0) {
    return (
      <div className="bg-white rounded-[20px] border border-black/[0.08] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-2xs my-4">
        <div className="w-12 h-12 rounded-full bg-[#ffb110]/15 text-[#b18164] flex items-center justify-center">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111]">
          No Notes Created Yet
        </h3>
        <p className="text-[13px] text-[#615d59] max-w-md leading-relaxed font-sans">
          Write shared study notes inside group workspaces to compile your knowledge across subjects.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
            MY KNOWLEDGE
          </span>
          <h3 className="text-[20px] font-bold text-[#111111] tracking-[-0.5px]">
            Created Notes
          </h3>
        </div>
        <span className="text-[12px] font-mono text-[#757575]">
          {myNotes.length} note{myNotes.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myNotes.map((note, i) => {
          const cleanPreview = (note.content || "")
            .replace(/```[\s\S]*?```/g, "")
            .replace(/<[^>]*>/g, "")
            .replace(/[#*`_~]/g, "")
            .trim();

          return (
            <motion.div
              key={note._id || i}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.COMPONENT, delay: i * 0.05, ease: EASING.SMOOTH }}
              onClick={() => handleClick(note)}
              className="group bg-white rounded-[16px] border border-black/[0.08] p-5 flex flex-col justify-between hover:border-[#0075de]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-2xs space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#757575]">
                  <span className="px-2 py-0.5 rounded bg-[#0075de]/10 text-[#0075de] font-semibold">
                    {note.groupId?.field || "General"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#0075de]" />
                    {dayjs(note.createdAt).fromNow()}
                  </span>
                </div>

                <h4 className="text-[17px] font-bold text-[#111111] tracking-[-0.3px] group-hover:text-[#0075de] transition-colors">
                  {note.title || "Untitled Note"}
                </h4>

                {cleanPreview && (
                  <p className="text-[13px] text-[#615d59] leading-relaxed line-clamp-2 font-sans">
                    {cleanPreview}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                <span className="text-[12px] font-mono text-[#757575] truncate max-w-[180px]">
                  {note.groupId?.name || "Group Note"}
                </span>

                <span className="text-[12px] font-semibold text-[#0075de] flex items-center gap-1">
                  <span>Read note</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NoteSection;
