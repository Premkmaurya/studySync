import React from 'react'

const Core = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      
      {/* --- START OF CARD --- */}
      <div className="relative w-full max-w-lg p-6 rounded-[2rem] bg-gradient-to-br from-blue-50/50 via-white to-white border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        
        {/* Number Icon Box */}
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
          <img src="/img/learning.avif" className="w-full h-full object-cover" alt="" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Transparent AI Algorithms
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed">
          We openly share how Geni AI makes decisions to build user trust and clarity.
        </p>
        
      </div>
      {/* --- END OF CARD --- */}

    </div>
  )
}

export default Core