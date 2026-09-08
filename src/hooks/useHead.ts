import { useEffect } from 'react';
import { metaFor, SITE_URL, pathFor } from '../lib/seo';
import type { Route } from '../lib/router';

function setMeta(selector: string, attr: 'content', value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Houdt `<title>`, description, canonical en de Open Graph-tags gelijk aan de
 * route waar je nu bent.
 *
 * De build levert elke URL al als eigen HTML-bestand mét kloppende head-tags, dus
 * dit is puur voor navigatie binnen de pagina — crawlers en linkpreviews krijgen
 * de statische versie te zien en hoeven hier niet op te wachten.
 */
export function useHead(route: Route) {
  useEffect(() => {
    const { title, description } = metaFor(route);
    const url = SITE_URL + pathFor(route);

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [route]);
}
