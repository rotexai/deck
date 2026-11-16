import { useEffect, useRef } from 'react'
import { useContent } from '../content'
import { Headline } from '../deck/Text'
import type { SlideProps } from '../deck/types'

/** R21: the walkthrough video, labelled a simulation. Plays from the start on enter, pauses on leave; muted with captions. */
export function DemoSlide({ active, still, print }: SlideProps) {
  const c = useContent().demo
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (active && !still) {
      v.currentTime = 0
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } else {
      v.pause()
    }
  }, [active, still])
  return (
    <div className="sl-pad demo">
      <div className="head">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2" text={c.headline} />
      </div>
      <div className="demo-row">
        <figure className="film">
          <figcaption className="sim-label">{c.label}</figcaption>
          {print ? (
            <img src={c.video.poster} alt="" />
          ) : (
            <video ref={ref} src={c.video.src} poster={c.video.poster} muted playsInline preload="auto" controls={still}>
              <track kind="captions" src={c.video.captions} srcLang="en" label={c.video.captionsLabel} default />
            </video>
          )}
        </figure>
        <div className="chapters">
          <p className="kicker">{c.chaptersTitle}</p>
          <ol>
            {c.chapters.map((ch) => (
              <li key={ch.at}>
                <time>{ch.at}</time>
                <span>{ch.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
