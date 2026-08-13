import React from "react";
import { ArrowRight } from "lucide-react";

/**
 * HoverArrow Component
 * Micro-interaction arrow that translates 3-4px to the right when container is hovered.
 */
const HoverArrow = ({ className = "w-4.5 h-4.5 text-current" }) => {
  return (
    <ArrowRight
      className={`transition-transform duration-200 ease-out group-hover:translate-x-1 ${className}`}
      aria-hidden="true"
    />
  );
};

export default HoverArrow;
