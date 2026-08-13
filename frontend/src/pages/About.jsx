import React from "react";
import { Link } from "react-router-dom";
import { Target, Users, BookOpen, Bot, ArrowRight } from "lucide-react";
import Button from "../components/design-system/Button";
import Card from "../components/design-system/Card";
import Pill from "../components/design-system/Pill";
import { SectionHeader } from "../components/design-system/SectionHeader";
import StudySyncFooter from "../components/home/footer/StudySyncFooter";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      desc: "To give students and lifelong learners a thoughtful, distraction-free environment to discover study groups, organize notes, and learn together.",
    },
    {
      icon: Users,
      title: "Peer-to-Peer Learning",
      desc: "We believe knowledge grows fastest when shared. StudySync bridges the gap between solitary study and active group collaboration.",
    },
    {
      icon: Bot,
      title: "Intelligent Assistance",
      desc: "Contextual AI tools designed to summarize notes, clarify complex academic subjects, and generate study resources on demand.",
    },
  ];

  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 md:px-12 max-w-[1440px] mx-auto text-center flex flex-col items-center">
        <Pill variant="sky" size="sm" className="mb-4">
          About StudySync
        </Pill>
        <h1 className="text-[40px] sm:text-[60px] font-bold tracking-[-2px] leading-tight max-w-3xl mb-6">
          Building a quieter, smarter space for group learning.
        </h1>
        <p className="text-[18px] sm:text-[20px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic max-w-2xl leading-relaxed mb-10">
          StudySync was created to replace chaotic chat apps and fragmented note tools with a single, tactile workspace built specifically for collaborative study.
        </p>
      </section>

      {/* Values Grid */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <Card key={i} variant="white" className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-[8px] bg-[#e6f3fe] text-[#0075de] flex items-center justify-center">
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="text-[20px] font-bold text-[#000000]">{v.title}</h3>
              <p className="text-[14px] text-[#615d59] leading-relaxed">{v.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white border-y border-black/[0.08] px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <SectionHeader
            align="center"
            eyebrow="Product Philosophy"
            title="Less clutter, more focus."
            description="We prioritize clarity, visual hierarchy, and speed over decorative fluff. Every pixel in StudySync earns its place so you can focus on mastering your subjects."
          />
          <Link to="/register" className="mt-4">
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Join StudySync today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <StudySyncFooter />
    </div>
  );
};

export default About;