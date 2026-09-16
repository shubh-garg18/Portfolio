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
  tagline: "Backend engineer. Infrastructure & AI systems. IIT Roorkee '27.",
  email: "shubh18garg82@gmail.com",
  phone: "+91 9719878921",
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
  "Building systems that match 2.1M orders/sec",
  "Redis-compatible from raw TCP up",
  "Agentic AI frameworks from scratch",
] as const;

export const about = {
  body: `I build things close to the metal — matching engines, in-memory stores, audit systems. Currently interning at AutoCash.ai on backend infrastructure.

Also reach for Django for API-shaped problems — RoadCents solves the gas-station problem end to end: an exact DP oracle, offline geocoding, and a routing API that proves its own call budget.

IIT Roorkee '27. Most at home in C++ and a Linux terminal, optimizing the path between a request and the metal.

Long-term direction: backend infrastructure and AI engineering.`,
  facts: [
    { k: "location", v: "Roorkee, India" },
    { k: "school", v: "IIT Roorkee · '27" },
    { k: "now", v: "SDE Intern @ AutoCash.ai" },
    { k: "focus", v: "Backend infra · AI systems" },
  ],
} as const;

export type Stat = { label: string; value: string };

export type Project = {
  id: string;
  name: string;
  subtitle: string;
  lang: "C++" | "Python" | "TypeScript";
  accent: AccentVar;
  github: string;
  description: string;
  stats: Stat[];
  tags: string[];
  featured: boolean;
  /** Short award line, shown as a badge on the card. */
  award?: string;
};

export const projects: Project[] = [
  {
    id: "tradeforge",
    name: "TradeForge",
    subtitle: "Order Matching Engine",
    lang: "C++",
    accent: "--coral",
    github: "https://github.com/shubh-garg18/TradeForge",
    description:
      "Price-time priority limit order book. Six order types (LIMIT, MARKET, IOC, FOK, STOP_LOSS, STOP_LIMIT). O(log P) insertion, O(1) intrusive-list FIFO fills, O(1) hash-indexed cancellation.",
    stats: [
      { label: "Throughput", value: "~2.1M orders/sec" },
      { label: "p99 Latency", value: "2.3 µs" },
      { label: "Test assertions", value: "165 / 15 scenarios" },
    ],
    tags: ["C++", "Concurrency", "Low Latency", "Order Book"],
    featured: true,
  },
  {
    id: "cachemeifucan",
    name: "CacheMeIfYouCan",
    subtitle: "Redis-Compatible In-Memory Store",
    lang: "C++",
    accent: "--indigo",
    github: "https://github.com/shubh-garg18/redis-cpp",
    description:
      "Redis RESP wire protocol over raw TCP — redis-cli and standard clients connect unmodified. 39 commands across six data-structure families, queued transactions with optimistic locking, AOF persistence, master-replica replication, and O(1) exact-LRU eviction.",
    stats: [
      { label: "Throughput", value: "~225k ops/sec" },
      { label: "Commands", value: "39 / 6 families" },
      { label: "Concurrency", value: "Thread-per-connection" },
    ],
    tags: ["C++", "TCP", "RESP Protocol", "Redis"],
    featured: true,
  },
  {
    id: "ouroboros-mcp",
    name: "Ouroboros MCP",
    subtitle: "Agentic Loop Framework",
    lang: "Python",
    accent: "--mint",
    github: "https://github.com/shubh-garg18/ouroboros-mcp",
    description:
      "Agent loop with MCP tool-calling, LLM provider abstraction, stdio↔HTTP bridge via FastAPI, and OpenInference/Phoenix observability.",
    stats: [],
    tags: ["Python", "FastAPI", "MCP", "AI Agents", "Observability"],
    featured: true,
  },
  {
    id: "dotslash",
    name: "DotSlash",
    subtitle: "Real-Time Collaborative Code Editor",
    lang: "TypeScript",
    accent: "--indigo",
    github: "https://github.com/shubh-garg18/DotSlash",
    description:
      "Browser-based multi-user editor with live cursors, in-app chat, multi-language execution, AI copilot, and collaborative whiteboard. Stateless relay server, 23-event Socket.io protocol.",
    stats: [],
    tags: ["TypeScript", "React", "Socket.io", "WebSockets"],
    featured: false,
  },
  {
    id: "roadcents",
    name: "RoadCents",
    subtitle: "Cost-Optimal Fuel Routing API",
    lang: "Python",
    accent: "--cyan",
    github: "https://github.com/shubh-garg18/roadcents",
    description:
      "Django + DRF API solving the gas-station problem — the cheapest fuel plan, not the fewest stops — verified against an exact DP oracle. ~6,700 stations geocoded offline and corridor-matched, with at most one external routing call per request.",
    stats: [
      { label: "Tests", value: "110 passing" },
      { label: "Stations indexed", value: "~6,700" },
      { label: "Routing calls", value: "≤1 / request" },
    ],
    tags: ["Python", "Django", "DRF", "Geospatial", "Optimization"],
    featured: true,
    award: "1st place · Spotter AI Hackathon 2026",
  },
  {
    id: "credit-card-analysis",
    name: "CreditCardAnalysis",
    subtitle: "Default Prediction · ML",
    lang: "Python",
    accent: "--amber",
    github: "https://github.com/shubh-garg18/CreditCardAnalysis",
    description:
      "Behaviour score for credit card default prediction using LightGBM with risk-based techniques. ROC-AUC 0.83. Led as Finclub team lead.",
    stats: [{ label: "ROC-AUC", value: "0.83" }],
    tags: ["Python", "LightGBM", "ML", "Finance"],
    featured: false,
  },
];

