import type { CSSProperties } from 'react'
import { useContent } from '../content'
import { Headline, Txt } from '../deck/Text'

/** R26: live in production; a timeline line draws left to right and lights each milestone. Numbers are slots. */
export function TractionSlide() {
  const c = useContent().traction
  return (
    <div className="sl-pad traction">
      <div className="head">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2" text={c.headline} />
      </div>
      <div className="timeline">
        <span className="tl-line" aria-hidden="true" />
        <ol className="tl-list">
          {c.milestones.map((m, i) => (
            <li key={m.title} className="tl-item" data-cue={`m${i}`} style={{ '--d': `${500 + i * 380}ms` } as CSSProperties}>
              <span className="tl-date">
                <Txt text={m.date} />
              </span>
              <span className="tl-dot" aria-hidden="true" />
              <span className="card-title">{m.title}</span>
              <span className="card-body">{m.body}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="metrics" data-cue="metrics">
        {c.metrics.map((m) => (
          <div key={m.label} className="metric">
            <span className="panel-label">{m.label}</span>
            <span className="metric-value">
              <Txt text={m.value} block />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
