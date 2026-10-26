import { useLang } from '../../i18n/LanguageProvider';

/** Animated SVG: tank → pipes → cartridges → tap → glass. CSS-driven; static under reduced motion. */
export default function InstallIllustration() {
  const { t } = useLang();
  return (
    <svg viewBox="0 0 360 300" role="img" aria-label={t('in.svg')} className="w-full drop-shadow-[0_20px_40px_rgb(0_0_0/0.25)]">
      <style>{`
        .flow{stroke-dasharray:6 10;animation:flow 1.2s linear infinite}
        @keyframes flow{to{stroke-dashoffset:-32}}
        .fill{transform-origin:0 100%;transform-box:fill-box;animation:fillup 4s cubic-bezier(.22,1,.36,1) infinite}
        @keyframes fillup{0%{transform:scaleY(.05)}70%,100%{transform:scaleY(1)}}
        .glow{animation:glow 3s ease-in-out infinite}
        .glow:nth-of-type(2){animation-delay:.5s}.glow:nth-of-type(3){animation-delay:1s}
        @keyframes glow{0%,100%{opacity:.35}50%{opacity:1}}
        .drip{animation:drip 1.2s ease-in infinite}
        @keyframes drip{0%{transform:translateY(0);opacity:1}100%{transform:translateY(34px);opacity:0}}
        @media (prefers-reduced-motion: reduce){.flow,.fill,.glow,.drip{animation:none}}
      `}</style>
      {/* tank */}
      <rect x="22" y="22" width="78" height="96" rx="12" fill="#ffffff" fillOpacity=".92" />
      <rect x="28" y="54" width="66" height="58" rx="8" fill="#A9DCE7" />
      <path d="M28 60c10-5 22 5 33 0s22-5 33 0" stroke="#fff" strokeWidth="2" fill="none" opacity=".7" />
      <text x="61" y="42" textAnchor="middle" fontSize="9" fill="#202657" fontFamily="Jost" letterSpacing="1">{t('in.svg.tank')}</text>
      {/* pipe from tank to purifier */}
      <path d="M61 118v40h70" stroke="#E4F5F8" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path className="flow" d="M61 118v40h70" stroke="#3D8FB8" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* purifier body + cartridges */}
      <rect x="130" y="110" width="132" height="150" rx="16" fill="#FAF9F6" />
      <rect x="130" y="110" width="132" height="150" rx="16" fill="none" stroke="#C6AD7C" strokeOpacity=".6" />
      {[150, 178, 206, 234].map((x, i) => (
        <g key={x}>
          <rect x={x - 9} y="128" width="18" height="86" rx="8" fill={['#ebe4d3', '#2e3138', '#dfe9f3', '#c4825a'][i]} />
          <rect className="glow" x={x - 11} y="126" width="22" height="90" rx="10" fill="none" stroke="#A9DCE7" strokeWidth="2" style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}
      <path d="M150 222h84" stroke="#E4F5F8" strokeWidth="6" strokeLinecap="round" />
      <path className="flow" d="M150 222h84" stroke="#3D8FB8" strokeWidth="2.5" strokeLinecap="round" />
      {/* tap */}
      <path d="M262 186h36v18" stroke="#c9ced6" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="284" y="176" width="22" height="12" rx="4" fill="#202657" />
      {/* drip + glass */}
      <circle className="drip" cx="298" cy="212" r="3.2" fill="#3D8FB8" />
      <g>
        <path d="M280 236h36l-4 44h-28z" fill="#ffffff" fillOpacity=".35" stroke="#ffffff" strokeOpacity=".9" strokeWidth="2" />
        <clipPath id="glass-in">
          <path d="M282 238h32l-4 40h-24z" />
        </clipPath>
        <g clipPath="url(#glass-in)">
          <rect className="fill" x="280" y="240" width="40" height="40" fill="#A9DCE7" />
        </g>
      </g>
      {/* drain */}
      <path d="M196 260v24h-60" stroke="#ffffff" strokeOpacity=".5" strokeWidth="4" fill="none" strokeDasharray="3 6" />
      <text x="128" y="296" fontSize="8" fill="#ffffff" fillOpacity=".7" fontFamily="Jost" letterSpacing="1">{t('in.svg.drain')}</text>
    </svg>
  );
}
