import React from "react";
import { motion } from "framer-motion";

import { ChevronLeft, Share2, CloudUpload } from "lucide-react";

const Header = ({
  groupName,
  profession,
  isViewOnly,
  isAiPanelOpen,
  setIsAiPanelOpen,
  isShareOpen,
  setIsShareOpen,
  handleSave,
  isSaving,
}) => {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-zinc-900/40 backdrop-blur-3xl border rounded-[24px] px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-4">
          <button className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-slate-400 group">
            <ChevronLeft
              size={22}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </button>
          <div className="flex flex-col border-l border-white/10 pl-5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-black leading-none mb-1">
              {profession}
            </span>
            <h2 className="text-sm font-bold tracking-tight text-white/90">
              {groupName}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2 mr-2">
            {[1, 2, 3].map((i) => (
              <motion.img
                key={i}
                whileHover={{ y: -4, scale: 1.1 }}
                src={`https://i.pravatar.cc/100?u=${i + 20}`}
                className="w-9 h-9 rounded-full border-2 border-zinc-900 shadow-2xl cursor-pointer"
              />
            ))}
          </div>
          {!isViewOnly ? (
            <button
              onClick={handleSave}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 ${
                isSaving
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-white text-black hover:bg-indigo-50 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              }`}
            >
              <CloudUpload
                size={18}
                className={isSaving ? "animate-bounce" : ""}
              />
              {isSaving ? "SYNCING..." : "SAVE CHANGES"}
            </button>
          ) : (
            <button
              onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
              className="p-2.5 bg-white/95 border border-white/10 rounded-xl transition-all text-black"
            >
              AI Summary
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
