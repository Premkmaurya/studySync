import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, UserMinus, Shield } from "lucide-react";
import { selectUser } from "../../../../../features/auth/authSelectors";
import { removeMember, fetchGroupMembers } from "../../../../../features/groups/groupsSlice";
import { useOutletContext } from "react-router-dom";

const MemberEntry = ({ member, index, onRemove }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const currentUser = useSelector(selectUser);
  const context = useOutletContext();
  const group = context?.group;
  
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const groupOwnerId = group?.owner?._id || group?.owner;
  const isCurrentUserOwner = String(groupOwnerId) === String(currentUser?._id);
  const isMemberAdmin = String(member?.userId?._id) === String(groupOwnerId);
  
  const firstName = String(member?.userId?.fullname?.firstname || "Node");
  const lastName = String(member?.userId?.fullname?.lastname || "");
  const userId = String(member?.userId?._id || index);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRemove = async () => {
    if (window.confirm(`Are you sure you want to remove ${firstName} from the group?`)) {
      const res = await dispatch(removeMember({ groupId: group._id, userId: member.userId._id }));
      if (res.meta.requestStatus === "fulfilled") {
        // Refresh local state instantly
        if (onRemove) onRemove(member.userId._id);
      }
      setShowMenu(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      className={`group flex items-center justify-between py-4 border-b px-4 transition-all duration-300 ${
        theme === "dark" ? "border-white/5 hover:bg-white/[0.01]" : "border-black/5 hover:bg-black/[0.02]"
      }`}
    >
      <div className="flex items-center gap-6">
        {/* Simple Avatar Slot */}
        <div className="relative">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[10px] border transition-all ${
              isMemberAdmin
                ? theme === "dark" ? "bg-indigo-500/5 border-indigo-500/30 text-indigo-400" : "bg-indigo-400/5 border-indigo-400/30 text-indigo-600"
                : theme === "dark" ? "bg-zinc-950 border-white/10 text-zinc-600" : "bg-zinc-100 border-black/10 text-zinc-500"
            }`}
          >
            {firstName[0]}
            {lastName[0] || ""}
          </div>
          {isMemberAdmin && (
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -inset-1 bg-indigo-500/10 blur-xl rounded-full -z-10"
            />
          )}
        </div>

        {/* Name & ID */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className={`text-sm font-bold uppercase tracking-tight transition-colors ${
              theme === "dark" ? "text-zinc-200 group-hover:text-white" : "text-zinc-800 group-hover:text-black"
            }`}>
              {firstName} {lastName}
            </span>
            {isMemberAdmin && (
              <span className="text-[8px] font-black text-indigo-400 border border-indigo-400/30 px-1.5 py-0.5 rounded uppercase tracking-widest">
                Admin
              </span>
            )}
          </div>
          <span className={`text-[9px] font-mono mt-0.5 uppercase tracking-widest ${theme === "dark" ? "text-zinc-600" : "text-zinc-400"}`}>
            NODE_ID: {userId.substring(0, 8)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8 relative" ref={menuRef}>
        {isCurrentUserOwner && member.userId._id !== currentUser?._id && (
          <>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className={`p-2 transition-colors rounded-lg ${
                showMenu 
                  ? (theme === "dark" ? "bg-white/10 text-white" : "bg-black/5 text-black")
                  : (theme === "dark" ? "text-zinc-700 hover:text-white hover:bg-white/5" : "text-zinc-400 hover:text-black hover:bg-black/5")
              }`}
            >
              <MoreVertical size={18} />
            </button>
            
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className={`absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-2xl z-50 overflow-hidden ${
                    theme === "dark" ? "bg-[#161617] border-white/10 shadow-black/50" : "bg-white border-black/5 shadow-black/10"
                  }`}
                >
                  <div className="p-1.5 flex flex-col">
                    <button
                      onClick={handleRemove}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-lg transition-colors group/btn"
                    >
                      <UserMinus size={14} className="group-hover/btn:scale-110 transition-transform" />
                      Remove Member
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default MemberEntry;
