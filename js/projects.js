/* ==========================================================================
   PROJECTS DATA — edit this file to add / change cards.

   Each project = one card on the front page.
   

   id          Name of the page: projects/<id>.html
   cover       Image shown on the card. Put the file at exactly this path; until it
               exists, a labeled placeholder is shown.
   coverHover  (optional) GIF that plays when hovering the card.
   tags        Chips on the card + filter buttons. Keep the wording consistent across cards.
   metric      (optional) Key result(s): a string, or an array for several pills. Omit to hide the block.
   banner      (optional) Looping MP4 shown on the card instead of the still cover. Convert GIFs to MP4.
   bullets     Up to two lines per card: a bold label + one sentence (text may be empty).
   detailReady Set to true once projects/<id>.html exists (build it with tools/encrypt.html).
   locked      true = shows a lock badge on the card (the page itself must be built locked).
   ========================================================================== */

window.PROJECTS = [
  {
    id: "buraco-jogatina",
    title: "Buraco Jogatina",
    studio: "Gazeus Games",
    role: "Senior Game Designer",
    platform: "Mobile",
    tags: ["Gameplay", "Live Ops", "Monetization", "Data"],
    metric: ["ARPDAU: +22.2% (2023) and +6.3% (2024)", "Active Subscribers: +9.8% (2023) and +5.6% (2024)"],
    bullets: [
      { label: "Game Economy", text: "Diversified the economy from an interstitial-only model to one with rewarded videos (RVs) and IAP, without alienating the loyal community of a game with 10M+ downloads." },
      { label: "Feature Design", text: "Designed a new game mode built on cyclical seasons that drove monetization results without relying on a content treadmill." }
    ],
    cover: "assets/images/buraco-jogatina/cover.jpg",      // 1280×548 (21:9)
    banner: "assets/banners/buraco-jogatina.mp4",
    detailReady: true,
    locked: false
  },
  {
    id: "unreleased-cozy-multiplayer",
    title: "Unreleased Online Multiplayer Cozy Game",
    studio: "Fortis Games",
    role: "Senior Game Designer",
    platform: "Mobile",
    tags: ["Gameplay", "Monetization", "Data"],
    metric: ["Led the design of several features of a large-scale online multiplayer game", "Each feature was developed in a rotating pod where I was the designer"],
    bullets: [
      { label: "Gameplay Design", text: "Ran several playtest experiments and iterations to refine the core gameplay." },
      { label: "Monetization", text: "Progression system with deep mechanics, designed around content-treadmill constraints." }
    ],
    cover: "assets/images/unreleased-cozy-multiplayer/cover.jpg",      // 1280×548 (21:9)
    banner: "assets/banners/cozy-game.mp4",
    detailReady: true,
    locked: false
  },
  {
    id: "satellite-rush",
    title: "Satellite Rush",
    studio: "Kimeric Labs",
    role: "Game Designer",
    platform: "PC",
    tags: ["Gameplay", "UI/UX"],
    metric: ["Publishing deal with Plug In Digital and local funding from the State of Rio de Janeiro"],
    bullets: [
      { label: "Original Design", text: "A fresh concept built through diligent playtesting and iteration." },
      { label: "Studio Co-founder", text: "Co-founded the studio and shared its leadership, covering game design, UX/UI and much of the project management through to a published release." }
    ],
    cover: "assets/images/satellite-rush/cover.jpg",      // 1280×548 (21:9)
    banner: "assets/banners/satellite-rush.mp4",
    detailReady: true,
    locked: false
  },
  {
    id: "lets-zeppelin",
    title: "Let’s Zeppelin",
    studio: "Gazeus Games",
    role: "Game Designer",
    platform: "Mobile",
    tags: ["Gameplay", "Live Ops", "Monetization", "Data"],
    metric: ["Top 25% D1 retention in the market (2019)", "Solid results for store rating, session time and D28 retention"],
    bullets: [
      { label: "Original Design", text: "A fresh concept, from pen-and-paper prototypes to a launched product." },
      { label: "Modular Development", text: "Gameplay abilities built from rearrangeable modules, allowing a wide variety of designs to be created quickly." }
    ],
    cover: "assets/images/lets-zeppelin/cover.jpg",      // 1280×548 (21:9)
    banner: "assets/banners/lets-zeppelin.mp4",           // looping clip shown on the card (replaces the still)
    detailReady: true,
    locked: false
  },
  {
    id: "fashion-match",
    title: "Fashion Match",
    studio: "Gazeus Games",
    role: "Senior Game Designer",
    platform: "Mobile",
    tags: ["Gameplay", "Monetization", "Data"],
    metric: ["Validated an internal development pipeline for testing new projects"],
    bullets: [
      { label: "Core Loop built from market data", text: "Monetization systems built on in-depth market research and 2022 trends." },
      { label: "Design Tools", text: "Content created with tools I designed." }
    ],
    cover: "assets/images/fashion-match/cover.jpg",      // 1280×548 (21:9)
    banner: "assets/banners/fashion-match.mp4",
    detailReady: true,
    locked: false
  },
  {
    id: "unreleased-roguelike",
    title: "Unreleased Action Roguelike Brick-breaker",
    studio: "Fortis Games",
    role: "Senior Game Designer",
    platform: "Mobile",
    tags: ["Gameplay", "Monetization", "Data"],
    metric: ["One of the top-rated prototypes of the studio’s internal incubator", "Strong results in a playtest with real players; next version in development when the studio closed"],
    bullets: [
      { label: "Gameplay Design", text: "A fresh take on a popular genre." },
      { label: "Monetization", text: "Adapted the progression system of a premium reference title to the F2P market." },
      { label: "Agentic AI Development", text: "Designed and implemented major systems using AI." }
    ],
    cover: "assets/images/unreleased-roguelike/cover.jpg",      // 1280×548 (21:9)
    banner: "assets/banners/brick-breaker.mp4",
    detailReady: true,
    locked: false
  },
  {
    id: "yatzy-party",
    title: "Yatzy Party",
    studio: "Gazeus Games",
    role: "Game Designer",
    platform: "Facebook Instant Games",
    tags: ["Gameplay", "Data"],
    metric: ["A single-player bot that successfully introduced players to the game and prepared them for multiplayer matches"],
    bullets: [
      { label: "Bot Design", text: "An in-depth study of Yahtzee gameplay strategies and its adaptation into bot behavior." }
    ],
    cover: "assets/images/yatzy-party/cover.jpg",      // 1280×548 (21:9)
    banner: "assets/banners/yatzy-party.mp4",
    detailReady: true,
    locked: false
  },
  {
    id: "bushido-saga",
    title: "Bushido Saga",
    studio: "Pandora Game Studio",
    role: "Game Designer",
    platform: "Mobile",
    tags: ["Gameplay", "Data"],
    metric: ["Changed the level design approach, boosting Retention and Session Time"],
    bullets: [
      { label: "Level Design", text: "Changed the previous level design approach, from large explorable areas to linear action-packed segments with a few branches, and goals that encouraged replaying." }
    ],
    cover: "assets/images/bushido-saga/cover.jpg",      // 1280×548 (21:9)
    banner: "assets/banners/bushido-saga.mp4",
    detailReady: true,
    locked: false
  }
];
