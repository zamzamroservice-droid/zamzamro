import { useSyncExternalStore } from 'react';

/** Subscribes to a CSS media query. */
export function useMedia(query: string, server = false) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', cb);
      return () => mql.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => server,
  );
}

export const usePrefersReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');
export const useIsDesktop = () => useMedia('(min-width: 1024px)');
