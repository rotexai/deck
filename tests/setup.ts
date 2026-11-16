import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

/** Tests flip this to emulate prefers-reduced-motion. */
export const media = { reduced: false }

beforeEach(() => {
  media.reduced = false
  window.matchMedia = vi.fn((query: string) => ({
    matches: query.includes('reduce') ? media.reduced : false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
  // jsdom does not implement media playback.
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(() => Promise.resolve())
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  window.history.replaceState(null, '', '/')
})
