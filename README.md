# bitwise · portfolio

My personal site. Shubh Garg, backend engineer, IIT Roorkee '27.

Live at **https://bitwise-rouge.vercel.app**

It's one page, styled after my actual Linux setup. Boot log on first load, a
tmux-style status bar at the top, a neovim statusline as the footer, and vim keys
that actually move you around the page.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind v4, with the whole colour system as CSS custom properties
- framer-motion behind `LazyMotion` (`m` components, strict mode)
- Vercel Analytics and Speed Insights
- IBM Plex Mono and Sans, self-hosted through `next/font`

## Keyboard

| key | does |
| --- | --- |
| `j` / `k` | next / previous section |
| `gg` / `G` | top / bottom |
| `1`–`8` | jump straight to a section |
| `:` | command line |
| `?` | show the keymap |

Commands worth knowing: `:projects`, `:resume`, `:cf`, `:theme gruvbox`, `:crt`,
`:help`, `:q`.

Motions are instant. Only `:` commands scroll smoothly, which is the behaviour I
wanted from a keyboard nav that's meant to feel like an editor.

## Colourschemes

workstation (default), paper (light), gruvbox, catppuccin, nord, rose-pine,
tokyonight, kanagawa, everforest.

Each is a block of CSS variables in `globals.css`, switched by a `data-theme`
attribute on `<html>`. Every text colour holds 4.5:1 against both the page
background and the panel background, so adding a scheme means checking contrast
before it ships. The picker in the header and `:theme <name>` both write through
`setTheme()` in `lib/theme.ts`, which is the only place that touches the
attribute.

## Real numbers

It felt wrong to put invented stats on a page about systems work, so none of
these are decoration:

- The latency cell in the footer is your own TTFB, read off the Navigation
  Timing API.
- The commit hash beside it is whatever `VERCEL_GIT_COMMIT_SHA` was at build.
- The neofetch card gets its kernel, uptime and package count from
  `package.json` and the first deploy date.
- The order book is labelled `sim`, because that's what it is. The throughput
  and p99 figures printed on it are TradeForge's measured benchmarks.

## Codeforces section

`CPStats` is a server component with hourly revalidation. It calls the Codeforces
API at build and revalidate time, draws the rating history as a braille
sparkline, and bakes the result into the static HTML. No client fetch, no loading
skeleton. If the API is down it falls back to the rating pinned in `content.ts`.

LeetCode has no public rating API worth depending on, so that number is static
and linked instead.

## Layout

```
src/
├── app/                 layout (fonts, metadata), page (JSON-LD), globals.css,
│                        icon.svg, opengraph-image.tsx, robots.ts, sitemap.ts
├── assets/              IBM Plex Mono TTFs, used to render the OG image
├── components/
│   ├── MotionProvider   LazyMotion + MotionConfig
│   ├── effects/         BootSequence, VimNav
│   ├── layout/          StatusBar, StatusLine
│   ├── sections/        Hero, OrderBook, About, Neofetch, Experience, Projects,
│   │                    VibeCoded, Skills, CPStats, Achievements, Contact
│   └── ui/              icons, WindowChrome, TerminalBadge, SectionLabel,
│                        BlinkingCursor, SocialLinks, Reveal, ThemeToggle,
│                        CrtToggle
├── data/content.ts      all copy, links and project data
└── lib/                 theme.ts (theme + crt), utils.ts (cn, cfTier, sparklines)

public/
├── logo-bitwise.png     the bitwise mark, rendered in the hero
└── Shubh_Garg_Resume.pdf
```

Copy and links live in `src/data/content.ts`. Edit there rather than in the
components.

The logo is fixed artwork, so unlike everything else on the page it can't follow
the theme tokens. On the light scheme it gets a dark disc behind it (`.logo-mark`
in `globals.css`) so the glow reads as a badge instead of a smudge.

## Running it

```bash
npm install
npm run dev      # localhost:3000
npm run build
npm run lint
```

## Deploying

Push to `main` and Vercel takes it from there.
