import { sx } from '../lib/sx';
import { PROJECTS, loc, type Filter, type Lang, type Strings } from '../data';
import WorkList from './WorkList';

interface Props {
  s: Strings;
  lang: Lang;
  filter: Filter;
  setFilter: (f: Filter) => void;
  openDetail: (name: string) => void;
}

function filterStyle(active: boolean): string {
  return `font-size:13.5px;font-weight:600;padding:11px 22px;border-radius:30px;cursor:pointer;border:1px solid ${active ? 'var(--accent)' : 'var(--line)'};background:${active ? 'var(--accent)' : 'transparent'};color:${active ? 'var(--accentink)' : 'var(--muted)'};transition:border-color .25s ease, color .25s ease;`;
}

export default function Work({ s, lang, filter, setFilter, openDetail }: Props) {
  const all = PROJECTS.map((p) => loc(p, lang));
  const vis = filter === 'all' ? all : all.filter((p) => p.cat === filter);

  const filterDefs: { key: Filter; label: string }[] = [
    { key: 'all', label: s.fAll }, { key: 'front', label: s.fFront }, { key: 'full', label: s.fFull }, { key: 'data', label: s.fData },
  ];

  return (
    <div data-screen-label="Projecten" className="pageintro">
      <div className="page-pad fold-center" style={sx('max-width:1440px; margin:0 auto; padding:56px 56px 72px; justify-content:flex-start;')}>
        <div data-reveal="" style={sx('padding-bottom:22px;')}>
          <h1 style={sx("font-family:var(--font-display); font-size:clamp(40px,6vw,80px); line-height:.98; font-weight:700; letter-spacing:-.03em;")}>{s.workTitle}</h1>
          <p style={sx('max-width:460px; font-size:17px; line-height:1.55; color:var(--muted); margin-top:20px;')}>{s.workBody}</p>
        </div>

        <div data-reveal="" style={sx("display:flex; gap:8px; flex-wrap:wrap; padding:16px 0 28px; font-family:var(--font-mono);")}>
          {filterDefs.map((f) => (
            <button key={f.key} type="button" className="btn" onClick={() => setFilter(f.key)} aria-pressed={filter === f.key} style={sx(filterStyle(filter === f.key))}>{f.label}</button>
          ))}
        </div>

        <div data-reveal="">
          <WorkList s={s} projects={vis} openDetail={openDetail} />
        </div>
      </div>
    </div>
  );
}
