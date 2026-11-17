import { useEffect, useRef, type MouseEvent } from 'react'
import { useContent, useLang } from '../content'
import narration from '../content/narration.json'
import { useReducedMotion } from './motion'
import { pad2, type Pos } from './nav'
import { useNarrator, useNarratorState } from './narrator'
import type { SlideDef } from './types'

/** Spec 261117 controls: Script toggle and Play/Pause sit left of the language switch (R9). */

// Mouse clicks leave focus on the slide, so Space keeps advancing the deck (same as the language switch).
const keepFocus = (e: MouseEvent) => e.preventDefault()

function Icon({ d }: { d: string }) {
  return (
    <svg className="deck-icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

const PLAY = 'M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z'
const PAUSE = 'M7 5h3.2v14H7zM13.8 5H17v14h-3.2z'
const REPLAY = 'M12 5V2L7.5 6 12 10V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z'
const LINES = 'M4 6h16v2H4zM4 11h16v2H4zM4 16h10v2H4z'
const CLOSE = 'M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4z'

/** Play / Pause / Replay. On the title slide, before the first play, a wider "Listen · about N min" pill (R15);
 *  N is the rendered listening time (lines, gaps and the demo video) that `npm run narrate` records. */
export function PlayButton({ wide, coach }: { wide: boolean; coach?: boolean }) {
  const n = useNarrator()
  const { status, played } = useNarratorState()
  const c = useContent().deck.narrator
  const { lang } = useLang()
  if (!n) return null
  const label = { playing: c.pause, paused: c.resume, ended: c.replay, idle: c.play }[status]
  const icon = status === 'playing' ? PAUSE : status === 'ended' ? REPLAY : PLAY
  const pill = wide && !played
  return (
    <button
      type="button"
      className="deck-btn play-btn"
      data-pill={pill || undefined}
      data-coach={coach || undefined}
      data-status={status}
      aria-label={label}
      title={label}
      onMouseDown={keepFocus}
      onClick={() => n.toggle()}
    >
      <Icon d={icon} />
      {pill && <span>{c.listen.replace('{min}', String(narration.minutes[lang]))}</span>}
    </button>
  )
}

export function ScriptToggle({ open, onToggle, coach }: { open: boolean; onToggle: () => void; coach?: boolean }) {
  const c = useContent().deck.narrator
  return (
    <button
      type="button"
      className="deck-btn script-btn"
      aria-expanded={open}
      aria-controls="deck-script"
      aria-label={open ? c.hideScript : c.showScript}
      title={open ? c.hideScript : c.showScript}
      data-on={open || undefined}
      data-coach={coach || undefined}
      onMouseDown={keepFocus}
      onClick={onToggle}
    >
      <Icon d={LINES} />
      <span>{c.script}</span>
    </button>
  )
}

/** The callout under the Play button: what Listen and Script do, and how long the pitch is. */
export function CoachMark({ wide }: { wide: boolean }) {
  const c = useContent().deck.narrator
  const { lang } = useLang()
  return (
    <p className="coach" role="status" data-wide={wide || undefined}>
      {c.coach.replace('{min}', String(narration.minutes[lang]))}
    </p>
  )
}

/** Headlines mark the key phrase with *stars*; the script shows plain text. */
const plain = (s: string) => s.replace(/\*/g, '')

/** The whole script, one paragraph per step; the current step is highlighted and kept in view (R19-R22, R25). */
export function ScriptPanel({ slides, pos, theme, onClose }: { slides: SlideDef[]; pos: Pos; theme: string; onClose: () => void }) {
  const copy = useContent()
  const c = copy.deck.narrator
  const n = useNarrator()
  const reduced = useReducedMotion()
  const list = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const el = list.current?.querySelector<HTMLElement>('[aria-current="step"]')
    if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' })
  }, [pos.index, pos.step, reduced])

  return (
    <aside
      id="deck-script"
      className={`script ${theme}`}
      aria-label={c.script}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <header className="script-head">
        <div>
          <h2>{c.script}</h2>
          <p>{c.aiVoice}</p>
        </div>
        <button type="button" className="script-close" aria-label={c.close} title={c.close} onClick={onClose}>
          <Icon d={CLOSE} />
        </button>
      </header>
      <ol className="script-list" ref={list}>
        {slides.map((def, i) => {
          const block = copy[def.copy]
          return (
            <li key={def.id} data-current={i === pos.index || undefined}>
              <h3>
                <span>{pad2(i + 1)}</span> {plain(block.headline)}
              </h3>
              {block.narration.map((line, k) => (
                <button
                  type="button"
                  key={k}
                  className="script-line"
                  aria-current={i === pos.index && k === pos.step ? 'step' : undefined}
                  onClick={() => n?.jump({ index: i, step: k })}
                >
                  {line}
                </button>
              ))}
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
