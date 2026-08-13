import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Compass, BookOpen, Users, Plus, FileText, ArrowRight } from "lucide-react";
import {
  joinedGroup,
  setFieldPercentages,
  setJoinedGroups,
  setSuggestedGroups,
  fetchSuggestedGroups,
} from "../../../features/groups/groupsSlice";
import GroupCard from "./components/GroupCard";
import {
  selectJoinedGroups,
  selectSuggestedGroups,
  selectFieldPercentages,
  selectGroupsLoading,
} from "../../../features/groups/groupsSelectors";
import { selectUser } from "../../../features/auth/authSelectors";
import Button from "../../design-system/Button";
import Card from "../../design-system/Card";
import Pill from "../../design-system/Pill";
import { LoadingState, EmptyState } from "../../design-system/States";
import { PageHeader } from "../../design-system/SectionHeader";

const TabHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const joinedGroups = useSelector(selectJoinedGroups);
  const suggestedGroups = useSelector(selectSuggestedGroups);
  const fieldPercentages = useSelector(selectFieldPercentages);
  const loading = useSelector(selectGroupsLoading);
  const user = useSelector(selectUser);

  const [joinedPage, setJoinedPage] = useState(1);
  const [suggestedPage, setSuggestedPage] = useState(1);
  const [hasMoreJoined, setHasMoreJoined] = useState(true);
  const [hasMoreSuggested, setHasMoreSuggested] = useState(true);

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

  useEffect(() => {
    const fetchSuggestions = async () => {
      const res = await dispatch(fetchSuggestedGroups({ page: 1, limit: 6 }));
      if (res.payload) {
        dispatch(setSuggestedGroups(res.payload.suggestedGroups));
        dispatch(setFieldPercentages(res.payload.fieldPercentages));
        setHasMoreSuggested(res.payload.suggestedGroups?.length === 6);
        setSuggestedPage(1);
      }
    };
    fetchSuggestions();
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

  const firstName =
    user?.fullname?.firstname || user?.username || "Student";

  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen py-10 px-6 md:px-12 max-w-[1440px] mx-auto">
      {/* 1. Header & Greeting */}
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="Continue learning with your communities and shared knowledge notes."
        badge={<Pill variant="sky" size="sm">Dashboard</Pill>}
        actions={
          <div className="flex gap-3">
            <Link to="/create-group">
              <Button variant="primary" icon={Plus}>
                Create Group
              </Button>
            </Link>
            <Link to="/find-groups">
              <Button variant="ghost" icon={Compass}>
                Explore Groups
              </Button>
            </Link>
          </div>
        }
      />

      {/* 2. Stats Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
        <Card variant="white" padding="p-5" className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-[8px] bg-[#e6f3fe] text-[#0075de] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[22px] font-bold text-[#000000]">
              {joinedGroups?.length || 0}
            </div>
            <div className="text-[13px] text-[#615d59]">Joined Groups</div>
          </div>
        </Card>

        <Card variant="white" padding="p-5" className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-[8px] bg-[#fff4cc] text-[#e89d01] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[22px] font-bold text-[#000000]">
              {suggestedGroups?.length || 0}
            </div>
            <div className="text-[13px] text-[#615d59]">Recommended Groups</div>
          </div>
        </Card>

        <Card variant="white" padding="p-5" className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-[8px] bg-[#f64932]/10 text-[#f64932] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[22px] font-bold text-[#000000]">
              {Object.keys(fieldPercentages || {}).length}
            </div>
            <div className="text-[13px] text-[#615d59]">Active Topics</div>
          </div>
        </Card>
      </div>

      {/* 3. Joined Groups Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[24px] font-bold text-[#000000] tracking-[-0.5px]">
              Your Study Groups
            </h2>
            <p className="text-[14px] text-[#615d59]">
              Groups you are actively participating in
            </p>
          </div>
          {joinedGroups && joinedGroups.length > 0 && (
            <Link to="/find-groups" className="text-[14px] font-semibold text-[#0075de] hover:underline flex items-center gap-1">
              Find more groups <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {loading && (!joinedGroups || joinedGroups.length === 0) ? (
          <LoadingState message="Loading your study groups..." />
        ) : joinedGroups && joinedGroups.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedGroups.map((group) => (
                <GroupCard key={group._id || group.id} group={group} />
              ))}
            </div>
            {hasMoreJoined && (
              <div className="flex justify-center mt-8">
                <Button variant="ghost" onClick={loadMoreJoinedGroups}>
                  Load more groups
                </Button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={Users}
            title="No study groups joined yet"
            description="Explore open study groups in your field or launch your own group to start collaborating."
            actionLabel="Explore groups"
            onAction={() => navigate("/find-groups")}
          />
        )}
      </section>

      {/* 4. Suggested Groups Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[24px] font-bold text-[#000000] tracking-[-0.5px]">
              Recommended for You
            </h2>
            <p className="text-[14px] text-[#615d59]">
              Study groups matching your academic interests
            </p>
          </div>
        </div>

        {loading && (!suggestedGroups || suggestedGroups.length === 0) ? (
          <LoadingState message="Finding recommendations..." />
        ) : enrichedSuggestedGroups && enrichedSuggestedGroups.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrichedSuggestedGroups.map((group) => {
                const matchPercentage = fieldPercentages[group.field] || 0;
                return (
                  <GroupCard
                    key={group._id || group.id}
                    group={{ ...group, match: matchPercentage }}
                    isSuggested
                  />
                );
              })}
            </div>
            {hasMoreSuggested && (
              <div className="flex justify-center mt-8">
                <Button variant="ghost" onClick={loadMoreSuggestedGroups}>
                  Load more recommendations
                </Button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={Compass}
            title="No recommendations found"
            description="Explore the directory to discover groups across all academic fields."
            actionLabel="Browse directory"
            onAction={() => navigate("/find-groups")}
          />
        )}
      </section>
    </div>
  );
};

export default TabHome;
