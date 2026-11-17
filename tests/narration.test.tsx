import { act, fireEvent, render, within } from '@testing-library/react'
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { en } from '../src/content/en'
import manifest from '../src/content/narration.json'
import { vi as viCopy } from '../src/content/vi'
import { Deck } from '../src/deck/Deck'
import { fit, scriptWidth } from '../src/deck/fit'
import { pad2 } from '../src/deck/nav'
import { SLIDES } from '../src/slides'

const COPY = { en, vi: viCopy }
const root = join(__dirname, '..')
const press = (key: string) => act(() => void fireEvent.keyDown(window, { key }))
// The spy is installed in tests/setup.ts before each test, so read it at call time.
const played = () => (HTMLMediaElement.prototype.play as unknown as { mock: { contexts: unknown[] } }).mock.contexts

describe('spec 261117 narration content', () => {
  it('slide order in the content matches SLIDES (scripts/narrate.mjs numbers files by it)', () => {
    for (const copy of Object.values(COPY))
      expect(Object.keys(copy).filter((k) => k !== 'deck')).toEqual(SLIDES.map((s) => s.copy))
  })

  it('has one line per step in both languages, with no placeholders or the founder handle (R3, R8)', () => {
    for (const copy of Object.values(COPY))
      SLIDES.forEach((s) => {
        const lines = copy[s.copy].narration
        expect(lines, s.id).toHaveLength(s.steps)
        for (const line of lines) {
          expect(line.trim().length).toBeGreaterThan(0)
          expect(line).not.toMatch(/[[\]*]|qvanle/)
        }
      })
  })

  it('every line has an audio file whose hash matches the manifest (R5, R7)', () => {
    const ids: string[] = []
    for (const [lang, copy] of Object.entries(COPY)) {
      const voice = manifest.voices[lang as keyof typeof manifest.voices]
      SLIDES.forEach((s, i) =>
        copy[s.copy].narration.forEach((text, k) => {
          const id = `${lang}/${pad2(i + 1)}-${k + 1}`
          ids.push(id)
          const entry = (manifest.lines as Record<string, { sha256: string; seconds: number }>)[id]
          expect(entry, `${id}: run npm run narrate`).toBeDefined()
          const sha = createHash('sha256').update(`${manifest.provider}\n${voice}\n${text}`).digest('hex')
          expect(entry.sha256, `${id} is stale: run npm run narrate`).toBe(sha)
          expect(entry.seconds).toBeGreaterThan(0)
          expect(existsSync(join(root, 'public/media/narration', `${id}.mp3`)), id).toBe(true)
        }),
      )
    }
    expect(Object.keys(manifest.lines).sort()).toEqual(ids.sort())
  })
})

