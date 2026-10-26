import { useEffect, useRef, useState } from 'react';

interface Props {
  image?: string;
  imageSm?: string;
  /** Overlay tint, e.g. a navy gradient for legible white text. */
  overlay?: string;
  bubbles?: number;
  className?: string;
}

/** Real water photography with restrained rays, caustics and bubbles. Animations pause off-screen. */
export default function WaterBackdrop({
  image = '/images/water-underwater-rays.webp',
  imageSm = '/images/water-underwater-rays-sm.webp',
  overlay = 'linear-gradient(180deg, rgb(20 24 56 / 0.55), rgb(20 24 56 / 0.78))',
  bubbles = 10,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${visible ? '' : 'zz-paused'} ${className}`}>
      <picture>
        <source media="(max-width: 768px)" srcSet={imageSm} />
        <img src={image} alt="" className="zz-drift absolute inset-0 h-full w-full object-cover" decoding="async" />
      </picture>
      <div className="zz-rays absolute -inset-x-1/4 inset-y-0" />
      <div className="zz-caustics absolute inset-0" />
      <div className="absolute inset-0" style={{ background: overlay }} />
      {Array.from({ length: bubbles }, (_, i) => {
        const size = 4 + ((i * 7) % 10);
        return (
          <span
            key={i}
            className="zz-bubble"
            style={{ left: `${(i * 37) % 100}%`, width: size, height: size, animationDuration: `${9 + ((i * 5) % 9)}s`, animationDelay: `${-(i * 1.7)}s` }}
          />
        );
      })}
    </div>
  );
}
