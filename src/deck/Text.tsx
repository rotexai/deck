import type { CSSProperties, ElementType } from 'react'
import { parseHeadline, splitSlots } from './step'

/** Text that renders every `[placeholder]` as a dashed slot (R30). */
export function Txt({ text, block = false }: { text: string; block?: boolean }) {
  const parts = splitSlots(text)
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className={block ? 'slot block' : 'slot'}>
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  )
}

/** A headline that blurs in word by word, 60 ms apart (R13). */
export function Headline({ text, as: Tag = 'h2', className, start = 0 }: { text: string; as?: ElementType; className?: string; start?: number }) {
  const words = parseHeadline(text)
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        // Keyed by the text, so a language switch replays the word cascade instead of patching words in place.
        <span key={`${text}:${i}`}>
          {i > 0 && ' '}
          <span className="w" style={{ '--d': `${start + i * 60}ms` } as CSSProperties}>
            {w.map((p, j) => (p.em ? <span key={j} className="accent">{p.text}</span> : p.text))}
          </span>
        </span>
      ))}
    </Tag>
  )
}
