import { sx } from '../lib/sx';
import { clickable } from '../lib/a11y';
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

export default function Nav({ s, page, isDark, langLabel, go, toggleTheme, toggleLang }: Props) {
  return (
    <div style={sx('position:sticky; top:0; z-index:100; backdrop-filter:blur(20px) saturate(160%); -webkit-backdrop-filter:blur(20px) saturate(160%); background:var(--navbg); border-bottom:1px solid var(--line);')}>
      <div className="nav-inner" style={sx('max-width:1440px; margin:0 auto; padding:18px 56px; display:flex; align-items:center; justify-content:space-between; gap:16px;')}>
        <div {...clickable(() => go('home'), 'Adam Saber, naar home')} style={sx('cursor:pointer; display:flex; align-items:center; gap:11px;')}>
          <img src="/assets/logo.png" alt="Adam Saber" style={sx('width:40px; height:40px; border-radius:50%; object-fit:cover; object-position:50% 18%; display:block; border:1px solid var(--line);')} />
          <span style={sx("font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:17px; letter-spacing:-.01em;")}>Adam Saber</span>
        </div>
        <div className="nav-links" style={sx('display:flex; gap:26px; align-items:center; font-size:14px; font-weight:500;')}>
          <span className="navlink" style={sx(navStyle(page === 'home'))} {...clickable(() => go('home'))}>{s.navHome}</span>
          <span className="navlink" style={sx(navStyle(page === 'work'))} {...clickable(() => go('work'))}>{s.navWork}</span>
          <span className="navlink" style={sx(navStyle(page === 'about'))} {...clickable(() => go('about'))}>{s.navAbout}</span>
          <span className="navlink" style={sx(navStyle(page === 'contact'))} {...clickable(() => go('contact'))}>{s.navContact}</span>
          <div style={sx('display:flex; align-items:center; gap:8px; padding-left:6px;')}>
            <span className="icon-btn" {...clickable(toggleLang, 'Taal wisselen / switch language')} style={sx("font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:500; color:var(--accent); border:1px solid var(--line); border-radius:30px; padding:6px 11px;")}>
              {langLabel}
            </span>
            <span className="icon-btn" {...clickable(toggleTheme, 'Thema wisselen')} title="Thema" style={sx('display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; background:var(--surface); border:1px solid var(--line); border-radius:11px; color:var(--ink);')}>
              {isDark ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </span>
            <span className="btn nav-cv" {...clickable(() => go('contact'))} style={sx('display:inline-flex; align-items:center; gap:7px; background:var(--surface); color:var(--ink); border:1px solid var(--line); padding:8px 15px; border-radius:11px; font-size:13px; font-weight:600; white-space:nowrap;')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              {s.cv}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
