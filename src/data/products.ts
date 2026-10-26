// Product catalogue. Every description, feature, colour and figure below is taken from the brand
// creatives supplied by Zam Zam (see assets/raw and assets/raw/v2). Nothing is invented: prices,
// capacities, warranties, power ratings and dimensions are left empty unless a creative states
// them, and render as "Enquire for details". Tamil text (`ta`) mirrors the English exactly.

export type CategoryId = 'home-ro' | 'commercial' | 'solutions';
export type Lang = 'en' | 'ta';

export interface ProductImage {
  src: string;
  /** Smaller variant for cards & thumbnails. */
  sm: string;
  alt: string;
}

export interface ProductColour {
  id: string;
  name: string;
  hex: string;
  /** Index into `images` showing this colour, when a photo exists. */
  image?: number;
}

export interface ProductSpec {
  label: string;
  /** Leave undefined until verified — the UI shows "Enquire for details". */
  value?: string;
  ta?: { label: string; value?: string };
}

export interface ProductText {
  short: string;
  summary: string;
  highlights: string[];
  useCases: string[];
}

export interface Product extends ProductText {
  slug: string;
  name: string;
  brand: string;
  series?: string;
  category: CategoryId;
  technology: string[];
  colours: ProductColour[];
  images: ProductImage[];
  specs: ProductSpec[];
  featured?: boolean;
  /** Where the claims on this page come from. */
  source: string;
  /** Tamil translation of the descriptive text. */
  ta: ProductText;
  /** Tags used by the water-source matcher. */
  suits?: { highTds?: boolean; sources?: WaterSourceId[]; business?: boolean };
}

export type WaterSourceId = 'borewell' | 'tanker' | 'municipal' | 'corporation' | 'open-well' | 'business';

export const categories: { id: CategoryId; label: string; short: string; ta: string; taShort: string }[] = [
  { id: 'home-ro', label: 'Home RO Purifiers', short: 'Home RO', ta: 'வீட்டு RO சுத்திகரிப்பான்கள்', taShort: 'வீட்டு RO' },
  { id: 'commercial', label: 'Commercial & Stainless-Steel Systems', short: 'Commercial & SS', ta: 'வணிக & ஸ்டெயின்லெஸ் ஸ்டீல் அமைப்புகள்', taShort: 'வணிக & SS' },
  { id: 'solutions', label: 'Water & Power Solutions', short: 'Water & Power', ta: 'தண்ணீர் & மின் தீர்வுகள்', taShort: 'தண்ணீர் & மின்' },
];

const im = (name: string, alt: string): ProductImage => ({ src: `/images/${name}.webp`, sm: `/images/${name}-sm.webp`, alt });

const SPEC_TA: Record<string, string> = {
  'Purification technology': 'சுத்திகரிப்பு தொழில்நுட்பம்',
  'Input water TDS': 'உள்ளீட்டு நீர் TDS',
  'Storage capacity': 'சேமிப்பு கொள்ளளவு',
  'Purification rate': 'சுத்திகரிப்பு வேகம்',
  Power: 'மின் தேவை',
  Dimensions: 'அளவுகள்',
  Warranty: 'உத்தரவாதம்',
  Pump: 'பம்ப்',
  'Vessel size': 'கலன் அளவு',
  'Flow rate': 'ஓட்ட வேகம்',
  Regeneration: 'மீளுருவாக்கம்',
  'Panel indicators': 'பேனல் குறிகாட்டிகள்',
  'Pump rating': 'பம்ப் திறன்',
  'Sensor type': 'சென்சார் வகை',
  Brands: 'பிராண்டுகள்',
  Capacity: 'கொள்ளளவு',
};

/** Spec rows — values only where the brand creative states them; Tamil labels added automatically. */
const specs = (labels: string[], known: Record<string, [string, string]> = {}): ProductSpec[] =>
  labels.map((label) => ({
    label,
    value: known[label]?.[0],
    ta: { label: SPEC_TA[label] ?? label, value: known[label]?.[1] },
  }));
const STD = ['Purification technology', 'Input water TDS', 'Storage capacity', 'Purification rate', 'Power', 'Dimensions', 'Warranty'];

