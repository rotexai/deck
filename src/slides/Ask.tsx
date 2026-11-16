import type { CSSProperties } from 'react'
import { useContent } from '../content'
import { en } from '../content/en'
import { useCountUp } from '../deck/motion'
import { st } from '../deck/step'
import { Headline, Txt } from '../deck/Text'
import type { SlideProps } from '../deck/types'

const SUM = en.ask.funds.reduce((a, f) => a + f.amount, 0)

/** R28: four steps fill the bar one use of funds each, then the milestones; the total counts to 150M on the last. */
export function AskSlide({ step, still }: SlideProps) {
  const c = useContent().ask
  const funds = c.funds
  const last = funds.length - 1
  const total = useCountUp(
    funds.slice(0, step + 1).reduce((a, f) => a + f.amount, 0),
    still,
    700,
  )
  return (
    <div className="sl-pad ask">
      <div className="head">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2 x88" text={c.headline} />
      </div>
      <div className="funds">
        <p className="ask-total">
          <span>{c.totalLabel}</span>{' '}
          <b data-total={SUM}>
            {total}
            {c.unit}
          </b>
        </p>
        <div className="fund-bar" role="img" aria-label={c.barLabel}>
          {funds.map((f, i) => (
            <span key={f.label} className={`seg seg-${i} st`} {...st(i, step)} style={{ width: `${(f.amount / SUM) * 100}%` }} />
          ))}
        </div>
        <div className="fund-labels">
          {funds.map((f, i) => (
            <div key={f.label} className="fund-label st" {...st(i, step)} style={{ width: `${(f.amount / SUM) * 100}%` }}>
              <span className="amt">
                {f.amount}
                {c.amountUnit}
              </span>
              <span className="use">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="milestones">
        {c.milestones.map((m, i) => (
          <div key={m.when} className="milestone st" {...st(last, step)} style={{ '--d': `${500 + i * 140}ms` } as CSSProperties}>
            <span className="when">{m.when}</span>
            <span className="what">
              <Txt text={m.what} block />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
