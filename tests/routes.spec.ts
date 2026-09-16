import { test, expect } from '@playwright/test';
import { allRouteRefs, metaFor, pathFor } from '../src/lib/seo';

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

test('een projectkaart is een echte link met een deelbare URL', async ({ page }) => {
  await page.goto(BASE + 'work/');
  const card = page.locator('main a.workcard').first();
  const target = await card.getAttribute('href');
  expect(target).toMatch(/\/Portfolio_V2\/work\/[a-z0-9-]+\/$/);

  await card.click();
  await expect(page).toHaveURL(new RegExp(target!.replace(/\//g, '\/') + '$'));
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
  expect((await skip.boundingBox())!.y).toBeGreaterThanOrEqual(0);
});

test('het gekozen thema overleeft een refresh', async ({ page }) => {
  await page.goto(BASE);
  const root = page.locator('.root');

  // Welke kant het op gaat hangt af van de systeemvoorkeur van de bezoeker, dus
  // testen we dat het thema omslaat en daarna blijft staan — niet welke kleur.
  const before = await root.getAttribute('data-theme');
  await page.getByRole('button', { name: /thema wisselen|switch theme/i }).click();
  const after = await root.getAttribute('data-theme');
  expect(after).not.toBe(before);

  await page.reload();
  await expect(root).toHaveAttribute('data-theme', after!);
  // theme.js moet het al vóór de eerste paint zetten, anders zie je een flits.
  await expect(page.locator('html')).toHaveAttribute('data-theme', after!);
});

test('leeg contactformulier meldt geen succes', async ({ page }) => {
  await page.goto(BASE + 'contact/');
  await page.getByRole('button', { name: /verstuur|send/i }).click();

  // Er moet een foutmelding staan, en juist géén bevestiging.
  await expect(page.locator('#cf-name-err')).toBeVisible();
  await expect(page.getByText(/verzonden!|sent!/i)).toHaveCount(0);
});
