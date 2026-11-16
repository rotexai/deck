import type { CSSProperties } from 'react'
import { en } from '../content/en'
import { st } from '../deck/step'
import { Headline } from '../deck/Text'
import type { SlideProps } from '../deck/types'

const PITCH = 52 // row height 34 + gap 18

/** R18: bars grow; step 1 moves the fit bar from 9th (literature, shown last) to 3rd (SMEs) and dims the rest; step 2 the cards. */
export function ProblemSlide({ step }: SlideProps) {
  const c = en.problem
  const bars = c.bars
  const fitAt = bars.findIndex((b) => 'fit' in b)
  const order = step >= 1 ? bars.map((_, i) => i) : [...bars.map((_, i) => i).filter((i) => i !== fitAt), fitAt]
  return (
    <div className="sl-pad problem">
      <div className="head">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2" text={c.headline} />
      </div>
      <div className="problem-grid">
        <div className="chart">
          <p className="chart-label">{c.chartLabel}</p>
          <div className="bars" style={{ height: bars.length * PITCH - 18 }}>
            {bars.map((b, i) => (
              <div
                key={b.label}
                className={'bar-row' + (i === fitAt ? ' fit' : '')}
                data-dim={step >= 1 && i !== fitAt ? '' : undefined}
                style={{ transform: `translateY(${order.indexOf(i) * PITCH}px)`, '--i': i } as CSSProperties}
              >
                <span className="bl">{b.label}</span>
                <div className="track">
                  <div className="fill" style={{ width: `${((b.value / c.max) * 100).toFixed(1)}%` }} />
                </div>
                <span className="bv">{b.value}</span>
              </div>
            ))}
          </div>
          <div className="chip-row">
            <span className="chip-from">{c.chip.from}</span>
            <span className="st" aria-hidden="true" {...st(1, step)}>
              →
            </span>
            <span className="chip-to st" {...st(1, step)}>
              {c.chip.to}
            </span>
          </div>
        </div>
        <div className="cards">
          {c.cards.map((card, i) => (
            <div key={card.title} className="rule-card st" {...st(2, step)} style={{ '--d': `${i * 120}ms` } as CSSProperties}>
              <p className="card-title">{card.title}</p>
              <p className="card-body">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
