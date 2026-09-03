import React, { useEffect, useRef, useState } from "react";
import {
  useParams,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectJoinedGroups,
  selectGroups,
  selectSuggestedGroups,
} from "../../../features/groups/groupsSelectors";
import { joinGroup, setJoinedGroups } from "../../../features/groups/groupsSlice";
import api from "../../../services/api";
import { UserPlus } from "lucide-react";


const SingleGroupPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const joinedGroups = useSelector(selectJoinedGroups) || [];
  const allGroups = useSelector(selectGroups) || [];
  const suggestedGroups = useSelector(selectSuggestedGroups) || [];

  const reduxGroup =
    joinedGroups.find((g) => g._id === groupId) ||
    allGroups.find((g) => g._id === groupId) ||
    suggestedGroups.find((g) => g._id === groupId);

  const [group, setGroup] = useState(reduxGroup || null);
  const [isJoining, setIsJoining] = useState(false);

  const isJoined =
    group?.isMember === true ||
    joinedGroups.some((joinedGroup) => joinedGroup._id === groupId);
  const membershipResolved = typeof group?.isMember === "boolean" || isJoined;

  const handleJoinGroup = async () => {
    if (!groupId || isJoining || isJoined) return;

    setIsJoining(true);
    const result = await dispatch(joinGroup(groupId));

    if (result.meta.requestStatus === "fulfilled") {
      const joinedGroup = result.payload?.group || group;
      dispatch(setJoinedGroups([...joinedGroups, joinedGroup]));
      setGroup({ ...joinedGroup, isMember: true });
    }

    setIsJoining(false);
  };


  // Keep local group state in sync with Redux group updates
  useEffect(() => {
    if (reduxGroup) {
      setGroup(reduxGroup);
    }
  }, [reduxGroup]);

  const fetchedGroupIdRef = useRef(null);

  useEffect(() => {
    if (!groupId) return;
    // Only fetch from the API when we switch to a new groupId or we don't
    // have isMember resolved yet. Using a ref prevents group (an object)
    // from being a dependency, which would re-trigger on every setGroup call.
    if (
      fetchedGroupIdRef.current === groupId &&
      typeof group?.isMember === "boolean"
    ) {
      return;
    }

    let isCurrent = true;

    const fetchGroupData = async () => {
      try {
        const response = await api.get(`/groups/search/${groupId}`);

        if (isCurrent && response.data?.group) {
          fetchedGroupIdRef.current = groupId;
          setGroup({
            ...response.data.group,
            isMember: response.data.isMember === true,
          });
        }
      } catch (error) {
        console.error("Failed to fetch group:", error);
      }
    };

    fetchGroupData();

    return () => {
      isCurrent = false;
    };
  }, [groupId]);

  return (
      <main className="relative min-h-screen overflow-y-auto bg-[#f6f5f4] text-[#000000]">
        {membershipResolved && !isJoined && group && (
          <button
            type="button"
            onClick={handleJoinGroup}
            disabled={isJoining}
            className="absolute top-4 right-6 md:right-10 z-10 inline-flex items-center gap-2 rounded-[8px] bg-[#0075de] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#096fca] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <UserPlus className="h-16 w-16" />
            {isJoining ? "Joining..." : "Join group"}
          </button>
        )}
        <Outlet context={{ group, setGroup }} />
      </main>
  );
};

export default SingleGroupPage;