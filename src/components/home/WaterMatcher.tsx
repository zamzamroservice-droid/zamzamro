import { useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { Building2, Droplet, Factory, Info, Landmark, Truck, Waves } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import ProductVisual from '../ui/ProductVisual';
import { fullName, productPath, products, ptext, type Product, type WaterSourceId } from '../../data/products';
import { messages, whatsappLink } from '../../lib/whatsapp';
import { useLang } from '../../i18n/LanguageProvider';
import { EASE } from '../../lib/motion';

const SOURCES: { id: WaterSourceId; label: string; icon: LucideIcon }[] = [
  { id: 'borewell', label: 'Borewell', icon: Droplet },
  { id: 'tanker', label: 'Tanker', icon: Truck },
  { id: 'municipal', label: 'Municipal', icon: Landmark },
  { id: 'corporation', label: 'Corporation', icon: Building2 },
  { id: 'open-well', label: 'Open Well', icon: Waves },
  { id: 'business', label: 'Office / Business', icon: Factory },
];

function band(tds: number) {
  if (tds < 150) return { label: 'wm.band.low', tone: '#7fc8e6' } as const;
  if (tds < 500) return { label: 'wm.band.moderate', tone: '#5aa9cf' } as const;
  if (tds < 1000) return { label: 'wm.band.elevated', tone: '#c6ad7c' } as const;
  return { label: 'wm.band.high', tone: '#a68a55' } as const;
}

/** Preliminary suggestions from verified catalogue tags only. */
function suggest(source: WaterSourceId, tds: number): Product[] {
  if (source === 'business') return products.filter((p) => p.suits?.business).slice(0, 3);
  const home = products.filter((p) => p.category === 'home-ro');
  const scored = home
    .map((p) => {
      let score = p.featured ? 1 : 0;
      if (p.suits?.sources?.includes(source)) score += 2;
      if (tds >= 500 && p.suits?.highTds) score += 4;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
  const picks = scored.slice(0, 2);
  // Hard-water-prone sources: suggest a softener as a complementary option.
  if (source === 'borewell' || source === 'open-well') picks.push(products.find((p) => p.slug === 'whole-house-water-softener')!);
  else picks.push(scored[2]);
  return picks;
}

export default function WaterMatcher() {
  const [source, setSource] = useState<WaterSourceId>('borewell');
  const [tds, setTds] = useState(650);
  const sliderId = useId();
  const picks = useMemo(() => suggest(source, tds), [source, tds]);
  const b = band(tds);
  const { t, lang } = useLang();
  const sourceLabel = SOURCES.find((s) => s.id === source)!.label; // English, for the WhatsApp message
  const sourceText = t(`wm.src.${source}`);
  const particles = Math.round(4 + (tds / 2000) * 26);
  const glassRef = useRef<SVGSVGElement>(null);
  const glassInView = useInView(glassRef);

  return (
    <section className="section relative" aria-labelledby="matcher-title">
      <div className="container-royal">
        <SectionHeading
          id="matcher-title"
          eyebrow={t('wm.eyebrow')}
          title={
            <>
              {t('wm.title')} <span className="accent">{t('wm.accent')}</span>
            </>
          }
          intro={t('wm.intro')}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card-royal p-5 sm:p-7">
            <fieldset>
              <legend className="text-[0.7rem] font-medium tracking-[0.24em] text-gold-deep uppercase">{t('wm.source')}</legend>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {SOURCES.map((s) => {
                  const on = s.id === source;
                  return (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-2xl border px-3 py-3 text-[0.86rem] transition-all duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ocean ${
                        on ? 'border-navy bg-navy text-white shadow-soft' : 'border-ice/70 bg-pearl text-navy hover:border-ocean/50'
                      }`}
                    >
                      <input type="radio" name="water-source" value={s.id} checked={on} onChange={() => setSource(s.id)} className="sr-only" />
                      <s.icon className={`h-4 w-4 shrink-0 ${on ? 'text-gold' : 'text-ocean'}`} aria-hidden />
                      {t(`wm.src.${s.id}`)}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-7">
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor={sliderId} className="text-[0.7rem] font-medium tracking-[0.24em] text-gold-deep uppercase">
                  {t('wm.tds')}
                </label>
                <output htmlFor={sliderId} className="font-display text-[1.9rem] leading-none text-navy">
                  {tds} <span className="font-sans text-[0.8rem] text-mist">ppm</span>
                </output>
              </div>
              <input
                id={sliderId}
                type="range"
                min={50}
                max={2000}
                step={10}
                value={tds}
                onChange={(e) => setTds(Number(e.target.value))}
                aria-valuetext={t('wm.ppm', { n: tds })}
                className="mt-4 w-full cursor-pointer accent-navy"
              />
              <div className="mt-1 flex justify-between text-[0.7rem] text-mist">
                <span>50</span>
                <span>500</span>
                <span>1000</span>
                <span>2000</span>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-5 rounded-[20px] bg-gradient-to-br from-aqua to-white p-4">
              {/* animated glass: more dissolved particles at higher TDS */}
              <svg ref={glassRef} viewBox="0 0 80 110" className="h-28 w-20 shrink-0" aria-hidden>
                <defs>
                  <clipPath id="glass-clip">
                    <path d="M14 8h52l-6 94H20Z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#glass-clip)">
                  <motion.rect x="0" width="80" height="110" initial={false} animate={{ y: 26, fill: b.tone }} transition={{ duration: 0.6 }} opacity="0.35" />
                  {Array.from({ length: particles }, (_, i) => (
                    <motion.circle
                      key={i}
                      r={1 + (i % 3) * 0.5}
                      cx={20 + ((i * 13) % 40)}
                      initial={{ cy: 100 }}
                      animate={glassInView ? { cy: [100 - (i % 5) * 4, 34 + (i % 7) * 6] } : { cy: 70 - (i % 7) * 4 }}
                      transition={{ duration: 3 + (i % 4), repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: i * 0.12 }}
                      fill="#202657"
                      opacity="0.35"
                    />
                  ))}
                </g>
                <path d="M14 8h52l-6 94H20Z" fill="none" stroke="#202657" strokeOpacity="0.45" strokeWidth="2" />
              </svg>
              <div>
                <p className="font-display text-[1.35rem] text-navy">{t(b.label)}</p>
                <p className="text-[0.85rem] text-mist">
                  {t('wm.desc', { source: sourceText, tds })}
                </p>
                <p className="mt-2 flex gap-1.5 text-[0.76rem] text-mist">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ocean" aria-hidden />
                  {t('wm.caveat')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-[26px] bg-gradient-to-br from-navy to-navy-deep p-5 text-white shadow-lift sm:p-7">
            <p className="text-[0.7rem] font-medium tracking-[0.24em] text-gold uppercase">{t('wm.suggest')}</p>
            <ul className="mt-4 space-y-3" aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                {picks.map((p) => (
                  <motion.li key={p.slug} layout initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.45, ease: EASE }}>
                    <Link to={productPath(p)} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2.5 transition-colors hover:bg-white/10">
                      <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                        <ProductVisual product={p} className="h-full w-full p-1" />
                      </span>
                      <span>
                        <span className="block text-[0.6rem] tracking-[0.22em] text-gold uppercase">{p.brand}</span>
                        <span className="block font-display text-[1.2rem] leading-tight">{fullName(p)}</span>
                        <span className="block text-[0.76rem] text-white/65">{ptext(p, lang).short}</span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <p className="mt-4 mb-5 text-[0.76rem] text-white/60">
              {t('wm.note')}
            </p>
            <a href={whatsappLink(messages.waterCheck(sourceLabel, tds))} target="_blank" rel="noopener noreferrer" className="btn-gold mt-auto w-full">
              <WhatsAppIcon /> {t('wm.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
