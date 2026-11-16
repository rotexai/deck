import QRCode from 'qrcode'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { en } from '../src/content/en'
import { qrShapes } from '../src/deck/qrShapes'
import { TitleSlide } from '../src/slides/Title'

describe('title slide QR codes', () => {
  it('links rotexai.com and investor.rotexai.com, each with its own look', () => {
    render(<TitleSlide />)
    const links = screen.getAllByRole('link')
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['https://www.rotexai.com', 'https://investor.rotexai.com'])
    const [product, investor] = en.title.scan.links
    expect(links[0].textContent).toContain(product.cta)
    expect(links[1].textContent).toContain(investor.cta)
    const p = screen.getByRole('img', { name: `${product.title}: ${product.text}` })
    const v = screen.getByRole('img', { name: `${investor.title}: ${investor.text}` })
    for (const svg of [p, v]) expect(svg.querySelectorAll('.q-eye')).toHaveLength(3)
    // Product: round dots (arcs) and a shop; investor: square dots and a chart. Different site classes drive colour.
    expect(p.classList.contains('qr-product')).toBe(true)
    expect(v.classList.contains('qr-investor')).toBe(true)
    expect(p.querySelector('.q-dot')?.getAttribute('d')).toContain('a0.42')
    expect(v.querySelector('.q-dot')?.getAttribute('d')).not.toContain('a0.42')
    expect(p.querySelector('.q-icon .si-accent')?.getAttribute('d')).not.toBe(v.querySelector('.q-icon .si-accent')?.getAttribute('d'))
  })

  it('draws only real dark modules, and the logo hole stays well inside level H recovery', () => {
    for (const { href } of en.title.scan.links) {
      const { modules } = QRCode.create(href, { errorCorrectionLevel: 'H' })
      const { n, dots, hole } = qrShapes(href)
      expect(n).toBe(modules.size)
      for (const [x, y] of dots) expect(modules.data[y * n + x], `${x},${y}`).toBe(1)
      // The hole is centred and covers under 8% of the modules (level H recovers about 30%).
      expect(hole.from * 2 + hole.size).toBe(n)
      expect((hole.size * hole.size) / (n * n)).toBeLessThan(0.08)
    }
  })
})
