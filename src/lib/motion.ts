/** The single easing curve used across the site. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeRise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const stagger = (step = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: step } },
});

/** Linear remap of v from [a,b] to [0,1], clamped. */
export const range = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
export const smooth = (t: number) => t * t * (3 - 2 * t);
