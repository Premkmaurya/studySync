import React from 'react'

const SingleFeatureCard = () => {
  return (
    <div className="flex justify-center items-center h-[48vh] shadow-2xl p-2 border border-gray-300 rounded-[2.5rem]">
      <div className="relative w-full max-w-xl p-8 rounded-[2.5rem] border border-gray-300 shadow-2xl bg-gradient-to-br from-blue-200 via-blue-100 to-white text-center">
        {/* Icon Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* This is a placeholder for the icon. In a real project, you would use an SVG or image. */}
            <img
              src="/img/learning.avif" // Replace with actual icon URL
              alt="Stack of papers with blue lines"
              className="w-[14vw] h-auto drop-shadow-lg"
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-4xl font-extrabold text-gray-900 mb-3">
          Write Anything
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-base leading-relaxed">
          Effortlessly craft emails, blogs, social media captions, product descriptions, and more with precision and style.
        </p>
      </div>
    </div>
  )
}

export default SingleFeatureCard