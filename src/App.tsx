import { lazy, Suspense, useEffect, useState } from 'react';
import { sx } from './lib/sx';
import { STR, CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY, type Filter, type Lang } from './data';
import { useReveal } from './hooks/useReveal';
import Nav from './components/Nav';
import Home from './components/Home';
import Work from './components/Work';
import ProjectDetail from './components/ProjectDetail';
import About from './components/About';
import Contact, { type ContactForm } from './components/Contact';
import { PROJECTS, loc } from './data';

// three.js is heavy; load the animated background in its own chunk after paint
const AuroraBackground = lazy(() => import('./components/AuroraBackground'));

export type Page = 'home' | 'work' | 'about' | 'contact';

const emptyForm: ContactForm = { fName: '', fEmail: '', fSubject: '', fMsg: '', hp: '' };

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState<Lang>('nl');
  const [filter, setFilterState] = useState<Filter>('all');
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [form, setFormState] = useState<ContactForm>(emptyForm);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const s = STR[lang];

  useReveal(`${page}-${lang}-${openProject ?? ''}`);

  // keep the document background in sync with the theme (avoids white flash)
  useEffect(() => {
    document.body.style.background = dark ? '#0a0b0d' : '#f4f3f8';
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const go = (p: Page) => {
    setOpenProject(null);
    if (page === p) return;
    setPage(p);
    window.scrollTo(0, 0);
  };

  const openDetail = (name: string) => {
    setOpenProject(name);
    setPage('work'); // so the detail view shows even when opened from the home teaser
    window.scrollTo(0, 0);
  };

  const closeDetail = () => {
    setOpenProject(null);
    window.scrollTo(0, 0);
  };

  const detail = openProject ? PROJECTS.find((p) => p.name === openProject) ?? null : null;

  const setFilter = (f: Filter) => {
    setFilterState(f);
  };

  const setForm = (patch: Partial<ContactForm>) => setFormState((prev) => ({ ...prev, ...patch }));

  const submit = async () => {
    const { fName, fEmail, fSubject, fMsg, hp } = form;
    // Honeypot tripped → a bot filled the hidden field. Pretend success, send nothing.
    if (hp) { setSent(true); return; }
    const subject = fSubject || ((lang === 'nl' ? 'Bericht van ' : 'Message from ') + (fName || 'portfolio'));

    // No key configured yet → fall back to the user's mail app so nothing breaks.
    if (!WEB3FORMS_ACCESS_KEY) {
      const body = encodeURIComponent((fMsg || '') + '\n\n' + (fName || '') + (fEmail ? ' (' + fEmail + ')' : ''));
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
      setSent(true);
      return;
    }

    setSending(true);
    setSendError('');
    try {
      // FormData (multipart) is CORS-safelisted, so it skips the preflight that
      // blocked the JSON request on localhost — and it's Web3Forms' default method.
      const fd = new FormData();
      fd.append('access_key', WEB3FORMS_ACCESS_KEY);
      fd.append('name', fName);
      fd.append('email', fEmail);
      fd.append('subject', subject);
      fd.append('message', fMsg);
      fd.append('from_name', 'Portfolio contactformulier');
      fd.append('botcheck', hp);
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setSendError((lang === 'nl' ? 'Versturen mislukt: ' : 'Sending failed: ') + (data.message || (lang === 'nl' ? 'probeer het later opnieuw.' : 'please try again later.')));
      }
    } catch {
      setSendError(lang === 'nl' ? 'Versturen mislukt. Controleer je internetverbinding.' : 'Sending failed. Please check your connection.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="root"
      data-theme={dark ? 'dark' : 'light'}
      style={sx("background:var(--bg); color:var(--ink); font-family:'Hanken Grotesk',sans-serif; min-height:100vh; transition:background .35s ease,color .35s ease;")}
    >
      <Suspense fallback={null}>
        <AuroraBackground dark={dark} page={page} />
      </Suspense>

      <Nav
        s={s}
        page={page}
        isDark={dark}
        langLabel={lang === 'nl' ? 'EN' : 'NL'}
        go={go}
        toggleTheme={() => setDark((d) => !d)}
        toggleLang={() => setLang((l) => (l === 'nl' ? 'en' : 'nl'))}
      />

      {page === 'home' && <Home s={s} lang={lang} go={go} openDetail={openDetail} dark={dark} />}
      {page === 'work' &&
        (detail ? (
          <ProjectDetail s={s} project={loc(detail, lang)} back={closeDetail} go={go} />
        ) : (
          <Work s={s} lang={lang} filter={filter} setFilter={setFilter} openDetail={openDetail} />
        ))}
      {page === 'about' && <About s={s} lang={lang} />}
      {page === 'contact' && <Contact s={s} lang={lang} form={form} setForm={setForm} submit={submit} sent={sent} sending={sending} error={sendError} />}
    </div>
  );
}
