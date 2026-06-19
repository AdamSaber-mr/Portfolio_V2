# Adam Saber — Portfolio

Personal portfolio of **Adam Saber**, an 18-year-old full-stack developer and Software Development student in Rotterdam. A single-page site that showcases projects, skills and a way to get in touch — built from interface to database.

🔗 **Live:** https://adamsaber-mr.github.io/Portfolio_V2/

---

## ✨ Features

- **Four views** — Home, Work, About and Contact, switched client-side with smooth page transitions.
- **Bilingual** — instant Dutch ↔ English toggle across the whole site.
- **Light & dark theme** — one-click toggle, persisted in the UI.
- **Animated WebGL background** — a three.js "aurora" shader that shifts hue per page (fails soft when WebGL is unavailable).
- **3D project carousel** — depth-scaled cards on the Work page, plus a masonry gallery on Home.
- **Motion** — scroll-reveal with stagger, animated journey timeline, colour-coded tech chips.
- **Accessible** — keyboard-operable controls, visible focus rings, semantic contact form, and full `prefers-reduced-motion` support.
- **Responsive** — tuned for phone, tablet and desktop with no horizontal overflow.
- **SEO & AIO ready** — Open Graph, Twitter cards, JSON-LD structured data, `sitemap.xml`, `robots.txt` and `llms.txt`.

## 🛠️ Tech stack

| Area        | Tools                                  |
| ----------- | -------------------------------------- |
| Framework   | React 18 + TypeScript                  |
| Build       | Vite 5                                 |
| 3D / motion | three.js (lazy-loaded chunk)           |
| Styling     | Hand-rolled CSS variables + inline styles |
| Fonts       | Space Grotesk, Hanken Grotesk, JetBrains Mono |
| Hosting     | GitHub Pages (via GitHub Actions)      |

## 🚀 Getting started

Requires **Node 18+**.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (Vite, with HMR)
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build locally
```

> Note: `base` is set to `/Portfolio_V2/` in `vite.config.ts`, so the dev server runs at
> `http://localhost:5173/Portfolio_V2/`.

## 📁 Project structure

```
public/
  assets/            logo, portraits and project screenshots
  robots.txt         crawl rules + sitemap pointer
  sitemap.xml        single-page sitemap
  llms.txt           plain-text summary for AI / answer engines
  _headers           security headers (Netlify / Cloudflare Pages)
src/
  components/        Nav, Home, Work, About, Contact, FooterCTA, TechChips, AuroraBackground
  hooks/useReveal.ts scroll-reveal via IntersectionObserver
  lib/
    sx.ts            parse inline CSS strings into React style objects
    a11y.ts          make non-button elements keyboard-operable
    asset.ts         resolve public asset paths against the base URL
  data.ts            all copy (NL/EN), projects, skills and the journey timeline
  App.tsx            state (page, theme, language, form) + layout
  styles.css         theme tokens, keyframes, responsive rules
```

## 🌐 Deployment

The repo ships a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and
publishes to GitHub Pages on every push to `main`.

One-time setup: **Settings → Pages → Build and deployment → Source = GitHub Actions.**

Using a **custom domain** or the repo root instead? Update in two places:
1. `base` in `vite.config.ts` (e.g. `/` for a root/custom domain).
2. The absolute URLs in `index.html` (canonical, Open Graph, JSON-LD), `public/sitemap.xml`,
   `public/robots.txt` and `public/llms.txt`.

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
