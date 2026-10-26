import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';
import WaterBackdrop from './WaterBackdrop';
import { EASE } from '../../lib/motion';

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  /** Optional visual on the right (desktop) / below (mobile). */
  visual?: ReactNode;
  image?: string;
  imageSm?: string;
  children?: ReactNode;
}

/** Cinematic water-themed hero for inner pages. Owns the page's single H1. */
export default function PageHero({ eyebrow, title, intro, crumbs, visual, image, imageSm, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pt-24 pb-14 text-white sm:pt-28 sm:pb-18">
      <WaterBackdrop image={image} imageSm={imageSm} />
      <div className="container-royal relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
          <Breadcrumbs items={crumbs} tone="light" />
          <p className="eyebrow mt-6 text-gold">{eyebrow}</p>
          <h1 className="mt-3 text-[2.5rem] text-white sm:text-[3.2rem] lg:text-[3.8rem]">{title}</h1>
          {intro && <p className="mt-4 max-w-xl text-[1.02rem] text-white/80">{intro}</p>}
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </motion.div>
        {visual && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
            className="relative mx-auto w-full max-w-[22rem] lg:max-w-[26rem]"
          >
            {visual}
          </motion.div>
        )}
      </div>
      <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px h-8 w-full text-pearl sm:h-12">
        <path fill="currentColor" d="M0 34c160 22 320 26 480 12S800 6 960 10s320 30 480 26v24H0Z" />
      </svg>
    </section>
  );
}
