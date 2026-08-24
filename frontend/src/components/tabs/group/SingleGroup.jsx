import React, { Suspense, useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  Outlet,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectJoinedGroups,
  selectGroups,
  selectSuggestedGroups,
} from "../../../features/groups/groupsSelectors";
import { joinGroup, setJoinedGroups } from "../../../features/groups/groupsSlice";
import api from "../../../services/api";
import { ArrowLeft, ChartNoAxesColumnIncreasing, UserPlus, X } from "lucide-react";

import PageLoader from "../../common/PageLoader";
import Sidebar from "./Sidebar";

const SingleGroupPage = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const joinedGroups = useSelector(selectJoinedGroups) || [];
  const allGroups = useSelector(selectGroups) || [];
  const suggestedGroups = useSelector(selectSuggestedGroups) || [];

  const reduxGroup =
    joinedGroups.find((g) => g._id === groupId) ||
    allGroups.find((g) => g._id === groupId) ||
    suggestedGroups.find((g) => g._id === groupId);

  const [group, setGroup] = useState(location.state?.groupData || reduxGroup || null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const isJoined = joinedGroups.some((joinedGroup) => joinedGroup._id === groupId);

  const handleJoinGroup = async () => {
    if (!groupId || isJoining || isJoined) return;

    setIsJoining(true);
    const result = await dispatch(joinGroup(groupId));

    if (result.meta.requestStatus === "fulfilled") {
      const joinedGroup = result.payload?.group || group;
      dispatch(setJoinedGroups([...joinedGroups, joinedGroup]));
      setGroup(joinedGroup);
    }

    setIsJoining(false);
  };


  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Keep local group state in sync with Redux group updates
  useEffect(() => {
    if (reduxGroup) {
      setGroup(reduxGroup);
    }
  }, [reduxGroup]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!groupId) return;

    const fetchGroupData = async () => {
      try {
        const response = await api.get(`/groups/search/${groupId}`);

        if (response.data?.group) {
          setGroup(response.data.group);
        }
      } catch (error) {
        console.error("Failed to fetch group:", error);
      }
    };

    // Only fetch if we don't already have the correct group
    if (!group || group._id !== groupId) {
      fetchGroupData();
    }
  }, [groupId]);

  return (
    <div className="min-h-screen w-full bg-[#f6f5f4] text-[#000000] flex flex-col md:flex-row antialiased">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-3 bg-[#f6f5f4] border-b border-black/[0.08] sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Link to="/dashboard/home">
            <ArrowLeft className="w-5 h-5 text-[#757575]" />
          </Link>
          <span className="font-bold text-[16px] text-[#000000] truncate max-w-[200px]">
            {group?.name || "Workspace"}
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-[6px] text-[#111111] hover:bg-black/5"
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <ChartNoAxesColumnIncreasing className="w-5 h-5 -rotate-90" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      <div className={`fixed md:static inset-y-0 left-0 z-50 transition-transform duration-200 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <Sidebar group={group} groupId={groupId} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Workspace Stage */}
      <main className="relative flex-1 min-h-screen overflow-y-auto">
        {!isJoined && group && (
          <button
            type="button"
            onClick={handleJoinGroup}
            disabled={isJoining}
            className="absolute top-4 right-6 md:right-10 z-10 inline-flex items-center gap-2 rounded-[8px] bg-[#0075de] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#096fca] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <UserPlus className="h-4 w-4" />
            {isJoining ? "Joining..." : "Join group"}
          </button>
        )}
        <Outlet context={{ group, setGroup }} />
      </main>
    </div>
  );
};

export default SingleGroupPage;