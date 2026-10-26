import type { DictKey } from '../../i18n/dict';

export const navItems: { to: string; label: DictKey }[] = [
  { to: '/', label: 'nav.home' },
  { to: '/products', label: 'nav.products' },
  { to: '/services', label: 'nav.services' },
  { to: '/installation', label: 'nav.installation' },
  { to: '/about', label: 'nav.about' },
  { to: '/contact', label: 'nav.contact' },
];

/** Booking always lands on the contact enquiry form, pre-filled where possible. */
export const bookPath = (service?: string, product?: string) => {
  const q = new URLSearchParams();
  if (service) q.set('service', service);
  if (product) q.set('product', product);
  const qs = q.toString();
  return `/contact${qs ? `?${qs}` : ''}#enquiry`;
};
