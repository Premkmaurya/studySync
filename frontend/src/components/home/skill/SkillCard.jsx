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
        scale: 1.2,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
      })
    }, rootRef)

    return () => ctx.revert();
  }, [])

  return (
    <div ref={rootRef} className="w-full flex justify-center relative items-center border border-black/[0.08] rounded-[12px] bg-white p-8 my-6">
      <div className="max-w-2xl w-full">
        <h2 className="text-[24px] font-bold text-[#000000] mb-2 tracking-[-0.5px]">AI Writing Assistant</h2>

        <p className="text-[#615d59] text-[14px] leading-relaxed mb-6">
          Generate polished notes, summaries, and flashcards in seconds. Powered by StudySync AI's language model.
        </p>

        <ul className="space-y-3">
          {[
            'Get instant AI study summaries',
            'Maintain accurate tone and formatting',
            'Collaborate on group research topics',
          ].map((item, index) => (
            <li key={index} className="flex items-center gap-2.5">
              <span className="w-5 h-5 flex items-center justify-center bg-[#0075de] rounded-full text-white text-[10px] font-bold">
                ✓
              </span>
              <span className="text-[14px] text-[#111111]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}