import { AnimatePresence, motion } from 'motion/react';
import { useLang } from '../../i18n/LanguageProvider';
import { EASE } from '../../lib/motion';

const CARDS = {
  en: { src: '/images/zamzam-business-card-sm.webp', full: '/images/zamzam-business-card.webp', w: 1280, h: 729 },
  ta: { src: '/images/zamzam-business-card-tamil-sm.webp', full: '/images/zamzam-business-card-tamil.webp', w: 1400, h: 756 },
};

/** The official business card — English or Tamil, following the language switch. */
export default function BusinessCard({ className = '' }: { className?: string }) {
  const { lang, t } = useLang();
  const card = CARDS[lang];
  return (
    <figure className={`relative overflow-hidden rounded-[26px] border border-ice/50 bg-white p-3 shadow-soft ${className}`}>
      <div className="relative overflow-hidden rounded-[20px]" style={{ aspectRatio: `${card.w} / ${card.h}` }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={lang}
            src={card.src}
            srcSet={`${card.src} 640w, ${card.full} 1400w`}
            sizes="(min-width: 1024px) 560px, 92vw"
            alt={t('ab.card')}
            lang={lang === 'ta' ? 'ta' : 'en'}
            loading="lazy"
            initial={{ opacity: 0, rotateY: -12, scale: 0.98 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 12, scale: 0.98 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>
    </figure>
  );
}
