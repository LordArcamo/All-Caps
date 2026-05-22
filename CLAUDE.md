# CLAUDE.md — ALL CAPS

> Working memory for Claude Code sessions. Keep this updated as the project evolves. If you change a convention, update the relevant section here so future sessions don't drift.

## Project at a glance

**ALL CAPS** is a premium caps & headwear e-commerce site, built as a frontend-first showcase with mock commerce. The visual identity is bold, athletic, drop-culture-coded — every headline literally in all caps, yellow + black + electric red palette, heavy display typography.

- **Working directory:** `/Users/lordarcamo/Ecommerce/AllCaps`
- **Repo:** <https://github.com/LordArcamo/All-Caps>
- **Tech:** Astro 6.3 (static + React islands) · React 19 · Tailwind 4 · GSAP 3.13 · TypeScript 5
- **State:** Frontend-only. Mock cart in `localStorage`. No commerce backend.
- **Asset generation:** HiggsField MCP → `public/products/*.png`
- **Component generation:** 21st.dev Magic MCP (see `.mcp.json.example`)

## Running it

```bash
npm run dev        # localhost:4321 (auto-restart)
npm run build      # static output → dist/
npm run preview    # serve dist/
npm run typecheck  # astro check
```

A dev launch config lives at `.claude/launch.json`. To preview in-session, use `preview_start({ name: "allcaps-dev" })`.

## Architecture conventions

### Astro vs React — when to use which

- **Default to Astro components** for everything static. Pages, sections, cards, layout chrome.
- **React island only when there's stateful interaction** that Astro can't express cleanly. Current islands: `CartDrawer`, `BuyBox`, `TiltGallery`, `ShopGrid`, `Cursor`, `SmoothScroll`.
- Hydration directive: `client:idle` for chrome (cart, cursor, smooth scroll), `client:load` for above-the-fold interactivity (BuyBox, TiltGallery, ShopGrid).

### File layout

```
src/
  pages/             # routes (.astro)
  layouts/           # base shells
  components/        # Astro components (named with PascalCase)
    sections/        # page-section composites (Hero.astro etc)
    ui/              # small reusable primitives (Button.astro, ProductCard.astro)
    react/           # React islands (.tsx)
  lib/               # framework-agnostic helpers (cn, motion, lenis, cart)
  data/              # seed data (site config, products)
  styles/            # global.css with @theme
```

### Path aliases (tsconfig.json)

```ts
"@/*"            → src/*
"@components/*"  → src/components/*
"@layouts/*"     → src/layouts/*
"@lib/*"         → src/lib/*
"@styles/*"      → src/styles/*
"@data/*"        → src/data/*
```

Use these in imports. Don't use `../../`.

### Design tokens

All colors, fonts, easings, radii, shadows live in `src/styles/global.css` under `@theme`. Tailwind 4 generates utility classes from them.

**Don't hardcode color hexes in components.** Use the token utility (`bg-yellow`, `text-bone`) or reference `var(--color-yellow)` in inline styles when dynamic.

The only legitimate inline hex usage is in `src/data/products.ts` (product color variants) and `src/data/site.ts` (theme color metadata).

## Brand voice (critical for any copy work)

ALL CAPS speaks **bold, hype, athletic-confident, anti-corporate**. The voice attributes:

- **Direct** — no hedging, no "we believe", no marketing-speak
- **Irreverent** — confident enough to make jokes at corporate-cap-brands' expense
- **Premium** — drop culture, limited editions, named makers
- **Anti-marketing** — explicit about no influencer gifting, no fake limited drops

**Headlines:** literally ALL CAPS. **Short.** Punctuation as rhythm. Italic yellow words are stress points (look at Hero / Drops / Lookbook sections for examples).

**Avoid:**
- "Member-only" / "exclusive access" / "elevated" / "curated"
- "Customer love" / "raving fans" / soft phrasing for bold metrics
- "Game-changing" / "revolutionary" / superlatives without proof
- "Learn more" / "click here" — be specific

See [`docs/BRAND.md`](./docs/BRAND.md) for full reference.

## Motion conventions

GSAP is the only animation library. Easings live in `src/lib/motion.ts`:

```ts
EASE.outExpo      // "expo.out"    — default reveal ease
EASE.inOutQuart   // "power4.inOut" — slow scrub ease
EASE.back         // "back.out(1.7)" — bouncy entrance
EASE.snap         // "expo.inOut" — sharp loop ease
```

**Reveal patterns:**
- Hero text: `gsap.fromTo({y:"110%"}, {y:"0%", stagger: 0.08})` with overflow-hidden wrapper
- Grid items: `ScrollTrigger.batch(els, { interval: 0.05, start: "top 85%", onEnter: stagger fade-up })`
- Section eyebrows: `gsap.from(..., { opacity: 0, y: 30, duration: 0.9, stagger: 0.1 })`

