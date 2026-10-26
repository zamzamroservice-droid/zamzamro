import type { LucideIcon } from 'lucide-react';
import { BatteryCharging, Building2, Droplets, Filter, Gauge, ShoppingBag, Sparkles, Waves, Wrench } from 'lucide-react';
import type { Lang } from './products';

export interface ServiceText {
  name: string;
  description: string;
  details: string[];
}

export interface Service extends ServiceText {
  id: string;
  icon: LucideIcon;
  image?: string;
  /** Product to pre-select in the enquiry form, if relevant. */
  productSlug?: string;
  ta: ServiceText;
}

export const services: Service[] = [
  {
    id: 'ro-sales',
    name: 'RO Purifier Sales',
    icon: ShoppingBag,
    description: 'Home purifiers from Aqua Era, Aqua 2090, Nile, LX One, Water Pia, Purosis, Merlin, Canix, Lexpure, Clean Water and Aqua Roma — chosen for your water, not just your budget.',
    details: ['Advice based on your water source', 'Compare models side by side', 'Current prices shared on enquiry'],
    image: '/images/purosis-puroaqua-sm.webp',
    ta: {
      name: 'RO சுத்திகரிப்பான் விற்பனை',
      description: 'Aqua Era, Aqua 2090, Nile, LX One, Water Pia, Purosis, Merlin, Canix, Lexpure, Clean Water, Aqua Roma வீட்டு சுத்திகரிப்பான்கள் — உங்கள் பட்ஜெட்டுக்கு மட்டுமல்ல, உங்கள் நீருக்கும் ஏற்றபடி.',
      details: ['உங்கள் நீர் ஆதாரத்தின் அடிப்படையில் ஆலோசனை', 'மாடல்களை ஒப்பிட்டுப் பாருங்கள்', 'தற்போதைய விலை விசாரணையில்'],
    },
  },
  {
    id: 'installation',
    name: 'Expert Installation',
    icon: Wrench,
    description: 'Careful fitting at your home or workplace, followed by a demonstration of how to use and look after your system.',
    details: ['Site check before fitting', 'Neat inlet, drain and power connections', 'Demonstration after installation'],
    image: '/images/aqua-2090-raga-green-kitchen-sm.webp',
    ta: {
      name: 'நிபுணர் நிறுவல்',
      description: 'உங்கள் வீடு அல்லது பணியிடத்தில் கவனமான பொருத்துதல், பிறகு பயன்படுத்தும் மற்றும் பராமரிக்கும் முறையின் செயல்விளக்கம்.',
      details: ['பொருத்தும் முன் இடப் பரிசோதனை', 'நேர்த்தியான நீர், வடிகால், மின் இணைப்புகள்', 'நிறுவலுக்குப் பின் செயல்விளக்கம்'],
    },
  },
  {
    id: 'repair',
    name: 'RO Repair & Service',
    icon: Gauge,
    description: 'Low flow, unusual taste, leaks or indicator warnings — tell us what you notice and we will diagnose the cause.',
    details: ['Diagnosis of common faults', 'Service for other brands on confirmation', 'Clear explanation before any work'],
    ta: {
      name: 'RO பழுதுபார்ப்பு & சர்வீஸ்',
      description: 'குறைந்த நீர் ஓட்டம், வித்தியாசமான சுவை, கசிவு அல்லது எச்சரிக்கை விளக்குகள் — நீங்கள் கவனித்ததைச் சொல்லுங்கள், காரணத்தைக் கண்டறிவோம்.',
      details: ['பொதுவான பழுதுகளைக் கண்டறிதல்', 'பிற பிராண்டுகளுக்கும் உறுதி செய்த பின் சர்வீஸ்', 'எந்த வேலைக்கும் முன் தெளிவான விளக்கம்'],
    },
  },
  {
    id: 'filters',
    name: 'Filter & Membrane Change',
    icon: Filter,
    description: 'Replacement of sediment, carbon and RO membrane elements when they reach the end of their useful life.',
    details: ['Replacement interval depends on water & usage', 'Compatible parts confirmed on enquiry'],
    ta: {
      name: 'ஃபில்டர் & மெம்பிரேன் மாற்றம்',
      description: 'வண்டல், கார்பன், RO மெம்பிரேன் ஆகியவை பயன்பாட்டுக் காலம் முடிந்ததும் மாற்றுதல்.',
      details: ['மாற்றும் இடைவெளி நீர் & பயன்பாட்டைப் பொறுத்தது', 'பொருந்தும் பாகங்கள் விசாரணையில் உறுதி'],
    },
  },
  {
    id: 'sanitisation',
    name: 'Maintenance & Sanitisation',
    icon: Sparkles,
    description: 'Periodic cleaning of the storage tank and a general check-up to keep your purifier performing well.',
    details: ['Tank cleaning', 'General check-up', 'Schedule on WhatsApp'],
    ta: {
      name: 'பராமரிப்பு & சுத்தப்படுத்தல்',
      description: 'சுத்திகரிப்பான் சிறப்பாக இயங்க சேமிப்பு டேங்கை அவ்வப்போது சுத்தம் செய்தல் மற்றும் பொதுப் பரிசோதனை.',
      details: ['டேங்க் சுத்தம்', 'பொதுப் பரிசோதனை', 'WhatsApp-இல் நேரம் குறிக்கவும்'],
    },
  },
  {
    id: 'commercial',
    name: 'Commercial & SS Systems',
    icon: Building2,
    description: 'Stainless-steel pure water systems and triple-stage purifiers for offices, schools, clinics and businesses.',
    details: ['Standard and Hot & Normal SS systems', 'Triple-stage commercial purifier', 'Site visit to plan the set-up'],
    image: '/images/zamzam-ss-hot-normal-photo-sm.webp',
    productSlug: 'zamzam-standard-ss-system',
    ta: {
      name: 'வணிக & ஸ்டீல் அமைப்புகள்',
      description: 'அலுவலகங்கள், பள்ளிகள், கிளினிக்குகள், வணிகங்களுக்கான ஸ்டெயின்லெஸ் ஸ்டீல் தூய நீர் அமைப்புகள் மற்றும் மூன்று நிலை சுத்திகரிப்பான்கள்.',
      details: ['Standard மற்றும் Hot & Normal ஸ்டீல் அமைப்புகள்', 'மூன்று நிலை வணிக சுத்திகரிப்பான்', 'அமைப்பைத் திட்டமிட இட வருகை'],
    },
  },
  {
    id: 'softener',
    name: 'Water Softener',
    icon: Waves,
    description: 'Whole-house softener set-ups for homes troubled by hard-water scale on taps, tiles and appliances.',
    details: ['Hardness check recommended first', 'Softener vessel, brine tank & pre-filter'],
    image: '/images/water-softener-installation-sm.webp',
    productSlug: 'whole-house-water-softener',
    ta: {
      name: 'வாட்டர் சாஃப்ட்னர்',
      description: 'குழாய்கள், டைல்ஸ், சாதனங்களில் கடின நீர் படிவால் சிரமப்படும் வீடுகளுக்கு முழு வீட்டு சாஃப்ட்னர் அமைப்பு.',
      details: ['முதலில் கடினத்தன்மை பரிசோதனை பரிந்துரை', 'சாஃப்ட்னர் கலன், உப்புநீர் டேங்க் & முன் ஃபில்டர்'],
    },
  },
  {
    id: 'ups',
    name: 'UPS Battery',
    icon: BatteryCharging,
    description: 'UPS and inverter battery sales, service and installation for homes, shops and offices.',
    details: ['Advice on a suitable battery', 'Installation & replacement'],
    productSlug: 'ups-inverter-batteries',
    ta: {
      name: 'UPS பேட்டரி',
      description: 'வீடுகள், கடைகள், அலுவலகங்களுக்கு UPS & இன்வெர்ட்டர் பேட்டரி விற்பனை, சர்வீஸ், நிறுவல்.',
      details: ['பொருத்தமான பேட்டரி ஆலோசனை', 'நிறுவல் & மாற்றம்'],
    },
  },
  {
    id: 'level-controller',
    name: 'Water Level Controller',
    icon: Droplets,
    description: 'Automatic pump control for overhead tanks and sumps, with dry-run and overflow protection as listed by the product.',
    details: ['Automatic pump on / off', 'Panel status indicators', 'Installation included on enquiry'],
    image: '/images/automatic-water-level-controller-sm.webp',
    productSlug: 'automatic-water-level-controller',
    ta: {
      name: 'நீர்மட்ட கண்ட்ரோலர்',
      description: 'மேல்நிலை டேங்க் மற்றும் சம்ப்களுக்கான தானியங்கி பம்ப் கட்டுப்பாடு — தயாரிப்பில் பட்டியலிட்டபடி டிரை-ரன் & ஓவர்ஃப்ளோ பாதுகாப்பு.',
      details: ['தானியங்கி பம்ப் ஆன் / ஆஃப்', 'பேனல் நிலை குறிகாட்டிகள்', 'நிறுவல் விவரம் விசாரணையில்'],
    },
  },
];

export const stext = (s: Service, lang: Lang): ServiceText => (lang === 'ta' ? s.ta : s);
/** Service names as sent in WhatsApp messages (English values) with localised labels. */
export const serviceOptions = (lang: Lang) => [
  ...services.map((s) => ({ value: s.name, label: stext(s, lang).name })),
  { value: 'Water check / advice', label: lang === 'ta' ? 'நீர் பரிசோதனை / ஆலோசனை' : 'Water check / advice' },
  { value: 'Other', label: lang === 'ta' ? 'மற்றவை' : 'Other' },
];
