import { useState } from 'react'
import { STR, PROJECTS } from './data/content'
import type { Lang, Category } from './data/content'
import Nav, { type Page } from './components/Nav'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'

type Filter = 'all' | Category

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [dark, setDark] = useState(true)
  const [lang, setLang] = useState<Lang>('nl')
  const [filter, setFilter] = useState<Filter>('all')

  const s = STR[lang]

  const go = (p: Page) => {
    setPage(p)
    window.scrollTo(0, 0)
  }

  return (
    <div
      className="root"
      data-theme={dark ? 'dark' : 'light'}
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
        fontFamily: "'Hanken Grotesk', sans-serif",
        minHeight: '100vh',
        transition: 'background .35s ease, color .35s ease',
      }}
    >
      <Nav
        s={s}
        page={page}
        dark={dark}
        lang={lang}
        go={go}
        toggleTheme={() => setDark((d) => !d)}
        toggleLang={() => setLang((l) => (l === 'nl' ? 'en' : 'nl'))}
      />

      {page === 'home' && (
        <Home s={s} lang={lang} dark={dark} projects={PROJECTS} go={go} />
      )}
      {page === 'work' && (
        <Work
          s={s}
          lang={lang}
          projects={PROJECTS}
          filter={filter}
          setFilter={setFilter}
          go={go}
        />
      )}
      {page === 'about' && <About s={s} lang={lang} go={go} />}
      {page === 'contact' && <Contact s={s} lang={lang} />}
    </div>
  )
}
