import { io } from "socket.io-client";

let socket = null;
let currentRoomId = null;

const getSocketUrl = () => {
  if (import.meta.env.VITE_SOCKET_URL) {
    return import.meta.env.VITE_SOCKET_URL;
  }
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");
  }
  return "http://localhost:3000";
};

export const getSocket = () => {
  if (!socket) {
    const SOCKET_URL = getSocketUrl();
    console.log("[Socket Service] Initializing singleton Socket.IO connection to:", SOCKET_URL);

    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("⚡ [Socket Service] Connected with ID:", socket.id);
      // Rejoin active room on reconnect if applicable
      if (currentRoomId) {
        console.log("🔄 [Socket Service] Re-joining active room after connect/reconnect:", currentRoomId);
        socket.emit("joinRoom", currentRoomId);
      }
    });

    socket.on("connect_error", (error) => {
      console.error("❌ [Socket Service] Connection error:", error?.message || error);
    });

    socket.on("disconnect", (reason) => {
      console.warn("🔌 [Socket Service] Disconnected:", reason);
    });

    socket.on("messageError", (err) => {
      console.error("⚠️ [Socket Service] Server error event:", err?.message || err);
    });
  }

  return socket;
};

export const joinGroupRoom = (roomId) => {
  const s = getSocket();
  currentRoomId = roomId;
  if (s.connected && roomId) {
    console.log("[Socket Service] Emitting joinRoom for room:", roomId);
    s.emit("joinRoom", roomId);
  }
};

export const leaveGroupRoom = () => {
  currentRoomId = null;
};

export const sendGroupMessage = (payload) => {
  const s = getSocket();
  if (s.connected) {
    s.emit("newMessage", payload);
  } else {
    console.error("[Socket Service] Cannot send message: Socket disconnected");
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    currentRoomId = null;
  }
};

export default getSocket;
