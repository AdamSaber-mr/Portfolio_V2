import { lazy, Suspense, useEffect, useState } from 'react';
import { sx } from './lib/sx';
import { STR, CONTACT_EMAIL, type Cat, type Lang } from './data';
import { useReveal } from './hooks/useReveal';
import Nav from './components/Nav';

// three.js is heavy; load the animated background in its own chunk after paint
const AuroraBackground = lazy(() => import('./components/AuroraBackground'));
import Home from './components/Home';
import Work from './components/Work';
import About from './components/About';
import Contact, { type ContactForm } from './components/Contact';

export type Page = 'home' | 'work' | 'about' | 'contact';
type Filter = 'all' | Cat;

const emptyForm: ContactForm = { fName: '', fEmail: '', fSubject: '', fMsg: '' };

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState<Lang>('nl');
  const [filter, setFilterState] = useState<Filter>('all');
  const [slide, setSlide] = useState<number | null>(null);
  const [form, setFormState] = useState<ContactForm>(emptyForm);
  const [sent, setSent] = useState(false);

  const s = STR[lang];

  useReveal(`${page}-${lang}`);

  // keep the document background in sync with the theme (avoids white flash)
  useEffect(() => {
    document.body.style.background = dark ? '#0a0b0d' : '#f4f3f8';
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const go = (p: Page) => {
    if (page === p) return;
    if (p === 'work') setSlide(null);
    setPage(p);
    window.scrollTo(0, 0);
  };

  const setFilter = (f: Filter) => {
    setFilterState(f);
    setSlide(null);
  };

  const setForm = (patch: Partial<ContactForm>) => setFormState((prev) => ({ ...prev, ...patch }));

  const submit = () => {
    const { fName, fEmail, fSubject, fMsg } = form;
    const subj = encodeURIComponent(fSubject || ((lang === 'nl' ? 'Bericht van ' : 'Message from ') + (fName || 'portfolio')));
    const body = encodeURIComponent((fMsg || '') + '\n\n' + (fName || '') + (fEmail ? ' (' + fEmail + ')' : ''));
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subj}&body=${body}`;
    setSent(true);
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

      {page === 'home' && <Home s={s} lang={lang} go={go} />}
      {page === 'work' && (
        <Work s={s} lang={lang} filter={filter} setFilter={setFilter} slide={slide} setSlide={setSlide} go={go} />
      )}
      {page === 'about' && <About s={s} lang={lang} go={go} />}
      {page === 'contact' && <Contact s={s} lang={lang} form={form} setForm={setForm} submit={submit} sent={sent} />}
    </div>
  );
}
