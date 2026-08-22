import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Compass, Search, Plus, RotateCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/tabs/group/all_group/Header";
import StickySearchFilter from "../../components/tabs/group/all_group/StickySearchFilter";
import FeaturedGroupCard from "../../components/tabs/group/all_group/FeaturedGroupCard";
import DiscoveryCard from "../../components/tabs/group/all_group/DiscoveryCard";
import CreateGroupCTA from "../../components/tabs/group/all_group/CreateGroupCTA";

import {
  selectGroupsLoading,
  selectJoinedGroups,
} from "../../features/groups/groupsSelectors";
import {
  fetchGroups,
  searchGroups,
  setJoinedGroups,
  joinedGroup,
} from "../../features/groups/groupsSlice";
import { DURATION, EASING } from "../../components/motion/motionTokens";

/**
 * FindGroup — Redesigned Group Directory Discovery Platform
 * Interactive group discovery experience featuring editorial hero, sticky search/filter control,
 * featured community surface, responsive 3-column group directory, clear search/no-data empty states,
 * and create group invitation CTA.
 */
const FindGroup = () => {
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [groupPage, setGroupPage] = useState(1);
  const [hasMoreGroups, setHasMoreGroups] = useState(true);

  const loading = useSelector(selectGroupsLoading);
  const joinedGroups = useSelector(selectJoinedGroups) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // 1. Fetch joined groups once
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

  // 2. Fetch directory groups on search or category change
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
            })
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
        })
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

  const isSearchOrFilterActive = Boolean(searchTerm.trim() || selectedCategory !== "All");
  const featuredGroup = !isSearchOrFilterActive && filteredGroups.length > 0 ? filteredGroups[0] : null;
  const directoryGroups = featuredGroup ? filteredGroups.slice(1) : filteredGroups;

  return (
    <div className="mx-auto max-w-[1400px] w-full bg-[#f6f5f4] text-[#000000] mt-[5rem] sm:mt-0 min-h-screen pt-28 sm:pt-36 md:pt-40 pb-16 px-5 sm:px-8 md:px-10 lg:px-12 overflow-x-clip">
      
      {/* 02 — Directory Hero */}
      <Header />

      {/* 03 — Sticky Search + Category Filter Control */}
      <StickySearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* 04 — Featured Community Surface (When default directory view) */}
      {featuredGroup && (
        <FeaturedGroupCard group={featuredGroup} />
      )}

      {/* 05 — Group Directory Section Header & Result Count */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase tracking-wider block">
            DIRECTORY LISTINGS
          </span>
          <h2 className="text-[22px] sm:text-[26px] font-bold text-[#000000] tracking-[-0.6px]">
            Explore communities
          </h2>
          <p className="text-[13px] text-[#615d59]">
            Find a group that matches what you're learning.
          </p>
        </div>
        {filteredGroups.length > 0 && (
          <span className="px-3 py-1 rounded-full bg-white border border-black/[0.08] text-[12px] font-mono text-[#757575] font-medium shadow-2xs">
            {filteredGroups.length} community{filteredGroups.length !== 1 ? "ies" : ""}
          </span>
        )}
      </div>

      {/* 06 — Directory Grid / Skeletons / Empty States */}
      {loading && filteredGroups.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-white rounded-[18px] border border-black/[0.08] p-6 space-y-3">
              <div className="w-24 h-4 bg-black/10 rounded-full" />
              <div className="w-40 h-6 bg-black/10 rounded" />
              <div className="w-full h-8 bg-black/10 rounded" />
            </div>
          ))}
        </div>
      ) : filteredGroups.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {directoryGroups.map((group, index) => (
              <motion.div
                key={group._id || index}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.COMPONENT,
                  delay: Math.min(index * 0.05, 0.3),
                  ease: EASING.SMOOTH,
                }}
              >
                <DiscoveryCard group={group} />
              </motion.div>
            ))}
          </div>

          {hasMoreGroups && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                data-cursor-ignore="true"
                className="px-6 py-2.5 bg-white hover:bg-black/5 text-[#111111] text-[13px] font-semibold rounded-[8px] border border-black/15 transition-colors cursor-pointer shadow-2xs"
              >
                Load more study groups
              </button>
            </div>
          )}
        </>
      ) : isSearchOrFilterActive ? (
        /* Empty Search / Filter State */
        <div className="bg-white rounded-[20px] border border-black/[0.08] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-2xs my-4">
          <div className="w-12 h-12 rounded-full bg-[#ffb110]/15 text-[#b18164] flex items-center justify-center">
            <Search className="w-16 h-16" />
          </div>
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111]">
            No groups match your search.
          </h3>
          <p className="text-[13px] text-[#615d59] max-w-md leading-relaxed font-sans">
            Try adjusting your search criteria, switching subjects, or clearing active category filters.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              data-cursor-ignore="true"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f6f5f4] hover:bg-black/5 text-[#111111] text-[13px] font-semibold rounded-[8px] border border-black/[0.08] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-16 h-16 text-[#757575]" />
              <span>Clear filters</span>
            </button>
            <Link
              to="/create-group"
              data-cursor-ignore="true"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-colors shadow-2xs"
            >
              <Plus className="w-16 h-16" />
              <span>Create group</span>
            </Link>
          </div>
        </div>
      ) : (
        /* No Groups At All Empty State */
        <div className="bg-white rounded-[20px] border border-black/[0.08] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-2xs my-4">
          <div className="w-12 h-12 rounded-full bg-[#0075de]/10 text-[#0075de] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111]">
            Your next study group could start here.
          </h3>
          <p className="text-[13px] text-[#615d59] max-w-md leading-relaxed font-sans">
            Create a community around something you're learning and invite other students to collaborate.
          </p>
          <div className="pt-2">
            <Link
              to="/create-group"
              data-cursor-ignore="true"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create group →</span>
            </Link>
          </div>
        </div>
      )}

      {/* 07 — Create Your Own Group Invitation CTA */}
      <CreateGroupCTA />

    </div>
  );
};

export default FindGroup;
