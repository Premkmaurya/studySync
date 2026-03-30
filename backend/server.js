require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const messageModel = require("./src/models/groupChats.model");
const aiMessageModel = require("./src/models/aiMessage.model");
const generateResponse = require("./src/services/ai.service");

const httpServer = http.createServer(app);

// DB connect
connectDB();

// Socket init
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// // 🔐 Middleware (auth)
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
  socket.on("aiMessage", async (message) => {
    await aiMessageModel.create({
      userId: socket.user.id,
      role: "user",
      text: message,
    });

    const chatHistory = await aiMessageModel
      .find({ userId: socket.user.id })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    const formatted = chatHistory.reverse().map((item) => ({
      role: item.role,
      parts: [{ text: item.text }],
    }));

    const response = await generateResponse(formatted);

    socket.emit("ai-response", { text: response });

    await aiMessageModel.create({
      userId: socket.user.id,
      role: "model",
      text: response,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
httpServer.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
