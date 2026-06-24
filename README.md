# shubh-garg18 · portfolio

Personal portfolio for **Shubh Garg** — backend / low-latency systems engineer, IIT Roorkee '27.
Single-page site with a **CRT terminal** aesthetic: boot sequence, scanlines, phosphor glow,
custom thin-stroke SVG icons.

→ Live: https://shubh-garg18.vercel.app

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** + CSS custom-property design tokens
- **Framer Motion** — entrance/stagger, tagline rotator, project-filter transitions
- **Vercel Analytics**
- Fonts: JetBrains Mono + Inter via `next/font`

## Structure

```
src/
├── app/                 layout (fonts, metadata, analytics), page, globals.css, icon.svg
├── components/
│   ├── effects/         CRTOverlay, BootSequence
│   ├── layout/          Navbar (scroll-spy), Footer
│   ├── sections/        Hero, About, Experience, Projects, Skills, CPStats, Achievements, Contact
│   └── ui/              icons (custom SVG set), GlowCard, TerminalBadge, SectionLabel,
│                        BlinkingCursor, SocialLinks, Reveal
├── data/content.ts      single source of truth — all copy, links, projects, skills
└── lib/utils.ts         cn(), cfTier(), sparklinePoints()
```

All copy and links live in `src/data/content.ts` — edit there, not in components.

## Live data

`CPStats` fetches the **Codeforces** public API on mount
(`user.info` + `user.rating` for `Bitwise_Garg`) and renders an SVG rating
sparkline + recent contests, with a skeleton loader and a graceful fallback.
LeetCode has no reliable public rating API, so that value is static + linked to profile.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npm run lint
```

## Deploy (Vercel)

Push to `main` and connect the repo at vercel.com (auto-deploy), or `vercel --prod`.
No environment variables required — all APIs are public.

## To supply

- [ ] **`public/Shubh_Garg_Resume.pdf`** — the "Download Resume" button already links to
      `/Shubh_Garg_Resume.pdf`; drop the file in `public/` to activate it.
