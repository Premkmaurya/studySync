import React from "react";
import { useSelector } from "react-redux";

const ContactForm = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`w-full bg-transparent ${theme === 'light' ? 'text-black bg-white' : 'text-white bg-transparent'}`}>
      {/* 1. Fluid Header Section */}
      <div className="w-full min-h-[40vh] px-6 flex flex-col justify-center py-10">
        <div className="w-full flex justify-center items-center">
          <div className={`w-[90%] sm:w-[70%] md:w-[50%] text-center ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            <h1 className={`text-4xl sm:text-5xl md:text-[4.2vw] font-semibold leading-tight mb-5 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}>
              Our Trusted Base on Earth
            </h1>
            <p className={`text-base md:text-lg w-full sm:w-[85%] md:w-[80%] mx-auto leading-relaxed ${
              theme === 'light' ? 'text-gray-600' : 'text-white/60'
            }`}>
              Let’s connect! Whether it’s feedback, inquiries, or collaboration
              ideas, we’d love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Responsive Form Section */}
      <div className="flex justify-center min-h-screen items-center p-4 sm:p-6 lg:p-8 py-12 md:py-20">
        {/* Outer Glass Container */}
        <div className="bg-white/80 rounded-[2rem] shadow-2xl border border-gray-300 w-full p-3 max-w-xl relative backdrop-blur-sm">
          {/* Inner Content Container */}
          <div className="w-full h-full p-6 sm:p-10 shadow-xl rounded-[1.8rem] border border-gray-300 bg-white/40">
            <form className="space-y-6">
              {/* Name Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Jane Smith"
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 px-4 py-4 text-gray-700 placeholder-gray-400 border outline-none transition-all"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="jane@framer.com"
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 px-4 py-4 text-base text-gray-700 placeholder-gray-400 border outline-none transition-all"
                />
              </div>

              {/* Phone and Location Inputs (Responsive Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+0 254 258 5896"
                    className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 px-4 py-4 text-base text-gray-700 placeholder-gray-400 border outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="location"
                    className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="San Francisco"
                    className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 px-4 py-4 text-base text-gray-700 placeholder-gray-400 border outline-none transition-all"
                  />
                </div>
              </div>

              {/* Write Something Textarea */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider"
                >
                  Write Something
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Ask your doubts..."
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 px-4 py-4 text-base text-gray-700 placeholder-gray-400 border resize-none outline-none transition-all"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black uppercase tracking-widest py-5 px-6 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-600 hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform active:scale-[0.98]"
                >
                  Launch Transmission
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;