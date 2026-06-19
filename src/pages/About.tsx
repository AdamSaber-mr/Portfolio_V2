import type { Lang, Strings } from '../data/content'
import type { Page } from '../components/Nav'
import { TECH_COLOR, TECH_SLUG } from '../data/content'
import FooterCTA from '../components/FooterCTA'

interface AboutProps {
  s: Strings
  lang: Lang
  go: (p: Page) => void
}

const JCOL = ['#e34f26', '#f7df1e', '#777bb4', '#61dafb', '#8b7cff']

// Relative luminance test → black or white text on a colored chip.
function txtOn(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return L > 0.6 ? '#0a0b0d' : '#ffffff'
}

function buildWavePath(): string {
  let p = 'M 0 60'
  for (let wx = 8; wx <= 1000; wx += 8) {
    const wy = 60 - 20 * Math.sin((2 * Math.PI * wx) / 400)
    p += ' L ' + wx + ' ' + wy.toFixed(1)
  }
  return p
}

export default function About({ s, lang, go }: AboutProps) {
  const nl = lang === 'nl'

  const facts = [
    { k: nl ? 'Leeftijd' : 'Age', v: '18' },
    { k: nl ? 'Locatie' : 'Location', v: 'Rotterdam, NL' },
    { k: nl ? 'Opleiding' : 'Education', v: 'Grafisch Lyceum R’dam' },
    { k: nl ? 'Focus' : 'Focus', v: 'Full-stack' },
    { k: nl ? 'Talen' : 'Languages', v: 'NL · EN · AR' },
  ]

  const journeyBase = nl
    ? [
        { phase: 'Start', title: 'HTML & CSS', body: 'Eerste statische sites en de basis van het web.' },
        { phase: '01', title: 'JavaScript', body: 'Interactie, DOM en logica in de browser.' },
        { phase: '02', title: 'PHP & MySQL', body: 'Back-end, databases en CRUD-applicaties.' },
        { phase: '03', title: 'React & TypeScript', body: 'Moderne component-gedreven front-ends.' },
        { phase: 'Nu', title: 'Stage zoeken', body: 'Klaar om mee te bouwen in een echt team.' },
      ]
    : [
        { phase: 'Start', title: 'HTML & CSS', body: 'First static sites and the basics of the web.' },
        { phase: '01', title: 'JavaScript', body: 'Interaction, the DOM and logic in the browser.' },
        { phase: '02', title: 'PHP & MySQL', body: 'Back-end, databases and CRUD applications.' },
        { phase: '03', title: 'React & TypeScript', body: 'Modern component-driven front-ends.' },
        { phase: 'Now', title: 'Seeking internship', body: 'Ready to contribute in a real team.' },
      ]

  const journey = journeyBase.map((j, i) => ({
    ...j,
    color: JCOL[i] || '#8b7cff',
    num: String(i + 1),
    xPct: 10 + i * 20,
    top: (i % 2 === 0 ? 40 : 80) - 23,
  }))

  const wavePath = buildWavePath()

  const skillsBase = [
    {
      area: 'Front-end',
      tag: 'UI',
      items: ['React', 'TypeScript', 'HTML', 'CSS', 'Vite'],
      note: nl
        ? 'Interfaces voor RapidCars en Luxora gebouwd.'
        : 'Built the interfaces for RapidCars and Luxora.',
    },
    {
      area: 'Back-end',
      tag: 'Server',
      items: ['PHP', 'MySQL', 'Python'],
      note: nl
        ? 'Full-stack apps zoals Yume Ramen en CookUp.'
        : 'Full-stack apps like Yume Ramen and CookUp.',
    },
    {
      area: 'Data & viz',
      tag: 'Insight',
      items: ['D3', 'Chart.js', 'SQL'],
      note: nl
        ? 'Dashboards zoals Nike Business Anatomy.'
        : 'Dashboards such as Nike Business Anatomy.',
    },
    {
      area: nl ? 'Werkwijze' : 'Way of working',
      tag: 'Soft',
      items: ['Teamwork', nl ? 'Communicatie' : 'Communication', nl ? 'Doorzetten' : 'Persistence'],
      note: nl
        ? 'Probleemoplosser die blijft sleutelen tot het klopt.'
        : 'A problem solver who keeps going until it is right.',
    },
  ]

  const skills = skillsBase.map((g) => ({
    area: g.area,
    tag: g.tag,
    note: g.note,
    color: TECH_COLOR[g.items[0]] || '#8b7cff',
    chips: g.items.map((it) => {
      const c = TECH_COLOR[it] || '#8b7cff'
      const tx = txtOn(c)
      const slug = TECH_SLUG[it]
      const icon = slug
        ? `https://cdn.simpleicons.org/${slug}/${tx.replace('#', '')}`
        : ''
      return { label: it, hasIcon: !!slug, icon, c, tx }
    }),
  }))

  return (
    <div>
      <div
        className="page-pad"
        style={{ maxWidth: 1320, margin: '0 auto', padding: '56px 56px 10px' }}
      >
        {/* header statement */}
        <div style={{ borderBottom: '1px solid var(--line)', padding: '6px 0 44px' }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(34px,5vw,62px)',
              lineHeight: 1.04,
              fontWeight: 700,
              letterSpacing: '-.03em',
              maxWidth: 780,
            }}
          >
            {s.aboutTitle}
          </h1>
        </div>

        {/* bio + at a glance */}
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr .72fr',
            gap: 64,
            alignItems: 'start',
            borderBottom: '1px solid var(--line)',
            padding: '48px 0 56px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--ink)' }}>{s.aboutP1}</p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--muted)' }}>{s.aboutP2}</p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--muted)' }}>{s.aboutP3}</p>
          </div>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 16,
              padding: '8px 28px 18px',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--faint)',
                padding: '22px 0 8px',
              }}
            >
              {s.atAGlance}
            </div>
            {facts.map((f) => (
              <div
                key={f.k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '14px 0',
                  borderTop: '1px solid var(--line2)',
                  fontSize: 14.5,
                }}
              >
                <span style={{ color: 'var(--faint)' }}>{f.k}</span>
                <span style={{ fontWeight: 600, textAlign: 'right' }}>{f.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* journey */}
        <div style={{ padding: '54px 0', borderBottom: '1px solid var(--line)' }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(24px,3.4vw,40px)',
              fontWeight: 700,
              letterSpacing: '-.02em',
              marginBottom: 38,
            }}
          >
            {s.journeyTitle}
          </h2>
          <div style={{ position: 'relative' }}>
            <div className="journey-row" style={{ position: 'relative', height: 120 }}>
              <svg
                viewBox="0 0 1000 120"
                preserveAspectRatio="none"
                style={{ position: 'absolute', inset: 0, width: '100%', height: 120, overflow: 'visible' }}
              >
                <defs>
                  <linearGradient id="jgrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#e34f26" />
                    <stop offset="0.25" stopColor="#f7df1e" />
                    <stop offset="0.5" stopColor="#777bb4" />
                    <stop offset="0.75" stopColor="#61dafb" />
                    <stop offset="1" stopColor="#8b7cff" />
                  </linearGradient>
                </defs>
                <path
                  d={wavePath}
                  pathLength={1000}
                  fill="none"
                  stroke="url(#jgrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.35"
                />
                <path
                  className="jwave-pulse"
                  d={wavePath}
                  pathLength={1000}
                  fill="none"
                  stroke="url(#jgrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              {journey.map((j) => (
                <div
                  key={j.num}
                  className="jnode"
                  style={
                    {
                      '--c': j.color,
                      position: 'absolute',
                      left: `calc(${j.xPct}% - 23px)`,
                      top: j.top,
                    } as React.CSSProperties
                  }
                >
                  {j.num}
                </div>
              ))}
            </div>
            <div
              className="journey-list"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, marginTop: 20 }}
            >
              {journey.map((j) => (
                <div key={j.num} className="jstep" style={{ textAlign: 'center', padding: '0 12px' }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: j.color,
                      marginBottom: 8,
                    }}
                  >
                    {j.phase}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      marginBottom: 6,
                    }}
                  >
                    {j.title}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{j.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* skills */}
        <div style={{ padding: '54px 0 30px' }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(24px,3.4vw,40px)',
              fontWeight: 700,
              letterSpacing: '-.02em',
              marginBottom: 8,
            }}
          >
            {s.skillsTitle}
          </h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 14, maxWidth: 520 }}>
            {s.skillsBody}
          </p>
          <div>
            {skills.map((g) => (
              <div
                key={g.area}
                className="skill-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '.4fr 1fr',
                  gap: 32,
                  padding: '28px 0',
                  borderTop: '1px solid var(--line)',
                  alignItems: 'start',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 21,
                      fontWeight: 600,
                      letterSpacing: '-.01em',
                    }}
                  >
                    {g.area}
                  </h3>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10.5,
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--faint)',
                      marginTop: 7,
                    }}
                  >
                    {g.tag}
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 14 }}>
                    {g.chips.map((c) => (
                      <span
                        key={c.label}
                        className="jchip"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 7,
                          padding: '7px 13px',
                          borderRadius: 9,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 12.5,
                          fontWeight: 600,
                          border: `1px solid ${c.c}`,
                          background: c.c,
                          color: c.tx,
                        }}
                      >
                        {c.hasIcon && (
                          <img src={c.icon} alt="" style={{ width: 14, height: 14, display: 'block' }} />
                        )}
                        {c.label}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 520 }}>
                    {g.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterCTA s={s} maxw={1320} goContact={() => go('contact')} />
    </div>
  )
}
