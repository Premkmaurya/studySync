import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, FileText, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


const GroupCard = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
      style={{ willChange: "transform, background-color" }}
      className={`relative group p-6 rounded-[32px] border transition-all duration-300 ${
        isSuggested
          ? "bg-indigo-500/5 border-indigo-500/20 hover:border-indigo-500/40 shadow-[0_20px_50px_rgba(99,102,241,0.05)]"
          : "bg-zinc-900/30 border-white/5 hover:border-white/10"
      }`}
    >
      {/* Match Percentage for Suggested */}
      {isSuggested && (
        <div className="absolute top-6 right-6 px-2 py-1 bg-indigo-500 text-white text-[8px] font-black rounded-full uppercase tracking-widest">
          {group.match}% Match
        </div>
      )}

      <div className="flex items-start gap-5 mb-8">
        <div className="relative">
          <div
            className={`absolute inset-0 blur-xl opacity-20 ${group.accent}`}
          />
          <img
            src={group.image}
            className="relative w-16 h-16 rounded-2xl object-cover border border-white/10"
            alt={group.name}
          />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase mb-1">
            {group.field}
          </div>
          <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
            {group.name}
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/100?u=${group.id + i}`}
              className="w-7 h-7 rounded-full border-2 border-zinc-950"
            />
          ))}
          <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-zinc-400 border-2 border-zinc-950">
            +{group.members}
          </div>
        </div>
        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          Active Now
        </span>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => navigate(`/group/${group._id}/chats`)}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          <MessageSquare size={14} /> Chat
        </button>
        <button
          onClick={() => navigate(`/group/${group._id}`)}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          <FileText size={14} /> Notes
        </button>
        {isSuggested && (
          <button className="p-3 bg-white text-black rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
            <Plus size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default GroupCard;
