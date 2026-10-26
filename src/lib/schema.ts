// JSON-LD builders. Pure data (no React / icons) so scripts/postbuild-seo.mjs can import this in Node.
import { business, SITE_URL } from '../data/business.ts';
import { fullName, productPath, type Product } from '../data/products.ts';
import type { Faq } from '../data/faqs.ts';

const abs = (path: string) => `${SITE_URL}${path}`;
const BUSINESS_ID = abs('/#business');

export const serviceNames = [
  'RO water purifier sales',
  'RO water purifier installation',
  'RO water purifier repair and service',
  'Filter and membrane replacement',
  'Purifier maintenance and sanitisation',
  'Commercial and stainless-steel water systems',
  'Water softener installation',
  'UPS and inverter battery sales and installation',
  'Automatic water level controller installation',
];

export function localBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Store'],
    '@id': BUSINESS_ID,
    name: business.name,
    slogan: business.tagline,
    description: 'RO water purifier sales, service and installation in Erode, with commercial stainless-steel systems, water softeners, automatic water level controllers and UPS batteries.',
    url: abs('/'),
    telephone: business.phoneE164,
    image: abs('/images/og-zamzam.jpg'),
    logo: abs('/images/icon-512.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapsQuery)}`,
    // Only the city named in the address — named service areas are added once confirmed.
    areaServed: business.serviceAreas.length
      ? business.serviceAreas.map((name) => ({ '@type': 'Place', name }))
      : { '@type': 'City', name: 'Erode' },
    brand: business.brands.map((name) => ({ '@type': 'Brand', name })),
    ...(business.email ? { email: business.email } : {}),
  };
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

/** Product markup with verified fields only — no price, rating or review is ever invented. */
export function productSchema(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: fullName(p),
    description: p.summary,
    brand: { '@type': 'Brand', name: p.brand },
    category: p.category === 'home-ro' ? 'Water purifier' : p.category === 'commercial' ? 'Commercial water purification system' : 'Water & power solution',
    url: abs(productPath(p)),
    ...(p.images.length ? { image: p.images.map((i) => abs(i.src)) } : {}),
    ...(p.colours.length ? { color: p.colours.map((c) => c.name).join(', ') } : {}),
  };
}

export function itemList(list: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Zam Zam Pure Water System products',
    itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: fullName(p), url: abs(productPath(p)) })),
  };
}

export function serviceSchemas() {
  return serviceNames.map((name) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: name,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'City', name: 'Erode' },
  }));
}

export function faqPage(list: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
