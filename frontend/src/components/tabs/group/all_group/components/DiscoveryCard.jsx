import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Users, ArrowRight, Check } from "lucide-react";
import { selectJoinedGroups } from "../../../../../features/groups/groupsSelectors";
import { joinGroup, setJoinedGroups } from "../../../../../features/groups/groupsSlice";
import Card from "../../../../design-system/Card";
import Button from "../../../../design-system/Button";
import Pill from "../../../../design-system/Pill";
import Avatar from "../../../../design-system/Avatar";

const DiscoveryCard = ({ group }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const joinedGroups = useSelector(selectJoinedGroups);

  const isJoined = joinedGroups.some((g) => g._id === group._id);

  const handleJoinGroup = async (e) => {
    e.stopPropagation();
    if (isJoined) {
      navigate(`/group/${group._id}`);
      return;
    }
    const res = await dispatch(joinGroup(group._id));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(setJoinedGroups([...joinedGroups, res.payload.group]));
      navigate(`/group/${group._id}`);
    }
  };

  return (
    <Card
      variant="white"
      hoverable
      onClick={() => navigate(`/group/${group._id}`)}
      className="flex flex-col justify-between h-full group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <Pill variant="gray" size="sm">
            {group.field || "General"}
          </Pill>
          <div className="flex items-center gap-1 text-[12px] text-[#757575]">
            <Users className="w-3.5 h-3.5" />
            <span>{group.members || 1} members</span>
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
            <p className="text-[13px] text-[#615d59] line-clamp-2 mt-1 leading-relaxed">
              {group.description || "Active collaborative study group."}
            </p>
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
          variant={isJoined ? "ghost" : "primary"}
          size="sm"
          icon={isJoined ? Check : ArrowRight}
          iconPosition="right"
          onClick={handleJoinGroup}
        >
          {isJoined ? "Joined" : "Join Group"}
        </Button>
      </div>
    </Card>
  );
};

export default DiscoveryCard;
