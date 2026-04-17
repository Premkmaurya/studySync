import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Search, 
  MoreHorizontal, 
  Users, 
  Zap, 
  Fingerprint,
  Circle
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { fetchGroupMembers } from "../../../../features/groups/groupsSlice";
import { selectNotes } from "../../../../features/notes/notesSelectors";
import { getNoteById, setNotes } from "../../../../features/notes/notesSlice";
import MemberEntry from "./components/MemberEntry";
import Header from "./components/Header";


const GroupMembers = () => {
  const theme = useSelector((state) => state.theme.mode);
  const context = useOutletContext();
  const group = context?.group || { _id: "preview-node", name: "Collective_Nexus" };
  
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [memberPage, setMemberPage] = useState(1);
  const [hasMoreMembers, setHasMoreMembers] = useState(true);
  const [visibleMembers, setVisibleMembers] = useState(10);

  const dispatch = useDispatch();
  const notes = useSelector(selectNotes)

  useEffect(() => {
    if(notes.length === 0) {
      const fetchNotesForGroup = async () => {
        const res = await dispatch(getNoteById(group._id));
        await dispatch(setNotes([...res.payload.note]))
      }
      fetchNotesForGroup();
    }
  }, [notes]);

  useEffect(() => {
    async function getMembers() {
      setLoading(true);
      const res = await dispatch(
        fetchGroupMembers({ groupId: group._id, page: 1, limit: 10 }),
      );

      if (res.meta.requestStatus === "fulfilled" && res.payload?.members) {
        setMembers(res.payload.members);
        setHasMoreMembers(res.payload.members.length === 10);
        setMemberPage(1);
      } else {
        setMembers([]);
        setHasMoreMembers(false);
      }
      setLoading(false);
    }
    getMembers();
  }, [group._id, dispatch]);

  const filteredMembers = (members || []).filter((m) => {
    const fullName = `${m?.userId?.fullname?.firstname || ""} ${m?.userId?.fullname?.lastname || ""}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="relative w-full min-h-screen bg-[#030303] text-zinc-400 font-sans p-6 md:p-12 max-w-5xl mx-auto">
      
      {/* 1. Ultra-Minimal Top Header */}
      <Header members={members} notes={notes} />

      {/* 2. The Registry Ledger */}
      <main className="relative z-10">
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
             <div className="w-5 h-5 border border-white/10 border-t-indigo-500 rounded-full animate-spin" />
             <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-700">Deciphering_Directory</span>
          </div>
        ) : (
          <div className="flex flex-col">
            <AnimatePresence>
              {filteredMembers.slice(0, visibleMembers).map((member, index) => (
                <MemberEntry key={member?.userId?._id || index} member={member} index={index} />
              ))}
            </AnimatePresence>
            
            {filteredMembers.length === 0 && (
              <div className="py-32 text-center">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-800">0_Matches_Found</p>
              </div>
            )}
          </div>
        )}
        {hasMoreMembers && !loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={async () => {
                const nextPage = memberPage + 1;
                setLoading(true);
                const res = await dispatch(
                  fetchGroupMembers({ groupId: group._id, page: nextPage, limit: 10 }),
                );
                if (res.meta.requestStatus === "fulfilled" && res.payload?.members) {
                  setMembers((prev) => [...prev, ...res.payload.members]);
                  setMemberPage(nextPage);
                  setHasMoreMembers(res.payload.members.length === 10);
                } else {
                  setHasMoreMembers(false);
                }
                setLoading(false);
              }}
              className="px-6 py-3 bg-indigo-500 text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-indigo-600 transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default GroupMembers;