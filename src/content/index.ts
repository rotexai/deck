import { createContext, useContext } from 'react'
import { en } from './en'
import type { Content, Lang } from './types'
import { vi } from './vi'

export type { Content, Lang } from './types'

/** Copy per language. Every slide reads its strings through useContent(). */
export const CONTENT: Record<Lang, Content> = { en, vi }

/** `?lang=vi` picks Vietnamese; anything else is English. The query keeps the hash free for the slide number. */
export function langFromSearch(search: string): Lang {
  return new URLSearchParams(search).get('lang') === 'vi' ? 'vi' : 'en'
}

export const other = (lang: Lang): Lang => (lang === 'en' ? 'vi' : 'en')

export interface LangState {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const LangContext = createContext<LangState>({ lang: 'en', setLang: () => {} })

export const useLang = () => useContext(LangContext)
export const useContent = (): Content => CONTENT[useContext(LangContext).lang]
