import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarCheck, Phone } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { telLink } from '../../data/business';
import { messages, whatsappLink } from '../../lib/whatsapp';
import { bookPath } from './nav';
import { EASE } from '../../lib/motion';
import { useLang } from '../../i18n/LanguageProvider';

/** Desktop: floating WhatsApp + Call. Mobile: fixed bottom bar. Both hide while a form field is focused. */
export default function FloatingContact() {
  const [typing, setTyping] = useState(false);
  const [shown, setShown] = useState(false);
  const { pathname } = useLocation();
  const { t } = useLang();

  useEffect(() => {
    const isField = (t: EventTarget | null) => t instanceof HTMLElement && t.matches('input, textarea, select');
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    const onScroll = () => setShown(window.scrollY > 240 || pathname !== '/');
    onScroll();
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  const visible = shown && !typing;

  return (
    <>
      {/* Desktop floating buttons */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed right-5 bottom-5 z-40 hidden flex-col gap-3 lg:flex"
          >
            <a
              href={whatsappLink(messages.general())}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('cta.chatWhatsapp')}
              className="group relative inline-flex h-13 w-13 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-lift transition-transform hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 rounded-full bg-[#1fa855] animate-ripple" aria-hidden />
              <WhatsAppIcon className="relative h-6 w-6" />
            </a>
            <a href={telLink} aria-label={t('cta.callZamzam')} className="inline-flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br from-navy-soft to-navy text-white shadow-lift transition-transform hover:-translate-y-0.5">
              <Phone className="h-5 w-5" aria-hidden />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile action bar — the footer reserves space for it (pb-24) */}
      <motion.nav
        aria-label={t('nav.quick')}
        initial={false}
        animate={{ y: typing ? 90 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-ice/60 bg-pearl/90 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
      >
        <ul className="grid grid-cols-3 gap-2">
          <li>
            <a href={telLink} className="flex flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[0.7rem] font-medium text-navy">
              <Phone className="h-5 w-5" aria-hidden /> {t('cta.call')}
            </a>
          </li>
          <li>
            <a href={whatsappLink(messages.general())} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-0.5 rounded-2xl bg-[#1fa855] py-1.5 text-[0.7rem] font-medium text-white">
              <WhatsAppIcon className="h-5 w-5" /> {t('cta.whatsapp')}
            </a>
          </li>
          <li>
            <Link to={bookPath()} className="flex flex-col items-center gap-0.5 rounded-2xl bg-navy py-1.5 text-[0.7rem] font-medium text-white">
              <CalendarCheck className="h-5 w-5" aria-hidden /> {t('cta.book')}
            </Link>
          </li>
        </ul>
      </motion.nav>
    </>
  );
}
