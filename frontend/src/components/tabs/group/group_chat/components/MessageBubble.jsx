import React from "react";
import { motion } from "framer-motion";

const MessageBubble = ({ message }) => {
  const isYou = message.isYou;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`flex w-full mb-6 ${isYou ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[80%] gap-4 ${isYou ? "flex-row-reverse" : "flex-row"}`}
      >
        {/* Avatar */}
        <div className="shrink-0 mt-auto">
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-black border transition-all ${
              isYou
                ? "bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                : "bg-zinc-800 text-zinc-400 border-white/5 shadow-xl"
            }`}
          >
            {isYou
              ? "YOU"
              : `${message.sender.firstname[0]}${message.sender.lastname[0]}`}
          </div>
        </div>

        {/* Bubble Content */}
        <div className={`flex flex-col ${isYou ? "items-end" : "items-start"}`}>
          {!isYou && (
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 ml-1">
              {message.sender.firstname} {message.sender.lastname}
            </span>
          )}
          <div
            className={`relative px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
              isYou
                ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-100 rounded-tr-none"
                : "bg-white/5 backdrop-blur-md border border-white/5 text-zinc-200 rounded-tl-none"
            }`}
          >
            {message.text}

            {/* Soft glow for "You" messages */}
            {isYou && (
              <div className="absolute inset-0 bg-indigo-500/5 blur-xl pointer-events-none -z-10" />
            )}
          </div>
          <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest mt-2 px-1">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
