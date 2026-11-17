import { createContext, useContext, useSyncExternalStore } from 'react'
import type { Lang } from '../content/types'
import { next, pad2, type Pos, type Steps } from './nav'

/** Spec 261117: the AI-voiced investor view. One pre-rendered audio file per step and language; the narration sets
 *  the pace (a line ends, the deck takes the next step). Plain TypeScript so the audio element lives outside React. */

/** Pause between the end of a line and the next step (R10). */
export const GAP_MS = 600

/** idle: never played or stopped by moving after the end; ended: the last line finished (button shows Replay). */
export type Status = 'idle' | 'playing' | 'paused' | 'ended'
/** line: a narration line is (or will be) speaking; video: slide 6's video has the floor (R13); gap: between steps. */
export type Phase = 'line' | 'video' | 'gap'

export interface NarratorState {
  status: Status
  phase: Phase
  /** True once Play was pressed in this visit; the title slide's wide "Listen" pill turns icon-only (R15). */
  played: boolean
}

/** `/media/narration/en/04-2.mp3` for slide 4, step 2 (both 1-based). */
export function narrationSrc(lang: Lang, pos: Pos): string {
  return `${import.meta.env.BASE_URL}media/narration/${lang}/${pad2(pos.index + 1)}-${pos.step + 1}.mp3`
}

export interface NarratorOptions {
  steps: Steps
  /** Slides whose line hands over to a video with its own sound (slide 6). */
  videoSlides: ReadonlySet<number>
  /** Moves the deck; the Deck calls `sync` back with the new position. */
  go: (pos: Pos) => void
  createAudio?: () => HTMLAudioElement
}

export class Narrator {
  private state: NarratorState = { status: 'idle', phase: 'line', played: false }
  private readonly listeners = new Set<() => void>()
  private readonly opts: NarratorOptions
  private audio: HTMLAudioElement | null = null
  private pre: HTMLAudioElement | null = null
  private pos: Pos = { index: 0, step: 0 }
  private lang: Lang = 'en'
  /** The line loaded into the audio element; '' when none, so the next play starts the current line afresh. */
  private loaded = ''
  private timer = 0

  constructor(opts: NarratorOptions) {
    this.opts = opts
  }

  subscribe = (cb: () => void) => {
    this.listeners.add(cb)
    return () => void this.listeners.delete(cb)
  }

  getState = (): NarratorState => this.state

  /** The deck reports every move and language change here (R12, R14). */
  sync(pos: Pos, lang: Lang) {
    this.pos = pos
    this.lang = lang
    if (this.key() === this.loaded) return
    this.clearTimer()
    if (this.state.status === 'playing') return this.startLine()
    this.audio?.pause()
    this.loaded = ''
    // Moving after the end makes Play continue from here instead of replaying from slide 1.
    this.set({ phase: 'line', status: this.state.status === 'ended' ? 'idle' : this.state.status })
  }

  /** The Play/Pause button (R10, R11). Runs inside the click, so the browser lets the audio start. */
  toggle() {
    const { status, phase } = this.state
    if (status === 'playing') {
      this.clearTimer()
      this.audio?.pause()
      return this.set({ status: 'paused' })
    }
    if (status === 'ended') {
      this.set({ status: 'playing', played: true })
      const first = { index: 0, step: 0 }
      if (this.pos.index === 0 && this.pos.step === 0) return this.startLine()
      return this.opts.go(first)
    }
    this.set({ status: 'playing', played: true })
    if (this.key() !== this.loaded) return this.startLine()
    if (phase === 'line') return void this.play(this.ensureAudio())
    if (phase === 'gap') return this.advance()
    // phase 'video': the demo slide resumes its video when it sees status 'playing'.
  }

  /** A click on a script line (R21): go there; playing continues there, paused stays paused. */
  jump(pos: Pos) {
    this.opts.go(pos)
  }

  /** Slide 6's video finished: take the next step after the usual gap (R13). */
  videoEnded() {
    if (this.state.status !== 'playing' || this.state.phase !== 'video') return
    this.set({ phase: 'gap' })
    this.timer = window.setTimeout(() => this.advance(), GAP_MS)
  }

  /** Unmount: stop the sound. Listeners stay; React's StrictMode remounts the same instance and resubscribes. */
  dispose() {
    this.clearTimer()
    this.audio?.pause()
  }

  private key() {
    return `${this.lang}/${this.pos.index}-${this.pos.step}`
  }

  private set(patch: Partial<NarratorState>) {
    const s = { ...this.state, ...patch }
    if (s.status === this.state.status && s.phase === this.state.phase && s.played === this.state.played) return
    this.state = s
    for (const cb of this.listeners) cb()
  }

  private ensureAudio(): HTMLAudioElement {
    if (this.audio) return this.audio
    const a = this.opts.createAudio?.() ?? new Audio()
    a.preload = 'auto'
    a.addEventListener('ended', () => this.lineEnded())
    this.audio = a
    return a
  }

  private play(a: HTMLAudioElement) {
    const p = a.play()
    // A refused or failed play (autoplay policy, missing file) leaves the narrator paused, not stuck "playing".
    if (p && typeof p.catch === 'function')
      p.catch(() => {
        if (this.audio === a && this.state.status === 'playing') this.set({ status: 'paused' })
      })
  }

  private startLine() {
    this.clearTimer()
    const a = this.ensureAudio()
    a.pause()
    a.src = narrationSrc(this.lang, this.pos)
    a.currentTime = 0
    this.loaded = this.key()
    this.set({ phase: 'line' })
    this.play(a)
    this.preloadNext()
  }

  /** Only the next line is fetched ahead (R18). */
  private preloadNext() {
    const n = next(this.pos, this.opts.steps)
    if (n === this.pos) return
    this.pre ??= this.opts.createAudio?.() ?? new Audio()
    this.pre.preload = 'auto'
    this.pre.src = narrationSrc(this.lang, n)
  }

  private lineEnded() {
    if (this.state.status !== 'playing') return
    if (this.opts.videoSlides.has(this.pos.index)) return this.set({ phase: 'video' })
    this.set({ phase: 'gap' })
    this.timer = window.setTimeout(() => this.advance(), GAP_MS)
  }

  private advance() {
    this.clearTimer()
    const n = next(this.pos, this.opts.steps)
    if (n === this.pos) {
      this.loaded = ''
      return this.set({ status: 'ended', phase: 'line' })
    }
    this.opts.go(n)
  }

  private clearTimer() {
    window.clearTimeout(this.timer)
    this.timer = 0
  }
}

export const NarratorContext = createContext<Narrator | null>(null)

const IDLE: NarratorState = { status: 'idle', phase: 'line', played: false }
const noop = () => () => {}

export const useNarrator = () => useContext(NarratorContext)

/** The narrator's state, or idle when there is none (print, tests of single slides). */
export function useNarratorState(): NarratorState {
  const n = useContext(NarratorContext)
  return useSyncExternalStore(n ? n.subscribe : noop, n ? n.getState : () => IDLE, () => IDLE)
}
