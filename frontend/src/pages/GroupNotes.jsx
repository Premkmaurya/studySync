import { FaPlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


dayjs.extend(relativeTime);

const GroupNotes = () => {
  const [articles,setArticles]= useState([])
  const navigate = useNavigate();
  useEffect(() => {
    async function getNotes() {
      try{
        const response = await axios.get("http://localhost:3000/api/notes/get",{
          withCredentials:true
        })
        setArticles((prevArticles)=>[...prevArticles,...response.data.notes])
      }catch(err){
        console.error("Error fetching notes:", err);
      }
    }
    getNotes();
  }, []);


  return (
    <div
      className="min-h-screen p-4 sm:p-6 lg:p-8"
      style={{ backgroundColor: "#1b1b1f" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Search Bar and User Icon */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div className="relative grow mr-4">
            <input
              type="text"
              placeholder="search..."
              className="w-full pl-5 pr-12 py-3 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              style={{ backgroundColor: "#121214", border: "1px solid #333" }}
            />
            {/* Search Icon (optional, but good for UX) */}
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <FaUser className="h-7 w-7 transition duration-300 text-white cursor-pointer hover:text-blue-400 transition" />
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl flex flex-col justify-between border border-gray-700 hover:border-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: "#121214" }}
            >
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-400 text-sm mb-1">{article.userId.fullname.firstname} {article.userId.fullname.lastname}</p>
                <p className="text-gray-500 text-xs mb-4">{dayjs(article.createdAt).fromNow()}</p>
              </div>
              <button
                onClick={()=>navigate("/",{state:{content:article.content,isViewOnly:true}})}
                className="self-start px-6 py-2 cursor-pointer rounded-lg text-white font-medium hover:bg-blue-600 transition duration-200 flex justify-start items-center gap-2"
                style={{ backgroundColor: "#2a2a2e" }} // Slightly lighter for button contrast
              >
                <FaRegEye size={18} /> View more
              </button>
            </div>
          ))}
        </div>

        {/* Floating Action Button (FAB) */}
        <button onClick={()=>navigate("/")} className="fixed cursor-pointer bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 ease-in-out transform ">
          <FaPlus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default GroupNotes;