**Scroll:** Lenis is initialized once in `Layout.astro` via `<SmoothScroll client:idle />`. It auto-disables when `prefers-reduced-motion: reduce`. Don't add a second instance.

**Cursor:** Custom cursor (`Cursor.tsx`) replaces native cursor on `pointer: fine` devices. Add `data-cursor="hover"` to elements that should trigger the magnetic snap.

See [`docs/MOTION.md`](./docs/MOTION.md) for the full GSAP cookbook.

## Cart store

`src/lib/cart.ts` — module-level mock store with localStorage persistence + window events.

```ts
cart.add({ slug, name, price, color, colorHex, size, qty, image })
cart.remove(slug, color, size)
cart.setQty(slug, color, size, qty)
cart.clear()
cart.subtotal()  // number
cart.count()     // number
```

Adding to cart dispatches `cart:change` (items list) + `cart:open` (drawer open). `CartDrawer.tsx` listens for both.

To swap for a real backend later, replace the implementation in `cart.ts` — the consumer API stays identical.

## Adding a new product

1. Add the entry to `src/data/products.ts` following the existing `Product` type
2. Drop hero shots in `public/products/{slug}-1.png`, `-2.png`, etc — `.png` triggers the real-image path in `ProductCard` / `TiltGallery` / `ShopCard`
3. Astro will auto-generate the PDP route at `/product/{slug}` (via `getStaticPaths` in `src/pages/product/[slug].astro`)

If the image filename ends in `.png`, the component renders the real image; otherwise it falls back to the SVG logo placeholder over a gradient. This lets you seed the data with placeholder paths and fill in real assets incrementally.

## Adding a new section

1. Create `src/components/sections/YourSection.astro`
2. Import + drop into `src/pages/index.astro` (or wherever)
3. For scroll-triggered animation, add a `<script>` block at the bottom of the .astro file that imports GSAP from `gsap` and calls `ScrollTrigger.batch(...)`. **Don't** put GSAP logic in the frontmatter — it needs to run client-side.

Look at `src/components/sections/Drops.astro` for the canonical pattern.

## Type & lint

- TypeScript `strict` is on; don't disable it
- No ESLint config currently; relying on TS strict + Astro check
- Run `npm run typecheck` before committing

## Things to NEVER do

1. **Don't commit `.mcp.json`** — it has API keys. It's gitignored; keep it that way. Use `.mcp.json.example` for the template.
2. **Don't add a second smooth-scroll library** — Lenis is wired in `Layout.astro`. Adding another breaks ScrollTrigger.
3. **Don't bypass the cart store from React components** — always go through `cart.*` so events fire and the drawer stays in sync.
4. **Don't hardcode brand colors** as hex values in markup. Use Tailwind utility classes from `@theme`.
5. **Don't write multi-paragraph docstrings or jargon-heavy comments.** The codebase is intentionally lean. If you must comment, one short line explaining *why*, not *what*.
6. **Don't write product/brand copy in soft marketing tone.** It must match the brand voice in `docs/BRAND.md`. When in doubt, run `/brand-review`.

## Things to do PROACTIVELY

1. **Use the design tokens.** New section uses brand colors? Reach for `bg-yellow`, `text-bone`, `font-display` — don't invent new colors.
2. **Match motion language.** New section's reveal should use the existing GSAP patterns (`fromTo y:110% → 0%` for text, `ScrollTrigger.batch` for grids). Don't introduce a different reveal vocabulary.
3. **Add new pages to the sitemap** by ensuring they live under `src/pages/`. The `@astrojs/sitemap` integration picks them up automatically.
4. **When generating new product hero shots,** use the HiggsField prompt recipe in `README.md` and save to `public/products/{slug}-{n}.png`.

## Active TODOs (from last session)

- [ ] Generate remaining 7 product hero shots via HiggsField
- [ ] 3 lookbook backgrounds (Brooklyn / Tokyo / Berlin)
- [ ] 6 story thumbnails
- [ ] Hero rotating-cap video (consider seedance_2_0 or marketing_studio_video)
- [ ] Story article detail pages — `src/pages/stories/[slug].astro` doesn't exist yet
- [ ] Real commerce backend swap (Shopify Storefront API → replace `src/lib/cart.ts`)
- [ ] 404 page with brand personality

## Useful prompts for future sessions

- `"Generate a HiggsField hero shot for the [product-name] cap"` — uses the prompt recipe in README
- `"21st: design a [thing]"` — pulls from Magic MCP component library
- `"Run /brand-review on the latest changes"` — voice/tone audit
- `"Build the story detail page template"` — opens up the `/stories/[slug]` work
