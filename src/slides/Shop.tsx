import { en } from '../content/en'
import { st } from '../deck/step'
import { Headline } from '../deck/Text'
import type { SlideProps } from '../deck/types'

export const SHOP_STEPS = 6

/** R17: the receipt prints one line per step; the clock ticks from 18:00 to 21:30 as it prints. */
export function ShopSlide({ step }: SlideProps) {
  const c = en.shop
  const r = c.receipt
  const last = SHOP_STEPS - 1
  return (
    <div className="sl-pad shop">
      <div className="shop-left">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2 x84" text={c.headline} />
        <blockquote className="quote">{c.quote}</blockquote>
        <p className="shop-clock" aria-live="off">
          <span>{c.clockLabel}</span> <time>{c.clock[step]}</time>
        </p>
      </div>
      <div className="shop-right">
        <div className="receipt">
          <div className="rc-row rc-strong">
            <span>{r.head[0]}</span>
            <span>{r.head[1]}</span>
          </div>
          <div className="rc-cut" />
          {r.lines.map(([what, how], i) => (
            <div key={what} className="rc-row st" {...st(i, step)}>
              <span>{what}</span>
              <span>{how}</span>
            </div>
          ))}
          <div className="rc-cut st" {...st(last, step)} />
          <div className="rc-row rc-strong st" {...st(last, step)}>
            <span>{r.total[0]}</span>
            <span className="warn">{r.total[1]}</span>
          </div>
          <p className="rc-note st" {...st(last, step)}>
            {r.note}
          </p>
        </div>
      </div>
    </div>
  )
}
