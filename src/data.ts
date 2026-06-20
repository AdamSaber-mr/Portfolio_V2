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
    pdView: 'Bekijk project', pdBack: 'Terug naar projecten', pdLive: 'Bezoek website', pdCode: 'Code op GitHub',
    pdOverview: 'Overzicht', pdHighlights: 'Highlights', pdDetails: 'Details',
    pdRole: 'Rol', pdYear: 'Jaar', pdType: 'Type', pdStack: 'Stack',
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
    pdView: 'View project', pdBack: 'Back to projects', pdLive: 'Visit website', pdCode: 'Code on GitHub',
    pdOverview: 'Overview', pdHighlights: 'Highlights', pdDetails: 'Details',
    pdRole: 'Role', pdYear: 'Year', pdType: 'Type', pdStack: 'Stack',
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
  /** Year the project was built, shown in the detail view. */
  year: string;
  /** Public GitHub repository URL (empty string hides the button). */
  repo: string;
  /** Live/demo URL (empty string hides the button). */
  live: string;
  /** My role on the project, per language. */
  role: Record<Lang, string>;
  /** A longer description shown on the detail page. */
  overview: Record<Lang, string>;
  /** Highlights / what the project can do, per language. */
  features: Record<Lang, string[]>;
}

export const PROJECTS: Project[] = [
  { name: 'RapidCars', cat: 'front', ratio: '4/3', color: '#1b1d22', image: '/assets/projects/rapidcars.jpg', imgPos: 'left top', stack: 'React · TypeScript · Vite',
    blurb: { nl: 'Autoverhuur-webapp voor een echte klant: snel boeken, sportieve auto’s.', en: 'Car-rental web app for a real client: fast booking, sporty cars.' },
    year: '2024', repo: 'https://github.com/adamsaber-mr/rapidcars', live: '',
    role: { nl: 'Front-end ontwikkelaar', en: 'Front-end developer' },
    overview: {
      nl: 'RapidCars is een autoverhuur-platform dat ik voor een echte klant bouwde. Bezoekers bladeren door een vloot sportieve auto’s en boeken in een paar stappen. De focus lag op snelheid, een strakke flow en een interface die vertrouwen wekt.',
      en: 'RapidCars is a car-rental platform I built for a real client. Visitors browse a fleet of sporty cars and book in just a few steps. The focus was on speed, a tight flow and an interface that builds trust.',
    },
    features: {
      nl: ['Boekingsflow van auto kiezen tot bevestiging', 'Filteren en bladeren door de wagenvloot', 'Responsive interface, mobiel-first', 'Gebouwd in nauw overleg met een echte klant'],
      en: ['Booking flow from picking a car to confirmation', 'Filter and browse the fleet', 'Responsive, mobile-first interface', 'Built in close collaboration with a real client'],
    } },
  { name: 'Nike Business Anatomy', cat: 'data', ratio: '1/1', color: '#0e1b2b', image: '/assets/projects/nike.png', imgPos: 'left top', stack: 'React · D3 · Chart.js',
    blurb: { nl: 'Interactief dashboard over Nike’s supply chain en revenue.', en: 'Interactive dashboard on Nike’s supply chain and revenue.' },
    year: '2024', repo: 'https://github.com/adamsaber-mr/nike-business-anatomy', live: '',
    role: { nl: 'Front-end & data-visualisatie', en: 'Front-end & data viz' },
    overview: {
      nl: 'Een interactief dashboard dat Nike’s business ontleedt: van supply chain tot omzet. Ruwe data wordt vertaald naar grafieken waarmee je trends en verbanden in één oogopslag ziet.',
      en: 'An interactive dashboard that dissects Nike’s business: from supply chain to revenue. Raw data is turned into charts that surface trends and relationships at a glance.',
    },
    features: {
      nl: ['Interactieve grafieken met D3 en Chart.js', 'Inzicht in supply chain en omzet', 'Ruwe data omgezet naar heldere visualisaties', 'Filteren en inzoomen op de cijfers'],
      en: ['Interactive charts with D3 and Chart.js', 'Insight into supply chain and revenue', 'Raw data turned into clear visualisations', 'Filter and zoom into the numbers'],
    } },
  { name: 'Luxora', cat: 'front', ratio: '3/4', color: '#2f3a2c', image: '/assets/projects/luxora.jpg', imgPos: 'left top', stack: 'Next.js · React · TS',
    blurb: { nl: 'Marketplace voor exclusieve luxeproducten met een volledige front-end.', en: 'Marketplace for exclusive luxury products with a full front-end.' },
    year: '2024', repo: 'https://github.com/adamsaber-mr/luxora', live: '',
    role: { nl: 'Front-end ontwikkelaar', en: 'Front-end developer' },
    overview: {
      nl: 'Luxora is een marktplaats voor exclusieve luxeproducten. Ik bouwde de volledige front-end met een verzorgde, premium uitstraling en een vloeiende browse-ervaring.',
      en: 'Luxora is a marketplace for exclusive luxury products. I built the full front-end with a polished, premium look and a smooth browsing experience.',
    },
    features: {
      nl: ['Volledige front-end in Next.js', 'Premium, verzorgd productontwerp', 'Productoverzichten en detailpagina’s', 'Snelle, vloeiende navigatie'],
      en: ['Full front-end in Next.js', 'Premium, polished product design', 'Product listings and detail pages', 'Fast, fluid navigation'],
    } },
  { name: 'Yume Ramen', cat: 'full', ratio: '4/3', color: '#3a1f22', image: '/assets/projects/yume-ramen.jpg', imgPos: 'left top', stack: 'PHP · MySQL · Python',
    blurb: { nl: 'Food-delivery webapp: bestellen, afrekenen en beheer voor de keuken.', en: 'Food-delivery web app: ordering, checkout and a kitchen dashboard.' },
    year: '2023', repo: 'https://github.com/adamsaber-mr/yume-ramen', live: '',
    role: { nl: 'Full-stack ontwikkelaar', en: 'Full-stack developer' },
    overview: {
      nl: 'Yume Ramen is een food-delivery webapp: klanten bestellen en rekenen af, terwijl de keuken via een dashboard de bestellingen beheert. Een full-stack project van interface tot database.',
      en: 'Yume Ramen is a food-delivery web app: customers order and check out, while the kitchen manages orders through a dashboard. A full-stack project from interface to database.',
    },
    features: {
      nl: ['Bestellen en afrekenen voor klanten', 'Keuken-dashboard om orders te beheren', 'PHP back-end met MySQL-database', 'Volledige full-stack architectuur'],
      en: ['Ordering and checkout for customers', 'Kitchen dashboard to manage orders', 'PHP back-end with a MySQL database', 'Complete full-stack architecture'],
    } },
  { name: 'CookUp', cat: 'full', ratio: '1/1', color: '#243027', image: '/assets/projects/cookup.jpg', imgPos: 'center top', stack: 'PHP · MySQL · CRUD',
    blurb: { nl: 'Receptenplatform met accounts, opslaan en categorieën.', en: 'Recipe platform with accounts, saving and categories.' },
    year: '2023', repo: 'https://github.com/adamsaber-mr/cookup', live: '',
    role: { nl: 'Full-stack ontwikkelaar', en: 'Full-stack developer' },
    overview: {
      nl: 'CookUp is een receptenplatform waar gebruikers een account maken, recepten opslaan en alles netjes per categorie ordenen. Draait op een PHP-back-end met volledige CRUD.',
      en: 'CookUp is a recipe platform where users create an account, save recipes and organise everything by category. Runs on a PHP back-end with full CRUD.',
    },
    features: {
      nl: ['Accounts met registratie en login', 'Recepten opslaan en beheren', 'Ordenen per categorie', 'Volledige CRUD op een PHP/MySQL-back-end'],
      en: ['Accounts with sign-up and login', 'Save and manage recipes', 'Organise by category', 'Full CRUD on a PHP/MySQL back-end'],
    } },
  { name: 'Portfolio v1', cat: 'front', ratio: '3/4', color: '#26222c', image: '/assets/projects/portfolio.jpg', imgPos: 'center top', stack: 'HTML · CSS · JS',
    blurb: { nl: 'Mijn eerste portfolio, waar het bouwen begon.', en: 'My first portfolio, where the building began.' },
    year: '2022', repo: 'https://github.com/adamsaber-mr/portfolio', live: '',
    role: { nl: 'Ontwerp & ontwikkeling', en: 'Design & development' },
    overview: {
      nl: 'Mijn allereerste portfolio — waar het bouwen begon. Volledig met de hand gemaakt in HTML, CSS en JavaScript, en de basis voor alles wat daarna kwam.',
      en: 'My very first portfolio — where the building began. Hand-crafted entirely in HTML, CSS and JavaScript, and the foundation for everything that followed.',
    },
    features: {
      nl: ['Volledig handgeschreven HTML/CSS/JS', 'Eerste stappen in webdesign', 'Basis voor mijn latere projecten'],
      en: ['Fully hand-written HTML/CSS/JS', 'First steps in web design', 'Foundation for my later projects'],
    } },
];

/** A filter is "all" plus any project category. */
export type Filter = 'all' | Cat;

export interface LocProject {
  name: string; ratio: string; color: string; image: string; imgPos: string; stack: string;
  blurb: string; cat: Cat;
  year: string; repo: string; live: string; role: string; overview: string; features: string[];
}

export function loc(p: Project, lang: Lang): LocProject {
  return {
    name: p.name, ratio: p.ratio, color: p.color, image: p.image, imgPos: p.imgPos, stack: p.stack,
    blurb: p.blurb[lang], cat: p.cat, year: p.year, repo: p.repo, live: p.live,
    role: p.role[lang], overview: p.overview[lang], features: p.features[lang],
  };
}

/** Human label for a project category, per language. */
export function catLabel(cat: Cat, s: Strings): string {
  return cat === 'front' ? s.fFront : cat === 'full' ? s.fFull : s.fData;
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
