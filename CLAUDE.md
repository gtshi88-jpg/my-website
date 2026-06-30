# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build (also the main typecheck gate)
npm run start    # serve the production build
npm run lint     # eslint (next core-web-vitals + typescript configs)
```

There is no test runner configured. `npm run build` is the de-facto correctness check.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Three.js. Site content (Prism Works, a web/EC studio) is written in **Japanese** — match the existing tone when editing copy.

- Tailwind v4 is configured CSS-first: `app/globals.css` starts with `@import "tailwindcss"` and holds the custom design system, not a large JS config.
- Import alias `@/*` maps to the repo root (e.g. `@/components/...`, `@/data/...`).
- `next.config.ts` whitelists remote images from `images.unsplash.com` and `videos.pexels.com`; add hostnames there before referencing new remote media via `next/image`.

## Architecture

**Content is data-driven.** Pages stay thin and pull structured content from `data/*.ts` (`services.ts`, `works.ts`, `company.ts`, `pricing.ts`, `about.ts`, `process.ts`). When adding/changing site content, edit the data file and its exported type — don't hardcode in the page.

**Dynamic service pages** (`app/services/[slug]/page.tsx`) resolve `SERVICES_DATA` by `slug`. Each `ServiceItem` may carry an optional `detail` (`ServiceDetail`); when absent, `createFallbackDetail()` synthesizes a page from the base fields. So a service renders a full detail page whether or not someone authored `detail`.

**The homepage (`app/page.tsx`) is a `'use client'` orchestrator** with three coupled effects worth understanding before touching it:
1. **Loading screen** — gated on `sessionStorage.getItem('visited')`. First visit runs a count-up loader; subsequent visits skip it and reveal content immediately.
2. **Scroll reveal** — an `IntersectionObserver` adds `animate-fade-in-up` to `.scroll-trigger` elements and `is-visible` to `.reveal-text-container`/`.reveal-text-init`.
3. **Section theming** — observers + a scroll handler track the focused `.section-scene` and write `data-section-theme` (`dark` / `light` / `grid` / `soft`) onto `document.body`.

**Section theming is the site's visual backbone.** The `body[data-section-theme="..."]` rules in `globals.css` drive background color and the fixed `.section-tone-layer` gradient. To make a section participate, give it `class="section-scene"` and `data-section-theme="..."`; the page-level observers handle the rest.

**Layout & chrome.** `app/layout.tsx` sets up Manrope + Noto Sans JP fonts (as CSS variables), Japanese `lang`, and a global `CustomCursor`. The whole site uses `cursor: none` (set in `globals.css`) with `CustomCursor` rendering the pointer — keep that in mind for any interaction work. `SiteHeader`/`SiteFooter` are the shared chrome (the old `Navigation.tsx` is removed).

**Reusable UI primitives** live in `components/ui/` (`Reveal`, `RevealText`, `DepthTilt`, `LazyVideo`, `ParallaxImage`) — prefer these for entrance animations, tilt/parallax, and deferred video loading rather than reimplementing.

**`HeroScene3D.tsx`** is a hand-written Three.js scene (no react-three-fiber). It honors `prefers-reduced-motion` and disposes its renderer/geometry on unmount via a `stateRef` — preserve that cleanup when modifying it.
