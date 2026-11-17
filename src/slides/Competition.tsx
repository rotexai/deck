import type { CSSProperties } from 'react'
import { useContent } from '../content'
import { st } from '../deck/step'
import { Headline, Txt } from '../deck/Text'
import type { SlideProps } from '../deck/types'

/** R24: a 2×2 by category (wiki Pillar 7 map); competitors drop in, RotexAI lands last in its quadrant (step 2). */
export function CompetitionSlide({ step }: SlideProps) {
  const c = useContent().competition
  return (
    <div className="sl-pad competition">
      <div className="head">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2" text={c.headline} />
      </div>
      <div className="matrix">
        <span className="axis-v" aria-hidden="true" />
        <span className="axis-h" aria-hidden="true" />
        <span className="ax up">↑ {c.axes.up}</span>
        <span className="ax down">{c.axes.down}</span>
        <span className="ax left">{c.axes.left}</span>
        <span className="ax right">{c.axes.right} →</span>
        {c.others.map((o, i) => (
          <div key={o.name} className={`glass q-card drop q-${o.quadrant}`} style={{ '--d': `${200 + i * 180}ms` } as CSSProperties}>
            <p className="card-title">{o.name}</p>
            <p className="card-body">{o.note}</p>
            <p className="q-names">
              <Txt text={o.names} />
            </p>
          </div>
        ))}
        <div className={`glass q-card us land st q-${c.us.quadrant}`} {...st(1, step)}>
          <p className="card-title accent">{c.us.name}</p>
          <p className="card-body">{c.us.note}</p>
        </div>
      </div>
      <p className="aside">{c.aside}</p>
    </div>
  )
}
