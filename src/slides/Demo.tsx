import { useEffect, useRef } from 'react'
import { useContent, useLang } from '../content'
import { useNarrator, useNarratorState } from '../deck/narrator'
import { Headline } from '../deck/Text'
import type { SlideProps } from '../deck/types'

const start = (v: HTMLVideoElement) => {
  const p = v.play()
  if (p && typeof p.catch === 'function') p.catch(() => {})
}

/** R21: the walkthrough video, labelled a simulation. Plays from the start on enter, pauses on leave; muted with captions.
 *  Narrated (spec 261117 R13): held at the start while the line speaks, then plays with its own sound; its end lets
 *  the narration take the next step. */
export function DemoSlide({ active, still, print }: SlideProps) {
  const c = useContent().demo
  const { lang } = useLang()
  const ref = useRef<HTMLVideoElement>(null)
  const narrator = useNarrator()
  const { status, phase } = useNarratorState()
  const narrated = status === 'playing' || status === 'paused'
  useEffect(() => {
    const v = ref.current
    if (!v || narrated) return
    v.muted = true
    if (active && !still) {
      v.currentTime = 0
      start(v)
    } else {
      v.pause()
    }
  }, [active, still, narrated])
  useEffect(() => {
    const v = ref.current
    if (!v || !narrated) return
    v.muted = false
    if (!active || status === 'paused' || phase === 'gap') return void v.pause()
    if (phase === 'video') return start(v)
    v.pause()
    v.currentTime = 0
  }, [active, narrated, status, phase])
  return (
    <div className="sl-pad demo">
      <div className="head">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2" text={c.headline} />
      </div>
      <div className="demo-row">
        <figure className="film">
          <figcaption className="sim-label" data-cue="label">{c.label}</figcaption>
          {print ? (
            <img src={c.video.poster} alt="" />
          ) : (
            <video
              key={c.video.src}
              ref={ref}
              src={c.video.src}
              poster={c.video.poster}
              muted
              playsInline
              preload="auto"
              controls={still}
              onEnded={() => narrator?.videoEnded()}
            >
              <track kind="captions" src={c.video.captions} srcLang={lang} label={c.video.captionsLabel} default />
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
