/* eslint-disable no-unused-vars, no-undef */
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
import { useParams } from "react-router-dom";
import {
  addMessage,
  clearMessages,
  fetchMessages,
} from "../../../features/messages/messagesSlice";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(_error, _errorInfo) {
    console.warn("Error in message rendering:");
  }

  render() {
    if (this.state.hasError) {
      return <p className="text-black">Error rendering message</p>;
    }
    return this.props.children;
  }
}

const ChatSidebar = ({ aiText: _aiText, isAiPanelOpen, setIsAiPanelOpen, id }) => {
  const theme = useSelector((state) => state.theme.mode);
  const messages = useSelector((state) => state.messages.messages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { groupId } = useParams();

  // Initialize socket connection once
  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      withCredentials: true,
    });

    socketInstance.on("ai-conversation-response", (data) => {
      if (!data || !data.text || data.text.trim() === "") return;

      const newMsg = {
        id: data._id || Date.now(),
        text: data.text.trim(),
        isYou: false,
      };
      dispatch(addMessage(newMsg));
      setIsLoading(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.off("ai-conversation-response");
      socketInstance.disconnect();
    };
  }, [dispatch]);

  // Fetch messages when groupId or id changes
  useEffect(() => {
    if (!groupId || !id) return;

    // Clear messages when opening/changing
    dispatch(clearMessages());

    // Fetch existing messages for the group
    const getMessages = async () => {
      try {
        const response = await dispatch(fetchMessages({ groupId, id }));
        if (response.payload && response.payload.chat) {
          dispatch(addMessage([...response.payload.chat]));
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [groupId, id, dispatch]);

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = newMessage.trim();
    if (text === "") return;

    const newMessageObj = {
      id: messages.length + 1,
      text,
      isYou: true,
      role: "user",
    };
    if (socket) {
      socket.emit("ai-conversation", { text, groupId, id });
    }
    dispatch(addMessage(newMessageObj));
    setNewMessage("");
    setIsLoading(true);
    scrollToBottom();
  };

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    const container = messagesEndRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight + 10; // Scroll to bottom with some extra space
    }
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(SplitText);
  }, []);

  useGSAP(() => {
    if (isAiPanelOpen) {
      try {
        const splitElements = document.querySelectorAll(".split");
        if (splitElements.length === 0) return;

        // Revert any previous SplitText instances to prevent conflicts
        SplitText.revert(".split");

        const split = SplitText.create(".split", {
          type: "words, lines",
        });

        if (split && split.words && split.words.length > 0) {
          gsap.to(split.words, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            autoAlpha: 1,
          });
        }
      } catch (error) {
        console.warn("GSAP animation error:", error);
      }
    }

    return () => {
      try {
        SplitText.revert(".split");
      } catch {
        // Silently fail if revert fails
      }
    };
  }, [isAiPanelOpen, messages]);

  return (
    <motion.aside
      layout
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        width: "100%",
        inset: "0px",
      }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed p-6 shadow-3xl z-60 flex flex-col transition-all duration-300 ${
        theme === "light"
          ? "bg-white text-black border-black/10"
          : "bg-zinc-950/80 text-white border-white/10"
      }"rounded-0"`}
      style={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
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
            onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
            className="p-2 hover:bg-white/5 cursor-pointer rounded-lg transition-colors"
          >
            <X size={18} className="text-zinc-500" />
          </button>
        </span>
      </div>

      {messages.filter((msg) => msg.text && msg.text.trim() !== "").length ===
      0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <MessageSquare
            size={48}
            className={theme === "dark" ? "text-zinc-700" : "text-zinc-400"}
          />
          <h3
            className={`text-sm font-bold uppercase tracking-widest ${theme === "dark" ? "text-zinc-500" : "text-zinc-500"}`}
          >
            No messages yet
          </h3>
          <p
            className={`text-xs ${theme === "dark" ? "text-zinc-600" : "text-zinc-500"}`}
          >
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
            .map((msg, index) => (
              <div
                key={msg._id || msg.id || index}
                className={`flex items-start gap-3 ${
                  msg.role === "user" || msg.isYou
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  layout
                  className={`split px-8 py-7 text-base leading-9 w-full max-w-4xl rounded-3xl backdrop-blur-xl border border-white/10 ${theme === "dark" ? "text-white" : "text-black"} rounded-2xl ${
                    msg.role === "user" || msg.isYou
                      ? `bg-white/10 self-end text-right`
                      : `bg-white/20 self-start text-left`
                  }`}
                >
                  <ErrorBoundary>
                    <Markdown
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                      h1: ({ children }) => (
                        <h1
                          className={`text-3xl font-black mt-8 mb-5 ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
                        >
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2
                          className={`text-2xl font-bold mt-7 mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}
                        >
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3
                          className={`text-xl font-semibold mt-6 mb-3 ${theme === "dark" ? "text-zinc-200" : "text-zinc-800"}`}
                        >
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p
                          className={`leading-9 text-[17px] mb-5 ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                        >
                          {children}
                        </p>
                      ),

                      ul: ({ children }) => (
                        <ul
                          className={`space-y-3 ml-5 mb-5 list-disc ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                        >
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol
                          className={`space-y-3 ml-5 mb-5 list-decimal ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}
                        >
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="leading-8 pl-2">{children}</li>
                      ),

                      strong: ({ children }) => (
                        <strong
                          className={`font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
                        >
                          {children}
                        </strong>
                      ),

                      code({ inline, className, children }) {
                        return inline ? (
                          <code
                            className={`px-2 py-1 rounded ${theme === "dark" ? "bg-zinc-800 text-indigo-300" : "bg-zinc-200 text-indigo-700"}`}
                          >
                            {children}
                          </code>
                        ) : (
                          <code className={className}>{children}</code>
                        );
                      },
                    }}
                  >
                    {msg.text}
                  </Markdown>
                  </ErrorBoundary>
                </motion.div>
              </div>
            ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 justify-start"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-2xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-16 h-16 border-2 border-indigo-500 border-t-transparent rounded-full"
                />
                <span
                  className={`text-sm font-medium ${theme === "dark" ? "text-white/70" : "text-black/70"}`}
                >
                  AI is thinking...
                </span>
              </div>
            </motion.div>
          )}
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
