import { sx } from '../lib/sx';
import Img from './Img';
import Colophon from './Colophon';
import { href } from '../lib/router';
import { PROJECTS, loc, catLabel, projectNumber, type Lang, type LocProject, type Strings } from '../data';

interface Props {
  s: Strings;
  lang: Lang;
  project: LocProject;
  back: () => void;
  openDetail: (slug: string) => void;
}

/**
 * Een project als tijdschriftartikel.
 *
 * De vorige versie was een kop met twee pilknoppen en een kaart-zijbalk die op
 * `align-items:center` stond, waardoor hij bij een lang overzicht halverwege de
 * kolom zweefde. De zijbalk is nu één byline-regel tussen haarlijnen: rol, jaar
 * en stack zijn feiten die je vóór het lezen wilt weten, niet ernaast. Daarmee
 * verdwijnt ook de oorzaak van die bug.
 *
 * De live- en repo-links staan sticky in de rechtermarge. Als pil rechtsboven
 * waren ze alleen klikbaar vóórdat je een reden had om te klikken.
 */
export default function ProjectDetail({ s, lang, project: p, back, openDetail }: Props) {
  const i = PROJECTS.findIndex((x) => x.slug === p.slug);
  // Rondlopen: vanaf het eerste project ga je terug naar het laatste.
  const prev = loc(PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length], lang);
  const next = loc(PROJECTS[(i + 1) % PROJECTS.length], lang);

  return (
    <div className="pageintro">
      <div className="u-page">
        <article className="pd">

          <a
            className="pd-crumb"
            href={href({ kind: 'work' })}
            onClick={(e) => { e.preventDefault(); back(); }}
          >
            {s.navWork} / {projectNumber(p.slug)} {p.name}
          </a>

          <p className="pd-kicker">{catLabel(p.cat, s)} · {p.year}</p>

          <h1 className="pd-title">{p.name}</h1>

          <p className="pd-standfirst">{p.blurb}</p>

          {/* De byline vervangt de zwevende zijbalk: één regel tussen haarlijnen. */}
          <dl className="pd-byline">
            <div><dt>{s.pdRole}</dt><dd>{p.role}</dd></div>
            <div><dt>{s.pdYear}</dt><dd>{p.year}</dd></div>
            <div><dt>{s.pdStack}</dt><dd>{p.stack}</dd></div>
          </dl>

          <figure className="pd-cover" data-reveal="">
            <span className="plate">
              <span className="plate-window" style={sx('display:block; aspect-ratio:16/9;')}>
                <Img src={p.image} alt={`${p.name} — ${s.altShot}`} priority style={sx(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:${p.imgPos}; display:block;`)} />
              </span>
            </span>
            <figcaption className="plate-caption">{p.name} — {p.blurb}</figcaption>
          </figure>

          <div className="pd-body">
            <div className="pd-prose">
              {/* Geen kop "Overzicht": een artikel labelt zijn eerste alinea niet.
                  De rode initiaal is het enige accent op deze pagina. */}
              <p className="pd-lead">{p.overview}</p>

              {p.context && (
                <section className="pd-block">
                  <h2 className="pd-h">{s.pdContext}</h2>
                  <p>{p.context}</p>
                </section>
              )}

              <section className="pd-block">
                <h2 className="pd-h">{s.pdHighlights}</h2>
                <ol className="pd-list">
                  {p.features.map((f, n) => (
                    <li key={n}>
                      <span className="pd-list-num">{String(n + 1).padStart(2, '0')}</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {p.retro && (
                <section className="pd-block">
                  <h2 className="pd-h">{s.pdRetro}</h2>
                  <p>{p.retro}</p>
                </section>
              )}
            </div>

            {(p.live || p.repo) && (
              <aside className="pd-links">
                {p.live && (
                  <a className="rule-link rule-link--accent" href={p.live} target="_blank" rel="noopener noreferrer">
                    {s.pdLive} ↗
                  </a>
                )}
                {p.repo && (
                  <a className="rule-link" href={p.repo} target="_blank" rel="noopener noreferrer">
                    {s.pdCode} ↗
                  </a>
                )}
              </aside>
            )}
          </div>

          {/* Vorige/volgende: de beste manier om iemand een tweede project te
              laten openen in plaats van weg te klikken. */}
          <nav className="pd-nav" aria-label={s.navWork}>
            <a
              className="pd-nav-link"
              href={href({ kind: 'project', slug: prev.slug })}
              onClick={(e) => { e.preventDefault(); openDetail(prev.slug); }}
            >
              <span className="pd-nav-label">← {s.pdPrev}</span>
              <span className="pd-nav-name">{projectNumber(prev.slug)} {prev.name}</span>
            </a>
            <a
              className="pd-nav-link pd-nav-link--next"
              href={href({ kind: 'project', slug: next.slug })}
              onClick={(e) => { e.preventDefault(); openDetail(next.slug); }}
            >
              <span className="pd-nav-label">{s.pdNext} →</span>
              <span className="pd-nav-name">{projectNumber(next.slug)} {next.name}</span>
            </a>
          </nav>
        </article>

        <Colophon />
      </div>
    </div>
  );
}
