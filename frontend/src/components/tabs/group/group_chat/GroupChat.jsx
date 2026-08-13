import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Send, Smile, MessageSquare } from "lucide-react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import MessageBubble from "./components/MessageBubble";
import Button from "../../../design-system/Button";
import Pill from "../../../design-system/Pill";
import { PageHeader } from "../../../design-system/SectionHeader";

const GroupChat = () => {
  const user = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [groupKey, setGroupKey] = useState(null);
  const { group } = useOutletContext();
  const scrollRef = useRef(null);
  const groupId = group?._id;
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (!groupId) return;
    const bootstrap = async () => {
      try {
        const secureKeyStore = await import("../../../../utils/secureKeyStore").catch(() => null);
        const cryptoUtils = await import("../../../../utils/crypto").catch(() => null);
        if (!secureKeyStore || !cryptoUtils) return;

        const passphrase = window.prompt("Enter your password to unlock encrypted chat keys");
        const privateKeyBlob = await secureKeyStore.getSecret(`private-key:${user?.email}`);
        if (!privateKeyBlob || !passphrase) return;
        
        const privateKey = await cryptoUtils.decryptPrivateKey(privateKeyBlob, passphrase);
        const keyResponse = await axios.get(
          `http://localhost:3000/api/groups/${groupId}/my-encrypted-key`,
          { withCredentials: true }
        );
        const decryptedGroupKey = await cryptoUtils.decryptGroupKey(
          keyResponse.data.encryptedGroupKey,
          privateKey
        );
        setGroupKey(decryptedGroupKey);

        const msgResponse = await axios.get(
          `http://localhost:3000/api/messages/${groupId}`,
          { withCredentials: true }
        );
        const decoded = await Promise.all(
          msgResponse.data.chat.map(async (msg) => ({
            id: msg._id,
            text: await cryptoUtils.decryptMessage(msg.encryptedContent, decryptedGroupKey),
            sender: {
              firstname: msg.user?.fullname?.firstname || "User",
              lastname: msg.user?.fullname?.lastname || "",
            },
            isYou: msg.user._id === msgResponse.data.userId,
          }))
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
      let text = message.encryptedContent || message.text || "";
      try {
        const cryptoUtils = await import("../../../../utils/crypto").catch(() => null);
        if (cryptoUtils && groupKey) {
          text = await cryptoUtils.decryptMessage(message.encryptedContent, groupKey);
        }
      } catch {
        // fallback text
      }
      setMessages((prev) => [
        ...prev,
        {
          id: message._id || Date.now(),
          text,
          sender: {
            firstname: message.user?.fullname?.firstname || "Member",
            lastname: message.user?.fullname?.lastname || "",
          },
          isYou: false,
        },
      ]);
    });

    setSocket(socketInstance);
    return () => socketInstance.disconnect();
  }, [groupId, user?.email, groupKey]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    try {
      const cryptoUtils = await import("../../../../utils/crypto").catch(() => null);
      if (cryptoUtils && groupKey) {
        const encryptedContent = await cryptoUtils.encryptMessage(newMessage, groupKey);
        if (socket) {
          socket.emit("newMessage", {
            encryptedContent,
            keyVersion: group?.keyVersion || 1,
          });
        }
      } else if (socket) {
        socket.emit("newMessage", { text: newMessage });
      }
    } catch {
      if (socket) socket.emit("newMessage", { text: newMessage });
    }

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
    <div className="flex flex-col h-[calc(100vh-64px)] p-6 max-w-5xl mx-auto">
      {/* Workspace Header */}
      <PageHeader
        title={group?.name ? `${group.name} Chat` : "Group Chat"}
        description="Realtime collaborative chat for group members."
        badge={<Pill variant="sky" size="sm">Workspace Chat</Pill>}
      />

      {/* Messages Feed */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto my-6 p-4 bg-white border border-black/[0.08] rounded-[12px] flex flex-col justify-end"
      >
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center text-[#757575]">
              <MessageSquare className="w-10 h-10 mb-3 text-[#0075de]" />
              <h4 className="text-[16px] font-bold text-[#000000]">
                No messages yet
              </h4>
              <p className="text-[14px] mt-1 max-w-xs">
                Start the discussion with your group members.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Message Composer */}
      <div className="relative">
        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-3 z-50">
            <EmojiPicker
              theme="light"
              onEmojiClick={(emojiObject) => {
                setNewMessage((prev) => prev + emojiObject.emoji);
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )}

        <div className="flex items-center gap-2 p-2 bg-white border border-black/[0.12] rounded-[12px]">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-transparent px-3 py-2 text-[14px] text-[#000000] placeholder-[#757575] outline-none"
          />

          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="p-2 text-[#757575] hover:text-black rounded-[6px] hover:bg-black/5 transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>

          <Button
            variant="primary"
            size="sm"
            icon={Send}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
