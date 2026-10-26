import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'navy' | 'light';
  id?: string;
}

export default function SectionHeading({ eyebrow, title, intro, align = 'left', tone = 'navy', id }: Props) {
  const center = align === 'center';
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${center ? 'justify-center' : ''} ${tone === 'light' ? 'text-gold' : ''}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-3 text-[2.1rem] sm:text-[2.6rem] lg:text-[3rem] ${tone === 'light' ? 'text-white' : ''}`}>
        {title}
      </h2>
      {intro && <p className={`mt-3 text-[0.98rem] ${tone === 'light' ? 'text-white/75' : 'text-mist'}`}>{intro}</p>}
    </Reveal>
  );
}
