import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

// Icons (Inline SVG for Zero Dependencies)
const SparklesIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-indigo-400"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M3 5h4" />
    <path d="M21 17v4" />
    <path d="M19 19h4" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

export default function AIPopup({ isOpen, onClose, setContent }) {
  const theme = useSelector((state) => state.theme.mode);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();

  const { groupId } = useParams();

  // Socket Logic
  useEffect(() => {
    if (!isOpen) return; // ✅ connect only when popup opens

    const socketInstance = io("http://localhost:3000", {
      withCredentials: true,
    });

    socketInstance.on("ai-notes-response", (data) => {
      setContent(data.content);
      setLoading(false);
      onClose();
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect(); // ✅ disconnect when popup closes
    };
  }, [isOpen]);

  // Handle Esc
  useEffect(() => {
    const handleEsc = (e) => {
      e.key === "Escape" && onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSend = () => {
    const messagePayload = {
      text: inputValue,
    };
    if (!inputValue.trim() || loading) return;
    setLoading(true);
    socket?.emit("ai-notes-request", messagePayload);
  };

  const suggestions = [
    "create notes on React",
    "summarize my last note",
    "what are my upcoming deadlines?",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`absolute inset-0 backdrop-blur-md ${
              theme === "light" ? "bg-white/60 text-black" : "bg-black/60 text-white"
            }`}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-xl overflow-hidden rounded-3xl border shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)] backdrop-blur-2xl ${
              theme === "light"
                ? "bg-white/80 border-black/10"
                : "bg-[#0D0D0D]/80 border-white/10"
            }`}
          >
            {/* Thinking Progress Bar */}
            {loading && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute top-0 h-0.5 w-full bg-linear-to-r from-transparent via-indigo-500 to-transparent"
              />
            )}

            <div className="p-6">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-inner ${theme === "light" ? "bg-indigo-500/10" : "bg-indigo-500/20"}`}>
                    <SparklesIcon />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold tracking-tight ${theme === "light" ? "text-black" : "text-white"} uppercase opacity-90`}>
                      Syncie AI
                    </h3>
                    <p className={`text-[11px] ${theme === "light" ? "text-black/40" : "text-white/40"} font-medium`}>
                      LENS-V2 MODEL ACTIVE
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`rounded-full p-2 ${theme === "light" ? "text-black/40 hover:bg-black/10" : "text-white/40 hover:bg-white/10"} transition-colors`}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Input Area */}
              <div className="relative group">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about your notes..."
                  className={`w-full resize-none rounded-2xl border border-white/5 bg-white/3 p-4 text-base ${theme === "light" ? "text-black placeholder:text-black/20" : "text-white placeholder:text-white/20"} focus:border-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300`}
                  rows="4"
                  autoFocus
                />

                {/* Floating Send Button */}
                <button
                  onClick={handleSend}
                  disabled={loading || !inputValue.trim()}
                  className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                    inputValue.trim()
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95"
                      : "bg-white/5 text-white/20"
                  }`}
                >
                  {loading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  ) : (
                    <SendIcon />
                  )}
                </button>
              </div>

              {/* Suggestions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((text) => (
                  <button
                    key={text}
                    onClick={() => setInputValue(text)}
                    className={`rounded-full border bg-white/2 px-3 py-1.5 text-xs ${theme === "light" ? "text-black/50 border-black/20 hover:border-black/20 hover:bg-black/5 hover:text-black" : "text-white/50 border-white/20 hover:border-white/20 hover:bg-white/5 hover:text-white"} transition-all`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Status */}
            <div className={`flex items-center justify-center border-t border-white/5  py-3 ${theme === "light" ? "text-white bg-black/2" : "text-black bg-white/2"} text-xs`}>
              <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${theme === "light" ? "text-black/40" : "text-white/40"}`}>
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                System Operational
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
