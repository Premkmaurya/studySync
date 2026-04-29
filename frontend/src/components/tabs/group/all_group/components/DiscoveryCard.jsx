import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Users, ArrowUpRight } from "lucide-react";
import { selectJoinedGroups } from "../../../../../features/groups/groupsSelectors";
import { joinGroup, setJoinedGroups } from "../../../../../features/groups/groupsSlice";

import { motion } from "framer-motion";

const DiscoveryCard = ({ group, index }) => {
  const theme = useSelector((state) => state.theme.mode);
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
      whileHover={{ scale: 1.01 }}
      style={{ willChange: "transform" }}
      className={`group relative border rounded-[40px] p-5 shadow-2xl transition-all duration-300 overflow-hidden ${
        theme === "dark" 
          ? "bg-[#0e0e0f] border-white/10 hover:bg-[#202024]/80 backdrop-blur-sm" 
          : "bg-white/60 border-black/10 hover:bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className={`absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full transition-all ${
        theme === "dark" ? "bg-indigo-500/10 group-hover:bg-indigo-500/20" : "bg-indigo-500/10 group-hover:bg-indigo-500/20"
      }`} />

      <div className="flex items-start justify-between mb-8">
        <div className="relative">
          <div className={`absolute inset-0 blur-xl opacity-20 transition-opacity ${
            theme === "dark" ? "bg-indigo-500 group-hover:opacity-40" : "bg-indigo-500 group-hover:opacity-50"
          }`} />
          <img
            src={
              group.image || `https://i.pravatar.cc/150?u=${group._id || index}`
            }
            className={`relative w-16 h-16 rounded-2xl object-cover border ${
              theme === "dark" ? "border-white/10" : "border-black/10"
            }`}
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
        <h4 className={`text-2xl tracking-tight group-hover:text-indigo-400 transition-colors leading-none ${
          theme === "dark" ? "text-white" : "text-black"
        }`}>
          {group.name}
        </h4>
        <p className={`text-xs font-medium line-clamp-2 leading-relaxed ${
          theme === "dark" ? "text-zinc-400" : "text-zinc-600"
        }`}>
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
          className={`flex-1 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl ${
            theme === "dark" ? "bg-white text-black hover:bg-indigo-50 shadow-white/5" : "bg-black text-white hover:bg-zinc-800 shadow-black/10"
          }`}
          style={{ willChange: "transform" }}
        >
          {joinedGroups.some((g) => g._id === group._id)
            ? "Enter Hub"
            : "Join Hub"}
        </button>
        <button className={`p-4 border rounded-2xl transition-all ${
          theme === "dark" ? "bg-white/5 hover:bg-white/10 border-white/5 text-zinc-500 hover:text-white" : "bg-black/5 hover:bg-black/10 border-black/5 text-zinc-600 hover:text-black"
        }`}>
          <ArrowUpRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default DiscoveryCard;
