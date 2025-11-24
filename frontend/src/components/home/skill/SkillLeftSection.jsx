export default function SkillLeftSection() {
  return (
    <div className="w-[50%] min-h-screen flex items-center justify-center bg-[#f7f8fa] px-6 py-20">
      <div className="max-w-lg">
        
        {/* Blue glow line */}
        <div className="relative h-2 w-40 mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 blur-md" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
          Unlock the Power of <br /> Gen AI
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          Boost productivity and creativity with tools built
          for content, automation, and insights powered by
          advanced AI systems.
        </p>

        {/* Button */}
        <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full shadow-[0_8px_20px_rgba(0,0,255,0.25)] hover:bg-blue-700 transition-all">
          Get App
        </button>
      </div>
    </div>
  );
}
