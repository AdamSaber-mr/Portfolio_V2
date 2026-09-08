import { href } from '../lib/router';
import Img from './Img';
import { projectNumber, type LocProject } from '../data';

interface Props {
  projects: LocProject[];
  openDetail: (slug: string) => void;
}

/**
 * De projectindex: één gelijnde regel per project.
 *
 * Bewust gedeeld door de homepage en de werkpagina, zodat beide als één
 * publicatie lezen — eerder toonde Home dezelfde projecten als kaartjes en Werk
 * als een raster, wat de twee pagina's structureel uit elkaar trok.
 *
 * De jaartallen staan rechts uitgelijnd in tabulaire cijfers, waardoor de groei
 * van 2022 naar 2026 als één leesbare kolom onder elkaar komt te staan. Dat is
 * precies het verhaal dat een stagecoördinator zoekt en het was in het oude
 * kaartenraster volstrekt onzichtbaar.
 *
 * Het nummer komt altijd uit de vaste volgorde van PROJECTS, nooit uit de positie
 * in de weergegeven lijst. Anders zou een gefilterde weergave hetzelfde project
 * een ander nummer geven dan de dateline erboven.
 */
export default function ProjectIndex({ projects, openDetail }: Props) {
  return (
    <div className="idx">
      {projects.map((p) => (
        <a
          key={p.slug}
          className="idx-row"
          href={href({ kind: 'project', slug: p.slug })}
          onClick={(e) => { e.preventDefault(); openDetail(p.slug); }}
        >
          <span className="idx-num">{projectNumber(p.slug)}</span>
          <span className="idx-name">{p.name}</span>
          <span className="idx-blurb">{p.blurb}</span>
          <span className="idx-stack">{p.stack}</span>
          <span className="idx-year">{p.year}</span>
          <span className="idx-thumb" aria-hidden="true">
            <Img src={p.image} alt="" />
          </span>
        </a>
      ))}
    </div>
  );
}
