import React, { useState, useEffect } from "react";
import { Users, MessageSquare, BookOpen, Bot, Layout, Compass, Sparkles } from "lucide-react";

/**
 * FeatureNavigation
 * Sticky horizontal index bar immediately below the Hero section.
 * Updates active indicator as user scrolls through sections using IntersectionObserver.
 */
const FeatureNavigation = () => {
  const [activeSection, setActiveSection] = useState("groups");

  const navItems = [
    { id: "groups", label: "GROUPS", icon: Users },
    { id: "discussions", label: "DISCUSSIONS", icon: MessageSquare },
    { id: "notes", label: "SHARED NOTES", icon: BookOpen },
    { id: "ai", label: "AI ASSISTANT", icon: Bot },
    { id: "workspace", label: "WORKSPACE", icon: Layout },
    { id: "philosophy", label: "PHILOSOPHY", icon: Sparkles },
  ];

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Features section navigation"
      className="sticky top-[64px] z-10 w-full bg-[#f6f5f4]/95 backdrop-blur-md border-y border-black/[0.08] px-3 sm:px-6"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-13 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-1 sm:gap-2 mx-auto sm:mx-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-[8px] text-[12px] font-mono font-bold tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-white text-[#0075de] shadow-2xs"
                    : "text-[#615d59] hover:text-[#000000] hover:bg-white/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#0075de]" : "text-[#757575]"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
        <span className="hidden lg:inline-block text-[11px] font-mono text-[#757575]">
          Select section to jump
        </span>
      </div>
    </nav>
  );
};

export default FeatureNavigation;
