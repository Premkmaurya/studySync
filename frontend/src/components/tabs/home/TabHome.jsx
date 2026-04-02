import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TrendingUp, ArrowUpRight, Compass } from "lucide-react";
import {
  joinedGroup,
  setFieldPercentages,
  setJoinedGroups,
  setSuggestedGroups,
} from "../../../features/groups/groupsSlice";
import { fetchSuggestedGroups } from "../../../features/groups/groupsSlice";
import GroupCard from "./components/GroupCard";

import {
  selectJoinedGroups,
  selectSuggestedGroups,
  selectFieldPercentages,
} from "../../../features/groups/groupsSelectors";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const joinedGroups = useSelector(selectJoinedGroups);
  const suggestedGroups = useSelector(selectSuggestedGroups);
  const fieldPercentages = useSelector(selectFieldPercentages);

  useEffect(() => {
    // Fetch joined groups
    const fetchJoinedGroups = async () => {
      const res = await dispatch(joinedGroup());
      if (res.payload && res.payload.groups) {
        dispatch(setJoinedGroups(res.payload.groups));
      }
    };

    fetchJoinedGroups();
  }, [dispatch]);

  useEffect(() => {
    // Fetch suggested groups
    const fetchSuggestions = async () => {
      
    const res = await dispatch(fetchSuggestedGroups());
      if (res.payload) {
        dispatch(setSuggestedGroups(res.payload.suggestedGroups));
        dispatch(setFieldPercentages(res.payload.fieldPercentages));
      }
    };

    fetchSuggestions();
  }, [dispatch]);

  // Helper function to add UI properties to suggested groups
  const enrichedSuggestedGroups = suggestedGroups.map((group, index) => {
    const accentColors = [
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-blue-500",
      "bg-cyan-500",
    ];
    return {
      ...group,
      id: group._id,
      accent: accentColors[index % accentColors.length] || "bg-indigo-500",
    };
  });

  return (
    <div className="relative pt-26 min-h-screen w-full bg-[#000] text-[#E5E7EB] font-sans overflow-x-hidden">
      {/* 1. Background Visuals */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[90px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-fuchsia-600/5 blur-[80px] rounded-full" />
      </div>

      {/* 2. Page Header */}
      <header className="relative z-10 pt-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            Hello, <span className="text-indigo-500">Alex</span>
          </h1>
        </div>
      </header>

      {/* 3. Main Sections */}
      <main className="relative z-10 px-6 max-w-7xl mx-auto space-y-24 pb-32">
        {/* Joined Groups Section */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black tracking-tighter text-white">
                Your Collectives
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-indigo-500/50 to-transparent" />
            </div>
            <button className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
              View All <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedGroups && joinedGroups.length > 0 ? (
              joinedGroups.map((group) => (
                <GroupCard key={group._id || group.id} group={group} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-zinc-400">Join groups to see them here</p>
              </div>
            )}
          </div>
        </section>

        {/* Suggested Discovery Section */}
        <section className="relative">
          {/* Section Glow */}
          <div className="absolute inset-0 bg-indigo-500/5 blur-[70px] pointer-events-none rounded-full" />

          <div className="relative">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Compass size={20} />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tighter text-white">
                  Neural Discovery
                </h2>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                  Suggested for your profession
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrichedSuggestedGroups && enrichedSuggestedGroups.length > 0 ? (
                enrichedSuggestedGroups.map((group) => {
                  const matchPercentage = fieldPercentages[group.field] || 0;
                  return (
                    <GroupCard
                      key={group._id}
                      group={{ ...group, match: matchPercentage }}
                      isSuggested
                    />
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-zinc-400">No suggested groups available</p>
                </div>
              )}

              {/* Promotion/Stats Bento Card */}
              <div className="p-8 bg-gradient-to-br from-indigo-600 to-fuchsia-600 rounded-[32px] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
                <div className="relative z-10 flex flex-col h-full">
                  <TrendingUp size={32} className="text-white mb-6" />
                  <h3 className="text-2xl font-black tracking-tighter text-white mb-2 leading-tight">
                    Professional Velocity
                  </h3>
                  <div className="text-xs text-white/70 font-medium mb-8">
                    {Object.keys(fieldPercentages).length > 0 ? (
                      <div>
                        <p className="mb-2">Your interests:</p>
                        <div className="space-y-1">
                          {Object.entries(fieldPercentages)
                            .sort(([, a], [, b]) => b - a)
                            .map(([field, percentage]) => (
                              <div key={field} className="flex justify-between">
                                <span>{field}:</span>
                                <span className="text-indigo-300 font-bold">
                                  {percentage}%
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <p>Join groups to get personalized suggestions</p>
                    )}
                  </div>
                  <button
                    onClick={() => navigate("/find-groups")}
                    className="mt-auto w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black hover:text-white transition-all"
                  >
                    Explore All Groups
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
