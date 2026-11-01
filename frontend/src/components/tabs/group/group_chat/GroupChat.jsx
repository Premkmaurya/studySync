import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Send, Smile, MessageSquare, Loader2 } from "lucide-react";
import api from "../../../../services/api";
import { useOutletContext } from "react-router-dom";
import {
  getSocket,
  joinGroupRoom,
  leaveGroupRoom,
  sendGroupMessage,
} from "../../../../services/socket";

// Lazy-load EmojiPicker — only downloads when user opens the picker
const EmojiPicker = lazy(() => import("emoji-picker-react"));

import MessageBubble from "./components/MessageBubble";
import Button from "../../../design-system/Button";
import { PageHeader } from "../../../design-system/SectionHeader";

const GroupChat = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id || user?.id;
  const [messages, setMessages] = useState([]);
  const { group } = useOutletContext();
  const scrollRef = useRef(null);
  const groupId = group?._id;
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Format message helper
  const formatMessage = (msg, currentUserId) => {
    if (!msg) return null;
    const senderObj = typeof msg.user === "object" && msg.user !== null ? msg.user : null;
    const senderId = senderObj?._id ? senderObj._id.toString() : msg.user ? msg.user.toString() : "";
    const isYou = Boolean(currentUserId && senderId && currentUserId.toString() === senderId);

    const firstname = senderObj?.fullname?.firstname || senderObj?.firstname || (isYou ? "You" : "Member");
    const lastname = senderObj?.fullname?.lastname || senderObj?.lastname || "";

    const textContent = msg.message || (msg.ciphertext ? "Encrypted message from legacy E2EE session" : "");

    return {
      id: msg._id || msg.id || `${Date.now()}_${Math.random()}`,
      sender: {
        id: senderId,
        firstname,
        lastname,
      },
      text: textContent,
      message: textContent,
      isYou,
      createdAt: msg.createdAt || new Date().toISOString(),
    };
  };

  // 1. Fetch Message History & Real-Time Socket Listener
  useEffect(() => {
    if (!groupId) return;

    let isMounted = true;

    const fetchHistory = async () => {
      try {
        const res = await api.get(`/messages/${groupId}`);
        const chatDocs = res.data?.chat || [];

        const formattedList = chatDocs
          .map((doc) => formatMessage(doc, userId))
          .filter(Boolean);

        if (isMounted) {
          setMessages(formattedList);
        }
      } catch (err) {
        console.error("[Chat] Error fetching message history:", err?.message || err);
        if (isMounted) setMessages([]);
      }
    };

    fetchHistory();

    // Socket Room Connection
    const s = getSocket();
    joinGroupRoom(groupId);

    // Socket message listener
    const handleNewMessage = (message) => {
      if (!message || !isMounted) return;

      const formatted = formatMessage(message, userId);
      if (!formatted) return;

      setMessages((prev) => {
        if (prev.some((m) => m.id === formatted.id)) {
          return prev;
        }
        return [...prev, formatted];
      });
    };

    s.on("newMessage", handleNewMessage);

    return () => {
      isMounted = false;
      s.off("newMessage", handleNewMessage);
      leaveGroupRoom();
    };
  }, [groupId, userId]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !groupId) return;

    const text = newMessage.trim();
    sendGroupMessage({
      groupId,
      message: text,
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] w-full max-w-5xl overflow-hidden mx-auto p-3 sm:p-6 min-w-0">
      {/* Workspace Header */}
      <PageHeader
        title={group?.name ? `${group.name} Chat` : "Group Chat"}
        description="Connect and discuss in real-time with group members."
      />

      {/* Messages Feed */}
      <div
        ref={scrollRef}
        className="flex-1 w-full min-w-0 overflow-y-auto my-4 sm:my-6 p-3 sm:p-4 pb-24 sm:pb-28 bg-white border border-black/[0.08] rounded-[12px] flex flex-col justify-end min-h-[330px]"
      >
        <div className="space-y-4 h-full py-3">
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
      <div className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-1rem)] max-w-5xl -translate-x-1/2 min-w-0 sm:w-[calc(100%-2rem)] md:left-[calc(50%+8rem)] md:w-[calc(100%-18rem)] lg:left-[calc(50%+9rem)] lg:w-[calc(100%-20rem)]">
        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-3 z-50">
            <Suspense
              fallback={
                <div className="w-[350px] h-[400px] bg-white border border-black/[0.08] rounded-[12px] flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-[#0075de]" />
                </div>
              }
            >
              <EmojiPicker
                theme="light"
                onEmojiClick={(emojiObject) => {
                  setNewMessage((prev) => prev + emojiObject.emoji);
                  setShowEmojiPicker(false);
                }}
              />
            </Suspense>
          </div>
        )}

        <div className="flex w-full min-w-0 items-center gap-1.5 sm:gap-2 p-2 bg-white border border-black/[0.12] rounded-[12px] min-h-[64px]">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 min-w-0 bg-transparent px-2 sm:px-3 py-3 text-[14px] text-[#000000] placeholder-[#757575] outline-none min-h-[44px]"
          />

          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="shrink-0 p-2 text-[#757575] hover:text-black rounded-[6px] hover:bg-black/5 transition-colors"
            aria-label="Insert emoji"
          >
            <Smile className="w-5 h-5" />
          </button>

          <Button
            variant="primary"
            size="sm"
            icon={Send}
            disabled={newMessage.trim() === ""}
            onClick={handleSendMessage}
            className="shrink-0"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
