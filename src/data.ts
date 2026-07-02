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
    spotifyTitle: 'Waar ik nu naar luister', nowKicker: 'Nu',
    tabRecent: 'Recent geluisterd', tabTop: 'Topnummers', saveSpotify: 'Open in Spotify',
    curStatus: 'Live status', curAvailable: 'Aan het werk', curTime: 'Lokale tijd',
    stCoding: 'Aan het coderen', stListening: 'Luistert naar', stOnline: 'Online',
    curBuilding: 'Aan het bouwen', curLearning: 'Aan het leren', curLocation: 'Locatie',
    workTitle: 'Werk', workBody: 'Een selectie van wat ik heb gebouwd, van klantopdrachten tot eigen experimenten. Filter op type.',
    fAll: 'Alles', fFront: 'Front-end', fFull: 'Full-stack', fData: 'Data',
    aboutTitle: 'Student, bouwer, probleemoplosser.',
    aboutP1: 'Mijn naam is Adam Saber, 18 jaar, en ik studeer Software Development in mijn tweede leerjaar aan het Grafisch Lyceum Rotterdam. In het begin heb ik veel gewerkt aan front-end (HTML/CSS/JavaScript/React), en daarna ben ik mij steeds meer gaan richten op de back-end kant van webapps, zoals PHP en databases (MariaDB/SQL).',
    aboutP2: 'Ik vind het leuk om ideeën om te zetten naar werkende applicaties en daarbij logisch na te denken over structuur, data en flow. Ik bouw het liefst dingen die een echt probleem oplossen, in plaats van techniek om de techniek.',
    aboutP3: 'Naast het bouwen vind ik samenwerken en helder communiceren belangrijk: goed begrijpen wat er nodig is en het daarna strak uitwerken. Op de langere termijn wil ik die technische basis combineren met een bredere rol richting business development, waarin ik techniek, mensen en strategie samenbreng.',
    journeyTitle: 'Mijn ontwikkelingsreis',
    experienceTitle: 'Ervaring & opleiding', experienceBody: 'Waar ik heb geleerd en gewerkt — van school tot de praktijk.',
    skillsTitle: 'Vaardigheden', skillsBody: 'Geen percentages, gewoon wat ik gebruik en waar ik het voor heb ingezet.',
    contactKicker: 'Contact', contactTitle: 'Laten we iets bouwen.',
    contactBody: 'Heb je een stageplek of wil je samenwerken? Ik hoor graag van je.',
    fName: 'Naam', fEmail: 'E-mail', fSubject: 'Onderwerp', fMsg: 'Bericht', send: 'Verstuur bericht',
    phName: 'Je naam', phEmail: 'jij@voorbeeld.nl', phSubject: 'Bijv. Stageplek front-end', phMsg: 'Vertel kort waar het over gaat…',
    formNote: 'Je bericht komt direct in mijn inbox terecht.',
    sentTitle: 'Verzonden!', sentBody: 'Bedankt voor je bericht — ik reageer zo snel mogelijk!',
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
    spotifyTitle: 'What I am listening to', nowKicker: 'Right now',
    tabRecent: 'Recently Played', tabTop: 'Top Tracks', saveSpotify: 'Open in Spotify',
    curStatus: 'Live status', curAvailable: 'At work', curTime: 'Local time',
    stCoding: 'Coding', stListening: 'Listening to', stOnline: 'Online',
    curBuilding: 'Building', curLearning: 'Learning', curLocation: 'Location',
    workTitle: 'Work', workBody: 'A selection of what I have built, from client work to personal experiments. Filter by type.',
    fAll: 'All', fFront: 'Front-end', fFull: 'Full-stack', fData: 'Data',
    aboutTitle: 'Student, builder, problem solver.',
    aboutP1: 'My name is Adam Saber, 18, and I am in my second year of Software Development at Grafisch Lyceum Rotterdam. I started out focused on front-end (HTML/CSS/JavaScript/React) and gradually shifted towards the back-end side of web apps, like PHP and databases (MariaDB/SQL).',
    aboutP2: 'I enjoy turning ideas into working applications and thinking logically about structure, data and flow. I prefer building things that solve a real problem, rather than technology for its own sake.',
    aboutP3: 'Beyond building, I value teamwork and clear communication: properly understanding what is needed and then executing it cleanly. In the longer term I want to combine that technical foundation with a broader role towards business development, bringing together technology, people and strategy.',
    journeyTitle: 'My development journey',
    experienceTitle: 'Experience & education', experienceBody: 'Where I have learned and worked — from school to practice.',
    skillsTitle: 'Skills', skillsBody: 'No percentages, just what I use and where I have applied it.',
    contactKicker: 'Contact', contactTitle: 'Let us build something.',
    contactBody: 'Got an internship opening or want to collaborate? I would love to hear from you.',
    fName: 'Name', fEmail: 'Email', fSubject: 'Subject', fMsg: 'Message', send: 'Send message',
    phName: 'Your name', phEmail: 'you@example.com', phSubject: 'e.g. Front-end internship', phMsg: 'Tell me briefly what it is about…',
    formNote: 'Your message lands straight in my inbox.',
    sentTitle: 'Sent!', sentBody: 'Thanks for your message — I will reply as soon as I can!',
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
  { name: 'Sentinel AI', cat: 'data', ratio: '16/10', color: '#241a2e', image: '/assets/projects/ai_fraude.png', imgPos: 'center top', stack: 'Python · scikit-learn · Flask · React',
    blurb: { nl: 'Full-stack ML-demo die met anomaliedetectie verdachte transacties opspoort.', en: 'Full-stack ML demo that flags suspicious transactions with anomaly detection.' },
    year: '2026', repo: 'https://github.com/AdamSaber-mr/Ai-Fraud-Detection', live: 'https://adamsaber-mr.github.io/Ai-Fraud-Detection/',
    role: { nl: 'Full-stack & ML-ontwikkelaar', en: 'Full-stack & ML developer' },
    overview: {
      nl: 'Sentinel is mijn full-stack eindproject dat met machine learning verdachte transacties opspoort. De kern is een Isolation Forest die ongesuperviseerd leert wat normaal gedrag is en de uitschieters isoleert — zonder ooit gelabelde fraude te zien. Een Flask-API traint en scoort de data, terwijl een React-dashboard met ECharts de resultaten tot leven brengt: KPI’s, een 3D-transactiewolk en per transactie uitleg waarom iets verdacht is.',
      en: 'Sentinel is my full-stack final project that uses machine learning to spot suspicious transactions. At its core is an Isolation Forest that learns, unsupervised, what normal behaviour looks like and isolates the outliers — without ever seeing labelled fraud. A Flask API trains and scores the data, while a React dashboard built with ECharts brings the results to life: KPIs, a 3D transaction cloud and a per-transaction explanation of why something looks suspect.',
    },
    features: {
      nl: ['Isolation Forest (scikit-learn) voor ongesuperviseerde anomaliedetectie', 'Eigen explainability-laag: per transactie uitleg waarom iets verdacht is', 'Anomaly-score omgezet naar een risico van 0–100 met HIGH/MEDIUM/LOW-banden', 'Flask REST-API met gelaagde architectuur en veilige CSV-upload', 'React 19 + ECharts-dashboard met o.a. een 3D-transactiewolk'],
      en: ['Isolation Forest (scikit-learn) for unsupervised anomaly detection', 'Custom explainability layer: per-transaction reasons why it’s suspect', 'Anomaly score mapped to a 0–100 risk with HIGH/MEDIUM/LOW bands', 'Flask REST API with a layered architecture and safe CSV upload', 'React 19 + ECharts dashboard featuring a 3D transaction cloud'],
    } },
  { name: 'RapidCars', cat: 'front', ratio: '4/3', color: '#1b1d22', image: '/assets/projects/rapidcars.jpg', imgPos: 'left top', stack: 'React · TypeScript · Vite',
    blurb: { nl: 'Autoverhuur-webapp voor een echte klant: snel boeken, sportieve auto’s.', en: 'Car-rental web app for a real client: fast booking, sporty cars.' },
    year: '2024', repo: 'https://github.com/AdamSaber-mr/rapid_cars', live: 'https://adamsaber-mr.github.io/rapid_cars/',
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
    year: '2024', repo: 'https://github.com/AdamSaber-mr/Business-Anatomy', live: 'https://adamsaber-mr.github.io/Business_Anatomy/',
    role: { nl: 'Front-end & data-visualisatie', en: 'Front-end & data viz' },
    overview: {
      nl: 'Een interactief dashboard dat Nike’s business ontleedt: van supply chain tot omzet. Ruwe data wordt vertaald naar grafieken waarmee je trends en verbanden in één oogopslag ziet.',
      en: 'An interactive dashboard that dissects Nike’s business: from supply chain to revenue. Raw data is turned into charts that surface trends and relationships at a glance.',
    },
    features: {
      nl: ['Interactieve grafieken met D3 en Chart.js', 'Inzicht in supply chain en omzet', 'Ruwe data omgezet naar heldere visualisaties', 'Filteren en inzoomen op de cijfers'],
      en: ['Interactive charts with D3 and Chart.js', 'Insight into supply chain and revenue', 'Raw data turned into clear visualisations', 'Filter and zoom into the numbers'],
    } },
  { name: 'Revenue OS', cat: 'full', ratio: '16/10', color: '#26243a', image: '/assets/projects/saas.png', imgPos: 'center top', stack: 'React · Laravel · SQLite',
    blurb: { nl: 'Multi-tenant SaaS-dashboard dat abonnementsomzet live berekent uit een event-log.', en: 'Multi-tenant SaaS dashboard that computes subscription revenue live from an event log.' },
    year: '2026', repo: 'https://github.com/AdamSaber-mr/SaaS_Subscription_Dashboard', live: 'https://revenue-os-app.vercel.app',
    role: { nl: 'Full-stack ontwikkelaar', en: 'Full-stack developer' },
    overview: {
      nl: 'Revenue OS is een Stripe/ChartMogul-achtig omzetdashboard voor SaaS-bedrijven. Elke abonnementswijziging — nieuw, upgrade, downgrade, opzegging of heractivering — wordt als event vastgelegd, en alle metrics (MRR, ARR, churn, retentie en cohort-analyses) worden daar server-side uit afgeleid, zodat de cijfers altijd onderling kloppen. Het platform is multi-tenant: elk bedrijf registreert een eigen omgeving met strikt gescheiden data. De tweetalige interface (NL/EN) heeft een licht en donker thema en volledig handgebouwde SVG-grafieken, en draait live op Vercel en Railway.',
      en: 'Revenue OS is a Stripe/ChartMogul-style revenue dashboard for SaaS companies. Every subscription change — new, upgrade, downgrade, cancellation or reactivation — is recorded as an event, and all metrics (MRR, ARR, churn, retention and cohort analyses) are derived from it server-side, so the numbers always stay consistent with each other. The platform is multi-tenant: every company registers its own environment with strictly isolated data. The bilingual interface (NL/EN) ships light and dark themes and fully hand-built SVG charts, and runs live on Vercel and Railway.',
    },
    features: {
      nl: ['Event-sourced metrics-engine: MRR, ARR, NRR, churn en cohort-retentie uit één append-only event-log', 'Multi-tenancy vanaf de datalaag: team-scoping op elke tabel, cross-tenant toegang leest als 404', 'Eigen SVG-chartengine in plaats van een chart-library — bundle van 800 KB naar 283 KB', 'Toegankelijk: focus-traps, volledige toetsenbordnavigatie en screenreader-tabellen bij elke grafiek', '28 PHPUnit feature-tests en 7 Puppeteer end-to-end-suites, o.a. voor tenant-isolatie'],
      en: ['Event-sourced metrics engine: MRR, ARR, NRR, churn and cohort retention from one append-only event log', 'Multi-tenancy from the data layer up: team scoping on every table, cross-tenant access reads as a 404', 'Custom SVG chart engine instead of a chart library — bundle down from 800 KB to 283 KB', 'Accessible: focus traps, full keyboard navigation and screenreader tables behind every chart', '28 PHPUnit feature tests and 7 Puppeteer end-to-end suites, covering tenant isolation and more'],
    } },
  { name: 'Luxora', cat: 'front', ratio: '3/4', color: '#2f3a2c', image: '/assets/projects/luxora.jpg', imgPos: 'left top', stack: 'Next.js · React · TS',
    blurb: { nl: 'Marketplace voor exclusieve luxeproducten met een volledige front-end.', en: 'Marketplace for exclusive luxury products with a full front-end.' },
    year: '2024', repo: 'https://github.com/itsamestachu/luxora', live: 'https://luxora.pages.dev/',
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
    year: '2023', repo: 'https://github.com/AdamSaber-mr/Ramen_DeliveryApp', live: 'https://102896.stu.sd-lab.nl/schooljaar2/1_beroeps/Ramen_DeliveryApp/public/1_index.php',
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
    year: '2023', repo: 'https://github.com/AdamSaber-mr/Recipe_Website', live: 'https://102896.stu.sd-lab.nl/schooljaar2/1_beroeps/stop_de_ontkoking/mamp_bp/index.php',
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
    year: '2022', repo: 'https://github.com/AdamSaber-mr/portfolio_mr', live: 'https://adamsaber-mr.github.io/portfolio_mr/',
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

/* ---------- home: now playing ---------- */
/**
 * Tracks shown in the home "what I'm listening to" section. These are hand-picked
 * (no Spotify login or playlist link needed). Album art comes from Apple's public
 * artwork CDN; if an image fails to load the coloured tile shows through. To swap a
 * song, change its title/artist/dur and paste a new `art` URL (or leave it — the
 * play button just opens a Spotify search for "title artist").
 */
export interface Track { title: string; artist: string; dur: string; art: string; color: string; id?: string; preview?: string; }

export const FEATURED_TRACK: Track = {
  title: 'LIMBO', artist: 'keshi', dur: '3:32', color: '#1f5562',
  art: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/e2/de/98/e2de9860-b40b-e33f-f68e-ab8e0956a538/22UMGIM07345.rgb.jpg/300x300bb.jpg',
};

export const TRACKS_RECENT: Track[] = [
  { title: 'blue', artist: 'keshi', dur: '2:58', color: '#2a3d5c',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/83/d7/8a/83d78a91-effe-ea4e-ec91-b40a550e6b87/20UMGIM13994.rgb.jpg/300x300bb.jpg' },
  { title: 'Glimpse of Us', artist: 'Joji', dur: '3:53', color: '#5c4632',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d0/2a/43/d02a433a-3ab8-9a94-b07d-1dc599b64966/93624864387.jpg/300x300bb.jpg' },
  { title: 'Bad Habit', artist: 'Steve Lacy', dur: '3:52', color: '#3a4a32',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/f4/b4/c4/f4b4c458-e52c-859b-fdef-2600dd4fe768/196589380630.jpg/300x300bb.jpg' },
  { title: 'Sofia', artist: 'Clairo', dur: '3:08', color: '#5c3340',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f2/47/06/f24706bc-a90c-f730-bd8a-586ddde8af3e/829299184631.jpg/300x300bb.jpg' },
];

export const TRACKS_TOP: Track[] = [
  { title: 'drunk', artist: 'keshi', dur: '3:47', color: '#3a3f4c',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/c9/99/96/c999962f-a98e-45f3-c9a7-0a1b49198216/20UMGIM87054.rgb.jpg/300x300bb.jpg' },
  { title: 'Get You', artist: 'Daniel Caesar', dur: '4:38', color: '#4a3a2e',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b6/cd/1a/b6cd1a5b-83af-a1e2-0ad7-ea530fcf2522/859722261219.jpg/300x300bb.jpg' },
  { title: 'Lo Que Siento', artist: 'Cuco', dur: '5:12', color: '#463a5c',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/98/3f/3a/983f3a97-a9ba-e291-9e7b-242e7c00c6ca/191061742319_1.jpg/300x300bb.jpg' },
  { title: 'Pluto Projector', artist: 'Rex Orange County', dur: '4:27', color: '#2e4a4a',
    art: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e3/af/48/e3af4809-2a90-38c3-c485-44ae6471f75b/886447950241.jpg/300x300bb.jpg' },
];

/** Open a Spotify search for a track (no API/login needed). */
export function spotifySearchUrl(t: Track): string {
  return `https://open.spotify.com/search/${encodeURIComponent(`${t.title} ${t.artist}`)}`;
}

/* ---------- home: live chart tracks (Apple "Top Songs" RSS, no API key) ---------- */
const TRACK_TINTS = ['#1f5562', '#2a3d5c', '#5c4632', '#3a4a32', '#5c3340', '#3a3f4c', '#4a3a2e', '#463a5c', '#2e4a4a'];

/** Upscale an Apple artwork URL (e.g. .../170x170bb.png) to a sharper size. */
function biggerArt(url: string): string {
  return url.replace(/\/\d+x\d+bb\.(png|jpg)/, '/512x512bb.$1');
}

function shuffle<T>(a: T[]): T[] {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export interface ChartTracks { featured: Track; recent: Track[]; top: Track[]; }

/**
 * Fetch popular songs from Apple's public Top Songs RSS feed (CORS-enabled, no key).
 * Each track carries a 30-second preview URL that plays straight on the page.
 * Returns null on any failure so the caller can fall back to the static list.
 */
export async function fetchChartTracks(): Promise<ChartTracks | null> {
  try {
    const r = await fetch('https://itunes.apple.com/us/rss/topsongs/limit=50/json');
    if (!r.ok) return null;
    const j: any = await r.json();
    const entries: any[] = j?.feed?.entry || [];
    const tracks: Track[] = entries
      .map((e: any, i: number): Track => {
        const imgs: any[] = e['im:image'] || [];
        const art = imgs.length ? biggerArt(imgs[imgs.length - 1].label) : '';
        const prev = (e.link || []).find((l: any) => l?.attributes?.type === 'audio/x-m4a');
        return {
          id: e.id?.attributes?.['im:id'] || String(i),
          title: e['im:name']?.label || '',
          artist: e['im:artist']?.label || '',
          dur: '0:30',
          art,
          color: TRACK_TINTS[i % TRACK_TINTS.length],
          preview: prev?.attributes?.href || '',
        };
      })
      .filter((t) => t.preview && t.art);
    if (tracks.length < 6) return null;
    const top = tracks.slice(0, 4); // genuine chart order (most popular)
    const rest = shuffle(tracks.slice(4)); // randomised each load
    return { featured: rest[0], recent: rest.slice(1, 5), top };
  } catch {
    return null;
  }
}

/* ---------- home: currently ---------- */
export interface CurrentlyItem { label: string; value: string; icon: string; }

/**
 * Discord user ID for the LIVE status, served by the free Lanyard API
 * (https://api.lanyard.rest). Leave empty to keep the static "Aan het werk" status.
 * To turn the status live:
 *   1. Join the Lanyard Discord once: https://discord.gg/lanyard
 *   2. Install a VSCode Discord-presence extension (e.g. "vscord") so coding shows up
 *   3. Enable Discord → Settings → Advanced → Developer Mode, then right-click your
 *      name → "Copy User ID" and paste it below.
 */
export const DISCORD_USER_ID = '893186318178324490'; // Adam Saber (a.martina)

/** The "right now" banner on the home page (static cells; the live clock is added in the view). */
export function buildCurrently(s: Strings): CurrentlyItem[] {
  const nl = s.workTitle === 'Werk';
  return [
    { label: s.curBuilding, value: nl ? 'Dit portfolio (V2)' : 'This portfolio (V2)', icon: 'code' },
    { label: s.curLearning, value: 'Laravel', icon: 'book' },
    { label: s.curLocation, value: 'Rotterdam, NL', icon: 'pin' },
  ];
}

/* ---------- journey (vertical timeline) ---------- */
export interface JourneyStep { title: string; body: string; }
export interface JourneyNode extends JourneyStep {
  color: string; slug: string; year: string; current: boolean; chips: SkillChip[]; phase: string;
}

const JCOL = ['#e34f26', '#777bb4', '#61dafb', '#ff2d20'];
const JSLUG = ['html5', 'php', 'react', 'laravel'];
const JYEAR = ['2022', '2023', '2024', ''];
const JSTACK = ['HTML · CSS · JS', 'PHP · MySQL', 'React · TypeScript', 'Laravel'];
const JPHASE: Record<Lang, string[]> = {
  nl: ['Fundament', 'Back-end', 'Front-end', 'Full-stack'],
  en: ['Foundation', 'Back-end', 'Front-end', 'Full-stack'],
};

export function buildJourney(lang: Lang): JourneyNode[] {
  const journey: JourneyStep[] = lang === 'nl' ? [
    { title: 'HTML, CSS & JavaScript', body: 'Eerste sites, interactie en de basis van het web.' },
    { title: 'PHP & MySQL', body: 'Back-end, databases en CRUD-applicaties.' },
    { title: 'React & TypeScript', body: 'Moderne component-gedreven front-ends.' },
    { title: 'Laravel', body: 'Full-stack apps bouwen met een modern PHP-framework.' },
  ] : [
    { title: 'HTML, CSS & JavaScript', body: 'First sites, interaction and the basics of the web.' },
    { title: 'PHP & MySQL', body: 'Back-end, databases and CRUD applications.' },
    { title: 'React & TypeScript', body: 'Modern component-driven front-ends.' },
    { title: 'Laravel', body: 'Building full-stack apps with a modern PHP framework.' },
  ];
  const last = journey.length - 1;
  return journey.map((j, i) => ({
    ...j,
    color: JCOL[i] || '#8b7cff',
    slug: JSLUG[i] || '',
    year: JYEAR[i] || (lang === 'nl' ? 'Nu' : 'Now'),
    current: i === last,
    chips: buildStackChips(JSTACK[i] || '', true),
    phase: JPHASE[lang][i] || '',
  }));
}

/* ---------- experience & education (about cards) ---------- */
export interface ExpBullet { title: string; note?: string; }
export interface ExpItem {
  kind: 'edu' | 'work';
  /** Line-icon name shown in the tinted tile. */
  icon: string;
  /** Soft accent colour for the tile tint, dots and hover bar. */
  color: string;
  kicker: string;
  title: string;
  org: string;
  period: string;
  body: string;
  bullets: ExpBullet[];
}

export function buildExperience(lang: Lang): ExpItem[] {
  const nl = lang === 'nl';
  return [
    {
      kind: 'edu', icon: 'cap', color: '#8b7cff',
      kicker: nl ? 'Opleiding' : 'Education',
      title: 'Software Development',
      org: nl ? 'Grafisch Lyceum Rotterdam · MBO Niveau 4' : 'Grafisch Lyceum Rotterdam · MBO Level 4',
      period: nl ? '2023 – Heden' : '2023 – Present',
      body: nl
        ? 'Volledige opleiding in Software Development met focus op zowel front-end als back-end ontwikkeling. Bezig met het opbouwen van een breed fundament in programmeren.'
        : 'Full Software Development programme focused on both front-end and back-end development. Building a broad foundation in programming.',
      bullets: nl ? [
        { title: 'Jaar 1: Front-End (HTML, CSS, JS, PHP)' },
        { title: 'Jaar 2: Backend & Databases' },
        { title: 'Focus: Full-Stack (PHP/JS/SQL)' },
      ] : [
        { title: 'Year 1: Front-End (HTML, CSS, JS, PHP)' },
        { title: 'Year 2: Back-end & Databases' },
        { title: 'Focus: Full-Stack (PHP/JS/SQL)' },
      ],
    },
    {
      kind: 'work', icon: 'bag', color: '#c79155',
      kicker: nl ? 'Werkervaring' : 'Experience',
      title: 'Verkoopmedewerker',
      org: nl ? 'Van Haren · Schoenenwinkel' : 'Van Haren · Shoe store',
      period: '2024 – 2025',
      body: nl
        ? 'Ervaring opgedaan in klantcontact, teamwork en commerciële vaardigheden. Sterke basis in communicatie en samenwerken in een professionele omgeving.'
        : 'Gained experience in customer contact, teamwork and commercial skills. A strong base in communication and collaboration in a professional setting.',
      bullets: nl ? [
        { title: 'Communicatie', note: "Effectief met klanten en collega's" },
        { title: 'Verkoop', note: 'Klantbehoeften identificeren en adviseren' },
        { title: 'Samenwerken', note: 'Teamwork in drukke omgeving' },
        { title: 'Klantcontact', note: 'Professionele en vriendelijke service' },
      ] : [
        { title: 'Communication', note: 'Effective with customers and colleagues' },
        { title: 'Sales', note: 'Identifying customer needs and advising' },
        { title: 'Teamwork', note: 'Collaboration in a busy environment' },
        { title: 'Customer contact', note: 'Professional and friendly service' },
      ],
    },
    {
      kind: 'work', icon: 'mega', color: '#5fa394',
      kicker: nl ? 'Werkervaring' : 'Experience',
      title: 'Medewerker',
      org: 'Sagitta Marketing · Marketing & Communicatie',
      period: nl ? '2025 – Heden' : '2025 – Present',
      body: nl
        ? 'Ondersteuning bij marketingwerkzaamheden en communicatietaken binnen een dynamische marketingomgeving. Opgedaan inzicht in hoe marketing en digitale communicatie in de praktijk werken.'
        : 'Supporting marketing activities and communication tasks within a dynamic marketing environment. Gained insight into how marketing and digital communication work in practice.',
      bullets: nl ? [
        { title: 'Marketingcampagnes', note: 'Meegewerkt aan de uitvoering' },
        { title: 'Communicatie', note: 'Content- en communicatietaken' },
        { title: 'Cold callen', note: 'Telefonisch nieuwe klanten benaderen' },
        { title: 'Leads creëren', note: 'Nieuwe verkoopkansen genereren' },
      ] : [
        { title: 'Marketing campaigns', note: 'Helped with the execution' },
        { title: 'Communication', note: 'Content and communication tasks' },
        { title: 'Cold calling', note: 'Approaching new customers by phone' },
        { title: 'Lead generation', note: 'Generating new sales opportunities' },
      ],
    },
  ];
}

/* ---------- skills / tech chips ---------- */
const TC: Record<string, string> = {
  React: '#61dafb', TypeScript: '#3178c6', TS: '#3178c6', HTML: '#e34f26', CSS: '#1572b6',
  JS: '#f7df1e', Vite: '#646cff', 'Next.js': '#e6e6ea', PHP: '#777bb4', MySQL: '#4479a1',
  Python: '#3776ab', D3: '#f68e56', 'Chart.js': '#ff6384', SQL: '#336791', Laravel: '#ff2d20',
  'scikit-learn': '#f7931e', ECharts: '#aa344d', NumPy: '#4dabcf', pandas: '#150458', 'Framer Motion': '#0055ff', Flask: '#5f6caf',
  SQLite: '#0f80cc', PHPUnit: '#3c9cd7', Puppeteer: '#40b5a4',
};
const SLUG: Record<string, string> = {
  React: 'react', TypeScript: 'typescript', TS: 'typescript', HTML: 'html5', CSS: 'css',
  JS: 'javascript', Vite: 'vite', 'Next.js': 'nextdotjs', PHP: 'php', MySQL: 'mysql',
  Python: 'python', D3: 'd3', MariaDB: 'mariadb', 'Chart.js': 'chartdotjs', Laravel: 'laravel',
  'scikit-learn': 'scikitlearn', Flask: 'flask', ECharts: 'apacheecharts', NumPy: 'numpy', pandas: 'pandas', 'Framer Motion': 'framer',
  SQLite: 'sqlite', Puppeteer: 'puppeteer',
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
    { area: 'Front-end', tag: 'UI', items: ['React', 'TypeScript', 'HTML', 'CSS', 'Vite', 'Framer Motion'], note: lang === 'nl' ? 'Interfaces voor RapidCars, Luxora en Sentinel gebouwd.' : 'Built the interfaces for RapidCars, Luxora and Sentinel.' },
    { area: 'Back-end', tag: 'Server', items: ['PHP', 'MySQL', 'Python', 'Flask'], note: lang === 'nl' ? 'Full-stack apps zoals Yume Ramen, CookUp en de Flask-API van Sentinel.' : 'Full-stack apps like Yume Ramen, CookUp and the Flask API behind Sentinel.' },
    { area: 'Data & AI', tag: 'Insight', items: ['scikit-learn', 'NumPy', 'pandas', 'D3', 'ECharts', 'Chart.js', 'SQL'], note: lang === 'nl' ? 'Anomaliedetectie voor Sentinel AI en dashboards zoals Nike.' : 'Anomaly detection for Sentinel AI and dashboards like Nike.' },
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

/**
 * Web3Forms access key — lets this static site send the contact form straight to
 * your inbox, no server and no mail app. Get a free key in 30s at
 * https://web3forms.com: enter the inbox email (e.g. the one above), copy the
 * key it gives you and paste it here. While empty, the form falls back to mailto.
 */
export const WEB3FORMS_ACCESS_KEY = '4808cd45-bbe9-452e-ba2d-daec857da52f';
