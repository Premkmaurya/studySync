import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Send, Smile, MessageSquare, Lock } from "lucide-react";
import api from "../../../../services/api";
import { useOutletContext } from "react-router-dom";
import {
  getSocket,
  joinGroupRoom,
  leaveGroupRoom,
  sendGroupMessage,
} from "../../../../services/socket";
import {
  getUserKeyPair,
  saveUserKeyPair,
  getGroupKey,
  saveGroupKey,
} from "../../../../services/crypto/cryptoStorage";
import {
  generateUserKeyPair,
  generateGroupKey,
  wrapGroupKeyForRecipient,
  unwrapGroupKeyForUser,
  encryptMessage,
  decryptMessage,
  getGroupKeyFingerprint,
} from "../../../../services/crypto/cryptoService";
import EmojiPicker from "emoji-picker-react";
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

  // E2EE state
  const [activeGroupKey, setActiveGroupKey] = useState(null);
  const [keyVersion, setKeyVersion] = useState(1);
  const [keyFingerprint, setKeyFingerprint] = useState("INITIALIZING");
  const [isInitializingKeys, setIsInitializingKeys] = useState(true);

  // 1. Initialize user keys & resolve group key
  useEffect(() => {
    if (!groupId || !userId) return;

    let isMounted = true;

    const initE2EE = async () => {
      try {
        setIsInitializingKeys(true);

        // Step A: Fetch or Generate User Local Key Pair
        let userKeys = await getUserKeyPair(userId);
        if (!userKeys || !userKeys.privateKey || !userKeys.publicKeyJwk) {
          console.log("[E2EE] Generating local user key pair...");
          const newKeyPair = await generateUserKeyPair();
          await saveUserKeyPair(userId, newKeyPair);
          userKeys = newKeyPair;

          // Register public key JWK on server
          await api.put("/auth/public-key", { publicKey: newKeyPair.publicKeyJwk });
        }

        // Step B: Fetch Group Key Envelopes & Member Public Keys from Backend
        const keysRes = await api.get(`/groups/${groupId}/keys`);
        const { myEnvelope, members, keyVersion: serverKeyVer } = keysRes.data || {};
        const currentVersion = serverKeyVer || 1;

        // Step C: Check local IndexedDB first for existing canonical group key
        let groupKey = await getGroupKey(groupId, currentVersion);

        // Step D: If not in local IndexedDB, unwrap from user's server envelope
        if (!groupKey && myEnvelope && myEnvelope.encryptedGroupKey) {
          try {
            groupKey = await unwrapGroupKeyForUser(
              myEnvelope.encryptedGroupKey,
              userKeys.privateKey
            );
            await saveGroupKey(groupId, currentVersion, groupKey);
          } catch (unwrapErr) {
            console.error("[E2EE] Failed to unwrap group key:", unwrapErr);
          }
        }

        // Step E: If NO canonical group key exists yet for this group (first time setup), provision new key
        if (!groupKey && !myEnvelope) {
          console.log("[E2EE] Provisioning new canonical group key for group...");
          groupKey = await generateGroupKey();
          await saveGroupKey(groupId, currentVersion, groupKey);
        }

        // Step F: Auto-wrap canonical group key for any group members missing envelopes
        if (groupKey && Array.isArray(members) && members.length > 0) {
          const newEnvelopes = [];
          for (const member of members) {
            if (member.publicKey) {
              try {
                const wrapped = await wrapGroupKeyForRecipient(groupKey, member.publicKey);
                newEnvelopes.push({
                  userId: member._id,
                  encryptedGroupKey: wrapped,
                });
              } catch (wrapErr) {
                console.warn("[E2EE] Failed to wrap key for member:", member._id);
              }
            }
          }

          if (newEnvelopes.length > 0) {
            await api.post(`/groups/${groupId}/keys`, {
              keyVersion: currentVersion,
              envelopes: newEnvelopes,
            });
          }
        }

        // Step G: Compute diagnostic fingerprint
        let fingerprint = "NONE";
        if (groupKey) {
          fingerprint = await getGroupKeyFingerprint(groupKey);
        }

        if (isMounted) {
          setActiveGroupKey(groupKey);
          setKeyVersion(currentVersion);
          setKeyFingerprint(fingerprint);
          setIsInitializingKeys(false);
        }
      } catch (err) {
        console.error("[E2EE] Initialization error:", err);
        if (isMounted) setIsInitializingKeys(false);
      }
    };

    initE2EE();
  }, [groupId, userId]);

  // 2. Fetch & Decrypt Message History and Handle Real-time Socket Messages
  useEffect(() => {
    if (!groupId) return;

    let isMounted = true;

    const decryptSingleMessage = async (msgDoc, key) => {
      const msgUserId = msgDoc.user?._id || msgDoc.user;
      const currentUserId = user?._id || user?.id;
      const isYou =
        msgUserId && currentUserId
          ? msgUserId.toString() === currentUserId.toString()
          : false;

      let plaintextText = "";
      if (msgDoc.ciphertext && msgDoc.iv && key) {
        try {
          plaintextText = await decryptMessage(
            { ciphertext: msgDoc.ciphertext, iv: msgDoc.iv },
            key
          );
        } catch (err) {
          console.warn("[E2EE] Failed to decrypt message:", msgDoc._id, err);
          plaintextText = "🔒 Unable to decrypt message";
        }
      } else if (msgDoc.message || msgDoc.text) {
        plaintextText = msgDoc.message || msgDoc.text;
      } else {
        plaintextText = "🔒 Unable to decrypt message";
      }

      return {
        id: msgDoc._id || Date.now(),
        text: plaintextText,
        sender: {
          firstname: msgDoc.user?.fullname?.firstname || "User",
          lastname: msgDoc.user?.fullname?.lastname || "",
        },
        isYou,
        createdAt: msgDoc.createdAt,
      };
    };

    const fetchAndDecryptHistory = async () => {
      try {
        const msgResponse = await api.get(`/messages/${groupId}`);
        const chatDocs = msgResponse.data?.chat || [];

        const decryptedMsgs = await Promise.all(
          chatDocs.map((msg) => decryptSingleMessage(msg, activeGroupKey))
        );

        if (isMounted) {
          setMessages(decryptedMsgs);
        }
      } catch (err) {
        console.error("Error fetching message history:", err);
        if (isMounted) setMessages([]);
      }
    };

    fetchAndDecryptHistory();

    // Connect & Join Room
    const s = getSocket();
    joinGroupRoom(groupId);

    const handleNewMessage = async (message) => {
      if (!message || !isMounted) return;

      const formattedMsg = await decryptSingleMessage(message, activeGroupKey);

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
  }, [groupId, user?._id, user?.id, activeGroupKey]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !groupId) return;

    const text = newMessage.trim();

    if (activeGroupKey) {
      try {
        const encrypted = await encryptMessage(text, activeGroupKey, keyVersion);
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
        console.error("[E2EE] Encryption failed before send:", err);
      }
    }

    // Fallback if key unavailable
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
          <Pill variant="sky" size="sm" className="flex items-center gap-1 font-mono text-[11px]">
            <Lock className="w-3 h-3 text-[#0075de]" />
            <span>E2EE Active • Key v{keyVersion} [{keyFingerprint}]</span>
          </Pill>
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

