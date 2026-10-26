# Owner confirmation checklist

Items the website deliberately does **not** guess. Until confirmed they are hidden or shown as “Enquire for details”.

| # | Item | Where to change | Current behaviour |
|---|------|-----------------|-------------------|
| 1 | Final domain (custom domain) | `.env` → `VITE_SITE_URL` | Uses `https://zamzamro.mohammedriyazs0506.workers.dev` for canonicals, OG, sitemap |
| 2 | Opening hours | `src/data/business.ts` → `hours` | Hidden; Contact page says “call to confirm we’re open” |
| 3 | Named service areas | `src/data/business.ts` → `serviceAreas` | Shows “Erode and nearby areas” |
| 4 | Business email (optional) | `src/data/business.ts` → `email` | Hidden |
| 5 | Colours actually in stock (Aqua 2090 Raga ×6, Water Pia ×5, Nile Aqua Jade ×5, Nile Aqua Innovica ×5, Purosis PuroAqua ×8, Clean Water range ×5, Nile Aqua V5 ×2) | `src/data/products.ts` → `colours` | All shown, with “availability confirmed on enquiry” |
| 6 | Colour names for Water Pia, Nile Aqua Jade, Nile Aqua Innovica and Purosis PuroAqua | `src/data/products.ts` | Plain descriptive names (e.g. “White & Teal”) — brand names were not printed on the creatives |
| 7 | Specifications (capacity, purification rate, power, dimensions, warranty) | `src/data/products.ts` → `specs` | “Enquire for details” |
| 8 | UPS & inverter battery brands + a real product photo | `src/data/products.ts`, `assets/raw` | Icon panel “Photo on request” |
| 9 | Real, approved job photos for “Jobs We Were Trusted With” | `src/data/works.ts` + `assets/raw` → `npm run images` | Dashed placeholders labelled “Real project photos coming soon” |
| 10 | Other-brand servicing policy | `src/data/faqs.ts` | Says “often, subject to confirmation” |
| 11 | Real Aqua Era Zempure 3D model (.glb), if the brand can supply one | `src/components/hero/PurifierModel.tsx` | Procedural model built from the product photo |
| 13 | Model names not printed on two creatives: “Lexpure RO Purifier” and “Clean Water Purifier Range” are descriptive placeholders | `src/data/products.ts` | Shown as descriptive names |
| 14 | Tamil translations — have a native speaker review the wording | `src/i18n/dict.ts`, `src/data/*` (`ta` fields) | Live as written |
| 15 | Aqua Era finishes: Zempure is listed in its two Core finishes (Charcoal Black, Pearl White). The other four finishes (Silk Blue, Silk Beige — Silk badge; Urban Grey, Forest Blue — Elite badge) are listed under “Aqua Era Water Purifier Range”. Confirm model names for the Silk and Elite versions | `src/data/products.ts` | Shown as on the range creative |
| 12 | Google Business Profile — NAP must match the site exactly | Google Business Profile | Name, address, phone as on business card |

Google note: FAQPage structured data is included because the full Q&A is visible on `/faq`, but Google currently shows FAQ rich results mainly for authoritative government/health sites, so don’t expect them in search results.
