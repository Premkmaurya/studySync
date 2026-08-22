import React from "react";
import { MessageSquare, FileText, Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinGroup } from "../../../features/groups/groupsSlice";
import Card from "../../design-system/Card";
import Button from "../../design-system/Button";
import Pill from "../../design-system/Pill";
import Avatar from "../../design-system/Avatar";

const GroupCard = ({ group, isSuggested = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoin = async (e) => {
    e.stopPropagation();
    const res = await dispatch(joinGroup(group._id));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(`/group/${group._id}`);
    }
  };

  return (
    <Card
      variant="white"
      hoverable
      onClick={() => navigate(`/group/${group._id}`)}
      className="flex flex-col justify-between h-full group transition-all"
    >
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Pill variant="gray" size="sm">
            {group.field || "General"}
          </Pill>
          {isSuggested && group.match !== undefined && (
            <Pill variant="sky" size="sm">
              {group.match}% Match
            </Pill>
          )}
        </div>

        {/* Group Identity */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar
            src={group.image}
            name={group.name}
            size="lg"
            borderColor="#0075de"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-[18px] font-bold text-[#000000] tracking-[-0.3px] group-hover:text-[#0075de] transition-colors truncate">
              {group.name}
            </h4>
            {group.description && (
              <p className="text-[13px] text-[#615d59] line-clamp-2 mt-1">
                {group.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center gap-2 pt-4 border-t border-black/[0.06] mt-4" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
          icon={MessageSquare}
          onClick={() => navigate(`/group/${group._id}/chats`)}
        >
          Chat
        </Button>

        <Button
          variant="outlined"
          size="sm"
          className="flex-1"
          icon={FileText}
          onClick={() => navigate(`/group/${group._id}`)}
        >
          Notes
        </Button>

        {isSuggested && (
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={handleJoin}
          >
            Join
          </Button>
        )}
      </div>
    </Card>
  );
};

export default GroupCard;
