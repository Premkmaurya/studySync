import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import DiscoveryCard from "./components/DiscoveryCard";
import {
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

const AllGroupsContent = () => {
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [groupPage, setGroupPage] = useState(1);
  const [hasMoreGroups, setHasMoreGroups] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchGroupsPage = async () => {
        const field = selectedCategory !== "All" ? selectedCategory : undefined;
        let res;

        if (searchTerm.trim()) {
          res = await dispatch(
            searchGroups({
              query: searchTerm.trim(),
              page: 1,
              limit: 9,
              field,
            }),
          );
        } else {
          res = await dispatch(fetchGroups({ page: 1, limit: 9, field }));
        }

        const groups = res.payload?.groups || res.payload || [];
        setFilteredGroups(groups);
        setGroupPage(1);
        setHasMoreGroups(groups.length === 9);
      };

      fetchGroupsPage();
    }, searchTerm.trim() ? 300 : 0);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, dispatch]);

  const handleLoadMore = async () => {
    const nextPage = groupPage + 1;
    const field = selectedCategory !== "All" ? selectedCategory : undefined;
    let res;

    if (searchTerm.trim()) {
      res = await dispatch(
        searchGroups({
          query: searchTerm.trim(),
          page: nextPage,
          limit: 9,
          field,
        }),
      );
    } else {
      res = await dispatch(fetchGroups({ page: nextPage, limit: 9, field }));
    }

    const groups = res.payload?.groups || res.payload || [];
    if (groups.length > 0) {
      setFilteredGroups((prev) => [...prev, ...groups]);
      setGroupPage(nextPage);
      setHasMoreGroups(groups.length === 9);
    } else {
      setHasMoreGroups(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-[#E5E7EB] font-sans overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 pt-36 pb-32 px-6 max-w-7xl mx-auto">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

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
              {filteredGroups?.length > 0 ? (
                filteredGroups?.map((group, i) => (
                  <DiscoveryCard key={group._id || i} group={group} index={i} />
                ))
              ) : (
                <p className="text-zinc-500 text-center">No groups found.</p>
              )}
            </AnimatePresence>
          </div>
        )}
        {hasMoreGroups && !loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
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

export default AllGroupsContent;
