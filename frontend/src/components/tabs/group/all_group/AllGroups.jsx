import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  LayoutGrid,
  Filter,
  Code,
  Cpu,
  Shield,
  Palette,
  Globe,
  Sparkles,
} from "lucide-react";
import DiscoveryCard from "./components/DiscoveryCard";
import {
  selectGroups,
  selectGroupsLoading,
  selectJoinedGroups,
} from "../../../../features/groups/groupsSelectors";
import {
  fetchGroups,
  searchGroups,
  setJoinedGroups,
  joinedGroup,
} from "../../../../features/groups/groupsSlice";
import Header from "./components/Header";

// --- CATEGORY CONFIGURATION ---



const AllGroupsContent = () => {
  const [filteredGroups, setFilteredGroups] = useState([]);

  const loading = useSelector(selectGroupsLoading);
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

  // Debounced search effect - only on searchTerm changes


  return (
    <div className="relative min-h-screen w-full bg-[#000] text-[#E5E7EB] font-sans overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 pt-36 pb-32 px-6 max-w-7xl mx-auto">
        <Header setFilteredGroups={setFilteredGroups} />

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
                <p className="text-zinc-500 text-center">No groups found.</p>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllGroupsContent;
