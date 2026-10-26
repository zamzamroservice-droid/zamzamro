import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import WaterBackdrop from './WaterBackdrop';
import WhatsAppIcon from './WhatsAppIcon';
import Reveal from './Reveal';
import { telLink, business } from '../../data/business';
import { messages, whatsappLink } from '../../lib/whatsapp';
import { bookPath } from '../layout/nav';
import { useLang } from '../../i18n/LanguageProvider';

interface Props {
  title?: ReactNode;
  text?: string;
  message?: string;
}

export default function CtaBanner({ title, text, message = messages.general() }: Props) {
  const { t } = useLang();
  title ??= (
    <>
      {t('cb.title')} <span className="accent text-gold">{t('cb.accent')}</span>
    </>
  );
  text ??= t('cb.text');
  return (
    <section className="container-royal py-12 sm:py-16">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[30px] px-6 py-12 text-center text-white shadow-lift sm:px-12 sm:py-16">
          <WaterBackdrop image="/images/water-sea-dusk.webp" imageSm="/images/water-sea-dusk-sm.webp" overlay="linear-gradient(180deg, rgb(32 38 87 / 0.7), rgb(20 24 56 / 0.85))" bubbles={6} />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[2rem] text-white sm:text-[2.7rem]">{title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">{text}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <WhatsAppIcon /> {t('cta.chatWhatsapp')}
              </a>
              <a href={telLink} className="btn-light">
                <Phone className="h-4 w-4" aria-hidden /> {business.phoneDisplay}
              </a>
              <Link to={bookPath()} className="btn-light">
                {t('cta.bookAService')}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
