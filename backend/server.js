require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const messageModel = require("./src/models/message.model");
const aiMessageModel = require("./src/models/aiMessage.model");
const genreateResponse = require("./src/services/ai.service");

const httpServer = http.createServer(app);
let io = null;
connectDB();
async function initServer(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  io.use((socket, next) => {
    const { token } = cookie.parse(socket.handshake.headers?.cookie || "");
    if (!token) {
      console.log("Authentication error: No token provided");
      return next(new Error("Authentication error: No token provided"));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      socket.user = decoded;
      next();
    } catch (error) {
      console.log("Authentication error: No token provided");
      return next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (roomId) => {
      if (socket.currentRoom) {
        socket.leave(socket.currentRoom);
      }
      socket.currentRoom = roomId;
      socket.join(roomId);
      socket.broadcast
        .to(roomId)
        .emit("userJoined", `user connect with this id:${socket.user.id}`);
      socket.on("newMessage", async (message) => {
        const roomId = socket.currentRoom; // Use the stored room ID

        if (!roomId) {
          // If user sends a message without joining a room, ignore it
          return console.log("Error: Message sent without joining a room.");
        }
        const createMsg = await messageModel.create({
          text: message.text,
          user: socket.user.id,
          group: roomId,
        });
        const populatedMsg = await messageModel
          .findById(createMsg._id)
          .populate("user", "fullname");
        socket.broadcast.to(roomId).emit("newMessage", populatedMsg);
      });
    });
    socket.on("aiMessage", async (message) => {
      await aiMessageModel.create({
        userId: socket.user.id,
        role: "user",
        text: message,
      });
      const chatHistory = await aiMessageModel
        .find({userId:socket.user.id})
        .skip(0)
        .limit(10)
        .sort({ createdAt: -1 })
        .lean()
        .then((chat) => chat.reverse());

      const stm = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.text }],
        };
      });

      const response = await genreateResponse(stm);
      socket.emit("ai-response", { text: response });
      await aiMessageModel.create({
        userId: socket.user.id,
        role: "model",
        text: response,
      });
    });
    socket.on("disconnect", () => {
      if (socket.currentRoom) {
        socket.leave(socket.currentRoom);
      }
    });
  });
}

initServer(httpServer);
app.set("io", io);

httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
