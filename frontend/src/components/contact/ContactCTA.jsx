import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";

/**
 * ContactCTA
 * Short, conversion-focused closing section for the Contact page.
 */
const ContactCTA = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-black/[0.08] px-4 sm:px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center space-y-5">
        <h2 className="text-[26px] sm:text-[34px] font-bold text-[#000000] tracking-[-1px]">
          Not ready to send a message?
        </h2>
        <p className="text-[15px] sm:text-[17px] text-[#615d59] leading-relaxed max-w-md mx-auto">
          Explore StudySync and see how collaborative learning works across study groups and notes.
        </p>

        <div className="pt-2">
          <Link
            to="/features"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white text-[14px] font-semibold rounded-[8px] transition-all duration-200 shadow-sm hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]"
          >
            <span>Explore StudySync</span>
            <ArrowRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
