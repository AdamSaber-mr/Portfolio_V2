import { sx } from '../lib/sx';
import { href } from '../lib/router';
import type { Strings } from '../data';
import type { Page } from '../App';

interface Props {
  s: Strings;
  go: (p: Page) => void;
}

/** Getoond wanneer een URL nergens op slaat — bv. een oude of vertypte link. */
export default function NotFound({ s, go }: Props) {
  return (
    <div className="pageintro">
      <div className="page-pad" style={sx('max-width:760px; margin:0 auto; padding:120px 56px 96px; text-align:center;')}>
        <p style={sx("font-family:var(--font-mono); font-size:13px; letter-spacing:.14em; text-transform:uppercase; color:var(--accent); margin-bottom:18px;")}>404</p>
        <h1 style={sx("font-family:var(--font-display); font-size:clamp(34px,5vw,58px); line-height:1.05; font-weight:700; letter-spacing:-.03em;")}>
          {s.nfTitle}
        </h1>
        <p style={sx('font-size:17px; line-height:1.6; color:var(--muted); margin:22px auto 36px; max-width:420px;')}>
          {s.nfBody}
        </p>
        <div style={sx('display:flex; gap:14px; justify-content:center; flex-wrap:wrap;')}>
          <a
            className="btn"
            href={href({ kind: 'home' })}
            onClick={(e) => { e.preventDefault(); go('home'); }}
            style={sx('background:var(--accent); color:var(--accentink); padding:14px 24px; border-radius:30px; font-size:15px; font-weight:600; text-decoration:none;')}
          >
            {s.nfHome}
          </a>
          <a
            className="btn"
            href={href({ kind: 'work' })}
            onClick={(e) => { e.preventDefault(); go('work'); }}
            style={sx('border:1px solid var(--line); color:var(--ink); padding:13px 23px; border-radius:30px; font-size:15px; font-weight:500; text-decoration:none;')}
          >
            {s.nfWork}
          </a>
        </div>
      </div>
    </div>
  );
}
