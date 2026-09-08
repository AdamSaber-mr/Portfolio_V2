# Adam Saber — Portfolio

Personal portfolio of **Adam Saber**, an 18-year-old full-stack developer and Software Development student in Rotterdam. Projects, skills and a way to get in touch — built from interface to database.

🔗 **Live:** https://adamsaber-mr.github.io/Portfolio_V2/

---

## ✨ Features

- **Real URLs** — every page and every project has its own address (`/work/sentinel-ai/`), so links are shareable, the back button works, and each URL gets its own `<title>`, description and social preview.
- **Statically generated** — the build writes a real HTML file per route, so crawlers and link-preview bots (WhatsApp, LinkedIn, Slack) see full metadata without running JavaScript.
- **Bilingual** — instant Dutch ↔ English toggle across the whole site, remembered between visits.
- **Light & dark theme** — one-click toggle, applied before first paint so there is no flash.
- **Animated background** — a CSS aurora of drifting gradient fields, composited on the GPU.
- **Accessible** — real links and buttons, landmarks, a skip link, `aria-current`, form validation with live regions, visible focus rings and full `prefers-reduced-motion` support.
- **Responsive** — tuned for phone, tablet and desktop with no horizontal overflow.
- **SEO & AIO ready** — Open Graph, Twitter cards, JSON-LD (including per-project `CreativeWork` and breadcrumbs), plus a generated `sitemap.xml` and `llms.txt`.

## 🛠️ Tech stack

| Area        | Tools                                          |
| ----------- | ---------------------------------------------- |
| Framework   | React 18 + TypeScript                          |
| Build       | Vite 5, with a custom static-route plugin      |
| Routing     | Hand-rolled, on `history.pushState`            |
| Styling     | Hand-rolled CSS variables + inline styles      |
| Images      | `sharp` script → WebP with JPEG fallback       |
| Testing     | Playwright smoke tests                         |
| Fonts       | Space Grotesk, Hanken Grotesk, JetBrains Mono  |
| Hosting     | GitHub Pages (via GitHub Actions)              |

## 🚀 Getting started

Requires **Node 18+**.

```bash
npm install        # install dependencies
npm run dev        # start the dev server (Vite, with HMR)
npm run build      # type-check + build, and generate every route as static HTML
npm run preview    # preview the production build — the only accurate way to test routes
npm test           # Playwright smoke tests against the built site
npm run images     # regenerate optimised images from assets-src/
npm run check-links # verify every repo and live URL in PROJECTS still resolves
```

> Note: `base` is `/Portfolio_V2/` in `vite.config.ts`, so the dev server runs at
> `http://localhost:5173/Portfolio_V2/`.

## 📁 Project structure

```
assets-src/          original full-size images — NOT deployed, kept to re-run `npm run images`
  projects/          project screenshots at full resolution
public/
  assets/            generated .webp/.jpg, the logo, og-image and the CV
  theme.js           applies the saved theme before first paint (CSP-safe, so not inline)
  robots.txt         crawl rules + sitemap pointer
  _headers           security headers (Netlify / Cloudflare Pages)
scripts/
  optimize-images.mjs  resize + convert assets-src/ into public/assets/
  check-links.mjs      verify every project URL still resolves
src/
  components/        Nav, Home, Work, WorkList, ProjectDetail, About, Contact,
                     NowPlaying, FooterCTA, TechChips, Img, AuroraBackground,
                     ErrorBoundary, NotFound
  hooks/
    useReveal.ts     scroll-reveal via IntersectionObserver (after paint, never blocking)
    useHead.ts       keeps title/meta in sync during client-side navigation
  lib/
    router.ts        parse / href / navigate / useRoute on history.pushState
    seo.ts           one source of truth for route paths and their head tags
    sx.ts            parse inline CSS strings into React style objects
    asset.ts         resolve public asset paths against the base URL
  data.ts            all copy (NL/EN), projects, skills and the journey timeline
  App.tsx            state (theme, language, form) + layout
  styles.css         theme tokens, keyframes, responsive rules
tests/routes.spec.ts Playwright smoke tests over every generated route
```

### Why a hand-rolled router

There are 4 pages and 8 projects — 13 URLs across four route shapes. A routing
library would add ~11 KB gzip to solve what `history.pushState` plus a `popstate`
listener solves in about 100 lines, and the build already emits real HTML for
every route, so the client only handles in-page navigation.

### Why inline styles (`sx`)

Component styling lives in inline style strings parsed by `src/lib/sx.ts`; anything
needing `:hover`, media queries or pseudo-elements lives in `styles.css`. It is a
deliberate trade-off — no build step, no dependency — and the split is the rule:
**states and breakpoints go in the stylesheet, everything else stays inline.**

### Adding a project

Drop the screenshot in `assets-src/projects/`, run `npm run images`, then add an
entry to `PROJECTS` in `src/data.ts` — see `.claude/skills/add-project/SKILL.md`.
`sitemap.xml` and `llms.txt` are generated from `PROJECTS` at build time, so they
never need editing by hand.

## 🌐 Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push
to `main`. `ci.yml` runs the same build on pull requests, and `links.yml` checks
every project URL weekly.

One-time setup: **Settings → Pages → Build and deployment → Source = GitHub Actions.**

Using a **custom domain** or the repo root instead? Update in two places:
1. `base` in `vite.config.ts` (e.g. `/` for a root/custom domain).
2. `SITE_URL` in `src/lib/seo.ts` — canonical, Open Graph, JSON-LD, `sitemap.xml`
   and `llms.txt` all derive from it. Also update `public/robots.txt`.

## 🔒 Security

- Strict **Content-Security-Policy** (meta tag for GitHub Pages, plus full headers in `public/_headers`).
- `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and HSTS
  for hosts that support custom headers.
- External links use `rel="noopener noreferrer"`.
- No `dangerouslySetInnerHTML`; React escapes all rendered data.

## 📫 Contact

- **Email:** mt.adamsaber@gmail.com
- **GitHub:** [@adamsaber-mr](https://github.com/adamsaber-mr)
- **Location:** Rotterdam, Netherlands

---

© Adam Saber. All rights reserved.
