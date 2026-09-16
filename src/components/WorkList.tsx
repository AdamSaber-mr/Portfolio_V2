import { sx } from '../lib/sx';
import Img from './Img';
import { href } from '../lib/router';
import TechChips from './TechChips';
import type { LocProject, Strings } from '../data';

interface Props {
  s: Strings;
  projects: LocProject[];
  openDetail: (name: string) => void;
}

/**
 * Simple project grid: a rounded screenshot card on top, then the project name,
 * then its tech chips. Data-driven — adding a project is one more entry in
 * PROJECTS. Responsive: the grid reflows to fewer columns on narrow screens.
 */
export default function WorkList({ s, projects, openDetail }: Props) {
  return (
    <div className="workgrid" style={sx('display:grid; grid-template-columns:repeat(auto-fill,minmax(380px,1fr)); gap:40px 30px;')}>
      {projects.map((p) => (
        <figure key={p.name} style={sx('margin:0;')}>
          <a
            className="workcard"
            href={href({ kind: 'project', slug: p.slug })}
            onClick={(e) => { e.preventDefault(); openDetail(p.slug); }}
            aria-label={`${s.pdView}: ${p.name}`}
            style={sx('display:block; cursor:pointer; text-decoration:none; color:inherit;')}
          >
          <div className="workcard-img" style={sx(`background:${p.color};`)}>
            <Img src={p.image} alt={`${p.name} — ${s.altShot}`} style={sx(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:${p.imgPos}; display:block;`)} />
          </div>
            <h3 className="workcard-name">{p.name}</h3>
            <TechChips stack={p.stack} />
          </a>
        </figure>
      ))}
    </div>
  );
}
