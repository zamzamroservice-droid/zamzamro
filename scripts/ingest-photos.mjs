// npm run photos — moves photos dropped into new-photos/<category>/<product-slug>/ into the website.
// For every valid image it writes public/images/uploads/<slug>/<name>.webp (+ -sm.webp), adds an entry
// to the front of src/data/photo-uploads.json (so it becomes the product's first image) and deletes
// the original from new-photos/. Invalid files are left in place with a warning.
// Runs in GitHub Actions (.github/workflows/photos-and-deploy.yml) and can also be run locally.
import sharp from 'sharp';
import { appendFile, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const { products, categories, fullName } = await import('../src/data/products.ts');

const ROOT = 'new-photos';
const OUT = 'public/images/uploads';
const MANIFEST = 'src/data/photo-uploads.json';
const OK_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const MAX_BYTES = 25 * 1024 * 1024;
const MIN_WIDTH = 1200;
const SKIP = new Set(['.gitkeep', 'README.md', '.DS_Store']);

const gh = !!process.env.GITHUB_ACTIONS;
const warnings = [];
const added = [];
const warn = (file, msg) => {
  warnings.push(`${file}: ${msg}`);
  console.log(gh ? `::warning file=${file}::${msg}` : `⚠️  ${file}: ${msg}`);
};

/** "WhatsApp Image 2026 (final)!.JPG" → "whatsapp-image-2026-final" */
const slugify = (s) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '');
const humanize = (s) => s.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
/** Camera / WhatsApp names like "img-4021", "dsc-0012", "whatsapp-image-2026-…", "final", "photo1" say nothing. */
const meaningless = (s) =>
  !s || s.startsWith('whatsapp-image') || /^(?:(?:img|dsc|dscn|pxl|photo|image|pic|picture|screenshot|new|final|untitled)\d*(?:-|$))*[\d-]*$/.test(s);

const manifest = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf8')) : [];
const bySlug = new Map(products.map((p) => [p.slug, p]));
const byFolder = new Map(categories.map((c) => [c.folder, c]));
const listDirs = async (dir) => (existsSync(dir) ? (await readdir(dir, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name) : []);

let tick = 0;
for (const folder of (await listDirs(ROOT)).sort()) {
  const category = byFolder.get(folder);
  for (const slug of (await listDirs(path.join(ROOT, folder))).sort()) {
    const dir = path.join(ROOT, folder, slug);
    const files = (await readdir(dir, { withFileTypes: true })).filter((f) => f.isFile() && !SKIP.has(f.name) && !f.name.startsWith('.'));
    for (const f of files.sort((a, b) => a.name.localeCompare(b.name))) {
      const file = path.join(dir, f.name);
      const product = bySlug.get(slug);
      if (!category) {
        warn(file, `“${folder}” is not a category folder — skipped. Use one of: ${[...byFolder.keys()].join(', ')}.`);
        continue;
      }
      if (!product) {
        warn(file, `“${slug}” is not a product folder — skipped. Run \`npm run photo-folders\` to see the list.`);
        continue;
      }
      if (product.category !== category.id) {
        const right = categories.find((c) => c.id === product.category).folder;
        warn(file, `${fullName(product)} belongs in new-photos/${right}/${slug} — added anyway.`);
      }

      const ext = path.extname(f.name).toLowerCase();
      if (ext === '.heic' || ext === '.heif') {
        warn(file, 'HEIC photos are not supported — export it as JPG and upload again. File left in place.');
        continue;
      }
      if (!OK_EXT.has(ext)) {
        warn(file, `${ext || 'this file type'} is not supported — use JPG, PNG or WEBP. File left in place.`);
        continue;
      }
      if ((await stat(file)).size > MAX_BYTES) {
        warn(file, 'larger than 25 MB — please export a smaller JPG. File left in place.');
        continue;
      }

      let meta;
      try {
        meta = await sharp(file).metadata();
      } catch {
        warn(file, 'could not be read as an image. File left in place.');
        continue;
      }
      const width = meta.autoOrient?.width ?? meta.width ?? 0;
      if (width < MIN_WIDTH) warn(file, `only ${width}px wide — it will look soft. Added anyway (never enlarged).`);

      // Name → colour (optional prefix) + description
      let base = slugify(path.basename(f.name, path.extname(f.name))) || 'photo';
      const colour = product.colours.find((c) => base === c.id || base.startsWith(`${c.id}-`));
      const rest = colour ? base.slice(colour.id.length).replace(/^-/, '') : base;
      const name = fullName(product);
      const alt = meaningless(rest)
        ? `${name}${colour ? ` in ${colour.name}` : ''} — photo by Zam Zam Pure Water System, Erode`
        : `${name}${colour ? ` in ${colour.name}` : ''} — ${humanize(rest)}`;

      // Unique output name (never overwrite)
      await mkdir(path.join(OUT, slug), { recursive: true });
      let unique = base;
      for (let n = 2; existsSync(path.join(OUT, slug, `${unique}.webp`)); n++) unique = `${base}-${n}`;

      const img = () => sharp(file, { failOn: 'none' }).rotate();
      await img().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toFile(path.join(OUT, slug, `${unique}.webp`));
      await img().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(path.join(OUT, slug, `${unique}-sm.webp`));

      // Later files in the same run count as newer, so their order is predictable.
      const addedAt = new Date(Date.now() + tick++).toISOString();
      manifest.unshift({
        product: slug,
        src: `/images/uploads/${slug}/${unique}.webp`,
        sm: `/images/uploads/${slug}/${unique}-sm.webp`,
        alt,
        ...(colour ? { colour: colour.id } : {}),
        addedAt,
      });
      added.push({ file, product: name, alt, colour: colour?.name });
      await rm(file);
      console.log(`✓ ${file} → ${OUT}/${slug}/${unique}.webp${colour ? ` (colour: ${colour.name})` : ''}`);
    }
  }
}

if (added.length) await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

const summary = [
  `## New product photos`,
  added.length ? `**${added.length} photo(s) added** — they are now the first photo of their product.` : 'No new photos to add.',
  ...added.map((a) => `- ✅ **${a.product}**${a.colour ? ` (${a.colour})` : ''} — ${a.alt}`),
  ...(warnings.length ? ['', `### ⚠️ ${warnings.length} warning(s)`, ...warnings.map((w) => `- ${w}`)] : []),
].join('\n');
console.log(`\n${summary}`);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, `${summary}\n`);
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `added=${added.length}\n`);
