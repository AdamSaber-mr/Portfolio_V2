import { sx } from '../lib/sx';
import { clickable } from '../lib/a11y';
import { asset } from '../lib/asset';
import { catLabel, type LocProject, type Strings } from '../data';
import FooterCTA from './FooterCTA';
import TechChips from './TechChips';
import type { Page } from '../App';

interface Props {
  s: Strings;
  project: LocProject;
  back: () => void;
  go: (p: Page) => void;
}

function metaRow(label: string, value: string) {
  return (
    <div style={sx('display:flex; align-items:baseline; justify-content:space-between; gap:16px; padding:13px 0; border-bottom:1px solid var(--line);')}>
      <span style={sx("font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--muted); text-transform:uppercase; letter-spacing:.04em;")}>{label}</span>
      <span style={sx('font-size:14px; font-weight:600; color:var(--ink); text-align:right;')}>{value}</span>
    </div>
  );
}

export default function ProjectDetail({ s, project: p, back, go }: Props) {
  return (
    <div data-screen-label="Projectdetail" className="pageintro">
      <div className="page-pad" style={sx('max-width:1100px; margin:0 auto; padding:40px 56px 10px;')}>
        {/* back */}
        <span
          className="btn"
          {...clickable(back, s.pdBack)}
          style={sx("display:inline-flex; align-items:center; gap:8px; font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--muted); cursor:pointer;")}
        >
          <span style={sx('font-size:17px; line-height:1;')}>‹</span> {s.pdBack}
        </span>

        {/* header */}
        <div data-reveal="" style={sx('display:flex; align-items:flex-end; justify-content:space-between; gap:28px; flex-wrap:wrap; margin-top:26px;')}>
          <div>
            <h1 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(38px,6vw,72px); line-height:1; font-weight:700; letter-spacing:-.03em;")}>{p.name}</h1>
          </div>
          <div style={sx('display:flex; gap:12px; flex-wrap:wrap;')}>
            {p.live && (
              <a className="btn" href={p.live} target="_blank" rel="noopener noreferrer" style={sx('display:inline-flex; align-items:center; gap:8px; background:var(--accent); color:var(--accentink); padding:13px 22px; border-radius:30px; font-size:14px; font-weight:600; text-decoration:none;')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                {s.pdLive}
              </a>
            )}
            {p.repo && (
              <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer" style={sx('display:inline-flex; align-items:center; gap:8px; background:var(--surface); color:var(--ink); border:1px solid var(--line); padding:13px 22px; border-radius:30px; font-size:14px; font-weight:600; text-decoration:none;')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.7c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z" /></svg>
                {s.pdCode}
              </a>
            )}
          </div>
        </div>

        {/* cover */}
        <div data-reveal="" style={sx(`position:relative; margin-top:32px; border-radius:24px; overflow:hidden; background:${p.color}; border:1px solid var(--line); aspect-ratio:16/9; box-shadow:0 40px 80px -36px rgba(0,0,0,.55);`)}>
          <img src={asset(p.image)} alt={`${p.name} — screenshot`} style={sx(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:${p.imgPos}; display:block;`)} />
        </div>

        {/* body */}
        <div className="pd-grid" data-reveal="" style={sx('display:grid; grid-template-columns:1.7fr 1fr; gap:48px; margin-top:48px; align-items:center;')}>
          {/* main column */}
          <div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:700; letter-spacing:-.01em;")}>{s.pdOverview}</h2>
            <p style={sx('font-size:17px; line-height:1.7; color:var(--ink2); margin-top:14px;')}>{p.overview}</p>

            <h2 style={sx("font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:700; letter-spacing:-.01em; margin-top:36px;")}>{s.pdHighlights}</h2>
            <ul style={sx('list-style:none; margin-top:16px; display:flex; flex-direction:column; gap:12px;')}>
              {p.features.map((f, i) => (
                <li key={i} style={sx('display:flex; align-items:flex-start; gap:12px; font-size:15.5px; line-height:1.5; color:var(--ink2);')}>
                  <span aria-hidden="true" style={sx('flex:none; margin-top:2px; color:var(--accent); font-weight:700;')}>→</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* details sidebar */}
          <aside style={sx('background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:8px 22px 18px;')}>
            <h3 style={sx("font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--faint); text-transform:uppercase; letter-spacing:.08em; padding:18px 0 6px;")}>{s.pdDetails}</h3>
            {metaRow(s.pdType, catLabel(p.cat, s))}
            {metaRow(s.pdRole, p.role)}
            {metaRow(s.pdYear, p.year)}
            <div style={sx('padding:16px 0 4px;')}>
              <span style={sx("font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; display:block; margin-bottom:12px;")}>{s.pdStack}</span>
              <TechChips stack={p.stack} />
            </div>
          </aside>
        </div>
      </div>

      <FooterCTA s={s} maxw={1100} goContact={() => go('contact')} />
    </div>
  );
}
