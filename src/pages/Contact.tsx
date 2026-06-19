import { useState } from 'react'
import type { Lang, Strings } from '../data/content'
import { EMAIL, GITHUB } from '../data/content'

interface ContactProps {
  s: Strings
  lang: Lang
}

export default function Contact({ s, lang }: ContactProps) {
  const [fName, setName] = useState('')
  const [fEmail, setEmail] = useState('')
  const [fSubject, setSubject] = useState('')
  const [fMsg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

  const submit = () => {
    const subj = encodeURIComponent(
      fSubject || ((lang === 'nl' ? 'Bericht van ' : 'Message from ') + (fName || 'portfolio'))
    )
    const body = encodeURIComponent(
      (fMsg || '') + '\n\n' + (fName || '') + (fEmail ? ` (${fEmail})` : '')
    )
    window.location.href = `mailto:${EMAIL}?subject=${subj}&body=${body}`
    setSent(true)
  }

  const contactLinks = [
    { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
    { label: 'GitHub', value: 'adamsaber-mr', href: GITHUB },
    { label: 'LinkedIn', value: 'Adam Saber', href: '#' },
    { label: lang === 'nl' ? 'Locatie' : 'Location', value: 'Rotterdam, NL', href: '#' },
  ]

  const labelStyle = {
    display: 'block',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '.1em',
    textTransform: 'uppercase' as const,
    color: 'var(--faint)',
    marginBottom: 9,
  }
  const inputStyle = {
    width: '100%',
    padding: '13px 14px',
    background: 'var(--bg)',
    border: '1px solid var(--line)',
    borderRadius: 8,
    fontSize: 15,
    color: 'var(--ink)',
  }

  return (
    <div
      className="page-pad"
      style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '48px 56px',
        minHeight: 'calc(100vh - 74px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        className="contact-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(38px,6vw,72px)',
              lineHeight: 1.0,
              fontWeight: 700,
              letterSpacing: '-.03em',
            }}
          >
            {s.contactTitle}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--muted)', marginTop: 22, maxWidth: 380 }}>
            {s.contactBody}
          </p>
          <div style={{ marginTop: 36 }}>
            {contactLinks.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '16px 0',
                  borderTop: '1px solid var(--line)',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--faint)',
                  }}
                >
                  {c.label}
                </span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{c.value} ↗</span>
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 14,
            padding: 30,
          }}
        >
          {sent ? (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 34, marginBottom: 14, color: 'var(--accent)' }}>✓</div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 22,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {s.sentTitle}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--muted)' }}>{s.sentBody}</p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                <div>
                  <label style={labelStyle}>{s.fName}</label>
                  <input
                    value={fName}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={s.phName}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{s.fEmail}</label>
                  <input
                    value={fEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={s.phEmail}
                    style={inputStyle}
                  />
                </div>
              </div>
              <label style={labelStyle}>{s.fSubject}</label>
              <input
                value={fSubject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={s.phSubject}
                style={{ ...inputStyle, marginBottom: 18 }}
              />
              <label style={labelStyle}>{s.fMsg}</label>
              <textarea
                value={fMsg}
                onChange={(e) => setMsg(e.target.value)}
                rows={5}
                placeholder={s.phMsg}
                style={{ ...inputStyle, resize: 'vertical', marginBottom: 20 }}
              />
              <button
                className="btn"
                onClick={submit}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  background: 'var(--accent)',
                  color: 'var(--accentink)',
                  padding: 15,
                  borderRadius: 30,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {s.send} →
              </button>
              <p
                style={{
                  fontSize: 12.5,
                  color: 'var(--faint)',
                  lineHeight: 1.5,
                  textAlign: 'center',
                  marginTop: 14,
                }}
              >
                {s.formNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
