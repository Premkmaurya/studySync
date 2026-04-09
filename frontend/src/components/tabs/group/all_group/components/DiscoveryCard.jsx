import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Users, ArrowUpRight } from "lucide-react";
import { selectJoinedGroups } from "../../../../../features/groups/groupsSelectors";
import { joinGroup, setJoinedGroups } from "../../../../../features/groups/groupsSlice";

import { motion } from "framer-motion";

const DiscoveryCard = ({ group, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const joinedGroups = useSelector(selectJoinedGroups);

  const handleJoinGroup = async () => {
    const res = await dispatch(joinGroup(group._id));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(setJoinedGroups([...joinedGroups, res.payload.group]));
      navigate(`/group/${group._id}`);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
      style={{ willChange: "transform, background-color" }}
      className="group relative bg-zinc-900/30 border border-white/5 rounded-[40px] p-5 shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-all" />

      <div className="flex items-start justify-between mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <img
            src={
              group.image || `https://i.pravatar.cc/150?u=${group._id || index}`
            }
            className="relative w-16 h-16 rounded-2xl object-cover border border-white/10"
            alt={group.name}
          />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest mb-2">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />{" "}
            Live Now
          </div>
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1">
            <Users size={10} /> {group.members || 0} Members
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-10">
        <h4 className="text-2xl tracking-tight text-white group-hover:text-indigo-400 transition-colors leading-none">
          {group.name}
        </h4>
        <p className="text-xs text-zinc-500 font-medium line-clamp-2 leading-relaxed">
          {group.description ||
            "No mission statement provided for this collective hub."}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            if (joinedGroups.some((g) => g._id === group._id)) {
              navigate(`/group/${group._id}`);
            } else {
              handleJoinGroup();
            }
          }}
          className="flex-1 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-indigo-50 active:scale-95 shadow-xl shadow-white/5"
          style={{ willChange: "transform" }}
        >
          {joinedGroups.some((g) => g._id === group._id)
            ? "Enter Hub"
            : "Join Hub"}
        </button>
        <button className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-zinc-500 hover:text-white transition-all">
          <ArrowUpRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default DiscoveryCard;
