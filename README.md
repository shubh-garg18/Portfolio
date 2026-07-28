# bitwise · portfolio

Personal portfolio for **Shubh Garg** — backend / low-latency systems engineer, IIT Roorkee '27.
Single-page site riced like a Linux workstation: boot log, tmux/i3-style status bar,
neovim statusline, vim keyboard nav, order-book hero, neofetch about card, switchable
colorschemes.

→ Live: [Portfolio](https://bitwise-rouge.vercel.app/)

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** + CSS custom-property design tokens
- **framer-motion** via `LazyMotion` (`m` components, strict) with
  `MotionConfig reducedMotion="user"`
- **Vercel Analytics + Speed Insights**
- Fonts: IBM Plex Mono + IBM Plex Sans via `next/font` (self-hosted)

## The rice is functional, not cosmetic

- `j` / `k` / `gg` / `G` / `1–7` — vim/i3 keyboard navigation (instant, unanimated)
- `:` — command line: `:projects`, `:resume`, `:cf`, `:theme gruvbox`, `:help`, `:q`
- `?` — which-key style keymap panel
- Colorschemes: `workstation` (default) · `paper` (light) · `gruvbox` · `catppuccin` ·
  `nord` · `rose-pine` — token blocks in `globals.css`, all WCAG AA validated
- The statusline is real: mode follows the command palette, showcmd echoes actual
  keystrokes, the latency cell is the visitor's measured TTFB, the commit hash is the
  deployed build (`VERCEL_GIT_COMMIT_SHA`)
- The neofetch card is real: kernel = Next.js version, uptime = days since first
  deploy, pkgs = dependency count (all from `package.json` at build)
- Boot screen: once per session, skippable, ~1.4s, true build facts

## Structure

```
src/
├── app/                 layout (fonts, metadata), page (JSON-LD), globals.css (schemes),
│                        icon.svg, opengraph-image.tsx, robots.ts, sitemap.ts
├── assets/              IBM Plex Mono TTFs (OFL) for OG image generation
├── components/
│   ├── MotionProvider   LazyMotion + MotionConfig (reduced motion)
│   ├── effects/         BootSequence, VimNav (keys, command line, keymap)
│   ├── layout/          StatusBar (scroll-spy workspaces), StatusLine (lualine footer)
│   ├── sections/        Hero, OrderBook, About, Neofetch, Experience, Projects,
│   │                    Skills, CPStats, Achievements, Contact
│   └── ui/              icons (custom SVG set), WindowChrome, TerminalBadge,
│                        SectionLabel, BlinkingCursor, SocialLinks, Reveal, ThemeToggle
├── data/content.ts      single source of truth — copy, links, projects, schemes
└── lib/utils.ts         cn(), cfTier(), sparklinePoints(), brailleSparkline()
```

All copy and links live in `src/data/content.ts` — edit there, not in components.

## Live data

`CPStats` is a **server component with hourly ISR**: it fetches the Codeforces API
(`user.info` + `user.rating` for `Bitwise_Garg`) at build/revalidate time, renders a
braille-dot rating sparkline + recent contests into the static HTML, and falls back to
the pinned rating in `content.ts` if the API is down. No client fetch, no skeleton.
LeetCode has no reliable public rating API, so that value is static + linked.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static + ISR for the CF fetch)
npm run lint
```

## Deploy (Vercel)

Push to `main`. `VERCEL_GIT_COMMIT_SHA` feeds the statusline commit cell automatically.
