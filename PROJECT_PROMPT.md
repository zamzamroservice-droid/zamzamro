# Complete Project Prompt — Zam Zam Pure Water System Website

Use this prompt to rebuild (or brief another developer / AI on) the full website exactly as it stands.

---

## 1. Project brief

Build a premium, **royal, luxurious, soft & sweet** marketing website in **ReactJS** for
**Zam Zam Pure Water System, Erode** — an RO water purifier business offering **sales, service and installation**,
plus UPS batteries, water softeners, stainless-steel commercial systems and automatic water level controllers.

The site must feel like a high-end water-technology brand: real water photography, a scroll-driven 3D product hero,
soft pastel UI, smooth scrolling, fast loading, fully responsive (phone / tablet / desktop), and strong local SEO for Erode.

**Business details (keep consistent everywhere — must match Google Business Profile):**
- Name: Zam Zam Pure Water System · Tagline: *Pure Forever*
- Phone / WhatsApp: 818 99 717 17 (+91 81899 71717)
- Address: 125/2 Jeevanandham Street, Near N.R. Mahal, Poondurai Road, Erode – 638 002, Tamil Nadu
- Logo: navy water-drop emblem with mosque minaret + “ZAM ZAM / PURE WATER SYSTEM / PURE FOREVER” wordmark
- Placeholders to confirm before launch: domain (`SITE_URL`), opening hours, Google review link, service areas, real client projects, real reviews

---

## 2. Tech stack

- **React 19 + TypeScript + Vite** (React 19 native `<title>/<meta>` hoisting for SEO — no Helmet)
- **Tailwind CSS v4** (`@tailwindcss/vite`, design tokens in `@theme`, custom `@utility` classes)
- **Three.js + @react-three/fiber + @react-three/drei** (3D hero, lazy-loaded only on Home)
- **motion** (`motion/react`) for animations and page transitions
- **Lenis** for smooth inertia scrolling (desktop wheel; native touch on phones; respects reduced-motion)
- **react-router-dom v7**, **lucide-react** icons
- **sharp** image pipeline script (`npm run images`) → high-quality WebP
- Deploy: **Cloudflare Workers static assets** via `wrangler.jsonc` (`not_found_handling: single-page-application`,
  `html_handling: auto-trailing-slash`). Do **not** emit a `_redirects` file (causes an infinite-loop error on Workers).

Scripts: `dev`, `build` (`tsc -b && vite build && node scripts/postbuild-seo.mjs`), `images`, `deploy`.

---

## 3. Design system — royal, soft & sweet

**Colours**
| Token | Hex | Use |
|---|---|---|
| navy | #202657 | brand, headings, primary buttons |
| navy-deep | #141838 | deep accents |
| navy-soft | #3a4180 | button gradients |
| pearl | #faf9f6 | page background |
| aqua | #e4f5f8 | soft fills |
| sky | #e6f6f8 | section tints |
| ice | #a9dce7 | rings, highlights |
| ocean | #3d8fb8 | water accents |
| gold | #c6ad7c / gold-deep #a68a55 | luxury accents (sparingly) |
| blush | #f6ece6 | warm soft tint |

**Fonts:** headings *Cormorant Garamond* (weight 500, elegant), body/labels *Jost* (15px base), wordmark *Marcellus*,
3D logo decal *Michroma*. Letter-spaced uppercase micro-labels (0.26–0.3em).

**Soft & sweet components**
- Section labels (“eyebrow”): pearl pill, gold dot, soft gold ring.
- Cards: 26px radius, white→pearl gradient, faint ice ring, aqua-tinted hover glow (`shadow-lift`).
- Buttons: pill shape; royal = navy gradient + light sweep on hover; gold = champagne gradient; ghost = white glass.
  Hover lifts 1px, press scales 0.97.
