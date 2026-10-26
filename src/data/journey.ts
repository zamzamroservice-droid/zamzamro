// Illustrative filtration journey for the homepage. These are typical stages found in RO purifiers —
// NOT a claim that every model includes all of them.
import type { Lang } from './products';

interface StageText {
  label: string;
  title: string;
  body: string;
  note?: string;
}
export interface JourneyStage extends StageText {
  id: string;
  ta: StageText;
}

const NOTE_TA = 'பொருந்தும் இடங்களில் — மாடலுக்கு மாடல் மாறுபடும்.';

export const journeyStages: JourneyStage[] = [
  {
    id: 'sediment',
    label: 'Sediment',
    title: 'Sediment filtration',
    body: 'The first stage traps visible particles such as sand, silt and rust, protecting the finer stages that follow.',
    ta: { label: 'வண்டல்', title: 'வண்டல் வடிகட்டல்', body: 'முதல் நிலை மணல், சேறு, துரு போன்ற கண்ணுக்குத் தெரியும் துகள்களைப் பிடித்து, அடுத்து வரும் நுண்ணிய நிலைகளைப் பாதுகாக்கிறது.' },
  },
  {
    id: 'carbon',
    label: 'Carbon',
    title: 'Activated carbon',
    body: 'Activated carbon is commonly used to reduce chlorine and improve the taste and odour of water.',
    ta: { label: 'கார்பன்', title: 'ஆக்டிவேட்டட் கார்பன்', body: 'குளோரினைக் குறைக்கவும் நீரின் சுவை மற்றும் மணத்தை மேம்படுத்தவும் ஆக்டிவேட்டட் கார்பன் பொதுவாகப் பயன்படுத்தப்படுகிறது.' },
  },
  {
    id: 'ro',
    label: 'RO membrane',
    title: 'Reverse osmosis membrane',
    body: 'Pressure pushes water through a very fine membrane that reduces dissolved solids. Rejected water carrying the concentrate goes to the drain.',
    ta: { label: 'RO மெம்பிரேன்', title: 'ரிவர்ஸ் ஆஸ்மோசிஸ் மெம்பிரேன்', body: 'அழுத்தம் நீரை மிக நுண்ணிய மெம்பிரேன் வழியாகத் தள்ளி கரைந்த திடப்பொருட்களைக் குறைக்கிறது. அடர்த்தியான கழிவு நீர் வடிகாலுக்குச் செல்கிறது.' },
  },
  {
    id: 'additional',
    label: 'Extra stage',
    title: 'Additional treatment',
    body: 'Some models add a further stage after RO, such as a post-carbon or UV/UF stage.',
    note: 'Where applicable — varies by model.',
    ta: { label: 'கூடுதல் நிலை', title: 'கூடுதல் சுத்திகரிப்பு', body: 'சில மாடல்கள் RO-க்குப் பிறகு போஸ்ட்-கார்பன் அல்லது UV/UF போன்ற கூடுதல் நிலையைச் சேர்க்கின்றன.', note: NOTE_TA },
  },
  {
    id: 'mineral',
    label: 'Taste',
    title: 'Mineral or taste conditioning',
    body: 'Certain models add copper, zinc or alkaline stages as described by their brands. We explain each model’s stages exactly as the manufacturer states them.',
    note: 'Where applicable — varies by model.',
    ta: { label: 'சுவை', title: 'மினரல் அல்லது சுவை மேம்பாடு', body: 'சில மாடல்கள் அவற்றின் பிராண்டுகள் விவரித்தபடி காப்பர், ஜிங்க் அல்லது ஆல்கலைன் நிலைகளைச் சேர்க்கின்றன. ஒவ்வொரு மாடலின் நிலைகளையும் உற்பத்தியாளர் குறிப்பிடுவதைப் போலவே விளக்குகிறோம்.', note: NOTE_TA },
  },
  {
    id: 'dispense',
    label: 'Your glass',
    title: 'Stored & dispensed',
    body: 'Purified water is held in the storage tank, ready at the tap — clear, cool and ready for your glass.',
    ta: { label: 'உங்கள் டம்ளர்', title: 'சேமிப்பு & வழங்கல்', body: 'சுத்திகரிக்கப்பட்ட நீர் சேமிப்பு டேங்கில் வைக்கப்பட்டு, குழாயில் தயாராக இருக்கிறது — தெளிவாக, குளிர்ச்சியாக, உங்கள் டம்ளருக்காக.' },
  },
];

export const jtext = (s: JourneyStage, lang: Lang): StageText => (lang === 'ta' ? s.ta : s);
