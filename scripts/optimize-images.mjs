/**
 * Zet de bronafbeeldingen uit `assets-src/` om naar geoptimaliseerde WebP + JPEG
 * in `public/assets/`, plus een aparte og-image voor linkpreviews.
 *
 * Waarom dit bestaat: de originelen zijn 1,5–2,3 MB per stuk terwijl ze op het
 * scherm hooguit een paar honderd pixels breed zijn. Ze staan bewust buiten
 * `public/`, zodat ze niet meegedeployed worden maar wel bewaard blijven om deze
 * stap opnieuw te kunnen draaien.
 *
 * Nieuwe projectafbeelding toegevoegd? Zet het origineel in `assets-src/projects/`
 * en draai `npm run images`.
 */
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets-src');
const OUT = path.join(ROOT, 'public', 'assets');

const WEBP = { quality: 80, effort: 5 };
const JPEG = { quality: 78, mozjpeg: true };

/** Portretten: getoond op max 440px (hero) en 360px (over-mij), dus 2x volstaat ruim. */
const PORTRAITS = [
  { file: 'me_header.png', width: 880 },
  { file: 'me_white.png', width: 880 },
  { file: 'me_3.png', width: 760 },
];

/** Projectbeelden: de detailpagina toont ze tot ~990px breed, 1600px dekt ook retina. */
const PROJECT_WIDTH = 1600;

const kb = (n) => `${Math.round(n / 1024)} KB`;

async function emit(inputPath, outDir, base, width) {
  await mkdir(outDir, { recursive: true });
  const pipeline = sharp(inputPath).resize({ width, withoutEnlargement: true });

  const webpPath = path.join(outDir, `${base}.webp`);
  const jpegPath = path.join(outDir, `${base}.jpg`);
  await pipeline.clone().webp(WEBP).toFile(webpPath);
  await pipeline.clone().flatten({ background: '#12141a' }).jpeg(JPEG).toFile(jpegPath);

  const before = (await stat(inputPath)).size;
  const w = (await stat(webpPath)).size;
  const j = (await stat(jpegPath)).size;
  console.log(`  ${base.padEnd(16)} ${kb(before).padStart(8)}  ->  webp ${kb(w).padStart(7)} | jpg ${kb(j).padStart(7)}`);
  return before - w;
}

async function run() {
  let saved = 0;

  console.log('\nPortretten');
  for (const { file, width } of PORTRAITS) {
    saved += await emit(path.join(SRC, file), OUT, path.parse(file).name, width);
  }

  console.log('\nProjecten');
  const projectDir = path.join(SRC, 'projects');
  for (const file of (await readdir(projectDir)).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
    saved += await emit(path.join(projectDir, file), path.join(OUT, 'projects'), path.parse(file).name, PROJECT_WIDTH);
  }

  // Linkpreview-kaart: 1200x630 is wat WhatsApp, LinkedIn en Slack verwachten.
  // Los bestand, want de hero is vierkant en zou bijgesneden worden tot een hoofd.
  console.log('\nLinkpreview');
  await sharp(path.join(SRC, 'me_header.png'))
    .resize(1200, 630, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, 'og-image.jpg'));
  console.log(`  og-image.jpg     ${kb((await stat(path.join(OUT, 'og-image.jpg'))).size)}`);

  // Favicon: wordt op 40px getoond, 256px is genoeg voor elk scherm.
  await sharp(path.join(OUT, 'logo.png')).resize({ width: 256 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'logo-256.png'));

  console.log(`\nBespaard: ~${kb(saved)} aan te downloaden bytes.\n`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
