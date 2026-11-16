import { en } from '../content/en'
import { Headline } from '../deck/Text'

/** R27: the founder; the portrait fades in, then the line. */
export function TeamSlide() {
  const c = en.team
  return (
    <div className="sl-pad team">
      <img className="portrait" src={c.portrait.src} alt={c.portrait.alt} />
      <div className="team-text">
        <p className="kicker">{c.kicker}</p>
        <Headline className="h2" text={c.headline} start={300} />
        <p className="person">
          <b>{c.name}</b> · {c.role}
        </p>
        <p className="origin">{c.origin}</p>
        <p className="card-body later">{c.background}</p>
        <a className="team-link later" href={c.link.href}>
          {c.link.text}
        </a>
      </div>
    </div>
  )
}
