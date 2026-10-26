// Runs after `vite build`. For every route (static pages + all product pages) it writes
// dist/<route>/index.html with the correct <title>, meta description, canonical, Open Graph tags,
// route-specific JSON-LD and a noscript heading — so crawlers and link previews see real content
// without executing JavaScript. Also writes sitemap.xml and robots.txt.
// Node's built-in TypeScript type stripping lets us import the same data files the app uses.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const envFile = await readFile(new URL('../.env', import.meta.url), 'utf8').catch(() => '');
for (const line of envFile.split('\n')) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const { routeMeta } = await import('../src/data/seo.ts');
const { products, fullName, productPath, titleName } = await import('../src/data/products.ts');
const { SITE_URL } = await import('../src/data/business.ts');
const { faqs } = await import('../src/data/faqs.ts');
const schema = await import('../src/lib/schema.ts');
if (!SITE_URL) throw new Error('VITE_SITE_URL is not set (see .env)');

const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');
if (!template.includes('<!--route-jsonld-->')) throw new Error('JSON-LD marker missing from dist/index.html');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ld = (blocks) => blocks.map((b) => `<script type="application/ld+json" data-pr-ld>${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`).join('\n    ');
const crumbs = (...items) => schema.breadcrumb([{ name: 'Home', path: '/' }, ...items]);

const pages = [
  { ...routeMeta.home, jsonLd: [schema.localBusiness(), schema.itemList(products.filter((p) => p.featured))] },
  { ...routeMeta.products, jsonLd: [schema.itemList(products), crumbs({ name: 'Products', path: '/products' })] },
  { ...routeMeta.services, jsonLd: [...schema.serviceSchemas(), crumbs({ name: 'Services', path: '/services' })] },
  { ...routeMeta.installation, jsonLd: [crumbs({ name: 'Installation', path: '/installation' })] },
  { ...routeMeta.about, jsonLd: [crumbs({ name: 'About', path: '/about' })] },
  { ...routeMeta.contact, jsonLd: [schema.localBusiness(), crumbs({ name: 'Contact', path: '/contact' })] },
  { ...routeMeta.faq, jsonLd: [schema.faqPage(faqs), crumbs({ name: 'FAQs', path: '/faq' })] },
  { ...routeMeta.privacy, jsonLd: [crumbs({ name: 'Privacy Policy', path: '/privacy' })] },
  ...products.map((p) => {
    const name = fullName(p);
    return {
      path: productPath(p),
      title: `${titleName(p)} in Erode | Zam Zam Pure Water System`,
      description: `${p.short} ${p.summary}`.slice(0, 158),
      heading: `${name} — available at Zam Zam Pure Water System, Erode`,
      image: p.images[0]?.src,
      jsonLd: [schema.productSchema(p), crumbs({ name: 'Products', path: '/products' }, { name, path: productPath(p) })],
    };
  }),
];

for (const page of pages) {
  const url = `${SITE_URL}${page.path}`;
  const image = `${SITE_URL}${page.image ?? '/images/og-zamzam.jpg'}`;
  const html = template
    .replace(/<title data-pr>[\s\S]*?<\/title>/, `<title data-pr>${esc(page.title)}</title>`)
    .replace(/<meta data-pr name="description" content="[^"]*"/, `<meta data-pr name="description" content="${esc(page.description)}"`)
    .replace(/<link data-pr rel="canonical" href="[^"]*"/, `<link data-pr rel="canonical" href="${url}"`)
    .replace(/<meta data-pr property="og:title" content="[^"]*"/, `<meta data-pr property="og:title" content="${esc(page.title)}"`)
    .replace(/<meta data-pr property="og:description" content="[^"]*"/, `<meta data-pr property="og:description" content="${esc(page.description)}"`)
    .replace(/<meta data-pr property="og:url" content="[^"]*"/, `<meta data-pr property="og:url" content="${url}"`)
    .replace(/<meta data-pr property="og:image" content="[^"]*"/, `<meta data-pr property="og:image" content="${image}"`)
    .replace('<!--route-jsonld-->', ld(page.jsonLd))
    .replace(/(<noscript>[\s\S]*?<h1>)[\s\S]*?(<\/h1>)/, `$1${esc(page.heading)} | Zam Zam Pure Water System$2`);
  const dir = page.path === '/' ? dist : new URL(`.${page.path}/`, dist);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL('index.html', dir), html);
}

const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === '/' ? '1.0' : p.startsWith('/products/') ? '0.7' : p === '/privacy' ? '0.3' : '0.8');
await writeFile(
  new URL('sitemap.xml', dist),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${today}</lastmod><priority>${priority(p.path)}</priority></url>`).join('\n')}
</urlset>
`,
);
await writeFile(new URL('robots.txt', dist), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`✓ SEO: ${pages.length} prerendered routes, sitemap.xml and robots.txt written for ${SITE_URL}`);
