import { useEffect, useState } from 'react';
import { business } from '../../data/business';
import { useLang } from '../../i18n/LanguageProvider';

function erodeTime(locale = 'en-IN') {
  return new Intl.DateTimeFormat(locale, { timeZone: business.timeZone, hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date());
}
function erodeDay(locale = 'en-IN') {
  return new Intl.DateTimeFormat(locale, { timeZone: business.timeZone, weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
}

/** Restrained radar-style location visual with the current time in Erode. */
export default function LocationRadar() {
  const { t, lang } = useLang();
  const locale = lang === 'ta' ? 'ta-IN' : 'en-IN';
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 20_000);
    return () => clearInterval(id);
  }, []);
  const time = erodeTime(locale);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[20rem]">
      <div aria-hidden className="absolute inset-0 rounded-full border border-white/20 bg-[radial-gradient(circle,rgb(169_220_231/0.18),transparent_70%)]" />
      <div aria-hidden className="absolute inset-[16%] rounded-full border border-white/15" />
      <div aria-hidden className="absolute inset-[32%] rounded-full border border-white/15" />
      <div aria-hidden className="absolute inset-0 animate-[spin_7s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,rgb(198_173_124/0.35),transparent_22%)] motion-reduce:hidden" />
      <span aria-hidden className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_6px_rgb(198_173_124/0.25)]" />
      <span aria-hidden className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold animate-ripple" />
      <div className="absolute inset-x-0 bottom-[12%] text-center">
        <p className="text-[0.62rem] tracking-[0.3em] text-white/60 uppercase">{t('ct.radar')}</p>
        <p className="font-display text-[2rem] leading-tight text-white" aria-live="off">
          <time>{time}</time>
        </p>
        <p className="text-[0.72rem] text-white/60">{erodeDay(locale)}</p>
      </div>
    </div>
  );
}
