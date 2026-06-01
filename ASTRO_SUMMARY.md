# Astro Quick Guide

## What Astro Is
Astro is a web framework focused on content-driven sites that are fast by default. It renders most HTML on the server at build time, then only ships JavaScript for components that actually need interactivity.

Core idea:
- Static-first output for performance.
- "Islands architecture" for interactivity.
- Use multiple UI frameworks together (React, Vue, Svelte, etc.) when needed.

## Why Teams Choose Astro
- Very fast page loads from minimal client JS.
- Clean file-based routing (`src/pages`).
- Great for marketing sites, docs, blogs, storefronts, and CMS-driven sites.
- Flexible data fetching from APIs, CMS platforms, or local content.

## Astro Project Structure
Typical folders:
- `src/pages`: Routes (`index.astro` -> `/`, `about.astro` -> `/about`).
- `src/layouts`: Reusable page wrappers.
- `src/components`: Reusable UI pieces.
- `src/styles`: Global and shared CSS.
- `public`: Static assets copied as-is.
- `astro.config.mjs`: Astro configuration.

## .astro Files in Practice
A `.astro` file usually has:
1. Frontmatter script block (`---`) for imports/data.
2. Template markup.
3. Optional scoped styles/scripts.

Example:
```astro
---
const title = 'Hello Astro';
---

<h1>{title}</h1>
```

## Rendering Modes
Astro supports:
- Static Site Generation (SSG): Prebuild pages at deploy time.
- Server-Side Rendering (SSR): Render on request using an adapter.
- Hybrid: Mix static and server-rendered routes.

For content-heavy websites, start static and add SSR where needed.

## Islands Architecture (Important)
By default, Astro sends HTML/CSS and no page-wide JS runtime.
Interactive components are opt-in using client directives, for example:
- `client:load`
- `client:idle`
- `client:visible`

This keeps most pages lightweight while still enabling dynamic UX.

## Data in Astro
Common patterns:
- Fetch remote APIs in frontmatter.
- Use `src/content` collections for local markdown/content models.
- Create API endpoints in `src/pages/api/*`.

For Etsy/CMS style projects, define a small adapter layer in `src/lib` and keep page components focused on rendering.

## How To Set Up a New Astro Project

### 1. Create project
```bash
npm create astro@latest
```
Pick template/options, then enter the new folder.

### 2. Install dependencies
```bash
npm install
```

### 3. Start dev server
```bash
npm run dev
```
Open the local URL shown in terminal.

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

## Practical Build Order for a Real Site
1. Define layout and navigation.
2. Create core pages (`/`, `/about`, etc.).
3. Add shared components (cards, hero, CTA, footer).
4. Add styling tokens (colors, spacing, typography).
5. Add data adapters (`src/lib`) for API/CMS.
6. Add interactive islands only where required (e.g., slider).
7. Validate performance and accessibility before deploy.

## Integration Notes (Etsy + Headless CMS)
- Keep external fetch logic out of component markup.
- Use typed models for product/content payloads.
- Normalize API responses in one place (`src/lib/*`).
- Prefer server endpoints for secrets/tokens.
- Cache responses where possible to reduce API cost and latency.

## Deployment Notes
Astro can deploy to static hosts (Netlify, Vercel static, Cloudflare Pages, GitHub Pages) or server platforms with adapters. Choose static if possible; use SSR only when you need per-request rendering.

## Common Commands
```bash
npm run dev      # local development
npm run build    # production build
npm run preview  # test built site locally
```

## Final Guidance for New Developers
- Start with static pages and simple components.
- Add interactivity intentionally, not everywhere.
- Keep data integration modular.
- Let Astro’s default performance model work for you.
