import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, Phone } from 'lucide-react';
import Logo from '../ui/Logo';
import MobileMenu from './MobileMenu';
import { navItems, bookPath } from './nav';
import { business, telLink } from '../../data/business';
import { useLang } from '../../i18n/LanguageProvider';
import LanguageSwitch from '../../i18n/LanguageSwitch';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <>
      <a href="#main" className="sr-only z-[90] rounded-full bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        {t('nav.skip')}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-16 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled ? 'border-ice/50 bg-pearl/80 shadow-[0_10px_30px_-24px_rgb(32_38_87/0.5)]' : 'border-white/30 bg-pearl/65'
        } backdrop-blur-xl backdrop-saturate-150`}
      >
        <div className="container-royal flex h-16 items-center justify-between gap-4">
          <Logo />
          <nav aria-label={t('nav.main')} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <li key={item.to} className="relative">
                    <NavLink
                      to={item.to}
                      aria-current={active ? 'page' : undefined}
                      className={`relative z-10 block rounded-full px-3 py-2 text-[0.8rem] tracking-[0.06em] whitespace-nowrap transition-colors xl:px-3.5 ${active ? 'text-navy' : 'text-mist hover:text-navy'}`}
                    >
                      {t(item.label)}
                    </NavLink>
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-full bg-white shadow-[0_6px_16px_-10px_rgb(32_38_87/0.45)] ring-1 ring-ice/60"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      >
                        <span className="absolute -bottom-px left-1/2 h-px w-5 -translate-x-1/2 bg-gold" />
                      </motion.span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <a href={telLink} className="hidden items-center gap-2 text-[0.8rem] font-medium tracking-wide text-navy 2xl:inline-flex">
              <Phone className="h-3.5 w-3.5 text-gold-deep" aria-hidden />
              {business.phoneDisplay}
            </a>
            <NavLink to={bookPath('RO Repair & Service')} className="btn-primary hidden !min-h-10 !px-4 !py-2 sm:inline-flex lg:hidden xl:inline-flex">
              {t('cta.bookService')}
            </NavLink>
            <button
              ref={toggleRef}
              type="button"
              aria-label={t('nav.openMenu')}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-navy/10 bg-white/80 text-navy lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} returnFocus={toggleRef} isActive={isActive} />
    </>
  );
}
