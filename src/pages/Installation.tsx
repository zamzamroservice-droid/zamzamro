import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Droplet, LayoutPanelTop, LifeBuoy, Lightbulb, MessageCircle, Plug, Search, ShowerHead, TestTube2, Wrench } from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageHero from '../components/ui/PageHero';
import InstallIllustration from '../components/ui/InstallIllustration';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import FaqAccordion from '../components/ui/FaqAccordion';
import EnquiryForm from '../components/forms/EnquiryForm';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { routeMeta } from '../data/seo';
import { faqs } from '../data/faqs';
import { breadcrumb } from '../lib/schema';
import { messages, whatsappLink } from '../lib/whatsapp';
import { useLang } from '../i18n/LanguageProvider';

const STEPS = [MessageCircle, Search, Lightbulb, Wrench, TestTube2, LifeBuoy].map((icon, i) => ({ icon, n: (i + 1) as 1 | 2 | 3 | 4 | 5 | 6 }));
const REQUIREMENTS = [Droplet, Plug, ShowerHead, LayoutPanelTop].map((icon, i) => ({ icon, n: (i + 1) as 1 | 2 | 3 | 4 }));

export default function Installation() {
  const meta = routeMeta.installation;
  const { t } = useLang();
  const [params] = useSearchParams();
  const crumbs = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.installation'), path: '/installation' },
  ];
  const installFaqs = faqs.filter((f) => f.topics.includes('Installation'));
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/installation" jsonLd={breadcrumb([{ name: 'Home', path: '/' }, { name: 'Installation', path: '/installation' }])} />
      <PageHero
        eyebrow={t('in.eyebrow')}
        title={
          <>
            {t('in.title')} <span className="accent text-gold">{t('in.accent')}</span>
          </>
        }
        intro={t('in.intro')}
        crumbs={crumbs}
        visual={<InstallIllustration />}
      >
        <a href="#install-enquiry" className="btn-gold">
          {t('cta.bookInstallation')}
        </a>
        <a href={whatsappLink(messages.installation())} target="_blank" rel="noopener noreferrer" className="btn-light">
          <WhatsAppIcon /> {t('cta.whatsapp')}
        </a>
      </PageHero>

      <section className="section" aria-labelledby="steps-title">
        <div className="container-royal">
          <SectionHeading
            id="steps-title"
            eyebrow={t('in.steps.eyebrow')}
            title={
              <>
                {t('in.steps.title')} <span className="accent">{t('in.steps.accent')}</span>
              </>
            }
          />
          <ol className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={(i % 3) * 0.06} className="card-royal relative p-6">
                <span className="absolute top-5 right-6 font-display text-[3rem] leading-none text-ice">0{s.n}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-soft to-navy text-white">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[1.5rem]">{t(`in.s${s.n}.t`)}</h3>
                <p className="mt-1 text-[0.9rem] text-mist">{t(`in.s${s.n}.d`)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-aqua/60 to-pearl" aria-labelledby="req-title">
        <div className="container-royal grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              id="req-title"
              eyebrow={t('in.req.eyebrow')}
              title={
                <>
                  {t('in.req.title')}
                  <span className="accent">{t('in.req.accent')}</span>
                </>
              }
              intro={t('in.req.intro')}
            />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {REQUIREMENTS.map((r, i) => (
              <Reveal as="li" key={r.n} delay={i * 0.05} className="flex gap-4 rounded-[22px] border border-ice/60 bg-white p-5">
                <r.icon className="h-6 w-6 shrink-0 text-ocean" aria-hidden />
                <div>
                  <h3 className="font-sans text-[0.98rem] font-medium text-navy">{t(`in.r${r.n}.t`)}</h3>
                  <p className="text-[0.86rem] text-mist">{t(`in.r${r.n}.d`)}</p>
                </div>
              </Reveal>
            ))}
            <li className="flex items-center gap-2 text-[0.8rem] text-mist sm:col-span-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-ocean" aria-hidden /> {t('in.req.tip')}
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="install-faq-title">
        <div className="container-royal grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="install-faq-title"
              eyebrow={t('in.faq.eyebrow')}
              title={
                <>
                  {t('in.faq.title')} <span className="accent">{t('in.faq.accent')}</span>
                </>
              }
            />
            <div className="mt-8">
              <FaqAccordion items={installFaqs} />
            </div>
          </div>
          <div id="install-enquiry" className="scroll-mt-24">
            <EnquiryForm title={t('in.form')} defaultService={params.get('service') ?? 'Expert Installation'} defaultProduct={params.get('product') ?? ''} />
          </div>
        </div>
      </section>
    </>
  );
}
