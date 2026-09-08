import { PROJECTS } from '../data';

/**
 * Eén bron voor route-paden en hun head-tags.
 *
 * Zowel de client-router als de build-plugin die de statische HTML-bestanden
 * genereert gebruiken dit bestand, zodat een URL en zijn `<title>` nooit uit
 * elkaar kunnen lopen. Bewust vrij van `import.meta.env`, want de plugin draait
 * in Node en heeft Vite's env dan nog niet.
 */

export const SITE_URL = 'https://adamsaber-mr.github.io/Portfolio_V2/';

export type RouteKind = 'home' | 'work' | 'about' | 'contact' | 'notfound';

export interface RouteRef {
  kind: RouteKind | 'project';
  slug?: string;
}

export interface RouteMeta {
  title: string;
  description: string;
}

/** Pad zonder base, altijd met afsluitende slash. Home is de lege string. */
export function pathFor(route: RouteRef): string {
  if (route.kind === 'home') return '';
  if (route.kind === 'project') return `work/${route.slug}/`;
  return `${route.kind}/`;
}

const STATIC_META: Record<RouteKind, RouteMeta> = {
  home: {
    title: 'Adam Saber — Full-stack Developer & Software Development Student',
    description:
      'Portfolio van Adam Saber — 18-jarige full-stack developer uit Rotterdam. Ik bouw digitale producten van interface tot database met React, TypeScript, PHP & MySQL.',
  },
  work: {
    title: 'Werk — Adam Saber',
    description:
      'Een selectie van wat Adam Saber heeft gebouwd: van klantopdrachten tot eigen experimenten, met React, TypeScript, Laravel, PHP en Python.',
  },
  about: {
    title: 'Over mij — Adam Saber',
    description:
      'Adam Saber, 18 jaar, tweedejaars Software Development aan het Grafisch Lyceum Rotterdam. Zijn ontwikkelingsreis, ervaring, opleiding en vaardigheden.',
  },
  contact: {
    title: 'Contact — Adam Saber',
    description:
      'Neem contact op met Adam Saber over een stageplek of samenwerking. Full-stack developer uit Rotterdam, open voor stage.',
  },
  notfound: {
    title: 'Pagina niet gevonden — Adam Saber',
    description: 'Deze pagina bestaat niet (meer).',
  },
};

export function metaFor(route: RouteRef): RouteMeta {
  if (route.kind === 'project') {
    const p = PROJECTS.find((x) => x.slug === route.slug);
    if (!p) return STATIC_META.notfound;
    return {
      title: `${p.name} — Adam Saber`,
      description: `${p.blurb.nl} Gebouwd met ${p.stack.split('·').map((t) => t.trim()).join(', ')}.`,
    };
  }
  return STATIC_META[route.kind];
}

/** Elke route die de build als eigen HTML-bestand moet opleveren. */
export function allRouteRefs(): RouteRef[] {
  return [
    { kind: 'home' },
    { kind: 'work' },
    { kind: 'about' },
    { kind: 'contact' },
    ...PROJECTS.map((p) => ({ kind: 'project' as const, slug: p.slug })),
  ];
}
