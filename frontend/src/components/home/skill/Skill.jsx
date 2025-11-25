import React, { useEffect, useRef } from "react";
import SkillLeftSection from "./SkillLeftSection";
import SkillRightSection from "./SkillRightSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skill = () => {
  const containerRef = useRef(null);
  const mainRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        y: "-330%",
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "top -330%",
          scrub: 2,
          pin: true,
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);
  return (
    <div ref={mainRef} className="w-screen h-screen flex">
      <SkillLeftSection />
      <div ref={containerRef} className="w-screen h-screen">
        <SkillRightSection />
      </div>
    </div>
  );
};

export default Skill;
