import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Code } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectJoinedGroups } from "../../../../../../features/groups/groupsSelectors";
import {
  joinedGroup,
  setJoinedGroups,
} from "../../../../../../features/groups/groupsSlice";

const GroupSection = () => {
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const joinedGroups = useSelector(selectJoinedGroups);

  if (joinedGroups.length === 0) {
    const fetchGroups = async () => {
      const res = await dispatch(joinedGroup());
      setJoinedGroups(res.payload.groups);
    };
    fetchGroups();
  }

  return (
    <div className="space-y-6">
      {joinedGroups?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedGroups.map((group, i) => (
            <div
              onClick={() => {
                navigate(`/group/${group._id}`);
              }}
              key={i}
              className="group p-8 bg-zinc-900/40 border border-white/5 rounded-[40px] hover:border-white/10 transition-all cursor-pointer"
            >
              <div
                className={`p-4 bg-zinc-800 rounded-3xl w-fit mb-6 ${group.color} group-hover:bg-white group-hover:text-black transition-all`}
              >
                <Code size={20} />
              </div>
              <h4 className="text-2xl font-black tracking-tighter text-white mb-2">
                {group.name}
              </h4>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                <span className="text-[10px] font-black text-zinc-500 tracking-widest">
                  {group.field}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-zinc-700 group-hover:text-white transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-white mb-4">
            No Groups Joined Yet
          </h3>
          <p className="text-zinc-500 mb-6">
            Join groups to see them here. Groups you join will be displayed in
            this section.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Find Groups
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupSection;
