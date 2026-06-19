import { sx } from '../lib/sx';
import { PROJECTS, loc, type Lang, type Strings } from '../data';
import FooterCTA from './FooterCTA';
import type { Page } from '../App';

interface Props {
  s: Strings;
  lang: Lang;
  go: (p: Page) => void;
}

export default function Home({ s, lang, go }: Props) {
  const featured = PROJECTS.slice(0, 6).map((p) => loc(p, lang));

  return (
    <div data-screen-label="Home" className="pageintro">
      <div className="page-pad" style={sx('max-width:1440px; margin:0 auto; padding:64px 56px 20px; padding-bottom:100px; padding-top:100px;')}>
        <div className="hero-grid" style={sx('display:grid; grid-template-columns:1.05fr .8fr; gap:64px; align-items:center;')}>
          <div data-reveal="" style={sx('position:relative; z-index:2; max-width:760px;')}>
            <h1 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(44px,6vw,82px); line-height:1.02; font-weight:700; letter-spacing:-.03em; pointer-events:auto;")}>
              {s.heroL1}<br />{s.heroL2}<br /><span style={sx('color:var(--accent);')}>{s.heroL3}</span>
            </h1>
            <p style={sx('max-width:440px; font-size:18px; line-height:1.55; color:var(--muted); margin-top:26px; pointer-events:auto;')}>{s.heroBody}</p>
            <div style={sx('display:flex; gap:14px; margin-top:36px; flex-wrap:wrap; pointer-events:auto;')}>
              <span className="btn" onClick={() => go('work')} style={sx('background:var(--accent); color:var(--accentink); padding:14px 24px; border-radius:30px; font-size:15px; font-weight:600;')}>{s.heroCta1}</span>
              <span className="btn" onClick={() => go('about')} style={sx('border:1px solid var(--line); color:var(--ink); padding:13px 23px; border-radius:30px; font-size:15px; font-weight:500;')}>{s.heroCta2}</span>
            </div>
          </div>
          <div data-reveal="" style={sx('position:relative; width:100%; max-width:440px; justify-self:end; aspect-ratio:1/1; border-radius:28px; overflow:hidden; border:1px solid var(--line); box-shadow:0 40px 90px -30px rgba(0,0,0,.6); z-index:1;')}>
            <img src="/assets/me_header.png" alt="Adam Saber" style={sx('width:100%; height:100%; object-fit:cover; display:block;')} />
            <div style={sx('position:absolute; inset:0; background:linear-gradient(135deg, rgba(139,124,255,.12), transparent 55%); pointer-events:none;')}></div>
          </div>
        </div>
      </div>

      <div className="page-pad" style={sx('max-width:1440px; margin:0 auto; padding:64px 56px 40px;')}>
        <div data-reveal="" style={sx('display:flex; align-items:baseline; justify-content:space-between; margin-bottom:30px;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(26px,3.6vw,46px); font-weight:700; letter-spacing:-.02em;")}>{s.selectedWork}</h2>
          <span className="navlink" onClick={() => go('work')} style={sx("font-family:'JetBrains Mono',monospace; font-size:12px;")}>{s.viewAll} →</span>
        </div>
        <div className="featured-cols" style={sx('columns:3; column-gap:20px;')}>
          {featured.map((p, i) => (
            <div key={i} data-reveal="" className="card3d" onClick={() => go('work')} style={sx('break-inside:avoid; margin-bottom:20px; background:var(--surface); border:1px solid var(--line); border-radius:14px; overflow:hidden; cursor:pointer;')}>
              <div style={sx(`aspect-ratio:${p.ratio}; background:${p.color}; position:relative; overflow:hidden;`)}>
                <img src={p.image} alt={p.name} loading="lazy" style={sx('position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;')} />
                <span style={sx("position:absolute; left:14px; top:13px; font-family:'JetBrains Mono',monospace; font-size:10.5px; color:rgba(255,255,255,.9); background:rgba(0,0,0,.4); backdrop-filter:blur(4px); padding:4px 10px; border-radius:30px;")}>{p.kind}</span>
              </div>
              <div style={sx('padding:16px 17px 18px;')}>
                <div style={sx('display:flex; justify-content:space-between; align-items:baseline; gap:10px;')}>
                  <h3 style={sx("font-family:'Space Grotesk',sans-serif; font-size:17.5px; font-weight:600;")}>{p.name}</h3>
                </div>
                <p style={sx('font-size:13.5px; color:var(--muted); line-height:1.5; margin-top:8px;')}>{p.blurb}</p>
                <div style={sx("font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--accent); margin-top:12px;")}>{p.stack}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterCTA s={s} maxw={1440} goContact={() => go('contact')} />
    </div>
  );
}
