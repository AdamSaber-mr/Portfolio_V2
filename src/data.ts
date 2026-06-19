export type Lang = 'nl' | 'en';
export type Cat = 'front' | 'full' | 'data';

export type Strings = Record<string, string>;

export const STR: Record<Lang, Strings> = {
  nl: {
    navHome: 'Home', navWork: 'Projecten', navAbout: 'Over mij', navContact: 'Contact', cv: 'CV',
    heroL1: 'Ik bouw digitale', heroL2: 'producten van', heroL3: 'begin tot eind.',
    heroBody: 'Adam Saber, 18 jaar. Student Software Development in Rotterdam, full-stack met PHP, JavaScript & React. Van interface tot database.',
    heroCta1: 'Bekijk mijn werk', heroCta2: 'Over mij',
    selectedWork: 'Geselecteerd werk', viewAll: 'Bekijk alles',
    workTitle: 'Werk', workBody: 'Een selectie van wat ik heb gebouwd, van klantopdrachten tot eigen experimenten. Filter op type.',
    fAll: 'Alles', fFront: 'Front-end', fFull: 'Full-stack', fData: 'Data',
    aboutTitle: 'Student, bouwer, probleemoplosser.',
    aboutP1: 'Mijn naam is Adam Saber, 18 jaar, en ik studeer Software Development in mijn tweede leerjaar aan het Grafisch Lyceum Rotterdam. In het begin heb ik veel gewerkt aan front-end (HTML/CSS/JavaScript/React), en daarna ben ik mij steeds meer gaan richten op de back-end kant van webapps, zoals PHP en databases (MariaDB/SQL).',
    aboutP2: 'Ik vind het leuk om ideeën om te zetten naar werkende applicaties en daarbij logisch na te denken over structuur, data en flow. Ik bouw het liefst dingen die een echt probleem oplossen, in plaats van techniek om de techniek.',
    aboutP3: 'Naast het bouwen vind ik samenwerken en helder communiceren belangrijk: goed begrijpen wat er nodig is en het daarna strak uitwerken. Op de langere termijn wil ik die technische basis combineren met een bredere rol richting business development, waarin ik techniek, mensen en strategie samenbreng.',
    journeyTitle: 'Mijn ontwikkelingsreis',
    skillsTitle: 'Vaardigheden', skillsBody: 'Geen percentages, gewoon wat ik gebruik en waar ik het voor heb ingezet.',
    contactKicker: 'Contact', contactTitle: 'Laten we iets bouwen.',
    contactBody: 'Heb je een stageplek of wil je samenwerken? Ik hoor graag van je.',
    fName: 'Naam', fEmail: 'E-mail', fSubject: 'Onderwerp', fMsg: 'Bericht', send: 'Verstuur bericht',
    phName: 'Je naam', phEmail: 'jij@voorbeeld.nl', phSubject: 'Bijv. Stageplek front-end', phMsg: 'Vertel kort waar het over gaat…',
    formNote: 'Je mailprogramma opent met dit bericht klaar om te versturen.',
    sentTitle: 'Bericht klaar!', sentBody: 'Je mailprogramma opent met het bericht. Bedankt!',
  },
  en: {
    navHome: 'Home', navWork: 'Work', navAbout: 'About', navContact: 'Contact', cv: 'CV',
    heroL1: 'I build digital', heroL2: 'products from', heroL3: 'start to finish.',
    heroBody: 'Adam Saber, 18. Software Development student in Rotterdam, full-stack with PHP, JavaScript & React. From interface to database.',
    heroCta1: 'View my work', heroCta2: 'About me',
    selectedWork: 'Selected work', viewAll: 'View all',
    workTitle: 'Work', workBody: 'A selection of what I have built, from client work to personal experiments. Filter by type.',
    fAll: 'All', fFront: 'Front-end', fFull: 'Full-stack', fData: 'Data',
    aboutTitle: 'Student, builder, problem solver.',
    aboutP1: 'My name is Adam Saber, 18, and I am in my second year of Software Development at Grafisch Lyceum Rotterdam. I started out focused on front-end (HTML/CSS/JavaScript/React) and gradually shifted towards the back-end side of web apps, like PHP and databases (MariaDB/SQL).',
    aboutP2: 'I enjoy turning ideas into working applications and thinking logically about structure, data and flow. I prefer building things that solve a real problem, rather than technology for its own sake.',
    aboutP3: 'Beyond building, I value teamwork and clear communication: properly understanding what is needed and then executing it cleanly. In the longer term I want to combine that technical foundation with a broader role towards business development, bringing together technology, people and strategy.',
    journeyTitle: 'My development journey',
    skillsTitle: 'Skills', skillsBody: 'No percentages, just what I use and where I have applied it.',
    contactKicker: 'Contact', contactTitle: 'Let us build something.',
    contactBody: 'Got an internship opening or want to collaborate? I would love to hear from you.',
    fName: 'Name', fEmail: 'Email', fSubject: 'Subject', fMsg: 'Message', send: 'Send message',
    phName: 'Your name', phEmail: 'you@example.com', phSubject: 'e.g. Front-end internship', phMsg: 'Tell me briefly what it is about…',
    formNote: 'Your mail app opens with this message ready to send.',
    sentTitle: 'Message ready!', sentBody: 'Your mail app opens with the message. Thanks!',
  },
};

