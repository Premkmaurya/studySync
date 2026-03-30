require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const messageModel = require("./src/models/groupChats.model");
const aiMessageModel = require("./src/models/aiMessage.model");
const { generateResponse, createVector } = require("./src/services/ai.service");
const { createMemory, queryMemory } = require("./src/services/vector.service");

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
  socket.on("ai-message", async (messagePayload) => {
    const [userMessage, vectors] = await Promise.all([
      aiMessageModel.create({
        userId: socket.user.id,
        groupId: messagePayload.groupId,
        role: "user",
        text: messagePayload.text,
      }),
      createVector(messagePayload.text),
    ]);
    await createMemory({
      messageId: userMessage._id,
      vectors,
      metadata: {
        chat: messagePayload.groupId,
        user: socket.user.id,
        text: messagePayload.text,
      },
    });
    const [memory, chatHistory] = await Promise.all([
      queryMemory({
        queryVector: vectors,
        limit: 3,
        metadata: {},
      }),
      aiMessageModel
        .find({ chatId: messagePayload.chatId })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean()
        .then((results) => results.reverse()),
    ]);

    const stm = chatHistory.map((item) => {
      return {
        role: item.role,
        parts: [{ text: item.text }],
      };
    });

    const ltm = [
      {
        role: "user",
        parts: [
          {
            text: `these are some previous messages from the chat, use them to generate a response
             ${memory.map((item) => item.metadata.text).join("\n")}
					`,
          },
        ],
      },
    ];

    const response = await generateResponse([...ltm, ...stm]);

    socket.emit("ai-response", {
      content: response,
      groupId: messagePayload.groupId,
    });

    const [responseMessage, responseVector] = await Promise.all([
      aiMessageModel.create({
        userId: socket.user.id,
        groupId: messagePayload.groupId,
        role: "model",
        text: response,
      }),
      createVector(response),
    ]);
    await createMemory({
      vectors: responseVector,
      messageId: responseMessage._id,
      metadata: {
        chat: messagePayload.groupId,
        user: socket.user.id,
        text: response,
      },
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
