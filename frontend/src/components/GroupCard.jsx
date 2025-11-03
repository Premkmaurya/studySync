import React, { useRef, useState,useEffect } from "react";
import axios from "axios";
import { HiUserGroup, HiOutlineCheckCircle } from "react-icons/hi";

export default function GroupCard({ group,onGroupJoined }) {
  const [joinText, setJoinText] = useState("join");
  const [members, setMembers] = useState(1)
  const btnRef = useRef(null);

  useEffect(()=>{
    async function getGroups(){
      const fetchGroups = await axios.get("http://localhost:3000/api/groups/joined-groups",{
        withCredentials:true
      })
      fetchGroups.data.groups.some(item=>{
        if(item.groupId===group._id){

          setJoinText("joined")
          return;
        }
      })
    }
    getGroups()
  },[])

  const imageUrl = group.image || placeholderImageUrl;

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
    <div className="bg-[#202024] max-h-[45vh] rounded-lg overflow-hidden shadow-lg transition-all duration-300 border border-[#202024] hover:border-white/30">
      {/* Card Banner Image */}
      <div className="card-image-container h-[20vh]">
        <img
          src={imageUrl}
          alt={`${group.name} banner`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 truncate">
          {group.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 h-10 overflow-hidden">
          {/* Truncate description for clean UI */}
          {group.description.length > 60
            ? group.description.substring(0, 60) + "..."
            : group.description}
        </p>

        <div className="flex justify-between items-center">
          {/* Member Count */}
          <div className="flex items-center space-x-2 text-gray-400">
            <HiUserGroup className="h-5 w-5" />
            <span className="text-sm font-medium">{group.members} Members</span>
          </div>

          {/* Join Button */}
          <button
            ref={btnRef}
            onClick={handleJoin}
            className={`px-4 py-2 text-white text-sm font-medium rounded-md transition-colors
            ${joinText === "joined" ? "bg-blue-400" : "bg-blue-600"}
            ${joinText !== "joined" ? "hover:bg-blue-700" : ""}
            `}
          >
            {joinText}
          </button>
        </div>
      </div>
    </div>
  );
}
