export interface Pos {
  index: number
  step: number
}

/** Steps per slide, in deck order. */
export type Steps = readonly number[]

export function next(pos: Pos, steps: Steps): Pos {
  if (pos.step < steps[pos.index] - 1) return { index: pos.index, step: pos.step + 1 }
  if (pos.index < steps.length - 1) return { index: pos.index + 1, step: 0 }
  return pos
}

export function prev(pos: Pos, steps: Steps): Pos {
  if (pos.step > 0) return { index: pos.index, step: pos.step - 1 }
  if (pos.index > 0) return { index: pos.index - 1, step: steps[pos.index - 1] - 1 }
  return pos
}

/** `#4` -> slide index 3. Anything else (empty, out of range, not a number) -> 0. */
export function indexFromHash(hash: string, count: number): number {
  const n = Number.parseInt(hash.replace(/^#/, ''), 10)
  return Number.isInteger(n) && n >= 1 && n <= count ? n - 1 : 0
}

export const KEYS_NEXT = new Set(['ArrowRight', ' ', 'PageDown'])
export const KEYS_PREV = new Set(['ArrowLeft', 'PageUp'])

export function pad2(n: number): string {
  return String(n).padStart(2, '0')
}
