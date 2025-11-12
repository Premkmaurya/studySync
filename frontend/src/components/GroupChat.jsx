import React, { useState, useEffect } from "react";
import { BiMessageDetail } from "react-icons/bi";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const GroupChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! This is a sample message.",
      sender: "John Doe",
      isYou: false,
    },
    {
      id: 2,
      text: "Hi there! This is a reply.",
      sender: "You",
      isYou: true,
    },
  ]);
  const { group } = useOutletContext();
  const groupId = group?._id;
  console.log(groupId)
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/messages/${groupId}`,{
          withCredentials:true
        });
        // const fetchedMessages = response.data.chat.map((msg, index) => ({
        //   id: index + 1,
        //   text: msg.text,
        //   sender: msg.senderName,
        //   isYou: msg.senderId === 'currentUserId', // Replace with actual current user ID
        //  }));
        // setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMessageObj = {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
      isYou: true,
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  return (
    <div className="bg-[#1b1b1f] text-gray-900 h-screen flex flex-col font-sans">
      <div className="p-5 flex items-center gap-5">
        <BiMessageDetail size={28} className="text-gray-500" />
        <h2 className="text-2xl font-bold text-white/90">Group Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-7">
        {/* Chat messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-7 flex items-start ${
              message.isYou ? "justify-end" : ""
            } gap-5`}
          >
            {!message.isYou && (
              <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                {message.sender.substring(0, 2)}
              </div>
            )}
            <div>
              <div className="font-bold mb-1.5 text-white/80">
                {message.sender}
              </div>
              <div
                className={`${
                  message.isYou ? "bg-blue-200" : "bg-blue-300"
                } py-3.5 px-5 rounded-2xl shadow-lg max-w-lg`}
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
        ))}
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
