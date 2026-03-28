import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  Users,
  FileText,
  Bookmark,
} from "lucide-react";
import MainContent from "./components/MainContent";
import HeroSection from "./components/HeroSection";
import TabSwitch from "./components/TabSwitch";

// --- MAIN PROFILE VIEW ---

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Identity", icon: User },
    { id: "groups", label: "My Groups", icon: Users },
    { id: "notes", label: "My Notes", icon: FileText },
    { id: "saved", label: "Saved", icon: Bookmark },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-[#E5E7EB] font-sans overflow-x-hidden">
      {/* 1. Spatial Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, transform: "translateZ(0)" }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: "opacity" }}
            className={`absolute top-0 right-0 w-[70%] h-[70%] blur-[100px] rounded-full ${
              activeTab === "profile"
                ? "bg-indigo-600"
                : activeTab === "groups"
                  ? "bg-fuchsia-600"
                  : activeTab === "notes"
                    ? "bg-cyan-600"
                    : "bg-emerald-600"
            }`}
          />
        </AnimatePresence>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-zinc-800/20 blur-[80px] rounded-full" />
      </div>

      <main
        className="relative z-10 pt-36 pb-20 px-6 max-w-6xl mx-auto"
        style={{ WebkitTransform: "translate3d(0,0,0)" }}
      >
        {/* 3. Hero Section */}
        <HeroSection />

        {/* 4. Tab Switcher (Floating Pill) */}
        <TabSwitch
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* 5. Dynamic Content Area */}
        <MainContent activeTab={activeTab} />
      </main>
    </div>
  );
};


export default Profile;
