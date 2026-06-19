import type { Lang, Strings, Project } from '../data/content'
import type { Page } from '../components/Nav'
import Gem3D from '../components/Gem3D'
import ProjectCard from '../components/ProjectCard'
import FooterCTA from '../components/FooterCTA'

interface HomeProps {
  s: Strings
  lang: Lang
  dark: boolean
  projects: Project[]
  go: (p: Page) => void
}

export default function Home({ s, lang, dark, projects, go }: HomeProps) {
  const featured = projects.slice(0, 6)
  return (
    <div>
      <div
        className="page-pad"
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '48px 56px 20px',
          position: 'relative',
        }}
      >
        <Gem3D dark={dark} />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 760,
            padding: '46px 0 70px',
            pointerEvents: 'none',
          }}
        >
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(44px,7vw,92px)',
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: '-.03em',
              pointerEvents: 'auto',
            }}
          >
            {s.heroL1}
            <br />
            {s.heroL2}
            <br />
            <span style={{ color: 'var(--accent)' }}>{s.heroL3}</span>
          </h1>
          <p
            style={{
              maxWidth: 440,
              fontSize: 18,
              lineHeight: 1.55,
              color: 'var(--muted)',
              marginTop: 26,
              pointerEvents: 'auto',
            }}
          >
            {s.heroBody}
          </p>
          <div
            style={{
              display: 'flex',
              gap: 14,
              marginTop: 36,
              flexWrap: 'wrap',
              pointerEvents: 'auto',
            }}
          >
            <button
              className="btn"
              onClick={() => go('work')}
              style={{
                background: 'var(--accent)',
                color: 'var(--accentink)',
                padding: '14px 24px',
                borderRadius: 30,
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {s.heroCta1}
            </button>
            <button
              className="btn"
              onClick={() => go('about')}
              style={{
                border: '1px solid var(--line)',
                background: 'transparent',
                color: 'var(--ink)',
                padding: '13px 23px',
                borderRadius: 30,
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {s.heroCta2}
            </button>
          </div>
        </div>
      </div>

      {/* selected work */}
      <div
        className="page-pad"
        style={{ maxWidth: 1440, margin: '0 auto', padding: '40px 56px 40px' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}
        >
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(26px,3.6vw,46px)',
              fontWeight: 700,
              letterSpacing: '-.02em',
            }}
          >
            {s.selectedWork}
          </h2>
          <button
            className="navlink"
            onClick={() => go('work')}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
          >
            {s.viewAll} →
          </button>
        </div>
        <div className="cards-cols" style={{ columns: 3, columnGap: 20 }}>
          {featured.map((p, i) => (
            <ProjectCard key={p.name} p={p} lang={lang} index={i} onClick={() => go('work')} />
          ))}
        </div>
      </div>

      <FooterCTA s={s} maxw={1440} goContact={() => go('contact')} />
    </div>
  )
}
