/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

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
    className="text-[#0075de]"
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

  useEffect(() => {
    if (!isOpen) return;
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
      socketInstance.disconnect();
    };
  }, [isOpen, onClose, setContent]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-white border border-black/[0.12] rounded-[12px] p-6 shadow-none"
          >
            {loading && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#0075de] animate-pulse rounded-t-[12px]" />
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-[#e6f3fe] flex items-center justify-center">
                  <SparklesIcon />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#000000]">
                    AI Note Assistant
                  </h3>
                  <p className="text-[12px] text-[#757575]">
                    Prompt to generate notes directly in editor
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-[#757575] hover:text-black p-1 rounded-[6px]"
              >
                ✕
              </button>
            </div>

            <div className="relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything about your notes..."
                className="w-full resize-none rounded-[8px] border border-black/[0.12] bg-white p-3 text-[14px] text-[#000000] placeholder-[#757575] outline-none focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20"
                rows="4"
                autoFocus
              />

              <button
                onClick={handleSend}
                disabled={loading || !inputValue.trim()}
                className={`absolute bottom-3 right-3 p-2 rounded-[6px] transition-all ${
                  inputValue.trim()
                    ? "bg-[#0075de] text-white hover:bg-[#097fe8]"
                    : "bg-black/5 text-[#757575]"
                }`}
              >
                {loading ? "..." : <SendIcon />}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((text) => (
                <button
                  key={text}
                  onClick={() => setInputValue(text)}
                  className="rounded-full border border-black/[0.08] bg-black/[0.02] hover:bg-black/[0.05] px-3 py-1 text-[12px] text-[#615d59]"
                >
                  {text}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
