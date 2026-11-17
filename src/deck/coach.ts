import { useCallback, useEffect, useRef, useState } from 'react'

// First-visit coach mark (owner 2026-11-17): new viewers did not notice Listen and Script. Remembered per browser.
const COACH_KEY = 'rx-deck-coach'
const COACH_IN_MS = 900
const COACH_OUT_MS = 9900
const coachSeen = () => {
  try {
    return window.localStorage.getItem(COACH_KEY) === '1'
  } catch {
    return false
  }
}
const rememberCoach = () => {
  try {
    window.localStorage.setItem(COACH_KEY, '1')
  } catch {
    /* private mode: the tip may show again next time */
  }
}

/** Shows the coach mark once, after the first slide lands; hides it after about 9 s, on any key or pointer press,
 *  or as soon as the narration or the script is used (`blocked`). */
export function useCoach(blocked: boolean): boolean {
  const [show, setShow] = useState(false)
  const done = useRef(coachSeen())
  const dismiss = useCallback(() => {
    if (done.current) return
    done.current = true
    rememberCoach()
    setShow(false)
  }, [])
  useEffect(() => {
    if (done.current) return
    if (blocked) return dismiss()
    const on = setTimeout(() => setShow(true), COACH_IN_MS)
    const off = setTimeout(dismiss, COACH_OUT_MS)
    window.addEventListener('keydown', dismiss)
    window.addEventListener('pointerdown', dismiss)
    return () => {
      clearTimeout(on)
      clearTimeout(off)
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('pointerdown', dismiss)
    }
  }, [blocked, dismiss])
  return show
}
