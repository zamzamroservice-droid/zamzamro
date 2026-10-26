import Lenis from 'lenis';

/** Header height + breathing room, used for anchor offsets. */
export const HEADER_OFFSET = 80;

let lenis: Lenis | null = null;
let lockCount = 0;

/** Lenis smooth scrolling on desktop pointers only — touch devices keep native scrolling. */
export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined') return;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reduced) return;
  lenis = new Lenis({ duration: 1.05, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
}

export function scrollToElement(el: HTMLElement) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (lenis) lenis.scrollTo(el, { offset: -HEADER_OFFSET, force: true });
  else {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  }
}

/** Reference-counted scroll lock (preloader, mobile menu). */
export function lockScroll() {
  lockCount++;
  lenis?.stop();
  document.documentElement.style.overflow = 'hidden';
}
export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount) return;
  lenis?.start();
  document.documentElement.style.overflow = '';
}

export function scrollToY(y: number) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (lenis) lenis.scrollTo(y, { duration: 1.6, force: true });
  else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
}
