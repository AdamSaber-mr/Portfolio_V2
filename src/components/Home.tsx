import { useEffect, useState } from 'react';
import { sx } from '../lib/sx';
import { clickable } from '../lib/a11y';
import { asset } from '../lib/asset';
import { PROJECTS, loc, buildCurrently, DISCORD_USER_ID, type Lang, type Strings } from '../data';
import FooterCTA from './FooterCTA';
import TechChips from './TechChips';
import NowPlaying from './NowPlaying';
import type { Page } from '../App';

interface Props {
  s: Strings;
  lang: Lang;
  go: (p: Page) => void;
  openDetail: (name: string) => void;
  dark: boolean;
}

/** Small line icons for the "right now" banner cells. */
function NowIcon({ name }: { name: string }) {
  const c = { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'code': return <svg {...c}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
    case 'book': return <svg {...c}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
    case 'pin': return <svg {...c}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case 'clock': return <svg {...c}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>;
    case 'work': return <svg {...c}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>;
    case 'music': return <svg {...c}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>;
    default: return null;
  }
}

function NowCell({ icon, label, value, accent = false }: { icon: string; label: string; value: string; accent?: boolean }) {
  return (
    <div style={sx('display:flex; align-items:center; gap:12px; min-width:0;')}>
      <span style={sx(`display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:11px; flex:none; ${accent ? 'background:color-mix(in srgb, var(--accent) 16%, transparent); color:var(--accent);' : 'background:var(--card-line); color:var(--card-muted);'}`)}>
        <NowIcon name={icon} />
      </span>
      <div style={sx('display:flex; flex-direction:column; gap:2px; min-width:0;')}>
        <span style={sx("font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.07em; text-transform:uppercase; color:var(--card-faint);")}>{label}</span>
        <span style={sx(`font-family:'Space Grotesk',sans-serif; font-size:16px; font-weight:600; letter-spacing:-.01em; white-space:nowrap; color:${accent ? 'var(--accent)' : 'var(--card-ink)'};`)}>{value}</span>
      </div>
    </div>
  );
}

/** Live local time in Rotterdam; isolated so it re-renders on its own. */
function LocalTime({ lang, label }: { lang: Lang; label: string }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString(lang === 'nl' ? 'nl-NL' : 'en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit' });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 10000);
    return () => clearInterval(id);
  }, [lang]);
  return <NowCell icon="clock" label={label} value={time || '—'} />;
}

interface Status { value: string; icon: string; }

/** Turn a Lanyard presence payload into a short status + icon. */
function deriveStatus(d: any, s: Strings): Status {
  if (!d || d.discord_status === 'offline') return { value: s.curAvailable, icon: 'work' };
  if (d.listening_to_spotify && d.spotify?.song) return { value: `${s.stListening} ${d.spotify.song}`, icon: 'music' };
  const playing = (d.activities || []).filter((a: any) => a.type === 0);
  if (playing.some((a: any) => /code|visual studio/i.test(a.name || ''))) return { value: s.stCoding, icon: 'code' };
  if (playing[0]?.name) return { value: playing[0].name, icon: 'work' };
  return { value: s.curAvailable, icon: 'work' };
}

/** Live Discord presence via Lanyard; falls back to the static "Aan het werk". */
function LiveStatus({ s }: { s: Strings }) {
  const [status, setStatus] = useState<Status>({ value: s.curAvailable, icon: 'work' });
  useEffect(() => {
    if (!DISCORD_USER_ID) { setStatus({ value: s.curAvailable, icon: 'work' }); return; }
    let active = true;
    const load = async () => {
      try {
        const r = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        const j: any = await r.json();
        if (active && j?.success) setStatus(deriveStatus(j.data, s));
      } catch { /* keep last value / fallback */ }
    };
    load();
    const id = setInterval(load, 15000);
    return () => { active = false; clearInterval(id); };
  }, [s]);
  return <NowCell icon={status.icon} label={s.curStatus} value={status.value} accent />;
}

