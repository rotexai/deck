import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { CONTENT, LangContext, langFromSearch, other, useContent, useLang, type Lang } from '../content'
import { useReducedMotion } from './motion'

/** Holds the language, mirrors it to <html lang>, the title and `?lang=` (kept off the URL for English). */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => langFromSearch(window.location.search))
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = CONTENT[lang].deck.title
    const url = new URL(window.location.href)
    if (url.searchParams.get('lang') === (lang === 'vi' ? 'vi' : null)) return
    if (lang === 'vi') url.searchParams.set('lang', 'vi')
    else url.searchParams.delete('lang')
    window.history.replaceState(window.history.state, '', url)
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

const WAVE_MS = 1100
const WAVE_EASE = 'cubic-bezier(0.45, 0, 0.2, 1)'
const RIPPLE_LAG_MS = 140

/** Top-right language button. A click sends a wave from the button across the screen; the new language
 *  is revealed behind its front (View Transitions where available, otherwise the wave alone). */
export function LangSwitch() {
  const { lang, setLang } = useLang()
  const c = useContent()
  const reduced = useReducedMotion()

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const next = other(lang)
    const swap = () => flushSync(() => setLang(next))
    const viewport = e.currentTarget.closest('.viewport')
    if (reduced || !viewport) return swap()

    const b = e.currentTarget.getBoundingClientRect()
    const x = b.left + b.width / 2
    const y = b.top + b.height / 2
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const at = `at ${x}px ${y}px`
    const timing = { duration: WAVE_MS, easing: WAVE_EASE }

    // The wave front: a ring that grows from the button to past the farthest corner.
    const layer = document.createElement('div')
    layer.className = 'lang-wave'
    layer.setAttribute('aria-hidden', 'true')
    // The front ring matches the reveal edge; a softer ripple trails it.
    const rings = ['front', 'ripple'].map((kind) => {
      const ring = document.createElement('i')
      ring.className = kind
      layer.append(ring)
      return ring
    })
    viewport.append(layer)
    const done = () => layer.remove()
    const grow = () => {
      if (typeof rings[0].animate !== 'function') return done()
      // The ring grows in size, not scale, so its edge glow keeps its width. Radius tracks the eased progress
      // (keyframe offset = share of r), so the front stays on the reveal edge.
      const circle = (k: number) => ({ left: `${x - k * r}px`, top: `${y - k * r}px`, width: `${2 * k * r}px`, height: `${2 * k * r}px` })
      const frames = [
        { ...circle(0), opacity: 1 },
        { ...circle(0.85), opacity: 1, offset: 0.85 },
        { ...circle(1), opacity: 0 },
      ]
      const runs = rings.map((ring, i) => ring.animate(frames, { ...timing, delay: i * RIPPLE_LAG_MS }).finished)
      return Promise.all(runs).then(done, done)
    }

    if (typeof document.startViewTransition !== 'function') {
      swap()
      void grow()
      return
    }
    const t = document.startViewTransition(swap)
    void t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px ${at})`, `circle(${r}px ${at})`] },
        { ...timing, pseudoElement: '::view-transition-new(root)' },
      )
      void grow()
    }, done)
  }

  return (
    <button
      type="button"
      className="lang-switch"
      aria-label={c.deck.switchTo}
      // Mouse clicks leave focus on the slide, so Space keeps advancing the deck.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      <span data-on={lang === 'en' || undefined}>EN</span>
      <span data-on={lang === 'vi' || undefined}>VI</span>
    </button>
  )
}
