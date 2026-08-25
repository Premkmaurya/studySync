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

    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      // Rejoin active room on reconnect if applicable
      if (currentRoomId) {
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
