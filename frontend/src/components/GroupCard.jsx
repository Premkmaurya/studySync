import React from 'react';
import axios from 'axios';
import { HiUserGroup, HiOutlineCheckCircle } from 'react-icons/hi';

export default function GroupCard({ group }) {
  
  // Magic Placeholder Image
  // Jab tak backend mein image nahi hai, yeh group ke naam se image bana dega
  const placeholderImageUrl = `https://placehold.co/600x340/374151/FFFFFF?text=${encodeURIComponent(group.name)}&font=lato`;

  // TODO: Jab image upload kaam karega, hum `group.imageUrl || placeholderImageUrl` use karenge
  const imageUrl = group.image || placeholderImageUrl;

  // Owner ko mila ke total members
  const totalMembers = (group.members?.length || 0) + 1; // +1 for the owner

  const handleJoin = async () => {
    try {
      // TODO: Is button ke click pe "Join Group" API call karni hai
      console.log(`Joining group: ${group.name} (ID: ${group._id})`);
      const response = await axios.post(
        `http://localhost:3000/api/groups/join/${group._id}`,
        {},
        { withCredentials: true }
      );
      console.log('Joined group!', response.data);
    } catch (err) {
      console.error('Failed to join group:', err);
      alert('Failed to join group.');
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
            ? group.description.substring(0, 60) + '...'
            : group.description}
        </p>
        
        <div className="flex justify-between items-center">
          {/* Member Count */}
          <div className="flex items-center space-x-2 text-gray-400">
            <HiUserGroup className="h-5 w-5" />
            <span className="text-sm font-medium">{totalMembers} Members</span>
          </div>

          {/* Join Button */}
          <button
            onClick={handleJoin}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
