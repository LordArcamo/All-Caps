# 🧢 ALL CAPS

> **Premium caps. Pure attitude.** A bold, animation-forward e-commerce experience for a premium headwear label — built with Astro, React, GSAP, and HiggsField-generated assets.

![Astro](https://img.shields.io/badge/Astro-6.3-FF5D01?style=flat-square&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02?style=flat-square&logo=greensock&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)

---

## ✨ What this is

A frontend-first, motion-driven e-commerce demo for **ALL CAPS** — a (fictional) premium caps & headwear label that ships limited drops of 200 units. Built as a portfolio-quality showcase of how Astro + React islands + GSAP can produce a magazine-grade shopping experience without a heavy commerce backend.

**Highlights:**
- 🎬 GSAP-driven motion language — pinned scrolls, magnetic cursor, 3D-tilt product gallery, scroll-batched reveals, Lenis smooth scroll
- 🛍 Full e-commerce IA — Home, Shop with filters, 8 PDPs, Cart drawer, About, Stories
- 🎨 Bold brand system — `@theme` design tokens, Anton/Inter typography, three-color palette (yellow `#FFCC00` / black `#0A0A0A` / red `#FF2D2D`)
- 🤖 AI-generated product imagery via [HiggsField](https://higgsfield.ai)
- 🧙 [21st.dev Magic MCP](https://github.com/21st-dev/magic-mcp) wired for in-editor component generation
- ♿ Reduced-motion guards, semantic HTML, keyboard-navigable
- ⚡ Static output via Astro — sub-2.5s LCP target

## 🧰 Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 6** (static + islands) | Best-in-class static perf with React only where it earns its keep |
| UI runtime | **React 19** (islands) | Used for Cart drawer, BuyBox, TiltGallery, ShopGrid |
| Styling | **Tailwind 4** (`@theme`) | Token-driven design system, zero CSS-in-JS |
| Motion | **GSAP 3.13 + ScrollTrigger + Lenis** | Industry-standard timeline + scroll-driven animation |
| Icons | **lucide-react** | Clean, consistent line icons |
| Types | **TypeScript 5** (`strict`) | End-to-end type safety |
| Commerce | **Mock** (localStorage cart) | Frontend showcase; swap for Shopify/Stripe later |
| Assets | **[HiggsField](https://higgsfield.ai)** | Premium product + lifestyle imagery via MCP |
| AI dev | **[21st.dev Magic MCP](https://github.com/21st-dev/magic-mcp)** | Component generation inside Claude Code |

## 🚀 Quick start

```bash
# 1. Clone and install
git clone https://github.com/LordArcamo/All-Caps.git
cd All-Caps
npm install

# 2. (Optional) Wire up the Magic MCP for AI component generation
cp .mcp.json.example .mcp.json
# Then edit .mcp.json and set your 21st.dev API key from https://21st.dev/magic/console

# 3. Dev server
npm run dev      # http://localhost:4321

# 4. Production build
npm run build    # output → dist/
npm run preview  # serve dist/ locally
```

**Requires Node 22.12+.**

## 🗺 Project map

```
.
├── public/                      # Static assets served as-is
│   └── products/                # Generated product hero shots
│       └── void-runner-1.png    # ← HiggsField output
│
├── src/
│   ├── pages/                   # File-based routing
│   │   ├── index.astro          # Home
│   │   ├── shop.astro           # Shop grid
│   │   ├── about.astro          # About / story
│   │   ├── stories/index.astro  # Journal index
│   │   └── product/[slug].astro # PDPs (8 static routes)
│   │
│   ├── layouts/
│   │   └── Layout.astro         # Base layout — SEO, fonts, smooth scroll, cursor, cart
│   │
│   ├── components/
│   │   ├── Nav.astro            # Sticky nav + announcement marquee
│   │   ├── Footer.astro         # Huge wordmark footer + columns
│   │   ├── Logo.astro           # SVG mark + wordmark
│   │   ├── SmoothScroll.tsx     # Lenis init (React island)
│   │   ├── Cursor.tsx           # Magnetic custom cursor (React island)
│   │   │
│   │   ├── sections/            # Page sections
│   │   │   ├── Hero.astro
│   │   │   ├── Drops.astro
│   │   │   ├── Manifesto.astro
│   │   │   ├── Lookbook.astro
│   │   │   ├── StoriesTeaser.astro
│   │   │   └── NewsletterCTA.astro
│   │   │
│   │   ├── ui/                  # Reusable primitives
│   │   │   ├── Button.astro
│   │   │   ├── Marquee.astro
│   │   │   └── ProductCard.astro
│   │   │
│   │   └── react/               # Stateful React islands
│   │       ├── TiltGallery.tsx  # PDP 3D-tilt gallery
│   │       ├── BuyBox.tsx       # PDP size/color/qty/add-to-cart
│   │       ├── ShopGrid.tsx     # Filter + sort grid
│   │       └── CartDrawer.tsx   # Slide-in cart with persistence
│   │
│   ├── lib/
│   │   ├── cn.ts                # clsx + tailwind-merge helper
│   │   ├── motion.ts            # GSAP easings + duration tokens
│   │   ├── lenis-init.ts        # Smooth scroll setup
│   │   └── cart.ts              # Mock cart store (localStorage + events)
│   │
│   ├── data/
│   │   ├── site.ts              # Brand info, nav, footer config
│   │   └── products.ts          # 8 seed products
│   │
│   └── styles/
│       └── global.css           # Tailwind import + @theme tokens
│
├── docs/
│   ├── BRAND.md                 # Brand voice + visual identity reference
│   └── MOTION.md                # GSAP patterns + motion design notes
│
├── CLAUDE.md                    # Working memory for Claude Code sessions
├── README.md                    # This file
└── .mcp.json.example            # Magic MCP config template
```

## 🎨 Design system

Tokens are defined in `src/styles/global.css` inside an `@theme` block. Tailwind 4 turns each one into a utility class (`bg-yellow`, `text-bone`, `font-display`, etc).

```css
--color-yellow: #FFCC00;   /* Hype yellow — primary */
--color-black:  #0A0A0A;   /* Jet black */
--color-red:    #FF2D2D;   /* Electric red — sale tags, drops */
--color-bone:   #F5F5F0;   /* Off-white */
--color-cream:  #FAF7EC;
--color-ink:    #1A1A1A;   /* Section backgrounds */

--font-display: "Anton", "Bebas Neue", sans-serif;
--font-sans:    "Inter", system-ui, sans-serif;
--font-mono:    "JetBrains Mono", monospace;
```

See [`docs/BRAND.md`](./docs/BRAND.md) for full brand voice, tone, and typography guidance.

## 🎬 Motion language

GSAP timelines + ScrollTrigger + Lenis combine for the site's signature feel:

- **Hero** — line-by-line text reveal on load, scroll-cue pulse loop
- **Drops grid** — scroll-batch fade-in + scale, staggered
- **Manifesto** — character-line slide-up reveal on enter, background marquee
- **PDP** — 3D-tilt gallery responds to mouse position, sticky buy column
- **Newsletter** — scrubbed horizontal drift on big background wordmark
- **Cursor** — yellow dot + outer ring with magnetic snap on hover targets
- **Smooth scroll** — Lenis with `expo.out` easing, respects `prefers-reduced-motion`

See [`docs/MOTION.md`](./docs/MOTION.md) for the GSAP cookbook used in this project.

## 🧙 Magic MCP (21st.dev)

This project is configured to use [21st.dev's Magic MCP](https://github.com/21st-dev/magic-mcp) so Claude Code can generate, search, and refine UI components directly from prompts.

1. Get a key at <https://21st.dev/magic/console>
2. `cp .mcp.json.example .mcp.json`
3. Replace `REPLACE_ME_WITH_YOUR_21ST_DEV_KEY` with your key
4. Reload Claude Code

Then ask things like: `"21st: design a size-guide drawer with imperial/metric toggle"`.

## 🤖 Asset generation (HiggsField)

Generated product imagery lives in `public/products/`. The first run ships with `void-runner-1.png` as a proof-of-concept. To regenerate or add more, use the HiggsField MCP tools.

**Prompt recipe** for cap hero shots:
```
Hero product photograph of a premium [silhouette] cap in [color] [material].
Centered on a moody dark gradient background. Raised silicone 'AC' logo in
yellow, cap-silhouette mark integrated. Dramatic single-source rim lighting
from upper right. Hyperrealistic editorial fashion photography. 4K detail,
shallow depth of field, no text watermarks, no model.
```

## 📜 Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Serve `dist/` locally for previewing the prod build |
| `npm run typecheck` | Run `astro check` (TS + Astro validation) |

## 🌐 Deploy

Vercel is the recommended target — zero config.

```bash
npm i -g vercel
vercel              # link
vercel --prod       # ship
```

Also works on Netlify, Cloudflare Pages, GitHub Pages (with adjustments), or any static host.

## 🧭 Roadmap

- [ ] Remaining 7 product hero shots via HiggsField
- [ ] 3 lookbook backgrounds (Brooklyn / Tokyo / Berlin)
- [ ] 6 story thumbnails
- [ ] Hero rotating-cap video (seedance_2_0)
- [ ] Story article detail pages (`/stories/[slug].astro`)
- [ ] Real commerce backend (Shopify Storefront API recommended)
- [ ] Account / login flow
- [ ] 404 page with brand personality
- [ ] Open Graph image generator

## 📂 Documentation

- [**CLAUDE.md**](./CLAUDE.md) — working memory + conventions for Claude Code sessions
- [**docs/BRAND.md**](./docs/BRAND.md) — voice, tone, terminology, copy guidelines
- [**docs/MOTION.md**](./docs/MOTION.md) — GSAP patterns + animation cookbook

## 🏷 License

Demo / portfolio project. All product names, branding, and copy are fictional.

---

Built loud in Brooklyn · Tokyo · Berlin. Made with [Claude Code](https://claude.com/claude-code).
