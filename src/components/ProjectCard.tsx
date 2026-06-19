import type { Lang, Project } from '../data/content'

interface ProjectCardProps {
  p: Project
  lang: Lang
  onClick?: () => void
}

export default function ProjectCard({ p, lang, onClick }: ProjectCardProps) {
  return (
    <div
      className="card3d"
      onClick={onClick}
      style={{
        breakInside: 'avoid',
        marginBottom: 20,
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          aspectRatio: p.ratio,
          background: p.color,
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: 14,
            top: 13,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            color: 'rgba(255,255,255,.9)',
            background: 'rgba(0,0,0,.3)',
            padding: '4px 10px',
            borderRadius: 30,
          }}
        >
          {p.kind[lang]}
        </span>
      </div>
      <div style={{ padding: '16px 17px 18px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 10,
          }}
        >
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 17.5,
              fontWeight: 600,
            }}
          >
            {p.name}
          </h3>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: 'var(--faint)',
            }}
          >
            {p.year}
          </span>
        </div>
        <p
          style={{
            fontSize: 13.5,
            color: 'var(--muted)',
            lineHeight: 1.5,
            marginTop: 8,
          }}
        >
          {p.blurb[lang]}
        </p>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--accent)',
            marginTop: 12,
          }}
        >
          {p.stack}
        </div>
      </div>
    </div>
  )
}
