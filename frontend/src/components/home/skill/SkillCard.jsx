import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SkillCard() {
  const rootRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        y: 60,
        opacity: 0,
        scale: 1.58,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          markers: false,
          toggleActions: 'play none none reverse',
        },
      })
    }, rootRef)
  }, [])
  return (
    <div className="w-full flex justify-center relative items-center border-1 border-black/30 rounded-3xl mt-6">
      <div className="max-w-4xl h-screen rounded-3xl p-10 relative overflow-hidden">
        {/* TEXT CONTENT */}
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">AI Writing Assistant</h2>

          <p className="text-gray-500 leading-relaxed mb-6">
            Generate polished notes, blogs, and documents in seconds. Powered
            by StudySync AI’s fast and accurate language model.
          </p>

          {/* Bullet Points */}
          <ul className="space-y-4">
            {[
              'Get instant responses',
              'Maintain grammar and tone',
              'Write faster with completions',
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* PHONE IMAGE */}
        <div ref={imgRef} className="w-full h-100vh scale-200 -rotate-35 absolute -bottom-20">
          <img className="w-full h-full object-cover" src="/img/mobile.png" alt="" />
        </div>
      </div>
    </div>
  );
}