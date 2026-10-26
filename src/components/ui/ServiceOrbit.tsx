import { services } from '../../data/services';

/** Service icons orbiting the brand emblem (CSS rotation, counter-rotated icons; static under reduced motion). */
export default function ServiceOrbit() {
  const icons = services.slice(0, 8);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]" aria-hidden>
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.95),rgb(228_245_248/0.9)_60%,rgb(169_220_231/0.4))] shadow-[0_0_80px_rgb(169_220_231/0.5)]" />
      <img src="/images/emblem-navy.png" alt="" className="absolute top-1/2 left-1/2 h-[30%] -translate-x-1/2 -translate-y-1/2 object-contain" />
      <div className="absolute inset-[4%] rounded-full border border-white/25" />
      <div className="absolute inset-[18%] rounded-full border border-gold/50" />
      <div className="absolute inset-[4%] animate-spin-slow">
        {icons.map((s, i) => {
          const a = (i / icons.length) * Math.PI * 2;
          return (
            <span key={s.id} className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}>
              <span className="flex h-full w-full animate-spin-slow items-center justify-center rounded-full bg-white text-navy shadow-lift ring-1 ring-ice [animation-direction:reverse]">
                <s.icon className="h-5 w-5" />
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
