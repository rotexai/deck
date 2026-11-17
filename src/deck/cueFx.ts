import { useEffect, type RefObject } from 'react'
import { useLang } from '../content'
import { CONTENT } from '../content'
import { cueState, estimateWords, parseLine, type Cue } from '../content/cues'
import narration from '../content/narration.json'
import { useReducedMotion } from './motion'
import { pad2 } from './nav'
import { useNarrator } from './narrator'
import type { SlideDef } from './types'

/** Narration cues on the live slide. Elements opt in with `data-cue="name"`; while a line plays, the active frame gets
 *  `data-cue-focus`, `data-cue-dim`, `data-cue-mark` and `data-cue-wait` on them. Dimming and waiting animate `filter`
 *  through the Web Animations API, so the slides' own opacity and transform transitions (step entrances) keep working. */

type Line = { cues: Cue[]; words: number[] }
type Manifest = { lines: Record<string, { seconds: number; words?: number[] }> }
const manifest = narration as Manifest
const cache = new Map<string, Line>()

/** The cues and word times of one narration line, e.g. `en/09-1`. */
export function lineCues(lang: 'en' | 'vi', def: SlideDef, index: number, step: number): Line | null {
  const id = `${lang}/${pad2(index + 1)}-${step + 1}`
  const hit = cache.get(id)
  if (hit) return hit
  const text = CONTENT[lang][def.copy].narration[step] as string | undefined
  if (text === undefined) return null
  const { plain, cues } = parseLine(text)
  const entry = manifest.lines[id]
  const words = entry?.words ?? estimateWords(plain, entry?.seconds ?? 0)
  const line = { cues, words }
  cache.set(id, line)
  return line
}

const DIM = 'opacity(0.28) saturate(0.4)'
const HIDE = 'opacity(0)'
const fx = new WeakMap<Element, { to: string; anim?: Animation }>()

function setFilter(el: HTMLElement, to: string, ms: number) {
  const prev = fx.get(el)
  const from = prev?.to ?? 'none'
  if (from === to) return
  prev?.anim?.cancel()
  if (typeof el.animate !== 'function' || ms === 0) {
    el.style.filter = to === 'none' ? '' : to
    fx.set(el, { to })
    return
  }
  el.style.filter = ''
  const anim = el.animate([{ filter: from }, { filter: to }], { duration: ms, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'forwards' })
  if (to === 'none') anim.onfinish = () => anim.cancel()
  fx.set(el, { to, anim })
}

function flag(el: HTMLElement, name: string, on: boolean) {
  if (on) el.setAttribute(name, '')
  else el.removeAttribute(name)
}

function clear(els: HTMLElement[]) {
  for (const el of els) {
    for (const a of ['data-cue-focus', 'data-cue-dim', 'data-cue-mark', 'data-cue-wait']) el.removeAttribute(a)
    fx.get(el)?.anim?.cancel()
    el.style.filter = ''
    fx.delete(el)
  }
}

/** Applies the narration cues of the line on air to the active frame (and marks to the controls on the stage). */
export function useCueFx(ref: RefObject<HTMLElement | null>, def: SlideDef, index: number, step: number, active: boolean) {
  const narrator = useNarrator()
  const { lang } = useLang()
  const reduced = useReducedMotion()
  useEffect(() => {
    const root = ref.current
    if (!narrator || !active || !root) return
    const line = lineCues(lang, def, index, step)
    if (!line || !line.cues.length) return
    const ms = reduced ? 0 : 450
    let sig = ''
    let touched: HTMLElement[] = []
    const apply = () => {
      const now = narrator.cueTime()
      const on = now && now.lang === lang && now.pos.index === index && now.pos.step === step
      const s = on ? cueState(line.cues, line.words, now.t) : null
      const next = s ? JSON.stringify(s) : ''
      if (next === sig) return
      sig = next
      const own = [...root.querySelectorAll<HTMLElement>('[data-cue]')]
      const stage = root.closest('.stage')
      const outside = stage ? [...stage.querySelectorAll<HTMLElement>('[data-cue]')].filter((el) => !root.contains(el)) : []
      if (!s) {
        clear(touched)
        touched = []
        return
      }
      touched = [...own, ...outside]
      const focused = own.filter((el) => s.focus.includes(el.dataset.cue ?? ''))
      for (const el of own) {
        const name = el.dataset.cue ?? ''
        const related = focused.some((f) => f === el || f.contains(el) || el.contains(f))
        const dim = focused.length > 0 && !related && !s.marks.includes(name)
        const wait = s.waiting.includes(name)
        flag(el, 'data-cue-focus', focused.includes(el))
        flag(el, 'data-cue-dim', dim)
        flag(el, 'data-cue-mark', s.marks.includes(name))
        flag(el, 'data-cue-wait', wait)
        setFilter(el, wait ? HIDE : dim ? DIM : 'none', ms)
      }
      for (const el of outside) flag(el, 'data-cue-mark', s.marks.includes(el.dataset.cue ?? ''))
    }
    const off = narrator.subscribeTime(apply)
    apply()
    return () => {
      off()
      clear(touched)
    }
  }, [narrator, active, lang, def, index, step, ref, reduced])
}
