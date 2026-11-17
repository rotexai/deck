import { existsSync } from 'node:fs'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LangContext } from '../src/content'
import { en } from '../src/content/en'
import { vi } from '../src/content/vi'
import { Deck, PrintDeck } from '../src/deck/Deck'
import { LangProvider } from '../src/deck/Lang'
import { media } from './setup'

const plain = (s: string) => s.replace(/\*/g, '')

/** Every string in a copy tree, with its path, in key order. */
function leaves(v: unknown, path = ''): [string, string][] {
  if (typeof v === 'string') return [[path, v]]
  if (Array.isArray(v)) return v.flatMap((x, i) => leaves(x, `${path}[${i}]`))
  if (v && typeof v === 'object') return Object.entries(v).flatMap(([k, x]) => leaves(x, path ? `${path}.${k}` : k))
  return []
}
const count = (s: string, re: RegExp) => (s.match(re) ?? []).length

describe('Vietnamese copy', () => {
  it('has the same strings as English, with the same accent, slot and fill-in markers', () => {
    const e = leaves(en)
    const v = new Map(leaves(vi))
    expect(v.size).toBe(e.length)
    for (const [path, s] of e) {
      const t = v.get(path)
      expect(t, path).toBeTypeOf('string')
      expect(count(t!, /\*/g), path).toBe(count(s, /\*/g))
      expect(count(t!, /\[[^\]]+\]/g), path).toBe(count(s, /\[[^\]]+\]/g))
      for (const f of s.match(/\{\w+\}/g) ?? []) expect(t, path).toContain(f)
    }
  })

  it('keeps media paths and links', () => {
    // The Vietnamese deck plays the Vietnamese walkthrough (same cut and chapter times, from web/investor).
    expect(vi.demo.video).toMatchObject({ src: '/media/walkthrough.vi.mp4', poster: '/media/walkthrough.vi.jpg', captions: '/media/walkthrough.vi.vtt' })
    for (const f of Object.values(vi.demo.video).filter((v) => v.startsWith('/media/'))) expect(existsSync(`public${f}`), f).toBe(true)
    expect(vi.team.link.href).toBe(en.team.link.href)
    expect(vi.team.portrait.src).toBe(en.team.portrait.src)
  })
})

describe('language switch', () => {
  it('switches the slide copy, <html lang>, the title and ?lang=, and keeps the slide', () => {
    window.history.replaceState(null, '', '/#1')
    const { container } = render(
      <LangProvider>
        <Deck />
      </LangProvider>,
    )
    const h = () => container.querySelector('.slide[data-state="in"] h1, .slide[data-state="in"] h2')?.textContent
    expect(h()).toBe(plain(en.title.headline))

    act(() => void fireEvent.click(screen.getByRole('button', { name: en.deck.switchTo })))
    expect(h()).toBe(plain(vi.title.headline))
    expect(document.documentElement.lang).toBe('vi')
    expect(document.title).toBe(vi.deck.title)
    expect(window.location.search).toBe('?lang=vi')
    expect(window.location.hash).toBe('#1')

    act(() => void fireEvent.click(screen.getByRole('button', { name: vi.deck.switchTo })))
    expect(h()).toBe(plain(en.title.headline))
    expect(document.documentElement.lang).toBe('en')
    expect(window.location.search).toBe('')
  })

  it('starts in Vietnamese from ?lang=vi, with Vietnamese number format', () => {
    media.reduced = true
    window.history.replaceState(null, '', '/?lang=vi#4')
    const { container } = render(
      <LangProvider>
        <Deck />
      </LangProvider>,
    )
    expect(container.querySelector('.viewport')?.getAttribute('data-slide')).toBe('4')
    expect(container.textContent).toContain(plain(vi.market.headline))
    expect(container.textContent).toContain('817.000')
  })

  it('Space on the focused button presses it without advancing the deck', () => {
    const { container } = render(
      <LangProvider>
        <Deck />
      </LangProvider>,
    )
    const b = screen.getByRole('button', { name: en.deck.switchTo })
    b.focus()
    act(() => void fireEvent.keyDown(b, { key: ' ' }))
    expect(container.querySelector('.viewport')?.getAttribute('data-step')).toBe('0')
    expect(container.querySelector('.viewport')?.getAttribute('data-slide')).toBe('1')
  })

  it('prints in the chosen language, every slot as a slot, with no button', () => {
    const { container } = render(
      <LangContext.Provider value={{ lang: 'vi', setLang: () => {} }}>
        <PrintDeck />
      </LangContext.Provider>,
    )
    expect(container.querySelector('.lang-switch')).toBeNull()
    const slots = [...container.querySelectorAll('.slot')].map((e) => e.textContent)
    for (const [, s] of leaves(vi)) for (const w of s.match(/\[[^\]]+\]/g) ?? []) expect(slots, w).toContain(w)
    expect(container.textContent).toContain(plain(vi.ask.headline))
  })
})
