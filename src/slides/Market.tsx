import type { CSSProperties } from 'react'
import { useContent } from '../content'
import { en } from '../content/en'
import { useCountUp } from '../deck/motion'
import { Headline } from '../deck/Text'
import type { SlideProps } from '../deck/types'

type Dot = 'ink' | 'blue' | 'dim' | 'orange'

// Dot counts are the same in every language.
const { total, columns, paying, erp } = en.market.dots

function dotColour(i: number, step: number): Dot {
  if (step >= 2 && i < erp) return 'orange'
  if (step >= 1) return i < paying ? 'blue' : 'dim'
  return 'ink'
}


/** R19: 817 dots, one per 1,000 SMEs. Each step recolours in a wave from the top left; the figure counts to the exact value. */
export function MarketSlide({ step, still }: SlideProps) {
  const all = useContent()
  const c = all.market
  const fmt = (n: number) => n.toLocaleString(all.deck.locale)
  const s = c.steps[step]
  const figure = useCountUp(s.figure, still)
  return (
    <div className="sl-pad market">
      <div className="head">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2" text={c.headline} />
      </div>
      <div className="market-row">
        <div className="market-left">
          <p className={`figure tone-${s.tone}`} data-figure={s.figure}>
            {fmt(figure)}
          </p>
          <p key={step} className="caption rise">
            {s.caption}
          </p>
          <p className="aside">{c.aside}</p>
        </div>
        <div className="dots" role="img" aria-label={c.gridLabel.replace('{figure}', fmt(s.figure))}>
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className="dot"
              data-c={dotColour(i, step)}
              style={{ '--d': `${(Math.floor(i / columns) + (i % columns)) * 12}ms` } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
