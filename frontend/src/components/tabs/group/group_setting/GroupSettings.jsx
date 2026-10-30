import React from "react";
import { useOutletContext } from "react-router-dom";
import { selectUser } from "../../../../features/auth/authSelectors";
import Identity from "./components/Identity";
import Danger from "./components/Danger";
import Pill from "../../../design-system/Pill";
import { PageHeader } from "../../../design-system/SectionHeader";
import { useSelector } from "react-redux";

const GroupSettings = () => {

  const currentUser = useSelector(selectUser);
  const context = useOutletContext();
  const group = context?.group;
  const groupOwnerId = group?.owner?._id || group?.owner;
  const currentUserId = currentUser?._id || currentUser?.id;
  const isGroupAdmin =
    groupOwnerId != null &&
    currentUserId != null &&
    String(groupOwnerId) === String(currentUserId);
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto flex flex-col gap-8">
      <PageHeader
        title="Group Settings"
        description="Manage workspace preferences, group identity, and danger zone actions."
        badge={<Pill variant="sky" size="sm">Settings</Pill>}
      />

      <Identity />
      {isGroupAdmin && <Danger />}
    </div>
  );
};

export default GroupSettings;
