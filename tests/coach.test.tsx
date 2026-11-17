import { act, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { en } from '../src/content/en'
import manifest from '../src/content/narration.json'
import { Deck } from '../src/deck/Deck'

// First-visit coach mark (owner 2026-11-17): points new viewers at Listen and Script, once per browser.
const tip = en.deck.narrator.coach.replace('{min}', String(manifest.minutes.en))
const later = (ms: number) => act(() => void vi.advanceTimersByTime(ms))

describe('first-visit coach mark', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Node 26 ships its own localStorage global, which hides jsdom's; give each test a fresh in-memory one.
    const store = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, String(v)),
      removeItem: (k: string) => void store.delete(k),
      clear: () => store.clear(),
    })
    window.history.replaceState(null, '', '/#1')
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('appears after the first slide lands, pulses Play, and lights Script', () => {
    const { container } = render(<Deck />)
    expect(container.querySelector('.coach')).toBeNull()
    later(1000)
    expect(container.querySelector('.coach')?.textContent).toBe(tip)
    expect(container.querySelector('.play-btn')?.hasAttribute('data-coach')).toBe(true)
    expect(container.querySelector('.script-btn')?.hasAttribute('data-coach')).toBe(true)
  })

  it('hides on a key press and is not shown again in this browser', () => {
    const first = render(<Deck />)
    later(1000)
    act(() => void fireEvent.keyDown(window, { key: 'ArrowRight' }))
    expect(first.container.querySelector('.coach')).toBeNull()
    expect(first.container.querySelector('[data-coach]')).toBeNull()
    first.unmount()
    const again = render(<Deck />)
    later(12000)
    expect(again.container.querySelector('.coach')).toBeNull()
  })

  it('hides by itself after about 9 seconds', () => {
    const { container } = render(<Deck />)
    later(1000)
    expect(container.querySelector('.coach')).not.toBeNull()
    later(9000)
    expect(container.querySelector('.coach')).toBeNull()
  })

  it('stays away when the script is already open (?script)', () => {
    window.history.replaceState(null, '', '/?script#1')
    const { container } = render(<Deck />)
    later(2000)
    expect(container.querySelector('.coach')).toBeNull()
  })
})
