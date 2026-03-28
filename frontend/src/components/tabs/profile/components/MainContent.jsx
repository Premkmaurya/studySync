import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Users,
  Bookmark,
  ArrowUpRight,
  Code,
  MoreVertical,
  Palette,
  Briefcase,
} from "lucide-react";
import StartCard from "./StartCard";
import { useDispatch, useSelector } from "react-redux";
import { getMyNotes } from "../../../../features/notes/notesSlice";
import { selectJoinedGroups } from "../../../../features/groups/groupsSelectors";
import { joinedGroup } from "../../../../features/groups/groupsSlice";

const ArrowRight = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14m-7-7 7 7-7 7" />
  </svg>
);

const MainContent = ({ activeTab }) => {
  const dispatch = useDispatch();
  const [joinedGroups, setJoinedGroups] = useState(
    useSelector(selectJoinedGroups) || [],
  );
  if (joinedGroups.length === 0) {
    const fetchGroups = async () => {
      const res = await dispatch(joinedGroup());
      console.log("Fetched joined groups:", res.payload);
      setJoinedGroups(res.payload.groups);
    };
    fetchGroups();
  }
  const [myNotes, setMyNotes] = useState([]);

  useEffect(() => {
    // Example: Fetch notes when the "notes" tab is active
    const fetchMyNotes = async () => {
      if (activeTab === "profile") {
        const res = await dispatch(getMyNotes());
        setMyNotes(res.payload?.notes);
      }
    };

    fetchMyNotes();
  }, [activeTab]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "opacity, transform" }}
      >
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center ">
            <StartCard
              label="Total Notes"
              value={myNotes.length}
              icon={FileText}
              color="text-cyan-400"
            />
            <StartCard
              label="Active Groups"
              value={joinedGroups.length}
              icon={Users}
              color="text-fuchsia-400"
            />
            <StartCard
              label="Saved Items"
              value="56"
              icon={Bookmark}
              color="text-emerald-400"
            />
          </div>
        )}

        {activeTab === "groups" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedGroups.map((group, i) => (
              <div
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
        )}

        {activeTab === "notes" && (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-6 bg-zinc-900/30 border border-white/5 rounded-[24px] hover:bg-white/5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-white/5 rounded-xl text-zinc-500 group-hover:text-indigo-400">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight">
                      Quantum Computing Briefing #{i}
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                      Last edited 2h ago
                    </p>
                  </div>
                </div>
                <MoreVertical
                  size={18}
                  className="text-zinc-700 hover:text-white"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "saved" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="p-8 bg-zinc-900/40 border border-white/5 rounded-[40px] relative group overflow-hidden"
              >
                <div className="absolute top-6 right-6 text-emerald-400">
                  <Bookmark size={20} fill="currentColor" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">
                  Saved: Distributed Systems Design
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                  Highly relevant to the Nexus AI architecture. Shared by Jordan
                  from Group Alpha.
                </p>
                <button className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                  View Source <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MainContent;
