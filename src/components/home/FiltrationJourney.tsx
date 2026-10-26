import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { journeyStages, jtext } from '../../data/journey';
import { useLang } from '../../i18n/LanguageProvider';
import { usePrefersReducedMotion } from '../../hooks/useMedia';
import { EASE } from '../../lib/motion';

const X0 = 70;
const X1 = 930;
const nodeX = (i: number) => X0 + ((X1 - X0) / (journeyStages.length - 1)) * i;
const AUTO_MS = 4200;

/** "The Journey of One Drop" — an interactive, keyboard-accessible pipe diagram. */
export default function FiltrationJourney() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { t, lang } = useLang();
  const stage = journeyStages[active];
  const st = jtext(stage, lang);
  const progress = active / (journeyStages.length - 1);
  const auto = playing && !hovered && !reduced && inView;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % journeyStages.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [auto, active]);

  const select = (i: number, focus = false) => {
    setActive(i);
    setPlaying(false);
    if (focus) tabs.current[i]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const n = journeyStages.length;
    const map: Record<string, number> = { ArrowRight: (active + 1) % n, ArrowDown: (active + 1) % n, ArrowLeft: (active - 1 + n) % n, ArrowUp: (active - 1 + n) % n, Home: 0, End: n - 1 };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  return (
    <section ref={root} className="section relative overflow-hidden bg-gradient-to-b from-pearl via-sky to-pearl" aria-labelledby="journey-title">
      <div className="container-royal">
        <SectionHeading
          id="journey-title"
          align="center"
          eyebrow={t('jr.eyebrow')}
          title={
            <>
              {t('jr.title')} <span className="accent">{t('jr.accent')}</span>
            </>
          }
          intro={t('jr.intro')}
        />

        <div className="mt-10 rounded-[26px] border border-ice/50 bg-white/70 p-4 shadow-soft sm:p-6" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)}>
          <div className="no-scrollbar -mx-2 overflow-x-auto px-2" data-lenis-prevent>
            <div className="relative mx-auto h-[150px] min-w-[620px] max-w-5xl">
              <svg viewBox="0 0 1000 150" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pipe-fill" x1="0" x2="1">
                    <stop offset="0" stopColor="#3D8FB8" />
                    <stop offset="1" stopColor="#202657" />
                  </linearGradient>
                </defs>
                <line x1={X0} x2={X1} y1="62" y2="62" stroke="#E4F5F8" strokeWidth="18" strokeLinecap="round" />
                <line x1={X0} x2={X1} y1="62" y2="62" stroke="#A9DCE7" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 10" />
                <motion.line
                  x1={X0}
                  y1="62"
                  y2="62"
                  initial={false}
                  animate={{ x2: X0 + (X1 - X0) * progress }}
                  transition={{ duration: 0.9, ease: EASE }}
                  stroke="url(#pipe-fill)"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
              {/* travelling drop */}
              <motion.div aria-hidden className="absolute top-[30px] -ml-[11px]" initial={false} animate={{ left: `${(nodeX(active) / 1000) * 100}%` }} transition={{ duration: 0.9, ease: EASE }}>
                <svg viewBox="0 0 24 32" className="h-[26px] w-[22px] drop-shadow-[0_6px_8px_rgb(61_143_184/0.45)]">
                  <path d="M12 1C12 1 2 13 2 20a10 10 0 0 0 20 0C22 13 12 1 12 1Z" fill="#3D8FB8" />
                  <ellipse cx="8.5" cy="19" rx="2.4" ry="3.6" fill="#fff" opacity="0.6" />
                </svg>
              </motion.div>
              <div role="tablist" aria-label={t('jr.stages')} aria-orientation="horizontal" onKeyDown={onKey}>
                {journeyStages.map((s, i) => {
                  const done = i <= active;
                  return (
                    <button
                      key={s.id}
                      ref={(el) => void (tabs.current[i] = el)}
                      role="tab"
                      id={`journey-tab-${s.id}`}
                      aria-selected={i === active}
                      aria-controls="journey-panel"
                      tabIndex={i === active ? 0 : -1}
                      onClick={() => select(i)}
                      className="group absolute top-[44px] flex w-[110px] -translate-x-1/2 cursor-pointer flex-col items-center gap-2 rounded-2xl pb-1 focus-visible:outline-offset-2"
                      style={{ left: `${(nodeX(i) / 1000) * 100}%` }}
                    >
                      <span
                        className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 font-display text-[0.95rem] transition-all duration-500 ${
                          i === active ? 'scale-110 border-gold bg-navy text-white shadow-gold' : done ? 'border-ocean bg-ocean text-white' : 'border-ice bg-white text-mist group-hover:border-ocean'
                        }`}
                      >
                        {i + 1}
                        {i === active && !reduced && <span className="absolute inset-0 rounded-full border border-gold animate-ripple" />}
                      </span>
                      <span className={`text-center text-[0.72rem] leading-tight tracking-wide ${i === active ? 'font-medium text-navy' : 'text-mist'}`}>{jtext(s, lang).label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 grid items-start gap-5 md:grid-cols-[1fr_auto]">
            <div id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${stage.id}`} aria-live="polite" className="min-h-[124px] rounded-[20px] bg-gradient-to-br from-aqua to-white p-5 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div key={stage.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
                  <p className="text-[0.66rem] font-medium tracking-[0.26em] text-gold-deep uppercase">
                    {t('jr.stageOf', { n: active + 1, total: journeyStages.length })}
                  </p>
                  <h3 className="mt-1 text-[1.7rem]">{st.title}</h3>
                  <p className="mt-1 max-w-2xl text-[0.94rem] text-mist">{st.body}</p>
                  {st.note && <p className="mt-2 text-[0.78rem] text-ocean italic">{st.note}</p>}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-3 md:flex-col md:items-end">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-ice/40" role="progressbar" aria-label={t('jr.progress')} aria-valuemin={1} aria-valuemax={journeyStages.length} aria-valuenow={active + 1}>
                <motion.div className="h-full rounded-full bg-gradient-to-r from-ocean to-navy" initial={false} animate={{ width: `${((active + 1) / journeyStages.length) * 100}%` }} transition={{ duration: 0.8, ease: EASE }} />
              </div>
              {!reduced && (
                <button type="button" onClick={() => setPlaying((p) => !p)} className="btn-ghost !min-h-9 !px-3 !py-1.5 !text-[0.74rem]" aria-pressed={playing}>
                  {playing ? <Pause className="h-3.5 w-3.5" aria-hidden /> : <Play className="h-3.5 w-3.5" aria-hidden />}
                  {playing ? t('jr.pause') : t('jr.play')}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <p className="text-[0.8rem] text-mist italic">{t('jr.disclaimer')}</p>
          <Link to="/products?category=home-ro" className="btn-primary">
            {t('jr.explore')} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
