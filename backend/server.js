require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const http = require("http");
const setSocketServer = require("./src/sockets/socket.server");
const { initCache } = require("./src/services/cache.service");


const httpServer = http.createServer(app);

// DB connect
connectDB();

// Cache init
initCache();

// socket server
setSocketServer(httpServer);

// Start server
httpServer.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
