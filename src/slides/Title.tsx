import type { CSSProperties } from 'react'
import { useContent } from '../content'
import { Headline } from '../deck/Text'

/** The brand mark (brand/logo/mark/rotexai-mark.svg) with its two links split so they can draw (R16). */
function Mark() {
  return (
    <svg className="mark" width="64" height="64" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect className="mk-frame" x="1" y="1" width="24" height="24" rx="6" strokeWidth="1.6" />
      <circle className="mk-blue" cx="8" cy="9" r="2.4" />
      <circle className="mk-blue" cx="18" cy="13" r="2.4" />
      <circle className="mk-orange" cx="9" cy="18.5" r="2.4" />
      <path className="mk-link" d="M10 9.6l6 2.6" pathLength={1} strokeWidth="1.3" style={{ '--d': '1000ms' } as CSSProperties} />
      <path className="mk-link" d="M16.2 14.2l-5.4 3.2" pathLength={1} strokeWidth="1.3" style={{ '--d': '1350ms' } as CSSProperties} />
    </svg>
  )
}

export function TitleSlide() {
  const c = useContent().title
  return (
    <div className="sl-pad title">
      <div className="brand">
        <Mark />
        <span className="wordmark">
          {c.wordmark.a}
          <span className="accent">{c.wordmark.b}</span>
        </span>
      </div>
      <div className="title-main">
        <p className="kicker rise">{c.kicker}</p>
        <Headline as="h1" className="h1" text={c.headline} start={150} />
        <p className="lead rise" style={{ '--d': '550ms' } as CSSProperties}>
          {c.body}
        </p>
      </div>
    </div>
  )
}
