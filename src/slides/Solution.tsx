import { Fragment, type CSSProperties } from 'react'
import { useContent } from '../content'
import { useTyped } from '../deck/motion'
import { st } from '../deck/step'
import { Headline } from '../deck/Text'
import type { SlideProps } from '../deck/types'

/** R20: the switch (paper fades to ink over 900 ms, the glow rises), then: the prompt types, the workflow draws, Approve v3 stamps. */
export function SolutionSlide({ step, still, enter }: SlideProps) {
  const c = useContent().solution
  const switching = enter === 'next' && !still
  const typed = useTyped(c.says.text, still, step > 0, 24, switching ? 900 : 300)
  return (
    <div className="sl-pad solution">
      {switching && <div className="switch-paper" aria-hidden="true" />}
      <div className={'glow' + (switching ? ' rising' : '')} aria-hidden="true" />
      <div className="head">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2 x88" text={c.headline} start={switching ? 600 : 0} />
      </div>
      <div className="sol-grid">
        <div className="glass panel" data-cue="says">
          <p className="panel-label">{c.says.label}</p>
          <p className="prompt" aria-label={c.says.text}>
            <span aria-hidden="true">{typed}</span>
            <span className="cursor" aria-hidden="true">
              ▍
            </span>
          </p>
        </div>
        <div className="sol-arrow st" aria-hidden="true" {...st(1, step)}>
          →
        </div>
        <div className="glass panel" data-cue="builds">
          <p className="panel-label">{c.builds.label}</p>
          <div className="flow">
            {c.builds.nodes.map((n, i) => (
              <Fragment key={n}>
                {i > 0 && (
                  <div className="flow-arrow st" aria-hidden="true" {...st(1, step)} style={{ '--d': `${i * 200 - 100}ms` } as CSSProperties}>
                    ↓
                  </div>
                )}
                <div
                  className={'wf-node st' + (i === c.builds.nodes.length - 1 ? ' human' : '')}
                  data-cue={`node${i}`}
                  {...st(1, step)}
                  style={{ '--d': `${i * 200}ms` } as CSSProperties}
                >
                  {n}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="sol-arrow st" aria-hidden="true" {...st(2, step)}>
          →
        </div>
        <div className="glass panel" data-cue="approves">
          <p className="panel-label">{c.approves.label}</p>
          <p className="version st" data-cue="version" {...st(2, step)}>
            {c.approves.version}
          </p>
          <div className="diff st" {...st(2, step)} style={{ '--d': '120ms' } as CSSProperties}>
            {c.approves.diff.map((d) => (
              <span key={d.text} className={d.kind}>
                {d.text}
              </span>
            ))}
          </div>
          <div className="grow" />
          <span className="approve stamp" {...st(2, step)}>
            {c.approves.button}
          </span>
        </div>
      </div>
    </div>
  )
}
