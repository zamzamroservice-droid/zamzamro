import Seo from '../components/ui/Seo';
import PageHero from '../components/ui/PageHero';
import { routeMeta } from '../data/seo';
import { business, fullAddress, fullAddressTa, telLink } from '../data/business';
import { breadcrumb } from '../lib/schema';
import { useLang } from '../i18n/LanguageProvider';

const UPDATED = { en: '14 October 2026', ta: '14 அக்டோபர் 2026' };

interface Section {
  h: string;
  p?: string[];
  li?: [string, string][] | string[];
}

const CONTENT: Record<'en' | 'ta', { intro: string; sections: Section[]; contactH: string; phone: string }> = {
  en: {
    intro: 'This policy explains how Zam Zam Pure Water System (“we”, “us”) handles information on this website. We have kept it short and plain.',
    sections: [
      { h: 'What you type into our enquiry forms', p: ['Our enquiry forms ask for:'], li: ['Your full name, phone number, the service you need and your area (required).', 'A product, preferred date, preferred time and a message (optional).'] },
      {
        h: 'How the WhatsApp flow works',
        p: [
          'When you press “Continue on WhatsApp”, your browser builds a message from what you typed and opens WhatsApp with that message ready to send. This website does not store your form details in any database, and nothing is sent to us until you press send in WhatsApp. Once you send it, the message is handled by WhatsApp (Meta) under their own privacy policy, and we receive it like any other WhatsApp message.',
          'Submitting the form does not confirm an appointment — we confirm bookings when we reply.',
        ],
      },
      { h: 'How we use your enquiry', p: ['We use the details you send us only to reply, arrange a visit, provide quotes and give after-sales support. We do not sell your information.'] },
      {
        h: 'Third-party services on this website',
        li: [
          ['Google Maps', 'the map on the Contact page is embedded from Google. Google may set cookies or collect usage data when the map loads.'],
          ['Google Fonts', 'fonts are loaded from Google’s servers, which receive your IP address as part of the request.'],
          ['WhatsApp', 'links open WhatsApp (Meta) when you choose to message us.'],
          ['Cloudflare', 'the website is hosted on Cloudflare, which processes standard request data (such as IP address) to deliver and protect the site.'],
        ],
        p: ['This website does not use advertising trackers. It remembers your language choice (English or Tamil) in your browser so the site opens in the same language next time.'],
      },
      { h: 'Your choices', p: ['You can ask us what information you have shared with us over WhatsApp or phone, and ask us to delete our copy of your messages, using the contact details below.'] },
    ],
    contactH: 'Contact for privacy questions',
    phone: 'Phone / WhatsApp',
  },
  ta: {
    intro: 'இந்த இணையதளத்தில் ஜம் ஜம் தூய குடிநீர் அமைப்பு (“நாங்கள்”) தகவல்களை எவ்வாறு கையாள்கிறது என்பதை இந்தக் கொள்கை விளக்குகிறது. சுருக்கமாகவும் எளிமையாகவும் வைத்துள்ளோம்.',
    sections: [
      { h: 'விசாரணைப் படிவத்தில் நீங்கள் உள்ளிடுவது', p: ['எங்கள் விசாரணைப் படிவம் கேட்பவை:'], li: ['உங்கள் முழுப் பெயர், தொலைபேசி எண், தேவையான சேவை, உங்கள் பகுதி (கட்டாயம்).', 'தயாரிப்பு, விருப்பமான தேதி, நேரம், செய்தி (விருப்பம்).'] },
      {
        h: 'WhatsApp செயல்முறை எப்படி வேலை செய்கிறது',
        p: [
          '“WhatsApp-இல் தொடரவும்” அழுத்தும் போது, நீங்கள் உள்ளிட்டவற்றிலிருந்து உங்கள் பிரவுசர் ஒரு செய்தியை உருவாக்கி, அனுப்பத் தயாராக WhatsApp-ஐத் திறக்கிறது. இந்த இணையதளம் உங்கள் விவரங்களை எந்த தரவுத்தளத்திலும் சேமிப்பதில்லை; WhatsApp-இல் நீங்கள் அனுப்பும் வரை எதுவும் எங்களுக்கு வராது. அனுப்பிய பின், அந்தச் செய்தி WhatsApp (Meta) நிறுவனத்தின் தனியுரிமைக் கொள்கையின்படி கையாளப்படும்.',
          'படிவத்தைச் சமர்ப்பிப்பது சந்திப்பை உறுதி செய்யாது — நாங்கள் பதிலளிக்கும் போது பதிவு உறுதியாகும்.',
        ],
      },
      { h: 'உங்கள் விசாரணையை எப்படிப் பயன்படுத்துகிறோம்', p: ['நீங்கள் அனுப்பும் விவரங்களை பதிலளிக்க, வருகையை ஏற்பாடு செய்ய, விலைப்புள்ளி வழங்க, விற்பனைக்குப் பின் ஆதரவு தர மட்டுமே பயன்படுத்துகிறோம். உங்கள் தகவலை விற்பதில்லை.'] },
      {
        h: 'இந்த இணையதளத்தில் உள்ள மூன்றாம் தரப்பு சேவைகள்',
        li: [
          ['Google Maps', 'தொடர்பு பக்கத்தில் உள்ள வரைபடம் Google-இலிருந்து இணைக்கப்பட்டது; வரைபடம் ஏற்றப்படும் போது Google குக்கீகளை அமைக்கலாம் அல்லது பயன்பாட்டுத் தரவைச் சேகரிக்கலாம்.'],
          ['Google Fonts', 'எழுத்துருக்கள் Google சர்வர்களிலிருந்து ஏற்றப்படுகின்றன; அவை உங்கள் IP முகவரியைப் பெறுகின்றன.'],
          ['WhatsApp', 'நீங்கள் எங்களுக்குச் செய்தி அனுப்பத் தேர்வு செய்யும் போது இணைப்புகள் WhatsApp (Meta)-ஐத் திறக்கின்றன.'],
          ['Cloudflare', 'இணையதளம் Cloudflare-இல் இயங்குகிறது; தளத்தை வழங்கவும் பாதுகாக்கவும் அது வழக்கமான கோரிக்கைத் தரவை (IP முகவரி போன்றவை) செயலாக்குகிறது.'],
        ],
        p: ['இந்த இணையதளம் விளம்பர டிராக்கர்களைப் பயன்படுத்துவதில்லை. அடுத்த முறையும் அதே மொழியில் திறக்க, உங்கள் மொழித் தேர்வை (ஆங்கிலம் அல்லது தமிழ்) உங்கள் பிரவுசரில் நினைவில் வைக்கிறது.'],
      },
      { h: 'உங்கள் தேர்வுகள்', p: ['WhatsApp அல்லது தொலைபேசியில் நீங்கள் பகிர்ந்த தகவல்கள் பற்றிக் கேட்கலாம்; எங்களிடம் உள்ள உங்கள் செய்திகளின் நகலை நீக்கக் கோரலாம் — கீழே உள்ள தொடர்பு விவரங்களைப் பயன்படுத்துங்கள்.'] },
    ],
    contactH: 'தனியுரிமை தொடர்பான கேள்விகளுக்கு',
    phone: 'தொலைபேசி / WhatsApp',
  },
};

