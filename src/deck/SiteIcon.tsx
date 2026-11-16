/** Which site a QR card links to. The product card is blue with a shop icon, the investor card orange with a chart. */
export type Site = 'product' | 'investor'

/** The site's icon in 26-unit space: `si-main` is the outline, `si-accent` the coloured detail (door, rising line).
 *  Drawn as `<g>` so it can sit inside the QR code's centre as well as in a card band. */
export function SiteIconPaths({ site }: { site: Site }) {
  return site === 'product' ? (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
      <path className="si-main" d="M5 11l2-5h12l2 5M5 11a2 2 0 0 0 4 0a2 2 0 0 0 4 0a2 2 0 0 0 4 0a2 2 0 0 0 4 0M6.5 12.8V20.5h13v-7.7" />
      <path className="si-accent" d="M11.5 20.5v-4h3v4" />
    </g>
  ) : (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9">
      <path className="si-main" d="M6 5.5v15h15" />
      <path className="si-accent" d="M8.5 16.5l3.5-4 3 2.5 4.5-6M16.5 9h3v3" />
    </g>
  )
}

export function SiteIcon({ site, size }: { site: Site; size: number }) {
  return (
    <svg className="site-icon" width={size} height={size} viewBox="0 0 26 26" aria-hidden="true">
      <SiteIconPaths site={site} />
    </svg>
  )
}
