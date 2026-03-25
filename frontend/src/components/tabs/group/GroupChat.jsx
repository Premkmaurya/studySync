import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  Zap,
  Bot,
  MoreHorizontal,
  Plus,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";

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
        <div className="flex-shrink-0 mt-auto">
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

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const { group } = useOutletContext();
  const scrollRef = useRef(null);
  const groupId = group?._id;
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/messages/${groupId}`,
          { withCredentials: true },
        );
        const fetchedMessages = response.data.chat.map((msg) => ({
          id: msg._id,
          text: msg.text,
          sender: {
            firstname: msg.user.fullname.firstname,
            lastname: msg.user.fullname.lastname,
          },
          isYou: msg.user._id === response.data.userId,
        }));
        setMessages(fetchedMessages);
      } catch (error) {
        // Fallback mock data for UI demo
        setMessages([
          {
            id: 1,
            text: "Welcome to the Neural Stream.",
            sender: { firstname: "Syncie", lastname: "AI" },
            isYou: false,
          },
          {
            id: 2,
            text: "This hub is encrypted and ready for sync.",
            sender: { firstname: "Syncie", lastname: "AI" },
            isYou: false,
          },
        ]);
      }
    };
    fetchMessages();

    const socketInstance = io("http://localhost:3000", {
      withCredentials: true,
    });
    socketInstance.emit("joinRoom", groupId);

    socketInstance.on("newMessage", (message) => {
      const newMsg = {
        id: message._id,
        text: message.text,
        sender: {
          firstname: message.user.fullname.firstname,
          lastname: message.user.fullname.lastname,
        },
        isYou: message.user._id === socketInstance.userId,
      };
      setMessages((prev) => [...prev, newMsg]);
    });

    setSocket(socketInstance);
    return () => socketInstance.disconnect();
  }, [groupId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const msgData = {
      id: Date.now(),
      text: newMessage,
      sender: { firstname: "You", lastname: "" },
      isYou: true,
    };
    if (socket) socket.emit("newMessage", { text: newMessage });
    setMessages((prev) => [...prev, msgData]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen relative px-3 py-5 overflow-x-hidden ">
      {/* 1. Chat Header Info */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
            <MessageSquare size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter text-white uppercase">
              Neural_Stream
            </h2>
          </div>
        </div>
        <button className="p-2.5 hover:bg-white/5 rounded-xl text-zinc-600 hover:text-white transition-all">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* 2. Message Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-2 pr-4 custom-scrollbar flex flex-col"
      >
        <div className="mt-auto">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
              <Bot size={48} className="mb-4" />
              <p className="text-xs font-black uppercase tracking-[0.3em]">
                Initialize Conversation
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Command Pill (Input) */}
      <div className="relative mt-8 px-2">
        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-4 z-50">
            <EmojiPicker
              theme="dark"
              onEmojiClick={(emojiObject) => {
                setNewMessage((prev) => prev + emojiObject.emoji);
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 rounded-[32px] blur-xl opacity-50" />
        <div className="relative flex items-center gap-2 p-2 bg-zinc-950/80 backdrop-blur-2xl border border-white/5 rounded-[30px] shadow-2xl">
          <button className="p-3.5 hover:bg-white/5 rounded-2xl text-zinc-500 hover:text-white transition-all">
            <Paperclip size={20} />
          </button>

          <input
            type="text"
            placeholder="Type a neural update..."
            className="flex-1 bg-transparent py-4 px-4 text-sm font-bold text-white outline-none placeholder:text-zinc-700"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />

          <div className="flex items-center gap-1 pr-2">
            <button 
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="p-3 hover:bg-white/5 rounded-3xl text-zinc-500 hover:text-white transition-all hidden sm:flex"
            >
              <Smile size={20} />
            </button>
            <button
              onClick={handleSendMessage}
              className="p-3 bg-white text-black rounded-full hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95 group"
            >
              <Send
                size={20}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6366f1; }
      `,
        }}
      />
    </div>
  );
};

export default GroupChat;
