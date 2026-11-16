// R11: every text colour meets 4.5:1 on the background it is used on (WCAG 2 relative luminance).
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8')
const tok = Object.fromEntries([...css.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]))

const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => lin(parseInt(hex.slice(i, i + 2), 16) / 255))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [x, y] = [lum(tok[a]), lum(tok[b])].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

// [text token, background token, where]
const pairs = [
  ['ink-brand', 'paper', 'paper slides: headline, figure'],
  ['paper-text', 'paper', 'paper slides: body'],
  ['paper-muted', 'paper', 'paper slides: kicker, source line'],
  ['blue', 'paper', 'paper slides: key phrase, fit bar label, chip'],
  ['warn-text', 'paper', 'market: 122,000'],
  ['receipt', 'blue', 'problem: "3rd for SMEs" chip; title: product QR band'],
  ['ink-brand', 'orange', 'title: investor QR band'],
  ['blue', 'receipt', 'title: product QR address'],
  ['ink-brand', 'receipt', 'receipt lines'],
  ['warn-text', 'receipt', 'receipt: steps linked 0'],
  ['paper-muted', 'receipt', 'receipt note'],
  ['fg', 'ink', 'ink slides: headline'],
  ['fg-soft', 'ink', 'ink slides: body'],
  ['muted', 'ink', 'ink slides: kicker, source line'],
  ['violet-text', 'ink', 'ink slides: key phrase'],
  ['cyan', 'ink', 'chips, cursor, link'],
  ['orange-text', 'ink', 'why now: 1 January 2026 chip'],
  ['diff-green', 'ink', 'solution: diff lines'],
  ['ink-brand', 'fg', 'solution: Approve v3 button'],
  ['violet', 'paper', 'print: key phrase on dark slides'],
  ['diff-green-print', 'paper', 'print: diff lines'],
  ['paper', 'ink-brand', 'print: Approve v3 button'],
]

let fail = 0
console.log('| Text | Background | Ratio | Where |\n| --- | --- | --- | --- |')
for (const [fg, bg, where] of pairs) {
  if (!tok[fg] || !tok[bg]) throw new Error(`missing token ${fg} or ${bg}`)
  const r = ratio(fg, bg)
  if (r < 4.5) fail++
  console.log(`| ${fg} ${tok[fg]} | ${bg} ${tok[bg]} | ${r.toFixed(2)}${r < 4.5 ? ' FAIL' : ''} | ${where} |`)
}
if (fail) {
  console.error(`contrast: ${fail} pair(s) below 4.5:1`)
  process.exit(1)
}
console.log('contrast: all pairs at or above 4.5:1')
