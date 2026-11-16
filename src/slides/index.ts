import { en } from '../content/en'
import type { SlideDef } from '../deck/types'
import { AskSlide } from './Ask'
import { BusinessSlide } from './Business'
import { CompetitionSlide } from './Competition'
import { DemoSlide } from './Demo'
import { HowSlide } from './How'
import { MarketSlide } from './Market'
import { ProblemSlide } from './Problem'
import { SHOP_STEPS, ShopSlide } from './Shop'
import { SolutionSlide } from './Solution'
import { TeamSlide } from './Team'
import { TitleSlide } from './Title'
import { TractionSlide } from './Traction'
import { WhyNowSlide } from './WhyNow'

/** Deck order. Slides 1-4 on paper, 5-13 on ink (R11). */
export const SLIDES: SlideDef[] = [
  { id: 'title', theme: 'paper', steps: 1, copy: 'title', Component: TitleSlide },
  { id: 'shop', theme: 'paper', steps: SHOP_STEPS, copy: 'shop', Component: ShopSlide },
  { id: 'problem', theme: 'paper', steps: 3, copy: 'problem', Component: ProblemSlide },
  { id: 'market', theme: 'paper', steps: en.market.steps.length, copy: 'market', Component: MarketSlide },
  { id: 'solution', theme: 'ink', steps: 3, copy: 'solution', Component: SolutionSlide },
  { id: 'demo', theme: 'ink', steps: 1, copy: 'demo', Component: DemoSlide },
  { id: 'how', theme: 'ink', steps: 1, copy: 'how', Component: HowSlide },
  { id: 'why', theme: 'ink', steps: en.whyNow.cards.length, copy: 'whyNow', Component: WhyNowSlide },
  { id: 'competition', theme: 'ink', steps: 2, copy: 'competition', Component: CompetitionSlide },
  { id: 'business', theme: 'ink', steps: 1, copy: 'business', Component: BusinessSlide },
  { id: 'traction', theme: 'ink', steps: 1, copy: 'traction', Component: TractionSlide },
  { id: 'team', theme: 'ink', steps: 1, copy: 'team', Component: TeamSlide },
  { id: 'ask', theme: 'ink', steps: en.ask.funds.length, copy: 'ask', Component: AskSlide },
]
