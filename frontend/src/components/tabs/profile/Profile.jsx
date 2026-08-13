import React, { useState } from "react";
import { User, Users, FileText, Bookmark } from "lucide-react";
import MainContent from "./components/mainContent/MainContent";
import HeroSection from "./components/HeroSection";
import TabSwitch from "./components/TabSwitch";
import { PageHeader } from "../../design-system/SectionHeader";
import Pill from "../../design-system/Pill";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Identity", icon: User },
    { id: "groups", label: "My Groups", icon: Users },
    { id: "notes", label: "My Notes", icon: FileText },
    { id: "saved", label: "Saved", icon: Bookmark },
  ];

  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen py-10 px-6 md:px-12 max-w-[1440px] mx-auto">
      <PageHeader
        title="Personal Learning Profile"
        description="Manage your identity, joined study groups, and saved knowledge notes."
        badge={<Pill variant="sky" size="sm">Profile</Pill>}
      />

      <div className="mt-8">
        <HeroSection />
        <TabSwitch
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Profile;
