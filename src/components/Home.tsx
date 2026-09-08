import { useEffect, useState } from 'react';
import { sx } from '../lib/sx';
import Img from './Img';
import ProjectIndex from './ProjectIndex';
import NowPlaying from './NowPlaying';
import { href } from '../lib/router';
import {
  PROJECTS, loc, buildCurrently, buildStage, buildContactLinks, CONTACT_EMAIL,
  DISCORD_USER_ID, type Lang, type Strings,
} from '../data';
import type { Page } from '../App';

interface Props {
  s: Strings;
  lang: Lang;
  go: (p: Page) => void;
  openDetail: (slug: string) => void;
  dark: boolean;
}

/** Het project dat groot wordt uitgelicht. Bewust bij naam, niet op index. */
const LEAD_SLUG = 'revenue-os';

/** Live lokale tijd in Rotterdam; los component zodat het de rest niet hertekent. */
function LocalTime({ lang }: { lang: Lang }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString(lang === 'nl' ? 'nl-NL' : 'en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit' });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, [lang]);
  return <>{time || '—'}</>;
}

/** Zet een Lanyard-presence om naar één korte statusregel. */
function deriveStatus(d: any, s: Strings): string {
  if (!d || d.discord_status === 'offline') return s.curAvailable;
  if (d.listening_to_spotify && d.spotify?.song) return `${s.stListening} ${d.spotify.song}`;
  const playing = (d.activities || []).filter((a: any) => a.type === 0);
  if (playing.some((a: any) => /code|visual studio/i.test(a.name || ''))) return s.stCoding;
  return playing[0]?.name || s.curAvailable;
}

function LiveStatus({ s }: { s: Strings }) {
  const [status, setStatus] = useState(s.curAvailable);
  useEffect(() => {
    if (!DISCORD_USER_ID) return;
    let active = true;
    const load = async () => {
      try {
        const r = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        const j: any = await r.json();
        if (active && j?.success) setStatus(deriveStatus(j.data, s));
      } catch { /* houd de vorige waarde */ }
    };
    load();
    const id = setInterval(load, 30000);
    return () => { active = false; clearInterval(id); };
  }, [s]);
  return <>{status}</>;
}

