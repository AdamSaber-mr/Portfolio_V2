import { sx } from '../lib/sx';
import { asset } from '../lib/asset';
import { href } from '../lib/router';
import type { Strings } from '../data';
import type { Page } from '../App';

interface Props {
  s: Strings;
  page: Page;
  isDark: boolean;
  langLabel: string;
  go: (p: Page) => void;
  toggleTheme: () => void;
  toggleLang: () => void;
}

function navStyle(active: boolean): string {
  return `position:relative;cursor:pointer;text-decoration:none;font-weight:${active ? '600' : '500'};color:${active ? 'var(--ink)' : 'var(--muted)'};`;
}

function SunMoon({ isDark }: { isDark: boolean }) {
  return isDark ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  );
}

/**
 * Bovenbalk.
 *
 * Op desktop staan hier de vier paginalinks. Op telefoonformaat verhuizen die
 * naar de tabbalk onderin (zie MobileTabBar); hier blijft dan alleen wat je
 * zelden nodig hebt — taal, thema en het cv — als knoppen van 44px.
 */
export default function Nav({ s, page, isDark, langLabel, go, toggleTheme, toggleLang }: Props) {
  const links: { p: Page; label: string }[] = [
    { p: 'home', label: s.navHome },
    { p: 'work', label: s.navWork },
    { p: 'about', label: s.navAbout },
    { p: 'contact', label: s.navContact },
  ];

  return (
    <header>
      <div style={sx('position:sticky; top:0; z-index:100; backdrop-filter:blur(12px) saturate(150%); -webkit-backdrop-filter:blur(12px) saturate(150%); background:var(--navbg); border-bottom:1px solid var(--line);')}>
        <div className="nav-inner" style={sx('max-width:1440px; margin:0 auto; padding:18px 56px; display:flex; align-items:center; justify-content:space-between; gap:16px;')}>
          <a
            className="nav-logo"
            href={href({ kind: 'home' })}
            onClick={(e) => { e.preventDefault(); go('home'); }}
            style={sx('cursor:pointer; display:flex; align-items:center; gap:11px; text-decoration:none; color:inherit;')}
          >
            <img src={asset('assets/logo-256.png')} alt="" width={40} height={40} style={sx('width:40px; height:40px; border-radius:50%; object-fit:cover; object-position:50% 18%; display:block; border:1px solid var(--line);')} />
            <span style={sx("font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:17px; letter-spacing:-.01em;")}>Adam Saber</span>
          </a>

          {/* paginalinks — op telefoon vervangen door de tabbalk onderin */}
          <nav className="nav-links" aria-label={s.navLabel} style={sx('display:flex; gap:26px; align-items:center; font-size:14px; font-weight:500;')}>
            {links.map((l) => (
              <a
                key={l.p}
                className="navlink"
                href={href({ kind: l.p })}
                onClick={(e) => { e.preventDefault(); go(l.p); }}
                aria-current={page === l.p ? 'page' : undefined}
                style={sx(navStyle(page === l.p))}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-tools" style={sx('display:flex; align-items:center; gap:8px;')}>
            <button
              type="button"
              className="icon-btn"
              onClick={toggleLang}
              aria-label="Taal wisselen / switch language"
              style={sx("font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:600; color:var(--accent); background:transparent; border:1px solid var(--line); border-radius:30px; padding:9px 14px; cursor:pointer;")}
            >
              {langLabel}
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={s.themeToggle}
              style={sx('display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px; background:var(--surface); border:1px solid var(--line); border-radius:11px; color:var(--ink); cursor:pointer;')}
            >
              <SunMoon isDark={isDark} />
            </button>
            <a
              className="btn nav-cv"
              href={asset('assets/cv_adam.pdf')}
              download="CV_Adam_Saber.pdf"
              aria-label={s.cv}
              style={sx('display:inline-flex; align-items:center; justify-content:center; gap:7px; background:var(--surface); color:var(--ink); border:1px solid var(--line); padding:9px 15px; border-radius:11px; font-size:13px; font-weight:600; white-space:nowrap; text-decoration:none;')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span className="cv-label">{s.cv}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
