# Zam Zam Pure Water System — Website

**Pure Forever.** RO water purifier sales, service & installation in Erode, Tamil Nadu.

React 19 · TypeScript · Vite · Tailwind CSS v4 · Three.js / React Three Fiber / drei · Motion · Lenis · React Router 7 · Sharp · Cloudflare Workers (static assets).

## Commands

```bash
npm install
npm run dev       # local dev server (http://localhost:5173)
npm run images    # assets/raw → optimised WebP + icons + OG image in public/images
npm run build     # tsc type-check → vite build → post-build SEO (per-route HTML, sitemap, robots)
npm run deploy    # build + wrangler deploy (Cloudflare Workers static assets)
```

First deploy: run `npx wrangler login` once. If npm warns about install scripts for `esbuild`/`workerd`, approve them (`npm install-scripts approve esbuild workerd`) so Wrangler can run.

## Project structure

```
assets/raw/                 supplied business creatives & water photography (source images)
public/                     favicon, manifest, generated images
scripts/optimize-images.mjs Sharp pipeline (npm run images)
scripts/postbuild-seo.mjs   per-route prerendered <head>, JSON-LD, sitemap.xml, robots.txt
src/
  data/                     business.ts · products.ts · services.ts · faqs.ts · journey.ts · seo.ts · works.ts
  lib/                      whatsapp.ts (message builders) · schema.ts (JSON-LD) · scroll.ts (Lenis) · motion.ts
  components/
    hero/                   Hero (scroll choreography) · PurifierCanvas · PurifierModel · heroStore · decals
    home/                   CollectionShowcase · FiltrationJourney · WaterMatcher · BeyondPurifiers
    layout/                 Preloader · Header · MobileMenu · Footer · FloatingContact · ScrollProgress · ClickFeedback
    products/ forms/ ui/    ProductCard · Gallery · EnquiryForm · PageHero · Seo · FaqAccordion · …
  pages/                    Home · Products · ProductDetail · Services · Installation · About · Contact · FAQ · Privacy · NotFound
```

## Languages (English / தமிழ்)

- The EN | தமிழ் switch sits in the header (and in the mobile menu). The choice is remembered in the browser.
- UI text lives in `src/i18n/dict.ts` (same keys for `en` and `ta`). Product, service, FAQ and journey Tamil text sits next to the English in `src/data/*` under `ta`.
- Tamil wording for the brand follows the official Tamil business card: **ஜம் ஜம் · தூய குடிநீர் அமைப்பு · என்றும் தூய்மை · ஈரோடு**. The logo wordmark, preloader and business card (About & Contact) switch with the language.
- URLs, page titles and structured data stay in English for search engines. WhatsApp enquiry messages are always sent in English so the shop receives a consistent format.

## Adding product photos (no code) — GitHub → Cloudflare

Full owner guide: **[new-photos/README.md](new-photos/README.md)**.

1. Upload a JPG/PNG/WEBP into `new-photos/<category>/<product-slug>/` on GitHub (commit to `main`).
2. `.github/workflows/photos-and-deploy.yml` runs `scripts/ingest-photos.mjs`: resizes to WebP in
   `public/images/uploads/<slug>/`, adds it to the front of `src/data/photo-uploads.json`, removes the original
   and commits back to `main`.
3. `src/data/products.ts` merges those uploads: the newest becomes the product's first image (card, gallery,
   collection cover, OG image), a file name starting with a colour id (e.g. `pearl-white-…`) becomes that
   colour's photo, and recently updated products move to the front of "All products".
4. Cloudflare publishes the site — either via **Workers Builds** connected to this repo, or by the workflow
   itself when the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets are set.

`npm run photo-folders` recreates the folders and the folder table after you add a product. `npm run photos`
runs the same ingest locally.

## How the 3D hero works

- `Hero.tsx` maps scroll progress through a tall section (sticky viewport) to `heroStore.progress`.
- `heroStore.timeline(p)` derives every stage from that one value: turn → translucent shell → four cartridges light up →
  tap pressed → stream → glass fills (bubbles, splash) → underwater → turquoise background → camera toward the glass → tap released, green indicator.
- The canvas uses `frameloop="demand"`: frames render only while something moves, and stop when off-screen or the tab is hidden.
- The 3D chunk is lazy-loaded after the preloader. No WebGL or a WebGL error → static Zempure photo hero with the same captions, finish picker and product link.
- The model is the **Aqua Era Zempure (Core Series)**, built procedurally from the front product photo
  (proportions, ribbed tank, brushed ERA™ band, chrome tap frame, ZEMPURE® badge, Power/Full/Alert strip).
  The hero's finish picker switches between the two Core finishes shown by the brand: Charcoal Black (smoked tank) and Pearl White (frosted tank).
  It is illustrative, not a manufacturer CAD file. To use a real model, add a `.glb` and swap `PurifierModel` for a `useGLTF` loader.

## Honesty rules baked into the data

- No prices, ratings, reviews, capacities, warranties, certifications or founding dates are invented. Empty specs render “Enquire for details”.
- Product claims are limited to what the brand creatives state (source noted on each product page).
- Hours, email and named service areas stay hidden until filled in `src/data/business.ts`.
- “Jobs We Were Trusted With” shows a clearly-marked placeholder until real, approved jobs are added to `src/data/works.ts`.

See **CONFIRM.md** for everything the owner needs to confirm before launch.
