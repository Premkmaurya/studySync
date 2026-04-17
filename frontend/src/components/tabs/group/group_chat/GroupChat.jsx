import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Send,
  Paperclip,
  Smile,
  Bot,
  MoreHorizontal,
  MessageSquare,
} from "lucide-react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import MessageBubble from "./components/MessageBubble";

const GroupChat = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const { group } = useOutletContext();
  const scrollRef = useRef(null);
  const groupId = group?._id;
  const [newMessage, setNewMessage] = useState("");
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
        <div className="absolute -inset-1 bg-linear-to-r from-indigo-500/20 to-fuchsia-500/20 rounded-4xl blur-xl opacity-50" />
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