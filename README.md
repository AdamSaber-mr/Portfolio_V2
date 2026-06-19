# Portfolio V2 — Adam Saber

React + TypeScript + Vite implementation of the portfolio design imported from
Claude Design (project "Portfolio website review").

## Features

- **Four views** — Home, Work (Projecten), About (Over mij), Contact — switched
  client-side without a router.
- **Dark / light theme** toggle (CSS custom properties on `.root`).
- **NL / EN** language toggle.
- **Interactive 3D gem** on the home hero — a faceted three.js icosahedron that
  idly spins and can be dragged to rotate.
- **Project filtering** on the Work page (All / Front-end / Full-stack / Data).
- **Animated journey timeline** (SVG gradient wave) and skills chips with
  Simple Icons on the About page.
- **Contact form** that composes a `mailto:` link.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Structure

```
src/
  main.tsx            # entry
  App.tsx             # state (page, theme, lang, filter) + view switch
  styles.css          # theme variables, animations, responsive rules
  data/content.ts     # translations, projects, tech colors/icons
  components/
    Nav.tsx           # sticky top nav
    Gem3D.tsx         # three.js hero gem
    ProjectCard.tsx   # work card (Home + Work)
    FooterCTA.tsx     # shared call-to-action footer
    Icons.tsx         # inline SVG icons
  pages/
    Home.tsx  Work.tsx  About.tsx  Contact.tsx
```
