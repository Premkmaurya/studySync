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
const userModel = require("../models/user.model");
const notificationModel = require("../models/notification.model");
const { generateResponse } = require("../services/ai.service");
const { invalidateByPrefix } = require("../services/cache.service");
const aiHealthService = require("../services/aiHealth.service");

let ioInstance = null;

function setSocketServer(httpServer) {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://study-sync-ten-lake.vercel.app",
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
  ];

  // Socket init
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });
  ioInstance = io;

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
  io.on("connection", async (socket) => {
    const userId = socket.user?.id;

    // Join user-specific room for targeted, private multi-tab notifications
    if (userId) {
      const userRoom = `user:${userId}`;
      socket.join(userRoom);

      // Send initial unread count to this connection
      notificationModel
        .countDocuments({ userId, isRead: false })
        .then((unreadCount) => {
          socket.emit("notification:unread-count", { unreadCount });
        })
        .catch((err) => console.error("[Socket] unread count error:", err));

      // Send current AI health status
      socket.emit("ai:status", aiHealthService.getStatus());
    }

    socket.on("disconnect", (reason) => {
      // Clean disconnect
    });

    // Mark single notification read
    socket.on("notification:mark-read", async (data) => {
      try {
        if (!data?.id || !userId) return;
        const notificationService = require("../services/notification.service");
        await notificationService.markAsRead(data.id, userId);
      } catch (err) {
        console.error("[Socket] notification:mark-read error:", err);
      }
    });

    // Mark all notifications read
    socket.on("notification:mark-all-read", async () => {
      try {
        if (!userId) return;
        const notificationService = require("../services/notification.service");
        await notificationService.markAllAsRead(userId);
      } catch (err) {
        console.error("[Socket] notification:mark-all-read error:", err);
      }
    });

    // Delete single notification
    socket.on("notification:delete", async (data) => {
      try {
        if (!data?.id || !userId) return;
        const notificationService = require("../services/notification.service");
        await notificationService.deleteNotification(data.id, userId);
      } catch (err) {
        console.error("[Socket] notification:delete error:", err);
      }
    });

    // // Join Group Room
    socket.on("joinRoom", async (roomId) => {
      try {
        if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
          return socket.emit("messageError", { message: "Invalid group room ID" });
        }

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
          return socket.emit("messageError", {
            message: "Access denied: Not a member of this group",
          });
        }

        if (socket.currentRoom && socket.currentRoom !== roomId) {
          socket.leave(socket.currentRoom);
        }

        socket.currentRoom = roomId;
        socket.join(roomId);

        socket.emit("joinedRoomSuccess", { roomId });
        socket.to(roomId).emit("userJoined", `User joined: ${userId}`);
      } catch (err) {
        console.error("[Socket] joinRoom error:", err);
        socket.emit("messageError", { message: "Failed to join group room" });
      }
    });

    // // New Message (Standard Group Chat)
    socket.on("newMessage", async (payload) => {
      try {
        const rawText =
          typeof payload === "string" ? payload : payload?.message || payload?.text;
        const messageText = rawText ? String(rawText).trim() : null;

        if (!messageText) {
          return socket.emit("messageError", {
            message: "Message content cannot be empty",
          });
        }

        const roomId =
          socket.currentRoom ||
          (payload?.groupId && mongoose.Types.ObjectId.isValid(payload.groupId)
            ? payload.groupId
            : null);

        if (!roomId) {
          return socket.emit("messageError", {
            message: "No active group room to send message",
          });
        }

        // Verify membership
        const group = await groupModel.findById(roomId);
        if (!group) {
          return socket.emit("messageError", { message: "Group not found" });
        }

        const isOwner = group.owner && group.owner.toString() === userId;
        const isMember = await joinGroupModel.findOne({ userId, groupId: roomId });

        if (!isOwner && !isMember) {
          return socket.emit("messageError", {
            message: "Access denied: Not a member of this group",
          });
        }

        // Persist message
        const createMsg = await messageModel.create({
          user: userId,
          group: roomId,
          message: messageText,
        });

        const populatedMsg = await messageModel
          .findById(createMsg._id)
          .populate("user", "fullname");

        await invalidateByPrefix(`messages:group:${roomId}`);

        // Broadcast to everyone currently active in the group room
        io.to(roomId).emit("newMessage", populatedMsg);

        // Distribute real-time notifications to all group members
        const senderName =
          populatedMsg?.user?.fullname?.firstname ||
          socket.user?.fullname?.firstname ||
          "A member";

        const preview =
          messageText.length > 70 ? `${messageText.slice(0, 67)}...` : messageText;

        // Find all group members
        const [memberships] = await Promise.all([
          joinGroupModel.find({ groupId: roomId }).populate("userId", "fullname").lean(),
        ]);

        const allMemberUsers = [];
        if (group.owner) {
          const ownerDoc = await userModel.findById(group.owner).select("fullname").lean();
          if (ownerDoc) allMemberUsers.push(ownerDoc);
        }
        memberships.forEach((m) => {
          if (m.userId) allMemberUsers.push(m.userId);
        });

        // Detect mentions: @firstname or @name
        const mentionMatches = messageText.match(/@(\w+)/g) || [];
        const mentionedTerms = mentionMatches.map((m) => m.slice(1).toLowerCase());

        const notificationService = require("../services/notification.service");
        const notifiedUserIds = new Set();

        for (const member of allMemberUsers) {
          const memberIdStr = member._id.toString();
          if (memberIdStr === userId) continue; // Skip sender

          const memberFirstName = (member?.fullname?.firstname || "").toLowerCase();
          const memberLastName = (member?.fullname?.lastname || "").toLowerCase();

          const isMentioned = mentionedTerms.some(
            (term) =>
              term === memberFirstName ||
              term === `${memberFirstName}${memberLastName}` ||
              term === "all"
          );

          if (isMentioned) {
            notifiedUserIds.add(memberIdStr);
            await notificationService.notifyUser({
              userId: memberIdStr,
              type: "group_mention",
              category: "group",
              title: `Mentioned in ${group.name}`,
              message: `${senderName} mentioned you: "${preview}"`,
              resourceType: "message",
              resourceId: createMsg._id.toString(),
              groupId: roomId,
              senderId: userId,
              priority: "high",
              metadata: {
                actionUrl: `/group/${roomId}/chats`,
                groupName: group.name,
                senderName,
              },
            });
          } else {
            notifiedUserIds.add(memberIdStr);
            await notificationService.notifyUser({
              userId: memberIdStr,
              type: "group_message",
              category: "message",
              title: `New message in ${group.name}`,
              message: `${senderName}: "${preview}"`,
              resourceType: "message",
              resourceId: createMsg._id.toString(),
              groupId: roomId,
              senderId: userId,
              priority: "low",
              metadata: {
                actionUrl: `/group/${roomId}/chats`,
                groupName: group.name,
                senderName,
              },
            });
          }
        }
      } catch (err) {
        console.error("[Socket] newMessage error:", err);
        socket.emit("messageError", { message: "Failed to send message" });
      }
    });

    // // 🤖 AI Chat (Note generation)
    socket.on("ai-notes-request", async (messagePayload) => {
      try {
        if (!messagePayload?.text?.trim()) {
          socket.emit("ai-notes-response", {
            content: "Please send a message first so I can help you.",
            groupId: messagePayload?.groupId,
          });
          return;
        }

        const taskExec = async () => {
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

          const stm = chatHistory.map((item) => ({
            role: item.role,
            parts: [{ text: item.text }],
          }));

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

          return response;
        };

        await aiHealthService.executeWithHealthCheck(
          {
            userId: socket.user.id,
            groupId: messagePayload.groupId,
            taskName: "Syncie Note Creation",
            io,
          },
          taskExec
        );
      } catch (err) {
        console.error("[Socket] ai-notes-request error:", err?.message || err);
        socket.emit("messageError", {
          message: "Syncie was unable to complete your request.",
        });
      }
    });

    // // 🤖 AI Conversation (Study Q&A / Summary)
    socket.on("ai-conversation", async (messagePayload) => {
      try {
        if (!messagePayload?.text?.trim()) {
          socket.emit("ai-conversation-response", {
            text: "Please send a message first so I can help you.",
          });
          return;
        }

        const taskExec = async () => {
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

          const stm = chatHistory.map((item) => ({
            role: item.role,
            parts: [{ text: item.text }],
          }));

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

          return response;
        };

        await aiHealthService.executeWithHealthCheck(
          {
            userId: socket.user.id,
            groupId: messagePayload.groupId,
            noteId: messagePayload.id,
            taskName: "Syncie Study Assistant",
            io,
          },
          taskExec
        );
      } catch (err) {
        console.error("[Socket] ai-conversation error:", err?.message || err);
        socket.emit("messageError", {
          message: "Syncie was unable to answer your query.",
        });
      }
    });
  });
}

function getIO() {
  return ioInstance;
}

module.exports = {
  setSocketServer,
  getIO,
};
