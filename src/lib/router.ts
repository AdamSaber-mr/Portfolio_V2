import { useSyncExternalStore } from 'react';
import { PROJECTS, type Cat } from '../data';
import { pathFor } from './seo';

/**
 * Minimale router op history.pushState.
 *
 * Bewust met de hand geschreven in plaats van react-router: dit portfolio heeft
 * 4 pagina's en 8 projecten, dus 13 URL's en vier routevormen. Daar is ~11 KB aan
 * routerbibliotheek niet voor nodig, en de build genereert voor elk van die URL's
 * een echt HTML-bestand — de client hoeft dus alleen nog de navigatie binnen de
 * pagina af te handelen.
 *
 * GitHub Pages redirect `/work` naar `/work/`, dus alle URL's krijgen hier een
 * afsluitende slash. Doen we dat niet, dan kost elke interne link een redirect.
 *
 * De werkpagina draagt zijn categoriefilter in de query (`/work/?cat=data`), zodat
 * een gefilterde weergave deelbaar is en de terugknop binnen de pagina werkt.
 * Bewust in de query en niet in het pad: `pathFor()` bepaalt welke statische
 * bestanden de build genereert, en een filter mag daar geen route bij verzinnen.
 */

export type TopPage = 'home' | 'work' | 'about' | 'contact';

export type Route =
  | { kind: 'home' | 'about' | 'contact' }
  | { kind: 'work'; cat?: Cat }
  | { kind: 'project'; slug: string }
  | { kind: 'notfound' };

/** Vite's base, bv. `/Portfolio_V2/` — altijd met slash aan begin en eind. */
const BASE = import.meta.env.BASE_URL;

const TOP_PAGES: TopPage[] = ['home', 'work', 'about', 'contact'];
const CATS: Cat[] = ['front', 'full', 'data'];

/** Zet een pathname (+ query) om naar een route. Onbekende paden worden `notfound`. */
export function parse(pathname: string, search = ''): Route {
  let rest = pathname;
  if (rest.startsWith(BASE)) rest = rest.slice(BASE.length);
  rest = rest.replace(/^\/+/, '').replace(/\/+$/, '');

  if (rest === '') return { kind: 'home' };

  const parts = rest.split('/');
  if (parts.length === 1) {
    const page = TOP_PAGES.find((p) => p === parts[0] && p !== 'home');
    if (!page) return { kind: 'notfound' };
    if (page === 'work') {
      const raw = new URLSearchParams(search).get('cat');
      const cat = CATS.find((c) => c === raw);
      return cat ? { kind: 'work', cat } : { kind: 'work' };
    }
    return { kind: page };
  }
  if (parts.length === 2 && parts[0] === 'work') {
    const project = PROJECTS.find((p) => p.slug === parts[1]);
    return project ? { kind: 'project', slug: project.slug } : { kind: 'notfound' };
  }
  return { kind: 'notfound' };
}

/** De URL voor een route, inclusief base, afsluitende slash en eventueel filter. */
export function href(route: Route): string {
  const base = BASE + pathFor(route);
  return route.kind === 'work' && route.cat ? `${base}?cat=${route.cat}` : base;
}

const listeners = new Set<() => void>();
function emit() { for (const l of listeners) l(); }

/** Het deel van de URL waar de router op reageert: pad plus query. */
function currentUrl(): string {
  return window.location.pathname + window.location.search;
}

/** Navigeer binnen de pagina; laat de browser zijn eigen geschiedenis bijhouden. */
export function navigate(route: Route, opts: { replace?: boolean } = {}) {
  const url = href(route);
  if (url === currentUrl()) return;
  if (opts.replace) window.history.replaceState(null, '', url);
  else window.history.pushState(null, '', url);
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener('popstate', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('popstate', cb);
  };
}

// De snapshot moet referentieel stabiel zijn, anders blijft useSyncExternalStore
// hertekenen. Cachen gebeurt op pad plus query — alleen op het pad cachen zou
// betekenen dat een filterwissel geen hertekening oplevert.
let cachedUrl = '';
let cachedRoute: Route = { kind: 'home' };
function getSnapshot(): Route {
  const url = currentUrl();
  if (url !== cachedUrl) {
    cachedUrl = url;
    cachedRoute = parse(window.location.pathname, window.location.search);
  }
  return cachedRoute;
}

/** De huidige route; re-rendert bij pushState, popstate en de terugknop. */
export function useRoute(): Route {
  return useSyncExternalStore(subscribe, getSnapshot, () => ({ kind: 'home' }) as Route);
}

/** De bovenliggende pagina van een route — gebruikt voor de nav en de dateline. */
export function topPageOf(route: Route): TopPage {
  if (route.kind === 'project') return 'work';
  if (route.kind === 'notfound') return 'home';
  return route.kind;
}
