import React, { useEffect, useState } from 'react';
import { useParams, useLocation, NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import { HiDocumentText, HiUsers, HiCog } from 'react-icons/hi';

// Yeh hamara naya "Column 2 + Column 3" layout hai
export default function SingleGroupPage() {
  const { groupId } = useParams();
  const location = useLocation();
  
  // Data state
  // 1. Pehle "gift box" (state) se data lene ki koshish karo
  const [group, setGroup] = useState(location.state?.groupData); 
  const [loading, setLoading] = useState(!group); // Agar data nahi tha, toh loading...
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. Agar user seedha URL type karke aaya (bina "gift box" ke)
    if (!group) {
      const fetchGroupData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/groups/search/${groupId}`,
            { 
              withCredentials: true,
            }
          );
          const foundGroup = response.data.group;

          if (foundGroup) {
            setGroup(foundGroup);
          } else {
            setError('Group not found');
          }
        } catch (err) {
          setError('Failed to fetch group data');
        }
        setLoading(false);
      };
      fetchGroupData();
    }
  }, [groupId, group]); // 'group' ko dependency mein rakho

  // Active link ki styling ke liye helper function
  const getNavLinkClass = ({ isActive }) => {
    return `
      flex items-center space-x-2 p-2 rounded-md
      text-gray-300 hover:bg-gray-700
      ${isActive ? 'bg-gray-900 text-white' : ''}
    `;
  };

  if (loading) {
    return <div className="p-8 text-white">Loading group details...</div>;
  }
  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }
  if (!group) {
    return <div className="p-8 text-white">Group not found.</div>;
  }

  return (
    <div className="flex h-full bg-[#1b1b1f]">
      {/* Column 2: Group Tabs (Naya Sub-Sidebar) */}
      <nav className="w-0 md:w-64 bg-[#121214] md:p-4 flex flex-col space-y-2 shrink-0">
        {/* Group Name Header */}
        <div className="px-2 py-3 mb-2 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white truncate">{group.name}</h2>
          <p className="text-sm text-gray-400">{group.members} Members</p>
        </div>
        
        {/* Tabs */}
        {/* 'end' prop zaroori hai taaki yeh tab 'members' pe active na ho */}
        <NavLink to={`/group/${groupId}`} end className={getNavLinkClass}>
          <HiDocumentText className="h-5 w-5" />
          <span>Notes</span>
        </NavLink>
        <NavLink to={`/group/${groupId}/chats`} className={getNavLinkClass}>
          <HiUsers className="h-5 w-5" />
          <span>Chats</span>
        </NavLink>
        <NavLink to={`/group/${groupId}/members`} className={getNavLinkClass}>
          <HiUsers className="h-5 w-5" />
          <span>Members</span>
        </NavLink>
        <NavLink to={`/group/${groupId}/settings`} className={getNavLinkClass}>
          <HiCog className="h-5 w-5" />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Column 3: Content Area (Yeh badlega) */}
      <main className="flex-1 overflow-y-auto">
        {/* Yahan '# Notes' ya '# Members' component render hoga */}
        <Outlet context={{ group }} /> 
        {/* 'context' se hum group data ko child routes (Notes/Members) mein bhej sakte hain */}
      </main>
    </div>
  );
}

