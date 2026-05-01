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
import {
  decryptGroupKey,
  decryptMessage,
  encryptMessage,
} from "../../../../utils/crypto";
import { getSecret } from "../../../../utils/secureKeyStore";

const GroupChat = () => {
  const theme = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [groupKey, setGroupKey] = useState(null);
  const { group } = useOutletContext();
  const scrollRef = useRef(null);
  const groupId = group?._id;
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const passphrase = window.prompt(
          "Enter your password to unlock encrypted chat keys",
        );
        const privateKeyBlob = await getSecret(`private-key:${user?.email}`);
        if (!privateKeyBlob || !passphrase) return;
        const { decryptPrivateKey } = await import("../../../../utils/crypto");
        const privateKey = await decryptPrivateKey(privateKeyBlob, passphrase);

        const keyResponse = await axios.get(
          `http://localhost:3000/api/groups/${groupId}/my-encrypted-key`,
          { withCredentials: true },
        );
        const decryptedGroupKey = await decryptGroupKey(
          keyResponse.data.encryptedGroupKey,
          privateKey,
        );
        setGroupKey(decryptedGroupKey);

        const msgResponse = await axios.get(
          `http://localhost:3000/api/messages/${groupId}`,
          { withCredentials: true },
        );
        const decoded = await Promise.all(
          msgResponse.data.chat.map(async (msg) => ({
            id: msg._id,
            text: await decryptMessage(msg.encryptedContent, decryptedGroupKey),
            sender: {
              firstname: msg.user.fullname.firstname,
              lastname: msg.user.fullname.lastname,
            },
            isYou: msg.user._id === msgResponse.data.userId,
          })),
        );
        setMessages(decoded);
      } catch {
        setMessages([]);
      }
    };

    bootstrap();
    const socketInstance = io("http://localhost:3000", {
      withCredentials: true,
    });
    socketInstance.emit("joinRoom", groupId);
    socketInstance.on("newMessage", async (message) => {
      if (!groupKey) return;
      const text = await decryptMessage(message.encryptedContent, groupKey);
      setMessages((prev) => [
        ...prev,
        {
          id: message._id,
          text,
          sender: {
            firstname: message.user.fullname.firstname,
            lastname: message.user.fullname.lastname,
          },
          isYou: false,
        },
      ]);
    });

    setSocket(socketInstance);
    return () => socketInstance.disconnect();
  }, [groupId, user?.email, groupKey]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !groupKey) return;
    const encryptedContent = await encryptMessage(newMessage, groupKey);
    if (socket)
      socket.emit("newMessage", {
        encryptedContent,
        keyVersion: group?.keyVersion || 1,
      });
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newMessage,
        sender: { firstname: "You", lastname: "" },
        isYou: true,
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen relative px-3 py-5 overflow-x-hidden ">
      {/* unchanged UI */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
            <MessageSquare size={20} />
          </div>
          <div>
            <h2
              className={`text-xl font-black tracking-tighter uppercase ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Neural_Stream
            </h2>
          </div>
        </div>
        <button
          className={`p-2.5 rounded-xl transition-all ${theme === "dark" ? "hover:bg-white/5 text-zinc-600 hover:text-white" : "hover:bg-black/5 text-zinc-500 hover:text-black"}`}
        >
          <MoreHorizontal size={20} />
        </button>
      </div>
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
            <div
              className={`flex flex-col items-center justify-center py-20 text-center opacity-30 ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              <Bot size={48} className="mb-4" />
              <p className="text-xs font-black uppercase tracking-[0.3em]">
                Initialize Conversation
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="relative mt-8 px-2">
        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-4 z-50">
            <EmojiPicker
              theme={theme === "dark" ? "dark" : "light"}
              onEmojiClick={(emojiObject) => {
                setNewMessage((prev) => prev + emojiObject.emoji);
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )}
        <div className="absolute -inset-1 bg-linear-to-r from-indigo-500/20 to-fuchsia-500/20 rounded-4xl blur-xl opacity-50" />
        <div
          className={`relative flex items-center gap-2 p-2 backdrop-blur-2xl border rounded-[30px] shadow-2xl ${theme === "dark" ? "bg-zinc-950/80 border-white/5" : "bg-white/80 border-black/10"}`}
        >
          <button
            className={`p-3.5 rounded-2xl transition-all ${theme === "dark" ? "hover:bg-white/5 text-zinc-500 hover:text-white" : "hover:bg-black/5 text-zinc-500 hover:text-black"}`}
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            placeholder="Type a neural update..."
            className={`flex-1 bg-transparent py-4 px-4 text-sm font-bold outline-none ${theme === "dark" ? "text-white placeholder:text-zinc-700" : "text-black placeholder:text-zinc-400"}`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <div className="flex items-center gap-1 pr-2">
            <button
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className={`p-3 rounded-3xl transition-all hidden sm:flex ${theme === "dark" ? "hover:bg-white/5 text-zinc-500 hover:text-white" : "hover:bg-black/5 text-zinc-500 hover:text-black"}`}
            >
              <Smile size={20} />
            </button>
            <button
              onClick={handleSendMessage}
              className={`p-3 rounded-full transition-all shadow-xl active:scale-95 group ${theme === "dark" ? "bg-white text-black hover:bg-indigo-500 hover:text-white" : "bg-black text-white hover:bg-indigo-500"}`}
            >
              <Send
                size={20}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
