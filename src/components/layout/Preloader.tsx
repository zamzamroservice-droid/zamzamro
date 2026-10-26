import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { lockScroll, unlockScroll } from '../../lib/scroll';
import { EASE } from '../../lib/motion';
import { useLang } from '../../i18n/LanguageProvider';

const MIN_MS = 1100;
const MAX_MS = 2800; // hard cap — never wait on optional assets or WebGL

/** Water-drop preloader: liquid fills the emblem, ripples expand, then a circular reveal. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const { t } = useLang();
  const done = useRef(false);
  const value = useRef(0);

  useEffect(() => {
    lockScroll();
    const start = performance.now();
    let ready = false;
    const markReady = () => (ready = true);
    Promise.race([
      Promise.all([document.fonts?.ready, document.readyState === 'complete' ? null : new Promise((r) => addEventListener('load', r, { once: true }))]),
      new Promise((r) => setTimeout(r, MAX_MS)),
    ]).then(markReady);

    let raf = 0;
    const tick = (now: number) => {
      const t = now - start;
      // Ease towards 90% on time, then to 100% once ready (and the minimum time has passed).
      const target = ready && t > MIN_MS ? 100 : Math.min(90, (t / MAX_MS) * 100 * 1.2);
      const next = value.current + (target - value.current) * 0.12;
      value.current = next > 99.5 ? 100 : next;
      setProgress(value.current);
      if (value.current < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Absolute cap even if animation frames are throttled (background tab, low-power mode).
    const cap = setTimeout(() => {
      value.current = 100;
      setProgress(100);
    }, MAX_MS + 600);
    return () => {
      clearTimeout(cap);
      cancelAnimationFrame(raf);
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && !done.current) {
      done.current = true;
      const id = setTimeout(onDone, 180);
      return () => clearTimeout(id);
    }
  }, [progress, onDone]);

  const fill = Math.round(progress);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label={t('brand.loading')}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pearl"
      initial={{ clipPath: 'circle(150% at 50% 45%)' }}
      exit={{ clipPath: 'circle(0% at 50% 45%)' }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ background: 'radial-gradient(70% 55% at 50% 40%, #ffffff, #faf9f6 55%, #e6f6f8)' }}
    >
      <div className="relative flex h-44 w-44 items-center justify-center">
        {[0, 0.9, 1.8].map((d) => (
          <span key={d} className="absolute inset-6 rounded-full border border-ocean/30 animate-ripple" style={{ animationDelay: `${d}s` }} />
        ))}
        <div className="relative h-[120px] w-[86px]">
          {/* faint outline of the emblem */}
          <img src="/images/emblem-navy.png" alt="" className="absolute inset-0 h-full w-full object-contain opacity-15" />
          {/* liquid wave clipped to the emblem shape */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              WebkitMaskImage: 'url(/images/emblem-navy.png)',
              maskImage: 'url(/images/emblem-navy.png)',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          >
            <div className="absolute inset-x-0 bottom-0 bg-navy transition-[height] duration-200" style={{ height: `${fill}%` }}>
              <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute -top-[9px] left-0 h-[10px] w-[200%] animate-[zz-wave_1.6s_linear_infinite] text-navy">
                <path fill="currentColor" d="M0 10c25 0 25-8 50-8s25 8 50 8 25-8 50-8 25 8 50 8v10H0Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 font-royal text-[1.7rem] tracking-[0.18em] text-navy">{t('brand.name')}</p>
      <p className="mt-1 font-display text-[1.05rem] text-gold-deep italic">{t('brand.tagline')}</p>
      <div className="mt-6 h-px w-40 overflow-hidden rounded-full bg-ice/50" aria-hidden>
        <div className="h-full bg-gradient-to-r from-ocean to-navy" style={{ width: `${fill}%` }} />
      </div>
      <span className="sr-only">{t('brand.loaded', { n: fill })}</span>
      <style>{'@keyframes zz-wave{to{transform:translateX(-50%)}}'}</style>
    </motion.div>
  );
}
