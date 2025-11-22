import React, { useState, useEffect, useRef } from "react";
import { BiMessageDetail } from "react-icons/bi";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { io } from "socket.io-client";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const { group } = useOutletContext();
  const messagesEndRef = useRef(null);
  const groupId = group?._id;
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/messages/${groupId}`,
          {
            withCredentials: true,
          }
        );
        const fetchedMessages = response.data.chat.map((msg, index) => ({
          id: msg._id,
          text: msg.text,
          sender: {
            firstname: msg.user.fullname.firstname,
            lastname: msg.user.fullname.lastname,
          },
          isYou: msg.user._id === response.data.userId, // Replace with actual current user ID
        }));
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();

    const socketInstance = io("http://localhost:3000", {
      withCredentials: true,
    });
    socketInstance.emit("joinRoom", groupId);
    socketInstance.on("userJoined", (message) => {
      console.log(message);
    });
    socketInstance.on("newMessage", (message) => {
      const newMsg = {
        id: message._id,
        text: message.text,
        sender: {
          firstname: message.user.fullname.firstname,
          lastname: message.user.fullname.lastname,
        },
        isYou: message.user._id === socketInstance.userId, // Replace with actual current user ID
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    });
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMessageObj = {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
      isYou: true,
    };
    scrollToBottom();
    socket.emit("newMessage", { text: newMessage });
    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  const scrollToBottom = () => {
    const container = messagesEndRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight + 10; // Scroll to bottom with some extra space
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-[#1b1b1f] text-gray-900 h-screen flex flex-col font-sans">
      <div className="p-5 flex items-center gap-5">
        <BiMessageDetail size={28} className="text-gray-500" />
        <h2 className="text-2xl font-bold text-white/90">Group Chat</h2>
      </div>
      <div
        ref={messagesEndRef}
        className="flex-1 overflow-y-auto p-7 custom-scrollbar"
      >
        {/* Chat messages */}
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-3 flex items-start ${
                message.isYou ? "justify-end" : ""
              } gap-5`}
            >
              {!message.isYou && (
                <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                  {message.sender.firstname?.substring(0, 1)}
                  {message.sender.lastname?.substring(0, 1)}
                </div>
              )}
              <div>
                {!message.isYou && (
                  <div className={`font-bold mb-1.5 text-white/80`}>
                    {message.sender.firstname}
                  </div>
                )}
                <div
                  className={`${
                    message.isYou ? "bg-blue-200" : "bg-blue-300"
                  } py-2.5 px-3 rounded-2xl shadow-lg max-w-lg`}
                >
                  {message.text}
                </div>
              </div>
              {message.isYou && (
                <div className="w-11 h-11 rounded-full bg-green-300 flex items-center justify-center font-bold text-green-900">
                  You
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-white/80 absolute top-[50%] text-lg left-[60%] transform -translate-x-1/2 -translate-y-1/2">
            Start your conversation
          </p>
        )}
      </div>
      <div className="p-6 border-t border-gray-200 bg-[#1b1b1f]">
        <div className="flex items-center text-white/80 gap-5">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 py-3.5 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            className="py-3.5 px-7 rounded-full border-none bg-blue-500 text-white cursor-pointer text-lg font-bold shadow-xl hover:bg-blue-600 transition-colors"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
