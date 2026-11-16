import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Deck, PrintDeck } from './deck/Deck'
import { LangProvider } from './deck/Lang'
import './styles/tokens.css'
import './styles/deck.css'
import './styles/slides.css'

const print = new URLSearchParams(window.location.search).has('print')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>{print ? <PrintDeck /> : <Deck />}</LangProvider>
  </StrictMode>,
)
