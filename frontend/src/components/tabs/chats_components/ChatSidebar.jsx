import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

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
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { toggleTheme } from "../../../features/theme/themeSlice";
import { useParams } from "react-router-dom";
import { addMessage, clearMessages, fetchMessages } from "../../../features/messages/messagesSlice";

const ChatSidebar = ({ aiText, isAiPanelOpen, setIsAiPanelOpen }) => {
  const theme = useSelector((state) => state.theme.mode);
  const messages = useSelector((state) => state.messages.messages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState();
  const [isMaximize, setIsMaximize] = useState(false);
  const dispatch = useDispatch();

  const {groupId} = useParams();

  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      withCredentials: true,
    });
    const getMessages = async () => {
      try {
        console.log(groupId)
        const response = await dispatch(fetchMessages({ groupId })
        );
        console.log("Fetch response:", response);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    getMessages();
    socketInstance.on("ai-conversation-response", (data) => {
      if (!data || !data.text || data.text.trim() === "") return;

      const newMsg = {
        id: data._id || Date.now(),
        text: data.text.trim(),
        isYou: false,
      };
      dispatch(addMessage(newMsg));
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = newMessage.trim();
    if (text === "") return;

    const newMessageObj = {
      id: messages.length + 1,
      text,
      isYou: true,
    };
    if (socket) {
      socket.emit("ai-conversation", { text });
    }
    dispatch(addMessage(newMessageObj));
    setNewMessage("");
    scrollToBottom();
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

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);

  let split = SplitText.create(".split", {
    type: "words, lines",
  });

  useGSAP(() => {
    if (isAiPanelOpen) {
      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power2.out",
        autoAlpha: 1,
      });
    }
  }, [messages]);

  return (
    <motion.aside
      layout
      initial={{ x: 400, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        width: isMaximize ? "100%" : "340px",
        inset: isMaximize ? "0px" : "128px 32px 40px auto",
      }}
      exit={{ x: 400, opacity: 0 }}
      className={`fixed p-6 shadow-3xl z-60 flex flex-col transition-all duration-300 ${
        theme === "light"
          ? "bg-white text-black border-black/10"
          : "bg-zinc-950/80 text-white border-white/10"
      } ${isMaximize ? "rounded-0" : "rounded-[40px]"}`}
      style={{
        top: isMaximize ? 0 : undefined,
        right: isMaximize ? 0 : undefined,
        bottom: isMaximize ? 0 : undefined,
        left: isMaximize ? 0 : undefined,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 rounded-2xl shadow-[0_0_25px_rgba(79,70,229,0.5)]">
            <Zap size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h3
              className={`font-black text-xs uppercase tracking-widest ${theme === "light" ? "text-black" : "text-white"}`}
            >
              AI Pulse
            </h3>
            <span className="text-[10px] text-zinc-500 font-bold">
              GPT-4o Optimized
            </span>
          </div>
        </div>
        <span className="flex items-center gap-2">
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

      {messages.filter((msg) => msg.text && msg.text.trim() !== "").length ===
      0 ? (
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
          className="flex-1 overflow-y-auto space-y-3 mb-14 pr-2"
        >
          {messages
            .filter((msg) => msg.text && msg.text.trim() !== "")
            .map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.isYou ? "justify-end" : "justify-start"}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`split px-4 py-2 text-md ${theme === "dark" ? "text-white" : "text-black"} rounded-2xl ${
                    msg.isYou
                      ? `bg-white/10 self-end`
                      : `bg-white/20 self-start ${isMaximize ? "w-[60%]" : "w-[80%]"}`
                  }`}
                >
                  <Markdown rehypePlugins={[rehypeHighlight]}>
                    {msg.text}
                  </Markdown>
                </motion.div>
                {msg.isYou && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="p-2.5 bg-indigo-600 rounded-2xl shadow-[0_0_25px_rgba(79,70,229,0.5)]"
                  >
                    <Wand2 size={16} className="text-white" />
                  </motion.div>
                )}
              </div>
            ))}
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="mt-8 absolute bottom-3 left-3 right-3"
      >
        <div className="relative group">
          <input
            type="text"
            placeholder="Prompt AI..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`w-full border border-white/10 rounded-2xl py-4 px-6 text-xs ${theme === "dark" ? "bg-black/5 text-white placeholder:text-white/20" : "bg-white/5 text-black placeholder:text-black"} outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all pr-14 font-medium`}
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
