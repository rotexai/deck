// R9: no colour literals (hex, rgb(a), hsl(a)) in src/ outside src/styles/tokens.css.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const allowed = join(root, 'src/styles/tokens.css')
const literal = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(/g
const bad = []

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(css|tsx?|jsx?)$/.test(name) && p !== allowed) {
      readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        for (const m of line.matchAll(literal)) bad.push(`${relative(root, p)}:${i + 1}: ${m[0]}`)
      })
    }
  }
}

walk(join(root, 'src'))
if (bad.length) {
  console.error(`check-tokens: ${bad.length} colour literal(s) outside src/styles/tokens.css`)
  for (const b of bad) console.error('  ' + b)
  process.exit(1)
}
console.log('check-tokens: no colour literals outside src/styles/tokens.css')
