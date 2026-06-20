import { useEffect, useState } from 'react';
import { sx } from '../lib/sx';
import { clickable } from '../lib/a11y';
import { asset } from '../lib/asset';
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
  return `position:relative;cursor:pointer;font-weight:${active ? '600' : '500'};color:${active ? 'var(--ink)' : 'var(--muted)'};`;
}

function SunMoon({ isDark }: { isDark: boolean }) {
  return isDark ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  );
}

export default function Nav({ s, page, isDark, langLabel, go, toggleTheme, toggleLang }: Props) {
  const [open, setOpen] = useState(false);
  const navTo = (p: Page) => { setOpen(false); go(p); };

  const links: { p: Page; label: string }[] = [
    { p: 'home', label: s.navHome },
    { p: 'work', label: s.navWork },
    { p: 'about', label: s.navAbout },
    { p: 'contact', label: s.navContact },
  ];

  // lock body scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
    <div style={sx('position:sticky; top:0; z-index:100; backdrop-filter:blur(20px) saturate(160%); -webkit-backdrop-filter:blur(20px) saturate(160%); background:var(--navbg); border-bottom:1px solid var(--line);')}>
      <div className="nav-inner" style={sx('max-width:1440px; margin:0 auto; padding:18px 56px; display:flex; align-items:center; justify-content:space-between; gap:16px;')}>
        <div {...clickable(() => navTo('home'), 'Adam Saber, naar home')} style={sx('cursor:pointer; display:flex; align-items:center; gap:11px;')}>
          <img src={asset('assets/logo.png')} alt="Adam Saber" style={sx('width:40px; height:40px; border-radius:50%; object-fit:cover; object-position:50% 18%; display:block; border:1px solid var(--line);')} />
          <span style={sx("font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:17px; letter-spacing:-.01em;")}>Adam Saber</span>
        </div>

        {/* desktop links */}
        <div className="nav-links" style={sx('display:flex; gap:26px; align-items:center; font-size:14px; font-weight:500;')}>
          {links.map((l) => (
            <span key={l.p} className="navlink" style={sx(navStyle(page === l.p))} {...clickable(() => navTo(l.p))}>{l.label}</span>
          ))}
          <div style={sx('display:flex; align-items:center; gap:8px; padding-left:6px;')}>
            <span className="icon-btn" {...clickable(toggleLang, 'Taal wisselen / switch language')} style={sx("font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:500; color:var(--accent); border:1px solid var(--line); border-radius:30px; padding:6px 11px;")}>
              {langLabel}
            </span>
            <span className="icon-btn" {...clickable(toggleTheme, 'Thema wisselen')} title="Thema" style={sx('display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; background:var(--surface); border:1px solid var(--line); border-radius:11px; color:var(--ink);')}>
              <SunMoon isDark={isDark} />
            </span>
            <span className="btn nav-cv" {...clickable(() => navTo('contact'))} style={sx('display:inline-flex; align-items:center; gap:7px; background:var(--surface); color:var(--ink); border:1px solid var(--line); padding:8px 15px; border-radius:11px; font-size:13px; font-weight:600; white-space:nowrap;')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              {s.cv}
            </span>
          </div>
        </div>

        {/* mobile hamburger */}
        <button
          className={`nav-burger${open ? ' open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

      {/* mobile fullscreen menu — kept outside the backdrop-filtered bar so it can be full-viewport */}
      <div className={`nav-menu${open ? ' open' : ''}`} role="dialog" aria-modal="true">
        <div className="nav-menu-links">
          {links.map((l) => (
            <span key={l.p} className={`nav-mlink${page === l.p ? ' active' : ''}`} {...clickable(() => navTo(l.p))}>{l.label}</span>
          ))}
        </div>
        <div className="nav-menu-foot">
          <span className="icon-btn" {...clickable(toggleLang, 'Taal wisselen / switch language')} style={sx("font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:500; color:var(--accent); border:1px solid var(--line); border-radius:30px; padding:9px 15px;")}>
            {langLabel}
          </span>
          <span className="icon-btn" {...clickable(toggleTheme, 'Thema wisselen')} style={sx('display:inline-flex; align-items:center; justify-content:center; width:42px; height:42px; background:var(--surface); border:1px solid var(--line); border-radius:12px; color:var(--ink);')}>
            <SunMoon isDark={isDark} />
          </span>
          <span className="btn" {...clickable(() => navTo('contact'))} style={sx('display:inline-flex; align-items:center; gap:8px; background:var(--surface); color:var(--ink); border:1px solid var(--line); padding:11px 18px; border-radius:12px; font-size:14px; font-weight:600;')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            {s.cv}
          </span>
        </div>
      </div>
    </>
  );
}
