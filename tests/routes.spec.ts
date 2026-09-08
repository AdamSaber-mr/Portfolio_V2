import { test, expect } from '@playwright/test';
import { allRouteRefs, metaFor, pathFor } from '../src/lib/seo';
import { PROJECTS } from '../src/data';

/**
 * Bewaakt de naad tussen de gegenereerde HTML en de client-router.
 *
 * Dit is het enige echt breekbare stuk machinerie in het project: de build maakt
 * per route een statisch bestand, en de router moet datzelfde pad terug kunnen
 * lezen. Gaat één van beide schuiven, dan faalt dit meteen.
 */
const BASE = '/Portfolio_V2/';

for (const route of allRouteRefs()) {
  const path = BASE + pathFor(route);
  const label = route.kind === 'project' ? `project ${route.slug}` : route.kind;

  test(`${label} laadt met eigen titel en één h1`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    // De statische HTML draagt de juiste titel, nog voor React draait.
    await expect(page).toHaveTitle(metaFor(route).title);

    // React neemt het over en rendert precies één h1.
    await expect(page.locator('main h1')).toHaveCount(1);

    // De canonical wijst naar deze route, niet naar de homepage.
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain(pathFor(route));

    // De inhoud moet ook echt zíchtbaar zijn. Alle pagina's behalve Home worden
    // lazy geladen, en de scroll-reveal zet elementen op opacity:0 tot ze in
    // beeld komen. Ging dat mis, dan laadde de pagina wel maar zag je niets —
    // en een count-check alleen merkt dat niet op.
    // Pollen, want de reveal-transitie duurt ruim een seconde.
    await expect
      .poll(
        () =>
          page.locator('main h1').evaluate(
            (el) => Number(getComputedStyle(el.closest('[data-reveal]') ?? el).opacity),
          ),
        { timeout: 5000 },
      )
      .toBeGreaterThan(0.9);
  });
}

