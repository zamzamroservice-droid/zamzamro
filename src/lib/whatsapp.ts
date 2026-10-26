import { business } from '../data/business';
import { titleName, type Product } from '../data/products';

export const whatsappLink = (message: string) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;

const greeting = 'Hello Zam Zam Pure Water System,';

export const messages = {
  general: () => `${greeting}\nI would like to know more about your water purifiers and services.`,
  product: (p: Product, colour?: string) =>
    `${greeting}\nI am interested in the ${titleName(p)}${colour ? ` in ${colour}` : ''}.\nPlease share the price, availability and details.`,
  service: (service: string) => `${greeting}\nI would like to book: ${service}.\nPlease let me know a convenient time.`,
  installation: () => `${greeting}\nI would like to book an installation. Please let me know what you need from me.`,
  waterCheck: (source: string, tds: number) =>
    `${greeting}\nI would like to book a water check.\nWater source: ${source}\nApprox. TDS reading: ${tds} ppm\nPlease suggest a suitable purifier.`,
};

export interface EnquiryData {
  name: string;
  phone: string;
  service: string;
  product?: string;
  area: string;
  date?: string;
  time?: string;
  message?: string;
}

/** Structured WhatsApp message built from the enquiry form. */
export function enquiryMessage(d: EnquiryData) {
  const lines = [
    greeting,
    'New enquiry from the website:',
    '',
    `• Name: ${d.name}`,
    `• Phone: ${d.phone}`,
    `• Service: ${d.service}`,
    d.product ? `• Product: ${d.product}` : null,
    `• Area: ${d.area}`,
    d.date ? `• Preferred date: ${formatDate(d.date)}` : null,
    d.time ? `• Preferred time: ${d.time}` : null,
    d.message ? `• Message: ${d.message}` : null,
    '',
    'Please confirm availability.',
  ];
  return lines.filter((l): l is string => l !== null).join('\n');
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}
