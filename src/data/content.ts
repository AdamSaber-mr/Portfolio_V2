export type Lang = 'nl' | 'en'

export interface Strings {
  navHome: string
  navWork: string
  navAbout: string
  navContact: string
  cv: string
  heroL1: string
  heroL2: string
  heroL3: string
  heroBody: string
  heroCta1: string
  heroCta2: string
  drag: string
  statusOpen: string
  selectedWork: string
  viewAll: string
  workKicker: string
  workTitle: string
  workBody: string
  fAll: string
  fFront: string
  fFull: string
  fData: string
  aboutKicker: string
  aboutTitle: string
  aboutP1: string
  aboutP2: string
  aboutP3: string
  atAGlance: string
  journeyTitle: string
  skillsTitle: string
  skillsBody: string
  contactKicker: string
  contactTitle: string
  contactBody: string
  fName: string
  fEmail: string
  fSubject: string
  fMsg: string
  send: string
  phName: string
  phEmail: string
  phSubject: string
  phMsg: string
  formNote: string
  sentTitle: string
  sentBody: string
}

export const STR: Record<Lang, Strings> = {
  nl: {
    navHome: 'Home',
    navWork: 'Projecten',
    navAbout: 'Over mij',
    navContact: 'Contact',
    cv: 'CV',
    heroL1: 'Ik bouw digitale',
    heroL2: 'producten van',
    heroL3: 'begin tot eind.',
    heroBody:
      'Adam Saber, 18 jaar. Student Software Development in Rotterdam, full-stack met PHP, JavaScript & React. Van interface tot database.',
    heroCta1: 'Bekijk mijn werk',
    heroCta2: 'Over mij',
    drag: 'sleep de vorm om te draaien',
    statusOpen: 'Stage gezocht',
    selectedWork: 'Geselecteerd werk',
    viewAll: 'Bekijk alles',
    workKicker: 'Alle projecten',
    workTitle: 'Werk',
    workBody:
      'Een selectie van wat ik heb gebouwd, van klantopdrachten tot eigen experimenten. Filter op type.',
    fAll: 'Alles',
    fFront: 'Front-end',
    fFull: 'Full-stack',
    fData: 'Data',
    aboutKicker: 'Over mij',
    aboutTitle: 'Student, bouwer, probleemoplosser.',
    aboutP1:
      'Mijn naam is Adam Saber, 18 jaar, en ik studeer Software Development in mijn tweede leerjaar aan het Grafisch Lyceum Rotterdam. In het begin heb ik veel gewerkt aan front-end (HTML/CSS/JavaScript/React) en daarna ben ik mij steeds meer gaan richten op de back-end kant van webapps, zoals PHP en databases (MariaDB/SQL).',
    aboutP2:
      'Ik vind het leuk om ideeën om te zetten naar werkende applicaties en daarbij logisch na te denken over structuur, data en flow. Naast het bouwen vind ik samenwerken en helder communiceren belangrijk: goed begrijpen wat er nodig is en het daarna strak uitwerken.',
    aboutP3:
      'Op dit moment richt ik mij op Full-Stack Web Development en zoek ik een meewerkstage waar ik mijn kennis van PHP, JavaScript, TypeScript en React direct inzet op echte projecten en meewerk in een professioneel team.',
    atAGlance: 'In het kort',
    journeyTitle: 'Mijn ontwikkelingsreis',
    skillsTitle: 'Vaardigheden',
    skillsBody:
      'Geen percentages, gewoon wat ik gebruik en waar ik het voor heb ingezet.',
    contactKicker: 'Contact',
    contactTitle: 'Laten we iets bouwen.',
    contactBody:
      'Heb je een stageplek of wil je samenwerken? Ik hoor graag van je.',
    fName: 'Naam',
    fEmail: 'E-mail',
    fSubject: 'Onderwerp',
    fMsg: 'Bericht',
    send: 'Verstuur bericht',
    phName: 'Je naam',
    phEmail: 'jij@voorbeeld.nl',
    phSubject: 'Bijv. Stageplek front-end',
    phMsg: 'Vertel kort waar het over gaat…',
    formNote: 'Je mailprogramma opent met dit bericht klaar om te versturen.',
    sentTitle: 'Bericht klaar!',
    sentBody: 'Je mailprogramma opent met het bericht. Bedankt!',
  },
  en: {
    navHome: 'Home',
    navWork: 'Work',
    navAbout: 'About',
    navContact: 'Contact',
    cv: 'CV',
    heroL1: 'I build digital',
    heroL2: 'products from',
    heroL3: 'start to finish.',
    heroBody:
      'Adam Saber, 18. Software Development student in Rotterdam, full-stack with PHP, JavaScript & React. From interface to database.',
    heroCta1: 'View my work',
    heroCta2: 'About me',
    drag: 'drag the shape to rotate',
    statusOpen: 'Open to internships',
    selectedWork: 'Selected work',
    viewAll: 'View all',
    workKicker: 'All projects',
    workTitle: 'Work',
    workBody:
      'A selection of what I have built, from client work to personal experiments. Filter by type.',
    fAll: 'All',
    fFront: 'Front-end',
    fFull: 'Full-stack',
    fData: 'Data',
    aboutKicker: 'About me',
    aboutTitle: 'Student, builder, problem solver.',
    aboutP1:
      'My name is Adam Saber, 18, and I am in my second year of Software Development at Grafisch Lyceum Rotterdam. I started out focused on front-end (HTML/CSS/JavaScript/React) and gradually shifted towards the back-end side of web apps, like PHP and databases (MariaDB/SQL).',
    aboutP2:
      'I enjoy turning ideas into working applications and thinking logically about structure, data and flow. Beyond building, I value teamwork and clear communication: properly understanding what is needed and then executing it cleanly.',
    aboutP3:
      'Right now I focus on Full-Stack Web Development and I am looking for a work placement where I can apply my knowledge of PHP, JavaScript, TypeScript and React directly on real projects within a professional team.',
    atAGlance: 'At a glance',
    journeyTitle: 'My development journey',
    skillsTitle: 'Skills',
    skillsBody: 'No percentages, just what I use and where I have applied it.',
    contactKicker: 'Contact',
    contactTitle: 'Let us build something.',
    contactBody:
      'Got an internship opening or want to collaborate? I would love to hear from you.',
    fName: 'Name',
    fEmail: 'Email',
    fSubject: 'Subject',
    fMsg: 'Message',
    send: 'Send message',
    phName: 'Your name',
    phEmail: 'you@example.com',
    phSubject: 'e.g. Front-end internship',
    phMsg: 'Tell me briefly what it is about…',
    formNote: 'Your mail app opens with this message ready to send.',
    sentTitle: 'Message ready!',
    sentBody: 'Your mail app opens with the message. Thanks!',
  },
}

