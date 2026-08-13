import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "./motionTokens";

/**
 * Reveal Component
 * Viewport entrance reveal with subtle translate & opacity.
 * Respects prefers-reduced-motion automatically.
 */
const Reveal = ({
  children,
  direction = "up", // 'up' | 'down' | 'left' | 'right' | 'none'
  distance = 18,
  delay = 0,
  duration = DURATION.COMPONENT,
  className = "",
  once = true,
  scale = 1,
}) => {
  const shouldReduceMotion = useReducedMotion();

  let initialY = 0;
  let initialX = 0;

  if (direction === "up") initialY = distance;
  if (direction === "down") initialY = -distance;
  if (direction === "left") initialX = distance;
  if (direction === "right") initialX = -distance;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: initialY,
        x: initialX,
        scale: scale !== 1 ? scale : 1,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: EASING.SMOOTH,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
