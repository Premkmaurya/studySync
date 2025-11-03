require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/db/db")
const http = require("http")
const {Server} = require("socket.io")


const httpServer = http.createServer(app)

connectDB();

const io = new Server(httpServer,{
    cors:{
      origin:"http://localhost:5173",
      credentials:true
    }
})

app.set("io", io);



httpServer.listen(3000,()=>{
    console.log("server is running on port 3000");
})