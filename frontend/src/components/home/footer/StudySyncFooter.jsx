import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Check, 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin,
  MessageCircle
} from "lucide-react";

/**
 * StudySyncFooter
 * A premium, highly distinctive editorial footer for StudySync inspired by modern brand visual systems.
 * Features a refined asymmetric curved surface, compact typography for perfect screen fit,
 * multi-column navigation, newsletter integration, interactive social icons, and a giant bottom "studySync" wordmark.
 */
const StudySyncFooter = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <footer className={`w-full bg-[#f6f5f4] overflow-hidden ${className}`}>
      {/* 
        ASYMMETRIC BRAND CONTAINER 
        Refined curves & padding to prevent any text clipping while preserving signature arch visual identity.
      */}
      <div className="relative w-full max-w-[1440px] mx-auto bg-[#02093a] text-white rounded-t-[40px] sm:rounded-t-[60px] md:rounded-tl-[100px] lg:rounded-tl-[120px] md:rounded-tr-[28px] overflow-hidden shadow-[0_20px_50px_rgba(2,9,58,0.22)] border border-white/10">
        
        {/* Subtle background ambient tint */}
        <div 
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_25%_25%,rgba(0,117,222,0.22),transparent_65%)]" 
          aria-hidden="true" 
        />

        {/* Content Container with safe inset padding */}
        <div className="relative z-10 pt-12 sm:pt-14 md:pt-14 pb-4 px-5 sm:px-8 md:pl-16 md:pr-10 lg:pl-20 lg:pr-12 flex flex-col justify-between">
          
          {/* TOP GRID / COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">
            
            {/* 1. EDITORIAL STATEMENT & BRAND MISSION (Col 1-5) */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between items-start space-y-4">
              <div className="space-y-2.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0075de]/20 border border-[#0075de]/40 text-[#62aef0] text-[10px] font-semibold tracking-wider uppercase font-mono">
                  StudySync Platform
                </span>
                <h3 className="text-[20px] sm:text-[22px] lg:text-[25px] font-bold text-white tracking-[-0.5px] leading-[1.2]">
                  Learning works better when knowledge is <span className="text-[#62aef0] underline decoration-[#0075de]/60 decoration-wavy decoration-1 underline-offset-4">shared</span>.
                </h3>
                <p className="text-[13px] text-slate-300/90 leading-relaxed max-w-xs">
                  Collaborative workspaces, structured knowledge notes, and real-time study groups for ambitious learners.
                </p>
              </div>

              <div className="text-[11px] text-slate-400 font-medium space-y-0.5 pt-2">
                <p>© {new Date().getFullYear()} StudySync. All rights reserved.</p>
                <p className="text-slate-500">Designed & built for modern group learning.</p>
              </div>
            </div>

            {/* 2. NAVIGATION LINKS (Col 6-7) */}
            <div className="md:col-span-3 lg:col-span-2 space-y-3">
              <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#62aef0] font-mono">
                Navigation
              </h4>
              <ul className="space-y-2 text-[13px]">
                <li>
                  <Link to="/" className="text-slate-200 hover:text-white transition-colors duration-150">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/find-groups" className="text-slate-200 hover:text-white transition-colors duration-150">
                    Explore Groups
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-slate-200 hover:text-white transition-colors duration-150">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-slate-200 hover:text-white transition-colors duration-150">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3. RESOURCES & LEGAL (Col 8-9) */}
            <div className="md:col-span-4 lg:col-span-2 space-y-3">
              <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#62aef0] font-mono">
                Resources
              </h4>
              <ul className="space-y-2 text-[13px]">
                <li>
                  <Link to="/contact" className="text-slate-200 hover:text-white transition-colors duration-150">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#faq" className="text-slate-200 hover:text-white transition-colors duration-150">
                    Help & FAQ
                  </a>
                </li>
                <li>
                  <span className="text-slate-400 cursor-pointer hover:text-slate-200 transition-colors">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 cursor-pointer hover:text-slate-200 transition-colors">
                    Terms of Service
                  </span>
                </li>
              </ul>
            </div>

            {/* 4. NEWSLETTER & SOCIAL CONNECT (Col 10-12) */}
            <div className="md:col-span-12 lg:col-span-4 space-y-5 flex flex-col justify-between">
              
              {/* Newsletter Pill Input */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#62aef0] font-mono">
                  Join the Community
                </h4>
                <p className="text-[12px] text-slate-300/90 leading-tight">
                  Get weekly study tips, platform updates, and study group highlights.
                </p>

                <form onSubmit={handleSubscribe} className="relative w-full max-w-md">
                  <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 focus-within:border-[#0075de] transition-colors">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent px-3 text-[13px] text-white placeholder-slate-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={subscribed}
                      className="shrink-0 px-4 py-2 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white text-[12px] font-medium rounded-full transition-all duration-200 flex items-center gap-1 shadow-md shadow-[#0075de]/30 hover:scale-[1.02]"
                    >
                      {subscribed ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Joined!</span>
                        </>
                      ) : (
                        <>
                          <span>Join</span>
                          <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Social Icon Buttons */}
              <div className="space-y-2 pt-1">
                <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 font-mono">
                  Follow Us
                </h4>
                <div className="flex items-center gap-2.5">
                  {[
                    { icon: Github, label: "GitHub", href: "https://github.com" },
                    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
                    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
                    { icon: MessageCircle, label: "Discord", href: "https://discord.com" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0075de] text-slate-200 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/10"
                    >
                      <social.icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* BOTTOM MASSIVE BRAND WORDMARK */}
          <div className="relative pt-4 overflow-hidden select-none">
            <div className="w-full flex items-center justify-center leading-none">
              <span className="text-[12vw] sm:text-[13vw] md:text-[100px] lg:text-[140px] xl:text-[170px] font-black tracking-[-0.04em] text-white/90 uppercase text-center block transform translate-y-[12%] pointer-events-none font-sans">
                study<span className="text-[#0075de]">sync</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default StudySyncFooter;
