import { range, smooth } from '../../lib/motion';

/**
 * Shared, mutable hero state. Scroll handlers write to it and the WebGL scene reads it inside
 * useFrame — no React re-renders per scroll event.
 */
export const heroStore = {
  /** Raw scroll progress through the hero section, 0 → 1. */
  progress: 0,
  /** Selected Zempure finish (Core Series). */
  finish: 'charcoal-black' as 'charcoal-black' | 'pearl-white',
  /** Set by the canvas so scroll and finish changes can request a frame (frameloop="demand"). */
  invalidate: (() => {}) as () => void,
};

export const HERO_STAGES = [
  { id: 'intro', label: 'hero.rail.purifier', at: 0 },
  { id: 'stages', label: 'hero.rail.filtration', at: 0.24 },
  { id: 'pour', label: 'hero.rail.glass', at: 0.52 },
  { id: 'ready', label: 'hero.rail.ready', at: 0.82 },
] as const;

export const stageIndex = (p: number) => (p < 0.22 ? 0 : p < 0.5 ? 1 : p < 0.8 ? 2 : 3);

/** One timeline, derived from scroll progress — every visual reads from here so stages stay coordinated. */
export function timeline(p: number) {
  const tap = smooth(range(p, 0.5, 0.54)) * (1 - smooth(range(p, 0.8, 0.84)));
  return {
    /** 1. rotate to face the visitor */
    turn: smooth(range(p, 0, 0.16)),
    /** 2. shell becomes translucent, then solid again before the pour */
    xray: smooth(range(p, 0.16, 0.26)) * (1 - smooth(range(p, 0.48, 0.55))),
    /** 3. four cartridges illuminate in sequence */
    cartridges: [0, 1, 2, 3].map((i) => smooth(range(p, 0.27 + i * 0.05, 0.31 + i * 0.05))),
    /** 4. tap pressed (and released at 9.) */
    tap,
    /** 5. stream flows while the tap is held */
    stream: smooth(range(p, 0.53, 0.56)) * (1 - smooth(range(p, 0.8, 0.83))),
    /** 6. glass fills */
    fill: smooth(range(p, 0.55, 0.8)),
    /** 7. underwater → turquoise sea surface */
    sea: smooth(range(p, 0.45, 0.8)),
    /** 8. camera moves toward the glass, then eases back */
    dolly: smooth(range(p, 0.52, 0.72)) * (1 - 0.65 * smooth(range(p, 0.84, 0.96))),
    /** 9. final indicator state */
    ready: smooth(range(p, 0.84, 0.92)),
  };
}
