// ============================================================
// SINGLE SOURCE OF TRUTH — all copy, links, project data
// ============================================================

export type AccentVar =
  | "--amber"
  | "--coral"
  | "--mint"
  | "--indigo"
  | "--cyan";

export const personal = {
  name: "Shubh Garg",
  siteUrl: "https://bitwise-rouge.vercel.app",
  alias: "Bitwise",
  handle: "shubh-garg18",
  tagline: "Backend and C++ systems, plus computer vision and ML. IIT Roorkee '27.",
  email: "shubh18garg82@gmail.com",
  github: "https://github.com/shubh-garg18",
  linkedin: "https://linkedin.com/in/shubh--garg",
  codeforces: "https://codeforces.com/profile/Bitwise_Garg",
  codeforcesHandle: "Bitwise_Garg",
  leetcode: "https://leetcode.com/Bitwise_Garg",
  leetcodeHandle: "Bitwise_Garg",
  leetcodeRating: 1947,
  codeforcesRating: 1657, // static fallback when the live CF fetch fails
  firstDeploy: "2026-06-24", // first commit — drives the neofetch uptime row
  resumePdf: "/Shubh_Garg_Resume.pdf",
  avatar: "https://avatars.githubusercontent.com/u/149188565?v=4",
} as const;

// Hero typing taglines (rotate)
export const heroTaglines = [
  "a matching engine that clears 2.1M orders a second",
  "a Redis-compatible store, from raw sockets up",
  "store CCTV turned into footfall numbers",
] as const;

export const about = {
  body: `I'm in my final year at IIT Roorkee, and I like the parts of a system you only notice when they break: the matching loop, the cache, the audit log.

I learn by building things from scratch. I wrote an order matching engine and a Redis-compatible store in C++ to find out how they really work. At AutoCash.ai I worked on the backend of a finance product, mostly the audit trail that records who changed what.

Lately I've been doing more computer vision and ML: turning a store's CCTV into footfall and queue numbers, and predicting which credit card customers will default. I'd rather show a number I can defend than one that just looks good.`,
  facts: [
    { k: "location", v: "Roorkee, India" },
    { k: "school", v: "IIT Roorkee · '27" },
    { k: "interned", v: "AutoCash.ai · Jan–Aug 2026" },
    { k: "focus", v: "Backend infra · CV · ML" },
  ],
} as const;

export type Stat = { label: string; value: string };

// Tabs in the projects section, in display order. The first is the default.
export const projectGroups = ["Featured", "Hackathons", "Vibe coded"] as const;
export type ProjectGroup = (typeof projectGroups)[number];

// Every card has the same parts in the same order, so cards line up in the
// grid. Keep points to about 50 characters (one line on desktop), stat values
// to about 6 characters and stat labels to about 14.
export type Project = {
  id: string;
  name: string;
  subtitle: string;
  lang: "C++" | "Python" | "TypeScript";
  accent: AccentVar;
  /** Left out for a private repo; the card then says so instead of linking. */
  github?: string;
  /**
   * One line shown above the points, only in the tabs named here (e.g. the
   * event and date in Hackathons). Featured cards carry none.
   */
  context?: Partial<Record<ProjectGroup, string>>;
  /** Shows a trophy on the context line. */
  won?: boolean;
  points: [string, string, string];
  stats: [Stat, Stat, Stat];
  /** Four at most, so they stay on one row. */
  tags: string[];
  groups: ProjectGroup[];
};

