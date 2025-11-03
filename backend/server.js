require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/db/db")
const http = require("http")
const {Server} = require("socket.io")


const httpServer = http.createServer(app)

connectDB();

const io = new Server(httpServer,{
    cors:"http://localhost:5173",
    credentials:true
})

app.set("io", io);

io.on("connection", (socket) => {
  console.log("✅ A user connected via Socket.io:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});


httpServer.listen(3000,()=>{
    console.log("server is running on port 3000");
})