import { sx } from '../lib/sx';
import { href } from '../lib/router';
import type { Strings } from '../data';
import type { Page } from '../App';

interface Props {
  s: Strings;
  page: Page;
  go: (p: Page) => void;
}

/**
 * Vaste tabbalk onderin, alleen op telefoonformaat (zie .tabbar in styles.css).
 *
 * Op een telefoon is de bovenkant van het scherm het minst goed te bereiken, dus
 * verhuist de paginanavigatie naar de duimzone. Daarmee vervalt ook het
 * hamburgermenu: de vier pagina's zijn nu altijd één tik weg, zonder eerst een
 * menu te moeten openen.
 */
export default function MobileTabBar({ s, page, go }: Props) {
  const tabs: { p: Page; label: string; icon: JSX.Element }[] = ([
    {
      p: 'home',
      label: s.navHome,
      icon: <path d="M3 10.5 12 3l9 7.5M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />,
    },
    {
      p: 'work',
      label: s.navWork,
      icon: <><rect x="3" y="4" width="7.5" height="7.5" rx="1.6" /><rect x="13.5" y="4" width="7.5" height="7.5" rx="1.6" /><rect x="3" y="14.5" width="7.5" height="7.5" rx="1.6" /><rect x="13.5" y="14.5" width="7.5" height="7.5" rx="1.6" /></>,
    },
    {
      p: 'about',
      label: s.navAbout,
      icon: <><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20.5c1.1-3.8 4-5.7 7.5-5.7s6.4 1.9 7.5 5.7" /></>,
    },
    {
      p: 'contact',
      label: s.navContact,
      icon: <><rect x="3" y="5" width="18" height="14" rx="2.4" /><path d="m3.8 6.5 8.2 6 8.2-6" /></>,
    },
  ] as { p: Page; label: string; icon: JSX.Element }[]);

  return (
    <nav className="tabbar" aria-label={s.navLabel}>
      {tabs.map((t) => {
        const active = page === t.p;
        return (
          <a
            key={t.p}
            className={`tab${active ? ' active' : ''}`}
            href={href({ kind: t.p })}
            onClick={(e) => { e.preventDefault(); go(t.p); }}
            aria-current={active ? 'page' : undefined}
          >
            <span className="tab-ic" aria-hidden="true">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                {t.icon}
              </svg>
            </span>
            <span style={sx('line-height:1;')}>{t.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
