---
name: add-project
description: Voeg een nieuw project toe aan het portfolio (PROJECTS in src/data.ts) in dezelfde stijl als de bestaande projecten, inclusief chip-kleuren en eventuele nieuwe skills op de over-mij pagina. Gebruik deze skill wanneer Adam een nieuw project wil toevoegen en er projectinfo (pitch, tech stack, links, hoogtepunten) wordt aangeleverd.
---

# Nieuw project toevoegen

Alle projectdata staat in `src/data.ts` in de `PROJECTS`-array (interface `Project`). De site is tweetalig: **elk vrij tekstveld moet in NL én EN** worden geschreven.

## Stappen

### 1. Afbeelding

- De cover hoort in `public/assets/projects/` (Adam levert deze meestal al aan; vraag anders om de bestandsnaam).
- Bekijk de afbeelding (Read) om de focal point te bepalen en de dimensies op te vragen (`sips -g pixelWidth -g pixelHeight <pad>`).

### 2. Entry toevoegen aan `PROJECTS`

Schrijf één object in exact dezelfde stijl als de bestaande entries (compacte one-liners voor de korte velden, `overview` en `features` als geneste blokken):

| Veld | Hoe invullen |
|---|---|
| `name` | Projectnaam zonder ondertitel |
| `cat` | `'front'`, `'full'` of `'data'` |
| `ratio` | Kies uit de gebruikte set `'16/10'`, `'4/3'`, `'1/1'`, `'3/4'` — passend bij de afbeelding (dashboards/screenshots breed → `'16/10'`) |
| `color` | Donkere tint die bij de afbeelding past (schemert door tijdens laden), bv. `'#26243a'` |
| `image` | `/assets/projects/<bestand>` |
| `imgPos` | CSS object-position op het focal point van de screenshot (`'center top'`, `'left top'`, …) |
| `stack` | Máx. 3–4 tokens gescheiden door ` · `, bv. `'React · Laravel · SQLite'` — tokens moeten in de `TC`/`SLUG`-maps staan (zie stap 3) |
| `blurb` | Eén pakkende zin per taal (kaart-tekst) |
| `year` | Bouwjaar |
| `repo` / `live` | GitHub- en live-URL (lege string verbergt de knop) |
| `role` | Bv. `{ nl: 'Full-stack ontwikkelaar', en: 'Full-stack developer' }` |
| `overview` | 3–5 zinnen per taal: wat het is, hoe het technisch werkt, wat het bijzonder maakt |
| `features` | 4–5 concrete highlights per taal, technisch en specifiek (cijfers noemen mag) |

**Positie in de array bepaalt zichtbaarheid**: de home-pagina toont `PROJECTS.slice(0, 3)` als "Geselecteerd werk". Alleen bij de projectenpagina tonen → invoegen op **index 3 of later** (meestal direct na de eerste drie, grofweg op jaartal). Wél als geselecteerd werk → in de top 3 zetten.

### 3. Chip-kleuren voor nieuwe tech

Elke token in `stack` (en in skills-groepen) heeft entries nodig in twee maps in `src/data.ts`:

- `TC`: merk-kleur als hex, bv. `SQLite: '#0f80cc'`
- `SLUG`: simple-icons slug (check https://simpleicons.org), bv. `SQLite: 'sqlite'` — weglaten als er geen icoon bestaat (chip valt dan terug op alleen tekst)

### 4. Skills op de over-mij pagina bijwerken

Gebruikt het project technieken die nog niet in `buildSkills()` staan? Voeg ze toe aan de passende groep (`Front-end`, `Back-end`, `Data & AI`) en werk de `note` van die groep bij zodat het nieuwe project genoemd wordt. Alleen noemenswaardige technieken (frameworks, databases, talen) — geen micro-libraries.

Check ook of andere plekken verouderd raken: `buildCurrently()` ("Aan het leren") en `buildJourney()` in `src/data.ts`.

### 5. Verifiëren

- `npm run build` moet slagen (type-check + build).
- Optioneel: `npm run dev` en de projectenpagina + detailpagina bekijken.

### 6. Committen

Volg de git-regels uit CLAUDE.md: kleine losse commits, **nooit** een AI/Claude co-author regel. Typisch:

1. `feat: add <naam> project to work` (data + afbeelding)
2. `feat: add <tech> skills to the about page` (alleen als skills zijn aangepast)
