import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { en } from '../src/content/en'
import { countAt } from '../src/deck/motion'
import { MarketSlide } from '../src/slides/Market'

const props = { active: true, print: false, enter: 'jump' as const }
const count = (c: HTMLElement, colour: string) => c.querySelectorAll(`.dot[data-c="${colour}"]`).length

describe('R19 market dots', () => {
  it('draws 817 dots, all ink at step 1', () => {
    const { container } = render(<MarketSlide step={0} still {...props} />)
    expect(container.querySelectorAll('.dot')).toHaveLength(817)
    expect(count(container, 'ink')).toBe(817)
    expect(screen.getByText('817,000')).toBeTruthy()
  })

  it('step 2 colours exactly 718 dots blue', () => {
    const { container } = render(<MarketSlide step={1} still {...props} />)
    expect(count(container, 'blue')).toBe(718)
    expect(count(container, 'dim')).toBe(817 - 718)
    expect(screen.getByText('718,000')).toBeTruthy()
  })

  it('step 3 colours exactly 122 dots orange, the first 122', () => {
    const { container } = render(<MarketSlide step={2} still {...props} />)
    expect(count(container, 'orange')).toBe(122)
    expect(count(container, 'blue')).toBe(718 - 122)
    const dots = [...container.querySelectorAll<HTMLElement>('.dot')]
    expect(dots.slice(0, 122).every((d) => d.dataset.c === 'orange')).toBe(true)
    expect(screen.getByText('122,000')).toBeTruthy()
  })

  it('the wave starts at the top left', () => {
    const { container } = render(<MarketSlide step={1} still {...props} />)
    const dots = [...container.querySelectorAll<HTMLElement>('.dot')]
    const delay = (i: number) => parseInt(dots[i].style.getPropertyValue('--d'), 10)
    expect(delay(0)).toBe(0)
    expect(delay(1)).toBeGreaterThan(0)
    expect(delay(43)).toBe(delay(1)) // one row down = one column right
    expect(delay(816)).toBe(Math.max(...dots.map((_, i) => delay(i))))
  })

  it('the figure counts up and lands on the exact value', async () => {
    render(<MarketSlide step={0} still={false} {...props} />)
    await waitFor(() => expect(screen.getByText('817,000')).toBeTruthy(), { timeout: 3000 })
  })

  it('counting lands exactly, never past the target', () => {
    for (const [from, to] of [[0, 817000], [817000, 718000], [718000, 122000], [0, 150]]) {
      expect(countAt(from, to, 1)).toBe(to)
      expect(countAt(from, to, 2)).toBe(to)
      for (let p = 0; p < 1; p += 0.05) {
        const v = countAt(from, to, p)
        expect(v).toBeGreaterThanOrEqual(Math.min(from, to))
        expect(v).toBeLessThanOrEqual(Math.max(from, to))
      }
    }
  })

  it('labels 718k and 122k as our estimates', () => {
    expect(en.market.source).toMatch(/718k and 122k are our estimates/)
  })
})
