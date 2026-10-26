import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ErrorBoundary from '../ui/ErrorBoundary';
import Swatches from '../ui/Swatches';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { HERO_STAGES, heroStore, stageIndex } from './heroStore';
import { fullName, getProduct, productPath } from '../../data/products';
import { useLang } from '../../i18n/LanguageProvider';
import { bookPath } from '../layout/nav';
import { messages, whatsappLink } from '../../lib/whatsapp';
import { useMedia } from '../../hooks/useMedia';
import { EASE, range } from '../../lib/motion';
import { HEADER_OFFSET, scrollToY } from '../../lib/scroll';

const PurifierCanvas = lazy(() => import('./PurifierCanvas'));
const zempure = getProduct('aqua-era-zempure')!;

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

const FILTER_STAGES = ['hero.st.sediment', 'hero.st.carbon', 'hero.st.ro', 'hero.st.mineral'] as const;

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const mobile = useMedia('(max-width: 767px)');
  // Stacked layout (copy above the product) on phones and on portrait screens such as tablets.
  const stacked = useMedia('(max-width: 767px), (max-aspect-ratio: 21/20)');
  const [webgl] = useState(hasWebGL);
  const [failed, setFailed] = useState(false);
  // Scroll-driven, so it only moves when the visitor scrolls — kept on for reduced-motion users too
  // (ambient CSS loops are still switched off for them in index.css).
  const animated = webgl && !failed;

  const section = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [active, setActive] = useState(true);
  const [loadCanvas, setLoadCanvas] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [finishId, setFinishId] = useState(zempure.colours[0].id);
  const finish = zempure.colours.find((c) => c.id === finishId)!;

  // Load the 3D chunk only after the preloader, when the browser is idle.
  useEffect(() => {
    if (!ready || !animated) return;
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const id = ric(() => setLoadCanvas(true));
    return () => (window.cancelIdleCallback ?? clearTimeout)(id as number);
  }, [ready, animated]);

  // Scroll progress → shared store (read by the WebGL scene) + CSS variables (backgrounds) + stage captions.
  useEffect(() => {
    if (!animated) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = section.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      heroStore.progress = p;
      heroStore.invalidate();
      sticky.current?.style.setProperty('--sea', range(p, 0.45, 0.8).toFixed(3));
      sticky.current?.style.setProperty('--hint', (1 - range(p, 0, 0.04)).toFixed(3));
      const s = stageIndex(p);
      setStage((prev) => (prev === s ? prev : s));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [animated]);

  // Pause rendering when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    let inView = true;
    const sync = () => setActive(inView && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  const jumpTo = (at: number) => {
    const el = section.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY + at * (el.offsetHeight - window.innerHeight) + 2;
    scrollToY(top);
  };

  const photo = zempure.images[finish.image ?? 0];

  const pickFinish = (id: string) => {
    setFinishId(id);
    heroStore.finish = id as typeof heroStore.finish;
    heroStore.invalidate();
  };

  return (
    <section
      ref={section}
      aria-label={t('hero.aria')}
      className={`relative bg-navy-deep ${animated ? 'h-[380vh] md:h-[420vh]' : ''}`}
    >
      <div ref={sticky} className={`${animated ? 'sticky top-0 h-svh' : 'relative min-h-svh'} overflow-hidden`} style={{ ['--sea' as string]: 0, ['--hint' as string]: 1 }}>
        {/* Living water: underwater sun rays → turquoise sea surface */}
        <div aria-hidden className={`pointer-events-none absolute inset-0 ${active ? '' : 'zz-paused'}`}>
          <picture>
            <source media="(max-width: 768px)" srcSet="/images/water-underwater-rays-sm.webp" />
            <img src="/images/water-underwater-rays.webp" alt="" className="zz-drift absolute inset-0 h-full w-full object-cover" style={{ opacity: 'calc(1 - var(--sea) * 0.85)' }} />
          </picture>
          <picture>
            <source media="(max-width: 768px)" srcSet="/images/water-turquoise-surface-sm.webp" />
            <img src="/images/water-turquoise-surface.webp" alt="" loading="lazy" className="zz-drift absolute inset-0 h-full w-full object-cover" style={{ opacity: 'var(--sea)' }} />
          </picture>
          <div className="zz-rays absolute -inset-x-1/4 inset-y-0" style={{ opacity: 'calc(0.9 - var(--sea) * 0.6)' }} />
          <div className="zz-caustics absolute inset-0" />
          {Array.from({ length: mobile ? 5 : 12 }, (_, i) => (
            <span
              key={i}
              className="zz-bubble"
              style={{ left: `${(i * 41) % 100}%`, width: 4 + ((i * 5) % 9), height: 4 + ((i * 5) % 9), animationDuration: `${10 + ((i * 7) % 10)}s`, animationDelay: `${-i * 1.9}s` }}
            />
          ))}
          {/* legibility veil — keeps the background from competing with the product & copy */}
          <div className={`absolute inset-0 ${stacked ? 'bg-[linear-gradient(180deg,rgb(20_24_56/0.78)_0%,rgb(20_24_56/0.3)_48%,rgb(20_24_56/0.35)_100%)]' : 'bg-[linear-gradient(90deg,rgb(20_24_56/0.82)_0%,rgb(20_24_56/0.45)_42%,rgb(20_24_56/0.1)_70%)]'}`} />
        </div>

        {/* Static product visual: fallback (no WebGL) and placeholder while 3D loads */}
        <AnimatePresence>
          {(!animated || !canvasReady) && (
            <motion.div
              key="static"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className={stacked ? 'absolute inset-x-0 bottom-[118px] flex justify-center' : 'absolute inset-y-0 right-[6%] flex w-[44%] items-center justify-center'}
            >
              <div className={`relative ${stacked ? 'w-[min(62vw,260px)]' : 'w-[min(30vw,360px)]'}`}>
                <div className="absolute -inset-4 rounded-t-full rounded-b-[34px] bg-gradient-to-b from-white/25 to-white/5 ring-1 ring-white/30 backdrop-blur-sm" />
                <div className="relative overflow-hidden rounded-t-full rounded-b-[28px] bg-white p-4 pt-10 shadow-lift">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={photo.src}
                      src={photo.sm}
                      alt={photo.alt}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="aspect-[4/5] w-full object-contain"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WebGL purifier */}
        {animated && loadCanvas && (
          <ErrorBoundary onError={() => setFailed(true)} fallback={null}>
            <Suspense fallback={null}>
              <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: canvasReady ? 1 : 0 }} transition={{ duration: 1, ease: EASE }}>
                <PurifierCanvas mobile={mobile} stacked={stacked} active={active} onReady={() => setCanvasReady(true)} />
              </motion.div>
            </Suspense>
          </ErrorBoundary>
        )}

        {/* Copy — one panel per stage. The H1 stays in the DOM for every stage. */}
        <div className="pointer-events-none relative z-10 h-full">
          <div className="container-royal relative h-full">
            <div className={stacked ? 'absolute inset-x-4 top-[84px] sm:inset-x-6 sm:top-[96px]' : 'absolute top-1/2 left-4 w-[min(46%,34rem)] -translate-y-1/2 sm:left-6 lg:left-8'}>
              <motion.div
                className="pointer-events-auto"
                aria-hidden={animated && stage !== 0}
                initial={false}
                animate={{ opacity: !animated || stage === 0 ? 1 : 0, y: !animated || stage === 0 ? 0 : -16 }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{ visibility: !animated || stage === 0 ? 'visible' : 'hidden' }}
              >
                <motion.p initial={{ opacity: 0, y: 12 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1, ease: EASE }} className="eyebrow text-gold">
                  {t('hero.eyebrow')}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={ready ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.2, ease: EASE }}
                  className="mt-3 text-[2.55rem] text-white sm:text-[3.4rem] lg:text-[4.3rem]"
                >
                  {t('hero.title')} <span className="accent text-gold">{t('hero.accent')}</span> {t('hero.title2')}
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.4 }} className="mt-3 max-w-md text-[0.98rem] text-white/80 sm:text-[1.05rem]">
                  {t('hero.sub')}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.55, ease: EASE }} className="mt-6 flex flex-wrap gap-3">
                  <Link to="/products" className="btn-gold">
                    {t('cta.explorePurifiers')} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link to={bookPath('RO Repair & Service')} className="btn-light">
                    {t('cta.bookAService')}
                  </Link>
                </motion.div>
              </motion.div>

              {animated && (
                <AnimatePresence mode="wait">
                  {stage > 0 && (
                    <motion.div
                      key={stage}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className={`pointer-events-auto absolute inset-x-0 ${stacked ? 'top-0' : 'top-1/2 -translate-y-1/2'}`}
                      aria-live="polite"
                    >
                      {stage === 1 && (
                        <>
                          <p className="eyebrow text-gold">{t('hero.s1.eyebrow')}</p>
                          <h2 className="mt-3 text-[2.2rem] text-white sm:text-[3rem]">
                            {t('hero.s1.title')} <span className="accent text-gold">{t('hero.s1.accent')}</span>
                          </h2>
                          <ol className="mt-5 grid max-w-sm grid-cols-2 gap-2 text-[0.82rem] text-white/85">
                            {FILTER_STAGES.map((s, i) => (
                              <li key={s} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                                <span className="font-display text-gold italic">0{i + 1}</span> {t(s)}
                              </li>
                            ))}
                          </ol>
                          <p className="mt-3 text-[0.72rem] text-white/60">{t('hero.s1.note')}</p>
                        </>
                      )}
                      {stage === 2 && (
                        <>
                          <p className="eyebrow text-gold">{t('hero.s2.eyebrow')}</p>
                          <h2 className="mt-3 text-[2.2rem] text-white sm:text-[3rem]">
                            {t('hero.s2.title')} <span className="accent text-gold">{t('hero.s2.accent')}</span>
                          </h2>
                        </>
                      )}
                      {stage === 3 && (
                        <>
                          <p className="eyebrow text-gold">{t('hero.s3.eyebrow')}</p>
                          <h2 className="mt-3 text-[2.2rem] text-white sm:text-[3rem]">
                            {t('hero.s3.title')} <span className="accent text-gold">{t('hero.s3.accent')}</span>
                          </h2>
                          <div className="mt-6 flex flex-wrap gap-3">
                            <Link to={bookPath('Expert Installation', fullName(zempure))} className="btn-gold">
                              {t('cta.bookInstallation')}
                            </Link>
                            <a href={whatsappLink(messages.product(zempure, finish.name))} target="_blank" rel="noopener noreferrer" className="btn-light">
                              <WhatsAppIcon /> {t('cta.enquire')}
                            </a>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

        {/* Featured model chip — Zempure finish picker (recolours the 3D model) + link to the product page */}
        <div className={`absolute inset-x-0 z-20 ${stacked ? 'bottom-[76px] lg:bottom-7' : 'bottom-7'}`}>
          <div className={`container-royal flex ${stacked ? 'justify-center' : 'justify-start'}`}>
            <div className="flex items-center gap-3 rounded-full border border-white/25 bg-navy-deep/60 py-2 pr-2 pl-2 text-white shadow-lift backdrop-blur-md">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                <img src={zempure.images[finish.image ?? 0].sm} alt="" className="h-full w-full object-contain p-0.5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.6rem] tracking-[0.24em] text-gold uppercase">
                  {t('hero.featured')} · {zempure.series}
                </span>
                <span className="block font-display text-[1.05rem] whitespace-nowrap">{fullName(zempure)}</span>
              </span>
              <span className="mx-1 h-7 w-px bg-white/25" aria-hidden />
              <Swatches colours={zempure.colours} selected={finishId} onSelect={pickFinish} size="sm" label={t('hero.finish')} />
              <Link
                to={productPath(zempure, finish.id)}
                aria-label={`${fullName(zempure)} — ${finish.name}`}
                className="group ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
              >
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        {/* Progress rail (desktop) */}
        {animated && (
          <nav aria-label={t('hero.chapters')} className="absolute top-1/2 right-5 z-20 hidden -translate-y-1/2 lg:block">
            <ol className="relative flex flex-col gap-5">
              <span aria-hidden className="absolute top-1 bottom-1 left-[5px] w-px bg-white/25" />
              {HERO_STAGES.map((s, i) => (
                <li key={s.id}>
                  <button type="button" onClick={() => jumpTo(s.at)} className="group relative flex cursor-pointer items-center gap-3" aria-current={stage === i ? 'step' : undefined}>
                    <span className={`relative h-[11px] w-[11px] rounded-full border transition-all duration-500 ${stage >= i ? 'border-gold bg-gold' : 'border-white/50 bg-navy-deep'}`} />
                    <span className={`text-[0.66rem] tracking-[0.22em] uppercase transition-colors ${stage === i ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>{t(s.label)}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {/* Progress rail (mobile) */}
        {animated && (
          <div aria-hidden className={`absolute inset-x-4 top-[70px] z-20 flex gap-1.5 ${stacked ? 'lg:hidden' : 'hidden'}`}>
            {HERO_STAGES.map((s, i) => (
              <span key={s.id} className={`h-[2px] flex-1 rounded-full transition-colors duration-500 ${stage >= i ? 'bg-gold' : 'bg-white/25'}`} />
            ))}
          </div>
        )}

        {/* Scroll hint */}
        {animated && (
          <div aria-hidden className={`pointer-events-none absolute bottom-24 left-1/2 z-10 -translate-x-1/2 flex-col items-center gap-1 text-white/70 ${stacked ? 'hidden' : 'flex'}`} style={{ opacity: 'var(--hint)' }}>
            <span className="text-[0.62rem] tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
            <ChevronDown className="h-4 w-4 animate-float" />
          </div>
        )}
      </div>
      {/* Anchor for skip links after the hero */}
      <span id="after-hero" className="absolute bottom-0" style={{ scrollMarginTop: HEADER_OFFSET }} />
    </section>
  );
}
