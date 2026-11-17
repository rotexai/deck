import { act, fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi as vitest } from 'vitest'
import { cueState, parseLine, stripCues } from '../src/content/cues'
import { en } from '../src/content/en'
import { vi } from '../src/content/vi'
import { Deck, PrintDeck } from '../src/deck/Deck'
import { SLIDES } from '../src/slides'

// Narration cues (owner 2026-11-17): markers in a narration line light the slide element at the word.
const COPY = { en, vi }
/** Cue targets that live on the stage controls, not inside a slide. */
const STAGE = new Set(['script'])
const sig = (line: string) => parseLine(line).cues.map((c) => `${c.kind}:${c.targets.join('+') || 'none'}`)

describe('cue markers', () => {
  it('parse to the word they sit before and leave the plain text', () => {
    const { plain, cues } = parseLine('We looked. [[focus:tl]]Packaged ERP, [[mark:up+left]]fit [[land:us]][[focus:none]]x')
    expect(plain).toBe('We looked. Packaged ERP, fit x')
    expect(cues).toEqual([
      { kind: 'focus', targets: ['tl'], word: 2 },
      { kind: 'mark', targets: ['up', 'left'], word: 4 },
      { kind: 'land', targets: ['us'], word: 5 },
      { kind: 'focus', targets: [], word: 5 },
    ])
  })

  it('give the state at a time: last focus wins, marks add up, land waits for its word', () => {
    const { cues } = parseLine('a [[focus:x]]b [[mark:m]]c [[land:u]][[focus:u]]d')
    const words = [0, 1, 2, 3]
    expect(cueState(cues, words, 0.5)).toEqual({ focus: [], marks: [], waiting: ['u'] })
    expect(cueState(cues, words, 2.1)).toEqual({ focus: ['x'], marks: ['m'], waiting: ['u'] })
    expect(cueState(cues, words, 3)).toEqual({ focus: ['u'], marks: ['m'], waiting: [] })
  })

  it('every line in both languages has cues, and vi has the same cues in the same order as en', () => {
    SLIDES.forEach((s) =>
      en[s.copy].narration.forEach((line, k) => {
        expect(sig(line).length, `${s.id} line ${k + 1}`).toBeGreaterThan(0)
        expect(sig(vi[s.copy].narration[k]), `${s.id} line ${k + 1}`).toEqual(sig(line))
      }),
    )
  })

  it('every cue names an element that exists on its slide', () => {
    const { container } = render(<PrintDeck />)
    for (const [lang, copy] of Object.entries(COPY))
      SLIDES.forEach((s) => {
        const slide = container.querySelector(`section[data-id="${s.id}"]`) as HTMLElement
        for (const line of copy[s.copy].narration)
          for (const c of parseLine(line).cues)
            for (const t of c.targets)
              if (!STAGE.has(t)) expect(slide.querySelector(`[data-cue="${t}"]`), `${lang} ${s.id}: ${t}`).not.toBeNull()
      })
  })

  it('never reach the voice or the script', () => {
    for (const copy of Object.values(COPY))
      for (const s of SLIDES) for (const line of copy[s.copy].narration) expect(stripCues(line)).not.toMatch(/\[\[|\]\]/)
  })
})

describe('cues on the live deck', () => {
  it('light the named card and dim the others while the line plays, and clear when paused at idle', async () => {
    let now = 0
    vitest.spyOn(HTMLMediaElement.prototype, 'currentTime', 'get').mockImplementation(() => now)
    const comp = SLIDES.findIndex((s) => s.id === 'competition')
    window.history.replaceState(null, '', `/#${comp + 1}`)
    const { container } = render(<Deck />)
    const slide = () => container.querySelector('section[data-state="in"]') as HTMLElement
    fireEvent.click(container.querySelector('.play-btn') as HTMLButtonElement)
    const wait = () => act(() => new Promise((r) => setTimeout(r, 60)))
    await wait()
    // Before the first cue nothing is dimmed; the RotexAI card waits for its line.
    expect(slide().querySelector('[data-cue-dim]')).toBeNull()
    now = 999
    await wait()
    expect(slide().querySelector('[data-cue="br"]')?.hasAttribute('data-cue-focus')).toBe(true)
    expect(slide().querySelector('[data-cue="tl"]')?.hasAttribute('data-cue-dim')).toBe(true)
    expect(slide().querySelector('[data-cue="up"]')?.hasAttribute('data-cue-mark')).toBe(true)
  })
})