// ------------------------------------------------------------
// Vibe-coded public project — shipped with an AI agent doing the
// typing. Called what it is; the engineering claims are still
// checkable in the repo.
// ------------------------------------------------------------
export type VibeProject = {
  name: string;
  subtitle: string;
  github: string;
  accent: AccentVar;
  /** What it does, for someone who has never seen it. */
  description: string;
  /** How it was built — the honest part. */
  note: string;
  stats: Stat[];
  tags: string[];
};

export const vibeCoded: VibeProject = {
  name: "passbook",
  subtitle: "Self-Hosted Bank-Statement Ledger",
  github: "https://github.com/shubh-garg18/passbook",
  accent: "--mint",
  description:
    "Turns weekly bank statements into a categorised, self-hosted Firefly III ledger that separates spending from movement — money you shift into your own savings, and refunds coming back, stop counting as money gone. Reads Canara, SBI and Union Bank exports including password-protected PDFs, and you name a payee once for the name to stick on every row before and after. Runs entirely on one machine: no account, no upload, no monthly fee.",
  note:
    "Written with Claude Code doing the typing — specified, reviewed and shipped by me. The constraints are the interesting part: money is never a float anywhere including the database, the same row cannot be stored twice because of the shape of the table rather than a check, and restores are drilled rather than assumed.",
  stats: [
    { label: "Test files", value: "36" },
    { label: "Banks parsed", value: "3" },
    { label: "Stack", value: "Python · TS · PG" },
  ],
  tags: ["Python", "PostgreSQL", "Docker", "TypeScript", "Firefly III"],
};

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
    period: "Jan 2026 – Present",
    bullets: [
      "Extended the FastAPI/SQLAlchemy audit system with INSERT/CREATE logging paths and FK-to-name resolution — per-mutation actor and UTC timestamp in JSONB — and rolled it out across 11 REST routers and 11 data models, covering 31 update and 20 insert call-sites.",
      "Built Windmill scripts that pull PSSI lockbox, invoice, and settlement data from S3 into the database.",
      "Designed and executed GraphQL-to-REST migration: 56 frontend operations (17 queries, 35 mutations), 12 files, +1,852/−1,249 lines.",
      "Implemented multi-select liquidity-pool filtering across 9 backend files spanning chart-aggregation, transaction, and forecast endpoints.",
    ],
    tags: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Windmill", "S3", "GraphQL"],
  },
];

export type SkillCategory = { label: string; items: string[] };

export const skills: SkillCategory[] = [
  { label: "Languages", items: ["C++", "Python", "TypeScript"] },
  {
    label: "Backend",
    items: ["FastAPI", "Django", "Node.js", "Express.js", "REST", "WebSockets"],
  },
  {
    label: "Systems",
    items: ["Multithreading", "TCP Sockets", "RESP Protocol", "Event-Driven Arch"],
  },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { label: "Tools", items: ["Git", "Docker", "Linux", "CMake"] },
  {
    label: "CS Core",
    items: ["DSA", "Operating Systems", "DBMS", "Computer Networks", "OOP"],
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
  Backend: "--indigo",
  Systems: "--cyan",
  Databases: "--mint",
  Tools: "--coral",
  "CS Core": "--amber",
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
  { k: "langs", v: "C++ · Python · TS", c: "--coral" },
  { k: "now", v: "SDE Intern @ AutoCash.ai", c: "--amber" },
  { k: "focus", v: "backend infra · AI systems", c: "--indigo" },
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
    detail: "1000+ participants, national-level competitive coding contest",
  },
  {
    icon: "🥇",
    title: "1st Place · Spotter AI Hackathon",
    detail:
      "Aug 2026 · first among all remote submissions, for RoadCents (see projects) — a cost-optimal fuel-routing backend",
    link: "https://github.com/shubh-garg18/roadcents",
  },
  {
    icon: "⚡",
    title: `Codeforces ${personal.codeforcesRating}`,
    detail: `Handle: ${personal.codeforcesHandle}`,
    link: personal.codeforces,
  },
  {
    icon: "🧩",
    title: `LeetCode ${personal.leetcodeRating}`,
    detail: `Handle: ${personal.leetcodeHandle}`,
    link: personal.leetcode,
  },
];

export const nav = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "vibe-coded", label: "vibe" },
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
