// npm run photo-folders — creates new-photos/<category>/<product-slug>/ for every product (with a
// .gitkeep so Git keeps the empty folder) and regenerates new-photos/README.md with the folder list.
// Run it again after adding a product to src/data/products.ts.
import { mkdir, writeFile, access } from 'node:fs/promises';

const { products, categories, fullName } = await import('../src/data/products.ts');
const ROOT = new URL('../new-photos/', import.meta.url);

const exists = (u) => access(u).then(() => true, () => false);

for (const c of categories) {
  for (const p of products.filter((x) => x.category === c.id)) {
    const dir = new URL(`${c.folder}/${p.slug}/`, ROOT);
    await mkdir(dir, { recursive: true });
    if (!(await exists(new URL('.gitkeep', dir)))) await writeFile(new URL('.gitkeep', dir), '');
  }
}

const table = categories
  .map((c) => {
    const rows = products
      .filter((p) => p.category === c.id)
      .map((p) => `| \`new-photos/${c.folder}/${p.slug}\` | ${fullName(p)} | ${p.colours.length ? p.colours.map((x) => `\`${x.id}\``).join(', ') : '—'} |`)
      .join('\n');
    return `### ${c.label}\n\n| Put the photo in | It appears on | Colour words (optional, at the start of the file name) |\n|---|---|---|\n${rows}`;
  })
  .join('\n\n');

const readme = `# Adding a product photo to the Zam Zam website

You do **not** need to touch any code. You only:

1. Name the photo well.
2. Put it in the right product folder.
3. Upload it to GitHub.

About 3–5 minutes later the photo is live. It becomes the **first photo** of that product —
on its card, at the top of its product page, and the product moves to the **front of “All products”**.

> தமிழில் சுருக்கமாக: புகைப்படத்தின் பெயரை ஆங்கிலத்தில் சிறிய எழுத்துகளிலும் சொற்களுக்கு இடையே \`-\`
> குறியுடனும் எழுதுங்கள். சரியான தயாரிப்பு ஃபோல்டரில் GitHub-இல் பதிவேற்றுங்கள். 3–5 நிமிடங்களில்
> இணையதளத்தில் அந்தத் தயாரிப்பின் முதல் படமாகத் தோன்றும்.

---

## Step 1 — Check the photo

| Check | Rule |
|---|---|
| File type | **JPG, PNG or WEBP**. iPhone **HEIC is not supported** — export it as JPG first. |
| Size | At least **1200 px wide** (1600 px or the original is best). Small photos are never enlarged. |
| File size | Under **25 MB** (GitHub’s website limit). |
| Shape | Any shape. Square or 4:5 portrait suits product cards best. |
| Edits | Finish all editing (crop, brightness, background) **before** uploading. |
| Honesty | Only real photos of the product or of **your own** installations. No other dealers’ watermarked photos. |

## Step 2 — Name the file

The name becomes the photo’s **description** (read by Google and by blind visitors) and part of its web address.

1. Describe what is in the photo.
2. **small letters** only, **hyphens** between words.
3. **English letters and numbers only** — no Tamil, emoji or symbols like \`& @ # ' ( ) ,\`.
4. About **3 to 10 words**.
5. **No customers’ names or addresses.** Write “kitchen”, “office”, “home” instead.
6. You don’t need the product name — the website adds it from the folder.

**Optional — link a photo to a colour:** start the name with one of the product’s colour words
(listed in the table below). Example: \`pearl-white-on-kitchen-counter.jpg\` in the Zempure folder becomes
the photo shown when a visitor picks **Pearl White**.

| Good ✅ | Shown on the website as |
|---|---|
| \`front-view-on-kitchen-wall.jpg\` | Aqua Era Zempure — Front view on kitchen wall |
| \`pearl-white-on-kitchen-counter.jpg\` | …and becomes the Pearl White photo |
| \`installed-in-office-pantry.jpg\` | Hot & Normal Pure Water System — Installed in office pantry |
| \`softener-with-brine-tank-in-utility-area.jpg\` | Whole-House Water Softener — Softener with brine tank in utility area |

| Avoid ❌ | Problem |
|---|---|
| \`IMG_4021.jpg\`, \`WhatsApp Image 2026-10-09.jpg\` | Says nothing (WhatsApp also lowers quality). Still works, but gets a generic description. |
| \`Kumar house Perundurai (final).jpg\` | Customer name, place and symbols. |
| \`சுத்திகரிப்பான்.jpg\` | Non-English letters are removed. |

Same name twice? Fine — nothing is overwritten; \`-2\`, \`-3\` is added automatically.

## Step 3 — Choose the folder

The folder decides **which product** the photo belongs to. Don’t create or rename folders —
a photo in any other folder is skipped.

${table}

## Step 4 — Upload to GitHub

**GitHub website (easiest):** open the repository → \`new-photos\` → the category folder → the product folder →
**Add file → Upload files** → drag in the photo(s) → message like \`Add Zempure photos\` →
**Commit directly to the main branch** → **Commit changes**.

**GitHub Desktop:** copy the photo(s) into the product folder → write a summary → **Commit to main** → **Push origin**.

## Step 5 — Wait 3–5 minutes, then check

Behind the scenes GitHub resizes the photo for phones and computers, makes it the product’s first photo,
**removes it from \`new-photos\`** (that is normal — it has moved into the website) and publishes the site
through Cloudflare.

Follow it in the repository’s **Actions** tab: 🟡 working · ✅ done (refresh the website) · ❌ something went wrong
(send the link to your developer). A ⚠️ warning in the summary means a file was skipped (wrong type or folder) —
it stays in the folder so you can fix it.

Still seeing the old page? Press **Ctrl + Shift + R** (Windows) / **Cmd + Shift + R** (Mac).

## Quick checklist

- [ ] JPG, PNG or WEBP · under 25 MB · at least 1200 px wide
- [ ] Editing finished · a real photo of this product or your own work
- [ ] Name: small English letters with hyphens, no customer names
- [ ] In the right **product** folder · committed to **main**
- [ ] Waited for ✅ in Actions

**Remove or replace a photo?** Upload the new one (it appears first), then ask your developer to remove the old
one from \`src/data/photo-uploads.json\`.

<!-- Generated by scripts/photo-folders.mjs — run \`npm run photo-folders\` after adding products. -->
`;
await writeFile(new URL('README.md', ROOT), readme);
console.log(`✓ new-photos/: ${products.length} product folders in ${categories.length} categories`);