export const projects: Project[] = [
  {
    id: "tradeforge",
    name: "TradeForge",
    subtitle: "Order matching engine",
    lang: "C++",
    accent: "--coral",
    github: "https://github.com/shubh-garg18/TradeForge",
    points: [
      "Matches by price first, then by arrival time",
      "Cancels any order in O(1) through an ID index",
      "Maker-taker fees, tiered by trading volume",
    ],
    stats: [
      { value: "2.1M", label: "orders / sec" },
      { value: "2.3µs", label: "p99 latency" },
      { value: "6", label: "order types" },
    ],
    tags: ["C++", "CMake", "Low latency", "Order book"],
    groups: ["Featured"],
  },
  {
    id: "cachemeifucan",
    name: "CacheMeIfYouCan",
    subtitle: "Redis-compatible key-value store",
    lang: "C++",
    accent: "--indigo",
    github: "https://github.com/shubh-garg18/CacheMeIfYouCan",
    points: [
      "Speaks the Redis protocol, so redis-cli just works",
      "Transactions abort if a watched key changes",
      "Replicas get a snapshot, then every later write",
    ],
    stats: [
      { value: "225k", label: "ops/s pipelined" },
      { value: "~50", label: "test checks" },
      { value: "0", label: "outside libs" },
    ],
    tags: ["C++", "Sockets", "RESP", "Replication"],
    groups: ["Featured"],
  },
  {
    id: "offline-store-analytics",
    name: "Offline Store Analytics",
    subtitle: "Store CCTV to retail metrics",
    lang: "Python",
    accent: "--mint",
    github: "https://github.com/shubh-garg18/offline-store-analytics",
    context: { Hackathons: "Purplle Tech Challenge · Jun 2026" },
    points: [
      "Tracks shoppers on four ceiling-camera feeds",
      "Tells staff from shoppers with CLIP embeddings",
      "Every metric is a SQL query, served by FastAPI",
    ],
    stats: [
      { value: "0.87", label: "person recall" },
      { value: "0", label: "false entries" },
      { value: "38%", label: "revenue 6–8pm" },
    ],
    tags: ["Python", "YOLO11", "CLIP", "FastAPI"],
    groups: ["Featured", "Hackathons"],
  },
  {
    id: "credit-card-analysis",
    name: "CreditCardAnalysis",
    subtitle: "Credit card default model",
    lang: "Python",
    accent: "--amber",
    github: "https://github.com/shubh-garg18/CreditCardAnalysis",
    points: [
      "Predicts next-month default for 30K customers",
      "Five model families; tuned gradient boosting won",
      "Of the riskiest 20% it flags, 57% do default",
    ],
    stats: [
      { value: "0.78", label: "test roc-auc" },
      { value: "2.6×", label: "lift, top 20%" },
      { value: "+0.046", label: "auc, encoding" },
    ],
    tags: ["Python", "scikit-learn", "SHAP", "Finance"],
    groups: ["Featured"],
  },
  {
    id: "roadcents",
    name: "RoadCents",
    subtitle: "Cheapest-fuel route planner API",
    lang: "Python",
    accent: "--cyan",
    github: "https://github.com/shubh-garg18/roadcents",
    context: { Hackathons: "1st place · Spotter AI Hackathon · Jul 2026" },
    won: true,
    points: [
      "Plans the cheapest fuel stops, not the fewest",
      "Checked against an exact dynamic-programming oracle",
      "One routing call per request, and it proves it",
    ],
    stats: [
      { value: "110", label: "tests passing" },
      { value: "6,738", label: "stations" },
      { value: "≤1", label: "routing call" },
    ],
    tags: ["Python", "Django", "DRF", "Geospatial"],
    groups: ["Hackathons"],
  },
  {
    id: "passbook",
    name: "passbook",
    subtitle: "Offline bank-statement ledger",
    lang: "Python",
    accent: "--mint",
    context: { "Vibe coded": "Claude Code typed; I specified and reviewed" },
    points: [
      "Reads Canara, SBI and Union Bank PDF statements",
      "Refunds and self-transfers don't count as spending",
      "Money is never a float, not even in the database",
    ],
    stats: [
      { value: "36", label: "test files" },
      { value: "3", label: "banks" },
      { value: "0", label: "uploads" },
    ],
    tags: ["Python", "Flask", "PostgreSQL", "Docker"],
    groups: ["Vibe coded"],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "AutoCash.ai",
    role: "Software Development Engineer Intern",
    period: "Jan 2026 – Aug 2026",
    bullets: [
      "Extended the FastAPI and SQLAlchemy audit trail so every change in a financial workflow records who made it, when, and what changed. Rolled it out across 11 routers and 11 models.",
      "Wrote Windmill scripts that turn a client's lockbox and settlement files on S3 into invoice and payment rows.",
      "Built per-user display settings: how amounts and dates are formatted, and how signed amounts are shown.",
    ],
    tags: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Windmill"],
  },
];

