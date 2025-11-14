import React,{useEffect,useRef,useState} from "react";
import { io } from "socket.io-client";
import ReactMarkdown from 'react-markdown'

const ChatSidebar = ({aiText}) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      withCredentials: true,
    });
    console.log(aiText)
    socketInstance.emit("aiMessage",aiText)
    socketInstance.on("ai-response", (data) => {
      const newMsg = {
        id:data._id,
        text:data.text,
        isYou:false,
      }
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMessageObj = {
      id: messages.length + 1,
      text: newMessage,
      isYou: true,
    };
    socket.emit("aiMessage", newMessage);
    scrollToBottom();
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
  }, [messages]);

  return (
    <div className="absolute top-[3.2rem] right-0 flex justify-center items-center max-h-screen h-[80vh] w-[25vw] bg-gray-100 p-4">
      {/* --- Main Chat Window Container --- */}
      <div
        className="
          w-full max-w-sm h-[80vh] bg-gray-200 shadow-xl 
          border-4 border-black rounded-[24px] overflow-hidden 
          flex flex-col
        "
        style={{
          boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
        }}
      >
        {/* --- Header (Top Bar with Controls) --- */}
        <header className="flex justify-end p-2 border-b-4 border-black">
          {/* Mimic the min/max/close icons with text or simple icons */}
          <span className="text-xl mx-1 font-bold">☐</span>
          <span className="text-xl mx-1 font-bold cursor-pointer">X</span>
        </header>

        {/* --- Content Area (Where the chat/questions go) --- */}
        <main ref={messagesEndRef} className="flex-grow p-4 flex flex-col overflow-y-auto relative">
          {/* In a real app, this is where messages would be mapped */}
          {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-3 flex items-start ${
                message.isYou ? "justify-end" : ""
              } gap-5`}
            >
              <div>
                <div
                  className={`${
                    message.isYou ? "bg-blue-200" : "bg-blue-300"
                  } py-2 px-3 rounded-2xl text-xs shadow-lg max-w-lg custom-scrollbar`}
                >
                 <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black/80 absolute top-[50%] text-xs left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            Start your conversation
          </p>
        )}
        </main>

        {/* --- form (Input Area) --- */}
        <form onSubmit={handleSendMessage} className="p-3 border-t-4 border-black flex items-center bg-white">
          <input
            type="text"
            placeholder="ask..."
            className="
              px-4 py-2 w-[90%] text-lg bg-white border-2 border-black 
              rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
              font-sans
            "
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />

          {/* Send Button - Mimicking the blue icon */}
          <button className="ml-2 p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transform rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSidebar;
