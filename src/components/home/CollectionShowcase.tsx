import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import Swatches from '../ui/Swatches';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { featuredFour, fullName, productPath, ptext, type Product } from '../../data/products';
import { useLang } from '../../i18n/LanguageProvider';
import { messages, whatsappLink } from '../../lib/whatsapp';

/** Full-bleed editorial photo per card (the brand's own creative where it is landscape). */
const COVER: Record<string, string> = {
  'aqua-2090-raga': '/images/aqua-2090-raga-collection-sm.webp',
  'nile-aqua-innovica': '/images/nile-aqua-innovica-range-sm.webp',
  'lx-one-titanium': '/images/lx-one-titanium-gun-metal-sm.webp',
  'water-pia': '/images/water-pia-collection-sm.webp',
  'nile-aqua-jade': '/images/nile-aqua-jade-collection-sm.webp',
};

// Desktop "scattered prints": tilt (deg) and vertical offset (px) per card.
const TILT = [-2.2, 0.6, -0.4, 1.8];
const DROP = [0, 22, 18, 6];

/** A freshly uploaded photo (new-photos/) takes over the cover; otherwise the editorial creative. */
const cover = (p: Product) => (p.updatedAt ? p.images[0].sm : (COVER[p.slug] ?? p.images[0].sm));

const label = (p: Product) => (p.series ? `${p.brand} · ${p.series.split(' · ')[0]}` : p.brand);

/** Editorial collection — overlapping, tilted photo cards (desktop) and a swipeable row (mobile). */
export default function CollectionShowcase() {
  const { t, lang } = useLang();
  return (
    <section className="section relative overflow-hidden bg-[#f7f4ee]" aria-labelledby="collection-title">
      <div className="container-royal">
        <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow !text-mist">{t('col.eyebrow')}</p>
            <h2 id="collection-title" className="mt-4 text-[2.3rem] sm:text-[2.9rem] lg:text-[3.4rem]">
              {t('col.title')} <span className="accent">{t('col.accent')}</span>
            </h2>
          </div>
          <Link to="/products" className="group inline-flex items-center gap-3 self-start text-[0.78rem] font-medium tracking-[0.26em] text-navy uppercase lg:self-auto lg:pb-3">
            {t('cta.viewAllProducts')} <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>

        {/* Desktop: overlapping, tilted cards with a pearl caption panel */}
        <ul className="mx-auto mt-14 hidden max-w-[66rem] grid-cols-4 lg:grid">
          {featuredFour.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ type: 'spring', stiffness: 80, damping: 18, delay: i * 0.08 }}
              className="relative -mx-2.5 hover:z-20"
              style={{ zIndex: i === 1 || i === 2 ? 2 : 1 }}
            >
              <article
                className="group relative bg-pearl shadow-[0_24px_50px_-26px_rgb(28_32_66/0.45),0_4px_12px_-6px_rgb(28_32_66/0.12)] transition-[transform,box-shadow] duration-700 hover:shadow-[0_34px_60px_-26px_rgb(28_32_66/0.5)] [transform:rotate(var(--tilt))_translateY(var(--drop))] hover:[transform:rotate(0deg)_translateY(-8px)]"
                style={{ ['--tilt' as string]: `${TILT[i]}deg`, ['--drop' as string]: `${DROP[i]}px`, transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={cover(p)}
                    alt={p.images[0].alt}
                    loading="lazy"
                    className="aspect-[4/3.1] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                  />
                  <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgb(255_255_255/0.28)_50%,transparent_65%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
                <div className="px-6 pt-5 pb-6">
                  <p className="text-[0.62rem] font-medium tracking-[0.24em] text-gold-deep uppercase">{label(p)}</p>
                  <h3 className="mt-2 text-[1.55rem] leading-tight">
                    <Link to={productPath(p)} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
                      {fullName(p)}
                    </Link>
                  </h3>
                  <p className="mt-1 line-clamp-1 text-[0.8rem] text-mist">{ptext(p, lang).short}</p>
                  <div className="relative z-10 mt-4 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-[0.66rem] font-medium tracking-[0.24em] text-navy/80 uppercase">
                      {t('cta.viewProduct')} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <a
                      href={whatsappLink(messages.product(p))}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t('cta.enquireAbout', { name: fullName(p) })}
                      className="text-[#1f9d52] transition-transform hover:scale-110"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="relative z-10 mt-3">
                    <Swatches colours={p.colours} />
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>

        {/* Mobile / tablet: swipeable row, caption under the photo */}
        <ul className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:hidden" aria-label={t('col.aria')}>
          {featuredFour.map((p) => (
            <li key={p.slug} className="w-[84%] shrink-0 snap-start sm:w-[46%]">
              <article className="group relative">
                <img src={cover(p)} alt={p.images[0].alt} loading="lazy" className="aspect-[3/2] w-full object-cover" />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-[0.66rem] font-medium tracking-[0.24em] text-gold-deep uppercase">{label(p)}</p>
                  <ArrowUpRight className="h-5 w-5 text-mist" aria-hidden />
                </div>
                <h3 className="mt-1.5 text-[1.6rem] leading-tight">
                  <Link to={productPath(p)} className="after:absolute after:inset-0 after:content-['']">
                    {fullName(p)}
                  </Link>
                </h3>
                <p className="mt-1 text-[0.84rem] text-mist">{ptext(p, lang).short}</p>
                <div className="relative z-10 mt-3 flex items-center justify-between gap-3">
                  <Swatches colours={p.colours} />
                  <a
                    href={whatsappLink(messages.product(p))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.74rem] font-medium text-[#1f9d52]"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> {t('cta.enquire')}
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
