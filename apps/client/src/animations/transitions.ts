export const transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const slowTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const spring = {
  type: 'spring',
  stiffness: 250,
  damping: 24,
};
