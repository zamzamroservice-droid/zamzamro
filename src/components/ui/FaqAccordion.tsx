import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { ftext, type Faq } from '../../data/faqs';
import { useLang } from '../../i18n/LanguageProvider';
import { EASE } from '../../lib/motion';

/** Accessible accordion: buttons with aria-expanded / aria-controls, regions labelled by their question. */
export default function FaqAccordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  const { lang } = useLang();
  return (
    <div className="divide-y divide-ice/60 overflow-hidden rounded-[26px] border border-ice/50 bg-white/80">
      {items.map((f, i) => {
        const isOpen = open === i;
        const btn = `${base}-q${i}`;
        const panel = `${base}-a${i}`;
        const txt = ftext(f, lang);
        return (
          <div key={f.q}>
            <h3 className="font-sans text-[0.98rem] font-medium text-navy">
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-aqua/50 sm:px-6"
              >
                <span>{txt.q}</span>
                <Plus aria-hidden className={`h-4 w-4 shrink-0 text-gold-deep transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[0.94rem] text-mist sm:px-6">{txt.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
