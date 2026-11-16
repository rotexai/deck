/** Attributes for an element that appears at step `at` (R14). CSS: `.st` hidden until `[data-on]`. */
export function st(at: number, step: number, dimAfter = false) {
  return {
    'data-on': step >= at ? '' : undefined,
    'data-dim': dimAfter && step > at ? '' : undefined,
  }
}

export type Piece = { text: string; em: boolean }

/** Split a headline into words; `*phrase*` marks the key phrase. Punctuation stays with its word. */
export function parseHeadline(s: string): Piece[][] {
  const words: Piece[][] = []
  let cur: Piece[] = []
  s.split('*').forEach((part, i) => {
    const em = i % 2 === 1
    for (const tok of part.split(/(\s+)/)) {
      if (!tok) continue
      if (/^\s+$/.test(tok)) {
        if (cur.length) words.push(cur)
        cur = []
      } else cur.push({ text: tok, em })
    }
  })
  if (cur.length) words.push(cur)
  return words
}

/** Split text around `[placeholder]` slots (R30). Odd entries are slots. */
export function splitSlots(text: string): string[] {
  return text.split(/(\[[^\]]+\])/)
}