export default function Home({ s, lang, go, openDetail, dark }: Props) {
  const all = PROJECTS.map((p) => loc(p, lang));
  const lead = all.find((p) => p.slug === LEAD_SLUG) ?? all[0];
  const rest = all.filter((p) => p.slug !== lead.slug);
  const currently = buildCurrently(s);
  const stage = buildStage(lang);
  const links = buildContactLinks(lang);

  // De bestandsnamen zijn misleidend: `me_header` is de opname op een gebroken-witte
  // studioachtergrond, `me_white` die op zwart. Op papier willen we de eerste,
  // omdat de studioachtergrond dan bijna naadloos in de pagina overloopt.
  const heroImg = dark ? 'assets/me_white' : 'assets/me_header';

  return (
    <div className="pageintro">
      <div className="u-page">

        {/* ---------- opening ---------- */}
        <section style={sx('padding-top:var(--page-top);')}>
          <div className="hero-grid">
            <div data-reveal="">
              <p style={sx('font-family:var(--font-mono); font-size:var(--t-label); letter-spacing:var(--ls-label); text-transform:uppercase; color:var(--ink-3);')}>
                {s.heroKicker}
              </p>

              {/* Eén doorlopende zin die zelf afbreekt. De harde <br>'s zijn weg —
                  die braken op elke telefoon. Nadruk komt van cursief, niet van kleur. */}
              <h1 style={sx('font-family:var(--font-display); font-size:var(--t-display); line-height:var(--lh-display); letter-spacing:var(--ls-display); font-weight:var(--w-body); margin-top:var(--s-6); max-width:16ch;')}>
                {s.heroL1} {s.heroL2} <em style={sx('color:var(--accent);')}>{s.heroL3}</em>
              </h1>

              <p className="u-measure-tight" style={sx('font-size:var(--t-lede); line-height:var(--lh-body); color:var(--ink-2); margin-top:var(--s-6);')}>
                {s.heroBody}
              </p>

              <div style={sx('display:flex; gap:var(--s-6); flex-wrap:wrap; margin-top:var(--s-7);')}>
                <a className="rule-link rule-link--accent" href={href({ kind: 'work' })} onClick={(e) => { e.preventDefault(); go('work'); }}>
                  {s.heroCta1} →
                </a>
                <a className="rule-link" href={href({ kind: 'contact' })} onClick={(e) => { e.preventDefault(); go('contact'); }}>
                  {s.navContact} →
                </a>
              </div>
            </div>

            {/* Het portret als tijdschriftplaat: kleiner dan verwacht, met een
                onderschrift. Geen tweede kolom van de hero, maar een plaat die
                ernaast ligt. */}
            <figure className="hero-photo" data-reveal="" style={sx('margin:0; align-self:start;')}>
              <span className="plate" style={sx('display:block;')}>
                <span className="plate-window" style={sx('display:block; aspect-ratio:4/5;')}>
                  <Img src={heroImg} alt={s.altPortrait} priority style={sx('position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 22%; display:block;')} />
                </span>
              </span>
              <figcaption className="plate-caption">Adam Saber, Rotterdam — 2026</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- 01 · uitgelicht werk ---------- */}
        <section className="u-section">
          <hr className="u-rule" />
          <div className="sec-head">
            <h2>§ 01 — {s.selectedWork}</h2>
            <a className="sec-link" href={href({ kind: 'work' })} onClick={(e) => { e.preventDefault(); go('work'); }}>
              {s.allProjects} →
            </a>
          </div>

          <div className="feature" data-reveal="">
            <a
              href={href({ kind: 'project', slug: lead.slug })}
              onClick={(e) => { e.preventDefault(); openDetail(lead.slug); }}
              style={sx('display:block; text-decoration:none; color:inherit;')}
            >
              <span className="plate">
                <span className="plate-window" style={sx('display:block;')}>
                  <Img src={lead.image} alt={`${lead.name} — ${s.altShot}`} priority style={sx(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:${lead.imgPos}; display:block;`)} />
                </span>
              </span>
              <span className="plate-caption">{lead.name} — {lead.blurb}</span>
            </a>

            <div>
              <div className="feature-num">01</div>
              <h3 className="feature-name">{lead.name}</h3>
              <p className="feature-blurb">{lead.blurb}</p>
              <dl className="feature-meta">
                <dt>{s.pdYear}</dt><dd>{lead.year}</dd>
                <dt>{s.pdRole}</dt><dd>{lead.role}</dd>
                <dt>{s.pdStack}</dt><dd>{lead.stack}</dd>
              </dl>
              <div style={sx('margin-top:var(--s-6);')}>
                <a className="rule-link" href={href({ kind: 'project', slug: lead.slug })} onClick={(e) => { e.preventDefault(); openDetail(lead.slug); }}>
                  {s.readCase} →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 02 · de index ---------- */}
        <section className="u-section">
          <hr className="u-rule" />
          <div className="sec-head">
            <h2>§ 02 — {s.secIndex}</h2>
            <span>{all.length} {lang === 'nl' ? 'projecten' : 'projects'} · 2022–2026</span>
          </div>
          <div data-reveal="">
            <ProjectIndex projects={rest} startAt={2} openDetail={openDetail} />
          </div>
        </section>

        {/* ---------- 03 · stage ---------- */}
        <section className="u-section">
          <hr className="u-rule" />
          <div className="sec-head">
            <h2>§ 03 — {s.secStage}</h2>
            <a className="sec-link" href={href({ kind: 'contact' })} onClick={(e) => { e.preventDefault(); go('contact'); }}>
              {s.contactKicker} →
            </a>
          </div>

          <div className="stage-grid" data-reveal="">
            <div>
              <p style={sx('font-family:var(--font-display); font-size:var(--t-feature); line-height:var(--lh-title); max-width:20ch;')}>
                {s.stageLead}
              </p>
              <dl className="stage-table">
                {stage.map((row, i) => (
                  <div className="stage-row" key={i}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="stage-table" style={sx('margin-top:0;')}>
              {links.filter((c) => c.href).map((c, i) => (
                <a
                  key={i}
                  className="stage-row"
                  href={c.href}
                  {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  style={sx('text-decoration:none; color:inherit;')}
                >
                  <span style={sx('font-family:var(--font-mono); font-size:var(--t-label); letter-spacing:var(--ls-label); text-transform:uppercase; color:var(--ink-3);')}>{c.label}</span>
                  <span style={sx('font-size:var(--t-lede);')}>{c.value} <span aria-hidden="true">↗</span></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 04 · stille strook ---------- */}
        <section className="u-section">
          <hr className="u-rule" />
          <div className="sec-head">
            <h2>§ 04 — {s.secLive}</h2>
          </div>

          <div className="strip" data-reveal="">
            <div className="strip-lines">
              <div className="strip-line"><span className="strip-key">{s.curStatus}</span><span className="strip-val"><LiveStatus s={s} /></span></div>
              {currently.map((c, i) => (
                <div className="strip-line" key={i}>
                  <span className="strip-key">{c.label}</span><span className="strip-val">{c.value}</span>
                </div>
              ))}
              <div className="strip-line"><span className="strip-key">{s.curTime}</span><span className="strip-val"><LocalTime lang={lang} /></span></div>
            </div>

            <NowPlaying s={s} />
          </div>
        </section>

        {/* ---------- colofon ---------- */}
        <footer className="colophon">
          <span>Adam Saber</span>
          <span>Rotterdam</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href="https://github.com/adamsaber-mr" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <span style={sx('margin-left:auto;')}>© 2026</span>
        </footer>
      </div>
    </div>
  );
}
