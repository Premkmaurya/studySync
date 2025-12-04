import React from "react";

const ContactForm = () => {
  return (
    <div>
      <div className="w-full h-[40vh] px-6 flex flex-col justify-center">
        {/* Header */}
        <div className="w-full flex justify-center items-center h-full">
          <div className="w-[50%] text-center">
            <h1 className="text-[4.2vw] font-semibold leading-none mb-5 text-gray-900">
              Our Trusted Base on Earth
            </h1>
            <p className="text-md w-[80%] mx-auto text-gray-500">
              Let’s connect! Whether it’s feedback, inquiries, or collaboration
              ideas, we’d love to hear from you.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-screen items-center bg-gray-100 p-2 ">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-300 w-full p-3 max-w-xl relative">
          <div className="w-full h-full p-6 sm:p-8 shadow-xl rounded-2xl border border-gray-300">
            <form className="space-y-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Jane Smith"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base text-gray-700 placeholder-gray-400 border outline-none transition-all"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="jane@framer.com"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base text-gray-700 placeholder-gray-400 border outline-none transition-all"
                />
              </div>

              {/* Phone and Location Inputs (Responsive Grid) */}
              {/* grid-cols-1 on mobile (stacked), grid-cols-2 on sm screens (side-by-side) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+0 254 258 5896"
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base text-gray-700 placeholder-gray-400 border outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="San Francisco"
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base text-gray-700 placeholder-gray-400 border outline-none transition-all"
                  />
                </div>
              </div>

              {/* Write Something Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Write Something
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Ask your doubts..."
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base text-gray-700 placeholder-gray-400 border resize-none outline-none transition-all"
                ></textarea>
              </div>

              {/* Submit Button */}
              {/* Added padding-bottom wrapper so button doesn't hit badge on mobile */}
              <div className="pb-2 sm:pb-0">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 px-4 rounded-full shadow-md hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform active:scale-[0.98]"
                >
                  Submit
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