export type Category = 'front' | 'full' | 'data'

export interface Project {
  name: string
  cat: Category
  year: string
  ratio: string
  color: string
  stack: string
  kind: Record<Lang, string>
  blurb: Record<Lang, string>
}

export const PROJECTS: Project[] = [
  {
    name: 'RapidCars',
    cat: 'front',
    year: '2024',
    ratio: '4/3',
    color: '#1b1d22',
    stack: 'React · TypeScript · Vite',
    kind: { nl: 'Klant · Front-end', en: 'Client · Front-end' },
    blurb: {
      nl: 'Autoverhuur-webapp voor een echte klant: snel boeken, sportieve auto’s.',
      en: 'Car-rental web app for a real client: fast booking, sporty cars.',
    },
  },
  {
    name: 'Nike Business Anatomy',
    cat: 'data',
    year: '2025',
    ratio: '1/1',
    color: '#0e1b2b',
    stack: 'React · D3 · Chart.js',
    kind: { nl: 'Persoonlijk · Data', en: 'Personal · Data' },
    blurb: {
      nl: 'Interactief dashboard over Nike’s supply chain en revenue.',
      en: 'Interactive dashboard on Nike’s supply chain and revenue.',
    },
  },
  {
    name: 'Luxora',
    cat: 'front',
    year: '2025',
    ratio: '3/4',
    color: '#2f3a2c',
    stack: 'Next.js · React · TS',
    kind: { nl: 'Concept · Front-end', en: 'Concept · Front-end' },
    blurb: {
      nl: 'Marketplace voor exclusieve luxeproducten met een volledige front-end.',
      en: 'Marketplace for exclusive luxury products with a full front-end.',
    },
  },
  {
    name: 'Yume Ramen',
    cat: 'full',
    year: '2025',
    ratio: '4/3',
    color: '#3a1f22',
    stack: 'PHP · MySQL · Python',
    kind: { nl: 'Full-stack · App', en: 'Full-stack · App' },
    blurb: {
      nl: 'Food-delivery webapp: bestellen, afrekenen en beheer voor de keuken.',
      en: 'Food-delivery web app: ordering, checkout and a kitchen dashboard.',
    },
  },
  {
    name: 'CookUp',
    cat: 'full',
    year: '2025',
    ratio: '1/1',
    color: '#243027',
    stack: 'PHP · MySQL · CRUD',
    kind: { nl: 'Full-stack · CRUD', en: 'Full-stack · CRUD' },
    blurb: {
      nl: 'Receptenplatform met accounts, opslaan en categorieën.',
      en: 'Recipe platform with accounts, saving and categories.',
    },
  },
  {
    name: 'Portfolio v1',
    cat: 'front',
    year: '2024',
    ratio: '3/4',
    color: '#26222c',
    stack: 'HTML · CSS · JS',
    kind: { nl: 'Persoonlijk · Front-end', en: 'Personal · Front-end' },
    blurb: {
      nl: 'Mijn eerste portfolio, waar het bouwen begon.',
      en: 'My first portfolio, where the building began.',
    },
  },
]

export const TECH_COLOR: Record<string, string> = {
  React: '#61dafb',
  TypeScript: '#3178c6',
  HTML: '#e34f26',
  CSS: '#1572b6',
  Vite: '#646cff',
  PHP: '#777bb4',
  MySQL: '#4479a1',
  Python: '#3776ab',
  D3: '#f68e56',
  'Chart.js': '#ff6384',
  SQL: '#336791',
}

export const TECH_SLUG: Record<string, string> = {
  React: 'react',
  TypeScript: 'typescript',
  HTML: 'html5',
  CSS: 'css',
  Vite: 'vite',
  PHP: 'php',
  MySQL: 'mysql',
  Python: 'python',
  D3: 'd3dotjs',
  'Chart.js': 'chartdotjs',
}

export const EMAIL = 'mt.adamsaber@gmail.com'
export const GITHUB = 'https://github.com/adamsaber-mr'
