import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Check } from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageHero from '../components/ui/PageHero';
import ServiceOrbit from '../components/ui/ServiceOrbit';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import CtaBanner from '../components/ui/CtaBanner';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { routeMeta } from '../data/seo';
import { services, stext } from '../data/services';
import { works } from '../data/works';
import { messages, whatsappLink } from '../lib/whatsapp';
import { breadcrumb, serviceSchemas } from '../lib/schema';
import { bookPath } from '../components/layout/nav';
import { getProduct, fullName } from '../data/products';
import { useLang } from '../i18n/LanguageProvider';

export default function Services() {
  const meta = routeMeta.services;
  const { t, lang } = useLang();
  const crumbs = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
  ];
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/services" jsonLd={[...serviceSchemas(), breadcrumb(crumbs)]} />
      <PageHero
        eyebrow={t('sv.eyebrow')}
        title={
          <>
            {t('sv.title')} <span className="accent text-gold">{t('sv.accent')}</span>
          </>
        }
        intro={t('sv.intro')}
        crumbs={crumbs}
        visual={<ServiceOrbit />}
      >
        <Link to={bookPath()} className="btn-gold">
          {t('cta.bookAService')}
        </Link>
        <a href={whatsappLink(messages.general())} target="_blank" rel="noopener noreferrer" className="btn-light">
          <WhatsAppIcon /> {t('cta.whatsapp')}
        </a>
      </PageHero>

      <section className="section" aria-label={t('sv.list')}>
        <div className="container-royal">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const product = s.productSlug ? getProduct(s.productSlug) : undefined;
              const txt = stext(s, lang);
              return (
                <Reveal as="li" key={s.id} delay={(i % 3) * 0.05}>
                  <article id={s.id} className="group card-royal flex h-full scroll-mt-24 flex-col overflow-hidden transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift">
                    <div className="relative h-36 overflow-hidden bg-gradient-to-br from-aqua via-white to-sky">
                      {s.image ? (
                        <img src={s.image} alt="" loading="lazy" className="h-full w-full object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <s.icon className="h-14 w-14 text-ocean/40" strokeWidth={1.1} aria-hidden />
                        </div>
                      )}
                      <span className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-soft to-navy text-white shadow-soft">
                        <s.icon className="h-5 w-5" aria-hidden />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-[1.5rem]">{txt.name}</h2>
                      <p className="mt-1 text-[0.88rem] text-mist">{txt.description}</p>
                      <ul className="mt-3 space-y-1.5">
                        {txt.details.map((d) => (
                          <li key={d} className="flex gap-2 text-[0.84rem] text-ink">
                            <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-ocean" aria-hidden /> {d}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        <Link to={bookPath(s.name, product ? fullName(product) : undefined)} className="btn-primary !min-h-10 flex-1 !py-2 !text-[0.78rem]">
                          {t('cta.bookThisService')}
                        </Link>
                        <a href={whatsappLink(messages.service(s.name))} target="_blank" rel="noopener noreferrer" aria-label={t('cta.askService', { name: txt.name })} className="btn-ghost !min-h-10 !px-3.5 !py-2">
                          <WhatsAppIcon className="h-4 w-4 text-[#1fa855]" />
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-pearl to-aqua/60" aria-labelledby="works-title">
        <div className="container-royal">
          <SectionHeading
            id="works-title"
            eyebrow={t('sv.works.eyebrow')}
            title={
              <>
                {t('sv.works.title')} <span className="accent">{t('sv.works.accent')}</span>
              </>
            }
          />
          {works.length ? (
            <ul className="no-scrollbar -mx-4 mt-10 flex snap-x gap-5 overflow-x-auto px-4 lg:mx-auto lg:max-w-[66rem] lg:gap-0 lg:overflow-visible lg:px-0">
              {works.slice(0, 4).map((w, i) => (
                <li key={w.title} className="w-[84%] shrink-0 snap-start sm:w-[46%] lg:-mx-2.5 lg:w-1/4 lg:hover:z-20">
                  <article
                    className="group bg-pearl transition-transform duration-700 lg:shadow-[0_24px_50px_-26px_rgb(28_32_66/0.45)] lg:[transform:rotate(var(--tilt))_translateY(var(--drop))] lg:hover:[transform:rotate(0deg)_translateY(-8px)]"
                    style={{ ['--tilt' as string]: `${[-2.2, 0.6, -0.4, 1.8][i]}deg`, ['--drop' as string]: `${[0, 22, 18, 6][i]}px` }}
                  >
                    <img src={w.image} alt={w.alt} loading="lazy" className="aspect-[3/2] w-full object-cover lg:aspect-[4/3.1]" />
                    <div className="pt-4 lg:px-6 lg:pt-5 lg:pb-6">
                      <p className="text-[0.62rem] font-medium tracking-[0.24em] text-gold-deep uppercase">{w.type}</p>
                      <h3 className="mt-2 text-[1.5rem] leading-tight">{w.title}</h3>
                      <p className="mt-1 text-[0.8rem] text-mist">{w.location}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label={t('sv.works.soon')}>
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex aspect-[4/3.6] flex-col items-center justify-center gap-2 rounded-[26px] border-2 border-dashed border-ice bg-white/60 p-6 text-center">
                  <Camera className="h-7 w-7 text-ocean/50" aria-hidden />
                  <p className="text-[0.82rem] text-mist">{t('sv.works.soon')}</p>
                </li>
              ))}
            </ul>
          )}
          {!works.length && (
            <p className="mt-5 text-[0.84rem] text-mist">
              {t('sv.works.note')}{' '}
              <a className="text-ocean underline-offset-2 hover:underline" href={whatsappLink(messages.general())} target="_blank" rel="noopener noreferrer">
                {t('sv.works.ask')}
              </a>
              .
            </p>
          )}
          <div className="mt-8">
            <Link to="/installation" className="btn-ghost">
              {t('sv.howInstall')} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
