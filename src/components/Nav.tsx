import { useEffect, useRef, useState } from 'react';
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
  /** Linkerhelft van de dateline: waar je nu bent, bv. `WERK — 04 REVENUE OS`. */
  where: string;
  /** Rechterhelft: het beschikbaarheidsfeit. */
  status: string;
  go: (p: Page) => void;
  toggleTheme: () => void;
  toggleLang: () => void;
}

function SunMoon({ isDark }: { isDark: boolean }) {
  return isDark ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  );
}

/**
 * Masthead + dateline.
 *
 * De dateline is het herkenningspunt van de site: één mono-strook die op elke
 * pagina links vertelt waar je bent en rechts het enige feit draagt waar dit
 * portfolio voor bestaat. Hij staat bewust in de shell en niet in een pagina,
 * zodat hij niet uit de pas kan gaan lopen.
 *
 * Er zit geen pasfoto meer in de balk — een masthead draagt een naam. Het
 * portret verdient zijn plek één keer, in de hero.
 */
export default function Nav({ s, page, isDark, langLabel, where, status, go, toggleTheme, toggleLang }: Props) {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navTo = (p: Page) => { setOpen(false); go(p); };
  const nl = langLabel === 'EN';

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

  // Focus het menu in bij openen en terug naar de hamburger bij sluiten.
  useEffect(() => {
    if (open) {
      menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    } else if (document.activeElement && menuRef.current?.contains(document.activeElement)) {
      burgerRef.current?.focus();
    }
  }, [open]);

  // `inert` haalt het gesloten menu uit de tab-volgorde terwijl het in de DOM
  // blijft, zodat de open-animatie gewoon kan afspelen.
  const inertWhenClosed = (open ? {} : { inert: '' }) as Record<string, string>;

  return (
    <header>
      <div className="masthead">
        <div className="u-page masthead-inner">
          <a
            className="wordmark"
            href={href({ kind: 'home' })}
            onClick={(e) => { e.preventDefault(); navTo('home'); }}
          >
            Adam Saber
          </a>

          <nav className="nav-links" aria-label={s.navLabel}>
            {links.map((l) => (
              <a
                key={l.p}
                className="navlink"
                href={href({ kind: l.p })}
                onClick={(e) => { e.preventDefault(); navTo(l.p); }}
                aria-current={page === l.p ? 'page' : undefined}
              >
                {l.label}
              </a>
            ))}
            <span className="nav-tools">
              <button type="button" className="nav-tool" onClick={toggleLang} aria-label="Taal wisselen / switch language">
                {langLabel}
              </button>
              <button type="button" className="nav-tool" onClick={toggleTheme} aria-label={s.themeToggle}>
                <SunMoon isDark={isDark} />
              </button>
              <a className="nav-tool" href={asset('assets/cv_adam.pdf')} download="CV_Adam_Saber.pdf">
                {s.cv}
              </a>
            </span>
          </nav>

          <button
            ref={burgerRef}
            className={`nav-burger${open ? ' open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={s.menu}
            aria-expanded={open}
            aria-controls="nav-menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {/* De dateline. Scrollt mee — alleen de masthead blijft plakken. */}
      <div className="dateline">
        <div className="u-page dateline-inner">
          <span className="dateline-where">{where}</span>
          <span className="dateline-status">
            <span className="dateline-dot" aria-hidden="true"></span>
            {status}
          </span>
        </div>
      </div>

      <div
        id="nav-menu"
        ref={menuRef}
        className={`nav-menu${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={s.navLabel}
        {...inertWhenClosed}
      >
        <nav className="nav-menu-links" aria-label={s.navLabel}>
          {links.map((l) => (
            <a
              key={l.p}
              className={`nav-mlink${page === l.p ? ' active' : ''}`}
              href={href({ kind: l.p })}
              onClick={(e) => { e.preventDefault(); navTo(l.p); }}
              aria-current={page === l.p ? 'page' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-menu-foot">
          <button type="button" className="nav-menu-btn" onClick={toggleLang}>
            {nl ? 'Taal' : 'Language'}
            <span className="nm-right">{langLabel}</span>
          </button>
          <button type="button" className="nav-menu-btn" onClick={toggleTheme}>
            <SunMoon isDark={isDark} />
            {nl ? 'Thema' : 'Theme'}
          </button>
          <a className="nav-menu-btn" href={asset('assets/cv_adam.pdf')} download="CV_Adam_Saber.pdf" onClick={() => setOpen(false)}>
            <span style={sx('display:inline-flex; align-items:center; gap:var(--s-3);')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              {s.cv}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
