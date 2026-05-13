import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Shield, ChevronDown, CheckCircle, AlertCircle, Lock } from "lucide-react";
import Footer from "../components/home/footer/Footer";

const TermsAndConditions = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sections = [
    {
      title: "1. User Agreements",
      icon: FileText,
      content: [
      {id: 1,
      title: "Service Access & Usage",
      icon: Shield,
      content: [
        "StudySync is provided as-is for educational and professional collaboration purposes.",
        "Users must be 13 years or older to use our platform.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree not to use StudySync for unlawful or prohibited activities.",
        "Unauthorized access to our systems is strictly forbidden.",
  ]}],
    },
    {
      id: 2,
      title: "User Responsibilities",
      icon: CheckCircle,
      content: [
        "Users acknowledge responsibility for all content uploaded and shared.",
        "You warrant that you own or have permission to share all content.",
        "You agree not to upload malware, spam, or harmful content.",
        "StudySync reserves the right to remove inappropriate content.",
        "Violation of content guidelines may result in account suspension.",
      ],
    },
    {
      id: 3,
      title: "Intellectual Property Rights",
      icon: Lock,
      content: [
        "StudySync owns all intellectual property in the platform and its features.",
        "User content remains your property; StudySync has the right to use it for platform improvement.",
        "You grant StudySync a non-exclusive license to process and display your content.",
        "Third-party components are governed by their respective licenses.",
        "Unauthorized use of StudySync trademarks or logos is prohibited.",
      ],
    },
    {
      id: 4,
      title: "Limitation of Liability",
      icon: AlertCircle,
      content: [
        "StudySync is provided without warranties of any kind.",
        "We are not liable for indirect, incidental, or consequential damages.",
        "Our liability is limited to the amount paid by users in the past 12 months.",
        "Users assume all risks associated with platform usage.",
        "StudySync is not responsible for data loss or service interruptions.",
      ],
    },
    {
      id: 5,
      title: "Data & Privacy",
      icon: Shield,
      content: [
        "User data is processed according to our Privacy Policy.",
        "We use encryption to protect sensitive information.",
        "Data may be retained for legal or operational purposes.",
        "Users can request data deletion within compliance framework.",
        "Third-party integrations may share data per their terms.",
      ],
    },
    {
      id: 6,
      title: "Termination & Account Suspension",
      icon: AlertCircle,
      content: [
        "StudySync may suspend accounts violating these terms.",
        "Users can delete accounts at any time through settings.",
        "Upon termination, access to group content may be restricted.",
        "StudySync may retain data per legal requirements.",
        "Appeal process is available for unjust suspensions.",
      ],
    },
    {
      id: 7,
      title: "Changes to Terms",
      icon: CheckCircle,
      content: [
        "StudySync reserves the right to modify these terms.",
        "Users will be notified of significant changes via email.",
        "Continued usage implies acceptance of updated terms.",
        "Previous versions are available upon request.",
        "Disputes will be governed by terms effective at the time.",
      ],
    },
    {
      id: 8,
      title: "Contact & Support",
      icon: Shield,
      content: [
        "For questions regarding these terms, contact support@studysync.com",
        "Legal notices should be sent to legal@studysync.com",
        "Disputes are governed by applicable international laws.",
        "Arbitration is the preferred dispute resolution method.",
        "Any invalid provision will not affect the validity of remaining terms.",
      ],
    },
    {
      id: 9,
      title: "5. Limitation of Liability",
      icon: AlertCircle,
      content: [
        "StudySync shall not be liable for any indirect, incidental, special, or consequential damages.",
        "Our total liability is limited to the amount paid by you for our services in the past 12 months.",
        "We are not responsible for third-party websites or services linked through our platform.",
        "You assume all risks associated with using StudySync and the internet.",
      ],
    },
    {
      title: "6. Termination",
      icon: FileText,
      content: [
        "We reserve the right to terminate your account if you violate these terms.",
        "You may request account deletion at any time through your profile settings.",
        "Upon termination, your access to StudySync will be immediately revoked.",
        "Certain provisions of these terms will survive termination of your account.",
      ],
    },
  ];

  const SectionCard = ({ section, index, isExpanded }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`mb-4 border rounded-xl overflow-hidden transition-all ${
        theme === "light"
          ? "bg-white/50 border-black/10 hover:border-indigo-500/30"
          : "bg-white/[0.03] border-white/10 hover:border-indigo-500/30"
      }`}
    >
      <button
        onClick={() => setExpandedSection(isExpanded ? -1 : index)}
        className="w-full p-6 flex items-center justify-between hover:bg-indigo-500/5 transition-colors"
      >
        <div className="flex items-center gap-4 text-left">
          <section.icon
            className="text-indigo-500 flex-shrink-0"
            size={24}
          />
          <h3
            className={`text-lg font-black uppercase tracking-wide ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {section.title}
          </h3>
        </div>
        <ChevronDown
          className={`text-indigo-500 transition-transform flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`border-t ${
            theme === "light" ? "border-black/10" : "border-white/10"
          } px-6 py-4`}
        >
          <ul className="space-y-3">
            {section.content.map((item, i) => (
              <li
                key={i}
                className={`flex gap-3 text-sm leading-relaxed ${
                  theme === "light"
                    ? "text-gray-700"
                    : "text-zinc-400"
                }`}
              >
                <span className="text-indigo-500 font-bold mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div
      className={`relative min-h-screen w-full selection:bg-indigo-500/30 font-sans overflow-x-hidden transition-colors ${
        theme === "light"
          ? "bg-white text-slate-900"
          : "bg-[#050505] text-slate-200"
      }`}
    >
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ scale: orbScale }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-screen h-[100vh] flex items-center justify-center"
        >
          <div className="w-[900px] h-[900px] bg-indigo-600/10 blur-[200px] rounded-full animate-pulse" />
          <div className="absolute w-[700px] h-[700px] bg-fuchsia-600/5 blur-[160px] rounded-full delay-700" />
        </motion.div>

        {/* Film Grain & Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          }}
        />
        <div
          className={`absolute inset-0 ${
            theme === "light"
              ? "bg-[radial-gradient(circle_at_center,transparent_0%,#ffffff_70%)]"
              : "bg-[radial-gradient(circle_at_center,transparent_0%,#050505_70%)]"
          }`}
        />
      </div>

      {/* MAIN CONTENT */}
      <main className="relative z-10 pt-28 pb-20">
        <section className="max-w-4xl mx-auto px-6 mb-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-12"
          >
            <FileText size={14} className="fill-current" />
            Legal_Framework
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-6xl md:text-7xl font-black tracking-tighter leading-[1.1] uppercase mb-6 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Terms & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-current to-fuchsia-500">
              Conditions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-lg max-w-2xl font-medium leading-relaxed mb-12 ${
              theme === "light" ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            Last Updated: {new Date().toLocaleDateString()} • Please read these
            terms carefully before using StudySync. Your use of our service
            constitutes acceptance of these terms.
          </motion.p>

          {/* Sections */}
          <div className="space-y-2">
            {sections.map((section, index) => (
              <SectionCard
                key={index}
                section={section}
                index={index}
                isExpanded={expandedSection === index}
              />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`mt-20 p-8 rounded-2xl border ${
              theme === "light"
                ? "bg-indigo-50/50 border-indigo-200"
                : "bg-indigo-500/5 border-indigo-500/20"
            }`}
          >
            <h3
              className={`text-2xl font-black mb-4 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Questions About Our Terms?
            </h3>
            <p
              className={`mb-6 ${
                theme === "light" ? "text-gray-700" : "text-zinc-400"
              }`}
            >
              If you have any questions about these Terms and Conditions, please
              contact our legal team at legal@studysync.com
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg transition-colors"
            >
              Contact Us
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
