import { sx } from '../lib/sx';
import { href } from '../lib/router';
import { CONTACT_EMAIL, type Strings } from '../data';

interface Props {
  s: Strings;
  maxw: number;
  goContact: () => void;
}

export default function FooterCTA({ s, maxw, goContact }: Props) {
  return (
    <div style={sx('border-top:1px solid var(--line); margin-top:40px;')}>
      <div className="page-pad" style={sx(`max-width:${maxw}px; margin:0 auto; padding:70px 56px;`)}>
        <h2 style={sx("font-family:var(--font-display); font-size:clamp(32px,5.5vw,68px); font-weight:700; letter-spacing:-.03em; line-height:1; color:var(--ink);")}>
          {s.contactTitle}
        </h2>
        <div style={sx('display:flex; gap:16px; margin-top:32px; align-items:center; flex-wrap:wrap;')}>
          <a href={href({ kind: 'contact' })} onClick={(e) => { e.preventDefault(); goContact(); }} style={sx('cursor:pointer; background:var(--accent); color:var(--accentink); padding:15px 26px; border-radius:30px; font-size:15px; font-weight:600; text-decoration:none;')}>
            {s.contactKicker} →
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} style={sx("font-family:var(--font-mono); font-size:13px; color:var(--muted); text-decoration:none;")}>
            {CONTACT_EMAIL}
          </a>
          <a href="https://github.com/adamsaber-mr" target="_blank" rel="noopener noreferrer" style={sx("font-family:var(--font-mono); font-size:13px; color:var(--muted); text-decoration:none;")}>
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}
