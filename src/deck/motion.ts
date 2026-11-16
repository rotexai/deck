import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

const REDUCED = '(prefers-reduced-motion: reduce)'

function subscribe(cb: () => void) {
  if (typeof window.matchMedia !== 'function') return () => {}
  const mq = window.matchMedia(REDUCED)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(REDUCED).matches
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => false)
}

export const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3)

/** Value of a count from `from` to `to` at progress p in [0, 1]. Lands exactly on `to` at p = 1 (R15). */
export function countAt(from: number, to: number, p: number): number {
  if (p >= 1) return to
  return Math.round(from + (to - from) * easeOutCubic(Math.max(0, p)))
}

/** Counts to `target` over `ms`, from wherever it was. `still` shows the target at once. */
export function useCountUp(target: number, still: boolean, ms = 900, startFrom = 0): number {
  const [shown, setShown] = useState(still ? target : startFrom)
  const shownRef = useRef(shown)
  useEffect(() => {
    if (still) return
    const from = shownRef.current
    if (from === target) return
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const v = countAt(from, target, (t - t0) / ms)
      shownRef.current = v
      setShown(v)
      if (v !== target) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, still, ms])
  return still ? target : shown
}

/** Types `text` out one character at a time; `still` or `startFull` shows all of it. */
export function useTyped(text: string, still: boolean, startFull: boolean, msPerChar = 24, delay = 0): string {
  const [n, setN] = useState(startFull ? text.length : 0)
  useEffect(() => {
    if (still || n >= text.length) return
    const id = window.setTimeout(() => setN((c) => Math.min(text.length, c + 1)), n === 0 ? delay : msPerChar)
    return () => window.clearTimeout(id)
  }, [n, still, text, msPerChar, delay])
  return still ? text : text.slice(0, n)
}
