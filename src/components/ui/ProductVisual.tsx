import { BatteryCharging } from 'lucide-react';
import type { Product } from '../../data/products';
import { useLang } from '../../i18n/LanguageProvider';

interface Props {
  product: Product;
  index?: number;
  size?: 'sm' | 'lg';
  className?: string;
  eager?: boolean;
}

/** Product photo, or a clearly-labelled icon panel when no approved photo exists yet. */
export default function ProductVisual({ product, index = 0, size = 'sm', className = '', eager = false }: Props) {
  const { t } = useLang();
  const img = product.images[index] ?? product.images[0];
  if (!img) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-aqua to-white text-navy ${className}`}>
        <BatteryCharging className="h-14 w-14 text-ocean" strokeWidth={1.2} aria-hidden />
        <span className="text-[0.7rem] tracking-[0.2em] text-mist uppercase">{t('pd.photoOnRequest')}</span>
      </div>
    );
  }
  return (
    <img
      src={size === 'sm' ? img.sm : img.src}
      alt={img.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
