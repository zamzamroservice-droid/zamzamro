import { motion } from 'motion/react';
import { useLang } from './LanguageProvider';

/** EN | தமிழ் segmented switch with a sliding pearl indicator. */
export default function LanguageSwitch({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { lang, setLang } = useLang();
  const dark = tone === 'dark';
  return (
    <div
      role="group"
      aria-label="Language / மொழி"
      className={`relative inline-flex h-9 items-center rounded-full p-1 text-[0.74rem] font-medium ${dark ? 'bg-white/10 ring-1 ring-white/25' : 'bg-white/80 ring-1 ring-ice/70'}`}
    >
      {(['en', 'ta'] as const).map((l) => {
        const on = lang === l;
        return (
          <button
            key={l}
            type="button"
            lang={l === 'ta' ? 'ta' : 'en'}
            aria-pressed={on}
            onClick={() => setLang(l)}
            className={`relative z-10 cursor-pointer rounded-full px-3 py-1 transition-colors duration-300 ${on ? (dark ? 'text-navy' : 'text-white') : dark ? 'text-white/75' : 'text-navy/70 hover:text-navy'}`}
          >
            {on && (
              <motion.span
                layoutId={`lang-pill-${tone}`}
                className={`absolute inset-0 -z-10 rounded-full ${dark ? 'bg-pearl' : 'bg-gradient-to-br from-navy-soft to-navy'}`}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            {l === 'en' ? 'EN' : 'தமிழ்'}
          </button>
        );
      })}
    </div>
  );
}
