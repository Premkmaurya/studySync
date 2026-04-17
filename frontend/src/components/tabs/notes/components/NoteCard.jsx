import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Share2, Trash2, Clock, ArrowUpRight, FileText } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);

const NoteCard = ({ note, index }) => {
  const theme = useSelector((state) => state.theme.mode);
  // Provide a default icon if note.icon is not available
  const IconComponent = note.icon || FileText;
  const noteColor = note.color || "bg-emerald-500";
  const navigate = useNavigate();

  const handleNoteClick = () => {
    // First navigate to group
    navigate(`/group/${note.groupId._id}`);
    // Then navigate to note after a brief delay
    setTimeout(() => {
      navigate(`/group/${note.groupId._id}/note`, {
        state: {
          title: note.title,
          content: note.content,
          isViewOnly: true,
          groupName: note.groupId.name,
          profession: note.groupId.field,
        },
      });
    }, 300);
  };

  return (
    <motion.div
      onClick={handleNoteClick}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.012,
        backgroundColor: "rgba(255, 255, 255, 0.03)",
      }}
      style={{ willChange: "transform, background-color" }}
      className="group relative p-5 bg-zinc-900/30 border border-white/5 rounded-[40px] hover:border-emerald-500/30 transition-all duration-300 shadow-2xl overflow-hidden"
    >
      {/* Emerald Glow on Hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-all" />

      <div className="flex items-start justify-between mb-8">
        <div
          className={`p-4 rounded-2xl bg-zinc-800 ${noteColor} bg-opacity-10 group-hover:bg-white group-hover:text-black transition-all duration-300`}
        >
          <IconComponent size={24} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase">
            {note.group}
          </span>
          <span className="text-zinc-800">•</span>
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            {dayjs(note.createdAt).fromNow()}
          </span>
        </div>
        <h3 className="text-2xl/8 tracking-tight text-white leading-tight group-hover:text-emerald-400 transition-colors">
          {note.title}
        </h3>
      </div>

      <div className="mt-7 pt-5 border-t border-white/5 flex items-center justify-end">
        <button className="flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-[0.2em] group/btn">
          OPEN INSIGHT{" "}
          <ArrowUpRight
            size={14}
            className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
          />
        </button>
      </div>
    </motion.div>
  );
};

export default NoteCard;
