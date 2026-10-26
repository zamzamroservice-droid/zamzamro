import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE } from '../../lib/motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}

/** Fade-and-rise reveal when the element scrolls into view (instant under reduced motion via MotionConfig). */
export default function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
