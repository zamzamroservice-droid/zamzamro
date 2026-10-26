# Master Prompt — Acceptance Checklist

Status of every section of the master project prompt. ✅ done · ⚠️ needs owner input (marked CONFIRM in code).

| # | Section | Status | Where |
|---|---|---|---|
| 1 | Brand, NAP, emblem & wordmark | ✅ | `src/data/business.ts`, `public/images/emblem-*.png` |
| 2 | Four pillars (3D hero, collection, journey, WhatsApp) | ✅ | Home page |
| 3 | Tech stack & scripts (dev/build/images/deploy) | ✅ | `package.json` |
| 4 | Design system (tokens, fonts, cards, buttons, glass, easing, scrollbar) | ✅ | `src/index.css` |
| 5 | Preloader (bounded ≤4.5s), 64px header, mobile menu dialog + Esc, footer, floating contact (hides while typing), Lenis, progress, reveals, transitions | ✅ | `components/*` |
| 6 | 3D Aqua 2090 Raga hero, 6 colours → product page `?colour=`, 9-stage scroll choreography, living water, static fallback (no WebGL / reduced motion / error) | ✅ | `HeroPurifier.tsx`, `HeroStatic.tsx` |
| 7 | Collection: 4 tilted cards with series, description, swatches, View + Enquire | ✅ | `FanCards.tsx` |
| 8 | Catalogue: 15 products, search, category/brand filters + counts, chips, clear-all, URL params | ✅ | `pages/Products.tsx` |
| 9 | Product pages: gallery, colour selector, highlights, specs (“Enquire for details”), related, WhatsApp with colour, schema | ✅ | `pages/ProductDetail.tsx` |
| 10 | Journey of One Drop: 6 stages, keyboard, auto-play pauses on hover/focus/reduced motion, disclaimer, products link | ✅ | `PurificationJourney.tsx` |
| 11 | Water source matcher with TDS caveat | ✅ | `WaterSourceMatcher.tsx` |
| 12 | Beyond purifiers: 4 cards with Enquire | ✅ | Home |
| 13 | Services + orbit visual + work section | ⚠️ | Section shows “Work we handle” until real, approved jobs are added in `data/works.ts` |
| 14 | Installation: SVG, 6 steps, requirements, FAQs, form | ✅ | `pages/Installation.tsx` |
| 15 | About: PURE water visual, story, 4 promises (no invented history) | ✅ | `pages/About.tsx` |
| 16 | Contact: radar + Erode time, call, WhatsApp, map, form | ⚠️ | Hours & named service areas hidden until confirmed |
| 17 | Enquiry form: validation + structured WhatsApp message, no storage | ✅ | `EnquiryForm.tsx` |
| 18 | FAQs: search, topic chips, accessible accordion, FAQPage schema | ✅ | `pages/FAQ.tsx`, `FaqList.tsx` |
| 19 | Privacy & 404 | ✅ | `pages/Privacy.tsx`, `pages/NotFound.tsx` |
| 20 | Motion system (no animated text gradients / blur filters) | ✅ | global |
| 21 | SEO: titles, canonicals, OG, schema, sitemap, robots, manifest, noscript, per-route HTML | ⚠️ | Site URL from `.env` `VITE_SITE_URL` — confirm final domain |
| 22 | Image pipeline (Sharp, high-quality WebP, no watermarked images) | ✅ | `scripts/optimize-images.mjs` |
| 23 | Responsive & a11y: 375/768/1024/1280 no overflow, one H1 per page, alt text | ✅ | verified |
| 24 | Cloudflare Workers (`wrangler.jsonc`, no `_redirects`) | ✅ | dry-run passed; needs push to deploy |
| 25 | Honesty: no fabricated reviews, specs, prices, clients, hours, areas, domain | ✅ / ⚠️ | owner to supply real data |

## Owner to confirm
- `.env` `VITE_SITE_URL` (final domain)
- `business.ts`: `hours`, `googleReviewUrl`, `serviceAreas` + `serviceAreasConfirmed: true`
- `works.ts`: real approved jobs & photos → rename to “Jobs we were trusted with”
- `reviews.ts`: genuine reviews only
- Product specifications (capacity, power, dimensions, warranty)
- A real 3D model (`.glb`) of the Aqua 2090 Raga, if available, to replace the procedural model
