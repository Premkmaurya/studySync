import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { FaRegWindowRestore } from "react-icons/fa";

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

  // useEffect(() => {
  //   const socketInstance = io("http://localhost:3000", {
  //     withCredentials: true,
  //   });
  //   socketInstance.emit("aiMessage", aiText);
  //   socketInstance.on("ai-response", (data) => {
  //     const newMsg = {
  //       id: data._id,
  //       text: data.text,
  //       isYou: false,
  //     };
  //     setMessages((prevMessages) => [...prevMessages, newMsg]);
  //   });
  //   setSocket(socketInstance);

  //   return () => {
  //     socketInstance.disconnect();
  //   };
  // }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMessageObj = {
      id: messages.length + 1,
      text: newMessage,
      isYou: true,
    };
    socket.emit("aiMessage", newMessage);
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

      <div className="flex-1 space-y-5 overflow-y-auto pr-2 custom-scrollbar">
        {[
          {
            icon: Wand2,
            title: "GENERATE SUMMARY",
            desc: "Extract the core pillars.",
            color: "bg-fuchsia-500/10 text-fuchsia-400",
          },
          {
            icon: MessageSquare,
            title: "CHANGE TONE",
            desc: "Switch to executive speak.",
            color: "bg-cyan-500/10 text-cyan-400",
          },
          {
            icon: LayoutGrid,
            title: "BENTO GRID",
            desc: "Convert note to structured blocks.",
            color: "bg-amber-500/10 text-amber-400",
          },
        ].map((action, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.03)" }}
            className="p-6 border border-white/5 rounded-3xl cursor-pointer transition-all group"
          >
            <div className={`p-3 w-fit rounded-xl mb-4 ${action.color}`}>
              <action.icon size={20} />
            </div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-2">
              {action.title}
            </h4>
            <p className="text-[12px] text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors">
              {action.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <div className="relative group">
          <input
            type="text"
            placeholder="Prompt AI..."
            className="w-full bg-white/5 border text-white border-white/10 rounded-2xl py-4 px-6 text-xs outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all pr-14 font-medium"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 rounded-xl cursor-pointer">
            <Sparkles size={16} className="text-white" />
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default ChatSidebar;
