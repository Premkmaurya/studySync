import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Send, Smile, MessageSquare } from "lucide-react";
import api from "../../../../services/api";
import { useOutletContext } from "react-router-dom";
import {
  getSocket,
  joinGroupRoom,
  leaveGroupRoom,
  sendGroupMessage,
} from "../../../../services/socket";
import EmojiPicker from "emoji-picker-react";
import MessageBubble from "./components/MessageBubble";
import Button from "../../../design-system/Button";
import Pill from "../../../design-system/Pill";
import { PageHeader } from "../../../design-system/SectionHeader";

const GroupChat = () => {
  const user = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  const { group } = useOutletContext();
  const scrollRef = useRef(null);
  const groupId = group?._id;
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (!groupId) return;

    let isMounted = true;

    const bootstrap = async () => {
      try {
        const msgResponse = await api.get(`/messages/${groupId}`);
        const currentUserId = user?._id || user?.id || msgResponse.data?.userId;

        const decoded = (msgResponse.data.chat || []).map((msg) => {
          const msgUserId = msg.user?._id || msg.user;
          const isYou =
            msgUserId && currentUserId
              ? msgUserId.toString() === currentUserId.toString()
              : false;
          return {
            id: msg._id,
            text: msg.message || msg.text || msg.content || "",
            sender: {
              firstname: msg.user?.fullname?.firstname || "User",
              lastname: msg.user?.fullname?.lastname || "",
            },
            isYou,
            createdAt: msg.createdAt,
          };
        });

        if (isMounted) {
          setMessages(decoded);
        }
      } catch (err) {
        console.error("Error fetching message history:", err);
        if (isMounted) setMessages([]);
      }
    };

    bootstrap();

    // Connect & Join Room
    const s = getSocket();
    joinGroupRoom(groupId);

    const handleNewMessage = (message) => {
      if (!message || !isMounted) return;

      const msgUserId = message.user?._id || message.user;
      const currentUserId = user?._id || user?.id;
      const isYou =
        msgUserId && currentUserId
          ? msgUserId.toString() === currentUserId.toString()
          : false;

      const formattedMsg = {
        id: message._id || Date.now(),
        text: message.message || message.text || message.content || "",
        sender: {
          firstname: message.user?.fullname?.firstname || "Member",
          lastname: message.user?.fullname?.lastname || "",
        },
        isYou,
        createdAt: message.createdAt,
      };

      setMessages((prev) => {
        if (prev.some((m) => m.id === formattedMsg.id)) {
          return prev;
        }
        return [...prev, formattedMsg];
      });
    };

    s.on("newMessage", handleNewMessage);

    return () => {
      isMounted = false;
      s.off("newMessage", handleNewMessage);
      leaveGroupRoom();
    };
  }, [groupId, user?._id, user?.id]);

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

    const text = newMessage.trim();

    sendGroupMessage({ groupId, message: text });
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
        className="flex-1 overflow-y-auto my-6 p-4 bg-white border border-black/[0.08] rounded-[12px] flex flex-col justify-end min-h-[330px]"
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
      <div className="mt-auto relative">
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

        <div className="flex items-center gap-2 p-2 bg-white border border-black/[0.12] rounded-[12px] min-h-[64px]">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-transparent px-3 py-3 text-[14px] text-[#000000] placeholder-[#757575] outline-none min-h-[44px]"
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

