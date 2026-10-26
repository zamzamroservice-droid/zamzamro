// Per-route metadata — used by <Seo/> at runtime and by scripts/postbuild-seo.mjs, which writes a
// prerendered index.html with the right <title>, description, canonical and Open Graph tags per route.
export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  /** Short visible summary for the noscript fallback. */
  heading: string;
}

export const routeMeta = {
  home: {
    path: '/',
    title: 'RO Water Purifier Sales, Service & Installation in Erode | Zam Zam Pure Water System',
    description:
      'Zam Zam Pure Water System, Poondurai Road, Erode — RO water purifier sales, installation, repair and service, plus commercial SS systems, water softeners, water level controllers and UPS batteries.',
    heading: 'RO Water Purifier Sales, Service & Installation in Erode',
  },
  products: {
    path: '/products',
    title: 'RO Water Purifiers, Commercial Systems & Softeners in Erode | Zam Zam',
    description:
      'Browse Aqua 2090 Raga, LX One Titanium, Water Pia, Nile, Clean Water and Aqua Roma purifiers, stainless-steel commercial systems, water softeners, level controllers and UPS batteries in Erode.',
    heading: 'Products — RO purifiers, commercial systems and water solutions',
  },
  services: {
    path: '/services',
    title: 'RO Purifier Repair, Service & Filter Change in Erode | Zam Zam',
    description:
      'RO repair and service, filter and membrane change, sanitisation, commercial SS systems, water softener, UPS battery and water level controller services in Erode. Book on WhatsApp.',
    heading: 'Water purifier services in Erode',
  },
  installation: {
    path: '/installation',
    title: 'RO Water Purifier Installation in Erode | Zam Zam Pure Water System',
    description:
      'How Zam Zam installs RO purifiers, softeners and water level controllers in Erode — water check, recommendation, careful installation, testing, demonstration and ongoing support.',
    heading: 'RO purifier installation in Erode',
  },
  about: {
    path: '/about',
    title: 'About Zam Zam Pure Water System, Erode — Pure Forever',
    description:
      'Zam Zam Pure Water System is a water purification business on Poondurai Road, Erode offering water-first advice, purifier sales, installation and service.',
    heading: 'About Zam Zam Pure Water System',
  },
  contact: {
    path: '/contact',
    title: 'Contact Zam Zam Pure Water System, Erode | Call +91 81899 71717',
    description:
      'Visit 125/2 Jeevanandham Street, Near N.R. Mahal, Poondurai Road, Erode 638 002, or call / WhatsApp +91 81899 71717 for RO sales, service and installation.',
    heading: 'Contact Zam Zam Pure Water System',
  },
  faq: {
    path: '/faq',
    title: 'RO Purifier FAQs — Borewell Water, Filters, Softeners & Installation | Zam Zam Erode',
    description:
      'Answers about borewell water, TDS, filter replacement, copper and alkaline labels, installation requirements, water softeners, level controllers, UPS batteries and office systems.',
    heading: 'Frequently asked questions',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy | Zam Zam Pure Water System',
    description: 'How Zam Zam Pure Water System handles the information you type into enquiry forms, and the third-party services this website uses.',
    heading: 'Privacy policy',
  },
} satisfies Record<string, RouteMeta>;
