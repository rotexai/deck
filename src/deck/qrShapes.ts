import QRCode from 'qrcode'

/** Finder corners: top left, top right, bottom left. */
export const EYES = [() => [0, 0], (n: number) => [n - 7, 0], (n: number) => [0, n - 7]] as const

export interface QrShapes {
  /** Modules per side. */
  n: number
  /** Dark data modules to draw as dots (finders and the logo hole left out). */
  dots: [number, number][]
  /** The square cleared for the logo: first module and side, centred. */
  hole: { from: number; size: number }
}

/** The code's modules, split into what we draw ourselves. Level H recovers up to 30%, so the logo hole is safe. */
export function qrShapes(text: string): QrShapes {
  const { modules } = QRCode.create(text, { errorCorrectionLevel: 'H' })
  const n = modules.size
  // An odd-sized hole of about a fifth of the side, centred (well under level H's 30%).
  const size = Math.round(n * 0.22) | 1
  const from = (n - size) / 2
  const inEye = (x: number, y: number) => (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8)
  const inHole = (x: number, y: number) => x >= from && x < from + size && y >= from && y < from + size
  const dots: [number, number][] = []
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) if (modules.data[y * n + x] && !inEye(x, y) && !inHole(x, y)) dots.push([x, y])
  return { n, dots, hole: { from, size } }
}
