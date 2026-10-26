import { AnimatePresence, motion } from 'motion/react';
import type { Product } from '../../data/products';
import ProductVisual from '../ui/ProductVisual';
import { EASE } from '../../lib/motion';
import { useLang } from '../../i18n/LanguageProvider';

interface Props {
  product: Product;
  index: number;
  onIndex: (i: number) => void;
}

export default function Gallery({ product, index, onIndex }: Props) {
  const imgs = product.images;
  const { t } = useLang();
  return (
    <div>
      <div className="relative overflow-hidden rounded-[26px] border border-ice/50 bg-gradient-to-b from-white to-aqua shadow-soft">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={index} initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
            <ProductVisual product={product} index={index} size="lg" eager className="aspect-square w-full p-6 sm:p-10" />
          </motion.div>
        </AnimatePresence>
      </div>
      {imgs.length > 1 && (
        <ul className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1" aria-label={t('pd.images')}>
          {imgs.map((img, i) => (
            <li key={img.src} className="shrink-0">
              <button
                type="button"
                onClick={() => onIndex(i)}
                aria-label={`${t('pd.showImage', { n: i + 1 })}: ${img.alt}`}
                aria-current={i === index}
                className={`block h-20 w-20 cursor-pointer overflow-hidden rounded-2xl border-2 bg-white transition-colors ${i === index ? 'border-gold' : 'border-transparent ring-1 ring-ice/60 hover:border-ice'}`}
              >
                <img src={img.sm} alt="" loading="lazy" className="h-full w-full object-contain p-1.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
