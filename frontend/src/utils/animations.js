// Animation variants separated for reusability
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const headerVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export const titleColorAnimation = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