export default function Privacy() {
  const meta = routeMeta.privacy;
  const { t, lang } = useLang();
  const c = CONTENT[lang];
  const crumbs = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.privacy'), path: '/privacy' },
  ];
  const h2 = 'mt-10 text-[1.7rem]';
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/privacy" jsonLd={breadcrumb([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }])} />
      <PageHero eyebrow={t('pv.eyebrow')} title={t('pv.title')} intro={t('pv.updated', { date: UPDATED[lang] })} crumbs={crumbs} />
      <article className="container-royal max-w-3xl py-12 text-[0.96rem] leading-relaxed text-ink [&_li]:mt-1.5 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        <p>{c.intro}</p>
        {c.sections.map((s) => (
          <section key={s.h}>
            <h2 className={h2}>{s.h}</h2>
            {s.p && !s.li && s.p.map((x) => <p key={x}>{x}</p>)}
            {s.li && (
              <>
                {s.p && s.h !== c.sections[3].h && <p>{s.p[0]}</p>}
                <ul>
                  {s.li.map((item) =>
                    Array.isArray(item) ? (
                      <li key={item[0]}>
                        <strong>{item[0]}</strong> — {item[1]}
                      </li>
                    ) : (
                      <li key={item}>{item}</li>
                    ),
                  )}
                </ul>
                {s.p && s.h === c.sections[3].h && <p>{s.p[0]}</p>}
              </>
            )}
          </section>
        ))}
        <h2 className={h2}>{c.contactH}</h2>
        <p>
          {t('brand.full')}, {lang === 'ta' ? fullAddressTa : fullAddress}.<br />
          {c.phone}:{' '}
          <a href={telLink} className="text-ocean underline-offset-2 hover:underline">
            {business.phoneDisplay}
          </a>
          {business.email && (
            <>
              {' '}
              · Email:{' '}
              <a href={`mailto:${business.email}`} className="text-ocean underline-offset-2 hover:underline">
                {business.email}
              </a>
            </>
          )}
        </p>
      </article>
    </>
  );
}
