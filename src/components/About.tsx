import { useState, type ReactNode } from 'react';
import { sx } from '../lib/sx';
import Img from './Img';
import { useIsMobile } from '../hooks/useIsMobile';
import { buildJourney, buildSkills, buildExperience, type Lang, type Strings } from '../data';

interface Props {
  s: Strings;
  lang: Lang;
}

/** Neutral line icon for an experience row's tile (and large faded watermark). */
function ExpIcon({ name, size = 22 }: { name: string; size?: number }) {
  const c = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'cap': return <svg {...c}><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1.3 2.7 2.5 6 2.5s6-1.2 6-2.5v-5" /><path d="M22 10v5" /></svg>;
    case 'bag': return <svg {...c}><path d="M6 2 3 6.5V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.5L18 2Z" /><path d="M3 6.5h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
    case 'mega': return <svg {...c}><path d="m3 11 16-5v12L3 13v-2Z" /><path d="M11.5 17.5a2.5 2.5 0 0 1-5-.8" /><path d="M19 8.5a3 3 0 0 1 0 5" /></svg>;
    default: return null;
  }
}

/**
 * Uitklapbare kaart, alleen gebruikt in de mobiele opzet.
 *
 * Op telefoon vulde één ervaringskaart bijna een heel scherm. Zo zie je eerst
 * alleen de kop — wat het is, waar en wanneer — en haal je de rest erbij als je
 * het wilt lezen. Dicht staat de inhoud op `inert`, zodat je er met een
 * toetsenbord of schermlezer niet in verdwaalt.
 */
