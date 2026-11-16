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
  { id: 'title', theme: 'paper', steps: 1, source: en.title.source, Component: TitleSlide },
  { id: 'shop', theme: 'paper', steps: SHOP_STEPS, source: en.shop.source, Component: ShopSlide },
  { id: 'problem', theme: 'paper', steps: 3, source: en.problem.source, Component: ProblemSlide },
  { id: 'market', theme: 'paper', steps: en.market.steps.length, source: en.market.source, Component: MarketSlide },
  { id: 'solution', theme: 'ink', steps: 3, source: en.solution.source, Component: SolutionSlide },
  { id: 'demo', theme: 'ink', steps: 1, source: en.demo.source, Component: DemoSlide },
  { id: 'how', theme: 'ink', steps: 1, source: en.how.source, Component: HowSlide },
  { id: 'why', theme: 'ink', steps: en.whyNow.cards.length, source: en.whyNow.source, Component: WhyNowSlide },
  { id: 'competition', theme: 'ink', steps: 2, source: en.competition.source, Component: CompetitionSlide },
  { id: 'business', theme: 'ink', steps: 1, source: en.business.source, Component: BusinessSlide },
  { id: 'traction', theme: 'ink', steps: 1, source: en.traction.source, Component: TractionSlide },
  { id: 'team', theme: 'ink', steps: 1, source: en.team.source, Component: TeamSlide },
  { id: 'ask', theme: 'ink', steps: en.ask.funds.length, source: en.ask.source, Component: AskSlide },
]
