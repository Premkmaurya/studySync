import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";
import {
  Shield,
  ChevronDown,
  Lock,
  Eye,
  Database,
  UserCheck,
  Mail,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Footer from "../components/home/footer/Footer";

const PrivacyPolicy = () => {
  const theme = useSelector((state) => state.theme.mode);
  const { scrollYProgress } = useScroll();
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const [expandedSection, setExpandedSection] = useState(0);

  const sections = [
    {
      title: "1. Information We Collect",
      icon: Database,
      content: [
        "Account Information: Name, email address, password, profile picture, and preferences.",
        "Usage Data: Pages visited, features used, time spent, and interaction patterns.",
        "Group & Collaboration Data: Notes, messages, files, and documents you create or share.",
        "Device Information: Browser type, IP address, operating system, and device identifiers.",
        "Communication Data: Support tickets, feedback, and emails sent to our team.",
      ],
    },
    {
      title: "2. How We Use Your Data",
      icon: Eye,
      content: [
        "Service Delivery: Providing, maintaining, and improving StudySync features.",
        "Communication: Sending updates, security alerts, and support responses.",
        "Analytics: Understanding user behavior to optimize platform performance.",
        "Personalization: Customizing your experience based on preferences and usage.",
        "Security: Detecting and preventing fraudulent activities and unauthorized access.",
      ],
    },
    {
      title: "3. Data Security",
      icon: Lock,
      content: [
        "We employ industry-standard encryption (SSL/TLS) for data in transit.",
        "Passwords are hashed using modern cryptographic algorithms.",
        "Access to personal data is restricted to authorized personnel only.",
        "We conduct regular security audits and penetration testing.",
        "Data is stored in secure, redundant servers with backup protocols.",
      ],
    },
    {
      title: "4. Data Sharing & Disclosure",
      icon: UserCheck,
      content: [
        "We do NOT sell your personal data to third parties.",
        "Data sharing occurs only with: Service providers (hosting, analytics), Legal requirements (court orders), Your explicit consent.",
        "Group members can access data you share within group collaborations.",
        "We use third-party services for analytics (Google Analytics) and payments (Stripe).",
        "These third parties have their own privacy policies and data handling practices.",
      ],
    },
    {
      title: "5. Your Privacy Rights",
      icon: Shield,
      content: [
        "Right to Access: You can request all data we collect about you.",
        "Right to Rectification: You can request corrections to inaccurate information.",
        "Right to Deletion: You can request deletion of your account and associated data.",
        "Right to Data Portability: You can export your data in a standard format.",
        "Right to Withdraw Consent: You can opt out of non-essential data processing.",
      ],
    },
    {
      title: "6. Cookies & Tracking",
      icon: Mail,
      content: [
        "Essential Cookies: Required for login, session management, and security.",
        "Analytics Cookies: Track usage patterns to improve our services.",
        "Preference Cookies: Remember your theme, language, and layout preferences.",
        "You can disable non-essential cookies in your browser settings.",
        "We respect Do Not Track (DNT) signals and honor user preferences.",
      ],
    },
    {
      title: "7. Data Retention",
      icon: Database,
      content: [
        "Account Data: Retained while your account is active.",
        "Deleted Content: Removed from primary systems within 30 days.",
        "Backups: Retained for up to 90 days for disaster recovery.",
        "Analytics Data: Aggregated and anonymized after 2 years.",
        "You can request data deletion anytime through your account settings.",
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
                <CheckCircle
                  size={16}
                  className="text-indigo-500 flex-shrink-0 mt-1"
                />
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
            <Shield size={14} className="fill-current" />
            Data_Protection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-6xl md:text-7xl font-black tracking-tighter leading-[1.1] uppercase mb-6 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Privacy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-current to-fuchsia-500">
              Policy
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
            Last Updated: {new Date().toLocaleDateString()} • Your privacy is
            paramount to us. This policy explains how StudySync collects, uses,
            and protects your personal information.
          </motion.p>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          >
            {[
              { icon: Lock, label: "End-to-End Encrypted", text: "Your data is protected with industry-standard encryption" },
              { icon: Eye, label: "No Third-Party Sales", text: "We never sell your personal data to advertisers" },
              { icon: UserCheck, label: "Full Control", text: "You can request, modify, or delete your data anytime" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`p-4 rounded-lg border ${
                  theme === "light"
                    ? "bg-white/60 border-black/10"
                    : "bg-white/[0.05] border-white/10"
                }`}
              >
                <item.icon className="text-indigo-500 mb-2" size={24} />
                <h4 className={`font-black text-sm mb-1 ${
                  theme === "light" ? "text-black" : "text-white"
                }`}>
                  {item.label}
                </h4>
                <p className={`text-xs leading-relaxed ${
                  theme === "light" ? "text-gray-600" : "text-zinc-500"
                }`}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

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

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
              Privacy Rights & Inquiries
            </h3>
            <p
              className={`mb-6 ${
                theme === "light" ? "text-gray-700" : "text-zinc-400"
              }`}
            >
              To exercise your privacy rights or submit inquiries, contact our
              Privacy Officer at privacy@studysync.com. We aim to respond within
              30 days.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg transition-colors"
            >
              Submit a Request
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