export interface Project {
  name: string;
  cat: Cat;
  ratio: string;
  color: string;
  image: string;
  /** CSS object-position for the cover crop, tuned per screenshot's focal point */
  imgPos: string;
  stack: string;
  blurb: Record<Lang, string>;
}

export const PROJECTS: Project[] = [
  { name: 'RapidCars', cat: 'front', ratio: '4/3', color: '#1b1d22', image: '/assets/projects/rapidcars.jpg', imgPos: 'left top', stack: 'React · TypeScript · Vite',
    blurb: { nl: 'Autoverhuur-webapp voor een echte klant: snel boeken, sportieve auto’s.', en: 'Car-rental web app for a real client: fast booking, sporty cars.' } },
  { name: 'Nike Business Anatomy', cat: 'data', ratio: '1/1', color: '#0e1b2b', image: '/assets/projects/nike.png', imgPos: 'left top', stack: 'React · D3 · Chart.js',
    blurb: { nl: 'Interactief dashboard over Nike’s supply chain en revenue.', en: 'Interactive dashboard on Nike’s supply chain and revenue.' } },
  { name: 'Luxora', cat: 'front', ratio: '3/4', color: '#2f3a2c', image: '/assets/projects/luxora.jpg', imgPos: 'left top', stack: 'Next.js · React · TS',
    blurb: { nl: 'Marketplace voor exclusieve luxeproducten met een volledige front-end.', en: 'Marketplace for exclusive luxury products with a full front-end.' } },
  { name: 'Yume Ramen', cat: 'full', ratio: '4/3', color: '#3a1f22', image: '/assets/projects/yume-ramen.jpg', imgPos: 'left top', stack: 'PHP · MySQL · Python',
    blurb: { nl: 'Food-delivery webapp: bestellen, afrekenen en beheer voor de keuken.', en: 'Food-delivery web app: ordering, checkout and a kitchen dashboard.' } },
  { name: 'CookUp', cat: 'full', ratio: '1/1', color: '#243027', image: '/assets/projects/cookup.jpg', imgPos: 'center top', stack: 'PHP · MySQL · CRUD',
    blurb: { nl: 'Receptenplatform met accounts, opslaan en categorieën.', en: 'Recipe platform with accounts, saving and categories.' } },
  { name: 'Portfolio v1', cat: 'front', ratio: '3/4', color: '#26222c', image: '/assets/projects/portfolio.jpg', imgPos: 'center top', stack: 'HTML · CSS · JS',
    blurb: { nl: 'Mijn eerste portfolio, waar het bouwen begon.', en: 'My first portfolio, where the building began.' } },
];

/** A filter is "all" plus any project category. */
export type Filter = 'all' | Cat;

