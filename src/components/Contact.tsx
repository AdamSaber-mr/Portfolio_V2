import { useState } from 'react';
import { sx } from '../lib/sx';
import { buildContactLinks, buildStage, type Lang, type Strings } from '../data';

export interface ContactForm {
  fName: string;
  fEmail: string;
  fSubject: string;
  fMsg: string;
  /** Honeypot — stays empty for humans; bots that fill it get blocked. */
  hp: string;
}

interface Props {
  s: Strings;
  lang: Lang;
  form: ContactForm;
  setForm: (patch: Partial<ContactForm>) => void;
  submit: () => void;
  sent: boolean;
  sending: boolean;
  error: string;
}

const inputStyle = 'width:100%; padding:13px 14px; background:var(--card-field); border:1px solid var(--card-line); border-radius:8px; font-size:15px; color:var(--card-ink);';
const labelStyle = "display:block; font-family:var(--font-mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--card-muted); margin-bottom:9px;";
// Fouten worden aangegeven met gewicht en de accentkleur, niet met een eigen
// rood: op papier haalt #ff8080 geen leesbaar contrast, en WCAG 1.4.1 vraagt
// sowieso om meer dan alleen kleur. Fase 5 maakt hier een gelijnd veld van.
const errStyle = 'display:block; font-size:var(--t-meta); font-weight:var(--w-semibold); color:var(--accent); margin-top:var(--s-2);';

type FieldErrors = Partial<Record<'fName' | 'fEmail' | 'fMsg', string>>;

