import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PROJECTS } from './src/data';
import { allRouteRefs, metaFor, pathFor, SITE_URL, type RouteRef } from './src/lib/seo';

const BASE = '/Portfolio_V2/';
const OUT = 'dist';

const escape = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Vervang de `content` van een meta-tag, ongeacht de attribuutvolgorde. */
function setMeta(html: string, attr: 'name' | 'property', key: string, value: string): string {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  return html.replace(re, `$1${escape(value)}$2`);
}

/** Extra structured data per project — laat een projectpagina als eigen werk zien. */
function projectJsonLd(slug: string): string {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return '';
  const url = `${SITE_URL}work/${p.slug}/`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#project`,
        name: p.name,
        url,
        description: p.blurb.nl,
        dateCreated: p.year,
        image: `${SITE_URL}assets/projects/${p.image.split('/').pop()}.jpg`,
        keywords: p.stack.split('·').map((t) => t.trim()),
        author: { '@id': `${SITE_URL}#adam` },
        ...(p.repo ? { codeRepository: p.repo } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Werk', item: `${SITE_URL}work/` },
          { '@type': 'ListItem', position: 3, name: p.name, item: url },
        ],
      },
    ],
  };
  return `\n    <script type="application/ld+json">\n${JSON.stringify(graph, null, 2)}\n    </script>`;
}

function htmlForRoute(shell: string, route: RouteRef): string {
  const { title, description } = metaFor(route);
  const url = SITE_URL + pathFor(route);

  let html = shell;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`);
  html = html.replace(
    /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
    `$1${escape(description)}$2`,
  );
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', description);

  if (route.kind === 'project' && route.slug) {
    html = html.replace('</head>', `${projectJsonLd(route.slug)}\n  </head>`);
  }
  return html;
}

function sitemap(): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls = allRouteRefs()
    .map((r) => {
      const loc = SITE_URL + pathFor(r);
      const priority = r.kind === 'home' ? '1.0' : r.kind === 'project' ? '0.7' : '0.8';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** llms.txt wordt gegenereerd, zodat hij niet meer kan verouderen zoals eerder. */
function llmsTxt(): string {
  const projects = PROJECTS.map(
    (p) => `- ${p.name} (${p.year}) — ${p.blurb.en} Stack: ${p.stack.split('·').map((t) => t.trim()).join(', ')}. ${SITE_URL}work/${p.slug}/`,
  ).join('\n');

  return `# Adam Saber — Portfolio

> Adam Saber is an 18-year-old full-stack developer and Software Development student in Rotterdam, the Netherlands. He builds digital products end to end — from interface to database.

## About
- Name: Adam Saber
- Role: Full-stack developer & Software Development student (2nd year, Grafisch Lyceum Rotterdam)
- Location: Rotterdam, Netherlands
- Focus: Front-end (React, TypeScript) and back-end (PHP, Laravel, MySQL, Python)
- Languages: Dutch, English, Arabic
- Status: open to internships (stage)

## Pages
- Home: ${SITE_URL}
- Work: ${SITE_URL}work/
- About: ${SITE_URL}about/
- Contact: ${SITE_URL}contact/

## Projects
${projects}

## Contact
- Email: mt.adamsaber@gmail.com
- GitHub: https://github.com/adamsaber-mr
- LinkedIn: https://www.linkedin.com/in/adam-saber-a47586365/
- Website: ${SITE_URL}
`;
}

/**
 * Genereert voor elke route een echt HTML-bestand met eigen head-tags.
 *
 * Waarom niet de gebruikelijke 404.html-redirecttruc voor SPA's op GitHub Pages:
 * die serveert elke diepe link eerst met een HTTP 404-status, en scrapers die geen
 * JavaScript draaien — WhatsApp, LinkedIn, Slack — zien dan helemaal geen preview.
 * Juist die route is hoe een stagetip wordt doorgestuurd. Met 13 URL's is echte
 * HTML genereren goedkoper én correcter.
 */
function staticRoutes(): Plugin {
  return {
    name: 'portfolio-static-routes',
    apply: 'build',
    async closeBundle() {
      const root = process.cwd();
      const dist = path.join(root, OUT);
      const shell = await readFile(path.join(dist, 'index.html'), 'utf8');

      let count = 0;
      for (const route of allRouteRefs()) {
        const rel = pathFor(route);
        if (rel === '') continue; // dist/index.html staat er al
        const dir = path.join(dist, rel);
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, 'index.html'), htmlForRoute(shell, route), 'utf8');
        count++;
      }

      // De echte 404 van GitHub Pages — een gewone pagina, geen redirect.
      await writeFile(path.join(dist, '404.html'), htmlForRoute(shell, { kind: 'notfound' }), 'utf8');
      await writeFile(path.join(dist, 'sitemap.xml'), sitemap(), 'utf8');
      await writeFile(path.join(dist, 'llms.txt'), llmsTxt(), 'utf8');

      console.log(`\n  ${count + 1} routes als statische HTML gegenereerd, plus sitemap.xml en llms.txt.`);
    },
  };
}

// https://vitejs.dev/config/
// `base` matches the GitHub Pages project path so assets resolve under /Portfolio_V2/.
// Disabling the modulepreload polyfill avoids an inline <script>, which keeps the
// strict Content-Security-Policy (script-src 'self') working without 'unsafe-inline'.
export default defineConfig({
  base: BASE,
  plugins: [react(), staticRoutes()],
  build: {
    modulePreload: { polyfill: false },
  },
});