export default function Home({ s, lang, go, openDetail, dark }: Props) {
  const featured = PROJECTS.slice(0, 3).map((p) => loc(p, lang));
  const currently = buildCurrently(s);
  // me_header has a dark backdrop that clashes with light mode; swap to the white version there
  const heroImg = dark ? 'assets/me_header.png' : 'assets/me_white.png';

  return (
    <div data-screen-label="Home" className="pageintro">
      <div className="page-pad" style={sx('max-width:1440px; margin:0 auto; padding:64px 56px 20px; padding-bottom:100px; padding-top:100px;')}>
        <div className="hero-grid" style={sx('display:grid; grid-template-columns:1.05fr .8fr; gap:64px; align-items:center;')}>
          <div data-reveal="" style={sx('position:relative; z-index:2; max-width:760px;')}>
            <h1 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(44px,6vw,82px); line-height:1.02; font-weight:700; letter-spacing:-.03em; pointer-events:auto;")}>
              {s.heroL1}<br />{s.heroL2}<br /><span style={sx('color:var(--accent);')}>{s.heroL3}</span>
            </h1>
            <p style={sx('max-width:440px; font-size:18px; line-height:1.55; color:var(--muted); margin-top:26px; pointer-events:auto;')}>{s.heroBody}</p>
            <div style={sx('display:flex; gap:14px; margin-top:36px; flex-wrap:wrap; pointer-events:auto;')}>
              <span className="btn" {...clickable(() => go('work'))} style={sx('background:var(--accent); color:var(--accentink); padding:14px 24px; border-radius:30px; font-size:15px; font-weight:600;')}>{s.heroCta1}</span>
              <span className="btn" {...clickable(() => go('about'))} style={sx('border:1px solid var(--line); color:var(--ink); padding:13px 23px; border-radius:30px; font-size:15px; font-weight:500;')}>{s.heroCta2}</span>
            </div>
          </div>
          <div data-reveal="" className="hero-photo" style={sx('position:relative; width:100%; max-width:440px; justify-self:end; aspect-ratio:1/1; border-radius:28px; overflow:hidden; border:1px solid var(--line); box-shadow:0 40px 90px -30px var(--shadow); z-index:1;')}>
            <img src={asset(heroImg)} alt="Adam Saber — portret" style={sx('width:100%; height:100%; object-fit:cover; display:block;')} />
            <div style={sx('position:absolute; inset:0; background:linear-gradient(135deg, rgba(139,124,255,.12), transparent 55%); pointer-events:none;')}></div>
          </div>
        </div>
      </div>

      <div className="page-pad" style={sx('max-width:1440px; margin:0 auto; padding:56px 56px 44px;')}>
        <div data-reveal="" style={sx('display:flex; align-items:baseline; justify-content:space-between; margin-bottom:30px;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(26px,3.6vw,46px); font-weight:700; letter-spacing:-.02em;")}>{s.selectedWork}</h2>
          <span className="navlink" {...clickable(() => go('work'))} style={sx("font-family:'JetBrains Mono',monospace; font-size:12px;")}>{s.viewAll} →</span>
        </div>
        <div className="home-cards" style={sx('display:grid; grid-template-columns:repeat(3,1fr); gap:20px;')}>
          {featured.map((p, i) => (
            <div key={i} data-reveal="" className="card3d" {...clickable(() => openDetail(p.name), p.name)} style={sx('display:flex; flex-direction:column; height:100%; background:var(--card); color:var(--card-ink); border:1px solid var(--card-line); border-radius:14px; overflow:hidden; cursor:pointer;')}>
              <div style={sx(`aspect-ratio:16/10; background:${p.color}; position:relative; overflow:hidden;`)}>
                <img src={asset(p.image)} alt={`${p.name} — screenshot`} loading="lazy" style={sx(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:${p.imgPos}; display:block;`)} />
              </div>
              <div style={sx('padding:16px 17px 18px; display:flex; flex-direction:column; flex:1;')}>
                <h3 style={sx("font-family:'Space Grotesk',sans-serif; font-size:17.5px; font-weight:600;")}>{p.name}</h3>
                <p style={sx('font-size:13.5px; color:var(--card-muted); line-height:1.5; margin-top:8px;')}>{p.blurb}</p>
                <div style={sx('margin-top:auto; padding-top:13px;')}><TechChips stack={p.stack} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "Right now" banner between the projects and the music */}
      <div className="page-pad" style={sx('max-width:1440px; margin:0 auto; padding:8px 56px 36px;')}>
        <div className="now-banner" data-reveal="" style={sx('display:flex; align-items:center; justify-content:space-between; gap:32px 44px; flex-wrap:wrap; background:var(--card); color:var(--card-ink); border:1px solid var(--card-line); border-radius:20px; padding:52px 44px;')}>
          <LiveStatus s={s} />
          {currently.map((c, i) => (
            <NowCell key={i} icon={c.icon} label={c.label} value={c.value} />
          ))}
          <LocalTime lang={lang} label={s.curTime} />
        </div>
      </div>

      {/* hairline divider between the status banner and the music section */}
      <div className="page-pad" style={sx('max-width:1440px; margin:0 auto; padding:0 56px;')}>
        <div data-reveal="" style={sx('border-top:1px solid var(--line);')}></div>
      </div>

      <NowPlaying s={s} />

      <FooterCTA s={s} maxw={1440} goContact={() => go('contact')} />
    </div>
  );
}
