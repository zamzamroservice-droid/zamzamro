import { Link } from 'react-router-dom';
import { Clock, MapPin, Phone } from 'lucide-react';
import Logo from '../ui/Logo';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { navItems } from './nav';
import { business, fullAddress, fullAddressTa, mapsLink, telLink } from '../../data/business';
import { useLang } from '../../i18n/LanguageProvider';
import { services, stext } from '../../data/services';
import { messages, whatsappLink } from '../../lib/whatsapp';

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="relative mt-10 bg-gradient-to-b from-navy to-navy-deep pb-24 text-white/80 lg:pb-0">
      <svg aria-hidden viewBox="0 0 1440 70" preserveAspectRatio="none" className="absolute inset-x-0 -top-[39px] h-10 w-full text-navy">
        <path fill="currentColor" d="M0 40c180-26 360-34 540-16s360 30 540 12 270-24 360-20v54H0Z" />
      </svg>
      <div className="container-royal grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-[0.9rem] text-white/70">
            {t('ft.about')}
          </p>
          <p className="mt-4 font-display text-[1.35rem] text-gold italic">{t('brand.tagline')}.</p>
        </div>
        <div>
          <h2 className="font-sans text-[0.68rem] font-medium tracking-[0.3em] text-gold uppercase">{t('ft.explore')}</h2>
          <ul className="mt-4 space-y-2 text-[0.9rem]">
            {[...navItems, { to: '/faq', label: 'nav.faq' as const }].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition-colors hover:text-white">
                  {t(n.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-[0.68rem] font-medium tracking-[0.3em] text-gold uppercase">{t('ft.services')}</h2>
          <ul className="mt-4 space-y-2 text-[0.9rem]">
            {services.slice(0, 7).map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className="transition-colors hover:text-white">
                  {stext(s, lang).name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-[0.68rem] font-medium tracking-[0.3em] text-gold uppercase">{t('ft.visit')}</h2>
          <address className="mt-4 space-y-3 text-[0.9rem] not-italic">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 hover:text-white">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
              {lang === 'ta' ? fullAddressTa : fullAddress}
            </a>
            <a href={telLink} className="flex items-center gap-2.5 hover:text-white">
              <Phone className="h-4 w-4 text-gold" aria-hidden />
              {business.phoneDisplay}
            </a>
            <a href={whatsappLink(messages.general())} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white">
              <WhatsAppIcon className="h-4 w-4 text-gold" />
              {t('cta.chatWhatsapp')}
            </a>
            {business.hours.length > 0 && (
              <div className="flex gap-2.5">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <ul>
                  {business.hours.map((h) => (
                    <li key={h.days}>
                      {h.days}: {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-royal flex flex-col gap-3 py-5 text-[0.78rem] text-white/55 sm:flex-row sm:items-center sm:justify-between lg:pr-24">
          <p>
            © {new Date().getFullYear()} {t('brand.full')}, {t('brand.erode')}. {t('ft.rights')}
          </p>
          <ul className="flex gap-5">
            <li>
              <Link to="/privacy" className="hover:text-white">{t('nav.privacy')}</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white">{t('nav.faq')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
