import React from 'react'

const SingleFeatureCard = () => {
  return (
    <div className="flex justify-center items-center h-[48vh] shadow-2xl px-3 border border-gray-300 rounded-[2.5rem]">
      <div className="relative w-full max-w-xl px-3 py-3 rounded-[2.5rem] border border-gray-300 shadow-2xl text-center">
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
        <h3 className="text-4xl font-extrabold mb-3">
          Write Anything
        </h3>

        {/* Description */}
        <p className="text-base text-white/70 leading-relaxed">
          Effortlessly craft emails, blogs, social media captions, product descriptions, and more with precision and style.
        </p>
      </div>
    </div>
  )
}

export default SingleFeatureCard