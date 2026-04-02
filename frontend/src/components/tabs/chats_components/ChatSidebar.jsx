import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import {
  Maximize2,
  X,
  Sparkles,
  Zap,
  Wand2,
  MessageSquare,
  LayoutGrid,
} from "lucide-react";
import { motion } from "framer-motion";

const ChatSidebar = ({
  aiText,
  setIsAisummarize,
  isAiPanelOpen,
  setIsAiPanelOpen,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const mainRef = useRef(null);
  const [socket, setSocket] = useState();
  const [isMaximize, setIsMaximize] = useState(false);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      withCredentials: true,
    });
    socketInstance.emit("ai-message", aiText);
    socketInstance.on("ai-response", (data) => {
      const newMsg = {
        id: data._id,
        text: data.text,
        isYou: false,
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    });
    setSocket(socketInstance);


    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMessageObj = {
      id: messages.length + 1,
      text: newMessage,
      isYou: true,
    };
    socket.emit("ai-message", newMessage);
    scrollToBottom();
    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };
  const scrollToBottom = () => {
    const container = messagesEndRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight + 10; // Scroll to bottom with some extra space
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <motion.aside
     layout // This makes the size change animate smoothly
      initial={{ x: 400, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        // We can dynamically adjust these based on state
        width: isMaximize ? "100%" : "340px",
        inset: isMaximize ? "0px" : "128px 32px 40px auto" // top-32(128px) right-8(32px) bottom-10(40px)
      }}
      exit={{ x: 400, opacity: 0 }}
      className={`fixed bg-zinc-950/80 backdrop-blur-3xl border border-white/10 p-8 shadow-3xl z-60 flex flex-col transition-all duration-300 ${
        isMaximize ? "rounded-0" : "rounded-[40px]"
      }`}
      style={{
        // Ensure it covers everything when maximized
        top: isMaximize ? 0 : undefined,
        right: isMaximize ? 0 : undefined,
        bottom: isMaximize ? 0 : undefined,
        left: isMaximize ? 0 : undefined,
      }}
    >
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 rounded-2xl shadow-[0_0_25px_rgba(79,70,229,0.5)]">
            <Zap size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-black text-xs uppercase tracking-widest text-white">
              AI Pulse
            </h3>
            <span className="text-[10px] text-zinc-500 font-bold">
              GPT-4o Optimized
            </span>
          </div>
        </div>
        <span>
          <button
            onClick={() => setIsMaximize(!isMaximize)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Maximize2 size={18} className="text-zinc-500" />
          </button>
          <button
            onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={18} className="text-zinc-500" />
          </button>
        </span>
      </div>

      {messages.length <= 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <MessageSquare size={48} className="text-zinc-800" />
          <h3 className="text-sm font-bold text-zinc-600 uppercase tracking-widest">
            No messages yet
          </h3>
          <p className="text-xs text-zinc-700">
            Start the conversation by sending a message to the AI.
          </p>
        </div>
      ) : (
        <div
          ref={messagesEndRef}
          className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.isYou ? "justify-end" : "justify-start"}`}
            >
              {!msg.isYou && (
                <>
                  <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                    msg.isYou ? "bg-white/10 text-white self-end" : "bg-zinc-800 text-white"
                  }`}>
                    {msg.text}
                  </div>
                </>
              )}
              {msg.isYou && (
                <>
                  <div className={`max-w-[70%] px-4 py-2 rounded-2xl bg-white/10 text-white self-end`}>
                    {msg.text}
                  </div>
                  <div className="p-2.5 bg-indigo-600 rounded-2xl shadow-[0_0_25px_rgba(79,70,229,0.5)]">
                    <Wand2 size={16} className="text-white" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSendMessage} className="mt-8 absolute bottom-8 left-8 right-8">
        <div className="relative group">
          <input
            type="text"
            placeholder="Prompt AI..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full bg-white/5 border text-white border-white/10 rounded-2xl py-4 px-6 text-xs outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all pr-14 font-medium"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 rounded-xl cursor-pointer"
          >
            <Sparkles size={16} className="text-white" />
          </button>
        </div>
      </form>
    </motion.aside>
  );
};

export default ChatSidebar;