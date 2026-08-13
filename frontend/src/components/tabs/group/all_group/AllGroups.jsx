import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiscoveryCard from "./components/DiscoveryCard";
import Header from "./components/Header";
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
import Button from "../../../design-system/Button";
import { LoadingState, EmptyState } from "../../../design-system/States";
import { Users } from "lucide-react";

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

  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen py-10 px-6 md:px-12 max-w-[1440px] mx-auto">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading && filteredGroups.length === 0 ? (
        <LoadingState message="Loading study groups..." />
      ) : filteredGroups && filteredGroups.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group, i) => (
              <DiscoveryCard key={group._id || i} group={group} />
            ))}
          </div>

          {hasMoreGroups && (
            <div className="flex justify-center mt-10">
              <Button variant="ghost" onClick={handleLoadMore}>
                Load more study groups
              </Button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={Users}
          title="No study groups found"
          description="Try adjusting your search criteria or filter category to discover study groups."
          actionLabel="Clear filters"
          onAction={() => {
            setSearchTerm("");
            setSelectedCategory("All");
          }}
        />
      )}
    </div>
  );
};

export default AllGroupsContent;
