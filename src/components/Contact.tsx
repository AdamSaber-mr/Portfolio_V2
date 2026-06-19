import { sx } from '../lib/sx';
import { buildContactLinks, type Lang, type Strings } from '../data';

export interface ContactForm {
  fName: string;
  fEmail: string;
  fSubject: string;
  fMsg: string;
}

interface Props {
  s: Strings;
  lang: Lang;
  form: ContactForm;
  setForm: (patch: Partial<ContactForm>) => void;
  submit: () => void;
  sent: boolean;
}

const inputStyle = 'width:100%; padding:13px 14px; background:var(--bg); border:1px solid var(--line); border-radius:8px; font-size:15px; color:var(--ink);';
const labelStyle = "display:block; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); margin-bottom:9px;";

export default function Contact({ s, lang, form, setForm, submit, sent }: Props) {
  const links = buildContactLinks(lang);

  return (
    <div data-screen-label="Contact" className="pageintro">
      <div className="page-pad contact-wrap" style={sx('max-width:1320px; margin:0 auto; padding:48px 56px; min-height:calc(100vh - 74px); display:flex; flex-direction:column; justify-content:center;')}>
        <div className="contact-grid" style={sx('display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center;')}>
          <div data-reveal="">
            <h1 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(38px,6vw,72px); line-height:1.0; font-weight:700; letter-spacing:-.03em;")}>{s.contactTitle}</h1>
            <p style={sx('font-size:18px; line-height:1.6; color:var(--muted); margin-top:22px; max-width:380px;')}>{s.contactBody}</p>
            <div style={sx('margin-top:36px;')}>
              {links.map((c, i) => {
                const external = c.href.startsWith('http');
                return (
                  <a
                    key={i}
                    href={c.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    style={sx('display:flex; align-items:center; justify-content:space-between; gap:16px; padding:16px 0; border-top:1px solid var(--line); text-decoration:none; color:var(--ink);')}
                  >
                    <span style={sx("font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--faint);")}>{c.label}</span>
                    <span style={sx('font-size:15px; font-weight:600;')}>{c.value} ↗</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div data-reveal="" style={sx('background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:30px;')}>
            {sent ? (
              <div style={sx('padding:40px 0; text-align:center;')}>
                <div style={sx('font-size:34px; margin-bottom:14px; color:var(--accent);')}>✓</div>
                <h3 style={sx("font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:600; margin-bottom:8px;")}>{s.sentTitle}</h3>
                <p style={sx('font-size:15px; color:var(--muted);')}>{s.sentBody}</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
                <div className="field-row" style={sx('display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:18px;')}>
                  <div>
                    <label htmlFor="cf-name" style={sx(labelStyle)}>{s.fName}</label>
                    <input id="cf-name" name="name" type="text" autoComplete="name" value={form.fName} onChange={(e) => setForm({ fName: e.target.value })} placeholder={s.phName} style={sx(inputStyle)} />
                  </div>
                  <div>
                    <label htmlFor="cf-email" style={sx(labelStyle)}>{s.fEmail}</label>
                    <input id="cf-email" name="email" type="email" autoComplete="email" value={form.fEmail} onChange={(e) => setForm({ fEmail: e.target.value })} placeholder={s.phEmail} style={sx(inputStyle)} />
                  </div>
                </div>
                <label htmlFor="cf-subject" style={sx(labelStyle)}>{s.fSubject}</label>
                <input id="cf-subject" name="subject" type="text" value={form.fSubject} onChange={(e) => setForm({ fSubject: e.target.value })} placeholder={s.phSubject} style={sx(inputStyle + ' margin-bottom:18px;')} />
                <label htmlFor="cf-msg" style={sx(labelStyle)}>{s.fMsg}</label>
                <textarea id="cf-msg" name="message" value={form.fMsg} onChange={(e) => setForm({ fMsg: e.target.value })} rows={5} placeholder={s.phMsg} style={sx(inputStyle + ' resize:vertical; margin-bottom:20px;')}></textarea>
                <button type="submit" className="btn" style={sx('display:block; width:100%; text-align:center; cursor:pointer; background:var(--accent); color:var(--accentink); padding:15px; border-radius:30px; font-size:15px; font-weight:600;')}>{s.send} →</button>
                <p style={sx('font-size:12.5px; color:var(--faint); line-height:1.5; text-align:center; margin-top:14px;')}>{s.formNote}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
