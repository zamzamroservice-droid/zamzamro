import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/LanguageProvider';

interface LogoProps {
  tone?: 'navy' | 'light';
  compact?: boolean;
  className?: string;
}

/** Navy water-drop emblem + wordmark — "ZAM ZAM / PURE WATER SYSTEM" or "ஜம் ஜம் / தூய குடிநீர் அமைப்பு". */
export default function Logo({ tone = 'navy', compact = false, className = '' }: LogoProps) {
  const { t, lang } = useLang();
  const light = tone === 'light';
  const ta = lang === 'ta';
  return (
    <Link to="/" aria-label={t('brand.home')} className={`group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap ${className}`}>
      <img
        src={light ? '/images/emblem-white.png' : '/images/emblem-navy.png'}
        alt=""
        width={30}
        height={42}
        className="h-10 w-auto transition-transform duration-500 group-hover:-translate-y-0.5"
      />
      <span className="flex flex-col leading-none">
        <span className={`${ta ? 'font-["Noto_Serif_Tamil"] text-[1.12rem] font-semibold tracking-normal' : 'font-royal text-[1.32rem] tracking-[0.08em]'} ${light ? 'text-white' : 'text-navy'}`}>
          {t('brand.name')}
        </span>
        {!compact && (
          <span className={`mt-1 ${ta ? 'text-[0.6rem] tracking-normal' : 'font-royal text-[0.55rem] tracking-[0.26em]'} ${light ? 'text-ice' : 'text-navy-soft'}`}>{t('brand.sub')}</span>
        )}
      </span>
    </Link>
  );
}
