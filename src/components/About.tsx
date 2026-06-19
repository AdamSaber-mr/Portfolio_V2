import { sx } from '../lib/sx';
import { asset } from '../lib/asset';
import { buildJourney, buildSkills, type Lang, type Strings } from '../data';
import FooterCTA from './FooterCTA';
import type { Page } from '../App';

interface Props {
  s: Strings;
  lang: Lang;
  go: (p: Page) => void;
}

export default function About({ s, lang, go }: Props) {
  const { nodes, wavePath } = buildJourney(lang);
  const skills = buildSkills(lang);

  return (
    <div data-screen-label="Over mij" className="pageintro">
      <div className="page-pad" style={sx('max-width:1320px; margin:0 auto; padding:104px 56px 10px;')}>
        <div data-reveal="" style={sx('border-bottom:1px solid var(--line); padding:6px 0 44px;')}>
          <h1 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(34px,5vw,62px); line-height:1.04; font-weight:700; letter-spacing:-.03em; max-width:780px;")}>{s.aboutTitle}</h1>
        </div>

        <div className="about-bio" style={sx('display:grid; grid-template-columns:1.1fr .82fr; gap:56px; align-items:center; padding:48px 0 30px;')}>
          <div data-reveal="" style={sx('display:flex; flex-direction:column; gap:22px;')}>
            <p style={sx('font-size:18px; line-height:1.7; color:var(--ink);')}>{s.aboutP1}</p>
            <p style={sx('font-size:16px; line-height:1.7; color:var(--ink2);')}>{s.aboutP2}</p>
            <p style={sx('font-size:16px; line-height:1.7; color:var(--ink2);')}>{s.aboutP3}</p>
          </div>
          <div data-reveal="" style={sx('display:flex; justify-content:center; align-items:center;')}>
            <div style={sx('width:100%; max-width:400px; border-radius:22px; overflow:hidden; border:1px solid var(--line); box-shadow:0 34px 64px -26px rgba(0,0,0,.55);')}>
              <img src={asset('assets/me_3.png')} alt="Adam Saber aan het werk" style={sx('width:100%; aspect-ratio:4/5; object-fit:cover; object-position:center 38%; display:block;')} />
            </div>
          </div>
        </div>

        {/* journey */}
        <div data-reveal="" style={sx('padding:54px 0; border-bottom:1px solid var(--line);')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(24px,3.4vw,40px); font-weight:700; letter-spacing:-.02em; margin-bottom:38px;")}>{s.journeyTitle}</h2>
          <div style={sx('position:relative;')}>
            <div style={sx('position:relative; height:132px;')}>
              <svg viewBox="0 0 1000 132" preserveAspectRatio="none" style={sx('position:absolute; inset:0; width:100%; height:132px; overflow:visible;')}>
                <defs>
                  <linearGradient id="jgrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#e34f26"></stop><stop offset="0.4" stopColor="#777bb4"></stop><stop offset="0.72" stopColor="#61dafb"></stop><stop offset="1" stopColor="#ff2d20"></stop>
                  </linearGradient>
                </defs>
                <path d={wavePath} pathLength={1000} fill="none" stroke="url(#jgrad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.35"></path>
                <path className="jwave-pulse" d={wavePath} pathLength={1000} fill="none" stroke="url(#jgrad)" strokeWidth="4" strokeLinecap="round"></path>
              </svg>
              {nodes.map((j, i) => (
                <div key={i} className="jnode" style={sx(`--c:${j.color}; position:absolute; left:calc(${j.xPct}% - 23px); top:${j.top}px;`)}>{j.num}</div>
              ))}
            </div>
            <div className="journey-steps" style={sx('display:grid; grid-template-columns:repeat(4,1fr); gap:0; margin-top:20px;')}>
              {nodes.map((j, i) => (
                <div key={i} className="jstep" style={sx('text-align:center; padding:0 12px;')}>
                  <div style={sx(`font-family:'JetBrains Mono',monospace; font-size:11px; color:${j.color}; margin-bottom:8px;`)}>{j.phase}</div>
                  <div style={sx("font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:16px; margin-bottom:6px;")}>{j.title}</div>
                  <p style={sx('font-size:13px; color:var(--muted); line-height:1.5;')}>{j.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* skills */}
        <div data-reveal="" style={sx('padding:54px 0 30px;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(24px,3.4vw,40px); font-weight:700; letter-spacing:-.02em; margin-bottom:8px;")}>{s.skillsTitle}</h2>
          <p style={sx('font-size:16px; color:var(--muted); margin-bottom:14px; max-width:520px;')}>{s.skillsBody}</p>
          <div className="skills-grid" style={sx('display:grid; grid-template-columns:repeat(2,1fr); gap:18px; margin-top:30px;')}>
            {skills.map((g, i) => (
              <div key={i} data-reveal="" className="skillcard" style={sx('position:relative; background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:26px 26px 24px;')}>
                <div style={sx('display:flex; align-items:baseline; justify-content:space-between; gap:12px; margin-bottom:16px;')}>
                  <h3 style={sx("font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:700; letter-spacing:-.01em;")}>{g.area}</h3>
                  <span style={sx("font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--faint);")}>{g.tag}</span>
                </div>
                <div style={sx('display:flex; flex-wrap:wrap; gap:9px; margin-bottom:16px;')}>
                  {g.chips.map((c, ci) => (
                    <span key={ci} className="jchip" style={sx(c.style)}>
                      {c.icon && <img src={c.icon} alt="" style={{ width: '15px', height: '15px', display: 'block', opacity: c.iconOpacity }} />}
                      {c.label}
                    </span>
                  ))}
                </div>
                <p style={sx('font-size:14.5px; color:var(--ink2); line-height:1.6;')}>{g.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterCTA s={s} maxw={1320} goContact={() => go('contact')} />
    </div>
  );
}
