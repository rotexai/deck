import type { en } from './en'

/** The shape of en with its literal strings and numbers widened, so another language can fill it in.
 *  Tuples keep their length, so every language has the same bars, steps and cards. */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : { readonly [K in keyof T]: Widen<T[K]> }

export type Content = Widen<typeof en>
export type Lang = 'en' | 'vi'