/** Bewust simpel: precies genoeg om typefouten te vangen, zonder geldige adressen te weigeren. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact({ s, lang, form, setForm, submit, sent, sending, error }: Props) {
  const links = buildContactLinks(lang);
  const stage = buildStage(lang);
  const [errors, setErrors] = useState<FieldErrors>({});

  /**
   * Valideer vóór versturen. Zonder dit kon een leeg formulier verstuurd worden en
   * kreeg de bezoeker alsnog "Verzonden!" te zien — een recruiter die zijn adres
   * verkeerd typte hoorde dan nooit meer iets, en jij wist van niets.
   */
  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!form.fName.trim()) next.fName = s.errName;
    if (!EMAIL_RE.test(form.fEmail.trim())) next.fEmail = s.errEmail;
    if (form.fMsg.trim().length < 10) next.fMsg = s.errMsg;
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.getElementById('cf-' + (next.fName ? 'name' : next.fEmail ? 'email' : 'msg'));
      first?.focus();
      return false;
    }
    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) submit();
  };

  /** Wis de fout van een veld zodra de bezoeker het aanpast. */
  const patch = (p: Partial<ContactForm>, key?: keyof FieldErrors) => {
    setForm(p);
    if (key && errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const describedBy = (key: keyof FieldErrors, id: string) => (errors[key] ? id : undefined);

  return (
    <div className="pageintro">
      <div className="page-pad contact-wrap" style={sx('max-width:1320px; margin:0 auto; padding:48px 56px; min-height:calc(100dvh - 74px); display:flex; flex-direction:column; justify-content:center;')}>
        <div className="contact-grid" style={sx('display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center;')}>
          <div data-reveal="">
            <h1 style={sx("font-family:var(--font-display); font-size:clamp(38px,6vw,72px); line-height:1.0; font-weight:700; letter-spacing:-.03em;")}>{s.contactTitle}</h1>
            <p style={sx('font-size:18px; line-height:1.6; color:var(--muted); margin-top:22px; max-width:380px;')}>{s.contactBody}</p>

            {/* Stage-details: haalt de eerste drie vragen weg die een
                stagecoördinator anders per mail zou moeten stellen. */}
            <section aria-labelledby="stage-title" style={sx('margin-top:34px; padding:22px 24px; background:var(--card); color:var(--card-ink); border:1px solid var(--card-line); border-radius:16px;')}>
              <h2 id="stage-title" style={sx("font-family:var(--font-mono); font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--accent); margin-bottom:14px;")}>
                {s.stageTitle}
              </h2>
              <dl style={sx('display:grid; grid-template-columns:auto 1fr; gap:9px 18px; margin:0; font-size:14px;')}>
                {stage.map((row, i) => (
                  <div key={i} style={sx('display:contents;')}>
                    <dt style={sx('color:var(--card-muted);')}>{row.label}</dt>
                    <dd style={sx('margin:0; font-weight:600; color:var(--card-ink); text-align:right;')}>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div style={sx('margin-top:30px;')}>
              {links.map((c, i) => {
                const external = c.href.startsWith('http');
                const rowStyle = sx('display:flex; align-items:center; justify-content:space-between; gap:16px; padding:16px 0; border-top:1px solid var(--line); text-decoration:none; color:var(--ink);');
                const label = <span style={sx("font-family:var(--font-mono); font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink2);")}>{c.label}</span>;

                // Geen href = geen link. Locatie is informatie, geen bestemming.
                if (!c.href) {
                  return (
                    <div key={i} style={rowStyle}>
                      {label}
                      <span style={sx('font-size:15px; font-weight:600;')}>{c.value}</span>
                    </div>
                  );
                }
                return (
                  <a
                    key={i}
                    href={c.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    style={rowStyle}
                  >
                    {label}
                    <span style={sx('font-size:15px; font-weight:600;')}>
                      {c.value} <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div data-reveal="" style={sx('background:var(--card); color:var(--card-ink); border:1px solid var(--card-line); border-radius:14px; padding:30px;')}>
            {/* Screenreaders horen het resultaat doordat deze regio live is. */}
            <div aria-live="polite" role="status">
              {sent && (
                <div style={sx('padding:40px 0; text-align:center;')}>
                  <div aria-hidden="true" style={sx('font-size:34px; margin-bottom:14px; color:var(--accent);')}>✓</div>
                  <h3 style={sx("font-family:var(--font-display); font-size:22px; font-weight:600; margin-bottom:8px;")}>{s.sentTitle}</h3>
                  <p style={sx('font-size:15px; color:var(--card-muted);')}>{s.sentBody}</p>
                </div>
              )}
            </div>

            {!sent && (
              <form onSubmit={onSubmit} noValidate>
                {/* honeypot: hidden from humans, bots fill it → Web3Forms blocks the submission */}
                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.hp}
                  onChange={(e) => setForm({ hp: e.target.value })}
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
                />
                <div className="field-row" style={sx('display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:18px;')}>
                  <div>
                    <label htmlFor="cf-name" style={sx(labelStyle)}>{s.fName}</label>
                    <input
                      id="cf-name" name="name" type="text" autoComplete="name" required
                      value={form.fName}
                      onChange={(e) => patch({ fName: e.target.value }, 'fName')}
                      placeholder={s.phName}
                      aria-invalid={errors.fName ? true : undefined}
                      aria-describedby={describedBy('fName', 'cf-name-err')}
                      style={sx(inputStyle)}
                    />
                    {errors.fName && <span id="cf-name-err" style={sx(errStyle)}>{errors.fName}</span>}
                  </div>
                  <div>
                    <label htmlFor="cf-email" style={sx(labelStyle)}>{s.fEmail}</label>
                    <input
                      id="cf-email" name="email" type="email" autoComplete="email" required
                      value={form.fEmail}
                      onChange={(e) => patch({ fEmail: e.target.value }, 'fEmail')}
                      placeholder={s.phEmail}
                      aria-invalid={errors.fEmail ? true : undefined}
                      aria-describedby={describedBy('fEmail', 'cf-email-err')}
                      style={sx(inputStyle)}
                    />
                    {errors.fEmail && <span id="cf-email-err" style={sx(errStyle)}>{errors.fEmail}</span>}
                  </div>
                </div>
                <label htmlFor="cf-subject" style={sx(labelStyle)}>{s.fSubject}</label>
                <input
                  id="cf-subject" name="subject" type="text"
                  value={form.fSubject}
                  onChange={(e) => setForm({ fSubject: e.target.value })}
                  placeholder={s.phSubject}
                  style={sx(inputStyle + ' margin-bottom:18px;')}
                />
                <label htmlFor="cf-msg" style={sx(labelStyle)}>{s.fMsg}</label>
                <textarea
                  id="cf-msg" name="message" rows={5} required
                  value={form.fMsg}
                  onChange={(e) => patch({ fMsg: e.target.value }, 'fMsg')}
                  placeholder={s.phMsg}
                  aria-invalid={errors.fMsg ? true : undefined}
                  aria-describedby={describedBy('fMsg', 'cf-msg-err')}
                  style={sx(inputStyle + ' resize:vertical;')}
                ></textarea>
                {errors.fMsg && <span id="cf-msg-err" style={sx(errStyle)}>{errors.fMsg}</span>}

                <button type="submit" disabled={sending} className="btn" style={sx(`display:block; width:100%; margin-top:20px; text-align:center; cursor:${sending ? 'default' : 'pointer'}; opacity:${sending ? '.65' : '1'}; background:var(--accent); color:var(--accentink); padding:15px; border-radius:30px; font-size:15px; font-weight:600;`)}>
                  {sending ? (lang === 'nl' ? 'Versturen…' : 'Sending…') : `${s.send} →`}
                </button>
                <div aria-live="assertive">
                  {error && <p style={sx('font-size:var(--t-meta); font-weight:var(--w-semibold); color:var(--accent); line-height:var(--lh-tight); text-align:center; margin-top:var(--s-4);')}>{error}</p>}
                </div>
                {!error && <p style={sx('font-size:12.5px; color:var(--card-muted); line-height:1.5; text-align:center; margin-top:14px;')}>{s.formNote}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
