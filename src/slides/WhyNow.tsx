import { useContent } from '../content'
import { st } from '../deck/step'
import { Headline } from '../deck/Text'
import type { SlideProps } from '../deck/types'

/** R23: one card per step; each date chip settles from 1.04 scale. */
export function WhyNowSlide({ step }: SlideProps) {
  const c = useContent().whyNow
  return (
    <div className="sl-pad why">
      <div className="head">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2 x88" text={c.headline} />
      </div>
      <div className="why-grid">
        {c.cards.map((card, i) => (
          <div key={card.title} className="glass why-card st" data-cue={`card${i}`} {...st(i, step)}>
            <span className={`chip tone-${card.tone}`} data-cue={`chip${i}`}>{card.chip}</span>
            <p className="card-title">{card.title}</p>
            <p className="card-body">{card.body}</p>
            <div className="grow" />
            <p className="card-source">{card.source}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