export interface LocProject {
  name: string; ratio: string; color: string; image: string; imgPos: string; stack: string;
  blurb: string; cat: Cat;
}

export function loc(p: Project, lang: Lang): LocProject {
  return { name: p.name, ratio: p.ratio, color: p.color, image: p.image, imgPos: p.imgPos, stack: p.stack, blurb: p.blurb[lang], cat: p.cat };
}

/* ---------- journey ---------- */
export interface JourneyStep { phase: string; title: string; body: string; }
export interface JourneyNode extends JourneyStep {
  color: string; num: string; xPct: number; top: number; cx: number; cy: number;
}

const JCOL = ['#e34f26', '#777bb4', '#61dafb', '#ff2d20'];

export function buildJourney(lang: Lang): { nodes: JourneyNode[]; wavePath: string } {
  const journey: JourneyStep[] = lang === 'nl' ? [
    { phase: 'Start', title: 'HTML, CSS & JavaScript', body: 'Eerste sites, interactie en de basis van het web.' },
    { phase: '01', title: 'PHP & MySQL', body: 'Back-end, databases en CRUD-applicaties.' },
    { phase: '02', title: 'React & TypeScript', body: 'Moderne component-gedreven front-ends.' },
    { phase: 'Nu', title: 'Laravel', body: 'Full-stack apps bouwen met een modern PHP-framework.' },
  ] : [
    { phase: 'Start', title: 'HTML, CSS & JavaScript', body: 'First sites, interaction and the basics of the web.' },
    { phase: '01', title: 'PHP & MySQL', body: 'Back-end, databases and CRUD applications.' },
    { phase: '02', title: 'React & TypeScript', body: 'Modern component-driven front-ends.' },
    { phase: 'Now', title: 'Laravel', body: 'Building full-stack apps with a modern PHP framework.' },
  ];
  const n = journey.length;
  const nodes: JourneyNode[] = journey.map((j, i) => {
    const xPct = 12 + i * (76 / (n - 1));
    const cy = 26 + i * (80 / (n - 1));
    return { ...j, color: JCOL[i] || '#8b7cff', num: String(i + 1), xPct, top: cy - 23, cx: xPct * 10, cy };
  });
  let wavePath = 'M 0 ' + (nodes[0].cy - 12).toFixed(1) + ' L ' + nodes[0].cx.toFixed(1) + ' ' + nodes[0].cy.toFixed(1);
  for (let i = 1; i < nodes.length; i++) {
    const mx = ((nodes[i - 1].cx + nodes[i].cx) / 2).toFixed(1);
    wavePath += ' C ' + mx + ' ' + nodes[i - 1].cy.toFixed(1) + ' ' + mx + ' ' + nodes[i].cy.toFixed(1) + ' ' + nodes[i].cx.toFixed(1) + ' ' + nodes[i].cy.toFixed(1);
  }
  wavePath += ' L 1000 ' + (nodes[nodes.length - 1].cy + 12).toFixed(1);
  return { nodes, wavePath };
}

/* ---------- skills / tech chips ---------- */
const TC: Record<string, string> = {
  React: '#61dafb', TypeScript: '#3178c6', TS: '#3178c6', HTML: '#e34f26', CSS: '#1572b6',
  JS: '#f7df1e', Vite: '#646cff', 'Next.js': '#e6e6ea', PHP: '#777bb4', MySQL: '#4479a1',
  Python: '#3776ab', D3: '#f68e56', 'Chart.js': '#ff6384', SQL: '#336791',
};
const SLUG: Record<string, string> = {
  React: 'react', TypeScript: 'typescript', TS: 'typescript', HTML: 'html5', CSS: 'css',
  JS: 'javascript', Vite: 'vite', 'Next.js': 'nextdotjs', PHP: 'php', MySQL: 'mysql',
  Python: 'python', D3: 'd3', MariaDB: 'mariadb', 'Chart.js': 'chartdotjs',
};

export interface SkillChip { label: string; icon: string | null; iconOpacity: number; style: string; }
export interface SkillGroup { area: string; tag: string; note: string; color: string; chips: SkillChip[]; }

