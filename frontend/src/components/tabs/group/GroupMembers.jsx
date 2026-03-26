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

import { useDispatch } from "react-redux";
import { fetchGroupMembers } from "../../../features/groups/groupsSlice";

// --- SUB-COMPONENTS ---

const MemberEntry = ({ member, index }) => {
  const isAdmin = member.role === "Admin";
  const firstName = String(member?.userId?.fullname?.firstname || "Node");
  const lastName = String(member?.userId?.fullname?.lastname || "");
  const userId = String(member?.userId?._id || index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 24 }}
      className="group flex items-center justify-between py-4 border-b border-white/5 hover:bg-white/[0.01] px-4 transition-all duration-300"
    >
      <div className="flex items-center gap-6">
        {/* Simple Avatar Slot */}
        <div className="relative">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[10px] border transition-all ${
            isAdmin 
            ? "bg-indigo-500/5 border-indigo-500/30 text-indigo-400" 
            : "bg-zinc-950 border-white/10 text-zinc-600"
          }`}>
            {firstName[0]}{lastName[0] || ""}
          </div>
          {isAdmin && (
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
            <span className="text-sm font-bold text-zinc-200 uppercase tracking-tight group-hover:text-white transition-colors">
              {firstName} {lastName}
            </span>
            {isAdmin && (
              <span className="text-[8px] font-black text-indigo-400 border border-indigo-400/30 px-1.5 py-0.5 rounded uppercase tracking-widest">
                Admin
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono text-zinc-600 mt-0.5 uppercase tracking-widest">
            NODE_ID: {userId.substring(0, 8)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8">
         {isAdmin && <button className="p-2 text-zinc-700 hover:text-white transition-colors">
            <MoreHorizontal size={18} />
         </button>}
      </div>
    </motion.div>
  );
};

const GroupMembers = () => {
  const context = useOutletContext();
  const group = context?.group || { _id: "preview-node", name: "Collective_Nexus" };
  
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();


  useEffect(() => {
    async function getMembers() {
      const res = await dispatch(fetchGroupMembers(group._id));
      console.log(res);
      
      if (res.meta.requestStatus === "fulfilled" && res.payload?.members) {
        setMembers(res.payload.members);
      } else {
        setMembers([]);
      }
      setLoading(false);
    }
    getMembers();
  }, [group._id]);

  const filteredMembers = (members || []).filter(m => {
    const fullName = `${m?.userId?.fullname?.firstname || ""} ${m?.userId?.fullname?.lastname || ""}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="relative w-full min-h-screen bg-[#030303] text-zinc-400 font-sans p-6 md:p-12 max-w-5xl mx-auto">
      
      {/* 1. Ultra-Minimal Top Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
        <div>
           <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Collective</h1>
        </div>

        <div className="flex items-center gap-8">
           {/* Tiny Stats Horizon */}
           <div className="hidden lg:flex items-center gap-6 border-r border-white/5 pr-8">
              <div className="text-center">
                 <div className="text-xs font-black text-white">{members.length}</div>
                 <div className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">Total</div>
              </div>
              <div className="text-center">
                 <div className="text-xs font-black text-indigo-400">{members.filter(m => m.role === "Admin").length}</div>
                 <div className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">Notes</div>
              </div>
           </div>
        </div>
      </header>

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
              {filteredMembers.map((member, index) => (
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
      </main>
    </div>
  );
};

// --- PREVIEW WRAPPER ---
export default GroupMembers;