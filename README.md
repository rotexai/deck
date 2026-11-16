# RotexAI pitch deck

A fullscreen React deck for the pre-seed round. Spec: `docs/specs/261116-pitch-deck.md` in the aos workspace.
Design: the "RotexAI pitch deck design" canvas (slides 01-04 on paper, 05-13 on dark ink).

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # tsc + vite build into dist/
npm run lint       # eslint + no colour literals outside src/styles/tokens.css + contrast table (>= 4.5:1)
npm test           # vitest: keys, hash, steps, market dots, demo video, content slots, print
```

## Presenting

| Key | Does |
| --- | --- |
| → , Space, PageDown | Next step, then next slide |
| ← , PageUp | Back one step (played in reverse), then the previous slide at its last step |
| Home / End | First / last slide |

The URL hash is the slide number (`#4`); it updates without adding history entries.
Each slide is authored at 1920×1080 and fitted to the window with CSS `zoom`, letterboxed in its own colour.
`prefers-reduced-motion: reduce` shows every end state with no motion (the demo video then gets controls instead of autoplay).

## Handout PDF

Open `/?print`: every slide at its final step, one per A4 landscape page, dark slides on paper. Print it from the
browser (background graphics on), or headless:

```bash
npm run build && npx vite preview --port 4321 &
chrome --headless=new --print-to-pdf=deck.pdf --no-pdf-header-footer --virtual-time-budget=8000 "http://localhost:4321/?print"
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/en.ts` | All copy, keyed by slide. `*phrase*` = key phrase; `[text]` = placeholder slot for a missing fact |
| `src/slides/` | One component per slide; `index.ts` is the deck order, theme and step count |
| `src/deck/` | Engine: `Deck.tsx` (keys, hash, fit, print), `nav.ts`, `motion.ts` (reduced motion, count-up, typing), `Text.tsx` |
| `src/styles/tokens.css` | The only file allowed to hold colour values |
| `public/media/` | Walkthrough video, poster and captions (from web/investor), founder portrait (from web/qvanle) |

Placeholders still to fill: pricing, billing period, template revenue share, portal launch date, usage numbers,
the three milestones on The ask, and competitor names (categories only until approved).
