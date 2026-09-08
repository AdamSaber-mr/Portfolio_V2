import { lazy, Suspense, useEffect, useState } from 'react';
import { sx } from './lib/sx';
import { STR, CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY, buildDateline, projectNumber, type Lang } from './data';
import { useReveal } from './hooks/useReveal';
import { useHead } from './hooks/useHead';
import { useRoute, navigate, topPageOf, type TopPage } from './lib/router';
import Nav from './components/Nav';
import Home from './components/Home';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import type { ContactForm } from './components/Contact';
import { PROJECTS, loc } from './data';

// Home is de landingspagina en blijft in de hoofdbundle. De rest komt pas binnen
// wanneer je er daadwerkelijk heen navigeert, zodat de eerste load alleen betaalt
// voor wat je meteen ziet.
const Work = lazy(() => import('./components/Work'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

/** De vier hoofdpagina's — projectdetails vallen onder 'work'. */
export type Page = TopPage;

const emptyForm: ContactForm = { fName: '', fEmail: '', fSubject: '', fMsg: '', hp: '' };

/** Beginwaarde uit theme.js, dat het thema al vóór de eerste paint heeft gezet. */
function initialDark(): boolean {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function initialLang(): Lang {
  try {
    return localStorage.getItem('lang') === 'en' ? 'en' : 'nl';
  } catch {
    return 'nl';
  }
}

export default function App() {
  const route = useRoute();
  const page = topPageOf(route);

  const [dark, setDark] = useState(initialDark);
  const [lang, setLang] = useState<Lang>(initialLang);
  const [form, setFormState] = useState<ContactForm>(emptyForm);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const s = STR[lang];
  const detail = route.kind === 'project' ? PROJECTS.find((p) => p.slug === route.slug) ?? null : null;

  // Linkerhelft van de dateline. Op een projectpagina staat het nummer erbij, wat
  // hetzelfde nummer is als in de index op de homepage en op de werkpagina.
  const sectionLabel: Record<typeof page, string> = {
    home: s.navHome, work: s.navWork, about: s.navAbout, contact: s.navContact,
  };
  const where = detail
    ? `${s.navWork} — ${projectNumber(detail.slug)} ${detail.name}`
    : route.kind === 'notfound' ? '404' : sectionLabel[page];

  useReveal(route.kind + '-' + lang + '-' + (detail?.slug ?? ''));
  useHead(route);

  // `data-theme` op <html> is de enige themaschakelaar; de achtergrond komt uit
  // --paper in de CSS. Een inline-style op body zou dat token overrulen en het
  // thema met zichzelf laten vechten bij het omzetten.
  useEffect(() => {
    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#16130f' : '#f4f1ea');
    try { localStorage.setItem('theme', theme); } catch { /* private mode */ }
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch { /* private mode */ }
  }, [lang]);

  const go = (p: Page) => {
    navigate({ kind: p });
    window.scrollTo(0, 0);
  };

  const openDetail = (slug: string) => {
    navigate({ kind: 'project', slug });
    window.scrollTo(0, 0);
  };

  const closeDetail = () => {
    navigate({ kind: 'work' });
    window.scrollTo(0, 0);
  };

  const setForm = (patch: Partial<ContactForm>) => setFormState((prev) => ({ ...prev, ...patch }));

  const submit = async () => {
    const { fName, fEmail, fSubject, fMsg, hp } = form;
    // Honeypot tripped → a bot filled the hidden field. Pretend success, send nothing.
    if (hp) { setSent(true); return; }
    const subject = fSubject || ((lang === 'nl' ? 'Bericht van ' : 'Message from ') + (fName || 'portfolio'));

    // Open the visitor's mail app with the message pre-filled. Used when no key is
    // configured, and as a fallback when the Web3Forms request can't go through
    // (offline, or blocked by an ad/privacy blocker) so the message is never lost.
    const openMailFallback = () => {
      const body = encodeURIComponent((fMsg || '') + '\n\n' + (fName || '') + (fEmail ? ' (' + fEmail + ')' : ''));
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + body;
      setSent(true);
    };

    // No key configured yet → fall back to the user's mail app so nothing breaks.
    if (!WEB3FORMS_ACCESS_KEY) {
      openMailFallback();
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
      // network error, or the request was blocked by a client-side ad/privacy
      // blocker → open the visitor's mail app with the message pre-filled
      openMailFallback();
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="root" style={sx('min-height:100dvh;')}>
      <a className="skiplink" href="#main">{s.skipToContent}</a>

      <Nav
        s={s}
        page={page}
        isDark={dark}
        langLabel={lang === 'nl' ? 'EN' : 'NL'}
        where={where}
        status={buildDateline(lang)}
        go={go}
        toggleTheme={() => setDark((d) => !d)}
        toggleLang={() => setLang((l) => (l === 'nl' ? 'en' : 'nl'))}
      />

      <main id="main" tabIndex={-1}>
        <ErrorBoundary>
          {route.kind === 'home' && <Home s={s} lang={lang} go={go} openDetail={openDetail} dark={dark} />}
          {route.kind === 'notfound' && <NotFound s={s} go={go} />}
          <Suspense fallback={null}>
            {route.kind === 'project' && detail && (
              <ProjectDetail s={s} lang={lang} project={loc(detail, lang)} back={closeDetail} openDetail={openDetail} />
            )}
            {route.kind === 'work' && (
              <Work s={s} lang={lang} openDetail={openDetail} />
            )}
            {route.kind === 'about' && <About s={s} lang={lang} />}
            {route.kind === 'contact' && (
              <Contact s={s} lang={lang} form={form} setForm={setForm} submit={submit} sent={sent} sending={sending} error={sendError} />
            )}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
