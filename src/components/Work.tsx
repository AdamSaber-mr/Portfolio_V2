import { sx } from '../lib/sx';
import Img from './Img';
import ProjectIndex from './ProjectIndex';
import Colophon from './Colophon';
import { href, navigate, useRoute } from '../lib/router';
import { PROJECTS, loc, projectNumber, type Cat, type Lang, type LocProject, type Strings } from '../data';

interface Props {
  s: Strings;
  lang: Lang;
  openDetail: (slug: string) => void;
}

/** Hoeveel projecten bovenaan een plaat krijgen in plaats van een indexregel. */
const FEATURED = 3;

/**
 * Eén uitgelicht project: plaat naast metadata.
 *
 * De tweede in de rij wordt gespiegeld — één keer, geen zigzag. Drie identieke
 * blokken zijn saai, zes afwisselingen worden een trucje.
 */
function Feature({ p, s, mirror, openDetail }: {
  p: LocProject; s: Strings; mirror: boolean; openDetail: (slug: string) => void;
}) {
  const plate = (
    <a
      href={href({ kind: 'project', slug: p.slug })}
      onClick={(e) => { e.preventDefault(); openDetail(p.slug); }}
      className="feature-plate"
      style={sx('display:block; text-decoration:none; color:inherit;')}
    >
      <span className="plate">
        <span className="plate-window" style={sx('display:block;')}>
          <Img src={p.image} alt={`${p.name} — ${s.altShot}`} style={sx(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:${p.imgPos}; display:block;`)} />
        </span>
      </span>
    </a>
  );

  const text = (
    <div>
      <div className="feature-num">{projectNumber(p.slug)}</div>
      <h3 className="feature-name">{p.name}</h3>
      <p className="feature-blurb">{p.blurb}</p>
      <dl className="feature-meta">
        <dt>{s.pdYear}</dt><dd>{p.year}</dd>
        <dt>{s.pdRole}</dt><dd>{p.role}</dd>
        <dt>{s.pdStack}</dt><dd>{p.stack}</dd>
      </dl>
      <div style={sx('margin-top:var(--s-6);')}>
        <a
          className="rule-link"
          href={href({ kind: 'project', slug: p.slug })}
          onClick={(e) => { e.preventDefault(); openDetail(p.slug); }}
        >
          {s.readCase} →
        </a>
      </div>
    </div>
  );

  return (
    <div className={`feature${mirror ? ' feature--mirror' : ''}`} data-reveal="">
      {mirror ? <>{text}{plate}</> : <>{plate}{text}</>}
    </div>
  );
}

export default function Work({ s, lang, openDetail }: Props) {
  const route = useRoute();
  const cat = route.kind === 'work' ? route.cat : undefined;

  const all = PROJECTS.map((p) => loc(p, lang));
  const vis = cat ? all.filter((p) => p.cat === cat) : all;

  const featured = vis.slice(0, FEATURED);
  const rest = vis.slice(FEATURED);

  const filters: { key: Cat | undefined; label: string }[] = [
    { key: undefined, label: s.fAll },
    { key: 'front', label: s.fFront },
    { key: 'full', label: s.fFull },
    { key: 'data', label: s.fData },
  ];
  const countFor = (k: Cat | undefined) => (k ? all.filter((p) => p.cat === k).length : all.length);
  const activeLabel = filters.find((f) => f.key === cat)?.label ?? s.fAll;

  const setFilter = (k: Cat | undefined) => {
    navigate(k ? { kind: 'work', cat: k } : { kind: 'work' });
    window.scrollTo(0, 0);
  };

  return (
    <div className="pageintro">
      <div className="u-page">

        <section style={sx('padding-top:var(--page-top);')}>
          <div data-reveal="" className="work-head">
            <h1 style={sx('font-family:var(--font-display); font-size:var(--t-display); line-height:var(--lh-display); letter-spacing:var(--ls-display); font-weight:var(--w-body);')}>
              {s.workTitle}
            </h1>
            {/* Vertelt de lezer waar hij naar kijkt, en verandert mee met het filter. */}
            <p className="work-count">
              {vis.length} {lang === 'nl' ? 'projecten' : 'projects'}
              {cat ? ` · ${activeLabel}` : ' · 2022–2026'}
            </p>
          </div>
          <p className="u-measure-tight" style={sx('font-size:var(--t-lede); line-height:var(--lh-body); color:var(--ink-2); margin-top:var(--s-5);')}>
            {s.workBody}
          </p>
        </section>

        <section className="u-section">
          <hr className="u-rule" />
          <div className="sec-head">
            <h2>§ — {s.secIndex}</h2>
            {/* Filters als één mono-regel op de sectielijn, met aantallen. */}
            <div className="filters" role="group" aria-label={s.secIndex}>
              {filters.map((f, i) => (
                <span key={f.key ?? 'all'}>
                  {i > 0 && <span className="filter-sep" aria-hidden="true">/</span>}
                  <button
                    type="button"
                    className={`filter${f.key === cat ? ' filter--on' : ''}`}
                    onClick={() => setFilter(f.key)}
                    aria-pressed={f.key === cat}
                  >
                    {f.label} ({countFor(f.key)})
                  </button>
                </span>
              ))}
            </div>
          </div>

          {featured.map((p, i) => (
            <Feature key={p.slug} p={p} s={s} mirror={i === 1} openDetail={openDetail} />
          ))}

          {rest.length > 0 && (
            <div data-reveal="">
              <ProjectIndex projects={rest} openDetail={openDetail} />
            </div>
          )}
        </section>

        <Colophon />
      </div>
    </div>
  );
}
