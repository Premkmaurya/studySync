import { io } from "socket.io-client";
import { dispatchToast } from "../utils/toastDispatcher";

let socket = null;
let currentRoomId = null;

const getSocketUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");
  }
  return "https://studysync-zgwh.onrender.com";
};

export const getSocket = () => {
  if (!socket) {
    const SOCKET_URL = getSocketUrl();

    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 15,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      // Rejoin active room on reconnect if applicable
      if (currentRoomId) {
        socket.emit("joinRoom", currentRoomId);
      }
    });

    socket.on("connect_error", (error) => {
      console.warn("⚠️ [Socket Service] Connection error:", error?.message || error);
    });

    socket.on("disconnect", (reason) => {
      console.warn("🔌 [Socket Service] Disconnected:", reason);
    });

    socket.on("messageError", (err) => {
      const msg = err?.message || "Failed to process real-time request";
      dispatchToast({
        title: "Action Failed",
        message: msg,
        variant: "error",
        category: "system",
      });
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
    dispatchToast({
      title: "Message Delivery Failed",
      message: "Real-time socket connection is currently reconnecting. Please try again in a moment.",
      variant: "warning",
      category: "system",
    });
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
