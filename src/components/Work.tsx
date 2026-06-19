import { sx } from '../lib/sx';
import { PROJECTS, loc, type Cat, type Lang, type Strings } from '../data';
import FooterCTA from './FooterCTA';
import type { Page } from '../App';

type Filter = 'all' | Cat;

interface Props {
  s: Strings;
  lang: Lang;
  filter: Filter;
  setFilter: (f: Filter) => void;
  slide: number | null;
  setSlide: (i: number | null) => void;
  go: (p: Page) => void;
}

function filterStyle(active: boolean): string {
  return `font-size:12px;padding:8px 15px;border-radius:30px;cursor:pointer;border:1px solid ${active ? 'var(--accent)' : 'var(--line)'};background:${active ? 'var(--accent)' : 'transparent'};color:${active ? 'var(--accentink)' : 'var(--muted)'};`;
}

export default function Work({ s, lang, filter, setFilter, slide, setSlide, go }: Props) {
  const all = PROJECTS.map((p) => loc(p, lang));
  const vis = filter === 'all' ? all : all.filter((p) => p.cat === filter);
  const defIdx = Math.floor(Math.max(0, vis.length - 1) / 2);
  const active = slide == null ? defIdx : Math.max(0, Math.min(slide, Math.max(0, vis.length - 1)));

  const filterDefs: { key: Filter; label: string }[] = [
    { key: 'all', label: s.fAll }, { key: 'front', label: s.fFront }, { key: 'full', label: s.fFull }, { key: 'data', label: s.fData },
  ];

  const act = vis[active] || all[0];

  return (
    <div data-screen-label="Projecten" className="pageintro">
      <div className="page-pad" style={sx('max-width:1440px; margin:0 auto; padding:56px 56px 10px;')}>
        <div data-reveal="" style={sx('border-bottom:1px solid var(--line); padding-bottom:36px;')}>
          <h1 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(40px,6vw,80px); line-height:.98; font-weight:700; letter-spacing:-.03em;")}>{s.workTitle}</h1>
          <p style={sx('max-width:460px; font-size:17px; line-height:1.55; color:var(--muted); margin-top:20px;')}>{s.workBody}</p>
        </div>

        <div data-reveal="" style={sx("display:flex; gap:8px; flex-wrap:wrap; padding:26px 0 30px; font-family:'JetBrains Mono',monospace;")}>
          {filterDefs.map((f) => (
            <span key={f.key} className="btn" onClick={() => setFilter(f.key)} style={sx(filterStyle(filter === f.key))}>{f.label}</span>
          ))}
        </div>

        <div style={sx('position:relative; padding:10px 0 6px;')}>
          <div style={sx('position:relative; height:430px; perspective:2000px;')}>
            <div style={sx('position:absolute; inset:0; transform-style:preserve-3d;')}>
              {vis.map((c, i) => {
                const off = i - active, ab = Math.abs(off);
                const tx = off * 300, tz = -ab * 230, ry = 0, scv = Math.max(0.62, 1 - ab * 0.08);
                const op = ab > 2.4 ? 0 : Number((1 - ab * 0.16).toFixed(2));
                const z = 100 - Math.round(ab * 10);
                const style = `position:absolute; left:50%; top:0; width:300px; height:418px; margin-left:-150px; transform:translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scv.toFixed(3)}); opacity:${op}; z-index:${z}; pointer-events:${ab > 2.4 ? 'none' : 'auto'}; cursor:${off === 0 ? 'default' : 'pointer'};`;
                return (
                  <div key={i} className="work3d-card" onClick={() => setSlide(i)} style={sx(style)}>
                    <div style={sx(`position:relative; width:100%; height:100%; border-radius:20px; overflow:hidden; background:${c.color}; border:1px solid rgba(255,255,255,.08); box-shadow:0 36px 70px -24px rgba(0,0,0,.65); display:flex; flex-direction:column; justify-content:space-between;`)}>
                      <img src={c.image} alt={c.name} loading="lazy" style={sx('position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;')} />
                      <div style={sx('position:relative; z-index:1; padding:16px;')}>
                        <span style={sx("display:inline-block; font-family:'JetBrains Mono',monospace; font-size:10.5px; color:#fff; background:rgba(0,0,0,.4); padding:5px 11px; border-radius:30px; backdrop-filter:blur(4px);")}>{c.kind}</span>
                      </div>
                      <div style={sx('position:relative; z-index:1; padding:20px 18px 22px; background:linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,0));')}>
                        <h3 style={sx("font-family:'Space Grotesk',sans-serif; font-size:24px; font-weight:700; color:#fff; letter-spacing:-.01em;")}>{c.name}</h3>
                        <div style={sx("font-family:'JetBrains Mono',monospace; font-size:11px; color:rgba(255,255,255,.72); margin-top:6px;")}>{c.stack}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={sx('display:flex; align-items:center; justify-content:center; gap:20px; margin-top:18px;')}>
            <span className="carnav" onClick={() => setSlide(Math.max(0, (slide == null ? defIdx : slide) - 1))}>‹</span>
            <div style={sx('display:flex; gap:8px; align-items:center;')}>
              {vis.map((_, i) => (
                <span key={i} onClick={() => setSlide(i)} style={sx(`width:${i === active ? '24px' : '8px'}; height:8px; border-radius:30px; background:${i === active ? 'var(--accent)' : 'var(--line)'}; cursor:pointer; transition:width .3s ease, background .3s ease; display:block;`)}></span>
              ))}
            </div>
            <span className="carnav" onClick={() => setSlide(Math.min(vis.length - 1, (slide == null ? defIdx : slide) + 1))}>›</span>
          </div>

          <div style={sx('max-width:600px; margin:24px auto 4px; text-align:center; min-height:62px;')}>
            <p style={sx('font-size:16.5px; line-height:1.6; color:var(--ink2);')}>{act?.blurb}</p>
            <div style={sx("font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--accent); margin-top:10px;")}>{act?.stack}</div>
          </div>
        </div>
      </div>
      <FooterCTA s={s} maxw={1440} goContact={() => go('contact')} />
    </div>
  );
}
