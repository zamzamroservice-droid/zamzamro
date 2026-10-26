import type { ProductColour } from '../../data/products';
import { useLang } from '../../i18n/LanguageProvider';

interface Props {
  colours: ProductColour[];
  selected?: string;
  onSelect?: (id: string) => void;
  size?: 'sm' | 'md';
  label?: string;
}

/** Colour swatches — interactive radio group when `onSelect` is given, otherwise a static list. */
export default function Swatches({ colours, selected, onSelect, size = 'sm', label }: Props) {
  const { t } = useLang();
  label ??= t('pd.colours');
  if (!colours.length) return null;
  const dim = size === 'sm' ? 'h-4 w-4' : 'h-8 w-8';
  if (!onSelect) {
    return (
      <ul className="flex flex-wrap items-center gap-1.5" aria-label={label}>
        {colours.map((c) => (
          <li key={c.id} title={c.name} className={`${dim} rounded-full ring-1 ring-black/10 ring-offset-1`} style={{ background: c.hex }}>
            <span className="sr-only">{c.name}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap items-center gap-2.5">
      {colours.map((c) => {
        const active = c.id === selected;
        return (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={c.name}
            title={c.name}
            onClick={() => onSelect(c.id)}
            className={`${dim} cursor-pointer rounded-full ring-offset-2 ring-offset-pearl transition-transform duration-300 hover:scale-110 ${active ? 'ring-2 ring-gold' : 'ring-1 ring-black/15'}`}
            style={{ background: `radial-gradient(circle at 32% 28%, rgb(255 255 255 / 0.55), transparent 45%), ${c.hex}` }}
          />
        );
      })}
    </div>
  );
}
