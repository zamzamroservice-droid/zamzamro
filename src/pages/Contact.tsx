import { useSearchParams } from 'react-router-dom';
import { Clock, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageHero from '../components/ui/PageHero';
import LocationRadar from '../components/ui/LocationRadar';
import EnquiryForm from '../components/forms/EnquiryForm';
import Reveal from '../components/ui/Reveal';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import BusinessCard from '../components/ui/BusinessCard';
import { routeMeta } from '../data/seo';
import { business, fullAddress, fullAddressTa, mapsEmbed, mapsLink, serviceAreaLabel, serviceAreaLabelTa, telLink } from '../data/business';
import { messages, whatsappLink } from '../lib/whatsapp';
import { breadcrumb, localBusiness } from '../lib/schema';
import { useLang } from '../i18n/LanguageProvider';

export default function Contact() {
  const meta = routeMeta.contact;
  const { t, lang } = useLang();
  const ta = lang === 'ta';
  const [params] = useSearchParams();
  const crumbs = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.contact'), path: '/contact' },
  ];
  const card = 'card-royal flex h-full gap-4 p-5 transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-lift';
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/contact" jsonLd={[localBusiness(), breadcrumb([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]} />
      <PageHero
        eyebrow={t('ct.eyebrow')}
        title={
          <>
            {t('ct.title')} <span className="accent text-gold">{t('ct.accent')}</span>
          </>
        }
        intro={t('ct.intro')}
        crumbs={crumbs}
        visual={<LocationRadar />}
        image="/images/water-turquoise-surface.webp"
        imageSm="/images/water-turquoise-surface-sm.webp"
      >
        <a href={telLink} className="btn-gold">
          <Phone className="h-4 w-4" aria-hidden /> {t('cta.callNow')}
        </a>
        <a href={whatsappLink(messages.general())} target="_blank" rel="noopener noreferrer" className="btn-light">
          <WhatsAppIcon /> {t('cta.whatsapp')}
        </a>
      </PageHero>

      <section className="container-royal py-12" aria-label={t('ct.details')}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal as="li">
            <a href={telLink} className={card}>
              <Phone className="h-6 w-6 shrink-0 text-ocean" aria-hidden />
              <span>
                <span className="block text-[0.66rem] tracking-[0.24em] text-gold-deep uppercase">{t('ct.call')}</span>
                <span className="block font-display text-[1.3rem] text-navy">{business.phoneDisplay}</span>
              </span>
            </a>
          </Reveal>
          <Reveal as="li" delay={0.05}>
            <a href={whatsappLink(messages.general())} target="_blank" rel="noopener noreferrer" className={card}>
              <WhatsAppIcon className="h-6 w-6 shrink-0 text-[#1fa855]" />
              <span>
                <span className="block text-[0.66rem] tracking-[0.24em] text-gold-deep uppercase">{t('ct.wa')}</span>
                <span className="block font-display text-[1.3rem] text-navy">{t('ct.chat')}</span>
              </span>
            </a>
          </Reveal>
          <Reveal as="li" delay={0.1} className="sm:col-span-2">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className={card}>
              <MapPin className="h-6 w-6 shrink-0 text-ocean" aria-hidden />
              <span>
                <span className="block text-[0.66rem] tracking-[0.24em] text-gold-deep uppercase">{t('ct.visit')}</span>
                <address className="block text-[0.95rem] text-navy not-italic">{ta ? fullAddressTa : fullAddress}</address>
              </span>
            </a>
          </Reveal>
        </ul>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_1.1fr]">
          <div className="flex gap-3 rounded-[22px] border border-ice/50 bg-white/70 p-5">
            <Clock className="h-5 w-5 shrink-0 text-ocean" aria-hidden />
            <div>
              <h2 className="font-sans text-[0.92rem] font-medium text-navy">{t('ct.hours')}</h2>
              {business.hours.length ? (
                <ul className="mt-1 text-[0.88rem] text-mist">
                  {business.hours.map((h) => (
                    <li key={h.days}>
                      {h.days}: {h.time}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-[0.88rem] text-mist">{t('ct.hoursNote')}</p>
              )}
            </div>
          </div>
          <div className="flex gap-3 rounded-[22px] border border-ice/50 bg-white/70 p-5">
            <Navigation className="h-5 w-5 shrink-0 text-ocean" aria-hidden />
            <div>
              <h2 className="font-sans text-[0.92rem] font-medium text-navy">{t('ct.area')}</h2>
              <p className="mt-1 text-[0.88rem] text-mist">{t('ct.areaNote', { area: ta ? serviceAreaLabelTa : serviceAreaLabel })}</p>
            </div>
          </div>
          <div className="[perspective:1200px]">
            <p className="sr-only">{t('ct.card')}</p>
            <BusinessCard className="!p-2" />
          </div>
        </div>
      </section>

      <section className="container-royal grid gap-8 pb-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div id="enquiry" className="scroll-mt-24">
          <EnquiryForm title={t('ct.form')} defaultService={params.get('service') ?? ''} defaultProduct={params.get('product') ?? ''} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-[26px] border border-ice/50 bg-aqua shadow-soft">
            <iframe title={t('ct.map')} src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
          </div>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn-ghost self-start">
            {t('cta.openMaps')} <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>
    </>
  );
}