- Glass panels: white→aqua gradient, 12px backdrop blur.
- Inputs: rounded, pearl fill, soft gold focus glow.
- Gold-gradient italic words in headings (static, not animated, for performance).
- One easing curve everywhere: `cubic-bezier(0.22, 1, 0.36, 1)`; slim water-blue scrollbar.
- Page background: faint aqua glow top-right + blush bottom-left (not `background-attachment: fixed`).
- Compact spacing: sections `py-8 sm:py-10`, headings `text-[1.9rem] sm:text-4xl lg:text-[2.75rem]`.

---

## 4. Global layout & behaviour

- **Preloader** on every load/reload: navy emblem fills with an animated water wave, ripples, “ZAM ZAM / Pure Forever”,
  progress line tied to fonts + window load (min ~1.9s, max 4.5s); circular reveal exit; locks scroll while visible.
- **Header**: fixed, always visible, constant 64px height, frosted-glass pill; logo, links (Home, Products, Services,
  Installation, About, Contact) with animated active pill, phone (xl), “Book Service” button.
  Mobile menu: full-screen navy overlay rendered **outside** the header (so transforms don’t trap it), circular reveal, `data-lenis-prevent`.
- **Footer**: navy gradient with soft wave top; logo, short description, “Pure Forever”; Explore links (2 columns on phone),
  Services (2-column grid), Visit & Call (address → Google Maps, phone, WhatsApp, hours if set); copyright + brand disclaimer.
- **Floating contact**: desktop WhatsApp (pulse) + Call buttons; phone bottom bar Call / WhatsApp / Book.
- Scroll progress bar (ice→gold→navy), click ripple effect, smooth Lenis scrolling, hash-link glide with 96px offset,
  page transitions (soft fade/slide), scroll to top on route change, `history.scrollRestoration = 'manual'`.
- Section reveal: fade + 18px rise (no blur filters).
- Reusable **RealWater** backdrop: real water photo with slow drift, sun-ray stripes, CSS rising bubbles, overlay prop
  (`deep` = underwater sunburst, `surface` = turquoise sea). Lighter on phones.
- Reusable **CTA strip**: compact horizontal banner over real water — emblem, title, text, Call / WhatsApp / Book online.

---

## 5. Home page (section order)

1. **3D Hero — Aqua 2090 Raga purifier (scroll-driven, sticky)**
   - Section height 340vh (desktop/tablet), **240vh on phones**; sticky full-screen WebGL canvas.
   - Model built from code to match Aqua 2090 product photos: satin pearlescent pastel body, top cap + seam,
     raised front door & base band, 6 body-coloured vertical ribs over a smoked grey tank (with water inside, wrapping the right side),
     silver rectangular tap frame, body-coloured push tap, chrome nozzle, black drip tray, LED strip (red/white/green with icons),
     “AQUA 2090” outline logo (Michroma) + “Raga Series”, two black side knobs, light streaks on edges.
     Stands on a pearl podium with a gold ring; contact shadow (rendered once).
   - **Colour picker** (glass pill): Sky Blue, Rose Pink, Mint Green, Champagne, Royal Purple, Graphite — recolours live,
     links to the product page. Phone: centred under header. Desktop: bottom-right.
   - **Scroll choreography**: 0–0.22 machine turns to face you + shell turns translucent (“x-ray”) and 4 cartridges glow in order
     (sediment, carbon, RO membrane, copper/alkaline); 0.24–0.32 tap pressed; 0.30–0.86 water stream (fresnel shader, gravity head/tail),
     glass fills with bubbles and splash, tank level drops, camera eases to the glass (desktop) / barely zooms (phone, full machine always visible);
     0.60–0.86 background blends from underwater sunburst to turquoise sea; 0.86–1 tap releases, “tank full” LED.
   - **Living water background** (full-screen shader on the real photos): domain-warped fbm flow, chromatic shimmer, caustic light network,
     sun shafts radiating from the photo’s sun, glints; turquoise sea with swell, sparkles and caustics; vignette; exact photo tones (no tone mapping).
     Rising rimmed bubbles + drifting suspended particles (point shaders). Gentle machine float/sway.
   - Text panels (glass cards) fade per stage: (1) “Every drop, *pure forever.*” H1 + “RO Water Purifier Sales, Service & Installation in Erode”
     + Explore purifiers / Book a service; (2) “Four stages of purity” list lighting up; (3) “Clear, cool, pure water — every glass.” + chips;
     (4) “Ready for your home in Erode.” + Book installation / WhatsApp. Progress rail + “Scroll to pour” hint.
   - Performance: lazy chunk, pause when off-screen, DPR 1.75 desktop / 1.35 phone with PerformanceMonitor fallback,
     transmission pass at half resolution, branch-skipping shader, reduced particle counts on phones.
