import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Users,
  ChevronLeft,
  Compass,
  LayoutGrid,
  Zap,
  ArrowUpRight,
  Filter,
  Code,
  Cpu,
  Shield,
  Palette,
  Globe,
  Sparkles,
} from "lucide-react";
import {
  selectGroups,
  selectGroupsLoading,
  selectJoinedGroups,
} from "../../../features/groups/groupsSelectors";
import {
  fetchGroups,
  searchGroups,
  joinGroup,
  setJoinedGroups,
  joinedGroup,
} from "../../../features/groups/groupsSlice";

// --- CATEGORY CONFIGURATION ---
const CATEGORIES = [
  { id: "All", label: "All Hubs", icon: LayoutGrid, color: "text-white" },
  {
    id: "web-dev",
    label: "Web Engineering",
    icon: Code,
    color: "text-cyan-400",
  },
  { id: "dsa", label: "Algorithms", icon: Cpu, color: "text-amber-400" },
  {
    id: "ai-ml",
    label: "Neural Networks",
    icon: Sparkles,
    color: "text-indigo-400",
  },
  {
    id: "cybersecurity",
    label: "Security",
    icon: Shield,
    color: "text-emerald-400",
  },
  { id: "design", label: "Visual Systems", icon: Palette, color: "text-fuchsia-400" },
  { id: "bio", label: "Bio-Tech", icon: Globe, color: "text-emerald-300" },
  { id: "other", label: "Others", icon: Globe, color: "text-zinc-400" },
];

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
      className="group relative bg-zinc-900/30 border border-white/5 rounded-[40px] p-8 shadow-2xl transition-all duration-300 overflow-hidden"
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
        <h4 className="text-2xl font-black tracking-tighter text-white group-hover:text-indigo-400 transition-colors leading-none">
          {group.name}
        </h4>
        <p className="text-xs text-zinc-500 font-medium line-clamp-2 leading-relaxed">
          {group.description ||
            "No mission statement provided for this collective hub."}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={()=>{
            if(joinedGroups.some((g) => g._id === group._id)){
              navigate(`/group/${group._id}`);
            } else {
              handleJoinGroup();
            }
          }}
          className="flex-1 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-indigo-50 active:scale-95 shadow-xl shadow-white/5"
          style={{ willChange: "transform" }}
        >
          {joinedGroups.some((g) => g._id === group._id) ? "Enter Hub" : "Join Hub"}
        </button>
        <button className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-zinc-500 hover:text-white transition-all">
          <ArrowUpRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

const AllGroupsContent = () => {
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const loading = useSelector(selectGroupsLoading);
  const groups = useSelector(selectGroups);
  const joinedGroups = useSelector(selectJoinedGroups);

  const dispatch = useDispatch();

  useEffect(() => {
    if (joinedGroups.length === 0) {
      const fetchJoined = async () => {
        const res = await dispatch(joinedGroup());
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(setJoinedGroups(res.payload.groups || []));
        }
      };
      fetchJoined();
    }
  }, [dispatch, joinedGroups.length]);

  useEffect(() => {
    const fetchAndSet = async () => {
      if (searchTerm.trim()) {
        const res = await dispatch(searchGroups(searchTerm.trim()));
        const searchResults = res.payload?.groups || res.payload || [];
        let filtered = selectedCategory !== "All" ? searchResults.filter((g) => g.field === selectedCategory) : searchResults;
        setFilteredGroups(filtered);
      } else {
        const res = await dispatch(fetchGroups());
        const allGroups = res.payload?.groups || res.payload || [];
        let filtered = selectedCategory !== "All" ? allGroups.filter((g) => g.field === selectedCategory) : allGroups;
        setFilteredGroups(filtered);
      }
    };
    const timer = setTimeout(fetchAndSet, searchTerm.trim() ? 300 : 0);
    return () => clearTimeout(timer);
  }, [dispatch, searchTerm, selectedCategory]);

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-[#E5E7EB] font-sans overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 pt-36 pb-32 px-6 max-w-7xl mx-auto">
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6">
                Find your <br />
                <span className="text-indigo-500">Collective.</span>
              </h1>
              <p className="text-xl text-zinc-500 font-medium leading-relaxed max-w-lg">
                Connect with high-performance professional groups across
                engineering, design, and research domains.
              </p>
            </div>

            <div className="relative w-full lg:w-[400px] group">
              <div className="relative bg-transparent border-b border-white/10 py-2 pl-14 pr-8">
                <Search
                  size={24}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full bg-transparent text-lg font-bold outline-none text-white placeholder:text-zinc-800"
                />
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-3 overflow-x-auto pb-6 custom-scrollbar no-scrollbar"
            style={{
              willChange: "scroll-position",
              WebkitTransform: "translate3d(0,0,0)",
            }}
          >
            <div className="p-4 bg-zinc-900 border border-white/10 rounded-2xl text-zinc-600 shrink-0">
              <Filter size={18} />
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-3 px-5 py-2 rounded-2xl text-[0.5rem] font-black uppercase tracking-widest transition-all whitespace-nowrap flex-shrink-0 border-2 ${
                  selectedCategory === cat.id
                    ? "bg-white text-black border-white"
                    : "bg-zinc-900/50 text-zinc-500 border-zinc-700 hover:border-white/20 hover:text-white"
                }`}
                style={{ willChange: "background-color, border-color" }}
              >
                <cat.icon size={16} className={cat.color} />
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-white/5 border-t-indigo-500 rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
              Retrieving Hubs...
            </span>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
            style={{ WebkitTransform: "translate3d(0,0,0)" }}
          >
            <AnimatePresence>
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group, i) => (
                  <DiscoveryCard key={group._id || i} group={group} index={i} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-32 text-center"
                >
                  <div className="p-8 bg-white/5 border border-white/5 rounded-[40px] inline-block">
                    <Compass size={40} className="text-zinc-800 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-zinc-600">
                      No collectives found in this domain.
                    </h3>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                      }}
                      className="mt-4 text-indigo-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllGroupsContent;