function Collapsible({ id, tint, head, children }: { id: string; tint?: string; head: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const closed = (open ? {} : { inert: '' }) as Record<string, string>;
  return (
    <div className={`mcard${open ? ' open' : ''}`} style={tint ? ({ ['--c' as string]: tint }) : undefined}>
      <button type="button" className="mcard-head" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {head}
        <span className="mcard-chev" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </span>
      </button>
      <div className="mcard-body" id={id} {...closed}>
        <div className="mcard-inner">{children}</div>
      </div>
    </div>
  );
}

export default function About({ s, lang }: Props) {
  const isMobile = useIsMobile();
  const [bioOpen, setBioOpen] = useState(false);
  const journey = buildJourney(lang);
  const skills = buildSkills(lang);
  const experience = buildExperience(lang);

  return (
    <div data-screen-label="Over mij" className="pageintro">
      <div className="page-pad fold-center" style={sx('max-width:1320px; margin:0 auto; padding:104px 56px 10px;')}>
        <div data-reveal="" style={sx('border-bottom:1px solid var(--line); padding:6px 0 24px;')}>
          <h1 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(34px,5vw,62px); line-height:1.04; font-weight:700; letter-spacing:-.03em; max-width:780px;")}>{s.aboutTitle}</h1>
        </div>

        <div className="about-bio" style={sx('display:grid; grid-template-columns:1.1fr .82fr; gap:56px; align-items:center; padding:26px 0 22px;')}>
          <div data-reveal="" className="about-text" style={sx('display:flex; flex-direction:column; gap:22px;')}>
            <p style={sx('font-size:18px; line-height:1.7; color:var(--ink);')}>{s.aboutP1}</p>
            {(!isMobile || bioOpen) && (
              <>
                <p style={sx('font-size:16px; line-height:1.7; color:var(--ink2);')}>{s.aboutP2}</p>
                <p style={sx('font-size:16px; line-height:1.7; color:var(--ink2);')}>{s.aboutP3}</p>
              </>
            )}
            {isMobile && (
              <button type="button" className="morebtn" aria-expanded={bioOpen} onClick={() => setBioOpen((o) => !o)}>
                {bioOpen ? s.readLess : s.readMore}
              </button>
            )}
          </div>
          <div data-reveal="" style={sx('display:flex; justify-content:center; align-items:center;')}>
            <div style={sx('width:100%; max-width:360px; border-radius:22px; overflow:hidden; border:1px solid var(--line); box-shadow:0 34px 64px -26px var(--shadow);')}>
              <Img src="assets/me_3" alt={s.altWorking} style={sx('width:100%; aspect-ratio:4/5; object-fit:cover; object-position:center 38%; display:block;')} />
            </div>
          </div>
        </div>
      </div>

      <div className="page-pad" style={sx('max-width:1320px; margin:0 auto; padding:0 56px 72px;')}>
        {/* journey — vertical timeline */}
        <div data-reveal="" style={sx('padding:54px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line);')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(24px,3.4vw,40px); font-weight:700; letter-spacing:-.02em; margin-bottom:40px;")}>{s.journeyTitle}</h2>
          {isMobile ? (
            /* Telefoon: de tijdlijn met icoonkolom en jaar-aside perste de tekst
               in ~200px. Hier is elke stap één regel die je opentikt. */
            <div className="mlist">
              {journey.map((j, i) => (
                <Collapsible
                  key={i}
                  id={`journey-${i}`}
                  tint={j.color}
                  head={
                    <>
                      <span className="mcard-ic">
                        {j.slug && <img src={`https://cdn.simpleicons.org/${j.slug}/${j.color.replace('#', '')}`} alt="" width={17} height={17} />}
                      </span>
                      <span className="mcard-t">{j.title}</span>
                      <span className="mcard-m">{j.year}</span>
                    </>
                  }
                >
                  <p className="mcard-p">{j.body}</p>
                  {j.chips.length > 0 && (
                    <div className="mcard-chips">
                      {j.chips.map((c, ci) => (
                        <span key={ci} className="jchip" style={sx(c.style)}>
                          {c.icon && <img src={c.icon} alt="" style={{ width: '13px', height: '13px', display: 'block', opacity: c.iconOpacity }} />}
                          {c.label}
                        </span>
                      ))}
                    </div>
                  )}
                </Collapsible>
              ))}
            </div>
          ) : (
          <div className="tl">
            {journey.map((j, i) => (
              <div key={i} data-reveal="" className={`tl-item jstep${j.current ? ' current' : ''}`} style={{ ['--c' as string]: j.color }}>
                <div className="tl-node">
                  {j.slug && <img src={`https://cdn.simpleicons.org/${j.slug}/${j.color.replace('#', '')}`} alt="" width={24} height={24} />}
                </div>
                <div className="tl-card">
                  <div className="tl-card-main">
                    <h3 style={sx("font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:clamp(17px,1.7vw,20px); letter-spacing:-.01em;")}>{j.title}</h3>
                    <p style={sx('font-size:14px; color:var(--card-muted); line-height:1.55; margin-top:7px; max-width:560px;')}>{j.body}</p>
                    {j.chips.length > 0 && (
                      <div style={sx('display:flex; flex-wrap:wrap; gap:8px; margin-top:14px;')}>
                        {j.chips.map((c, ci) => (
                          <span key={ci} className="jchip" style={sx(c.style)}>
                            {c.icon && <img src={c.icon} alt="" style={{ width: '14px', height: '14px', display: 'block', opacity: c.iconOpacity }} />}
                            {c.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="tl-aside" aria-hidden="true">
                    <span className="tl-badge">{j.year}</span>
                    <span className="tl-index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="tl-phase">{j.phase}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>

        {/* experience & education — editorial ledger */}
        <div data-reveal="" style={sx('padding:54px 0; border-bottom:1px solid var(--line);')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(24px,3.4vw,40px); font-weight:700; letter-spacing:-.02em; margin-bottom:8px;")}>{s.experienceTitle}</h2>
          <p style={sx('font-size:16px; color:var(--muted); margin-bottom:14px; max-width:520px;')}>{s.experienceBody}</p>
          {isMobile ? (
            <div className="mlist">
              {experience.map((e, i) => (
                <Collapsible
                  key={i}
                  id={`exp-${i}`}
                  tint={e.color}
                  head={
                    <>
                      <span className="mcard-ic"><ExpIcon name={e.icon} size={17} /></span>
                      <span className="mcard-t">
                        {e.title}
                        <span className="mcard-sub">{e.org}</span>
                      </span>
                      <span className="mcard-m">{e.period}</span>
                    </>
                  }
                >
                  <p className="mcard-p">{e.body}</p>
                  <ul className="mcard-points">
                    {e.bullets.map((b, bi) => (
                      <li key={bi}>
                        <span className="mcard-dot" />
                        <span>
                          <strong>{b.title}</strong>
                          {b.note && <span className="mcard-note"> — {b.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Collapsible>
              ))}
            </div>
          ) : (
          <div className="exp-list" style={sx('margin-top:30px;')}>
            {experience.map((e, i) => (
              <div key={i} data-reveal="">
                <article className="exp-row" style={{ ['--c' as string]: e.color }}>
                  <span className="exp-wm" aria-hidden="true"><ExpIcon name={e.icon} size={150} /></span>
                  <span className="exp-ic"><ExpIcon name={e.icon} /></span>
                  <div className="exp-body">
                  <div className="exp-top">
                    <div className="exp-kicker">{e.kicker}</div>
                    <span className="exp-period">{e.period}</span>
                  </div>
                  <h3 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(18px,2vw,21px); font-weight:700; letter-spacing:-.01em;")}>{e.title}</h3>
                  <div className="exp-org">{e.org}</div>
                  <p style={sx('font-size:14px; color:inherit; line-height:1.6; margin-top:10px; max-width:680px;')}>{e.body}</p>
                  <ul className="exp-points">
                    {e.bullets.map((b, bi) => (
                      <li key={bi}>
                        <span className="exp-dot" />
                        <span>
                          <span style={sx(`font-weight:${b.note ? 600 : 500}; color:inherit;`)}>{b.title}</span>
                          {b.note && <span style={sx('color:var(--card-muted);')}> — {b.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                  </div>
                </article>
              </div>
            ))}
          </div>
          )}
        </div>

        {/* skills */}
        <div data-reveal="" style={sx('padding:54px 0 30px;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(24px,3.4vw,40px); font-weight:700; letter-spacing:-.02em; margin-bottom:8px;")}>{s.skillsTitle}</h2>
          <p style={sx('font-size:16px; color:var(--muted); margin-bottom:14px; max-width:520px;')}>{s.skillsBody}</p>
          <div className="skills-grid" style={sx('display:grid; grid-template-columns:repeat(2,1fr); gap:18px; margin-top:30px;')}>
            {skills.map((g, i) => (
              <div key={i} data-reveal="" className="skillcard" style={sx('position:relative; background:var(--card); color:var(--card-ink); border:1px solid var(--card-line); border-radius:18px; padding:26px 26px 24px;')}>
                <div style={sx('display:flex; align-items:baseline; justify-content:space-between; gap:12px; margin-bottom:16px;')}>
                  <h3 style={sx("font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:700; letter-spacing:-.01em;")}>{g.area}</h3>
                  <span style={sx("font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--card-faint);")}>{g.tag}</span>
                </div>
                <div style={sx('display:flex; flex-wrap:wrap; gap:9px;')}>
                  {g.chips.map((c, ci) => (
                    <span key={ci} className="jchip" style={sx(c.style)}>
                      {c.icon && <img src={c.icon} alt="" style={{ width: '15px', height: '15px', display: 'block', opacity: c.iconOpacity }} />}
                      {c.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
