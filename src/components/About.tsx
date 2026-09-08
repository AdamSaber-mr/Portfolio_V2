import { sx } from '../lib/sx';
import Img from './Img';
import Colophon from './Colophon';
import { href } from '../lib/router';
import { buildJourney, buildSkills, buildExperience, buildApproach, buildLanguages, type Lang, type Strings } from '../data';
import type { Page } from '../App';

interface Props {
  s: Strings;
  lang: Lang;
  go: (p: Page) => void;
}

/**
 * Over mij als drie gelijnde tabellen.
 *
 * Deze pagina droeg als laatste drie visuele systemen tegelijk: een tijdlijn met
 * gekleurde icoonbollen, getinte ervaringskaarten en een 2x2 bento met chips.
 * Alle drie zeggen hetzelfde soort ding — een rij feiten met een toelichting —
 * dus ze zijn nu ook één ding. De kleuren die daarbij werden berekend werden
 * nergens gelezen, en de dertig externe icoonverzoeken hoefden dus ook niet.
 *
 * Wat overblijft aan accent is het enige stuk dat informatie draagt: de huidige
 * stap in de ontwikkelingsreis.
 */
export default function About({ s, lang, go }: Props) {
  const journey = buildJourney(lang);
  const skills = buildSkills(lang);
  const experience = buildExperience(lang);
  const approach = buildApproach(lang);
  const languages = buildLanguages(lang);

  return (
    <div className="pageintro">
      <div className="u-page">

        {/* ---------- opening ---------- */}
        <section style={sx('padding-top:var(--page-top);')}>
          <div className="about-grid">
            <div data-reveal="">
              <h1 style={sx('font-family:var(--font-display); font-size:var(--t-display); line-height:var(--lh-display); letter-spacing:var(--ls-display); font-weight:var(--w-body); max-width:14ch;')}>
                {s.aboutTitle}
              </h1>
              {/* De eerste alinea draagt de initiaal; de rest leest gewoon door. */}
              <div className="about-prose">
                <p className="about-lead">{s.aboutP1}</p>
                <p>{s.aboutP2}</p>
                <p>{s.aboutP3}</p>
              </div>
            </div>

            <figure className="about-photo" data-reveal="" style={sx('margin:0; align-self:start;')}>
              <span className="plate" style={sx('display:block;')}>
                <span className="plate-window" style={sx('display:block; aspect-ratio:4/5;')}>
                  <Img src="assets/me_3" alt={s.altWorking} style={sx('position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 38%; display:block;')} />
                </span>
              </span>
              <figcaption className="plate-caption">{s.aboutCaption}</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- 01 · ontwikkelingsreis ---------- */}
        <section className="u-section">
          <hr className="u-rule" />
          <div className="sec-head">
            <h2>§ 01 — {s.journeyTitle}</h2>
          </div>

          <div className="ledger" data-reveal="">
            {journey.map((j, i) => (
              <article key={i} className={`jr-row${j.current ? ' jr-row--now' : ''}`}>
                <span className="jr-year">
                  {j.current && <span className="jr-mark" aria-hidden="true"></span>}
                  {j.year}
                </span>
                <div className="jr-main">
                  <h3 className="jr-title">{j.title}</h3>
                  <p className="jr-body">{j.body}</p>
                </div>
                <span className="jr-meta">
                  <span className="jr-phase">{j.phase}</span>
                  <span className="jr-stack">{j.stack}</span>
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- 02 · ervaring & opleiding ---------- */}
        <section className="u-section">
          <hr className="u-rule" />
          <div className="sec-head">
            <h2>§ 02 — {s.experienceTitle}</h2>
          </div>
          <p className="u-measure-tight" style={sx('font-size:var(--t-lede); line-height:var(--lh-body); color:var(--ink-2); margin-top:var(--s-5);')}>
            {s.experienceBody}
          </p>

          <div className="ledger" style={sx('margin-top:var(--s-6);')}>
            {experience.map((e, i) => (
              <article key={i} className="ex-row" data-reveal="">
                <div className="ex-when">
                  <span className="ex-kicker">{e.kicker}</span>
                  <span className="ex-period">{e.period}</span>
                </div>
                <div className="ex-main">
                  <h3 className="ex-title">{e.title}</h3>
                  <p className="ex-org">{e.org}</p>
                  <p className="ex-body">{e.body}</p>
                  <ul className="ex-points">
                    {e.bullets.map((b, bi) => (
                      <li key={bi}>
                        <span className="ex-point-title">{b.title}</span>
                        {b.note && <span className="ex-point-note"> — {b.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- 03 · vaardigheden ---------- */}
        <section className="u-section">
          <hr className="u-rule" />
          <div className="sec-head">
            <h2>§ 03 — {s.skillsTitle}</h2>
          </div>
          <p className="u-measure-tight" style={sx('font-size:var(--t-lede); line-height:var(--lh-body); color:var(--ink-2); margin-top:var(--s-5);')}>
            {s.skillsBody}
          </p>

          <div className="ledger" data-reveal="" style={sx('margin-top:var(--s-6);')}>
            {skills.map((g, i) => (
              <div key={i} className="sk-row">
                <span className="sk-area">
                  {g.area}
                  <span className="sk-tag">{g.tag}</span>
                </span>
                {/* Kale tekst: dezelfde stack-notatie als in de index en de byline. */}
                <span className="sk-items">{g.items.join(' · ')}</span>
                <span className="sk-note">{g.note}</span>
              </div>
            ))}
          </div>

          {/* Werkwijze en talen staan bewust apart: het zijn geen tools. */}
          <div className="ledger" data-reveal="" style={sx('margin-top:var(--s-6);')}>
            <div className="sk-row sk-row--coda">
              <span className="sk-area">{s.aboutApproach}</span>
              <span className="sk-items">{approach.join(' · ')}</span>
            </div>
            <div className="sk-row sk-row--coda">
              <span className="sk-area">{s.aboutLanguages}</span>
              <span className="sk-items">{languages.join(' · ')}</span>
            </div>
          </div>
        </section>

        {/* Een pagina over mij eindigt bij het werk, niet bij zichzelf. */}
        <section className="u-section">
          <hr className="u-rule" />
          <div style={sx('padding-top:var(--s-6);')}>
            <a
              className="rule-link rule-link--accent"
              href={href({ kind: 'work' })}
              onClick={(e) => { e.preventDefault(); go('work'); }}
            >
              {s.heroCta1} →
            </a>
          </div>
        </section>

        <Colophon />
      </div>
    </div>
  );
}
