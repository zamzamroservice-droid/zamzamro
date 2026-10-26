import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import Seo from '../components/ui/Seo';
import Hero from '../components/hero/Hero';
import CollectionShowcase from '../components/home/CollectionShowcase';
import FiltrationJourney from '../components/home/FiltrationJourney';
import WaterMatcher from '../components/home/WaterMatcher';
import BeyondPurifiers from '../components/home/BeyondPurifiers';
import CtaBanner from '../components/ui/CtaBanner';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { routeMeta } from '../data/seo';
import { business } from '../data/business';
import { featuredFour } from '../data/products';
import { services, stext } from '../data/services';
import { itemList, localBusiness } from '../lib/schema';
import { useLang } from '../i18n/LanguageProvider';

const PROMISES = [
  { icon: Sparkles, n: 1 },
  { icon: Wrench, n: 2 },
  { icon: ShieldCheck, n: 3 },
  { icon: HeartHandshake, n: 4 },
] as const;

export default function Home({ ready }: { ready: boolean }) {
  const meta = routeMeta.home;
  const { t, lang } = useLang();
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/" jsonLd={[localBusiness(), itemList(featuredFour)]} />
      <Hero ready={ready} />

      {/* Promises & brands strip */}
      <section aria-label={t('home.why')} className="border-b border-ice/40 bg-white">
        <div className="container-royal grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-aqua to-sky text-navy">
                <p.icon className="h-4.5 w-4.5" aria-hidden />
              </span>
              <div>
                <h2 className="font-sans text-[0.92rem] font-medium text-navy">{t(`home.p${p.n}.title`)}</h2>
                <p className="text-[0.84rem] text-mist">{t(`home.p${p.n}.text`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="border-t border-ice/40">
          <ul className="container-royal flex flex-wrap items-center justify-center gap-x-7 gap-y-2 py-4 font-royal text-[0.86rem] tracking-[0.16em] text-navy/55 uppercase" aria-label={t('home.brands')}>
            {business.brands.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <CollectionShowcase />
      <FiltrationJourney />
      <WaterMatcher />
      <BeyondPurifiers />

      {/* Services preview */}
      <section className="section bg-gradient-to-b from-pearl to-aqua/50" aria-labelledby="services-preview-title">
        <div className="container-royal">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="services-preview-title"
              eyebrow={t('home.services.eyebrow')}
              title={
                <>
                  {t('home.services.title')} <span className="accent">{t('home.services.accent')}</span>
                </>
              }
            />
            <Link to="/services" className="btn-ghost">
              {t('cta.allServices')} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => {
              const txt = stext(s, lang);
              return (
                <Reveal as="li" key={s.id} delay={i * 0.04}>
                  <Link to={`/services#${s.id}`} className="group flex h-full items-start gap-4 rounded-[22px] border border-ice/50 bg-white/80 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-soft">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-soft to-navy text-white">
                      <s.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-display text-[1.3rem] text-navy">{txt.name}</span>
                      <span className="block text-[0.85rem] text-mist">{txt.description}</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