2. **The collection** — 4 overlapping, tilted, rounded “dealt” cards (editorial portfolio style): photo in soft inner frame,
   gold category label, serif title, “View purifier ↗”; spring-in on scroll, straighten + lift on hover; swipeable row on phones.
   Products: Aqua 2090 Raga, LX One Titanium, Water Pia, Nile Aqua Jade. “View all products →”.
3. **Sales · Service · Installation** — 3 compact pillar cards with large faded numbers.
4. **The journey of one drop** (inside your purifier) — compact section over real water: 6 clickable stage chips (auto-advance every 2.6s,
   pause on hover), pipe with travelling drop that clears as it goes, stage card with progress bar. “Illustrative — stages vary by model.”
5. **Water source matcher** — equal-height two columns: choose source (Borewell, Tanker, Municipal, Corporation, Open Well, Office/Business),
   TDS slider (50–2000 ppm) with a glass that clears; suggestion card with 3 matching products + “Book a water check on WhatsApp”.
6. **Beyond purifiers** — 4 compact cards: Automatic Water Level Controller, Whole-House Softener, Hot & Normal SS System, UPS Batteries.
7. **Why Zam Zam** — 4 values: Honest advice, Local & reachable, Craft in every fitting, Genuine parts.
8. **Reviews** — shows genuine reviews from `data/reviews.ts`; otherwise a “Write a review” Google invitation (never fabricate reviews).
9. **FAQ preview + service areas** chips + “All FAQs”.
10. **CTA strip**.

---

## 6. Inner pages

Every inner page has a **compact PageHero**: breadcrumb, pill label, H1 with gold italic word, intro, and a page-specific interactive visual,
over the real turquoise water with a pearl fade (visuals shrink on phones).

- **Products** — hero visual: 3D tilting, shuffling product card deck. Filter sidebar (desktop) / wrapping chips (phone): search,
  Category with counts (All, Home RO Purifiers, Commercial & SS Systems, Water Softeners, Controllers & Power), Brand chips with counts,
  active-filter chips, Clear all. Grid of compact product cards (3D tilt + glare, badge, brand, series, tagline, colour swatches,
  Enquire on WhatsApp + details). URL query params for filters. ItemList schema.
- **Product detail** (`/products/:slug`) — gallery with responsive thumbnail grid, brand, name, series, summary, technology chips,
  colour swatches, “Get price on WhatsApp” (includes chosen colour) + Call, trust row, Highlights, Ideal for, related products. Product + Breadcrumb schema.
- **Services** — hero visual: service icons orbiting the emblem on a pearl sphere (hover names, click jumps). Compact 3-column service cards
  (image, icon, title, short text, 2-column bullet points, “Book this service” WhatsApp). **“Jobs we were trusted with”** — 4 fanned work cards
  from `data/works.ts` (replace with real client projects + photos). Service schema per service.
- **Installation** — hero visual: animated SVG schematic (rippling tank → chrome pipes with flowing water → purifier with cartridges & LEDs →
  chrome tap → stream filling a glass with bubbles). 6-step grid (You reach out → Water check → Recommendation → Careful installation →
  Tested & demonstrated → Always reachable), site requirements (inlet, power socket, drain, wall space), installation FAQs + enquiry form.
