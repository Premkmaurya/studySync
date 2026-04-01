const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { Server } = require("socket.io");
const messageModel = require("../models/groupChats.model");
const aiMessageModel = require("../models/aiMessage.model");
const { generateResponse } = require("../services/ai.service");

function setSocketServer(httpServer) {
  // Socket init
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
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

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      socket.user = decoded;

      next();
    } catch (err) {
      return next(new Error("Invalid token"));
    }
  });

  // 🚀 Connection
  io.on("connection", (socket) => {
    // // Join Room
    socket.on("joinRoom", (roomId) => {
      if (socket.currentRoom) {
        socket.leave(socket.currentRoom);
      }

      socket.currentRoom = roomId;
      socket.join(roomId);

      socket.to(roomId).emit("userJoined", `User joined: ${socket.user.id}`);
    });

    // // New Message
    socket.on("newMessage", async (message) => {
      const roomId = socket.currentRoom;

      if (!roomId) return;

      const createMsg = await messageModel.create({
        text: message.text,
        user: socket.user.id,
        group: roomId,
      });

      const populatedMsg = await messageModel
        .findById(createMsg._id)
        .populate("user", "fullname");

      // send message to everyone else in the room, not the sender
      socket.to(roomId).emit("newMessage", populatedMsg);
    });

    // // 🤖 AI Chat
    socket.on("ai-message", async (messagePayload) => {
      if (!messagePayload?.text?.trim()) {
        socket.emit("ai-response", {
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

      const response = await generateResponse([...stm]);

      socket.emit("ai-response", {
        content: response,
        groupId: messagePayload.groupId,
      });

      await aiMessageModel.create({
        userId: socket.user.id,
        groupId: messagePayload.groupId,
        role: "model",
        text: response,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = setSocketServer;
