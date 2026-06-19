import type { Strings } from '../data/content'
import { EMAIL, GITHUB } from '../data/content'

interface FooterCTAProps {
  s: Strings
  maxw: number
  goContact: () => void
}

export default function FooterCTA({ s, maxw, goContact }: FooterCTAProps) {
  return (
    <div style={{ borderTop: '1px solid var(--line)', marginTop: 40 }}>
      <div
        className="page-pad"
        style={{ maxWidth: maxw, margin: '0 auto', padding: '70px 56px' }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px,5.5vw,68px)',
            fontWeight: 700,
            letterSpacing: '-.03em',
            lineHeight: 1,
            color: 'var(--ink)',
          }}
        >
          {s.contactTitle}
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 32,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="btn"
            onClick={goContact}
            style={{
              background: 'var(--accent)',
              color: 'var(--accentink)',
              padding: '15px 26px',
              borderRadius: 30,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {s.contactKicker} →
          </button>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: 'var(--muted)',
              textDecoration: 'none',
            }}
          >
            {EMAIL}
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: 'var(--muted)',
              textDecoration: 'none',
            }}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  )
}