test('navigatie werkt en de terugknop keert terug', async ({ page }) => {
  await page.goto(BASE);
  await page.getByRole('navigation', { name: /hoofdnavigatie|main navigation/i }).first()
    .getByRole('link', { name: /projecten|work/i }).click();

  await expect(page).toHaveURL(new RegExp(`${BASE}work/$`));
  await expect(page.locator('main h1')).toHaveText(/werk|work/i);

  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${BASE}$`));
});

/**
 * De werkpagina toont projecten in twee vormen: de eerste drie als uitgelichte
 * plaat, de rest als indexregel. Beide moeten echte links met een deelbare URL
 * zijn — dat is de hele reden dat er routing onder ligt.
 */
for (const [vorm, selector] of [
  ['uitgelicht project', 'main a.feature-plate'],
  ['indexregel', 'main a.idx-row'],
] as const) {
  test(`${vorm} is een echte link met een deelbare URL`, async ({ page }) => {
    await page.goto(BASE + 'work/');
    const link = page.locator(selector).first();
    const target = await link.getAttribute('href');
    expect(target).toMatch(/\/Portfolio_V2\/work\/[a-z0-9-]+\/$/);

    await link.click();
    await expect(page).toHaveURL(new RegExp(target!.replace(/\//g, '\/') + '$'));
  });
}

test('het categoriefilter zit in de URL en werkt met de terugknop', async ({ page }) => {
  await page.goto(BASE + 'work/');
  const rows = () => page.locator('main .feature-name, main .idx-name');
  const alle = await rows().count();
  expect(alle).toBe(8);

  // filter aanzetten -> URL verandert mee
  await page.getByRole('button', { name: /^data \(/i }).click();
  await expect.poll(() => new URL(page.url()).pathname + new URL(page.url()).search)
    .toBe(BASE + 'work/?cat=data');
  const gefilterd = await rows().count();
  expect(gefilterd).toBeGreaterThan(0);
  expect(gefilterd).toBeLessThan(alle);

  // terugknop keert terug naar de ongefilterde lijst
  await page.goBack();
  await expect.poll(() => new URL(page.url()).pathname + new URL(page.url()).search)
    .toBe(BASE + 'work/');
  await expect.poll(() => rows().count()).toBe(alle);
});

/**
 * Het nummer van een project moet overal hetzelfde zijn: in de index, in het
 * uitgelichte blok en in de dateline. Dit is twee keer misgegaan — eerst toonde
 * de homepage een hardcoded "01" naast een dateline die 04 zei, daarna gaf een
 * gefilterde weergave hetzelfde project een ander nummer omdat er op de positie
 * in de zichtbare lijst geteld werd.
 */
test('elk project heeft overal hetzelfde nummer', async ({ page }) => {
  // Acht navigaties achter elkaar; onder parallelle belasting haalt dat de
  // standaardtimeout niet altijd.
  test.setTimeout(90_000);
  await page.goto(BASE + 'work/');

  // naam -> nummer, zoals de werkpagina ze toont (uitgelicht plus index)
  const opDeWerkpagina = await page.evaluate(() => {
    const uit = new Map<string, string>();
    document.querySelectorAll('main .feature').forEach((el) => {
      const n = el.querySelector('.feature-num')?.textContent?.trim();
      const naam = el.querySelector('.feature-name')?.textContent?.trim();
      if (n && naam) uit.set(naam, n);
    });
    document.querySelectorAll('main .idx-row').forEach((el) => {
      const n = el.querySelector('.idx-num')?.textContent?.trim();
      const naam = el.querySelector('.idx-name')?.textContent?.trim();
      if (n && naam) uit.set(naam, n);
    });
    return Array.from(uit.entries());
  });
  expect(opDeWerkpagina.length).toBe(8);

  // en datzelfde nummer moet in de dateline van de projectpagina staan
  for (const [naam, nummer] of opDeWerkpagina) {
    const project = PROJECTS.find((p) => p.name === naam);
    expect(project, `project ${naam} niet gevonden in PROJECTS`).toBeTruthy();
    await page.goto(BASE + 'work/' + project!.slug + '/');
    const dateline = (await page.locator('.dateline-where').textContent())?.trim() ?? '';
    expect(dateline, `dateline van ${naam}`).toContain(nummer);
  }
});

test('een gefilterde URL werkt ook bij direct openen', async ({ page }) => {
  const res = await page.goto(BASE + 'work/?cat=data');
  expect(res?.status()).toBe(200);
  await expect(page.getByRole('button', { name: /^data \(/i })).toHaveAttribute('aria-pressed', 'true');

  // de canonical wijst naar de ongefilterde pagina — anders krijg je
  // duplicate content voor elke filtercombinatie
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(canonical).toMatch(/\/work\/$/);
});

/**
 * De detailpagina moet doorbladerbaar zijn in plaats van doodlopend. Vorige en
 * volgende lopen rond, zodat er nergens een dood uiteinde zit.
 */
test('vorige en volgende lopen rond langs alle projecten', async ({ page }) => {
  const eerste = PROJECTS[0];
  const laatste = PROJECTS[PROJECTS.length - 1];

  await page.goto(BASE + 'work/' + eerste.slug + '/');
  const vorige = page.locator('.pd-nav-link').first();
  expect(await vorige.getAttribute('href')).toBe(BASE + 'work/' + laatste.slug + '/');

  // doorklikken naar het laatste project en daar weer vooruit
  await vorige.click();
  await expect.poll(() => new URL(page.url()).pathname).toBe(BASE + 'work/' + laatste.slug + '/');
  const volgende = page.locator('.pd-nav-link--next');
  expect(await volgende.getAttribute('href')).toBe(BASE + 'work/' + eerste.slug + '/');
});

test('de byline draagt rol, jaar en stack', async ({ page }) => {
  await page.goto(BASE + 'work/' + PROJECTS[0].slug + '/');
  const byline = page.locator('.pd-byline');
  await expect(byline).toBeVisible();
  // drie definitieparen, geen zwevende zijbalk meer
  await expect(byline.locator('dt')).toHaveCount(3);
  await expect(byline).toContainText(PROJECTS[0].year);
});

test('context en reflectie verschijnen alleen als ze gevuld zijn', async ({ page }) => {
  const met = PROJECTS.find((p) => p.context && p.retro)!;
  const zonder = PROJECTS.find((p) => !p.context && !p.retro)!;
  expect(met, 'geen project met context/retro').toBeTruthy();
  expect(zonder, 'geen project zonder context/retro').toBeTruthy();

  await page.goto(BASE + 'work/' + met.slug + '/');
  const kopjesMet = await page.locator('.pd-h').allTextContents();
  expect(kopjesMet.length).toBe(3);

  await page.goto(BASE + 'work/' + zonder.slug + '/');
  const kopjesZonder = await page.locator('.pd-h').allTextContents();
  // alleen "Hoogtepunten" — nooit een lege kop
  expect(kopjesZonder.length).toBe(1);
});

test('onbekende URL toont de 404-pagina', async ({ page }) => {
  await page.goto(BASE + 'bestaat-niet/');
  await expect(page.locator('main h1')).toBeVisible();
});

test('de skip-link is verborgen tot hij focus krijgt', async ({ page }) => {
  await page.goto(BASE);
  const skip = page.locator('a.skiplink');
  // Buiten beeld geduwd met een transform; pas bij focus schuift hij binnen.
  expect((await skip.boundingBox())!.y).toBeLessThan(0);
  await page.keyboard.press('Tab');
  await expect(skip).toBeFocused();
  // Pollen: hij schuift in beeld met een transitie van 0,2s.
  await expect
    .poll(async () => (await skip.boundingBox())!.y, { timeout: 2000 })
    .toBeGreaterThanOrEqual(0);
});

test('het gekozen thema overleeft een refresh', async ({ page }) => {
  await page.goto(BASE);
  const html = page.locator('html');

  // Welke kant het op gaat hangt af van de systeemvoorkeur van de bezoeker, dus
  // testen we dat het thema omslaat en daarna blijft staan — niet welke kleur.
  const before = await html.getAttribute('data-theme');
  await page.getByRole('button', { name: /thema wisselen|switch theme/i }).click();
  const after = await html.getAttribute('data-theme');
  expect(after).not.toBe(before);

  await page.reload();
  // theme.js zet dit vóór de eerste paint; staat het er na een refresh niet,
  // dan zie je een flits van het verkeerde thema.
  await expect(html).toHaveAttribute('data-theme', after!);
});

/**
 * Dit is de test die de oude bug zou hebben gevangen: theme.js schreef naar
 * <html> terwijl de CSS `.root[data-theme]` las, dus het thema veranderde wel van
 * attribuut maar niet van kleur. Deze test kijkt naar het gedrag, niet naar de
 * implementatie, en blijft dus kloppen als we later verhuizen waar het attribuut staat.
 */
for (const route of allRouteRefs()) {
  const label = route.kind === 'project' ? `project ${route.slug}` : route.kind;

  test(`${label} verandert echt van kleur bij een themawissel`, async ({ page }) => {
    await page.goto(BASE + pathFor(route));
    const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    const before = await bg();
    // geen doorzichtige grond — dan zou er helemaal niets geverfd zijn
    expect(before).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);

    await page.evaluate(() => {
      const el = document.documentElement;
      el.setAttribute('data-theme', el.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    // Pollen: html/body hebben een kleurtransitie, dus direct uitlezen geeft nog
    // de oude waarde terug.
    await expect.poll(bg, { timeout: 3000 }).not.toBe(before);
    expect(await bg()).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
  });
}

test('leeg contactformulier meldt geen succes', async ({ page }) => {
  await page.goto(BASE + 'contact/');
  await page.getByRole('button', { name: /verstuur|send/i }).click();

  // Er moet een foutmelding staan, en juist géén bevestiging.
  await expect(page.locator('#cf-name-err')).toBeVisible();
  await expect(page.getByText(/verzonden!|sent!/i)).toHaveCount(0);
});

/* ---------- Over mij ---------- */

test('over mij toont drie genummerde secties en geen lege kop', async ({ page }) => {
  await page.goto(BASE + 'about/');

  // Precies drie sectiekoppen, in volgorde genummerd. Eerder droeg deze pagina
  // drie verschillende visuele systemen; nu is het één reeks.
  const heads = page.locator('main .sec-head h2');
  await expect(heads).toHaveCount(3);
  for (const [i, text] of (await heads.allTextContents()).entries()) {
    expect(text).toContain(`§ 0${i + 1} —`);
    // "§ 01 — " is 7 tekens; daarachter hoort een echte titel te staan.
    expect(text.replace(/§ 0\d —/, '').trim().length).toBeGreaterThan(2);
  }
});

test('alleen de huidige stap in de ontwikkelingsreis is gemarkeerd', async ({ page }) => {
  await page.goto(BASE + 'about/');

  await expect(page.locator('main .jr-row')).toHaveCount(5);
  // Het rode accent is hier informatie, geen versiering: precies één rij mag het
  // dragen, en dat moet de laatste zijn.
  await expect(page.locator('main .jr-row--now')).toHaveCount(1);
  await expect(page.locator('main .jr-row').last()).toHaveClass(/jr-row--now/);
});

test('over mij haalt geen enkel beeld van buiten', async ({ page }) => {
  // De bewijstest dat de gekleurde chips en de icoonbollen echt weg zijn: die
  // haalden er zo'n dertig plaatjes bij van cdn.simpleicons.org. De letters
  // komen wel van Google Fonts — dat is een font, geen beeld, en staat in de CSP.
  const extern: string[] = [];
  page.on('request', (r) => {
    if (r.resourceType() !== 'image') return;
    if (!new URL(r.url()).host.startsWith('localhost')) extern.push(r.url());
  });

  await page.goto(BASE + 'about/');
  await page.locator('main .sk-row').last().scrollIntoViewIfNeeded();
  await expect(page.locator('main .sk-row')).toHaveCount(5);

  expect(extern).toEqual([]);
});

test('over mij verwijst door naar het werk', async ({ page }) => {
  await page.goto(BASE + 'about/');

  const link = page.locator('main a.rule-link--accent').last();
  await expect(link).toHaveAttribute('href', BASE + 'work/');
  await link.click();
  await expect.poll(() => new URL(page.url()).pathname).toBe(BASE + 'work/');
});
