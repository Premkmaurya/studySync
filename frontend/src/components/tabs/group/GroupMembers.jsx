import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  MoreVertical,
  Users,
} from "lucide-react";
import axios from "axios";

// --- SUB-COMPONENTS ---

const MemberRow = ({ member, index }) => {
  const isAdmin = member.role === "Admin";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-default"
    >
      <div className="flex items-center gap-5">
        {/* Avatar Slot */}
        <div className="relative">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs border transition-all ${
              isAdmin
                ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                : "bg-zinc-900 border-white/5 text-zinc-500"
            }`}
          >
            {member.userId.fullname.firstname[0]}
            {member.userId.fullname.lastname?.[0] || ""}
          </div>
          {isAdmin && (
            <div className="absolute -top-1 -right-1 p-1 bg-black rounded-full border border-white/10">
              <ShieldCheck size={10} className="text-emerald-500" />
            </div>
          )}
        </div>

        {/* Identity Metadata */}
        <div>
          <h4 className="text-sm font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors uppercase">
            {member.userId.fullname.firstname} {member.userId.fullname.lastname}
          </h4>
          <div className="flex items-center gap-3 mt-1">
            <span
              className={`text-[8px] font-black uppercase tracking-[0.3em] px-2 py-0.5 rounded-md border ${
                isAdmin
                  ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                  : "text-zinc-600 border-white/5"
              }`}
            >
              {isAdmin ? "PROTO_ADMIN" : "NODE_MEMBER"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
            Uplink_Active
          </span>
          <span className="text-[10px] font-mono text-zinc-500">
            ID: {member.userId._id.substring(0, 8)}...
          </span>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-xl text-zinc-700 hover:text-white transition-all">
          <MoreVertical size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default function GroupMembers() {
  const { group } = useOutletContext();
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMembers() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/groups/members",
          {
            params: { groupId: group._id },
            withCredentials: true,
          },
        );
        // Ensure we don't duplicate on strict mode
        setMembers(response.data.members || []);
      } catch (err) {
        // Fallback mock for UI demonstration
        setMembers([
          {
            role: "Admin",
            userId: {
              _id: "u1",
              fullname: { firstname: "Alex", lastname: "Rivera" },
            },
          },
          {
            role: "Member",
            userId: {
              _id: "u2",
              fullname: { firstname: "Jordan", lastname: "Lee" },
            },
          },
          {
            role: "Member",
            userId: {
              _id: "u3",
              fullname: { firstname: "Sam", lastname: "Chen" },
            },
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    getMembers();
  }, [group._id]);

  const filteredMembers = members.filter((m) =>
    `${m.userId.fullname.firstname} ${m.userId.fullname.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full h-full p-4 lg:p-8 max-w-4xl mx-auto flex flex-col">
      {/* 1. Header & Filtering */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase leading-none">
              The Collective
            </h1>
          </div>
        </div>

        {/* Global Hub Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Synced", val: members.length, icon: Users },
            {
              role: "Notes",
              val: members.filter((m) => m.role === "Admin").length,
              icon: ShieldCheck,
            },
            { label: "Status", val: "Optimal", icon: Zap },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 bg-white/[0.01] border border-white/5 rounded-3xl"
            >
              <div className="flex items-center gap-3 text-zinc-600 mb-2">
                <stat.icon size={12} />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  {stat.label || stat.role}
                </span>
              </div>
              <div className="text-xl font-black text-white">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. The Member Stream */}
      {loading ? (
        <div className="py-20 flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/5 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-800">
            Retrieving Collective Data...
          </span>
        </div>
      ) : (
        <div className="space-y-3 pb-4 flex-1">
          <AnimatePresence>
            {filteredMembers.map((member, index) => (
              <MemberRow
                key={member.userId._id}
                member={member}
                index={index}
              />
            ))}
          </AnimatePresence>

          {filteredMembers.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700 italic">
                No node matches found
              </p>
            </div>
          )}
        </div>
      )}

      {/* Subtle Background Glow */}
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
