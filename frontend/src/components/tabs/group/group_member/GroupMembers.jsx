import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGroupMembers } from "../../../../features/groups/groupsSlice";
import MemberEntry from "./components/MemberEntry";
import SearchInput from "../../../design-system/Input";
import Button from "../../../design-system/Button";
import Card from "../../../design-system/Card";
import Pill from "../../../design-system/Pill";
import { PageHeader } from "../../../design-system/SectionHeader";
import { LoadingState, EmptyState } from "../../../design-system/States";
import { Users } from "lucide-react";

const GroupMembers = () => {
  const context = useOutletContext();
  const group = context?.group || { _id: "group-id", name: "Study Group" };

  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [memberPage, setMemberPage] = useState(1);
  const [hasMoreMembers, setHasMoreMembers] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getMembers() {
      setLoading(true);
      const res = await dispatch(
        fetchGroupMembers({ groupId: group._id, page: 1, limit: 10 })
      );
      if (res.meta.requestStatus === "fulfilled" && res.payload?.members) {
        setMembers(res.payload.members);
        setHasMoreMembers(res.payload.members.length === 10);
        setMemberPage(1);
      } else {
        setMembers([]);
        setHasMoreMembers(false);
      }
      setLoading(false);
    }
    getMembers();
  }, [group._id, dispatch]);

  const onRemoveMember = (userId) => {
    setMembers((prev) =>
      prev.filter((m) => String(m?.userId?._id) !== String(userId))
    );
  };

  const filteredMembers = (members || []).filter((m) => {
    const fullName = `${m?.userId?.fullname?.firstname || ""} ${
      m?.userId?.fullname?.lastname || ""
    }`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <PageHeader
        title={group?.name ? `${group.name} Members` : "Group Members"}
        description="People participating in this study group workspace."
        badge={<Pill variant="sky" size="sm">Member Roster</Pill>}
      />

      {/* Controls */}
      <div className="mt-8 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="w-full md:w-80">
          <SearchInput
            placeholder="Search members by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
          />
        </div>
        <div className="text-[13px] text-[#757575]">
          Showing {filteredMembers.length} member{filteredMembers.length === 1 ? "" : "s"}
        </div>
      </div>

      {/* Directory List */}
      <Card variant="white" className="p-2 sm:p-4">
        {loading && members.length === 0 ? (
          <LoadingState message="Loading group directory..." />
        ) : filteredMembers.length > 0 ? (
          <div className="flex flex-col">
            {filteredMembers.map((member, index) => (
              <MemberEntry
                key={member?.userId?._id || index}
                member={member}
                onRemove={onRemoveMember}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            title="No members found"
            description="No group members match your search criteria."
          />
        )}
      </Card>

      {hasMoreMembers && !loading && (
        <div className="flex justify-center mt-6">
          <Button
            variant="ghost"
            onClick={async () => {
              const nextPage = memberPage + 1;
              setLoading(true);
              const res = await dispatch(
                fetchGroupMembers({
                  groupId: group._id,
                  page: nextPage,
                  limit: 10,
                })
              );
              if (res.meta.requestStatus === "fulfilled" && res.payload?.members) {
                setMembers((prev) => [...prev, ...res.payload.members]);
                setMemberPage(nextPage);
                setHasMoreMembers(res.payload.members.length === 10);
              } else {
                setHasMoreMembers(false);
              }
              setLoading(false);
            }}
          >
            Load more members
          </Button>
        </div>
      )}
    </div>
  );
};

export default GroupMembers;