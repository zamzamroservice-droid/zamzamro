import { useLang } from '../../i18n/LanguageProvider';

/** "PURE" lettering filled with gently moving water and rising bubbles (static under reduced motion). */
export default function PureWater() {
  const { t } = useLang();
  return (
    <svg viewBox="0 0 400 170" role="img" aria-label={t('ab.pure')} className="w-full">
      <style>{`
        .pw-wave{animation:pw 6s linear infinite}
        @keyframes pw{to{transform:translateX(-200px)}}
        .pw-b{animation:pwb 5s ease-in infinite}
        @keyframes pwb{0%{transform:translateY(0);opacity:0}15%{opacity:.9}100%{transform:translateY(-90px);opacity:0}}
        @media (prefers-reduced-motion: reduce){.pw-wave,.pw-b{animation:none}}
      `}</style>
      <defs>
        <clipPath id="pure-clip">
          <text x="200" y="138" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontWeight="600" fontSize="150" letterSpacing="6">
            PURE
          </text>
        </clipPath>
        <linearGradient id="pure-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A9DCE7" />
          <stop offset="1" stopColor="#3D8FB8" />
        </linearGradient>
      </defs>
      <text x="200" y="138" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontWeight="600" fontSize="150" letterSpacing="6" fill="none" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.2">
        PURE
      </text>
      <g clipPath="url(#pure-clip)">
        <g className="pw-wave">
          <path d="M0 70 q50 -16 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 V170 H0Z" fill="url(#pure-water)" />
        </g>
        {[60, 130, 205, 280, 335].map((x, i) => (
          <circle key={x} className="pw-b" cx={x} cy={150} r={3 + (i % 3)} fill="#fff" fillOpacity=".7" style={{ animationDelay: `${i * 0.9}s` }} />
        ))}
      </g>
    </svg>
  );
}
