import React from "react";
import FeaturesHero from "../components/features/FeaturesHero";
import FeatureNavigation from "../components/features/FeatureNavigation";
import GroupsFeature from "../components/features/GroupsFeature";
import DiscussionFeature from "../components/features/DiscussionFeature";
import NotesFeature from "../components/features/NotesFeature";
import AIFeature from "../components/features/AIFeature";
import WorkspaceShowcase from "../components/features/WorkspaceShowcase";
import FeaturePhilosophy from "../components/features/FeaturePhilosophy";
import FeatureSummary from "../components/features/FeatureSummary";
import StudySyncFooter from "../components/home/footer/StudySyncFooter";

/**
 * Features Page — Interactive Product Tour & Capability Infrastructure Showcase
 * Narrative: DISCOVER → CONNECT → DISCUSS → CREATE KNOWLEDGE → GET HELP → KEEP LEARNING
 */
const Features = () => {
  return (
    <main className="bg-[#f6f5f4] text-[#000000] min-h-screen overflow-x-clip">
      {/* 01 — Hero */}
      <FeaturesHero />

      {/* 02 — Feature Navigation */}
      <FeatureNavigation />

      {/* 03 — Discover Study Groups */}
      <GroupsFeature />

      {/* 04 — Learn Through Discussion */}
      <DiscussionFeature />

      {/* 05 — Build Shared Knowledge */}
      <NotesFeature />

      {/* 06 — AI Learning Assistant */}
      <AIFeature />

      {/* 07 — Connected Learning Workspace Centerpiece */}
      <WorkspaceShowcase />

      {/* 08 — Feature Philosophy */}
      <FeaturePhilosophy />

      {/* 09 — Feature Summary */}
      <FeatureSummary />

      {/* 10 — Footer */}
      <StudySyncFooter />
    </main>
  );
};

export default Features;
