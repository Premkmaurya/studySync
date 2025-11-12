require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const httpServer = http.createServer(app);

connectDB();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
io.use((socket, next) => {
  const { token } = cookie.parse(socket.handshake.headers?.cookie || "");
  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    socket.user = decoded;
    next();
  } catch (error) {
    return next(new Error("Authentication error: Invalid token"));
  }
});

app.set("io", io);

httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
