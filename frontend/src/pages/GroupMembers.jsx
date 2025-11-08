import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { HiUserCircle, HiShieldCheck } from "react-icons/hi";
import axios from "axios";

export default function GroupMembers() {
  const { group } = useOutletContext();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function getMembers() {
      const response = await axios.get(
        "http://localhost:3000/api/groups/members",
        {
          params: {
            groupId: group._id,
          },
          withCredentials: true,
        }
      );
      const memberData = await Promise.all(
        response.data.members.map(async (m) => {
          const memberResponse = await axios.get(
            "http://localhost:3000/api/auth/me",
            { withCredentials: true }
          );
          return memberResponse.data; // return the data for each member
        })
      );
      setMembers(memberData)
    }
    getMembers();
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Members - {group.name}</h1>
      <div className="space-y-4 max-w-2xl mx-auto">
        {members.map((member) => (
          <div
            key={member.userFind._id}
            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <HiUserCircle className="h-10 w-10 text-gray-400" />
              <div>
                <span className="font-medium">{member.userFind.fullname.firstname}</span>
              </div>
            </div>
            {member.role === "Admin" && (
              <HiShieldCheck className="h-6 w-6 text-yellow-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
