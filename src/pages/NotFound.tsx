import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Home } from 'lucide-react';
import Seo from '../components/ui/Seo';
import { useLang } from '../i18n/LanguageProvider';

export default function NotFound() {
  const { pathname } = useLocation();
  const { t } = useLang();
  return (
    <>
      <Seo title="Page not found | Zam Zam Pure Water System" description="This page has evaporated. Return home or explore our purifiers." path={pathname} noindex />
      <section className="water-soft flex min-h-[86svh] items-center justify-center px-4 pt-24 pb-16 text-center">
        <div>
          <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
            {[0, 0.9, 1.8].map((d) => (
              <span key={d} aria-hidden className="absolute inset-8 rounded-full border border-ocean/30 animate-ripple" style={{ animationDelay: `${d}s` }} />
            ))}
            <motion.img
              src="/images/emblem-navy.png"
              alt=""
              className="relative h-28 w-auto"
              animate={{ y: [0, -12, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <p className="eyebrow mt-6 justify-center">{t('nf.eyebrow')}</p>
          <h1 className="mt-3 text-[2.6rem] sm:text-[3.4rem]">
            {t('nf.title')} <span className="accent">{t('nf.accent')}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-mist">{t('nf.text')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary">
              <Home className="h-4 w-4" aria-hidden /> {t('cta.returnHome')}
            </Link>
            <Link to="/products" className="btn-ghost">
              {t('cta.exploreProducts')} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
