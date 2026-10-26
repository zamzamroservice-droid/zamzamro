import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Eye, Gem, HeartHandshake } from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageHero from '../components/ui/PageHero';
import PureWater from '../components/ui/PureWater';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import CtaBanner from '../components/ui/CtaBanner';
import BusinessCard from '../components/ui/BusinessCard';
import { routeMeta } from '../data/seo';
import { business, fullAddress, fullAddressTa } from '../data/business';
import { breadcrumb } from '../lib/schema';
import { useLang } from '../i18n/LanguageProvider';

const PROMISES = [
  { icon: Droplets, n: 1 },
  { icon: Eye, n: 2 },
  { icon: HeartHandshake, n: 3 },
  { icon: Gem, n: 4 },
] as const;
const OFFER = [1, 2, 3, 4, 5, 6, 7] as const;

export default function About() {
  const meta = routeMeta.about;
  const { t, lang } = useLang();
  const crumbs = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
  ];
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/about" jsonLd={breadcrumb([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <PageHero
        eyebrow={t('ab.eyebrow')}
        title={
          <>
            {t('ab.title')} <span className="accent text-gold">{t('ab.accent')}</span>
          </>
        }
        intro={t('ab.intro')}
        crumbs={crumbs}
        visual={<PureWater />}
      />

      <section className="section">
        <div className="container-royal grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">{t('ab.id.eyebrow')}</p>
            <h2 className="mt-3 text-[2.2rem] sm:text-[2.7rem]">
              {t('ab.id.title')} <span className="accent">{t('ab.id.accent')}</span>
            </h2>
            <p className="mt-4 text-mist">{t('ab.id.p1')}</p>
            <p className="mt-3 text-mist">{t('ab.id.p2', { address: lang === 'ta' ? fullAddressTa : fullAddress })}</p>
          </Reveal>
          <Reveal delay={0.1} className="[perspective:1200px]">
            <BusinessCard />
          </Reveal>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-aqua/60 to-pearl">
        <div className="container-royal grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">{t('ab.wf.eyebrow')}</p>
            <h2 className="mt-3 text-[2.2rem] sm:text-[2.7rem]">
              {t('ab.wf.title')} <span className="accent">{t('ab.wf.accent')}</span>
            </h2>
            <p className="mt-4 text-mist">{t('ab.wf.text')}</p>
            <Link to="/#matcher-title" className="btn-ghost mt-6">
              {t('ab.wf.try')} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={0.08} className="card-royal p-6 sm:p-8">
            <h2 className="text-[1.7rem]">{t('ab.offer')}</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {OFFER.map((n) => (
                <li key={n} className="flex items-center gap-2.5 text-[0.92rem]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden /> {t(`ab.o${n}`)}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.84rem] text-mist">{t('ab.brands', { brands: business.brands.join(', ') })}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-royal">
          <SectionHeading
            align="center"
            eyebrow={t('ab.pr.eyebrow')}
            title={
              <>
                {t('ab.pr.title')} <span className="accent">{t('ab.pr.accent')}</span>
              </>
            }
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 0.06} className="card-royal p-6 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#efe2c4] to-gold text-navy-deep">
                  <p.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-[1.6rem]">{t(`ab.pr${p.n}.t`)}</h3>
                <p className="mt-1 text-[0.88rem] text-mist">{t(`ab.pr${p.n}.d`)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
