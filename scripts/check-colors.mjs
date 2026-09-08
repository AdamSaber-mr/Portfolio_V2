/**
 * Bewaakt het kleurcontract uit `src/styles.css`.
 *
 * De vorige versie van dit portfolio had twee paletten: een pagina-palet dat met
 * het thema meedraaide en een kaart-palet dat dat niet deed. Daardoor was light
 * mode in de praktijk dark mode met een lichte rand eromheen. Elk van de vier
 * checks hieronder vangt één manier waarop dat opnieuw kan ontstaan.
 *
 * Draait als `npm run check-colors` en in CI.
 */
import { readFile } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CSS = path.join(ROOT, 'src', 'styles.css');

const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\bcolor-mix\(/;

/** Tokens die per thema een echte kleur dragen. Aliassen en niet-kleur horen hier niet. */
const PALETTE = [
  'paper', 'paper-raised', 'paper-well', 'mat',
  'ink', 'ink-2', 'ink-3',
  'rule', 'rule-strong',
  'accent', 'accent-strong', 'accent-ink', 'accent-wash',
  'nav-bg',
];

const problems = [];
const fail = (file, line, msg) => problems.push(`${file}:${line} — ${msg}`);

/** Haal één `:root`-blok op via zijn selector. */
function block(css, selector) {
  const i = css.indexOf(selector + ' {');
  if (i < 0) return null;
  const start = css.indexOf('{', i);
  const end = css.indexOf('}', start);
  return { text: css.slice(start + 1, end), start, end };
}

function tokensIn(text) {
  const out = new Map();
  for (const m of text.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    out.set(m[1], m[2].trim());
  }
  return out;
}

function hexToRgb(v) {
  const m = /^#([0-9a-f]{6})$/i.exec(v.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

async function walk(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (/\.(ts|tsx)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const css = await readFile(CSS, 'utf8');
const light = block(css, ':root');
const dark = block(css, ':root[data-theme="dark"]');

if (!light || !dark) {
  console.error('Kon de tokenblokken niet vinden in src/styles.css.');
  process.exit(1);
}

const lightTokens = tokensIn(light.text);
const darkTokens = tokensIn(dark.text);

// ---- 1. geen letterlijke kleuren buiten de tokenblokken -----------------------
// De blokken zelf overslaan; de rest van de CSS en alle componenten controleren.
const cssOutside =
  css.slice(0, light.start) + css.slice(light.end + 1, dark.start) + css.slice(dark.end + 1);
cssOutside.split('\n').forEach((line, i) => {
  // de korrel is een grijswaarde-SVG zonder kleur, en autofill heeft een tokenwaarde
  if (line.includes('feTurbulence') || line.includes('data:image/svg+xml')) return;
  if (COLOR_RE.test(line)) fail('src/styles.css', `~${i + 1}`, `letterlijke kleur: ${line.trim().slice(0, 80)}`);
});

for (const file of await walk(path.join(ROOT, 'src'))) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const text = await readFile(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    // De browserchrome-kleur moet juist letterlijk zijn: check 2 hieronder eist
    // dat hij exact gelijk is aan --paper.
    if (line.includes('theme-color') || /meta\??\.setAttribute/.test(line)) return;
    if (COLOR_RE.test(line)) fail(rel, i + 1, `letterlijke kleur: ${line.trim().slice(0, 80)}`);
  });
}

// ---- 2. theme.js en App.tsx moeten dezelfde grondkleur gebruiken --------------
const paperLight = (lightTokens.get('paper') || '').toLowerCase();
const paperDark = (darkTokens.get('paper') || '').toLowerCase();
for (const rel of ['public/theme.js', 'src/App.tsx']) {
  const text = (await readFile(path.join(ROOT, rel), 'utf8')).toLowerCase();
  if (!text.includes(paperLight)) fail(rel, '-', `gebruikt niet dezelfde grondkleur als --paper (${paperLight})`);
  if (!text.includes(paperDark)) fail(rel, '-', `gebruikt niet dezelfde donkere grondkleur als --paper (${paperDark})`);
}

// ---- 3. geen enkel themetoken mag in beide thema's (vrijwel) gelijk zijn ------
for (const name of PALETTE) {
  const a = lightTokens.get(name);
  const b = darkTokens.get(name);
  if (!a || !b) continue;
  const ra = hexToRgb(a);
  const rb = hexToRgb(b);
  if (!ra || !rb) continue;
  const delta = Math.max(...ra.map((v, i) => Math.abs(v - rb[i])));
  if (delta < 16) {
    fail('src/styles.css', '-', `--${name} is in beide thema's vrijwel dezelfde kleur (verschil ${delta}/255). Een themetoken dat niet verandert, is geen themetoken.`);
  }
}

// ---- 4. beide blokken declareren dezelfde paletsleutels -----------------------
for (const name of PALETTE) {
  if (lightTokens.has(name) && !darkTokens.has(name)) fail('src/styles.css', '-', `--${name} ontbreekt in de avondeditie`);
  if (darkTokens.has(name) && !lightTokens.has(name)) fail('src/styles.css', '-', `--${name} ontbreekt in de ochtendeditie`);
}

if (problems.length) {
  console.error(`\n${problems.length} kleurprobleem(en):\n`);
  for (const p of problems) console.error('  ' + p);
  console.error('\nKleur hoort in de twee tokenblokken in src/styles.css. Overal elders: var(--token).\n');
  process.exit(1);
}
console.log(`Kleurcontract in orde — ${PALETTE.length} tokens, beide thema's compleet en onderscheidend.`);
