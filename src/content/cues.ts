/** Narration cues (owner 2026-11-17, design artifact "Deck Narration Sync"): a narration line names what it points at
 *  with markers such as `[[focus:tl]]` placed right before a word. The voice and the Script never see them; while the
 *  line plays, the slide lights that element at that word.
 *
 *  focus:a+b  these elements come forward, every other cue element on the slide steps back (`none` clears)
 *  mark:a+b   these elements get a highlight and keep it for the rest of the line
 *  land:a     this element stays hidden until the word, then appears
 *
 *  Plain TypeScript with no imports: scripts/narrate.mjs loads it directly to strip markers before rendering. */

export type CueKind = 'focus' | 'mark' | 'land'

export interface Cue {
  kind: CueKind
  targets: string[]
  /** Index of the word (in the plain text, split on whitespace) the cue fires at. */
  word: number
}

const MARKER = /\[\[(focus|mark|land):([a-z0-9+-]+)\]\]/g

/** The text without markers, with whitespace as written. */
export function stripCues(text: string): string {
  return text.replace(MARKER, '')
}

/** The plain text and its cues. A marker fires at the first word after it. */
export function parseLine(text: string): { plain: string; cues: Cue[] } {
  const cues: Cue[] = []
  let plain = ''
  let last = 0
  for (const m of text.matchAll(MARKER)) {
    plain += text.slice(last, m.index)
    last = m.index + m[0].length
    const before = plain.trim()
    const word = before ? before.split(/\s+/).length : 0
    const targets = m[2] === 'none' ? [] : m[2].split('+')
    cues.push({ kind: m[1] as CueKind, targets, word })
  }
  plain += text.slice(last)
  return { plain, cues }
}

/** Word start times spread over the line by character position, for lines rendered without timestamps. */
export function estimateWords(plain: string, seconds: number): number[] {
  const out: number[] = []
  const len = plain.length || 1
  for (const m of plain.matchAll(/\S+/g)) out.push(Math.round(((m.index / len) * seconds) * 100) / 100)
  return out
}

export interface CueState {
  focus: string[]
  marks: string[]
  waiting: string[]
}

/** What the slide shows at time `t` (seconds into the line). */
export function cueState(cues: Cue[], words: number[], t: number): CueState {
  const fired = (c: Cue) => c.word < words.length && words[c.word] <= t
  let focus: string[] = []
  const marks = new Set<string>()
  const waiting = new Set<string>()
  for (const c of cues) {
    if (c.kind === 'land') {
      if (!fired(c)) c.targets.forEach((x) => waiting.add(x))
      continue
    }
    if (!fired(c)) continue
    if (c.kind === 'focus') focus = c.targets
    else c.targets.forEach((x) => marks.add(x))
  }
  return { focus, marks: [...marks], waiting: [...waiting] }
}
