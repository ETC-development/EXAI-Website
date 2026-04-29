// Animation variants for consistent motion across the app
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
  hover: { 
    scale: 1.02, 
    y: -5,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
};

export const buttonTap = {
  scale: 0.97,
  transition: { duration: 0.1 },
};

export const glowPulse = {
  initial: { 
    boxShadow: "0 0 20px rgba(20, 180, 186, 0.3)" 
  },
  animate: { 
    boxShadow: [
      "0 0 20px rgba(20, 180, 186, 0.3)",
      "0 0 40px rgba(20, 180, 186, 0.5)",
      "0 0 20px rgba(20, 180, 186, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Easing functions
export const easings = {
  smooth: [0.25, 0.1, 0.25, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: { type: "spring", stiffness: 300, damping: 30 },
};

// Duration presets
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// Hero section animations
export const heroStagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const heroItem = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Modal/Dialog animations
export const modalOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

// Loading skeleton animation
export const shimmer = {
  initial: { backgroundPosition: "-200% 0" },
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};
