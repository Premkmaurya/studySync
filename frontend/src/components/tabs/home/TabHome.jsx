import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  joinedGroup,
  setFieldPercentages,
  setJoinedGroups,
  setSuggestedGroups,
  fetchSuggestedGroups,
} from "../../../features/groups/groupsSlice";
import {
  selectJoinedGroups,
  selectSuggestedGroups,
  selectFieldPercentages,
  selectGroupsLoading,
} from "../../../features/groups/groupsSelectors";
import { selectUser } from "../../../features/auth/authSelectors";
import { fetchNotes, getSavedNotes } from "../../../features/notes/notesSlice";
import { selectNotes, selectSavedNotes } from "../../../features/notes/notesSelectors";

import DashboardHeader from "../../dashboard/DashboardHeader";
import DashboardOverview from "../../dashboard/DashboardOverview";
import ContinueLearning from "../../dashboard/ContinueLearning";
import StudyGroupGrid from "../../dashboard/StudyGroupGrid";
import RecentKnowledge from "../../dashboard/RecentKnowledge";
import RecommendedGroups from "../../dashboard/RecommendedGroups";
import DashboardSkeleton from "../../dashboard/DashboardSkeleton";

/**
 * TabHome — Redesigned Authenticated Learning Workspace Dashboard
 * Establishes strong visual hierarchy & rhythm:
 * WELCOME → ACTIVITY STRIP → HERO WORKSPACE SESSION → COMMUNITIES → 60/40 ASYMMETRIC KNOWLEDGE & DISCOVERY
 */
const TabHome = () => {
  const dispatch = useDispatch();

  const joinedGroups = useSelector(selectJoinedGroups) || [];
  const suggestedGroups = useSelector(selectSuggestedGroups) || [];
  const fieldPercentages = useSelector(selectFieldPercentages) || {};
  const loading = useSelector(selectGroupsLoading);
  const user = useSelector(selectUser);
  const notes = useSelector(selectNotes) || [];
  const savedNotes = useSelector(selectSavedNotes) || [];

  const [joinedPage, setJoinedPage] = useState(1);
  const [suggestedPage, setSuggestedPage] = useState(1);
  const [hasMoreJoined, setHasMoreJoined] = useState(true);
  const [hasMoreSuggested, setHasMoreSuggested] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  // 1. Fetch Joined Groups
  useEffect(() => {
    const fetchJoined = async () => {
      const res = await dispatch(joinedGroup({ page: 1, limit: 6 }));
      if (res.payload && res.payload.groups) {
        dispatch(setJoinedGroups(res.payload.groups));
        setHasMoreJoined(res.payload.groups.length === 6);
        setJoinedPage(1);
      }
    };
    fetchJoined();
  }, [dispatch]);

  // 2. Fetch Suggested Recommendations & Field Percentages
  useEffect(() => {
    const fetchSuggestions = async () => {
      const res = await dispatch(fetchSuggestedGroups({ page: 1, limit: 6 }));
      if (res.payload) {
        dispatch(setSuggestedGroups(res.payload.suggestedGroups));
        dispatch(setFieldPercentages(res.payload.fieldPercentages));
        setHasMoreSuggested(res.payload.suggestedGroups?.length === 6);
        setSuggestedPage(1);
      }
      setInitialLoading(false);
    };
    fetchSuggestions();
  }, [dispatch]);

  // 3. Fetch Recent Notes for Knowledge Base
  useEffect(() => {
    dispatch(fetchNotes({ page: 1, limit: 6 }));
  }, [dispatch]);

  // 4. Fetch saved Notes
  useEffect(() => {
    dispatch(getSavedNotes({ page: 1, limit: 6 }));
  }, [dispatch]);

  const loadMoreJoinedGroups = async () => {
    const nextPage = joinedPage + 1;
    const res = await dispatch(joinedGroup({ page: nextPage, limit: 6 }));
    if (res.payload && res.payload.groups) {
      dispatch(setJoinedGroups([...joinedGroups, ...res.payload.groups]));
      setHasMoreJoined(res.payload.groups.length === 6);
      setJoinedPage(nextPage);
    }
  };

  const loadMoreSuggestedGroups = async () => {
    const nextPage = suggestedPage + 1;
    const res = await dispatch(fetchSuggestedGroups({ page: nextPage, limit: 6 }));
    if (res.payload) {
      dispatch(setSuggestedGroups([...suggestedGroups, ...res.payload.suggestedGroups]));
      dispatch(
        setFieldPercentages(res.payload.fieldPercentages || fieldPercentages)
      );
      setHasMoreSuggested(res.payload.suggestedGroups?.length === 6);
      setSuggestedPage(nextPage);
    }
  };

  const enrichedSuggestedGroups = suggestedGroups.map((group) => ({
    ...group,
    id: group._id,
  }));

  const latestGroup = joinedGroups.length > 0 ? joinedGroups[0] : null;

  return (
    <div className="mx-auto max-w-[1400px] w-full bg-[#f6f5f4] text-[#000000] mt-[5rem] sm:mt-0 min-h-screen pt-28 sm:pt-36 md:pt-40 pb-16 px-5 sm:px-8 md:px-10 lg:px-12 overflow-x-clip">
      {initialLoading && loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          {/* 1. Welcome & Primary Workspace Actions */}
          <DashboardHeader
            user={user}
            joinedCount={joinedGroups.length}
            notesCount={notes.length}
          />

          {/* 2. Compact Horizontal Activity & Metrics Strip */}
          <DashboardOverview
            joinedCount={joinedGroups.length}
            notesCount={savedNotes.length}
            topicsCount={Object.keys(fieldPercentages).length}
          />

          {/* 3. Continue Learning Hero Workspace (Dominant Focus) */}
          <ContinueLearning latestGroup={latestGroup} />

          {/* 4. My Communities (Asymmetric Group Grid) */}
          <StudyGroupGrid
            groups={joinedGroups}
            hasMore={hasMoreJoined}
            onLoadMore={loadMoreJoinedGroups}
          />

          {/* 5. 60/40 Asymmetric Bottom Section (60% Recent Knowledge / 40% Discovery) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-14">
            <div className="lg:col-span-7">
              <RecentKnowledge notes={notes} />
            </div>
            <div className="lg:col-span-5">
              <RecommendedGroups
                groups={enrichedSuggestedGroups}
                fieldPercentages={fieldPercentages}
                hasMore={hasMoreSuggested}
                onLoadMore={loadMoreSuggestedGroups}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TabHome;
