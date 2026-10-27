import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Check, Phone, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import Seo from '../components/ui/Seo';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Swatches from '../components/ui/Swatches';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import Reveal from '../components/ui/Reveal';
import Gallery from '../components/products/Gallery';
import ProductCard from '../components/products/ProductCard';
import NotFound from './NotFound';
import { categoryLabel, fullName, ptext, specText, titleName, getProduct, productPath, relatedProducts } from '../data/products';
import { business, telLink } from '../data/business';
import { messages, whatsappLink } from '../lib/whatsapp';
import { breadcrumb, productSchema } from '../lib/schema';
import { bookPath } from '../components/layout/nav';
import { useLang } from '../i18n/LanguageProvider';

export default function ProductDetail() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  const [params, setParams] = useSearchParams();
  const { t, lang } = useLang();
  const colourParam = params.get('colour');
  const colour = product?.colours.find((c) => c.id === colourParam) ?? product?.colours[0];
  // Newest photo first, unless the link asked for a specific colour.
  const [imgIndex, setImgIndex] = useState(colourParam && colour?.image !== undefined ? colour.image : 0);

  if (!product) return <NotFound />;

  const name = fullName(product);
  const txt = ptext(product, lang);
  const crumbs = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.products'), path: '/products' },
    { name, path: productPath(product) },
  ];

  const pickColour = (id: string) => {
    const c = product.colours.find((x) => x.id === id)!;
    const next = new URLSearchParams(params);
    next.set('colour', id);
    setParams(next, { replace: true, preventScrollReset: true });
    if (c.image !== undefined) setImgIndex(c.image);
  };

  const hasColourChoice = product.colours.length > 1;
  const waMessage = messages.product(product, hasColourChoice ? colour?.name : undefined);

  return (
    <>
      <Seo
        title={`${titleName(product)} in Erode | Zam Zam Pure Water System`}
        description={`${product.short} ${product.summary}`.slice(0, 158)}
        path={productPath(product)}
        image={product.images[0]?.src}
        jsonLd={[productSchema(product), breadcrumb(crumbs)]}
      />

      <section className="water-soft pt-24 pb-12 sm:pt-28">
        <div className="container-royal">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-2 lg:gap-12">
            <Gallery product={product} index={imgIndex} onIndex={setImgIndex} />

            <div>
              <p className="text-[0.68rem] font-medium tracking-[0.26em] text-gold-deep uppercase">
                {product.brand}
                {product.series && ` · ${product.series}`} · {categoryLabel(product.category, lang)}
              </p>
              <h1 className="mt-2 text-[2.5rem] sm:text-[3.2rem]">{name}</h1>
              <p className="mt-1 font-display text-[1.3rem] text-gold-deep italic">{txt.short}</p>
              <p className="mt-4 text-[0.98rem] text-mist">{txt.summary}</p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('pd.technology')}>
                {product.technology.map((t) => (
                  <li key={t} className="chip">
                    <Sparkles className="h-3 w-3 text-gold-deep" aria-hidden /> {t}
                  </li>
                ))}
              </ul>

              {product.colours.length > 0 && (
                <div className="mt-6">
                  <p className="text-[0.78rem] font-medium tracking-wide text-navy">
                    {hasColourChoice ? t('pd.colour') : t('pd.finish')}: <span className="font-normal text-mist">{colour?.name}</span>
                  </p>
                  <div className="mt-2.5">
                    {hasColourChoice ? <Swatches colours={product.colours} selected={colour?.id} onSelect={pickColour} size="md" label={`${name} colours`} /> : <Swatches colours={product.colours} size="md" />}
                  </div>
                  {hasColourChoice && <p className="mt-2 text-[0.74rem] text-mist">{t('pd.colourNote')}</p>}
                </div>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn bg-[#1fa855] text-white shadow-soft hover:bg-[#1a9049] hover:shadow-lift">
                  <WhatsAppIcon /> {t('cta.getPrice')}
                </a>
                <a href={telLink} className="btn-ghost">
                  <Phone className="h-4 w-4" aria-hidden /> {t('pd.callNumber', { phone: business.phoneDisplay })}
                </a>
              </div>
              <Link to={bookPath('Expert Installation', name)} className="mt-3 inline-block text-[0.84rem] text-ocean underline-offset-2 hover:underline">
                {t('pd.installLink')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-royal grid gap-6 py-12 lg:grid-cols-3">
        <Reveal className="card-royal p-6">
          <h2 className="text-[1.6rem]">{t('pd.highlights')}</h2>
          <ul className="mt-4 space-y-2.5">
            {txt.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[0.92rem] text-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-ocean" aria-hidden /> {h}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.05} className="card-royal p-6">
          <h2 className="text-[1.6rem]">{t('pd.suitable')}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {txt.useCases.map((u) => (
              <li key={u} className="chip !py-1.5 !text-[0.8rem]">
                {u}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.8rem] text-mist">Suitability depends on your water — we recommend a water check before choosing.</p>
        </Reveal>
        <Reveal delay={0.1} className="card-royal p-6">
          <h2 className="text-[1.6rem]">{t('pd.specs')}</h2>
          <dl className="mt-3 divide-y divide-ice/50 text-[0.88rem]">
            {product.specs.map((spec) => {
              const s = specText(spec, lang);
              return (
                <div key={spec.label} className="flex justify-between gap-4 py-2">
                  <dt className="text-mist">{s.label}</dt>
                  <dd className={`text-right ${s.value ? 'text-navy' : 'text-mist/80 italic'}`}>{s.value ?? t('pd.enquireDetails')}</dd>
                </div>
              );
            })}
          </dl>
          <p className="mt-3 text-[0.72rem] text-mist">{t('pd.source', { source: product.source })}</p>
        </Reveal>
      </section>

      {/* Trust-focused enquiry */}
      <section className="container-royal">
        <Reveal className="grid items-center gap-6 rounded-[30px] bg-gradient-to-br from-navy to-navy-deep p-6 text-white shadow-lift sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow text-gold">{t('pd.trust.eyebrow')}</p>
            <h2 className="mt-2 text-[2rem] text-white sm:text-[2.4rem]">
              {t('pd.trust.title')} <span className="accent text-gold">{t('pd.trust.accent')}</span>
            </h2>
            <ul className="mt-5 grid gap-3 text-[0.9rem] text-white/80 sm:grid-cols-3">
              <li className="flex gap-2"><ShieldCheck className="h-5 w-5 shrink-0 text-gold" aria-hidden /> {t('pd.trust1')}</li>
              <li className="flex gap-2"><Sparkles className="h-5 w-5 shrink-0 text-gold" aria-hidden /> {t('pd.trust2')}</li>
              <li className="flex gap-2"><Wrench className="h-5 w-5 shrink-0 text-gold" aria-hidden /> {t('pd.trust3')}</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn-gold w-full">
              <WhatsAppIcon /> {t('cta.getPrice')}
            </a>
            <a href={telLink} className="btn-light w-full">
              <Phone className="h-4 w-4" aria-hidden /> {t('cta.callNow')}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="container-royal py-14" aria-labelledby="related-title">
        <h2 id="related-title" className="text-[2rem]">
          {t('pd.related')} <span className="accent">{t('pd.relatedAccent')}</span>
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts(product).map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
