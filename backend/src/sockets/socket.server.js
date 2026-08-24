const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const config = require("../config/config");
const messageModel = require("../models/groupChats.model");
const aiMessageModel = require("../models/aiMessage.model");
const noteModel = require("../models/note.model");
const groupModel = require("../models/group.model");
const joinGroupModel = require("../models/joinGroup.model");
const { generateResponse } = require("../services/ai.service");
const { invalidateByPrefix } = require("../services/cache.service");

function setSocketServer(httpServer) {
  const clientOrigin = process.env.CLIENT_URL || "http://localhost:5173";

  // Socket init
  const io = new Server(httpServer, {
    cors: {
      origin: clientOrigin,
      credentials: true,
    },
  });

  // 🔐 Middleware (auth)
  io.use((socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
      const token = cookies.token;

      if (!token) {
        return next(new Error("No token provided"));
      }

      const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
      socket.user = decoded;

      next();
    } catch (err) {
      return next(new Error("Invalid token"));
    }
  });

  // 🚀 Connection
  io.on("connection", (socket) => {

    socket.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", socket.id, "| Reason:", reason);
    });

    // // Join Room
    socket.on("joinRoom", async (roomId) => {
      try {
        if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
          return socket.emit("messageError", { message: "Invalid group room ID" });
        }

        const userId = socket.user?.id;
        if (!userId) {
          return socket.emit("messageError", { message: "Unauthorized socket" });
        }

        // Verify group exists and user is owner or joined member
        const group = await groupModel.findById(roomId);
        if (!group) {
          return socket.emit("messageError", { message: "Group not found" });
        }

        const isOwner = group.owner && group.owner.toString() === userId;
        const isMember = await joinGroupModel.findOne({ userId, groupId: roomId });

        if (!isOwner && !isMember) {
          return socket.emit("messageError", { message: "Access denied: Not a member of this group" });
        }

        if (socket.currentRoom && socket.currentRoom !== roomId) {
          socket.leave(socket.currentRoom);
        }

        socket.currentRoom = roomId;
        socket.join(roomId);

        console.log(`[Socket] User ${userId} (${socket.id}) joined room ${roomId}`);
        socket.emit("joinedRoomSuccess", { roomId });
        socket.to(roomId).emit("userJoined", `User joined: ${userId}`);
      } catch (err) {
        console.error("[Socket] joinRoom error:", err);
        socket.emit("messageError", { message: "Failed to join group room" });
      }
    });

    // // New Message (E2EE Ciphertext Opaque Handler)
    socket.on("newMessage", async (payload) => {
      try {
        const ciphertext = payload?.ciphertext || null;
        const iv = payload?.iv || null;
        const keyVersion = payload?.keyVersion || 1;
        const isEncrypted = Boolean(payload?.isEncrypted || ciphertext);

        // Fallback for legacy / unencrypted messages
        const rawText = typeof payload === "string" ? payload : (payload?.message || payload?.text);
        const legacyMessage = rawText ? String(rawText).trim() : null;

        if (!ciphertext && !legacyMessage) {
          return socket.emit("messageError", { message: "Message content cannot be empty" });
        }

        const roomId = socket.currentRoom || (payload?.groupId && mongoose.Types.ObjectId.isValid(payload.groupId) ? payload.groupId : null);

        if (!roomId) {
          return socket.emit("messageError", { message: "No active group room to send message" });
        }

        const userId = socket.user?.id;

        // Verify membership
        const group = await groupModel.findById(roomId);
        if (!group) {
          return socket.emit("messageError", { message: "Group not found" });
        }

        const isOwner = group.owner && group.owner.toString() === userId;
        const isMember = await joinGroupModel.findOne({ userId, groupId: roomId });

        if (!isOwner && !isMember) {
          return socket.emit("messageError", { message: "Access denied: Not a member of this group" });
        }

        // Persist opaque ciphertext message
        const createMsg = await messageModel.create({
          user: userId,
          group: roomId,
          ciphertext: ciphertext,
          iv: iv,
          keyVersion: keyVersion,
          isEncrypted: isEncrypted,
          message: legacyMessage || undefined,
        });

        const populatedMsg = await messageModel
          .findById(createMsg._id)
          .populate("user", "fullname");

        await invalidateByPrefix(`messages:group:${roomId}`);

        console.log(`[Socket E2EE] Encrypted message persisted and broadcasted by user ${userId} in room ${roomId}`);

        // Broadcast ciphertext to everyone in the room (server never decrypts)
        io.to(roomId).emit("newMessage", populatedMsg);
      } catch (err) {
        console.error("[Socket] newMessage error:", err);
        socket.emit("messageError", { message: "Failed to send message" });
      }
    });

    // // 🤖 AI Chat
    socket.on("ai-notes-request", async (messagePayload) => {
      try {
        if (!messagePayload?.text?.trim()) {
          socket.emit("ai-notes-response", {
            content: "Please send a message first so I can help you.",
            groupId: messagePayload?.groupId,
          });
          return;
        }
        await aiMessageModel.create({
          userId: socket.user.id,
          groupId: messagePayload.groupId,
          role: "user",
          text: messagePayload.text,
        });
        const chatHistory = await aiMessageModel
          .find({ chatId: messagePayload.chatId })
          .sort({ createdAt: -1 })
          .limit(10)
          .lean()
          .then((results) => results.reverse());

        const stm = chatHistory.map((item) => {
          return {
            role: item.role,
            parts: [{ text: item.text }],
          };
        });

        const response = await generateResponse([...stm], "notes");

        socket.emit("ai-notes-response", {
          content: response,
          groupId: messagePayload.groupId,
        });

        await aiMessageModel.create({
          userId: socket.user.id,
          groupId: messagePayload.groupId,
          role: "model",
          text: response,
        });
      } catch (err) {
        console.error("[Socket] ai-notes-request error:", err);
        socket.emit("messageError", { message: "Failed to process AI notes request" });
      }
    });

    socket.on("ai-conversation", async (messagePayload) => {
      try {
        if (!messagePayload?.text?.trim()) {
          socket.emit("ai-conversation-response", {
            text: "Please send a message first so I can help you.",
          });
          return;
        }
        await aiMessageModel.create({
          userId: socket.user.id,
          groupId: messagePayload.groupId,
          noteId: messagePayload.id,
          role: "user",
          text: messagePayload.text,
        });

        const note = await noteModel.findById(messagePayload.id);
        if (!note) throw new Error("Note not found");

        const chatHistory = await aiMessageModel
          .find({ chatId: messagePayload.chatId })
          .sort({ createdAt: -1 })
          .limit(10)
          .lean()
          .then((results) => results.reverse());

        const stm = chatHistory.map((item) => {
          return {
            role: item.role,
            parts: [{ text: item.text }],
          };
        });

        const response = await generateResponse([...stm], "conversation", note.content);

        socket.emit("ai-conversation-response", {
          text: response,
        });
        await aiMessageModel.create({
          userId: socket.user.id,
          groupId: messagePayload.groupId,
          noteId: messagePayload.id,
          role: "model",
          text: response,
        });
      } catch (err) {
        console.error("[Socket] ai-conversation error:", err);
        socket.emit("messageError", { message: "Failed to process AI conversation request" });
      }
    });
  });
}

module.exports = setSocketServer;

