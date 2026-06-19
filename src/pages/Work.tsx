import type { CSSProperties } from 'react'
import type { Lang, Strings, Project, Category } from '../data/content'
import type { Page } from '../components/Nav'
import ProjectCard from '../components/ProjectCard'
import FooterCTA from '../components/FooterCTA'

type Filter = 'all' | Category

interface WorkProps {
  s: Strings
  lang: Lang
  projects: Project[]
  filter: Filter
  setFilter: (f: Filter) => void
  go: (p: Page) => void
}

function filterStyle(active: boolean): CSSProperties {
  return {
    fontSize: 12,
    padding: '8px 15px',
    borderRadius: 30,
    cursor: 'pointer',
    border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
    background: active ? 'var(--accent)' : 'transparent',
    color: active ? 'var(--accentink)' : 'var(--muted)',
  }
}

export default function Work({
  s,
  lang,
  projects,
  filter,
  setFilter,
  go,
}: WorkProps) {
  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: s.fAll },
    { key: 'front', label: s.fFront },
    { key: 'full', label: s.fFull },
    { key: 'data', label: s.fData },
  ]
  const visible =
    filter === 'all' ? projects : projects.filter((p) => p.cat === filter)

  return (
    <div>
      <div
        className="page-pad"
        style={{ maxWidth: 1440, margin: '0 auto', padding: '56px 56px 10px' }}
      >
        <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: 36 }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(40px,6vw,80px)',
              lineHeight: 0.98,
              fontWeight: 700,
              letterSpacing: '-.03em',
            }}
          >
            {s.workTitle}
          </h1>
          <p
            style={{
              maxWidth: 460,
              fontSize: 17,
              lineHeight: 1.55,
              color: 'var(--muted)',
              marginTop: 20,
            }}
          >
            {s.workBody}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            padding: '26px 0 30px',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              className="btn"
              onClick={() => setFilter(f.key)}
              style={filterStyle(filter === f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* key by filter so the stagger replays each time the set changes */}
        <div key={filter} className="cards-cols" style={{ columns: 3, columnGap: 20 }}>
          {visible.map((p, i) => (
            <ProjectCard key={p.name} p={p} lang={lang} index={i} />
          ))}
        </div>
      </div>
      <FooterCTA s={s} maxw={1440} goContact={() => go('contact')} />
    </div>
  )
}
