import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { HiUserGroup, HiOutlineCheckCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function GroupCard({ group, onGroupJoined }) {
  const theme = useSelector((state) => state.theme.mode);
  const [joinText, setJoinText] = useState("join");
  const btnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getGroups() {
      const fetchGroups = await axios.get(
        "http://localhost:3000/api/groups/joined-groups",
        {
          withCredentials: true,
        }
      );
      fetchGroups.data.groups.some((item) => {
        if (item.groupId === group._id) {
          setJoinText("joined");
          return;
        }
      });
    }
    getGroups();
  }, []);

  const imageUrl = group.image || "placeholderImageUrl";

  const handleJoin = async () => {
    if (joinText === "joined") return;
    setJoinText("joining...");
    try {
      const response = await axios.post(
        `http://localhost:3000/api/groups/join/${group._id}`,
        {},
        { withCredentials: true }
      );
      if (response.data && response.data.group) {
        onGroupJoined(response.data.group);
      }
      setJoinText("joined");
      btnRef.current.disabled = true;
    } catch (err) {
      console.error("Failed to join group:", err);
    }
  };

  return (
    <div
      onClick={() => {
        navigate(`/group/${group._id}`, {
          state: {
            groupData: group,
          },
        });
      }}
      className={`group relative rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 border cursor-pointer ${
        theme === "dark" 
          ? "bg-[#0e0e0f] border-white/10 hover:bg-[#202024]/80 backdrop-blur-sm hover:border-indigo-500/30" 
          : "bg-white/60 border-black/10 hover:bg-white/80 backdrop-blur-sm hover:border-indigo-500/30"
      }`}
    >
      {/* Card Banner Image */}
      <div className="card-image-container h-[20vh] overflow-hidden">
        <img
          src={imageUrl}
          alt={`${group.name} banner`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className={`text-2xl font-black tracking-tight leading-tight mb-2 truncate group-hover:text-indigo-400 transition-colors ${
          theme === "dark" ? "text-white" : "text-black"
        }`}>
          {group.name}
        </h3>
        <p className={`text-sm mb-6 h-10 overflow-hidden ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
          {/* Truncate description for clean UI */}
          {group.description.length > 60
            ? group.description.substring(0, 60) + "..."
            : group.description}
        </p>

        <div className="flex justify-between items-center">
          {/* Member Count */}
          <div className={`flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest ${theme === "dark" ? "text-zinc-500" : "text-zinc-500"}`}>
            <HiUserGroup className="h-4 w-4" />
            <span>{group.members} Synced</span>
          </div>

          {/* Join Button */}
          <button
            ref={btnRef}
            onClick={(e) => {
              e.stopPropagation();
              handleJoin();
            }}
            className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl active:scale-95 ${
              joinText === "joined"
                ? theme === "dark" ? "bg-zinc-800 text-white" : "bg-black/5 text-black"
                : theme === "dark" ? "bg-white text-black hover:bg-indigo-500 hover:text-white" : "bg-black text-white hover:bg-indigo-500"
            }`}
          >
            {joinText}
          </button>
        </div>
      </div>
    </div>
  );
}
