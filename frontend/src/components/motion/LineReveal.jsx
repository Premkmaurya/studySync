import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "./motionTokens";

/**
 * LineReveal Component
 * Wraps text/elements in an overflow-hidden mask and reveals lines upward.
 * Ideal for editorial statements and hero headlines.
 */
const LineReveal = ({
  children,
  delay = 0,
  duration = DURATION.STORYTELLING,
  className = "",
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once, margin: "-30px" }}
        transition={{
          duration,
          delay,
          ease: EASING.SMOOTH,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default LineReveal;
