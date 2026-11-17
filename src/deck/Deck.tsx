import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { useContent, useLang } from '../content'
import { SLIDES } from '../slides'
import { LangSwitch } from './Lang'
import { fit, W, H } from './fit'
import { useReducedMotion } from './motion'
import { PlayButton, ScriptPanel, ScriptToggle } from './Narration'
import { Narrator, NarratorContext } from './narrator'
import { indexFromHash, KEYS_NEXT, KEYS_PREV, next, pad2, prev, type Pos } from './nav'
import { Txt } from './Text'
import type { Enter, SlideDef } from './types'

/** A4 landscape is 297 mm wide = 1122.5 CSS px; the slide is zoomed to that width (R5). */
export const PRINT_ZOOM = (297 * 96) / 25.4 / W
const OUT_MS = 500

const onResize = (cb: () => void) => {
  window.addEventListener('resize', cb)
  return () => window.removeEventListener('resize', cb)
}
const windowSize = () => `${window.innerWidth}x${window.innerHeight}`

function useFit(script: boolean) {
  const size = useSyncExternalStore(onResize, windowSize, () => `${W}x${H}`)
  const [vw, vh] = size.split('x').map(Number)
  return fit(vw, vh, script)
}

interface FrameProps {
  def: SlideDef
  n: number
  total: number
  step: number
  active: boolean
  still: boolean
  print: boolean
  enter: Enter
  state: 'in' | 'out' | 'print'
}

/** One slide plus its chrome (R7): source line bottom left, NN / total bottom right, progress bar. */
function Frame({ def, n, total, step, active, still, print, enter, state }: FrameProps) {
  const C = def.Component
  const copy = useContent()
  return (
    <section
      className={`slide ${def.theme} sl-${def.id}`}
      data-state={state}
      data-id={def.id}
      aria-hidden={state === 'out' ? true : undefined}
      aria-label={copy.deck.slideLabel.replace('{n}', String(n)).replace('{total}', String(total))}
    >
      <C step={step} active={active} still={still} print={print} enter={enter} />
      <footer className="chrome">
        <span className="src">
          <Txt text={copy[def.copy].source} />
        </span>
        <span className="num">
          {pad2(n)} / {total}
        </span>
      </footer>
      <div className="progress" aria-hidden="true">
        <i style={{ width: `${(n / total) * 100}%` }} />
      </div>
    </section>
  )
}

interface View {
  pos: Pos
  enter: Enter
  visit: number
  out: { pos: Pos; visit: number; enter: Enter } | null
}

/** The presenting deck: steps and keys (R3), hash (R4), zoom fit (R2), slide change (R12). */
export function Deck({ slides = SLIDES }: { slides?: SlideDef[] }) {
  const total = slides.length
  const [steps] = useState(() => slides.map((s) => s.steps))
  const [view, setView] = useState<View>(() => ({
    pos: { index: indexFromHash(window.location.hash, total), step: 0 },
    enter: 'jump',
    visit: 0,
    out: null,
  }))
  const [script, setScript] = useState(() => new URLSearchParams(window.location.search).has('script'))
  const zoom = useFit(script)
  const reduced = useReducedMotion()
  const { lang } = useLang()

  const go = useCallback(
    (to: (p: Pos) => Pos, enter: Enter | null) =>
      setView((v) => {
        const pos = to(v.pos)
        if (pos.index === v.pos.index) return pos.step === v.pos.step ? v : { ...v, pos }
        const e = enter ?? (pos.index > v.pos.index ? 'next' : 'prev')
        return { pos, enter: e, visit: v.visit + 1, out: { pos: v.pos, visit: v.visit, enter: v.enter } }
      }),
    [],
  )

  // The AI-voiced investor view (spec 261117): slide 6's video takes over after its line.
  const [narrator] = useState(
    () =>
      new Narrator({
        steps,
        videoSlides: new Set(slides.flatMap((s, i) => (s.id === 'demo' ? [i] : []))),
        go: (pos) => go(() => pos, null),
      }),
  )
  useEffect(() => narrator.sync(view.pos, lang), [narrator, view.pos, lang])
  useEffect(() => () => narrator.dispose(), [narrator])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      // Space or Enter on a focused button presses that button, not the deck.
      if ((e.key === ' ' || e.key === 'Enter') && e.target instanceof HTMLButtonElement) return
      if (KEYS_NEXT.has(e.key)) go((p) => next(p, steps), null)
      else if (KEYS_PREV.has(e.key)) go((p) => prev(p, steps), null)
      else if (e.key === 'Home') go(() => ({ index: 0, step: 0 }), 'jump')
      else if (e.key === 'End') go(() => ({ index: total - 1, step: 0 }), 'jump')
      else return
      e.preventDefault()
    }
    const onHash = () => {
      const index = indexFromHash(window.location.hash, total)
      go((p) => (p.index === index ? p : { index, step: 0 }), 'jump')
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('hashchange', onHash)
    }
  }, [go, steps, total])

  // The hash follows the slide without adding history entries (R4).
  useEffect(() => {
    const hash = `#${view.pos.index + 1}`
    if (window.location.hash !== hash) window.history.replaceState(window.history.state, '', hash)
  }, [view.pos.index])

  // The outgoing slide is removed once its fade-out ends.
  useEffect(() => {
    if (!view.out) return
    const visit = view.visit
    const id = window.setTimeout(() => setView((v) => (v.visit === visit ? { ...v, out: null } : v)), reduced ? 0 : OUT_MS)
    return () => window.clearTimeout(id)
  }, [view.out, view.visit, reduced])

  const cur = slides[view.pos.index]
  return (
    <NarratorContext.Provider value={narrator}>
      <main className={`viewport ${cur.theme}`} data-slide={view.pos.index + 1} data-step={view.pos.step} data-script={script || undefined}>
        <div className="stage" style={{ zoom }}>
          {view.out && (
            <Frame
              key={view.out.visit}
              def={slides[view.out.pos.index]}
              n={view.out.pos.index + 1}
              total={total}
              step={view.out.pos.step}
              active={false}
              still={reduced}
              print={false}
              enter={view.out.enter}
              state="out"
            />
          )}
          <Frame
            key={view.visit}
            def={cur}
            n={view.pos.index + 1}
            total={total}
            step={view.pos.step}
            active
            still={reduced}
            print={false}
            enter={view.enter}
            state="in"
          />
          <div className="deck-controls">
            <ScriptToggle open={script} onToggle={() => setScript((o) => !o)} />
            <PlayButton wide={view.pos.index === 0} />
            <LangSwitch />
          </div>
        </div>
      </main>
      {script && <ScriptPanel slides={slides} pos={view.pos} theme={cur.theme} onClose={() => setScript(false)} />}
    </NarratorContext.Provider>
  )
}

/** `?print`: every slide at its final step, one per A4 landscape page, light palette (R5). */
export function PrintDeck({ slides = SLIDES }: { slides?: SlideDef[] }) {
  return (
    <main className="print">
      {slides.map((def, i) => (
        <div className="page" key={def.id}>
          <div className="stage" style={{ zoom: PRINT_ZOOM }}>
            <Frame
              def={def}
              n={i + 1}
              total={slides.length}
              step={def.steps - 1}
              active={false}
              still
              print
              enter="jump"
              state="print"
            />
          </div>
        </div>
      ))}
    </main>
  )
}