/** Build one chip for a tech token, using its muted brand colour (like the skills). */
export function techChip(it: string, compact = false): SkillChip {
  const c = TC[it] || '#8b7cff';
  const slug = SLUG[it];
  const hx = c.replace('#', '');
  const r = parseInt(hx.substr(0, 2), 16), gg = parseInt(hx.substr(2, 2), 16), b = parseInt(hx.substr(4, 2), 16);
  const mr = Math.round(r * 0.66 + 34 * 0.34), mg = Math.round(gg * 0.66 + 36 * 0.34), mb = Math.round(b * 0.66 + 42 * 0.34);
  const lum = (0.299 * mr + 0.587 * mg + 0.114 * mb) / 255;
  const txt = lum > 0.62 ? '#15151c' : '#ffffff';
  const bg = `rgb(${mr},${mg},${mb})`;
  const pad = compact ? '4px 9px' : '7px 12px';
  const fs = compact ? '11px' : '12.5px';
  const rad = compact ? '8px' : '9px';
  return {
    label: it,
    icon: slug ? `https://cdn.simpleicons.org/${slug}/ffffff` : null,
    iconOpacity: txt === '#15151c' ? 0.55 : 0.92,
    style: `display:inline-flex;align-items:center;gap:6px;padding:${pad};border-radius:${rad};font-family:'JetBrains Mono',monospace;font-size:${fs};font-weight:600;border:1px solid rgba(255,255,255,.08);background:${bg};color:${txt};`,
  };
}

/** Split a "React · TypeScript · Vite" stack string into coloured chips. */
export function buildStackChips(stack: string, compact = true): SkillChip[] {
  return stack.split('·').map((s) => s.trim()).filter(Boolean).map((it) => techChip(it, compact));
}

export function buildSkills(lang: Lang): SkillGroup[] {
  const groups = [
    { area: 'Front-end', tag: 'UI', items: ['React', 'TypeScript', 'HTML', 'CSS', 'Vite'], note: lang === 'nl' ? 'Interfaces voor RapidCars en Luxora gebouwd.' : 'Built the interfaces for RapidCars and Luxora.' },
    { area: 'Back-end', tag: 'Server', items: ['PHP', 'MySQL', 'Python'], note: lang === 'nl' ? 'Full-stack apps zoals Yume Ramen en CookUp.' : 'Full-stack apps like Yume Ramen and CookUp.' },
    { area: 'Data & viz', tag: 'Insight', items: ['D3', 'Chart.js', 'SQL'], note: lang === 'nl' ? 'Dashboards zoals Nike Business Anatomy.' : 'Dashboards such as Nike Business Anatomy.' },
    { area: lang === 'nl' ? 'Werkwijze' : 'Way of working', tag: 'Soft', items: ['Teamwork', lang === 'nl' ? 'Communicatie' : 'Communication', lang === 'nl' ? 'Doorzetten' : 'Persistence'], note: lang === 'nl' ? 'Probleemoplosser die blijft sleutelen tot het klopt.' : 'A problem solver who keeps going until it is right.' },
  ];
  return groups.map((g) => ({
    area: g.area,
    tag: g.tag,
    note: g.note,
    color: TC[g.items[0]] || '#8b7cff',
    chips: g.items.map((it) => techChip(it)),
  }));
}

/* ---------- contact ---------- */
export interface ContactLink { label: string; value: string; href: string; }

export function buildContactLinks(lang: Lang): ContactLink[] {
  return [
    { label: 'Email', value: 'mt.adamsaber@gmail.com', href: 'mailto:mt.adamsaber@gmail.com' },
    { label: 'GitHub', value: 'adamsaber-mr', href: 'https://github.com/adamsaber-mr' },
    { label: 'LinkedIn', value: 'Adam Saber', href: '#' },
    { label: lang === 'nl' ? 'Locatie' : 'Location', value: 'Rotterdam, NL', href: '#' },
  ];
}

export const CONTACT_EMAIL = 'mt.adamsaber@gmail.com';
