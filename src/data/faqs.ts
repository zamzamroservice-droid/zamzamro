import type { Lang } from './products';

export type FaqTopic = 'Borewell' | 'Filters' | 'Copper' | 'Installation' | 'Softener' | 'Controller' | 'UPS' | 'Offices';

export interface Faq {
  q: string;
  a: string;
  topics: FaqTopic[];
  ta: { q: string; a: string };
}

export const faqTopics: FaqTopic[] = ['Borewell', 'Filters', 'Copper', 'Installation', 'Softener', 'Controller', 'UPS', 'Offices'];
export const faqTopicTa: Record<FaqTopic, string> = {
  Borewell: 'போர்வெல்',
  Filters: 'ஃபில்டர்கள்',
  Copper: 'காப்பர்',
  Installation: 'நிறுவல்',
  Softener: 'சாஃப்ட்னர்',
  Controller: 'கண்ட்ரோலர்',
  UPS: 'UPS',
  Offices: 'அலுவலகங்கள்',
};

export const faqs: Faq[] = [
  {
    q: 'Do you sell and service RO water purifiers in Erode?',
    a: 'Yes. Zam Zam Pure Water System on Poondurai Road, Erode handles RO purifier sales, installation and service. Call or WhatsApp +91 81899 71717 to describe what you need.',
    topics: ['Installation', 'Filters'],
    ta: {
      q: 'ஈரோட்டில் RO சுத்திகரிப்பான் விற்பனையும் சர்வீஸும் செய்கிறீர்களா?',
      a: 'ஆம். ஈரோடு பூந்துறை ரோட்டில் உள்ள ஜம் ஜம் தூய குடிநீர் அமைப்பு RO சுத்திகரிப்பான் விற்பனை, நிறுவல், சர்வீஸ் செய்கிறது. உங்கள் தேவையைச் சொல்ல +91 81899 71717 என்ற எண்ணில் அழைக்கவும் அல்லது WhatsApp செய்யவும்.',
    },
  },
  {
    q: 'Which purifier is right for borewell water?',
    a: 'It depends on your water. Borewell water in many areas can have higher dissolved solids (TDS) and hardness, but every source is different. We recommend a water check first — TDS is one useful reading, but a proper assessment may need additional tests. We then suggest suitable models.',
    topics: ['Borewell'],
    ta: {
      q: 'போர்வெல் நீருக்கு எந்த சுத்திகரிப்பான் ஏற்றது?',
      a: 'அது உங்கள் நீரைப் பொறுத்தது. பல பகுதிகளில் போர்வெல் நீரில் கரைந்த திடப்பொருட்கள் (TDS) மற்றும் கடினத்தன்மை அதிகமாக இருக்கலாம், ஆனால் ஒவ்வொரு ஆதாரமும் வேறுபட்டது. முதலில் நீர் பரிசோதனை செய்ய பரிந்துரைக்கிறோம் — TDS ஒரு பயனுள்ள அளவீடு, ஆனால் முறையான மதிப்பீட்டிற்கு கூடுதல் பரிசோதனைகள் தேவைப்படலாம். பிறகு பொருத்தமான மாடல்களைப் பரிந்துரைப்போம்.',
    },
  },
  {
    q: 'Is a TDS reading enough to know if water is safe?',
    a: 'No. TDS shows the amount of dissolved solids, not whether water is free from bacteria, chemicals or other contaminants. It helps choose a purification approach, but it is not a safety test on its own.',
    topics: ['Borewell'],
    ta: {
      q: 'நீர் பாதுகாப்பானதா என அறிய TDS அளவு மட்டும் போதுமா?',
      a: 'இல்லை. TDS கரைந்த திடப்பொருட்களின் அளவை மட்டுமே காட்டும்; நீரில் பாக்டீரியா, ரசாயனங்கள் அல்லது பிற மாசுகள் இல்லை என்பதைக் காட்டாது. சுத்திகரிப்பு முறையைத் தேர்வு செய்ய உதவும், ஆனால் அதுவே பாதுகாப்புப் பரிசோதனை அல்ல.',
    },
  },
  {
    q: 'How often should filters and the RO membrane be changed?',
    a: 'There is no single interval — it depends on your input water quality, daily usage and the model. Signs like reduced flow or a change in taste are reasons to book a check. We will tell you what needs replacing before doing any work.',
    topics: ['Filters'],
    ta: {
      q: 'ஃபில்டர்களையும் RO மெம்பிரேனையும் எவ்வளவு காலத்திற்கு ஒருமுறை மாற்ற வேண்டும்?',
      a: 'ஒரே இடைவெளி என்று இல்லை — உள்ளீட்டு நீரின் தரம், தினசரி பயன்பாடு, மாடல் ஆகியவற்றைப் பொறுத்தது. நீர் ஓட்டம் குறைதல் அல்லது சுவை மாறுதல் போன்றவை பரிசோதனைக்கான அறிகுறிகள். எந்த வேலைக்கும் முன் எதை மாற்ற வேண்டும் என்று சொல்வோம்.',
    },
  },
  {
    q: 'What do “copper”, “zinc” and “alkaline” mean on purifier labels?',
    a: 'These are features named by purifier brands (for example Aqua 2090 Raga lists RO + Copper with Alkaline, and Nile Aqua Jade lists Zinc + Copper + Alkaline). We describe them exactly as the brands state them and do not make medical or health claims about them. Ask us to explain how each stage works on a given model.',
    topics: ['Copper'],
    ta: {
      q: 'சுத்திகரிப்பான் லேபிள்களில் உள்ள “காப்பர்”, “ஜிங்க்”, “ஆல்கலைன்” என்றால் என்ன?',
      a: 'இவை சுத்திகரிப்பான் பிராண்டுகள் பெயரிடும் அம்சங்கள் (எ.கா. Aqua 2090 Raga — RO + Copper with Alkaline; Nile Aqua Jade — Zinc + Copper + Alkaline). பிராண்டுகள் குறிப்பிடுவதைப் போலவே விவரிக்கிறோம்; இவை குறித்து மருத்துவ அல்லது ஆரோக்கிய உரிமைகோரல்களை நாங்கள் செய்வதில்லை. ஒரு குறிப்பிட்ட மாடலில் ஒவ்வொரு நிலையும் எப்படி வேலை செய்கிறது என்று கேளுங்கள்.',
    },
  },
  {
    q: 'Do you service purifiers of other brands?',
    a: 'Often, yes — but it depends on the model and the availability of compatible parts. Send us the brand and model on WhatsApp and we will confirm before booking.',
    topics: ['Filters', 'Installation'],
    ta: {
      q: 'பிற பிராண்ட் சுத்திகரிப்பான்களுக்கும் சர்வீஸ் செய்கிறீர்களா?',
      a: 'பெரும்பாலும் ஆம் — ஆனால் மாடல் மற்றும் பொருந்தும் பாகங்கள் கிடைப்பதைப் பொறுத்தது. பிராண்ட் மற்றும் மாடலை WhatsApp-இல் அனுப்புங்கள், பதிவு செய்யும் முன் உறுதி செய்வோம்.',
    },
  },
  {
    q: 'What do I need ready for an installation?',
    a: 'Typically a water inlet point, a suitable power socket near the unit, a drain connection where the system needs one, and enough wall or counter space. We will confirm the exact requirements for your model before the visit.',
    topics: ['Installation'],
    ta: {
      q: 'நிறுவலுக்கு நான் என்ன தயார் செய்ய வேண்டும்?',
      a: 'பொதுவாக ஒரு நீர் இணைப்புப் புள்ளி, யூனிட்டுக்கு அருகில் பொருத்தமான மின் சாக்கெட், அமைப்புக்குத் தேவைப்பட்டால் வடிகால் இணைப்பு, போதுமான சுவர் அல்லது மேசை இடம். வருகைக்கு முன் உங்கள் மாடலுக்கான சரியான தேவைகளை உறுதி செய்வோம்.',
    },
  },
  {
    q: 'What does an automatic water level controller do?',
    a: 'It switches your pump on when the tank level is low and off when it is full, so you don’t have to check the tank manually. The controller we supply lists dry-run and overflow protection among its features.',
    topics: ['Controller'],
    ta: {
      q: 'தானியங்கி நீர்மட்ட கண்ட்ரோலர் என்ன செய்யும்?',
      a: 'டேங்கில் நீர் குறையும் போது பம்பை ஆன் செய்து, நிரம்பியதும் ஆஃப் செய்யும் — டேங்கை நீங்களே பார்க்க வேண்டியதில்லை. நாங்கள் வழங்கும் கண்ட்ரோலர் டிரை-ரன் மற்றும் ஓவர்ஃப்ளோ பாதுகாப்பை அம்சங்களாகப் பட்டியலிடுகிறது.',
    },
  },
  {
    q: 'Water softener or RO — which do I need?',
    a: 'They solve different problems. A softener treats hardness (the cause of white scale on taps, tiles and appliances) for the whole house. An RO purifier treats drinking water at a single point. Some homes benefit from both; a water check helps decide.',
    topics: ['Softener', 'Borewell'],
    ta: {
      q: 'வாட்டர் சாஃப்ட்னரா அல்லது RO-வா — எனக்கு எது தேவை?',
      a: 'இரண்டும் வெவ்வேறு பிரச்சனைகளைத் தீர்க்கின்றன. சாஃப்ட்னர் முழு வீட்டிற்கும் கடினத்தன்மையை (குழாய், டைல்ஸ், சாதனங்களில் வெள்ளைப் படிவுக்குக் காரணம்) கையாள்கிறது. RO ஒரு இடத்தில் குடிநீரைச் சுத்திகரிக்கிறது. சில வீடுகளுக்கு இரண்டும் பயன்படும்; நீர் பரிசோதனை முடிவெடுக்க உதவும்.',
    },
  },
  {
    q: 'Do you sell and install UPS and inverter batteries?',
    a: 'Yes, UPS battery sales, service and installation are part of what we do. Share your current set-up and we will advise on a suitable battery; brands, capacities and prices are shared on enquiry.',
    topics: ['UPS'],
    ta: {
      q: 'UPS மற்றும் இன்வெர்ட்டர் பேட்டரிகளை விற்று நிறுவுகிறீர்களா?',
      a: 'ஆம், UPS பேட்டரி விற்பனை, சர்வீஸ், நிறுவல் எங்கள் சேவைகளில் அடங்கும். உங்கள் தற்போதைய அமைப்பைப் பகிருங்கள், பொருத்தமான பேட்டரியைப் பரிந்துரைப்போம்; பிராண்ட், கொள்ளளவு, விலை விசாரணையில் பகிரப்படும்.',
    },
  },
  {
    q: 'Do you handle offices, schools and commercial sites?',
    a: 'Yes. We offer stainless-steel pure water systems (Standard and Hot & Normal) and a triple-stage purifier for higher-demand spaces. A site visit helps us plan the right set-up.',
    topics: ['Offices'],
    ta: {
      q: 'அலுவலகங்கள், பள்ளிகள், வணிக இடங்களுக்கும் செய்கிறீர்களா?',
      a: 'ஆம். ஸ்டெயின்லெஸ் ஸ்டீல் தூய நீர் அமைப்புகள் (Standard மற்றும் Hot & Normal) மற்றும் அதிக தேவையுள்ள இடங்களுக்கு மூன்று நிலை சுத்திகரிப்பானை வழங்குகிறோம். சரியான அமைப்பைத் திட்டமிட இட வருகை உதவும்.',
    },
  },
  {
    q: 'Does submitting the enquiry form book an appointment?',
    a: 'No. The form prepares a WhatsApp message with your details. Your booking is confirmed only when we reply to you on WhatsApp or by phone.',
    topics: ['Installation'],
    ta: {
      q: 'விசாரணைப் படிவத்தைச் சமர்ப்பித்தால் சந்திப்பு பதிவாகுமா?',
      a: 'இல்லை. படிவம் உங்கள் விவரங்களுடன் WhatsApp செய்தியைத் தயார் செய்கிறது. நாங்கள் WhatsApp அல்லது தொலைபேசியில் பதிலளிக்கும் போது மட்டுமே பதிவு உறுதியாகும்.',
    },
  },
];

export const ftext = (f: Faq, lang: Lang) => (lang === 'ta' ? f.ta : { q: f.q, a: f.a });
