import { useMemo } from 'react'
import { EYES, qrShapes } from './qrShapes'
import { SiteIconPaths, type Site } from './SiteIcon'

/** A branded QR code, styled per site so the two codes on the title slide never look alike:
 *  product = blue round dots, blue corners, a shop in the middle;
 *  investor = ink square dots, orange corners, a rising chart in the middle.
 *  The white card around it supplies the quiet zone. */
export function Qr({ text, size, label, site }: { text: string; size: number; label: string; site: Site }) {
  const { n, dots, hole } = useMemo(() => qrShapes(text), [text])
  const d =
    site === 'product'
      ? dots.map(([x, y]) => `M${x + 0.5} ${y + 0.08}a0.42 0.42 0 1 1 0 0.84a0.42 0.42 0 1 1 0-0.84z`).join('')
      : dots.map(([x, y]) => `M${x + 0.03} ${y + 0.03}h0.94v0.94h-0.94z`).join('')
  const logo = hole.size - 1
  return (
    <svg className={`qr qr-${site}`} width={size} height={size} viewBox={`-1 -1 ${n + 2} ${n + 2}`} role="img" aria-label={label}>
      <path className="q-dot" d={d} />
      {EYES.map((at) => {
        const [x, y] = at(n)
        return (
          <g key={`${x}-${y}`} className="q-eye">
            <rect className="q-ring" x={x + 0.5} y={y + 0.5} width="6" height="6" rx={site === 'product' ? 1.9 : 0.9} strokeWidth="1" />
            <rect className="q-pupil" x={x + 2} y={y + 2} width="3" height="3" rx={site === 'product' ? 0.9 : 0.4} />
          </g>
        )
      })}
      {/* The site icon, 26 units scaled into the hole on a white tile. */}
      <g className="q-icon" transform={`translate(${hole.from + 0.5} ${hole.from + 0.5}) scale(${logo / 26})`}>
        <rect className="q-icon-bg" x="0" y="0" width="26" height="26" rx="7" />
        <SiteIconPaths site={site} />
      </g>
    </svg>
  )
}