export type SkillCategory = { label: string; items: string[] };

export const skills: SkillCategory[] = [
  { label: "Languages", items: ["C++", "Python", "SQL"] },
  {
    label: "Systems",
    items: [
      "Multithreading",
      "TCP Sockets",
      "RESP Protocol",
      "Replication",
      "Low-Latency Design",
    ],
  },
  {
    label: "Machine Learning",
    items: [
      "scikit-learn",
      "LightGBM",
      "Gradient Boosting",
      "SHAP",
      "Imbalanced Classification",
    ],
  },
  {
    label: "Computer Vision",
    items: ["YOLO11", "ByteTrack", "CLIP", "OpenCV"],
  },
  { label: "Data", items: ["PostgreSQL", "SQLite", "Redis"] },
  {
    label: "Backend & Tools",
    items: ["FastAPI", "SQLAlchemy", "Docker", "CMake"],
  },
];

// language → accent var, used for color-coded pills
export const langAccent: Record<string, AccentVar> = {
  "C++": "--coral",
  TypeScript: "--indigo",
  Python: "--mint",
};

// per-category accent for the skills grid headers
export const categoryAccent: Record<string, AccentVar> = {
  Languages: "--amber",
  Systems: "--cyan",
  "Machine Learning": "--indigo",
  "Computer Vision": "--coral",
  Data: "--mint",
  "Backend & Tools": "--amber",
};

// neovim-style statusline / system identity
export const system = {
  user: "bitwise",
  host: "arch",
  cwd: "~/portfolio",
  branch: "main",
  encoding: "utf-8",
  filetype: "tsx",
} as const;

// neofetch-style profile card (about section). Color = key accent.
export const profile: { k: string; v: string; c: AccentVar }[] = [
  { k: "os", v: "Arch Linux · x86_64", c: "--cyan" },
  { k: "host", v: "IIT Roorkee · '27", c: "--indigo" },
  { k: "role", v: "Backend · Low-latency", c: "--amber" },
  { k: "editor", v: "neovim", c: "--mint" },
  { k: "mux", v: "tmux + i3", c: "--mint" },
  { k: "langs", v: "C++ · Python · SQL", c: "--coral" },
  { k: "intern", v: "AutoCash.ai · 2026", c: "--amber" },
  { k: "focus", v: "backend · CV · ML", c: "--indigo" },
];


export type Achievement = {
  /** Emoji shown as the card glyph. */
  icon: string;
  title: string;
  detail: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    icon: "🏆",
    title: "Top 50 · InMobi Codies 2026",
    detail: "Jun 2026 · top 50 out of 1,000+ people in a national coding contest",
  },
  {
    icon: "🥇",
    title: "1st Place · Spotter AI Hackathon",
    detail:
      "Jul 2026 · first of all remote entries, for RoadCents, a cheapest-fuel route planner",
    link: "https://github.com/shubh-garg18/roadcents",
  },
  {
    icon: "⚡",
    title: `Codeforces ${personal.codeforcesRating}`,
    detail: `Expert · ${personal.codeforcesHandle}`,
    link: personal.codeforces,
  },
  {
    icon: "🧩",
    title: `LeetCode ${personal.leetcodeRating}`,
    detail: `Knight · ${personal.leetcodeHandle}`,
    link: personal.leetcode,
  },
];

export const nav = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "stats", label: "stats" },
  { id: "achievements", label: "awards" },
  { id: "contact", label: "contact" },
] as const;

// colorschemes — each maps to a [data-theme] token block in globals.css.
// First entry is the dark default, second the light default.
export const themes = [
  "workstation",
  "paper",
  "gruvbox",
  "catppuccin",
  "nord",
  "rose-pine",
  "tokyonight",
  "kanagawa",
  "everforest",
] as const;
export type ThemeName = (typeof themes)[number];
