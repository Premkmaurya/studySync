/**
 * StudySync Motion Tokens
 * Centralized easing, duration, and transition constants for consistent, restrained motion.
 */

export const DURATION = {
  MICRO: 0.18,       // Level 1: 150-220ms (buttons, icons, inputs)
  COMPONENT: 0.32,   // Level 2: 220-400ms (cards, dropdowns, accordions, tabs)
  STORYTELLING: 0.7, // Level 3: 500-900ms (hero reveals, sections, product showcase)
};

export const EASING = {
  // Controlled editorial entrance curve
  SMOOTH: [0.22, 1, 0.36, 1],
  // Standard UI transition
  EASE_OUT: [0, 0, 0.2, 1],
  // Expressive entrance
  EXPRESSIVE: [0.16, 1, 0.3, 1],
};

export const VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.COMPONENT, ease: EASING.SMOOTH },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: DURATION.MICRO, ease: EASING.EASE_OUT },
    },
  },
};
