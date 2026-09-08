import { href } from '../lib/router';
import Img from './Img';
import type { LocProject } from '../data';

interface Props {
  projects: LocProject[];
  /** Startnummer — de homepage begint bij 02 omdat 01 groot uitgelicht staat. */
  startAt?: number;
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
 */
export default function ProjectIndex({ projects, startAt = 1, openDetail }: Props) {
  return (
    <div className="idx">
      {projects.map((p, i) => (
        <a
          key={p.slug}
          className="idx-row"
          href={href({ kind: 'project', slug: p.slug })}
          onClick={(e) => { e.preventDefault(); openDetail(p.slug); }}
        >
          <span className="idx-num">{String(startAt + i).padStart(2, '0')}</span>
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
