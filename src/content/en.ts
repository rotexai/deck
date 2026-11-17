// All deck copy (R8), keyed by slide. vi.ts mirrors this shape (type Content in types.ts).
// Conventions: *phrase* in a headline is the key phrase (blue on paper, violet on ink, R10);
// [text] is a placeholder slot for a fact not supplied yet (R30) and always renders as a dashed slot.
// Every slide names its source on the source line (R29). Numbers match wiki "261116 - market research".

export const en = {
  deck: {
    title: 'RotexAI pitch deck · Software that fits each shop',
    of: '/',
    // Number format for figures, and the slide label read by screen readers ({n} and {total} are filled in).
    locale: 'en-US',
    slideLabel: 'Slide {n} of {total}',
    // The language button (top right) names the language it switches to.
    switchTo: 'Switch to Vietnamese',
    // Narrated investor view (spec 261117): play button, script sidebar, AI-voice disclosure.
    narrator: {
      listen: 'Listen · about {min} min',
      play: 'Play the AI-voiced pitch',
      resume: 'Resume the AI-voiced pitch',
      pause: 'Pause the narration',
      replay: 'Replay the AI-voiced pitch from the start',
      script: 'Script',
      showScript: 'Show the script',
      hideScript: 'Hide the script',
      aiVoice: 'Narrated by an AI voice',
      close: 'Close the script',
      coach: 'Listen to the {min}-minute pitch in an AI voice, or open the Script to read along.',
    },
  },

  title: {
    wordmark: { a: 'Rotex', b: 'AI' },
    kicker: 'Investor brief · Pre-seed · 2026',
    headline: 'Software that *fits* each shop.',
    body: 'Describe the shop in plain words. RotexAI builds its app, and changes it when the shop changes.',
    // QR codes on the right of the title slide, product first then investors: `title` is the coloured band,
    // `cta` the line under the code, `text` the address.
    scan: {
      label: 'Scan to visit',
      links: [
        { href: 'https://www.rotexai.com', title: 'Product', cta: 'Try the product', text: 'rotexai.com' },
        { href: 'https://investor.rotexai.com', title: 'Investors', cta: 'For investors', text: 'investor.rotexai.com' },
      ],
    },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'This is RotexAI: software that fits each shop. A shop owner describes how the shop works, in plain words. RotexAI builds the app, and changes it when the shop changes. You are hearing an AI voice; the Script button at the top shows every word.',
    ],
    source: 'investor.rotexai.com',
  },

  shop: {
    kicker: 'The shop',
    headline: 'Small shops run on phones, chat and memory.',
    quote:
      '“We’re a bakery with two shops. Every evening, staff count the stock on their phones. When flour or butter runs low, they ask for a restock, and the manager approves it.”',
    clockLabel: 'Tonight',
    // One time per step: the clock ticks from 18:00 to 21:30 as the receipt prints (illustrative).
    clock: ['18:00', '18:40', '19:20', '20:10', '20:50', '21:30'],
    receipt: {
      head: ['EVENING ROUTINE', '2 SHOPS'],
      lines: [
        ['Shop 1 · count stock', 'phone'],
        ['Shop 2 · count stock', 'phone'],
        ['Flour low → ask', 'chat'],
        ['Butter low → ask', 'chat'],
        ['Manager approves', 'memory'],
      ],
      total: ['STEPS LINKED', '0'],
      note: 'Every night, by hand. Nothing carries over to tomorrow.',
    },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Small shops run on phones, chat and memory. Take a bakery with two shops. Every evening, staff in the first shop count the stock on a phone.',
      'The second shop does the same, on another phone.',
      'When flour runs low, someone asks for a restock in a chat.',
      'Butter runs low: another message.',
      'Then the manager approves, from memory.',
      'Five steps, and none of them linked. It happens by hand every night, and nothing carries over to tomorrow.',
    ],
    source: 'Scenario from the RotexAI product walkthrough (illustrative)',
  },

  problem: {
    kicker: 'The problem',
    headline: 'Packaged ERP fails small firms on *fit*.',
    chartLabel: 'What 9 SMEs rated most important in their ERP project (points, max 36)',
    max: 36,
    // Leyh (2014) Table 2, top 7. `fit` marks the row that moves from 9th (literature) to 3rd (SMEs).
    bars: [
      { label: 'User training', value: 33 },
      { label: 'ERP system tests', value: 32 },
      { label: 'Organisational fit', value: 31, fit: true },
      { label: 'Clear goals', value: 30 },
      { label: 'ERP configuration', value: 28 },
      { label: 'Top management', value: 27 },
      { label: 'Team leadership', value: 26 },
    ],
    chip: { from: '9th in 320 papers', to: '3rd for SMEs' },
    cards: [
      { title: 'Misfit is a key cause of ERP failure', body: 'The system’s built-in processes don’t match how the firm works.' },
      { title: 'Making it fit costs the most', body: 'Vendor costs, customisation included, rank highest of 10 cost factors.' },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Packaged ERP does not solve this, because it fails small firms on fit. In one study, nine SMEs rated what mattered most in their ERP project.',
      'Organisational fit ranks ninth across 320 research papers, but third for the SMEs themselves.',
      'Misfit is a key cause of ERP failure: the system’s built-in processes do not match how the firm works. And vendor costs, customisation included, rank highest of ten cost factors.',
    ],
    source:
      'Leyh (2014), FedCSIS, Table 2 and Fig. 1 · Jegorova & Grabis (2025), CSIMQ · Haddara & Elragal (2013), IJISPM, Table 2',
  },

  market: {
    kicker: 'The market',
    headline: 'Most SMEs already use software. Few run the business on it.',
    dots: { total: 817, columns: 43, rows: 19, paying: 718, erp: 122 },
    steps: [
      { figure: 817000, tone: 'ink', caption: 'SMEs in Vietnam, 2024. 93.6% are micro or small.' },
      { figure: 718000, tone: 'blue', caption: 'already use accounting software (88% of surveyed firms).' },
      { figure: 122000, tone: 'warn', caption: 'run an ERP for the rest of the business (15%). The other 596,000 are our opening.' },
    ],
    aside: 'Beside them: 5.17 million individual business establishments, not shown.',
    gridLabel: 'Dot grid of 817 dots, one per 1,000 SMEs: {figure} highlighted.',
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Vietnam had about 817,000 SMEs in 2024. 93.6 percent of them are micro or small.',
      'By our estimate, 718,000 already use accounting software: 88 percent of surveyed firms.',
      'But only about 122,000 run an ERP for the rest of the business. The other 596,000 are our opening. And beside them sit 5.17 million individual business establishments, not counted here.',
    ],
    source:
      'One dot = 1,000 SMEs · Statistics Office, White Book 2025 & Statistical Summary 2025 · MOIT E-commerce White Book 2022 (2021 survey: 88% and 15% of surveyed firms) · 718k and 122k are our estimates',
  },

  solution: {
    kicker: 'The solution',
    headline: 'Describe the shop. *Get its app.*',
    says: {
      label: '1 · The owner says',
      text: 'Two bakery shops. Staff count stock every evening. When flour or butter runs low, they ask for a restock and the manager approves.',
    },
    builds: {
      label: '2 · RotexAI builds the workflow',
      nodes: ['Evening stock count', 'Below threshold?', 'Restock request', 'Manager approves'],
    },
    approves: {
      label: '3 · The owner approves each change',
      version: 'v3 · Add butter to the restock list',
      diff: [
        { kind: 'add', text: '+ item: butter' },
        { kind: 'add', text: '+ threshold: set by manager' },
        { kind: 'same', text: '  flour, sugar: unchanged' },
      ],
      button: 'Approve v3',
    },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'So: describe the shop, and get its app. In this simplified scene from the live portal, the owner says it in plain words: two bakery shops, a stock count every evening, a restock request when flour or butter runs low, and the manager approves.',
      'RotexAI turns that into a workflow: the evening stock count, a check against the threshold, a restock request, and the manager’s approval.',
      'Every change is a new version the owner approves. Here, version three adds butter to the restock list.',
    ],
    source: 'Product scene, simplified from the live RotexAI portal',
  },

  demo: {
    kicker: 'Demo',
    headline: 'From plain words to a *working app*.',
    label: 'Simulation: the RotexAI portal rebuilt from its source code, not a screen recording',
    video: { src: '/media/walkthrough.mp4', poster: '/media/walkthrough.jpg', captions: '/media/walkthrough.en.vtt', captionsLabel: 'English' },
    chaptersTitle: 'In the walkthrough',
    chapters: [
      { at: '0:08', text: 'Start a project' },
      { at: '0:20', text: 'Describe how your business works' },
      { at: '0:38', text: 'Check the plan' },
      { at: '0:55', text: 'Build' },
      { at: '1:15', text: 'Use it with your team' },
      { at: '1:33', text: 'Decide who can do what' },
      { at: '1:48', text: 'Change it any time' },
      { at: '2:04', text: 'Or start from the marketplace' },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Here is the walkthrough, from plain words to a working app. It is a simulation: the portal rebuilt from its source code, not a screen recording.',
    ],
    source: 'RotexAI product walkthrough, simulated portal (also on investor.rotexai.com)',
  },

  how: {
    kicker: 'How it works',
    headline: 'Every action is a *workflow* you can inspect.',
    describe: { title: 'The owner describes', body: 'Plain words about how the shop works.' },
    workflows: {
      title: 'Workflows',
      body: 'Each action is a workflow step: who does it, what it checks, what it records. Each change is a new version the owner approves.',
    },
    app: {
      title: 'One project, one app',
      body: 'One app per shop, with many screens. Every read and write goes through a workflow, never straight to the database.',
    },
    mcp: { title: 'Coding agents over MCP', body: 'Agents build and publish apps through the same workflows, with the owner’s confirmation.' },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Under the hood, every action is a workflow you can inspect: who does it, what it checks, and what it records. Each shop gets one app with many screens, and every read and write goes through a workflow, never straight to the database. Coding agents can build and publish apps over MCP, through the same workflows, with the owner’s confirmation.',
    ],
    source: 'Architecture of the live RotexAI platform',
  },

  whyNow: {
    kicker: 'Why now',
    headline: 'Three things changed in *2026*.',
    cards: [
      {
        chip: 'The technology',
        tone: 'violet',
        title: 'AI builds software around each shop',
        body: 'Packaged ERP fails small firms mainly on fit. Software built from the shop’s own description removes the misfit.',
        source: 'Jegorova & Grabis (2025) · Leyh (2014)',
      },
      {
        chip: '16 March 2026',
        tone: 'cyan',
        title: 'The state pays for adoption',
        body: 'At least 300,000 SMEs to adopt digital solutions by 2030, with vouchers and “use first, pay later”.',
        source: 'Decision 433/QĐ-TTg',
      },
      {
        chip: '1 January 2026',
        tone: 'orange',
        title: 'Tax pushes households onto digital books',
        body: 'Lump-sum tax ended. Households above VND 1 billion in revenue must issue e-invoices.',
        source: 'Resolution 198/2025/QH15 · Decree 141/2026',
      },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'Why now? Three things changed in 2026. First, the technology: AI can now build software around each shop, which removes the misfit that sinks packaged ERP.',
      'Second, on 16 March 2026, the state set a goal of at least 300,000 SMEs on digital solutions by 2030, with vouchers and “use first, pay later”.',
      'Third, from 1 January 2026, lump-sum tax ended for households. Those above one billion dong in revenue must issue e-invoices, which pushes them onto digital books.',
    ],
    source: 'Sources on each card',
  },

  competition: {
    kicker: 'Competition',
    headline: 'Nobody else fits Vietnam *and* lets the owner change it.',
    axes: { up: 'Fits Vietnamese business', down: 'Weak fit for Vietnam', left: 'Changes need a partner', right: 'The owner changes it alone' },
    // quadrant: tl, tr, bl, br. RotexAI lands last. Groups and names from wiki Pillar 7 (2026-11-17).
    others: [
      { quadrant: 'tl', name: 'Packaged ERP and sales apps', note: 'Fit Vietnamese tax and e-invoices; a change is a partner project, or not possible', names: 'MISA AMIS · Base.vn · Odoo · KiotViet · Sapo' },
      { quadrant: 'br', name: 'AI app builders and low-code', note: 'The owner can change them, but they know nothing of Vietnamese business', names: 'Lovable · Replit · Airtable · Lark Base' },
    ],
    us: { quadrant: 'tr', name: 'RotexAI', note: 'Fits the shop, and the owner changes it by describing the change' },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'We looked at 38 competitors. Packaged ERP and sales apps, like MISA AMIS, Odoo and KiotViet, fit Vietnamese tax and e-invoices, but every change is a partner project. AI app builders and low-code tools, like Lovable and Airtable, let the owner change the app, but they know nothing of Vietnamese business. And most often, the shop still runs on Excel, Zalo and paper.',
      'Of 26 products we could test, none fits Vietnam and lets the owner make the change alone. That corner is ours: RotexAI fits the shop, and the owner changes it by describing the change.',
    ],
    // No source line on this slide (owner 2026-11-17); the research is wiki Pillar 7.
    source: '',
  },

  business: {
    kicker: 'Business model',
    headline: 'Each shop pays for *its own app*.',
    cards: [
      { title: 'Price per shop', value: '[Price per shop]', body: '[What the plan includes]' },
      { title: 'Billing', value: '[Billing period]', body: 'Plans are billed in the portal; a plan starts once its first invoice is paid.' },
      { title: 'Marketplace templates', value: '[Template revenue share]', body: 'Owners can start from a published project and adapt it.' },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'The model is simple: each shop pays for its own app. Plans are billed in the portal, and a plan starts once its first invoice is paid. Owners can also start from a published project in the marketplace and adapt it.',
    ],
    source: 'Prices and terms are placeholders until they are set',
  },

  traction: {
    kicker: 'Traction',
    headline: 'Live in production *today*.',
    milestones: [
      { date: '[date]', title: 'Portal', body: 'Describe, check the plan, build and run the app' },
      { date: '19 Oct 2026', title: 'Team access', body: 'Read, write, run and delete rights per object' },
      { date: '26 Oct 2026', title: 'Marketplace', body: 'Start from a published project' },
      { date: '14 Nov 2026', title: 'Publish over MCP', body: 'A coding agent publishes an app; the owner confirms' },
    ],
    metrics: [
      { label: 'Shops using it', value: '[numbers]' },
      { label: 'Apps built', value: '[numbers]' },
      { label: 'Monthly revenue', value: '[numbers]' },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'RotexAI is live in production today. In the portal, an owner describes the shop, checks the plan, then builds and runs the app. Team access, with read, write, run and delete rights per object, shipped on 19 October 2026. The marketplace followed on 26 October. And since 14 November, a coding agent can publish an app over MCP, with the owner confirming.',
    ],
    source: 'RotexAI production release log · usage numbers to come',
  },

  team: {
    kicker: 'Team',
    headline: 'Built by a founder who started with *family and friends’ shops*.',
    portrait: { src: '/media/founder.jpg', alt: 'Portrait of qvanle, founder of RotexAI' },
    name: 'qvanle',
    role: 'Founder',
    origin:
      'RotexAI began as a way to take the manual work out of family and friends’ businesses: first understand their work, then let software do it.',
    background: 'Engineer. Builds RotexAI end to end and uses every tool on real work before any customer does.',
    link: { href: 'https://qvanle.rotexai.com', text: 'qvanle.rotexai.com' },
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'RotexAI is built by its founder. It began as a way to take the manual work out of family and friends’ businesses: first understand their work, then let software do it. The founder is an engineer who builds RotexAI end to end, and uses every tool on real work before any customer does.',
    ],
    source: 'qvanle.rotexai.com',
  },

  ask: {
    kicker: 'The ask · Pre-seed',
    headline: '*150 million VND* buys six months to prove it.',
    barLabel: 'Use of funds: founder runway 60M, first customers 30M, infrastructure 30M, reserve 30M VND',
    totalLabel: 'Total',
    unit: 'M VND',
    // Unit after each use-of-funds amount.
    amountUnit: 'M',
    funds: [
      { amount: 60, label: 'Founder runway, 10M a month' },
      { amount: 30, label: 'First customers' },
      { amount: 30, label: 'Infrastructure, 5M a month' },
      { amount: 30, label: 'Reserve' },
    ],
    milestones: [
      { when: 'BY MONTH 2', what: '[First milestone]' },
      { when: 'BY MONTH 4', what: '[Second milestone]' },
      { when: 'BY MONTH 6', what: '[N paying shops]' },
    ],
    // Narration (spec 261117): one line per step, read by the AI voice and shown in the script sidebar.
    narration: [
      'We are raising 150 million dong: six months to prove it. 60 million is founder runway, at 10 million a month.',
      '30 million goes to the first customers.',
      '30 million covers infrastructure, at 5 million a month.',
      'And 30 million is held in reserve. To talk, write to contact@rotexai.com, or visit investor.rotexai.com. Thank you for listening.',
    ],
    source: 'contact@rotexai.com · investor.rotexai.com',
  },
} as const

