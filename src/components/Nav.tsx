import type { CSSProperties } from 'react'
import type { Lang, Strings } from '../data/content'
import { SunIcon, MoonIcon, DownloadIcon } from './Icons'

export type Page = 'home' | 'work' | 'about' | 'contact'

interface NavProps {
  s: Strings
  page: Page
  dark: boolean
  lang: Lang
  go: (p: Page) => void
  toggleTheme: () => void
  toggleLang: () => void
}

function navStyle(active: boolean): CSSProperties {
  return {
    position: 'relative',
    cursor: 'pointer',
    fontWeight: active ? 600 : 500,
    color: active ? 'var(--ink)' : 'var(--muted)',
  }
}

function navClass(active: boolean): string {
  return `navlink nav-link-text${active ? ' is-active' : ''}`
}

export default function Nav({
  s,
  page,
  dark,
  lang,
  go,
  toggleTheme,
  toggleLang,
}: NavProps) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'var(--navbg)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '18px 56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div
          onClick={() => go('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11 }}
        >
          <img
            src="/assets/logo.png"
            alt="Adam Saber"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: '50% 18%',
              display: 'block',
              border: '1px solid var(--line)',
            }}
          />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: '-.01em',
            }}
          >
            Adam Saber
          </span>
        </div>

        <div
          className="nav-links"
          style={{
            display: 'flex',
            gap: 26,
            alignItems: 'center',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <button
            className={navClass(page === 'home')}
            style={navStyle(page === 'home')}
            onClick={() => go('home')}
          >
            {s.navHome}
          </button>
          <button
            className={navClass(page === 'work')}
            style={navStyle(page === 'work')}
            onClick={() => go('work')}
          >
            {s.navWork}
          </button>
          <button
            className={navClass(page === 'about')}
            style={navStyle(page === 'about')}
            onClick={() => go('about')}
          >
            {s.navAbout}
          </button>
          <button
            className={navClass(page === 'contact')}
            style={navStyle(page === 'contact')}
            onClick={() => go('contact')}
          >
            {s.navContact}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 6 }}>
            <button
              className="icon-btn"
              onClick={toggleLang}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--accent)',
                border: '1px solid var(--line)',
                borderRadius: 30,
                padding: '6px 11px',
              }}
            >
              {lang === 'nl' ? 'EN' : 'NL'}
            </button>
            <button
              className="icon-btn"
              onClick={toggleTheme}
              title="Thema"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34,
                height: 34,
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 11,
                color: 'var(--ink)',
              }}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              className="btn"
              onClick={() => go('contact')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                background: 'var(--surface)',
                color: 'var(--ink)',
                border: '1px solid var(--line)',
                padding: '8px 15px',
                borderRadius: 11,
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              <DownloadIcon />
              {s.cv}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