export const products: Product[] = [
  // ── Home RO purifiers ──────────────────────────────────────────────────────
  {
    slug: 'aqua-era-zempure',
    name: 'Aqua Era Zempure',
    brand: 'Aqua Era',
    series: 'Core Series',
    category: 'home-ro',
    short: '“Drink on time.” Pure. Premium. Powerful.',
    summary:
      'From the Aqua Era Core Series, Zempure pairs a finely ribbed storage tank with a brushed-silver ERA band, a framed push tap with a chrome nozzle, and a front strip showing Power, Full and Alert status. The Core finishes shown by the brand are Charcoal Black and Pearl White.',
    technology: ['Power · Full · Alert indicators'],
    highlights: ['Finely ribbed storage tank', 'Brushed-silver ERA band', 'Framed push tap with chrome nozzle', 'Power, Full & Alert indicators', 'Charcoal Black or Pearl White (Core finishes)'],
    useCases: ['Modern kitchens', 'Homes', 'Apartments'],
    colours: [
      { id: 'charcoal-black', name: 'Charcoal Black', hex: '#2c2e33', image: 0 },
      { id: 'pearl-white', name: 'Pearl White', hex: '#eef0f1', image: 2 },
    ],
    images: [
      im('aqua-era-zempure-charcoal', 'Aqua Era Zempure Core Series water purifier in Charcoal Black, front view'),
      im('aqua-era-charcoal-black', 'Aqua Era Core in Charcoal Black'),
      im('aqua-era-pearl-white', 'Aqua Era Core in Pearl White'),
      im('aqua-era-range', 'Aqua Era water purifier range in six finishes'),
    ],
    specs: specs(STD),
    featured: true,
    source: 'Aqua Era Zempure product photograph and Aqua Era range creative',
    ta: {
      short: '“சரியான நேரத்தில் குடியுங்கள்.” தூய்மை. பிரீமியம். சக்தி.',
      summary:
        'Aqua Era Core Series-இன் Zempure, நுணுக்கமான வரிகள் கொண்ட சேமிப்பு டேங்க், பிரஷ்டு சில்வர் ERA பட்டை, குரோம் முனையுடன் சட்டமிட்ட புஷ் குழாய், மற்றும் Power, Full, Alert நிலையைக் காட்டும் முன் பட்டையைக் கொண்டுள்ளது. பிராண்ட் காட்டும் Core நிறங்கள்: Charcoal Black மற்றும் Pearl White.',
      highlights: ['நுணுக்கமான வரிகள் கொண்ட சேமிப்பு டேங்க்', 'பிரஷ்டு சில்வர் ERA பட்டை', 'குரோம் முனையுடன் சட்டமிட்ட புஷ் குழாய்', 'Power, Full & Alert குறிகாட்டிகள்', 'Charcoal Black அல்லது Pearl White (Core நிறங்கள்)'],
      useCases: ['நவீன சமையலறைகள்', 'வீடுகள்', 'அடுக்குமாடி குடியிருப்புகள்'],
    },
  },
  {
    slug: 'aqua-era-range',
    name: 'Aqua Era Water Purifier Range',
    brand: 'Aqua Era',
    series: 'Silk · Elite · Core',
    category: 'home-ro',
    short: 'Pure. Premium. Powerful. — in six finishes.',
    summary:
      'The Aqua Era range is shown in six finishes: Silk Blue and Silk Beige (Silk badge), Urban Grey and Forest Blue (Elite badge), and Charcoal Black and Pearl White (Core badge). Each pairs a ribbed storage tank with a brushed band, a framed tap and a front indicator strip.',
    technology: ['Ribbed storage tank', 'Front indicator strip'],
    highlights: ['Six finishes', 'Silk, Elite and Core badges (as shown by the brand)', 'Ribbed storage tank', 'Brushed band with framed tap'],
    useCases: ['Homes', 'Colour-matched kitchens'],
    colours: [
      { id: 'silk-blue', name: 'Silk Blue', hex: '#b9d3e6', image: 1 },
      { id: 'silk-beige', name: 'Silk Beige', hex: '#d6cdc4', image: 2 },
      { id: 'urban-grey', name: 'Urban Grey', hex: '#55595f', image: 3 },
      { id: 'charcoal-black', name: 'Charcoal Black', hex: '#2c2e33', image: 4 },
      { id: 'pearl-white', name: 'Pearl White', hex: '#eef0f1', image: 5 },
      { id: 'forest-blue', name: 'Forest Blue', hex: '#3a4a63', image: 6 },
    ],
    images: [
      im('aqua-era-range', 'Aqua Era water purifier range in six finishes'),
      im('aqua-era-silk-blue', 'Aqua Era in Silk Blue'),
      im('aqua-era-silk-beige', 'Aqua Era in Silk Beige'),
      im('aqua-era-urban-grey', 'Aqua Era in Urban Grey'),
      im('aqua-era-charcoal-black', 'Aqua Era in Charcoal Black'),
      im('aqua-era-pearl-white', 'Aqua Era in Pearl White'),
      im('aqua-era-forest-blue', 'Aqua Era in Forest Blue'),
    ],
    specs: specs(STD),
    source: 'Aqua Era range creative',
    ta: {
      short: 'தூய்மை. பிரீமியம். சக்தி. — ஆறு நிறங்களில்.',
      summary:
        'Aqua Era வரிசை ஆறு நிறங்களில் காட்டப்படுகிறது: Silk Blue, Silk Beige (Silk), Urban Grey, Forest Blue (Elite), Charcoal Black, Pearl White (Core). ஒவ்வொன்றிலும் வரிவரியான சேமிப்பு டேங்க், பிரஷ்டு பட்டை, சட்டமிட்ட குழாய், முன் குறிகாட்டி பட்டை உள்ளன.',
      highlights: ['ஆறு நிறங்கள்', 'Silk, Elite, Core பேட்ஜ்கள் (பிராண்ட் காட்டியபடி)', 'வரிவரியான சேமிப்பு டேங்க்', 'சட்டமிட்ட குழாயுடன் பிரஷ்டு பட்டை'],
      useCases: ['வீடுகள்', 'நிறம் பொருந்தும் சமையலறைகள்'],
    },
  },
  {
    slug: 'aqua-2090-raga',
    name: 'Aqua 2090 Raga',
    brand: 'Aqua 2090',
    series: 'Raga Series',
    category: 'home-ro',
    short: 'RO + Copper with Alkaline, in six designer shades.',
    summary:
      'The Raga Series from Aqua 2090 is presented as “Advance Technology — RO + Copper with Alkaline”. A satin cabinet with a raised front door, a ribbed smoked tank, a framed push tap and a front indicator panel make it as much a kitchen accent as a purifier.',
    technology: ['RO', 'Copper', 'Alkaline'],
    highlights: ['RO + Copper with Alkaline (as stated by the brand)', 'Front indicator panel', 'Ribbed smoked storage tank', 'Framed push tap with chrome nozzle', 'Six colour options'],
    useCases: ['Homes', 'Apartments', 'Modern kitchens'],
    colours: [
      { id: 'sky-blue', name: 'Sky Blue', hex: '#9fd6dc', image: 0 },
      { id: 'rose-pink', name: 'Rose Pink', hex: '#efbcb5', image: 1 },
      { id: 'mint-green', name: 'Mint Green', hex: '#aed59c', image: 2 },
      { id: 'champagne', name: 'Champagne', hex: '#d9cba3', image: 3 },
      { id: 'royal-purple', name: 'Royal Purple', hex: '#4f3a60', image: 4 },
      { id: 'graphite', name: 'Graphite', hex: '#4a4e56', image: 5 },
    ],
    images: [
      im('aqua-2090-sky-blue', 'Aqua 2090 Raga Series RO purifier in Sky Blue'),
      im('aqua-2090-rose-pink', 'Aqua 2090 Raga Series RO purifier in Rose Pink'),
      im('aqua-2090-mint-green', 'Aqua 2090 Raga Series RO purifier in Mint Green'),
      im('aqua-2090-champagne', 'Aqua 2090 Raga Series RO purifier in Champagne'),
      im('aqua-2090-royal-purple', 'Aqua 2090 Raga Series RO purifier in Royal Purple'),
      im('aqua-2090-graphite', 'Aqua 2090 Raga Series RO purifier in Graphite'),
      im('aqua-2090-raga-green-kitchen', 'Green Aqua 2090 Raga mounted on a kitchen wall'),
      im('aqua-2090-raga-collection', 'Aqua 2090 Raga Series colour range — RO + Copper with Alkaline'),
    ],
    specs: specs(STD, { 'Purification technology': ['RO + Copper with Alkaline', 'RO + காப்பர் உடன் ஆல்கலைன்'] }),
    featured: true,
    source: 'Aqua 2090 Raga Series creatives and product photographs',
    suits: { sources: ['borewell', 'municipal', 'corporation', 'tanker'] },
    ta: {
      short: 'RO + காப்பர் உடன் ஆல்கலைன் — ஆறு அழகிய நிறங்களில்.',
      summary:
        'Aqua 2090 Raga Series “Advance Technology — RO + Copper with Alkaline” என அறிமுகப்படுத்தப்படுகிறது. சாட்டின் கேபினட், உயர்ந்த முன் கதவு, வரிவரியான புகை நிற டேங்க், சட்டமிட்ட புஷ் குழாய் மற்றும் முன் குறிகாட்டி பேனல் — சமையலறைக்கு ஒரு அழகுப் பொருளாகவும் திகழ்கிறது.',
      highlights: ['RO + காப்பர் உடன் ஆல்கலைன் (பிராண்ட் குறிப்பிட்டபடி)', 'முன் குறிகாட்டி பேனல்', 'வரிவரியான புகை நிற சேமிப்பு டேங்க்', 'குரோம் முனையுடன் சட்டமிட்ட புஷ் குழாய்', 'ஆறு நிறத் தேர்வுகள்'],
      useCases: ['வீடுகள்', 'அடுக்குமாடி குடியிருப்புகள்', 'நவீன சமையலறைகள்'],
    },
  },
  {
    slug: 'nile-aqua-2090-next',
    name: 'Aqua 2090 Next',
    brand: 'Nile',
    series: 'Next Generation',
    category: 'home-ro',
    short: 'Unique & elegant — RO + Copper with Alkaline.',
    summary:
      'From Nile, the Aqua 2090 Next Generation pairs “Advance Technology — RO + Copper with Alkaline” with a 10-litre detachable storage tank in a clean white-and-teal design.',
    technology: ['RO', 'Copper', 'Alkaline'],
    highlights: ['RO + Copper with Alkaline (as stated)', '10 L detachable storage tank', 'Front indicator strip', 'White & teal design'],
    useCases: ['Families', 'Homes', 'Apartments'],
    colours: [{ id: 'white-teal', name: 'White & Teal', hex: '#3fb3b8', image: 0 }],
    images: [im('nile-aqua-2090-next', 'Nile Aqua 2090 Next Generation purifier with 10 litre detachable tank')],
    specs: specs(STD, {
      'Purification technology': ['RO + Copper with Alkaline', 'RO + காப்பர் உடன் ஆல்கலைன்'],
      'Storage capacity': ['10 litres (detachable)', '10 லிட்டர் (பிரிக்கக்கூடியது)'],
    }),
    source: 'Nile Aqua 2090 Next creative',
    suits: { sources: ['municipal', 'corporation', 'borewell'] },
    ta: {
      short: 'தனித்துவமும் நேர்த்தியும் — RO + காப்பர் உடன் ஆல்கலைன்.',
      summary: 'Nile-இன் Aqua 2090 Next Generation, “Advance Technology — RO + Copper with Alkaline” உடன் 10 லிட்டர் பிரிக்கக்கூடிய சேமிப்பு டேங்கை வெள்ளை-டீல் வடிவமைப்பில் வழங்குகிறது.',
      highlights: ['RO + காப்பர் உடன் ஆல்கலைன் (குறிப்பிட்டபடி)', '10 லி பிரிக்கக்கூடிய சேமிப்பு டேங்க்', 'முன் குறிகாட்டி பட்டை', 'வெள்ளை & டீல் வடிவமைப்பு'],
      useCases: ['குடும்பங்கள்', 'வீடுகள்', 'அடுக்குமாடி குடியிருப்புகள்'],
    },
  },
  {
    slug: 'nile-aqua-innovica',
    name: 'Aqua Innovica',
    brand: 'Nile',
    category: 'home-ro',
    short: '“Power of colours, strength of innovation.”',
    summary:
      'Nile Aqua Innovica is a compact water purification system shown in five colourways, with a 9-litre storage tank, multi-stage purification and Zinc, Copper & Alkaline filtration as described by the brand.',
    technology: ['Multi-stage purification', 'Zinc', 'Copper', 'Alkaline'],
    highlights: ['Compact design', '9 L storage', 'Multi-stage purification', 'Zinc, Copper & Alkaline (as described)', 'Five colourways'],
    useCases: ['Compact kitchens', 'Homes', 'Apartments'],
    colours: [
      { id: 'black-copper', name: 'Black & Copper', hex: '#1d1d1f', image: 1 },
      { id: 'white-teal', name: 'White & Teal', hex: '#5fbfc0', image: 0 },
      { id: 'white-blue', name: 'White & Blue', hex: '#8fb4d6', image: 0 },
      { id: 'silver', name: 'Silver', hex: '#b8bbbf', image: 0 },
      { id: 'lavender-blue', name: 'Lavender Blue', hex: '#7f8fc4', image: 0 },
    ],
    images: [
      im('nile-aqua-innovica-range', 'Nile Aqua Innovica purifiers in five colours'),
      im('nile-aqua-innovica-black', 'Nile Aqua Innovica in black with copper accent on a kitchen counter'),
    ],
    specs: specs(STD, { 'Storage capacity': ['9 litres', '9 லிட்டர்'], 'Purification technology': ['Multi-stage · Zinc, Copper & Alkaline', 'பல நிலை · ஜிங்க், காப்பர் & ஆல்கலைன்'] }),
    featured: true,
    source: 'Nile Aqua Innovica creatives',
    suits: { sources: ['municipal', 'corporation'] },
    ta: {
      short: '“நிறங்களின் சக்தி, புதுமையின் வலிமை.”',
      summary: 'Nile Aqua Innovica ஐந்து நிறங்களில் கிடைக்கும் கச்சிதமான சுத்திகரிப்பு அமைப்பு — 9 லிட்டர் சேமிப்பு டேங்க், பல நிலை சுத்திகரிப்பு மற்றும் பிராண்ட் விவரித்தபடி ஜிங்க், காப்பர் & ஆல்கலைன் வடிகட்டல்.',
      highlights: ['கச்சிதமான வடிவமைப்பு', '9 லி சேமிப்பு', 'பல நிலை சுத்திகரிப்பு', 'ஜிங்க், காப்பர் & ஆல்கலைன் (விவரித்தபடி)', 'ஐந்து நிறங்கள்'],
      useCases: ['சிறிய சமையலறைகள்', 'வீடுகள்', 'அடுக்குமாடி குடியிருப்புகள்'],
    },
  },
  {
    slug: 'lx-one-titanium',
    name: 'LX One Titanium',
    brand: 'LX One',
    series: 'Titanium Series · Gun Metal',
    category: 'home-ro',
    short: 'Engineered for purity. Designed for life.',
    summary:
      'A statement purifier in a premium gun-metal finish. The brand describes the Titanium Series as “built to last, titanium tough”, with advanced purification and intelligent performance, finished with a clean front indicator column.',
    technology: ['Advanced purification', 'Intelligent indicators'],
    highlights: ['Premium gun-metal finish', 'Built to last — “titanium tough”', 'Advanced purification, intelligent performance', 'Smoked transparent tank'],
    useCases: ['Premium kitchens', 'Villas', 'Offices'],
    colours: [{ id: 'gun-metal', name: 'Gun Metal', hex: '#4a4c50', image: 0 }],
    images: [im('lx-one-titanium-gun-metal', 'LX One Titanium Series water purifier in gun metal')],
    specs: specs(STD),
    featured: true,
    source: 'LX One Titanium Series creative',
    ta: {
      short: 'தூய்மைக்காக உருவாக்கப்பட்டது. வாழ்க்கைக்காக வடிவமைக்கப்பட்டது.',
      summary: 'பிரீமியம் கன்-மெட்டல் நிறத்தில் கம்பீரமான சுத்திகரிப்பான். Titanium Series-ஐ பிராண்ட் “நீடித்து உழைக்கும், டைட்டானியம் வலிமை” என விவரிக்கிறது — மேம்பட்ட சுத்திகரிப்பு, புத்திசாலித்தனமான செயல்திறன்.',
      highlights: ['பிரீமியம் கன்-மெட்டல் நிறம்', 'நீடித்து உழைக்கும் — “டைட்டானியம் வலிமை”', 'மேம்பட்ட சுத்திகரிப்பு, புத்திசாலித்தனமான செயல்திறன்', 'புகை நிற வெளிப்படையான டேங்க்'],
      useCases: ['பிரீமியம் சமையலறைகள்', 'வில்லாக்கள்', 'அலுவலகங்கள்'],
    },
  },
  {
    slug: 'water-pia',
    name: 'Water Pia',
    brand: 'Water Pia',
    series: 'Aqua Fresh Technology',
    category: 'home-ro',
    short: 'Experience the luxury of perfection.',
    summary:
      'Water Pia pairs a sculpted cabinet and light-ray artwork with Aqua Fresh Technology and a smart LED indicator, so it is easy to see at a glance what the purifier is doing.',
    technology: ['Aqua Fresh Technology', 'Smart LED indicator'],
    highlights: ['Smart LED indicator', 'Aqua Fresh Technology', 'See-through tank windows', 'Light-ray artwork'],
    useCases: ['Homes', 'Small offices'],
    colours: [
      { id: 'white-blue', name: 'White & Blue', hex: '#4b8fcf', image: 0 },
      { id: 'white-teal', name: 'White & Teal', hex: '#3fa9b8', image: 0 },
      { id: 'maroon', name: 'Maroon', hex: '#6e1d26', image: 0 },
      { id: 'black-copper', name: 'Black & Copper', hex: '#1d1d1f', image: 0 },
      { id: 'grey', name: 'Grey', hex: '#9b9c9e', image: 0 },
    ],
    images: [im('water-pia-collection', 'Water Pia water purifiers in five colours with smart LED indicator')],
    specs: specs(STD),
    featured: true,
    source: 'Water Pia creative',
    ta: {
      short: 'முழுமையின் ஆடம்பரத்தை அனுபவியுங்கள்.',
      summary: 'Water Pia செதுக்கிய கேபினட், ஒளிக்கதிர் ஓவியம், Aqua Fresh Technology மற்றும் ஸ்மார்ட் LED குறிகாட்டியைக் கொண்டுள்ளது — சுத்திகரிப்பான் என்ன செய்கிறது என்பதை ஒரே பார்வையில் அறியலாம்.',
      highlights: ['ஸ்மார்ட் LED குறிகாட்டி', 'Aqua Fresh Technology', 'உள்ளே தெரியும் டேங்க் சாளரங்கள்', 'ஒளிக்கதிர் ஓவியம்'],
      useCases: ['வீடுகள்', 'சிறிய அலுவலகங்கள்'],
    },
  },
  {
    slug: 'nile-aqua-jade',
    name: 'Nile Aqua Jade',
    brand: 'Nile',
    series: 'Aqua Jade',
    category: 'home-ro',
    short: 'Start drinking safe & healthy water.',
    summary: 'From Nile, Aqua Jade carries a Zinc + Copper + Alkaline label and a large transparent storage tank in a compact, clean-lined body — shown in five colourways.',
    technology: ['Zinc', 'Copper', 'Alkaline'],
    highlights: ['Zinc + Copper + Alkaline (as labelled)', 'Large transparent tank', 'Front indicator lights', 'Five colourways'],
    useCases: ['Families', 'Apartments'],
    colours: [
      { id: 'white-aqua', name: 'White & Aqua', hex: '#38b6c8', image: 0 },
      { id: 'black', name: 'Black', hex: '#2b2b2d', image: 0 },
      { id: 'teal', name: 'Teal', hex: '#2f7d95', image: 0 },
      { id: 'grey', name: 'Grey', hex: '#b9bcc0', image: 0 },
      { id: 'white-blue', name: 'White & Blue', hex: '#2f6cc0', image: 0 },
    ],
    images: [im('nile-aqua-jade-collection', 'Nile Aqua Jade water purifiers in five colours')],
    specs: specs(STD, { 'Purification technology': ['Zinc + Copper + Alkaline (as labelled)', 'ஜிங்க் + காப்பர் + ஆல்கலைன் (லேபிளின்படி)'] }),
    featured: true,
    source: 'Nile Aqua Jade creative',
    ta: {
      short: 'பாதுகாப்பான, ஆரோக்கியமான தண்ணீரைக் குடிக்கத் தொடங்குங்கள்.',
      summary: 'Nile-இன் Aqua Jade, ஜிங்க் + காப்பர் + ஆல்கலைன் லேபிளுடன், பெரிய வெளிப்படையான சேமிப்பு டேங்கை கச்சிதமான உடலில் ஐந்து நிறங்களில் வழங்குகிறது.',
      highlights: ['ஜிங்க் + காப்பர் + ஆல்கலைன் (லேபிளின்படி)', 'பெரிய வெளிப்படையான டேங்க்', 'முன் குறிகாட்டி விளக்குகள்', 'ஐந்து நிறங்கள்'],
      useCases: ['குடும்பங்கள்', 'அடுக்குமாடி குடியிருப்புகள்'],
    },
  },
  {
    slug: 'nile-aqua-v5',
    name: 'Nile Aqua V5',
    brand: 'Nile',
    series: 'Aqua V5',
    category: 'home-ro',
    short: '“Premium, perfectly sized.” Now in maroon too.',
    summary:
      'Aqua V5 from Nile is a compact, wall-mountable purifier with a chrome tap and front display. The brand lists Pure & Safe purification, Zinc + Copper + Alkaline, smart indicators, large storage and easy maintenance.',
    technology: ['Zinc', 'Copper', 'Alkaline', 'Smart indicators'],
    highlights: ['Pure & safe — advanced purification (as listed)', 'Zinc + Copper + Alkaline', 'Smart indicators', 'Large storage', 'Easy maintenance'],
    useCases: ['Compact kitchens', 'Families', 'Wall mounting'],
    colours: [
      { id: 'maroon', name: 'Maroon', hex: '#7a1f2b', image: 0 },
      { id: 'powder-blue', name: 'Powder Blue', hex: '#9db8d8', image: 1 },
    ],
    images: [im('nile-aqua-v5-maroon', 'Nile Aqua V5 water purifier in maroon mounted on a wall'), im('nile-aqua-v5', 'Nile Aqua V5 water purifier in powder blue')],
    specs: specs(STD, { 'Purification technology': ['Zinc + Copper + Alkaline', 'ஜிங்க் + காப்பர் + ஆல்கலைன்'] }),
    source: 'Nile Aqua V5 creatives',
    ta: {
      short: '“பிரீமியம், சரியான அளவில்.” இப்போது மெரூன் நிறத்திலும்.',
      summary: 'Nile-இன் Aqua V5 சுவரில் பொருத்தக்கூடிய கச்சிதமான சுத்திகரிப்பான் — குரோம் குழாய், முன் டிஸ்ப்ளே. பாதுகாப்பான சுத்திகரிப்பு, ஜிங்க் + காப்பர் + ஆல்கலைன், ஸ்மார்ட் குறிகாட்டிகள், பெரிய சேமிப்பு, எளிதான பராமரிப்பு என பிராண்ட் பட்டியலிடுகிறது.',
      highlights: ['பாதுகாப்பான மேம்பட்ட சுத்திகரிப்பு (பட்டியலின்படி)', 'ஜிங்க் + காப்பர் + ஆல்கலைன்', 'ஸ்மார்ட் குறிகாட்டிகள்', 'பெரிய சேமிப்பு', 'எளிதான பராமரிப்பு'],
      useCases: ['சிறிய சமையலறைகள்', 'குடும்பங்கள்', 'சுவர் பொருத்துதல்'],
    },
  },
  {
    slug: 'purosis-puroaqua',
    name: 'PuroAqua',
    brand: 'Purosis',
    category: 'home-ro',
    short: 'Find the shade that speaks to you — pure water, perfect kitchen.',
    summary: 'Purosis PuroAqua comes in eight shades, each labelled Copper + Zinc + Alkaline, with a slim side storage window, a silver handle-line and front indicator buttons.',
    technology: ['Copper', 'Zinc', 'Alkaline'],
    highlights: ['Copper + Zinc + Alkaline (as labelled)', 'Eight colour options', 'Side-window storage tank', 'Front status indicators'],
    useCases: ['Homes', 'Colour-matched kitchens'],
    colours: [
      { id: 'charcoal', name: 'Charcoal', hex: '#4a4c50', image: 0 },
      { id: 'white', name: 'White', hex: '#f2f2f0', image: 0 },
      { id: 'black', name: 'Black', hex: '#1b1b1d', image: 0 },
      { id: 'silver-grey', name: 'Silver Grey', hex: '#a9abae', image: 0 },
      { id: 'gold', name: 'Gold', hex: '#c4a965', image: 0 },
      { id: 'rose-pink', name: 'Rose Pink', hex: '#d9a49b', image: 0 },
      { id: 'copper', name: 'Copper', hex: '#d39a72', image: 0 },
      { id: 'sky-blue', name: 'Sky Blue', hex: '#a8cbe0', image: 0 },
    ],
    images: [im('purosis-puroaqua', 'Purosis PuroAqua water purifiers in eight shades')],
    specs: specs(STD, { 'Purification technology': ['Copper + Zinc + Alkaline (as labelled)', 'காப்பர் + ஜிங்க் + ஆல்கலைன் (லேபிளின்படி)'] }),
    source: 'Purosis PuroAqua creative',
    ta: {
      short: 'உங்கள் மனதுக்கு பிடித்த நிறத்தைத் தேர்ந்தெடுங்கள் — தூய நீர், அழகான சமையலறை.',
      summary: 'Purosis PuroAqua எட்டு நிறங்களில் கிடைக்கிறது; ஒவ்வொன்றும் காப்பர் + ஜிங்க் + ஆல்கலைன் லேபிளுடன், மெலிதான பக்கச் சேமிப்பு சாளரம், சில்வர் கோடு மற்றும் முன் குறிகாட்டி பொத்தான்களுடன்.',
      highlights: ['காப்பர் + ஜிங்க் + ஆல்கலைன் (லேபிளின்படி)', 'எட்டு நிறத் தேர்வுகள்', 'பக்கச் சாளர சேமிப்பு டேங்க்', 'முன் நிலை குறிகாட்டிகள்'],
      useCases: ['வீடுகள்', 'நிறம் பொருந்தும் சமையலறைகள்'],
    },
  },
  {
    slug: 'merlin-ispeed',
    name: 'Merlin iSpeed',
    brand: 'Merlin',
    category: 'home-ro',
    short: 'Luxury you can taste. Purity you can trust.',
    summary:
      'A gloss-black Merlin purifier with copper accents, a hexagonal smart LED indicator panel (Power, Purification, Tank full) and a copper-finish tap. Its band reads RO | UV | UF | Zinc-Copper + Alkaline.',
    technology: ['RO', 'UV', 'UF', 'Zinc-Copper + Alkaline'],
    highlights: ['RO | UV | UF | Zinc-Copper + Alkaline (as labelled)', 'Smart LED indicator', 'Copper-finish tap & accents', 'Gloss black body'],
    useCases: ['Premium homes', 'Villas'],
    colours: [{ id: 'black-copper', name: 'Black & Copper', hex: '#141416', image: 0 }],
    images: [im('merlin-ispeed', 'Merlin iSpeed water purifier in black with copper accents')],
    specs: specs(STD, { 'Purification technology': ['RO + UV + UF + Zinc-Copper + Alkaline (as labelled)', 'RO + UV + UF + ஜிங்க்-காப்பர் + ஆல்கலைன் (லேபிளின்படி)'] }),
    source: 'Merlin iSpeed creative',
    suits: { sources: ['borewell', 'tanker', 'municipal', 'corporation'] },
    ta: {
      short: 'சுவைக்கக்கூடிய ஆடம்பரம். நம்பக்கூடிய தூய்மை.',
      summary: 'காப்பர் அலங்காரங்களுடன் பளபளக்கும் கருப்பு Merlin சுத்திகரிப்பான் — அறுகோண ஸ்மார்ட் LED பேனல் (Power, Purification, Tank full) மற்றும் காப்பர் நிற குழாய். அதன் பட்டையில் RO | UV | UF | Zinc-Copper + Alkaline என உள்ளது.',
      highlights: ['RO | UV | UF | ஜிங்க்-காப்பர் + ஆல்கலைன் (லேபிளின்படி)', 'ஸ்மார்ட் LED குறிகாட்டி', 'காப்பர் நிற குழாய் & அலங்காரம்', 'பளபளக்கும் கருப்பு உடல்'],
      useCases: ['பிரீமியம் வீடுகள்', 'வில்லாக்கள்'],
    },
  },
  {
    slug: 'canix-aqua-orca',
    name: 'Aqua Orca',
    brand: 'Canix',
    category: 'home-ro',
    short: '9-litre detachable tank, 5-stage RO purification.',
    summary:
      'Canix Aqua Orca is listed with a 9-litre detachable storage tank, RO technology, a 5-stage purification system, premium-quality filters, a 100 GPD heavy-duty pump, a transparent tank and auto cut-off, in 100% food-grade plastic.',
    technology: ['RO', '5-stage purification', 'Auto cut-off'],
    highlights: ['9 L detachable storage tank', 'RO technology', '5-stage purification system', '100 GPD heavy-duty pump', 'Transparent tank', 'Auto cut-off', '100% food-grade plastic (as listed)'],
    useCases: ['Homes', 'Small families', 'Easy installation & replacement'],
    colours: [{ id: 'black', name: 'Black', hex: '#232427', image: 0 }],
    images: [im('canix-aqua-orca', 'Canix Aqua Orca RO purifier with 9 litre detachable tank')],
    specs: specs([...STD.slice(0, 4), 'Pump', 'Power', 'Dimensions', 'Warranty'], {
      'Purification technology': ['RO · 5-stage', 'RO · 5 நிலை'],
      'Storage capacity': ['9 litres (detachable)', '9 லிட்டர் (பிரிக்கக்கூடியது)'],
      Pump: ['100 GPD heavy-duty', '100 GPD ஹெவி-டியூட்டி'],
      Warranty: ['1 year on pump and SMPS (as listed)', 'பம்ப் மற்றும் SMPS-க்கு 1 ஆண்டு (பட்டியலின்படி)'],
    }),
    source: 'Canix Aqua Orca creative',
    suits: { sources: ['borewell', 'tanker', 'municipal', 'corporation'] },
    ta: {
      short: '9 லிட்டர் பிரிக்கக்கூடிய டேங்க், 5 நிலை RO சுத்திகரிப்பு.',
      summary: 'Canix Aqua Orca — 9 லிட்டர் பிரிக்கக்கூடிய சேமிப்பு டேங்க், RO தொழில்நுட்பம், 5 நிலை சுத்திகரிப்பு, தரமான ஃபில்டர்கள், 100 GPD ஹெவி-டியூட்டி பம்ப், வெளிப்படையான டேங்க், ஆட்டோ கட்-ஆஃப், 100% உணவுத் தர பிளாஸ்டிக் என பட்டியலிடப்பட்டுள்ளது.',
      highlights: ['9 லி பிரிக்கக்கூடிய சேமிப்பு டேங்க்', 'RO தொழில்நுட்பம்', '5 நிலை சுத்திகரிப்பு அமைப்பு', '100 GPD ஹெவி-டியூட்டி பம்ப்', 'வெளிப்படையான டேங்க்', 'ஆட்டோ கட்-ஆஃப்', '100% உணவுத் தர பிளாஸ்டிக் (பட்டியலின்படி)'],
      useCases: ['வீடுகள்', 'சிறிய குடும்பங்கள்', 'எளிதான நிறுவல் & மாற்றம்'],
    },
  },
  {
    slug: 'lexpure-ro',
    name: 'Lexpure RO Purifier',
    brand: 'Lexpure',
    category: 'home-ro',
    short: 'High-quality RO filter components behind clean glass.',
    summary:
      'A blue Lexpure purifier with a large see-through tank, a side panel showing Power, Tank full and Purifying status, and a visible RO membrane compartment — “behind that clean glass are high-quality RO filter components doing all the hard work inside.”',
    technology: ['RO'],
    highlights: ['Large transparent tank', 'Power, Tank full & Purifying indicators', 'Visible RO membrane compartment', 'Blue cabinet'],
    useCases: ['Homes', 'Offices'],
    colours: [{ id: 'blue', name: 'Blue', hex: '#1f4f8f', image: 0 }],
    images: [im('lexpure-ro', 'Lexpure RO water purifier in blue with visible RO membrane')],
    specs: specs(STD, { 'Purification technology': ['RO', 'RO'] }),
    source: 'Lexpure creative',
    ta: {
      short: 'தெளிவான கண்ணாடிக்குப் பின்னால் தரமான RO ஃபில்டர் பாகங்கள்.',
      summary: 'பெரிய வெளிப்படையான டேங்க், Power, Tank full, Purifying நிலையைக் காட்டும் பக்க பேனல், மற்றும் தெரியும் RO மெம்பிரேன் பகுதி கொண்ட நீல நிற Lexpure சுத்திகரிப்பான்.',
      highlights: ['பெரிய வெளிப்படையான டேங்க்', 'Power, Tank full & Purifying குறிகாட்டிகள்', 'தெரியும் RO மெம்பிரேன் பகுதி', 'நீல நிற கேபினட்'],
      useCases: ['வீடுகள்', 'அலுவலகங்கள்'],
    },
  },
  {
    slug: 'clean-water-aqua-ultra',
    name: 'Aqua Ultra — Mountain Water',
    brand: 'Clean Water',
    series: 'Aqua Ultra',
    category: 'home-ro',
    short: 'Pure & safe water — from any source.',
    summary:
      'Presented as “suitable for all types of water sources” — borewell, tanker, municipal, corporation, well water and more. The brand states it works efficiently with TDS levels up to 2000 PPM.',
    technology: ['RO purification', 'Wide source compatibility'],
    highlights: ['Brand-stated: works with TDS up to 2000 PPM', 'Borewell, tanker, municipal, corporation & well water', 'Large blue transparent tank', 'Consistent performance'],
    useCases: ['Borewell water', 'Tanker water', 'Higher-TDS areas'],
    colours: [{ id: 'blue-white', name: 'Blue & White', hex: '#1f4fb8', image: 0 }],
    images: [im('clean-water-aqua-ultra', 'Clean Water Aqua Ultra Mountain Water purifier, suitable for all water sources')],
    specs: specs(STD, { 'Input water TDS': ['Up to 2000 PPM (as stated by the brand)', '2000 PPM வரை (பிராண்ட் குறிப்பிட்டபடி)'] }),
    featured: true,
    source: 'Clean Water Aqua Ultra creative',
    suits: { highTds: true, sources: ['borewell', 'tanker', 'municipal', 'corporation', 'open-well'] },
    ta: {
      short: 'எந்த நீர் ஆதாரத்திலிருந்தும் தூய, பாதுகாப்பான தண்ணீர்.',
      summary: '“அனைத்து வகை நீர் ஆதாரங்களுக்கும் ஏற்றது” — போர்வெல், டேங்கர், நகராட்சி, மாநகராட்சி, கிணற்று நீர். 2000 PPM வரை TDS உள்ள நீரிலும் திறம்பட செயல்படும் என பிராண்ட் குறிப்பிடுகிறது.',
      highlights: ['பிராண்ட் குறிப்பு: 2000 PPM வரை TDS', 'போர்வெல், டேங்கர், நகராட்சி, மாநகராட்சி & கிணற்று நீர்', 'பெரிய நீல வெளிப்படையான டேங்க்', 'நிலையான செயல்திறன்'],
      useCases: ['போர்வெல் நீர்', 'டேங்கர் நீர்', 'அதிக TDS பகுதிகள்'],
    },
  },
  {
    slug: 'clean-water-purifier-range',
    name: 'Clean Water Purifier Range',
    brand: 'Clean Water',
    series: 'Drinking Water Product',
    category: 'home-ro',
    short: 'Now with LED indicator — in five finishes.',
    summary:
      'Clean Water’s drinking-water purifier range with a leak-proof, strong and durable storage tank in 100% food-grade ABS plastic, an LED indicator, and Ultra Purification, Quality Filter and Mineral Filter stages as named by the brand.',
    technology: ['Ultra purification', 'Quality filter', 'Mineral filter', 'LED indicator'],
    highlights: ['Leak-proof, strong & durable storage tank', '100% food-grade ABS plastic (as listed)', 'LED indicator', 'Ultra purification · Quality filter · Mineral filter'],
    useCases: ['Homes', 'Shops'],
    colours: [
      { id: 'std-green', name: 'STD Green', hex: '#2f9fc4', image: 0 },
      { id: 'std-blue', name: 'STD Blue', hex: '#1d4fae', image: 0 },
      { id: 'metallic-black', name: 'Metallic Black', hex: '#1a1a1c', image: 0 },
      { id: 'metallic-cherry', name: 'Metallic Cherry', hex: '#6b1622', image: 0 },
      { id: 'metallic-grey', name: 'Metallic Grey', hex: '#5b5d60', image: 0 },
    ],
    images: [im('clean-water-range', 'Clean Water purifier range in STD Green, STD Blue, Metallic Black, Metallic Cherry and Metallic Grey')],
    specs: specs(STD),
    source: 'Clean Water range creative',
    suits: { sources: ['municipal', 'corporation'] },
    ta: {
      short: 'இப்போது LED குறிகாட்டியுடன் — ஐந்து நிறங்களில்.',
      summary: 'கசிவில்லாத, வலுவான, நீடித்த சேமிப்பு டேங்க் (100% உணவுத் தர ABS பிளாஸ்டிக்), LED குறிகாட்டி, மற்றும் பிராண்ட் பெயரிட்ட Ultra Purification, Quality Filter, Mineral Filter நிலைகள் கொண்ட Clean Water சுத்திகரிப்பான் வரிசை.',
      highlights: ['கசிவில்லாத, வலுவான, நீடித்த சேமிப்பு டேங்க்', '100% உணவுத் தர ABS பிளாஸ்டிக் (பட்டியலின்படி)', 'LED குறிகாட்டி', 'அல்ட்ரா சுத்திகரிப்பு · தர ஃபில்டர் · மினரல் ஃபில்டர்'],
      useCases: ['வீடுகள்', 'கடைகள்'],
    },
  },
  {
    slug: 'clean-water-mountain-water-mt-black',
    name: 'Mountain Water — Mt. Black',
    brand: 'Clean Water',
    series: 'Mountain Water',
    category: 'home-ro',
    short: 'Food-grade RO cabinet, now with LED indicator.',
    summary: 'Made “as per RO industry standards”, Clean Water describes this cabinet as BIS-compatible, high-quality food-grade material — now with an LED indicator — in a bold matte black.',
    technology: ['RO cabinet', 'LED indicator'],
    highlights: ['Brand-stated: BIS-compatible, food-grade cabinet', 'LED indicator', 'Matte black finish'],
    useCases: ['Homes', 'Shops'],
    colours: [{ id: 'mt-black', name: 'Mt. Black', hex: '#141414', image: 0 }],
    images: [im('clean-water-mountain-water-black', 'Clean Water Mountain Water RO purifier in Mt. Black')],
    specs: specs(STD),
    source: 'Clean Water Mountain Water creative',
    suits: { sources: ['municipal', 'corporation'] },
    ta: {
      short: 'உணவுத் தர RO கேபினட், இப்போது LED குறிகாட்டியுடன்.',
      summary: '“RO தொழில் தரநிலைகளின்படி” தயாரிக்கப்பட்டது — BIS-இணக்கமான, உயர் தர உணவுத் தரப் பொருள் என Clean Water விவரிக்கிறது; LED குறிகாட்டியுடன், மேட் கருப்பு நிறத்தில்.',
      highlights: ['பிராண்ட் குறிப்பு: BIS-இணக்கமான உணவுத் தர கேபினட்', 'LED குறிகாட்டி', 'மேட் கருப்பு நிறம்'],
      useCases: ['வீடுகள்', 'கடைகள்'],
    },
  },
  {
    slug: 'clean-water-hi-flo',
    name: 'Hi-Flo',
    brand: 'Clean Water',
    series: 'Metallic Cherry',
    category: 'home-ro',
    short: 'A water purification system with presence.',
    summary: 'Hi-Flo stands out with a metallic cherry body, smoked transparent tank and wave artwork, with front indicator lights.',
    technology: ['Water purification system'],
    highlights: ['Metallic cherry finish', 'Smoked transparent tank', 'Wave artwork panel', 'Front indicators'],
    useCases: ['Homes', 'Dining spaces'],
    colours: [{ id: 'metallic-cherry', name: 'Metallic Cherry', hex: '#7a1424', image: 0 }],
    images: [im('clean-water-hi-flo-metallic-cherry', 'Clean Water Hi-Flo water purifier in metallic cherry')],
    specs: specs(STD),
    source: 'Clean Water Hi-Flo creative',
    ta: {
      short: 'கம்பீரமான தோற்றம் கொண்ட சுத்திகரிப்பு அமைப்பு.',
      summary: 'மெட்டாலிக் செர்ரி உடல், புகை நிற வெளிப்படையான டேங்க், அலை ஓவியம் மற்றும் முன் குறிகாட்டி விளக்குகளுடன் Hi-Flo தனித்து நிற்கிறது.',
      highlights: ['மெட்டாலிக் செர்ரி நிறம்', 'புகை நிற வெளிப்படையான டேங்க்', 'அலை ஓவிய பேனல்', 'முன் குறிகாட்டிகள்'],
      useCases: ['வீடுகள்', 'உணவருந்தும் பகுதிகள்'],
    },
  },
  {
    slug: 'aqua-roma',
    name: 'Aqua Roma',
    brand: 'Aqua Roma',
    series: 'Gold',
    category: 'home-ro',
    short: 'A curved gold cabinet with a regal finish.',
    summary: 'A curved champagne-gold cabinet with a chrome diamond emblem and side-mounted tap — for homes that want the purifier to sit beautifully with their décor.',
    technology: ['Water purification'],
    highlights: ['Gold finish', 'Curved sculpted body', 'Chrome diamond emblem', 'Side-mounted chrome tap'],
    useCases: ['Elegant interiors', 'Gifting'],
    colours: [{ id: 'gold', name: 'Gold', hex: '#c9b48a', image: 0 }],
    images: [im('aqua-roma-gold', 'Aqua Roma water purifier in gold')],
    specs: specs(STD),
    source: 'Aqua Roma creative',
    ta: {
      short: 'அரச தோற்றத்துடன் வளைந்த தங்க நிற கேபினட்.',
      summary: 'குரோம் வைர சின்னம் மற்றும் பக்கக் குழாயுடன் வளைந்த ஷாம்பெயின்-தங்க கேபினட் — வீட்டு அலங்காரத்துடன் அழகாகப் பொருந்தும்.',
      highlights: ['தங்க நிறம்', 'வளைந்த செதுக்கிய உடல்', 'குரோம் வைர சின்னம்', 'பக்கத்தில் குரோம் குழாய்'],
      useCases: ['நேர்த்தியான உள் அலங்காரம்', 'பரிசளிப்பு'],
    },
  },

  // ── Commercial & stainless-steel systems ──────────────────────────────────
  {
    slug: 'zamzam-standard-ss-system',
    name: 'Standard Pure Water System',
    brand: 'Zam Zam',
    series: 'Stainless Steel',
    category: 'commercial',
    short: 'Compact, rust-proof stainless-steel system with one normal tap.',
    summary:
      'Zam Zam’s stainless-steel pure water system with Power, Purification, Tank full and Call service indicators and a single normal-water tap. Listed features: compact design, rust-proof body, low maintenance and long life.',
    technology: ['Stainless steel', 'Indicator panel', 'Normal water tap'],
    highlights: ['Power · Purification · Tank full · Call service indicators', 'Single normal-water tap', 'Compact design', 'Rust-proof body', 'Low maintenance', 'Long life'],
    useCases: ['Offices', 'Schools', 'Clinics', 'Shops'],
    colours: [{ id: 'stainless', name: 'Stainless Steel', hex: '#c9ccd0', image: 0 }],
    images: [im('zamzam-ss-standard-photo', 'Zam Zam Standard stainless-steel pure water system with one normal tap'), im('zamzam-ss-standard', 'Zam Zam Standard stainless-steel system from the product creative')],
    specs: specs(STD),
    featured: true,
    source: 'Zam Zam stainless-steel product photograph and “Pure water in every drop” creative',
    suits: { business: true, sources: ['business'] },
    ta: {
      short: 'ஒரு சாதாரண நீர் குழாயுடன் கச்சிதமான, துருப்பிடிக்காத ஸ்டீல் அமைப்பு.',
      summary: 'Power, Purification, Tank full, Call service குறிகாட்டிகள் மற்றும் ஒரு சாதாரண நீர் குழாயுடன் ஜம் ஜம் ஸ்டெயின்லெஸ் ஸ்டீல் தூய நீர் அமைப்பு. கச்சிதமான வடிவமைப்பு, துருப்பிடிக்காத உடல், குறைந்த பராமரிப்பு, நீண்ட ஆயுள்.',
      highlights: ['Power · Purification · Tank full · Call service குறிகாட்டிகள்', 'ஒரு சாதாரண நீர் குழாய்', 'கச்சிதமான வடிவமைப்பு', 'துருப்பிடிக்காத உடல்', 'குறைந்த பராமரிப்பு', 'நீண்ட ஆயுள்'],
      useCases: ['அலுவலகங்கள்', 'பள்ளிகள்', 'கிளினிக்குகள்', 'கடைகள்'],
    },
  },
  {
    slug: 'zamzam-hot-normal-ss-system',
    name: 'Hot & Normal Pure Water System',
    brand: 'Zam Zam',
    series: 'Stainless Steel',
    category: 'commercial',
    short: 'Hot and normal water from one stainless-steel unit.',
    summary:
      'Twin taps for normal and hot water in a stainless-steel body, with a power switch and Power, Normal and Service indicators. Listed features: hot & normal water, advanced purification, stainless-steel body and energy efficient.',
    technology: ['Hot & normal dispensing', 'Advanced purification'],
    highlights: ['Separate normal & hot taps', 'Power switch with Power · Normal · Service indicators', 'Advanced purification', 'Stainless-steel body', 'Energy efficient (as listed)'],
    useCases: ['Offices', 'Hospitals', 'Hostels', 'Restaurants'],
    colours: [{ id: 'stainless', name: 'Stainless Steel', hex: '#c9ccd0', image: 0 }],
    images: [im('zamzam-ss-hot-normal-photo', 'Zam Zam Hot & Normal stainless-steel pure water system with normal and hot taps'), im('zamzam-ss-hot-normal', 'Zam Zam Hot & Normal system from the product creative')],
    specs: specs(STD),
    featured: true,
    source: 'Zam Zam stainless-steel product photograph and “Pure water in every drop” creative',
    suits: { business: true, sources: ['business'] },
    ta: {
      short: 'ஒரே ஸ்டெயின்லெஸ் ஸ்டீல் யூனிட்டில் சூடான மற்றும் சாதாரண நீர்.',
      summary: 'சாதாரண மற்றும் சூடான நீருக்கு இரண்டு குழாய்கள், பவர் சுவிட்ச், Power, Normal, Service குறிகாட்டிகள் கொண்ட ஸ்டெயின்லெஸ் ஸ்டீல் அமைப்பு. சூடான & சாதாரண நீர், மேம்பட்ட சுத்திகரிப்பு, ஸ்டீல் உடல், ஆற்றல் சேமிப்பு.',
      highlights: ['தனித்தனி சாதாரண & சூடான நீர் குழாய்கள்', 'பவர் சுவிட்ச் · Power · Normal · Service குறிகாட்டிகள்', 'மேம்பட்ட சுத்திகரிப்பு', 'ஸ்டெயின்லெஸ் ஸ்டீல் உடல்', 'ஆற்றல் சேமிப்பு (பட்டியலின்படி)'],
      useCases: ['அலுவலகங்கள்', 'மருத்துவமனைகள்', 'விடுதிகள்', 'உணவகங்கள்'],
    },
  },
  {
    slug: 'triple-stage-commercial-ro',
    name: 'Triple Stage Water Purifier',
    brand: 'Zam Zam',
    series: 'Commercial',
    category: 'commercial',
    short: 'Three-stage filtration for high-demand spaces.',
    summary: 'A frame-mounted system with three large filter housings. Listed features: 3-stage filtration, removes impurities, improves water quality, safe & healthy water.',
    technology: ['3-stage filtration'],
    highlights: ['3-stage filtration', 'Removes impurities', 'Improves water quality', 'Frame-mounted housings'],
    useCases: ['Schools & colleges', 'Factories', 'Hotels', 'Institutions'],
    colours: [],
    images: [im('triple-stage-commercial-ro', 'Triple stage commercial water purifier with three filter housings'), im('commercial-and-controller-range', 'Zam Zam commercial range creative')],
    specs: specs(STD, { 'Purification technology': ['3-stage filtration', '3 நிலை வடிகட்டல்'] }),
    source: '“Pure water in every drop” creative',
    suits: { business: true, sources: ['business'] },
    ta: {
      short: 'அதிக தேவையுள்ள இடங்களுக்கு மூன்று நிலை வடிகட்டல்.',
      summary: 'மூன்று பெரிய ஃபில்டர் ஹவுசிங்குகளுடன் சட்டத்தில் பொருத்தப்பட்ட அமைப்பு. 3 நிலை வடிகட்டல், மாசுகளை நீக்குகிறது, நீரின் தரத்தை மேம்படுத்துகிறது.',
      highlights: ['3 நிலை வடிகட்டல்', 'மாசுகளை நீக்குகிறது', 'நீரின் தரத்தை மேம்படுத்துகிறது', 'சட்டத்தில் பொருத்திய ஹவுசிங்குகள்'],
      useCases: ['பள்ளிகள் & கல்லூரிகள்', 'தொழிற்சாலைகள்', 'ஹோட்டல்கள்', 'நிறுவனங்கள்'],
    },
  },

  // ── Water & power solutions ───────────────────────────────────────────────
  {
    slug: 'whole-house-water-softener',
    name: 'Whole-House Water Softener',
    brand: 'Zam Zam',
    category: 'solutions',
    short: 'Softener vessel, brine tank and pre-filter for the whole home.',
    summary:
      'A softener set-up with a softener vessel, brine tank and pre-filter, plumbed into the home supply. Softeners address water hardness (the cause of white scale), which is different from what an RO purifier does — ask us which one your water needs.',
    technology: ['Softener vessel', 'Brine tank', 'Pre-filter'],
    highlights: ['Whole-house set-up', 'Softener vessel with brine tank', 'Pre-filter stage', 'Neat wall plumbing'],
    useCases: ['Independent houses', 'Villas', 'Borewell supply'],
    colours: [],
    images: [im('water-softener-installation', 'Whole-house water softener with brine tank and pre-filter')],
    specs: specs(['Vessel size', 'Flow rate', 'Regeneration', 'Warranty']),
    featured: true,
    source: 'Water softener creative',
    suits: { sources: ['borewell', 'open-well'] },
    ta: {
      short: 'முழு வீட்டிற்கும் சாஃப்ட்னர் கலன், உப்புநீர் டேங்க் மற்றும் முன் ஃபில்டர்.',
      summary: 'வீட்டு நீர் இணைப்பில் பொருத்தப்படும் சாஃப்ட்னர் கலன், உப்புநீர் டேங்க், முன் ஃபில்டர். சாஃப்ட்னர் நீரின் கடினத்தன்மையை (வெள்ளைப் படிவுக்குக் காரணம்) கையாள்கிறது — இது RO-விலிருந்து வேறுபட்டது. உங்கள் நீருக்கு எது தேவை என்று எங்களிடம் கேளுங்கள்.',
      highlights: ['முழு வீட்டு அமைப்பு', 'உப்புநீர் டேங்குடன் சாஃப்ட்னர் கலன்', 'முன் ஃபில்டர் நிலை', 'நேர்த்தியான சுவர் குழாய் இணைப்பு'],
      useCases: ['தனி வீடுகள்', 'வில்லாக்கள்', 'போர்வெல் நீர்'],
    },
  },
  {
    slug: 'automatic-water-level-controller',
    name: 'Automatic Water Level Controller',
    brand: 'Zam Zam',
    category: 'solutions',
    short: 'Smart control · Save water · Save life.',
    summary: 'Automatic pump control for your water tank. The controller panel shows power, tank full, tank low, motor on and dry-run/fault status. Features as listed on the product creative are below.',
    technology: ['Automatic pump control', 'Level sensors'],
    highlights: ['Automatic water level control', 'Dry run protection', 'Overflow protection', 'Easy installation', 'High accuracy sensors', 'Suitable for all pumps', 'Energy saving', 'Durable & reliable'],
    useCases: ['Overhead tanks', 'Sumps', 'Homes & apartments', 'Businesses'],
    colours: [],
    images: [im('automatic-water-level-controller', 'Automatic water tank level controller with pump and tank'), im('water-level-controller-and-ss-systems', 'Automatic water level controller features creative')],
    specs: [
      { label: 'Panel indicators', value: 'Power, Tank full, Tank low, Motor on, Dry run / Fault', ta: { label: 'பேனல் குறிகாட்டிகள்', value: 'Power, Tank full, Tank low, Motor on, Dry run / Fault' } },
      ...specs(['Pump rating', 'Sensor type', 'Warranty']),
    ],
    featured: true,
    source: 'Automatic water level controller creative',
    ta: {
      short: 'ஸ்மார்ட் கட்டுப்பாடு · நீரைச் சேமிப்போம் · உயிரைக் காப்போம்.',
      summary: 'உங்கள் தண்ணீர் டேங்கிற்கான தானியங்கி பம்ப் கட்டுப்பாடு. கட்டுப்பாட்டு பேனல் power, tank full, tank low, motor on, dry-run/fault நிலையைக் காட்டுகிறது. தயாரிப்பு விளம்பரத்தில் பட்டியலிட்ட அம்சங்கள் கீழே.',
      highlights: ['தானியங்கி நீர் மட்டக் கட்டுப்பாடு', 'டிரை ரன் பாதுகாப்பு', 'ஓவர்ஃப்ளோ பாதுகாப்பு', 'எளிதான நிறுவல்', 'துல்லியமான சென்சார்கள்', 'அனைத்து பம்புகளுக்கும் ஏற்றது', 'ஆற்றல் சேமிப்பு', 'நீடித்த, நம்பகமானது'],
      useCases: ['மேல்நிலை டேங்குகள்', 'சம்ப்கள்', 'வீடுகள் & அடுக்குமாடிகள்', 'வணிகங்கள்'],
    },
  },
  {
    slug: 'ups-inverter-batteries',
    name: 'UPS & Inverter Batteries',
    brand: 'Zam Zam',
    category: 'solutions',
    short: 'UPS battery sales, service and installation.',
    summary: 'Zam Zam offers UPS battery sales, service and installation alongside its water systems. Tell us your current set-up and we will advise on a suitable battery — brands, capacities and prices are shared on enquiry.',
    technology: ['Sales', 'Service', 'Installation'],
    highlights: ['Sales, service & installation', 'Advice on a suitable battery', 'Local support in Erode'],
    useCases: ['Homes', 'Shops', 'Offices'],
    colours: [],
    images: [],
    specs: specs(['Brands', 'Capacity', 'Warranty']),
    source: 'Zam Zam business card',
    ta: {
      short: 'UPS பேட்டரி விற்பனை, சர்வீஸ் மற்றும் நிறுவல்.',
      summary: 'தண்ணீர் அமைப்புகளுடன் UPS பேட்டரி விற்பனை, சர்வீஸ், நிறுவல் சேவைகளையும் ஜம் ஜம் வழங்குகிறது. உங்கள் தற்போதைய அமைப்பைச் சொல்லுங்கள் — பொருத்தமான பேட்டரியைப் பரிந்துரைப்போம்; பிராண்ட், கொள்ளளவு, விலை விசாரணையில் பகிரப்படும்.',
      highlights: ['விற்பனை, சர்வீஸ் & நிறுவல்', 'பொருத்தமான பேட்டரி ஆலோசனை', 'ஈரோட்டில் உள்ளூர் ஆதரவு'],
      useCases: ['வீடுகள்', 'கடைகள்', 'அலுவலகங்கள்'],
    },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const featuredFour = ['aqua-2090-raga', 'lx-one-titanium', 'water-pia', 'nile-aqua-jade'].map((s) => getProduct(s)!);
export const brands = Array.from(new Set(products.map((p) => p.brand)));
/** "Nile Aqua Jade" — never "Nile Nile Aqua Jade". */
export const fullName = (p: Pick<Product, 'brand' | 'name'>) =>
  p.name.toLowerCase().startsWith(p.brand.toLowerCase()) || p.brand === 'Zam Zam' || p.name.toLowerCase().includes(p.brand.toLowerCase()) ? p.name : `${p.brand} ${p.name}`;
/** Name for titles: adds the series unless the name already says it ("Aqua 2090 Raga", not "… Raga Raga Series"). */
export const titleName = (p: Product) => {
  const name = fullName(p);
  const first = p.series?.split(/[ ·]/)[0].toLowerCase();
  // Multi-part series labels ("Silk · Elite · Core") stay out of titles.
  return p.series && first && !p.series.includes('·') && !name.toLowerCase().includes(first) ? `${name} ${p.series}` : name;
};
export const productPath = (p: Pick<Product, 'slug'>, colour?: string) => `/products/${p.slug}${colour ? `?colour=${colour}` : ''}`;
export const categoryLabel = (id: CategoryId, lang: Lang = 'en') => {
  const c = categories.find((x) => x.id === id)!;
  return lang === 'ta' ? c.ta : c.label;
};
/** Localised descriptive text for a product. */
export const ptext = (p: Product, lang: Lang): ProductText => (lang === 'ta' ? p.ta : p);
export const specText = (s: ProductSpec, lang: Lang) => (lang === 'ta' && s.ta ? { label: s.ta.label, value: s.ta.value } : { label: s.label, value: s.value });

export function relatedProducts(p: Product, n = 3) {
  const same = products.filter((x) => x.slug !== p.slug && x.category === p.category);
  const others = products.filter((x) => x.slug !== p.slug && x.category !== p.category);
  return [...same, ...others].slice(0, n);
}
