import { Link } from 'react-router-dom';
import { BatteryCharging, Droplets, Flame, Waves, type LucideIcon } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import ProductVisual from '../ui/ProductVisual';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { getProduct, productPath } from '../../data/products';
import { messages, whatsappLink } from '../../lib/whatsapp';
import { useLang } from '../../i18n/LanguageProvider';
import type { DictKey } from '../../i18n/dict';

const ITEMS: { slug: string; icon: LucideIcon; text: DictKey }[] = [
  { slug: 'automatic-water-level-controller', icon: Droplets, text: 'by.controller' },
  { slug: 'whole-house-water-softener', icon: Waves, text: 'by.softener' },
  { slug: 'zamzam-hot-normal-ss-system', icon: Flame, text: 'by.hotnormal' },
  { slug: 'ups-inverter-batteries', icon: BatteryCharging, text: 'by.ups' },
];

export default function BeyondPurifiers() {
  const { t } = useLang();
  return (
    <section className="section" aria-labelledby="beyond-title">
      <div className="container-royal">
        <SectionHeading
          id="beyond-title"
          eyebrow={t('by.eyebrow')}
          title={
            <>
              {t('by.title')} <span className="accent">{t('by.accent')}</span>
            </>
          }
          intro={t('by.intro')}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ slug, icon: Icon, text }, i) => {
            const p = getProduct(slug)!;
            return (
              <Reveal as="li" key={slug} delay={i * 0.06}>
                <article className="group card-royal relative flex h-full flex-col overflow-hidden p-2 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-b from-white to-aqua">
                    <ProductVisual product={p} className="aspect-[4/3] w-full p-3 transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy shadow-soft">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-3 pt-3 pb-3">
                    <h3 className="text-[1.35rem] leading-tight">
                      <Link to={productPath(p)} className="hover:underline">
                        {p.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-[0.86rem] text-mist">{t(text)}</p>
                    <a href={whatsappLink(messages.product(p))} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 pt-3 text-[0.8rem] font-medium text-[#178a45] hover:underline">
                      <WhatsAppIcon /> {t('cta.enquireWhatsapp')}
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
