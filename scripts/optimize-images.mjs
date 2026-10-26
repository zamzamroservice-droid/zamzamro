// npm run images — converts the supplied business creatives in assets/raw into optimised WebP files
// in public/images. Originals are never upscaled for photos; only the tiny emblem crop is enlarged
// (with Lanczos) so the logo stays crisp on retina screens.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const RAW = 'assets/raw';
const OUT = 'public/images';
await mkdir(OUT, { recursive: true });

const HQ = { quality: 86, effort: 6, smartSubsample: true };
const raw = (f) => sharp(`${RAW}/${f}`);

/** Writes `<name>.webp` (≤ maxWidth) and `<name>-sm.webp` (≤ 640px) without upscaling. */
async function photo(file, name, maxWidth = 1400, { flatten = false, region } = {}) {
  const base = () => {
    let img = raw(file);
    if (region) img = img.extract(region);
    if (flatten) img = img.flatten({ background: '#ffffff' });
    return img;
  };
  await base().resize({ width: maxWidth, withoutEnlargement: true }).webp(HQ).toFile(`${OUT}/${name}.webp`);
  await base().resize({ width: 640, withoutEnlargement: true }).webp({ ...HQ, quality: 82 }).toFile(`${OUT}/${name}-sm.webp`);
}

// ── Product photography & brand creatives (supplied by Zam Zam) ──────────────
const products = {
  '3.jpg': 'aqua-2090-raga-collection',
  '21.png': 'aqua-2090-sky-blue',
  '19.png': 'aqua-2090-rose-pink',
  '20.png': 'aqua-2090-mint-green',
  '9.jpg': 'aqua-2090-green',
  '17.png': 'aqua-2090-royal-purple',
  '18.png': 'aqua-2090-graphite',
  '4.jpg': 'lx-one-titanium-gun-metal',
  '5.jpg': 'water-pia-collection',
  '7.jpg': 'nile-aqua-jade-collection',
  '13.jpg': 'nile-aqua-v5',
  '10.jpg': 'clean-water-aqua-ultra',
  '12.jpg': 'clean-water-mountain-water-black',
  '11.jpg': 'clean-water-hi-flo-metallic-cherry',
  '14.jpg': 'aqua-roma-gold',
  '8.jpg': 'water-softener-installation',
  '6.jpg': 'water-level-controller-and-ss-systems',
  '2.jpg': 'commercial-and-controller-range',
  '1.jpg': 'zamzam-business-card',
};
for (const [file, name] of Object.entries(products)) {
  await photo(file, name, 1400, { flatten: file.endsWith('.png') });
}

// Champagne Raga unit, cropped from the official Raga Series group creative (no upscaling).
await photo('3.jpg', 'aqua-2090-champagne', 640, { region: { left: 636, top: 392, width: 252, height: 322 } });

// Individual units cropped from the "Pure water in every drop" creative.
await photo('2.jpg', 'zamzam-ss-standard', 640, { region: { left: 515, top: 390, width: 205, height: 295 } });
await photo('2.jpg', 'zamzam-ss-hot-normal', 640, { region: { left: 735, top: 390, width: 205, height: 295 } });
await photo('2.jpg', 'triple-stage-commercial-ro', 640, { region: { left: 960, top: 175, width: 290, height: 520 } });
await photo('2.jpg', 'automatic-water-level-controller', 640, { region: { left: 0, top: 230, width: 500, height: 470 } });

// ── Second batch of creatives (assets/raw/v2) ───────────────────────────────
const v2 = {
  'lexpure.webp': 'lexpure-ro',
  'nile-aqua-v5-maroon.webp': 'nile-aqua-v5-maroon',
  'purosis-puroaqua.webp': 'purosis-puroaqua',
  'merlin-ispeed.webp': 'merlin-ispeed',
  'canix-aqua-orca.webp': 'canix-aqua-orca',
  'clean-water-range.webp': 'clean-water-range',
  'nile-aqua-innovica-range.webp': 'nile-aqua-innovica-range',
  'nile-aqua-innovica-black.webp': 'nile-aqua-innovica-black',
  'nile-aqua-2090-next.webp': 'nile-aqua-2090-next',
  'aqua-2090-raga-green-kitchen.webp': 'aqua-2090-raga-green-kitchen',
  'zamzam-business-card-tamil.webp': 'zamzam-business-card-tamil',
};
for (const [file, name] of Object.entries(v2)) await photo(`v2/${file}`, name, 1400, { flatten: file.endsWith('.png') });

