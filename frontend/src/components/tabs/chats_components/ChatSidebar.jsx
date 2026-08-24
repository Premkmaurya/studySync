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
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useParams } from "react-router-dom";
import { getSocket } from "../../../services/socket";
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
  const messages = useSelector((state) => state.messages.messages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { groupId } = useParams();

  // Initialize socket connection once
  useEffect(() => {
    const socketInstance = getSocket();

    const handleAiResponse = (data) => {
      if (!data || !data.text || data.text.trim() === "") return;

      const newMsg = {
        id: data._id || Date.now(),
        text: data.text.trim(),
        isYou: false,
      };
      dispatch(addMessage(newMsg));
      setIsLoading(false);
    };

    socketInstance.on("ai-conversation-response", handleAiResponse);
    setSocket(socketInstance);

    return () => {
      socketInstance.off("ai-conversation-response", handleAiResponse);
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
      className={`fixed p-6 shadow-3xl z-60 flex flex-col transition-all duration-300 bg-white text-black border-black/10 rounded-0"`}
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
              className="font-black text-xs uppercase tracking-widest text-black"
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
            className="text-zinc-400"
          />
          <h3
            className="text-sm font-bold uppercase tracking-widest text-zinc-500"
          >
            No messages yet
          </h3>
          <p
            className="text-xs text-zinc-500"
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
                  className={`split px-8 text-base w-fit leading-9 max-w-4xl backdrop-blur-xl rounded-2xl ${
                    msg.role === "user" || msg.isYou
                      ? `bg-blue-500 text-white self-end text-center **:text-white`
                      : `bg-white/20 text-black self-start text-left`
                  }`}
                >
                  <ErrorBoundary>
                    <Markdown
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                      h1: ({ children }) => (
                        <h1
                          className="text-3xl font-black mt-8 mb-5 text-indigo-600"
                        >
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2
                          className="text-2xl font-bold mt-7 mb-4 text-black"
                        >
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3
                          className="text-xl font-semibold mt-6 mb-3 text-zinc-800"
                        >
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p
                          className="leading-9 text-[17px] text-zinc-700"
                        >
                          {children}
                        </p>
                      ),

                      ul: ({ children }) => (
                        <ul
                          className="space-y-3 ml-5 mb-5 list-disc text-zinc-700"
                        >
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol
                          className="space-y-3 ml-5 mb-5 list-decimal text-zinc-700"
                        >
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="leading-8 pl-2">{children}</li>
                      ),

                      strong: ({ children }) => (
                        <strong
                          className="font-bold text-black"
                        >
                          {children}
                        </strong>
                      ),

                      code({ inline, className, children }) {
                        return inline ? (
                          <code
                            className="px-2 py-1 rounded bg-zinc-200 text-indigo-700"
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
                  className="text-sm font-medium text-black/70"
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
        className="absolute bottom-6 left-6 right-6 z-10"
      >
        <div className="relative flex items-center gap-3 rounded-2xl border border-black/30 bg-white p-2 shadow-[0_10px_30px_rgba(24,24,27,0.12)] transition-all focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10">
          <input
            type="text"
            placeholder="Prompt AI..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            aria-label="Message AI"
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"
          >
            <Sparkles size={16} className="text-white" />
          </button>
        </div>
      </form>
    </motion.aside>
  );
};

export default ChatSidebar;
