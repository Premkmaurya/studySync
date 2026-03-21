import { useState } from "react"; // ✅ add this
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Search,
  X,
  Users,
  Code,
  Palette,
  Briefcase,
} from "lucide-react";

const Share = ({ isShareOpen, setIsShareOpen }) => {
  const [searchQuery, setSearchQuery] = useState(""); // ✅ define state
  const availableGroups = [
    {
      id: 1,
      name: "Frontend Mavericks",
      profession: "Engineering",
      members: 12,
      icon: Code,
      color: "text-blue-400",
    },
    {
      id: 2,
      name: "Design Systems Alpha",
      profession: "Design",
      members: 8,
      icon: Palette,
      color: "text-fuchsia-400",
    },
    {
      id: 3,
      name: "Product Strategy",
      profession: "Management",
      members: 15,
      icon: Briefcase,
      color: "text-amber-400",
    },
    {
      id: 4,
      name: "Web3 Pioneers",
      profession: "Engineering",
      members: 24,
      icon: Code,
      color: "text-emerald-400",
    },
    {
      id: 5,
      name: "UI/UX Research",
      profession: "Design",
      members: 6,
      icon: Palette,
      color: "text-cyan-400",
    },
  ];

  const filteredGroups = availableGroups.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {isShareOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsShareOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-lg bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,1)] flex flex-col max-h-[80vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-8 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black tracking-tighter text-white">
                  Share Note
                </h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">
                  Select Professional Groups
                </p>
              </div>
              <button
                onClick={() => setIsShareOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-8 mb-4">
              <div className="relative group">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors"
                />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a group..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none focus:border-indigo-500/40 transition-all placeholder:text-zinc-700 text-white"
                />
              </div>
            </div>

            {/* Sequential Group List */}
            <div className="flex-1 overflow-y-auto px-8 pb-10 space-y-3 custom-scrollbar">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 bg-zinc-800 rounded-xl ${group.color} group-hover:bg-white group-hover:text-black transition-all`}
                      >
                        <group.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-white">
                          {group.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                            {group.profession}
                          </span>
                          <span className="text-[9px] text-zinc-700">•</span>
                          <span className="text-[9px] font-bold text-zinc-500 flex items-center gap-1">
                            <Users size={10} /> {group.members} Members
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* REDESIGNED SHARE BUTTON ON HOVER */}
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all opacity-0 group-hover:opacity-100 shadow-lg shadow-indigo-600/20 active:scale-90 flex items-center gap-2">
                      <Share2 size={12} />
                      Share
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="py-10 text-center">
                  <p className="text-sm text-zinc-600 font-bold italic">
                    No groups found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Share;
