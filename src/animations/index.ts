import { Variants } from 'framer-motion';

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "beforeChildren", 
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Staggered children animations (for lists and grids)
export const itemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// Card hover animations
export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0px 5px 15px rgba(0,0,0,0.05)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.02,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

// Button press animation
export const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Fade-in from bottom for scrolled content
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    }
  }
};