// The stainless-steel creative shows two products — split into one photo each.
await photo('v2/zamzam-ss-systems-pair.webp', 'zamzam-ss-standard-photo', 640, { region: { left: 10, top: 236, width: 425, height: 770 } });
await photo('v2/zamzam-ss-systems-pair.webp', 'zamzam-ss-hot-normal-photo', 640, { region: { left: 448, top: 236, width: 440, height: 770 } });

// ── Aqua Era (assets/raw/v3): Zempure front photo + the six-finish range creative ─────
await photo('v3/aqua-era-zempure-charcoal.webp', 'aqua-era-zempure-charcoal', 1400);
await photo('v3/aqua-era-range.png', 'aqua-era-range', 1400, { flatten: true });
// One tile per finish, cropped from the range creative (2 columns × 3 rows, no upscaling).
const eraTiles = { 'silk-blue': [0, 0], 'silk-beige': [1, 0], 'urban-grey': [0, 1], 'charcoal-black': [1, 1], 'pearl-white': [0, 2], 'forest-blue': [1, 2] };
for (const [finish, [col, row]] of Object.entries(eraTiles)) {
  await photo('v3/aqua-era-range.png', `aqua-era-${finish}`, 640, {
    flatten: true,
    region: { left: col ? 263 : 2, top: [2, 318, 633][row], width: 256, height: 305 },
  });
}

// ── Real water photography ───────────────────────────────────────────────────
const water = { '25.jpg': 'water-underwater-rays', '26.jpg': 'water-turquoise-surface', '15.jpg': 'water-underwater-light', '16.jpg': 'water-sea-dusk' };
for (const [file, name] of Object.entries(water)) {
  await raw(file).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(`${OUT}/${name}.webp`);
  await raw(file).resize({ width: 960 }).webp({ quality: 76, effort: 6 }).toFile(`${OUT}/${name}-sm.webp`);
}

// ── Brand emblem: transparent navy / white variants + icons ──────────────────
const EMBLEM = { left: 570, top: 40, width: 140, height: 195 };
async function emblem(rgb, width) {
  const src = raw('1.jpg').extract(EMBLEM).resize({ width, kernel: 'lanczos3' });
  const { data: alpha, info } = await src.clone().greyscale().negate().linear(1.7, -45).toColourspace('b-w').raw().toBuffer({ resolveWithObject: true });
  return sharp({ create: { width: info.width, height: info.height, channels: 3, background: rgb } })
    .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png({ compressionLevel: 9 });
}
await (await emblem({ r: 32, g: 38, b: 87 }, 420)).toFile(`${OUT}/emblem-navy.png`);
await (await emblem({ r: 255, g: 255, b: 255 }, 420)).toFile(`${OUT}/emblem-white.png`);

async function icon(size, file, pad = 0.16) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await (await emblem({ r: 32, g: 38, b: 87 }, 420)).toBuffer();
  const fitted = await sharp(mark).resize({ height: inner, width: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: { r: 250, g: 249, b: 246, alpha: 1 } } })
    .composite([{ input: fitted, gravity: 'center' }])
    .png()
    .toFile(file);
}
await icon(64, 'public/favicon.png', 0.06);
await icon(180, 'public/apple-touch-icon.png');
await icon(192, `${OUT}/icon-192.png`);
await icon(512, `${OUT}/icon-512.png`);

// ── Open Graph image (1200×630): the official business card on pearl ─────────
const card = await raw('1.jpg').resize({ width: 1060 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#FAF9F6' } })
  .composite([{ input: card, gravity: 'center' }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(`${OUT}/og-zamzam.jpg`);

console.log('✓ Images optimised into public/images');
