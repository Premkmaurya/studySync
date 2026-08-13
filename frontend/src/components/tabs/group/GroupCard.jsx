import React, { useRef, useState, useEffect } from "react";
import api from "../../../services/api";
import { Users, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../../design-system/Card";
import Button from "../../design-system/Button";
import Pill from "../../design-system/Pill";
import Avatar from "../../design-system/Avatar";

export default function GroupCard({ group, onGroupJoined }) {
  const [joinText, setJoinText] = useState("Join");
  const btnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkJoined() {
      try {
        const fetchGroups = await api.get("/api/groups/joined-groups");
        if (fetchGroups.data?.groups) {
          const isMember = fetchGroups.data.groups.some(
            (item) => item.groupId === group._id || item._id === group._id
          );
          if (isMember) {
            setJoinText("Joined");
          }
        }
      } catch {
        // quiet fallback
      }
    }
    checkJoined();
  }, [group._id]);

  const handleJoin = async (e) => {
    e.stopPropagation();
    if (joinText === "Joined") return;
    setJoinText("Joining...");
    try {
      const response = await api.post(`/api/groups/join/${group._id}`);
      if (response.data && response.data.group) {
        if (onGroupJoined) onGroupJoined(response.data.group);
      }
      setJoinText("Joined");
    } catch (err) {
      console.error("Failed to join group:", err);
      setJoinText("Join");
    }
  };

  return (
    <Card
      variant="white"
      hoverable
      onClick={() => {
        navigate(`/group/${group._id}`, {
          state: { groupData: group },
        });
      }}
      className="flex flex-col justify-between h-full group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <Pill variant="gray" size="sm">
            {group.field || "Study Group"}
          </Pill>
          <div className="flex items-center gap-1 text-[12px] text-[#757575]">
            <Users className="w-3.5 h-3.5" />
            <span>{group.members || group.memberCount || 1} members</span>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-3">
          <Avatar
            src={group.image}
            name={group.name}
            size="lg"
            borderColor="#0075de"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-[18px] font-bold text-[#000000] tracking-[-0.3px] group-hover:text-[#0075de] transition-colors truncate">
              {group.name}
            </h3>
            {group.description && (
              <p className="text-[13px] text-[#615d59] line-clamp-2 mt-1 leading-relaxed">
                {group.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/group/${group._id}`)}
        >
          View Workspace
        </Button>
        <Button
          ref={btnRef}
          variant={joinText === "Joined" ? "ghost" : "primary"}
          size="sm"
          icon={joinText === "Joined" ? Check : null}
          onClick={handleJoin}
        >
          {joinText}
        </Button>
      </div>
    </Card>
  );
}
