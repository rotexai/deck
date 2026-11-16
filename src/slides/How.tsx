import { en } from '../content/en'
import { Headline } from '../deck/Text'
import type { SlideProps } from '../deck/types'

function Flow({ dir, still }: { dir: 'h' | 'v'; still: boolean }) {
  return (
    <div className={`flow-line ${dir}`} aria-hidden="true">
      <span className="line" />
      <span className="head" />
      {!still && [0, 1, 2].map((i) => <span key={i} className="flow-dot" style={{ animationDelay: `${-i * 0.8}s` }} />)}
    </div>
  )
}

function Box({ title, body, hot = false }: { title: string; body: string; hot?: boolean }) {
  return (
    <div className={'glass how-box' + (hot ? ' hot' : '')}>
      <p className="card-title">{title}</p>
      <p className="card-body">{body}</p>
    </div>
  )
}

/** R22: every action is a workflow you can inspect; small dots flow along the arrows. */
export function HowSlide({ still }: SlideProps) {
  const c = en.how
  return (
    <div className="sl-pad how">
      <div className="head">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2" text={c.headline} />
      </div>
      <div className="how-grid">
        <Box {...c.describe} />
        <Flow dir="h" still={still} />
        <Box {...c.workflows} hot />
        <Flow dir="h" still={still} />
        <Box {...c.app} />
        <div className="how-up">
          <Flow dir="v" still={still} />
        </div>
        <div className="how-mcp">
          <Box {...c.mcp} />
        </div>
      </div>
    </div>
  )
}
