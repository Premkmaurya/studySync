import React from "react";
import { Link } from "react-router-dom";
import { Users, FileText, Compass, Bot, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Button from "../components/design-system/Button";
import Card from "../components/design-system/Card";
import Pill from "../components/design-system/Pill";
import { SectionHeader } from "../components/design-system/SectionHeader";
import StudySyncCTA from "../components/StudySyncCTA";
import StudySyncFooter from "../components/home/footer/StudySyncFooter";

const Features = () => {
  const featureList = [
    {
      title: "Realtime Group Workspaces",
      desc: "Instant chat messaging powered by Socket.IO, active member rosters, and dedicated channel tabs for every study group.",
      icon: Users,
      accent: "#ffb110",
    },
    {
      title: "Knowledge Note Library",
      desc: "Rich TipTap markdown text editor with formatting, category filtering, search, and instant note saves to your personal collection.",
      icon: FileText,
      accent: "#0075de",
    },
    {
      title: "Academic Group Discovery",
      desc: "Filter and search study groups by subject area, join open communities, or launch private study hubs.",
      icon: Compass,
      accent: "#f64932",
    },
    {
      title: "Integrated AI Assistant",
      desc: "Contextual AI support to summarize lengthy notes, generate practice questions, and clarify challenging course concepts.",
      icon: Bot,
      accent: "#02093a",
    },
    {
      title: "Category Filtering & Search",
      desc: "Instantly locate notes and study groups across Engineering, Algorithms, AI, Security, and Design.",
      icon: Zap,
      accent: "#62aef0",
    },
    {
      title: "Secure Member Permissions",
      desc: "Control group privacy, manage member roles, and configure workspace settings with confidence.",
      icon: ShieldCheck,
      accent: "#b18164",
    },
  ];

  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 md:px-12 max-w-[1440px] mx-auto text-center flex flex-col items-center">
        <Pill variant="sky" size="sm" className="mb-4">
          Product Capabilities
        </Pill>
        <h1 className="text-[40px] sm:text-[60px] font-bold tracking-[-2px] leading-tight max-w-3xl mb-6">
          Everything you need to learn, collaborate, and succeed.
        </h1>
        <p className="text-[18px] sm:text-[20px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic max-w-2xl leading-relaxed mb-10">
          StudySync combines collaborative group workspaces, structured knowledge notes, and intelligent AI assistance into one cohesive system.
        </p>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((f, i) => (
            <Card key={i} variant="white" className="flex flex-col gap-4">
              <div
                style={{ backgroundColor: `${f.accent}15`, color: f.accent === "#02093a" ? "#02093a" : f.accent }}
                className="w-10 h-10 rounded-[8px] flex items-center justify-center"
              >
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-[20px] font-bold text-[#000000]">{f.title}</h3>
              <p className="text-[14px] text-[#615d59] leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Conversion Banner */}
      <StudySyncCTA />

      {/* Footer */}
      <StudySyncFooter />
    </div>
  );
};

export default Features;
