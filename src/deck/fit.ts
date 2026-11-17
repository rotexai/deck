/** The stage is a fixed 1920×1080, zoomed to fit (R2). */
export const W = 1920
export const H = 1080

/** The script sidebar (spec 261117 R19, R24): clamp(320px, 26vw, 460px) on the right, or a bottom sheet of half
 *  the height below 900px. deck.css uses the same numbers; the stage fits the space that is left. */
export const SHEET_BELOW = 900
export function scriptWidth(vw: number): number {
  return Math.min(460, Math.max(320, vw * 0.26))
}

export function fit(vw: number, vh: number, script: boolean): number {
  const w = script && vw >= SHEET_BELOW ? vw - scriptWidth(vw) : vw
  const h = script && vw < SHEET_BELOW ? vh / 2 : vh
  return Math.min(w / W, h / H)
}
