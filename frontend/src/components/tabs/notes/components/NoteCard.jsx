import { motion } from "framer-motion";
import { Share2, Trash2, Clock, ArrowUpRight, FileText } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


dayjs.extend(relativeTime);


const NoteCard = ({ note, index }) => {
  // Provide a default icon if note.icon is not available
  const IconComponent = note.icon || FileText;
  const noteColor = note.color || "bg-emerald-500";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
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

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase">
            {note.group}
          </span>
          <span className="text-zinc-800">•</span>
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            {dayjs(note.createdAt).fromNow()}
          </span>
        </div>
        <h3 className="text-2xl font-black tracking-tighter text-white leading-tight group-hover:text-emerald-400 transition-colors">
          {note.title}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 font-medium">
          {note.snippet}
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-end">
        <button className="flex items-center gap-2 text-[7px] font-black text-white uppercase tracking-[0.2em] group/btn">
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
