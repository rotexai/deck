import type { CSSProperties } from 'react'
import { en } from '../content/en'
import { Headline, Txt } from '../deck/Text'

/** R25: the model in placeholder slots until prices are set; cards slide in. */
export function BusinessSlide() {
  const c = en.business
  return (
    <div className="sl-pad business">
      <div className="head">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2" text={c.headline} />
      </div>
      <div className="biz-grid">
        {c.cards.map((card, i) => (
          <div key={card.title} className="glass biz-card slide-card" style={{ '--d': `${300 + i * 160}ms` } as CSSProperties}>
            <p className="panel-label">{card.title}</p>
            <p className="biz-value">
              <Txt text={card.value} block />
            </p>
            <p className="card-body">
              <Txt text={card.body} />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
