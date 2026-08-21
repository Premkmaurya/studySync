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
    <div className="mx-auto max-w-[1400px] w-full bg-[#f6f5f4] text-[#000000] min-h-screen pt-28 mt-[4rem] sm:mt-0 sm:pt-36 md:pt-40 pb-16 px-5 sm:px-8 md:px-10 lg:px-12 overflow-x-clip">
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
