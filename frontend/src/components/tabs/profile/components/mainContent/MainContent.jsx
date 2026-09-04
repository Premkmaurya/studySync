import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import GroupSection from "./components/GroupSection";
import ProfileSection from "./components/ProfileSection";
import NoteSection from "./components/NoteSection";
import SavedNote from "./components/SavedNote";

dayjs.extend(relativeTime);

const MainContent = ({ activeTab }) => {
  return (
    <div className="px-3 sm:px-10">
      {activeTab === "profile" && <ProfileSection activeTab={activeTab} />}
      {activeTab === "groups" && <GroupSection />}
      {activeTab === "notes" && <NoteSection />}
      {activeTab === "saved" && <SavedNote />}
    </div>
  );
};

export default MainContent;
