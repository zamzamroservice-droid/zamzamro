import { useEffect, useRef, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Phone, X } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { navItems, bookPath } from './nav';
import { business, telLink } from '../../data/business';
import { messages, whatsappLink } from '../../lib/whatsapp';
import { lockScroll, unlockScroll } from '../../lib/scroll';
import { EASE } from '../../lib/motion';
import { useLang } from '../../i18n/LanguageProvider';
import LanguageSwitch from '../../i18n/LanguageSwitch';

interface Props {
  open: boolean;
  onClose: () => void;
  returnFocus: RefObject<HTMLButtonElement | null>;
  isActive: (to: string) => boolean;
}

/** Full-screen navy overlay, portalled to <body> so it is never trapped inside the header. */
export default function MobileMenu({ open, onClose, returnFocus, isActive }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const prev = returnFocus.current;
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('button, a')?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>('a, button');
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      unlockScroll();
      prev?.focus();
    };
  }, [open, onClose, returnFocus]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.menu')}
          initial={{ clipPath: 'circle(0% at 92% 32px)' }}
          animate={{ clipPath: 'circle(150% at 92% 32px)' }}
          exit={{ clipPath: 'circle(0% at 92% 32px)' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-gradient-to-b from-navy to-navy-deep text-white lg:hidden"
          data-lenis-prevent
        >
          <div className="container-royal flex h-16 items-center justify-between">
            <span className="font-royal text-lg tracking-[0.14em]">{t('brand.name')}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('nav.closeMenu')}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <nav aria-label={t('nav.main')} className="container-royal flex-1 py-6">
            <ul className="space-y-1">
              {[...navItems, { to: '/faq', label: 'nav.faq' as const }].map((item, i) => (
                <motion.li key={item.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05, duration: 0.6, ease: EASE }}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    aria-current={isActive(item.to) ? 'page' : undefined}
                    className={`flex items-center justify-between border-b border-white/10 py-3.5 font-display text-[1.9rem] ${isActive(item.to) ? 'text-gold' : 'text-white'}`}
                  >
                    {t(item.label)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="container-royal grid gap-3 pb-10">
            <div className="flex justify-center pb-2">
              <LanguageSwitch tone="dark" />
            </div>
            <Link to={bookPath()} onClick={onClose} className="btn-gold w-full">
              {t('cta.bookAService')}
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={telLink} className="btn-light">
                <Phone className="h-4 w-4" aria-hidden /> {t('cta.call')}
              </a>
              <a href={whatsappLink(messages.general())} target="_blank" rel="noopener noreferrer" className="btn-light">
                <WhatsAppIcon /> {t('cta.whatsapp')}
              </a>
            </div>
            <p className="mt-2 text-center text-[0.8rem] text-white/60">{business.phoneDisplay}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
