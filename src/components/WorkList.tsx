import { sx } from '../lib/sx';
import { clickable } from '../lib/a11y';
import { asset } from '../lib/asset';
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
        <figure
          key={p.name}
          className="workcard"
          {...clickable(() => openDetail(p.name), `${s.pdView}: ${p.name}`)}
          style={sx('margin:0; cursor:pointer;')}
        >
          <div className="workcard-img" style={sx(`background:${p.color};`)}>
            <img src={asset(p.image)} alt={`${p.name} — screenshot`} loading="lazy" style={sx(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:${p.imgPos}; display:block;`)} />
          </div>
          <h3 className="workcard-name">{p.name}</h3>
          <TechChips stack={p.stack} />
        </figure>
      ))}
    </div>
  );
}
