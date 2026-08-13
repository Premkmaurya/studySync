import React from "react";
import AboutHero from "../components/about/AboutHero";
import ProblemSection from "../components/about/ProblemSection";
import ProductIdea from "../components/about/ProductIdea";
import PhilosophySection from "../components/about/PhilosophySection";
import LearningCycle from "../components/about/LearningCycle";
import StudySyncFooter from "../components/home/footer/StudySyncFooter";

/**
 * About Page — Complete Editorial Product Story & Manifesto
 * Answers:
 * 1. Why does StudySync exist?
 * 2. What problem is it solving?
 * 3. What exactly is StudySync?
 * 4. What does StudySync believe about learning?
 * 5. Where is the product going?
 * 6. Why should someone become part of it?
 */
const About = () => {
  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen overflow-x-clip">
      {/* 1. Hero — Why StudySync Exists */}
      <AboutHero />

      {/* 2. The Problem — Learning Is Too Fragmented */}
      <ProblemSection />

      {/* 3. The Idea — What StudySync Is */}
      <ProductIdea />

      {/* 4. Our Philosophy — What We Believe About Learning */}
      <PhilosophySection />

      {/* 5. The StudySync Experience — Learning Becomes A Cycle */}
      <LearningCycle />

      {/* 6. Footer */}
      <StudySyncFooter />
    </div>
  );
};

export default About;