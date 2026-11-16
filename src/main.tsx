import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { en } from './content/en'
import { Deck, PrintDeck } from './deck/Deck'
import './styles/tokens.css'
import './styles/deck.css'
import './styles/slides.css'

const print = new URLSearchParams(window.location.search).has('print')
document.title = en.deck.title

createRoot(document.getElementById('root')!).render(<StrictMode>{print ? <PrintDeck /> : <Deck />}</StrictMode>)
