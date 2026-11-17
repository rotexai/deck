import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Lang } from '../src/content/types'
import { GAP_MS, Narrator, narrationSrc } from '../src/deck/narrator'
import type { Pos } from '../src/deck/nav'

/** A stand-in for HTMLAudioElement: records play/pause and lets a test end the line. */
class FakeAudio {
  src = ''
  currentTime = 0
  preload = ''
  paused = true
  plays = 0
  reject = false
  private ended: (() => void)[] = []
  addEventListener(type: string, cb: () => void) {
    if (type === 'ended') this.ended.push(cb)
  }
  play() {
    this.plays++
    if (this.reject) return Promise.reject(new Error('NotAllowedError'))
    this.paused = false
    return Promise.resolve()
  }
  pause() {
    this.paused = true
  }
  end() {
    this.paused = true
    for (const cb of this.ended) cb()
  }
}

// Three slides: 2 steps, 1 step (a video slide), 1 step.
const steps = [2, 1, 1]

function setup(lang: Lang = 'en') {
  const audios: FakeAudio[] = []
  const at: { pos: Pos; lang: Lang } = { pos: { index: 0, step: 0 }, lang }
  const go = vi.fn((pos: Pos) => {
    at.pos = pos
    n.sync(pos, at.lang)
  })
  const n: Narrator = new Narrator({
    steps,
    videoSlides: new Set([1]),
    go,
    createAudio: () => {
      const a = new FakeAudio()
      audios.push(a)
      return a as unknown as HTMLAudioElement
    },
  })
  n.sync(at.pos, lang)
  return { n, go, at, main: () => audios[0], pre: () => audios[1] }
}

const src = (index: number, step: number, lang: Lang = 'en') => narrationSrc(lang, { index, step })

beforeEach(() => void vi.useFakeTimers())
afterEach(() => void vi.useRealTimers())

describe('spec 261117 narrator', () => {
  it('Play speaks the current line and preloads only the next one (R10, R18)', () => {
    const { n, main, pre } = setup()
    expect(n.getState()).toEqual({ status: 'idle', phase: 'line', played: false })
    n.toggle()
    expect(n.getState()).toEqual({ status: 'playing', phase: 'line', played: true })
    expect(main().src).toBe(src(0, 0))
    expect(main().src).toMatch(/media\/narration\/en\/01-1\.mp3$/)
    expect(main().plays).toBe(1)
    expect(pre().src).toBe(src(0, 1))
  })

  it('takes the next step 600 ms after a line ends (R10)', () => {
    const { n, go, main } = setup()
    n.toggle()
    main().end()
    expect(n.getState().phase).toBe('gap')
    vi.advanceTimersByTime(GAP_MS - 1)
    expect(go).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(go).toHaveBeenCalledWith({ index: 0, step: 1 })
    expect(main().src).toBe(src(0, 1))
    expect(main().plays).toBe(2)
  })

  it('pauses and resumes the same line where it stopped (R11)', () => {
    const { n, main } = setup()
    n.toggle()
    main().currentTime = 3
    n.toggle()
    expect(n.getState().status).toBe('paused')
    expect(main().paused).toBe(true)
    n.toggle()
    expect(n.getState().status).toBe('playing')
    expect(main().src).toBe(src(0, 0))
    expect(main().currentTime).toBe(3)
  })

  it('a pause during the gap holds the step; Play then moves on', () => {
    const { n, go, main } = setup()
    n.toggle()
    main().end()
    n.toggle()
    vi.advanceTimersByTime(GAP_MS * 2)
    expect(go).not.toHaveBeenCalled()
    n.toggle()
    expect(go).toHaveBeenCalledWith({ index: 0, step: 1 })
  })

  it('a manual move while playing speaks the new step; while paused it waits (R12)', () => {
    const { n, main } = setup()
    n.toggle()
    n.sync({ index: 2, step: 0 }, 'en')
    expect(main().src).toBe(src(2, 0))
    expect(n.getState().status).toBe('playing')

    n.toggle() // pause
    n.sync({ index: 0, step: 1 }, 'en')
    expect(main().src).toBe(src(2, 0))
    expect(n.getState().status).toBe('paused')
    n.toggle()
    expect(main().src).toBe(src(0, 1))
    expect(main().currentTime).toBe(0)
  })

  it('hands slide 2 over to its video, then continues when the video ends (R13)', () => {
    const { n, go, main } = setup()
    n.sync({ index: 1, step: 0 }, 'en')
    n.toggle()
    main().end()
    expect(n.getState().phase).toBe('video')
    vi.advanceTimersByTime(GAP_MS * 10)
    expect(go).not.toHaveBeenCalled()
    n.videoEnded()
    vi.advanceTimersByTime(GAP_MS)
    expect(go).toHaveBeenCalledWith({ index: 2, step: 0 })
  })

  it('a language switch speaks the same step in the new language (R14)', () => {
    const { n, main } = setup()
    n.toggle()
    n.sync({ index: 0, step: 0 }, 'vi')
    expect(main().src).toBe(src(0, 0, 'vi'))
    expect(main().src).toMatch(/narration\/vi\/01-1\.mp3$/)
  })

  it('ends after the last line, then Replay starts from slide 1 (R10)', () => {
    const { n, go, main } = setup()
    n.sync({ index: 2, step: 0 }, 'en')
    n.toggle()
    main().end()
    vi.advanceTimersByTime(GAP_MS)
    expect(n.getState().status).toBe('ended')
    expect(go).not.toHaveBeenCalled()
    n.toggle()
    expect(go).toHaveBeenCalledWith({ index: 0, step: 0 })
    expect(n.getState().status).toBe('playing')
    expect(main().src).toBe(src(0, 0))
  })

  it('moving after the end makes Play continue from there', () => {
    const { n, main } = setup()
    n.sync({ index: 2, step: 0 }, 'en')
    n.toggle()
    main().end()
    vi.advanceTimersByTime(GAP_MS)
    n.sync({ index: 1, step: 0 }, 'en')
    expect(n.getState().status).toBe('idle')
    n.toggle()
    expect(main().src).toBe(src(1, 0))
  })

  it('a refused play leaves the narrator paused, not stuck playing', async () => {
    const { n, main } = setup()
    n.toggle()
    main().reject = true
    n.toggle()
    n.toggle()
    await vi.runAllTimersAsync()
    expect(n.getState().status).toBe('paused')
  })
})
