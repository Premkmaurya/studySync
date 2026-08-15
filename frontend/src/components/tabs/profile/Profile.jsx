import React, { useState } from "react";
import { User, Users, FileText, Bookmark } from "lucide-react";
import MainContent from "./components/mainContent/MainContent";
import HeroSection from "./components/HeroSection";
import TabSwitch from "./components/TabSwitch";

/**
 * Profile — Redesigned Personal Learning Identity
 * Transforms the profile into a personal workspace displaying identity, learning snapshot,
 * joined study communities, created knowledge, and saved library entries.
 */
const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Identity", icon: User },
    { id: "groups", label: "My Groups", icon: Users },
    { id: "notes", label: "My Notes", icon: FileText },
    { id: "saved", label: "Saved", icon: Bookmark },
  ];

  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen pt-36 sm:pt-44 md:pt-48 pb-16 px-4 sm:px-6 md:px-10 max-w-[1400px] overflow-x-clip">
      {/* 01 — Hero Header Statement & Identity Object Card */}
      <HeroSection />

      {/* 02 — Compact Profile Navigation Tabs */}
      <TabSwitch
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 03 — Active Tab Content Surface */}
      <MainContent activeTab={activeTab} />
    </div>
  );
};

export default Profile;
