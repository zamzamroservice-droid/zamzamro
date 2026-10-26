// Single source of truth for business details. NAP (name, address, phone) must match the
// Google Business Profile exactly. Anything marked CONFIRM must be verified with the owner;
// unconfirmed values are hidden from visitors rather than guessed.

// VITE_SITE_URL comes from .env — read by Vite in the browser and by scripts/postbuild-seo.mjs in Node.
const viteEnv = (import.meta as { env?: Record<string, string | undefined> }).env;
const nodeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
export const SITE_URL = (viteEnv?.VITE_SITE_URL ?? nodeEnv?.VITE_SITE_URL ?? '').replace(/\/$/, '');

export interface OpeningHours {
  days: string;
  time: string;
}

export const business = {
  name: 'Zam Zam Pure Water System',
  shortName: 'Zam Zam',
  tagline: 'Pure Forever',
  phoneDisplay: '+91 81899 71717',
  phoneE164: '+918189971717',
  whatsapp: '918189971717',
  /** CONFIRM: business email, if any. Hidden while empty. */
  email: '',
  address: {
    street: '125/2 Jeevanandham Street, Near N.R. Mahal, Poondurai Road',
    locality: 'Erode',
    region: 'Tamil Nadu',
    postalCode: '638002',
    postalDisplay: '638 002',
    country: 'IN',
  },
  /** CONFIRM: opening hours, e.g. [{ days: 'Monday – Saturday', time: '9:00 AM – 8:00 PM' }]. Hidden while empty. */
  hours: [] as OpeningHours[],
  /**
   * CONFIRM: named localities served. While empty, the site only says "Erode and nearby areas"
   * (the address on the business card), never a list we cannot verify.
   */
  serviceAreas: [] as string[],
  mapsQuery: 'Zam Zam Pure Water System, 125/2 Jeevanandham Street, Poondurai Road, Erode 638002',
  timeZone: 'Asia/Kolkata',
  /** Product lines named on the supplied creatives. */
  brands: ['Aqua Era', 'Aqua 2090', 'Nile', 'LX One', 'Water Pia', 'Purosis', 'Merlin', 'Canix', 'Lexpure', 'Clean Water', 'Aqua Roma'],
};

export const fullAddress = `${business.address.street}, ${business.address.locality} – ${business.address.postalDisplay}, ${business.address.region}, India`;
export const telLink = `tel:${business.phoneE164}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapsQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(business.mapsQuery)}&output=embed`;
export const fullAddressTa = '125/2 ஜீவானந்தம் தெரு, N.R. மஹால் அருகில், பூந்துறை ரோடு, ஈரோடு – 638 002, தமிழ்நாடு';
export const serviceAreaLabelTa = business.serviceAreas.length ? business.serviceAreas.join(', ') : 'ஈரோடு மற்றும் அருகிலுள்ள பகுதிகள்';
export const serviceAreaLabel = business.serviceAreas.length ? business.serviceAreas.join(', ') : 'Erode and nearby areas';
