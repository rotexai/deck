import { act, fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Deck } from '../src/deck/Deck'

const press = (key: string) => act(() => void fireEvent.keyDown(window, { key }))

describe('R21 demo video', () => {
  it('plays from the start on entering slide 6 and is paused after leaving it', () => {
    window.history.replaceState(null, '', '/#5')
    const { container } = render(<Deck />)
    const play = HTMLMediaElement.prototype.play as unknown as { mock: { contexts: unknown[] } }
    const pause = HTMLMediaElement.prototype.pause as unknown as { mock: { contexts: unknown[] } }
    expect(container.querySelector('video')).toBeNull()

    for (let i = 0; i < 3; i++) press('ArrowRight') // through the Solution steps into slide 6
    const video = container.querySelector('video') as HTMLVideoElement
    expect(video).not.toBeNull()
    expect(video.muted).toBe(true)
    expect(video.querySelector('track[kind="captions"]')).not.toBeNull()
    expect(play.mock.contexts).toContain(video)
    expect(video.currentTime).toBe(0)

    press('ArrowRight') // slide 7: the video's slide leaves
    expect(pause.mock.contexts).toContain(video)
  })
})
