import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageHero from '../components/ui/PageHero';
import ProductCard from '../components/products/ProductCard';
import CtaBanner from '../components/ui/CtaBanner';
import { routeMeta } from '../data/seo';
import { brands, categories, categoryLabel, fullName, products, type CategoryId, type Product } from '../data/products';
import { breadcrumb, itemList } from '../lib/schema';
import { EASE } from '../lib/motion';
import { useLang } from '../i18n/LanguageProvider';

const matchesQuery = (p: Product, q: string) => {
  if (!q) return true;
  const hay = [fullName(p), p.brand, p.series, p.short, p.summary, p.ta.short, p.ta.summary, ...p.technology, ...p.useCases, ...p.ta.useCases, categoryLabel(p.category), categoryLabel(p.category, 'ta')].join(' ').toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((w) => hay.includes(w));
};

export default function Products() {
  const [params, setParams] = useSearchParams();
  const { t, lang } = useLang();
  const q = params.get('q') ?? '';
  const rawCategory = params.get('category');
  const category = categories.some((c) => c.id === rawCategory) ? (rawCategory as CategoryId) : null;
  const selectedBrands = (params.get('brand') ?? '').split(',').filter(Boolean);

  const update = (mut: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params);
    mut(next);
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const setQ = (v: string) => update((p) => (v ? p.set('q', v) : p.delete('q')));
  const setCategory = (c: CategoryId | null) => update((p) => (c ? p.set('category', c) : p.delete('category')));
  const toggleBrand = (b: string) =>
    update((p) => {
      const set = new Set(selectedBrands);
      if (set.has(b)) set.delete(b);
      else set.add(b);
      if (set.size) p.set('brand', [...set].join(','));
      else p.delete('brand');
    });
  const clearAll = () => setParams(new URLSearchParams(), { replace: true, preventScrollReset: true });

  const byQuery = useMemo(() => products.filter((p) => matchesQuery(p, q)), [q]);
  const byBrand = (list: Product[]) => (selectedBrands.length ? list.filter((p) => selectedBrands.includes(p.brand)) : list);
  const byCategory = (list: Product[]) => (category ? list.filter((p) => p.category === category) : list);
  const results = byCategory(byBrand(byQuery));
  // Faceted counts: each facet counts results with the *other* filters applied.
  const categoryCount = (c: CategoryId) => byBrand(byQuery).filter((p) => p.category === c).length;
  const brandCount = (b: string) => byCategory(byQuery).filter((p) => p.brand === b).length;

  const chips = [
    ...(q ? [{ key: 'q', label: `“${q}”`, clear: () => setQ('') }] : []),
    ...(category ? [{ key: 'c', label: categoryLabel(category, lang), clear: () => setCategory(null) }] : []),
    ...selectedBrands.map((b) => ({ key: `b-${b}`, label: b, clear: () => toggleBrand(b) })),
  ];

  const meta = routeMeta.products;
  const pill = (on: boolean) =>
    `flex w-full cursor-pointer items-center justify-between gap-3 rounded-full border px-3.5 py-2 text-left text-[0.84rem] transition-colors ${on ? 'border-navy bg-navy text-white' : 'border-ice/60 bg-white text-navy hover:border-ocean/50'}`;

  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/products" jsonLd={[itemList(products), breadcrumb([{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }])]} />
      <PageHero
        eyebrow={t('pl.eyebrow')}
        title={
          <>
            {t('pl.title')} <span className="accent text-gold">{t('pl.accent')}</span>
          </>
        }
        intro={t('pl.intro')}
        crumbs={[{ name: t('nav.home'), path: '/' }, { name: t('nav.products'), path: '/products' }]}
      />

      <section className="container-royal py-10 sm:py-14" aria-label={t('pl.catalogue')}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside aria-label={t('pl.filters')} className="lg:sticky lg:top-24 lg:self-start">
            <label className="relative block">
              <span className="sr-only">{t('pl.search')}</span>
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-mist" aria-hidden />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('pl.search')} className="field !rounded-full !pl-10" />
            </label>

            <div className="mt-6">
              <h2 className="font-sans text-[0.68rem] font-medium tracking-[0.26em] text-gold-deep uppercase">{t('pl.category')}</h2>
              <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto lg:flex-col">
                <li className="shrink-0">
                  <button type="button" aria-pressed={!category} onClick={() => setCategory(null)} className={pill(!category)}>
                    {t('pl.all')} <span className="text-[0.75rem] opacity-70">{byBrand(byQuery).length}</span>
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c.id} className="shrink-0">
                    <button type="button" aria-pressed={category === c.id} onClick={() => setCategory(category === c.id ? null : c.id)} className={pill(category === c.id)}>
                      <span className="lg:hidden">{lang === 'ta' ? c.taShort : c.short}</span>
                      <span className="hidden lg:inline">{lang === 'ta' ? c.ta : c.label}</span>
                      <span className="text-[0.75rem] opacity-70">{categoryCount(c.id)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="font-sans text-[0.68rem] font-medium tracking-[0.26em] text-gold-deep uppercase">{t('pl.brand')}</h2>
              <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col">
                {brands.map((b) => {
                  const n = brandCount(b);
                  const on = selectedBrands.includes(b);
                  return (
                    <li key={b}>
                      <label className={`flex cursor-pointer items-center gap-2.5 rounded-full border px-3 py-1.5 text-[0.82rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ocean ${on ? 'border-gold bg-gold/15 text-navy' : 'border-ice/60 bg-white text-navy'} ${n === 0 && !on ? 'opacity-50' : ''}`}>
                        <input type="checkbox" checked={on} onChange={() => toggleBrand(b)} className="h-3.5 w-3.5 accent-navy" />
                        {b}
                        <span className="ml-auto text-[0.72rem] text-mist">{n}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center gap-2" aria-live="polite">
              <p className="mr-2 text-[0.86rem] text-mist">
                {t('pl.count', { n: results.length, total: products.length })}
              </p>
              <AnimatePresence initial={false}>
                {chips.map((c) => (
                  <motion.button
                    key={c.key}
                    type="button"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={c.clear}
                    className="chip cursor-pointer hover:border-gold"
                    aria-label={t('pl.remove', { label: c.label })}
                  >
                    {c.label} <X className="h-3 w-3" aria-hidden />
                  </motion.button>
                ))}
              </AnimatePresence>
              {chips.length > 0 && (
                <button type="button" onClick={clearAll} className="cursor-pointer text-[0.8rem] text-ocean underline-offset-2 hover:underline">
                  {t('pl.clearAll')}
                </button>
              )}
            </div>

            {results.length ? (
              <motion.ul layout className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {results.map((p) => (
                    <motion.li key={p.slug} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, ease: EASE }}>
                      <ProductCard product={p} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            ) : (
              <div className="mt-10 rounded-[26px] border border-dashed border-ice p-10 text-center">
                <p className="font-display text-[1.6rem] text-navy">{t('pl.none')}</p>
                <p className="mt-1 text-mist">{t('pl.noneText')}</p>
                <button type="button" onClick={clearAll} className="btn-ghost mt-5">
                  {t('pl.clearFilters')}
                </button>
              </div>
            )}
            <p className="mt-8 text-[0.78rem] text-mist">
              {t('pl.note')}
            </p>
          </div>
        </div>
      </section>
      <CtaBanner
        title={
          <>
            {t('pl.ctaTitle')} <span className="accent text-gold">{t('pl.ctaAccent')}</span>
          </>
        }
      />
    </>
  );
}
