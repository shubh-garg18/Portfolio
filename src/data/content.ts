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
  alias: "Bitwise",
  handle: "shubh-garg18",
  tagline: "Backend engineer. Low-latency systems. IIT Roorkee '27.",
  email: "shubh18garg82@gmail.com",
  phone: "+91 9719878921",
  github: "https://github.com/shubh-garg18",
  linkedin: "https://linkedin.com/in/shubh--garg",
  codeforces: "https://codeforces.com/profile/Bitwise_Garg",
  codeforcesHandle: "Bitwise_Garg",
  leetcode: "https://leetcode.com/shubhgarg82",
  leetcodeHandle: "shubhgarg82",
  leetcodeRating: 1947,
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

IIT Roorkee '27. Most at home in C++ and a Linux terminal, optimizing the path between a request and the metal.

Long-term direction: quant systems and HFT infrastructure.`,
  facts: [
    { k: "location", v: "Roorkee, India" },
    { k: "school", v: "IIT Roorkee · '27" },
    { k: "now", v: "SDE Intern @ AutoCash.ai" },
    { k: "focus", v: "Quant systems · HFT infra" },
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
    tags: ["C++", "Concurrency", "HFT", "Order Book"],
    featured: true,
  },
  {
    id: "cachemeifucan",
    name: "CacheMeIfYouCan",
    subtitle: "Redis-Compatible In-Memory Store",
    lang: "TypeScript",
    accent: "--indigo",
    github: "https://github.com/shubh-garg18/CacheMeIfYouCan",
    description:
      "Redis RESP wire protocol over raw TCP. 38 commands, 8 data-structure families — streams, transactions, pub/sub, geospatial. Full RDB persistence, master-replica replication with PSYNC/FULLRESYNC.",
    stats: [
      { label: "GET ops/sec", value: "~120k" },
      { label: "SET ops/sec", value: "~100k" },
      { label: "Commands", value: "38 / 8 families" },
    ],
    tags: ["TypeScript", "TCP", "RESP Protocol", "Redis"],
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
      "Extended FastAPI/SQLAlchemy audit system with INSERT/CREATE logging paths and FK-to-name resolution; per-mutation actor + UTC timestamp stored in JSONB.",
      "Rolled out audit logging across 11 REST routers and 11 data models — 31 update and 20 insert call-sites covered.",
      "Designed and executed GraphQL-to-REST migration: 56 frontend operations (17 queries, 35 mutations), 12 files, +1,852/−1,249 lines.",
      "Implemented multi-select liquidity-pool filtering across 9 backend files spanning chart-aggregation, transaction, and forecast endpoints.",
    ],
    tags: ["FastAPI", "SQLAlchemy", "PostgreSQL", "GraphQL", "REST"],
  },
];

export type SkillCategory = { label: string; items: string[] };

export const skills: SkillCategory[] = [
  { label: "Languages", items: ["C++", "Python", "TypeScript", "SQL"] },
  {
    label: "Backend",
    items: ["FastAPI", "Node.js", "Express.js", "REST", "GraphQL", "WebSockets"],
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
  SQL: "--amber",
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
  { k: "focus", v: "quant systems · HFT", c: "--indigo" },
];


export type Achievement = {
  icon: string;
  title: string;
  detail: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    icon: "🥇",
    title: "IMO Gold Medal",
    detail: "International Rank 126 · International Mathematics Olympiad",
  },
  {
    icon: "📈",
    title: "WorldQuant BRAIN Consultant",
    detail:
      "Aug–Nov 2024 · designed and backtested predictive alpha models on global financial market data",
  },
  {
    icon: "⚡",
    title: "Codeforces 1612",
    detail: "Handle: Bitwise_Garg",
    link: "https://codeforces.com/profile/Bitwise_Garg",
  },
  {
    icon: "🧩",
    title: "LeetCode 1947",
    detail: "Handle: shubhgarg82",
    link: "https://leetcode.com/shubhgarg82",
  },
  {
    icon: "🎓",
    title: "JEE Advanced AIR 8160",
    detail: "JEE Mains AIR 6058",
  },
];

export const nav = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "stats", label: "stats" },
  { id: "contact", label: "contact" },
] as const;
