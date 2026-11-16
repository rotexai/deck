import type { FC } from 'react'
import type { Content } from '../content/types'

export type Theme = 'paper' | 'ink'
/** How the slide was entered: by stepping forward, stepping back, or a jump (hash, Home, End, load). */
export type Enter = 'next' | 'prev' | 'jump'

export interface SlideProps {
  /** Current step, 0-based, below `steps`. */
  step: number
  /** False while the slide is leaving (or printed). */
  active: boolean
  /** Print or reduced motion: show end states, run no JS animation. */
  still: boolean
  /** The ?print handout (R5). */
  print: boolean
  enter: Enter
}

export interface SlideDef {
  id: string
  theme: Theme
  steps: number
  /** The copy block whose `source` fills the slide's source line (R29). */
  copy: Exclude<keyof Content, 'deck'>
  Component: FC<SlideProps>
}
