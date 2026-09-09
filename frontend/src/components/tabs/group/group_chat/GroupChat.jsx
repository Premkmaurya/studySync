import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Send, Smile, MessageSquare, Lock, Loader2, AlertTriangle, Key } from "lucide-react";
import api from "../../../../services/api";
import { useOutletContext } from "react-router-dom";
import {
  getSocket,
  joinGroupRoom,
  leaveGroupRoom,
  sendGroupMessage,
} from "../../../../services/socket";
import {
  resolveGroupE2EE,
  formatAndDecryptMessage,
  batchFormatAndDecryptMessages,
} from "../../../../services/crypto/e2eeManager";
import { encryptMessage } from "../../../../services/crypto/cryptoService";

// Lazy-load EmojiPicker — only downloads when user opens the picker
const EmojiPicker = lazy(() => import("emoji-picker-react"));

import MessageBubble from "./components/MessageBubble";
import Button from "../../../design-system/Button";
import Pill from "../../../design-system/Pill";
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

  // Consolidated E2EE state
  const [e2eeState, setE2EEState] = useState({
    status: "initializing", // "initializing" | "ready" | "waiting_for_key" | "error"
    groupKey: null,
    keyVersion: 1,
    fingerprint: "INITIALIZING",
    errorMessage: "",
  });

  // Ref to always provide the latest E2EE state to asynchronous socket callbacks without stale closures
  const e2eeStateRef = useRef(e2eeState);
  useEffect(() => {
    e2eeStateRef.current = e2eeState;
  }, [e2eeState]);

  // 1. Resolve Group E2EE Keys
  useEffect(() => {
    if (!groupId || !userId) return;

    let isMounted = true;

    const initE2EE = async () => {
      setE2EEState((prev) => ({
        ...prev,
        status: "initializing",
        fingerprint: "INITIALIZING",
      }));

      try {
        const result = await resolveGroupE2EE(groupId, userId, user);
        if (isMounted) {
          setE2EEState({
            status: result.status,
            groupKey: result.groupKey,
            keyVersion: result.keyVersion,
            fingerprint: result.fingerprint,
            errorMessage: result.error || "",
          });
        }
      } catch (err) {
        console.error("[E2EE] Group resolution error:", err?.message || err);
        if (isMounted) {
          setE2EEState({
            status: "error",
            groupKey: null,
            keyVersion: 1,
            fingerprint: "NONE",
            errorMessage: err?.message || "E2EE error",
          });
        }
      }
    };

    initE2EE();

    return () => {
      isMounted = false;
    };
  }, [groupId, userId]);

  // 2. Fetch Message History & Real-Time Socket Listener
  useEffect(() => {
    if (!groupId) return;

    let isMounted = true;

    // Fetch initial chat history
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/messages/${groupId}`);
        const chatDocs = res.data?.chat || [];

        const formattedList = await batchFormatAndDecryptMessages(
          chatDocs,
          e2eeStateRef.current.groupKey,
          e2eeStateRef.current.status,
          userId
        );

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

    // Socket message listener (reads current group key from e2eeStateRef to avoid stale closures)
    const handleNewMessage = async (message) => {
      if (!message || !isMounted) return;

      const formatted = await formatAndDecryptMessage(
        message,
        e2eeStateRef.current.groupKey,
        e2eeStateRef.current.status,
        userId
      );

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

  // 3. Batch Decrypt Pending Messages when E2EE key resolution completes or transitions
  useEffect(() => {
    if (e2eeState.status === "initializing") return;

    let isMounted = true;

    const updatePendingMessages = async () => {
      setMessages((prevMessages) => {
        const hasPending = prevMessages.some((m) => m.decryptionStatus === "loading");
        if (!hasPending) return prevMessages;

        // Decrypt pending messages concurrently outside the state setter
        batchFormatAndDecryptMessages(
          prevMessages,
          e2eeState.groupKey,
          e2eeState.status,
          userId
        ).then((updatedList) => {
          if (isMounted) {
            setMessages(updatedList);
          }
        });

        return prevMessages;
      });
    };

    updatePendingMessages();

    return () => {
      isMounted = false;
    };
  }, [e2eeState.status, e2eeState.groupKey, userId]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !groupId || e2eeState.status !== "ready") return;

    const text = newMessage.trim();

    if (e2eeState.groupKey) {
      try {
        const encrypted = await encryptMessage(text, e2eeState.groupKey, e2eeState.keyVersion);
        sendGroupMessage({
          groupId,
          ciphertext: encrypted.ciphertext,
          iv: encrypted.iv,
          keyVersion: encrypted.keyVersion,
          isEncrypted: true,
        });
        setNewMessage("");
        return;
      } catch (err) {
        console.error("[E2EE] Message encryption error:", err?.message || err);
      }
    }

    // Fallback if encryption key error occurred
    sendGroupMessage({ groupId, message: text });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] p-6 max-w-5xl mx-auto">
      {/* Workspace Header */}
      <PageHeader
        title={group?.name ? `${group.name} Chat` : "Group Chat"}
        description="End-to-end encrypted private chat for group members."
        badge={
          e2eeState.status === "initializing" ? (
            <Pill variant="sky" size="sm" className="flex items-center gap-1.5 font-mono text-[11px]">
              <Loader2 className="w-3 h-3 text-[#0075de] animate-spin" />
              <span>E2EE • Securing connection...</span>
            </Pill>
          ) : e2eeState.status === "ready" ? (
            <Pill variant="sky" size="sm" className="flex items-center gap-1 font-mono text-[11px]">
              <Lock className="w-3 h-3 text-[#0075de]" />
              <span>E2EE Active • Key v{e2eeState.keyVersion} [{e2eeState.fingerprint}]</span>
            </Pill>
          ) : e2eeState.status === "waiting_for_key" ? (
            <Pill variant="amber" size="sm" className="flex items-center gap-1 font-mono text-[11px]">
              <Key className="w-3 h-3 text-amber-600" />
              <span>E2EE • Key Sync Pending</span>
            </Pill>
          ) : (
            <Pill variant="amber" size="sm" className="flex items-center gap-1 font-mono text-[11px]">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>E2EE Unavailable</span>
            </Pill>
          )
        }
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
            <Suspense fallback={
              <div className="w-[350px] h-[400px] bg-white border border-black/[0.08] rounded-[12px] flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-[#0075de]" />
              </div>
            }>
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

        <div className="flex items-center gap-2 p-2 bg-white border border-black/[0.12] rounded-[12px] min-h-[64px]">
          <input
            type="text"
            placeholder={
              e2eeState.status === "initializing"
                ? "Securing connection..."
                : e2eeState.status === "waiting_for_key"
                ? "Waiting for group key sync..."
                : "Type your message..."
            }
            disabled={e2eeState.status !== "ready"}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-transparent px-3 py-3 text-[14px] text-[#000000] placeholder-[#757575] outline-none min-h-[44px] disabled:opacity-50"
          />

          <button
            type="button"
            disabled={e2eeState.status !== "ready"}
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="p-2 text-[#757575] hover:text-black rounded-[6px] hover:bg-black/5 transition-colors disabled:opacity-50"
            aria-label="Insert emoji"
          >
            <Smile className="w-5 h-5" />
          </button>

          <Button
            variant="primary"
            size="sm"
            icon={Send}
            disabled={e2eeState.status !== "ready" || newMessage.trim() === ""}
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
