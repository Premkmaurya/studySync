import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

const MemberEntry = ({ member, index }) => {
  const theme = useSelector((state) => state.theme.mode);
  const isAdmin = member.role === "Admin";
  const firstName = String(member?.userId?.fullname?.firstname || "Node");
  const lastName = String(member?.userId?.fullname?.lastname || "");
  const userId = String(member?.userId?._id || index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      className="group flex items-center justify-between py-4 border-b border-white/5 hover:bg-white/[0.01] px-4 transition-all duration-300"
    >
      <div className="flex items-center gap-6">
        {/* Simple Avatar Slot */}
        <div className="relative">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[10px] border transition-all ${
              isAdmin
                ? theme === "dark" ? "bg-indigo-500/5 border-indigo-500/30 text-indigo-400" : "bg-indigo-400/5 border-indigo-400/30 text-indigo-600"
                : theme === "dark" ? "bg-zinc-950 border-white/10 text-zinc-600" : "bg-zinc-100 border-black/10 text-zinc-500"
            }`}
          >
            {firstName[0]}
            {lastName[0] || ""}
          </div>
          {isAdmin && (
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -inset-1 bg-indigo-500/10 blur-xl rounded-full -z-10"
            />
          )}
        </div>

        {/* Name & ID */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-zinc-200 uppercase tracking-tight group-hover:text-white transition-colors">
              {firstName} {lastName}
            </span>
            {isAdmin && (
              <span className="text-[8px] font-black text-indigo-400 border border-indigo-400/30 px-1.5 py-0.5 rounded uppercase tracking-widest">
                Admin
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono text-zinc-600 mt-0.5 uppercase tracking-widest">
            NODE_ID: {userId.substring(0, 8)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {isAdmin && (
          <button className="p-2 text-zinc-700 hover:text-white transition-colors">
            <MoreHorizontal size={18} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MemberEntry;