- **About** — hero visual: the word “PURE” filled with real moving water (photo masked by animated wave + bubbles + meniscus), “— forever —”.
  Logo card, story (rooted in Erode, water-first advice), what we offer, “Four promises” (Purity, Transparency, Care, Craft) over real water.
- **Contact** — hero visual: radar map (sweep, pulses, service areas around Poondurai Road) + live Erode time below. Quick cards
  (Call, WhatsApp, Visit store), enquiry form, address, embedded Google Map with “Open in Maps”.
- **FAQ** — hero visual: live search + floating topic chips (Borewell, Filters, Copper, Installation, Softener, Controller, UPS, Offices)
  with result count; accordion; FAQPage schema.
- **Privacy** — what’s collected (nothing stored; WhatsApp hand-off), usage, third parties (Google Maps/Fonts), contact.
- **404** — floating emblem with ripples, “This page has evaporated”.

**Enquiry form (standard)**: Full name*, Phone*, Service*, Product (optional), Area*, Preferred date, Preferred time, Message →
composes a structured WhatsApp message to the business (frontend-only, nothing stored).

---

## 7. Content data (from the business creatives)

Products (no invented prices/capacities — “enquire for details”):
Aqua 2090 Raga (RO + Copper + Alkaline, 6 colours), LX One Titanium (Gun Metal), Water Pia (Aqua Fresh Technology, smart LED),
Nile Aqua Jade (Zinc + Copper + Alkaline), Nile Aqua V5, Clean Water Aqua Ultra – Mountain Water (TDS up to 2000 ppm, all sources),
Clean Water Mountain Water Mt. Black (BIS-compatible food-grade cabinet), Clean Water Hi-Flo (Metallic Cherry), Aqua Roma (Gold),
Zam Zam Standard SS Pure Water System, Zam Zam Hot & Normal SS System, Triple Stage Commercial RO, Whole-House Water Softener,
Automatic Water Level Controller (dry-run & overflow protection…), UPS & Inverter Batteries.

Services: RO Purifier Sales, Expert Installation, RO Repair & Service, Filter & Membrane Change, Maintenance & Sanitisation,
Commercial & SS Systems, Water Softener, UPS Battery, Water Level Controller.

10 FAQs (Erode RO sales/service, borewell water, filter change, copper/zinc/alkaline, other brands, installation needs,
level controller, softener vs RO, UPS batteries, offices & schools).

---

## 8. SEO & Google Business Profile

- Unique title + description per route targeting “… in Erode” keywords; canonical, Open Graph, `en-IN`, geo meta.
- JSON-LD: LocalBusiness/Store (NAP, brands, offer catalog), BreadcrumbList, Service, ItemList, Product, FAQPage.
- Post-build script writes a static `index.html` per route (23 pages incl. every product) with correct title/description/canonical,
  plus `sitemap.xml`; `robots.txt`; web manifest; `<noscript>` fallback with NAP.
- Semantic headings (one H1 per page), descriptive alt text, lazy images, code-split routes, 3D chunk loaded only on Home.
- GBP checklist: identical NAP, category “Water purification company”, services listed, real photos, genuine reviews.

---

## 9. Images & quality

- Business creatives, Aqua 2090 studio photos (sky, pink, mint, purple, graphite), real water photos
  (underwater sunburst, turquoise sea surface) converted by `scripts/optimize-images.mjs` to WebP quality ~92 at native size;
  small crops upscaled 2× (Lanczos) + light sharpen; emblem navy/white transparent PNGs at 3×.
- Never use watermarked third-party images (e.g., another dealer’s branding).

---

## 10. Quality bar

- No horizontal overflow at 375 / 768 / 1024 / 1280px; header fixed height; mobile menu above content.
- Smooth: no continuously animating text gradients, no fixed backgrounds, no animated blur filters, minimal backdrop blur over WebGL.
- Accessibility: labels, aria on controls, focus rings, reduced-motion support, sufficient contrast on glass panels.
- Honest content: no fabricated reviews, clients, ratings or stats; placeholders clearly marked “CONFIRM / REPLACE”.
