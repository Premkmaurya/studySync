import React from "react";
import Identity from "./components/Identity";
import Danger from "./components/Danger";
import Pill from "../../../design-system/Pill";
import { PageHeader } from "../../../design-system/SectionHeader";

const GroupSettings = () => {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto flex flex-col gap-8">
      <PageHeader
        title="Group Settings"
        description="Manage workspace preferences, group identity, and danger zone actions."
        badge={<Pill variant="sky" size="sm">Settings</Pill>}
      />

      <Identity />
      <Danger />
    </div>
  );
};

export default GroupSettings;
