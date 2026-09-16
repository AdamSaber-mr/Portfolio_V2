import type { Page } from '../App';

interface Props {
  page: Page;
}

/**
 * Decoratieve aurora-achtergrond.
 *
 * Bewust puur CSS: vier zachte radial-gradient vlekken die alleen via `transform`
 * bewegen, wat de compositor afhandelt zonder de main thread of een per-pixel
 * shader. De vorige versie was een three.js fragment-shader die per pixel per
 * frame ~30 noise-berekeningen deed — fullscreen goed voor honderden miljoenen
 * berekeningen per frame, en de belangrijkste oorzaak van de haperende eerste load.
 *
 * De kleuren komen uit de thema-tokens via `.root[data-theme]`, dus dark/light
 * werkt zonder JavaScript. `data-page` schuift het hele veld een stukje op, zodat
 * elke pagina zijn eigen plek in de aurora houdt.
 */
export default function AuroraBackground({ page }: Props) {
  return (
    <div id="bgfx" data-page={page} aria-hidden="true">
      <span className="bgfx-blob bgfx-b1" />
      <span className="bgfx-blob bgfx-b2" />
      <span className="bgfx-blob bgfx-b3" />
      <span className="bgfx-blob bgfx-b4" />
    </div>
  );
}
