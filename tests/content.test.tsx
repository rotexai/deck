import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { en } from '../src/content/en'
import { vi } from '../src/content/vi'
import { PrintDeck } from '../src/deck/Deck'
import { SLIDES } from '../src/slides'

function strings(v: unknown): string[] {
  if (typeof v === 'string') return [v]
  if (Array.isArray(v)) return v.flatMap(strings)
  if (v && typeof v === 'object') return Object.values(v).flatMap(strings)
  return []
}
const SLOT = /\[[^\]]+\]/g

describe('R29 sources', () => {
  it('every slide names a source', () => {
    expect(SLIDES).toHaveLength(13)
    for (const s of SLIDES) {
      expect(en[s.copy].source.trim(), s.id).not.toBe('')
      expect(vi[s.copy].source.trim(), s.id).not.toBe('')
    }
  })
})

describe('R30 placeholder slots', () => {
  it('every missing fact renders as a slot, and no bracketed text renders outside one', () => {
    const { container } = render(<PrintDeck />)
    const wanted = strings(en).flatMap((s) => s.match(SLOT) ?? [])
    expect(wanted.length).toBeGreaterThan(0)
    const slots = [...container.querySelectorAll('.slot')].map((e) => e.textContent)
    for (const w of wanted) expect(slots, w).toContain(w)

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (n.parentElement?.closest('.slot')) continue
      expect(n.textContent ?? '').not.toMatch(SLOT)
    }
  })
})

describe('R5 print', () => {
  it('renders all 13 slides, each at its final step, one per page', () => {
    const { container } = render(<PrintDeck />)
    const pages = container.querySelectorAll('.print .page')
    expect(pages).toHaveLength(13)
    pages.forEach((p, i) => {
      expect(p.querySelectorAll('.slide')).toHaveLength(1)
      expect(p.querySelector('.num')?.textContent).toBe(`${String(i + 1).padStart(2, '0')} / 13`)
      // Final step: no step element is still waiting to appear.
      expect(p.querySelectorAll('.st:not([data-on])'), SLIDES[i].id).toHaveLength(0)
    })
    expect(container.querySelector('video')).toBeNull()
  })
})

describe('R8 copy', () => {
  it('slides take their copy from the strings module', () => {
    const { container } = render(<PrintDeck />)
    const text = container.textContent ?? ''
    for (const s of [en.title.headline, en.market.headline, en.ask.headline]) {
      expect(text).toContain(s.replace(/\*/g, ''))
    }
  })
})
