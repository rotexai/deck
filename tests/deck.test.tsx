import { act, fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Deck } from '../src/deck/Deck'
import { SLIDES } from '../src/slides'
import { media } from './setup'

const at = (c: HTMLElement) => {
  const v = c.querySelector('.viewport') as HTMLElement
  return `${v.dataset.slide}.${v.dataset.step}`
}
const press = (key: string) => act(() => void fireEvent.keyDown(window, { key }))

/** Every (slide, step) in deck order, 1-based slides. */
const ALL = SLIDES.flatMap((s, i) => Array.from({ length: s.steps }, (_, k) => `${i + 1}.${k}`))

describe('R3 steps and keys', () => {
  it('walks every step of every slide forwards, then stops at the end', () => {
    media.reduced = true
    const { container } = render(<Deck />)
    const seen = [at(container)]
    const keys = ['ArrowRight', ' ', 'PageDown']
    for (let i = 1; i < ALL.length; i++) {
      press(keys[i % 3])
      seen.push(at(container))
    }
    expect(seen).toEqual(ALL)
    press('ArrowRight')
    expect(at(container)).toBe(ALL[ALL.length - 1])
  })

  it('walks back one step at a time, entering each slide at its last step', () => {
    media.reduced = true
    const { container } = render(<Deck />)
    press('End')
    // End opens the last slide at step 0; step to its last step first.
    for (let k = 1; k < SLIDES[SLIDES.length - 1].steps; k++) press('ArrowRight')
    const seen = [at(container)]
    for (let i = 1; i < ALL.length; i++) {
      press(i % 2 ? 'ArrowLeft' : 'PageUp')
      seen.push(at(container))
    }
    expect(seen).toEqual([...ALL].reverse())
    press('ArrowLeft')
    expect(at(container)).toBe('1.0')
  })

  it('Home and End go to the first and last slide', () => {
    const { container } = render(<Deck />)
    press('End')
    expect(at(container)).toBe('13.0')
    press('Home')
    expect(at(container)).toBe('1.0')
  })

  it('ignores every other key', () => {
    const { container } = render(<Deck />)
    press('ArrowRight')
    for (const key of ['Enter', 'ArrowDown', 'ArrowUp', 'a', 'Escape', 'f', 'Tab']) press(key)
    expect(at(container)).toBe('2.0')
  })

  it('leaves browser shortcuts alone', () => {
    const { container } = render(<Deck />)
    act(() => void fireEvent.keyDown(window, { key: 'ArrowRight', metaKey: true }))
    expect(at(container)).toBe('1.0')
  })
})

describe('R4 hash', () => {
  it('#4 opens slide 4 at step 0', () => {
    window.history.replaceState(null, '', '/#4')
    const { container } = render(<Deck />)
    expect(at(container)).toBe('4.0')
  })

  it('an invalid hash opens slide 1', () => {
    window.history.replaceState(null, '', '/#99')
    const { container } = render(<Deck />)
    expect(at(container)).toBe('1.0')
  })

  it('moving between slides updates the hash without history entries', () => {
    const push = vi.spyOn(window.history, 'pushState')
    const length = window.history.length
    render(<Deck />)
    press('ArrowRight') // slide 2
    expect(window.location.hash).toBe('#2')
    press('ArrowRight') // slide 2, step 1: hash unchanged
    expect(window.location.hash).toBe('#2')
    press('End')
    expect(window.location.hash).toBe('#13')
    expect(window.history.length).toBe(length)
    expect(push).not.toHaveBeenCalled()
  })

  it('follows a hash typed into the address bar', () => {
    const { container } = render(<Deck />)
    act(() => {
      window.history.replaceState(null, '', '/#8')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(at(container)).toBe('8.0')
  })
})

describe('R7 chrome', () => {
  it('shows NN / 13, a source line and a progress bar filled to n/13', () => {
    window.history.replaceState(null, '', '/#5')
    const { container } = render(<Deck />)
    const slide = container.querySelector('.slide[data-state="in"]') as HTMLElement
    expect(slide.querySelector('.num')?.textContent).toBe('05 / 13')
    expect(slide.querySelector('.src')?.textContent).toBe(SLIDES[4].source)
    expect((slide.querySelector('.progress i') as HTMLElement).style.width).toBe(`${(5 / 13) * 100}%`)
  })

  it('shows the logo only on the Title slide', () => {
    const { container } = render(<Deck />)
    expect(container.querySelectorAll('.slide[data-state="in"] .mark')).toHaveLength(1)
    press('ArrowRight')
    expect(container.querySelectorAll('.slide[data-state="in"] .mark')).toHaveLength(0)
  })
})