describe('spec 261117 controls', () => {
  it('shows Script, Play, then the language switch, and Play does not move the deck (R9, R15, R17)', () => {
    window.history.replaceState(null, '', '/#1')
    const { container } = render(<Deck />)
    const controls = container.querySelector('.deck-controls') as HTMLElement
    const kids = [...controls.children].map((el) => el.className)
    expect(kids[0]).toContain('script-btn')
    // Play sits in the coach-mark anchor (first-visit tip, owner 2026-11-17).
    expect(kids[1]).toContain('coach-anchor')
    expect(controls.children[1].firstElementChild?.className).toContain('play-btn')
    expect(kids[2]).toContain('lang-switch')

    const play = controls.querySelector('.play-btn') as HTMLButtonElement
    expect(play.textContent).toBe(`Listen · about ${manifest.minutes.en} min`)
    expect(play.getAttribute('aria-label')).toMatch(/AI-voiced/)
    fireEvent.click(play)
    expect(play.getAttribute('data-status')).toBe('playing')
    expect(play.getAttribute('aria-label')).toBe(en.deck.narrator.pause)
    expect(play.textContent).toBe('')
    expect(played().some((a) => (a as HTMLMediaElement).src?.endsWith('/media/narration/en/01-1.mp3'))).toBe(true)
    const main = container.querySelector('main') as HTMLElement
    expect(main.dataset.slide).toBe('1')
    expect(main.dataset.step).toBe('0')
    fireEvent.click(play)
    expect(play.getAttribute('aria-label')).toBe(en.deck.narrator.resume)
  })

  it('the Script toggle opens the sidebar; a line jumps there; Escape closes it (R19-R22)', () => {
    window.history.replaceState(null, '', '/#1')
    const { container } = render(<Deck />)
    const toggle = container.querySelector('.script-btn') as HTMLButtonElement
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(document.getElementById('deck-script')).toBeNull()

    fireEvent.click(toggle)
    const panel = document.getElementById('deck-script') as HTMLElement
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(container.querySelector('main')?.hasAttribute('data-script')).toBe(true)
    const lines = panel.querySelectorAll('.script-line')
    expect(lines).toHaveLength(SLIDES.reduce((t, s) => t + s.steps, 0))
    expect(panel.querySelector('[aria-current="step"]')?.textContent).toBe(en.title.narration[0])

    fireEvent.click(within(panel).getByText(en.market.narration[1]))
    const main = container.querySelector('main') as HTMLElement
    expect(main.dataset.slide).toBe('4')
    expect(main.dataset.step).toBe('1')
    expect(panel.querySelector('[aria-current="step"]')?.textContent).toBe(en.market.narration[1])

    fireEvent.keyDown(panel, { key: 'Escape' })
    expect(document.getElementById('deck-script')).toBeNull()
  })

  it('?script opens the sidebar on load (R23)', () => {
    window.history.replaceState(null, '', '/?script#3')
    render(<Deck />)
    const panel = document.getElementById('deck-script') as HTMLElement
    expect(panel).not.toBeNull()
    expect(panel.querySelector('[aria-current="step"]')?.textContent).toBe(en.problem.narration[0])
  })

  it('the stage fits beside the sidebar, or above the bottom sheet on narrow screens (R19, R24)', () => {
    expect(scriptWidth(1000)).toBe(320)
    expect(scriptWidth(1600)).toBe(416)
    expect(scriptWidth(2560)).toBe(460)
    expect(fit(1920, 1080, false)).toBe(1)
    expect(fit(1920, 1080, true)).toBeCloseTo((1920 - 460) / 1920)
    expect(fit(800, 1200, true)).toBeCloseTo(Math.min(800 / 1920, 600 / 1080))
  })
})

describe('spec 261117 demo hand-off (R13)', () => {
  it('holds the video at the start, unmuted, while slide 6 is narrated', () => {
    window.history.replaceState(null, '', '/#6')
    const { container } = render(<Deck />)
    const video = container.querySelector('video') as HTMLVideoElement
    expect(video.muted).toBe(true)
    fireEvent.click(container.querySelector('.play-btn') as HTMLButtonElement)
    expect(video.muted).toBe(false)
    expect(video.currentTime).toBe(0)
    const audio = played().find((a) => (a as HTMLMediaElement).src?.includes('/narration/en/06-1.mp3'))
    expect(audio).toBeDefined()

    const before = played().filter((c) => c === video).length
    act(() => void (audio as HTMLMediaElement).dispatchEvent(new Event('ended')))
    expect(played().filter((c) => c === video).length).toBe(before + 1)
  })
})

it('keys still work while narrating (R17)', () => {
  window.history.replaceState(null, '', '/#1')
  const { container } = render(<Deck />)
  fireEvent.click(container.querySelector('.play-btn') as HTMLButtonElement)
  press('ArrowRight')
  expect(container.querySelector('main')?.dataset.slide).toBe('2')
  expect(played().some((a) => (a as HTMLMediaElement).src?.endsWith('/narration/en/02-1.mp3'))).toBe(true)
})
