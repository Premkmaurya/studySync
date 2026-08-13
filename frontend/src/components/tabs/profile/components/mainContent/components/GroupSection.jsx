import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectJoinedGroups } from "../../../../../../features/groups/groupsSelectors";
import { joinedGroup } from "../../../../../../features/groups/groupsSlice";
import Card from "../../../../../design-system/Card";
import Button from "../../../../../design-system/Button";
import Pill from "../../../../../design-system/Pill";
import { EmptyState } from "../../../../../design-system/States";

const GroupSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const joinedGroups = useSelector(selectJoinedGroups);

  useEffect(() => {
    if (!joinedGroups || joinedGroups.length === 0) {
      dispatch(joinedGroup());
    }
  }, [dispatch, joinedGroups]);

  if (!joinedGroups || joinedGroups.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No Groups Joined Yet"
        description="Explore public study groups and join communities aligned with your field."
        actionLabel="Find Groups"
        onAction={() => navigate("/find-groups")}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {joinedGroups.map((group, i) => (
        <Card
          key={group._id || i}
          variant="white"
          hoverable
          onClick={() => navigate(`/group/${group._id}`)}
          className="flex flex-col justify-between h-full group"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <Pill variant="sky" size="sm">
                {group.field || "General"}
              </Pill>
            </div>
            <h4 className="text-[18px] font-bold text-[#000000] tracking-[-0.3px] group-hover:text-[#0075de] transition-colors mb-2">
              {group.name}
            </h4>
            <p className="text-[13px] text-[#615d59] line-clamp-2 leading-relaxed">
              {group.description || "Active study group workspace."}
            </p>
          </div>

          <div className="pt-3 border-t border-black/[0.06] flex items-center justify-end mt-4">
            <Button variant="text" size="sm" icon={ArrowRight} iconPosition="right">
              Open Group
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GroupSection;
