# Motion Reference — ALL CAPS

> GSAP patterns, easings, and scroll-driven animation cookbook for ALL CAPS. Built on GSAP 3.13 + ScrollTrigger + Lenis.

## 🎯 Motion philosophy

ALL CAPS animation is **purposeful, sharp, premium**. Not decorative, not "scroll for the sake of scroll." Every animation serves one of three functions:

1. **Reveal** — text and content arriving on screen with confident snap
2. **Response** — UI reacting to mouse / scroll / click with tactile feedback
3. **Atmosphere** — slow ambient motion (cursor, marquees, background drift) that adds depth without distraction

**Reduced motion is a first-class citizen.** Every animation has a fallback. Lenis auto-disables. GSAP's `prefers-reduced-motion` query short-circuits any motion that isn't essential.

## 🧰 The stack

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER } from "@lib/motion";
```

Lenis is initialized once globally in `Layout.astro` via `<SmoothScroll client:idle />`. **Do not initialize it again.**

## 🎚 Easing tokens

Defined in `src/lib/motion.ts`. Use these names — don't invent new strings.

```ts
EASE.outExpo       // "expo.out"     — default for reveals. Snappy entrance.
EASE.inOutQuart    // "power4.inOut" — slow scrub / pin animations.
EASE.back          // "back.out(1.7)" — playful overshoot (use sparingly).
EASE.snap          // "expo.inOut"   — looped pulses, scroll cues.
```

CSS counterparts also live in `--ease-out-expo`, `--ease-in-out-quart`, `--ease-back`, `--ease-snap` in `global.css`.

## ⏱ Duration tokens

```ts
DUR.fast  // 0.4s — micro-interactions
DUR.base  // 0.7s — default reveal
DUR.slow  // 1.1s — hero entries
DUR.long  // 1.6s — atmospheric drift
```

## 🪄 Stagger tokens

```ts
STAGGER.tight  // 0.04 — letter or character cascade
STAGGER.base   // 0.08 — line-by-line
STAGGER.loose  // 0.14 — large card grids
```

## 📋 Pattern cookbook

### 1. Line-by-line text reveal (Hero pattern)

Used in: Hero.astro, About hero, Shop hero, all big page headers.

```astro
<h1>
  <span class="block overflow-hidden">
    <span class="block" data-reveal-line>HEADS UP.</span>
  </span>
  <span class="block overflow-hidden">
    <span class="block text-yellow italic" data-reveal-line>CAPS ON.</span>
  </span>
</h1>

<style is:global>
  [data-reveal-line] { transform: translateY(110%); }
</style>

<script>
  import { gsap } from "gsap";

  gsap.fromTo(
    "[data-reveal-line]",
    { y: "110%" },
    { y: "0%", duration: 1.1, ease: "expo.out", stagger: 0.08 }
  );
</script>
```

Key: the parent has `overflow: hidden` so the line slides up from below. The child starts translated 110% down, animates to 0%.

### 2. Scroll-batched grid reveal (Drops, Lookbook, Stories patterns)

Used in: every section with a grid of cards that should fade-in as they enter the viewport.

```astro
<div data-card-item>...</div>
<div data-card-item>...</div>
<div data-card-item>...</div>

<script>
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.batch("[data-card-item]", {
    interval: 0.05,
    start: "top 85%",
    onEnter: (els) =>
      gsap.fromTo(
        els,
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.0, ease: "expo.out", stagger: 0.08,
        }
      ),
  });
</script>
```

`ScrollTrigger.batch` is the right tool when you have N similar items entering — it groups elements visible within a short time window and animates them together with staggers.

### 3. Pinned scroll section (when needed)

Not currently used but reserve this for "the manifesto stays pinned while you scroll" moments.

```ts
ScrollTrigger.create({
  trigger: "[data-pin-section]",
  start: "top top",
  end: "+=1500",
  pin: true,
  scrub: 0.5,
  animation: gsap.timeline()
    .to("[data-pin-stage-1]", { opacity: 0 })
    .to("[data-pin-stage-2]", { opacity: 1 }),
});
```

### 4. Horizontal scrub parallax (Newsletter background wordmark)

Used in: NewsletterCTA.astro background "ALL CAPS" text.

```ts
gsap.fromTo(
  "[data-news-bg]",
  { x: "-3vw" },
  {
    x: "3vw",
    ease: "none",
    scrollTrigger: {
      trigger: "[data-section='newsletter']",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  }
);
```

`ease: "none"` is intentional — scrubbed animations should track scroll position linearly. Curved easings on a scrub feel laggy.

### 5. Magnetic cursor (global)

Already implemented in `Cursor.tsx`. To make any element magnetic, add `data-cursor="hover"`. The component auto-binds to `a` and `button` elements too.

For special cases:

```tsx
<div data-cursor="hover">Hover me</div>
```

The cursor ring scales 2x on hover and tints yellow. The dot scales to 0 (disappears into the ring).

### 6. Mouse-position 3D tilt (TiltGallery)

Used in: PDP gallery. The cap visually rotates with mouse position using `transform-style: preserve-3d`.

```tsx
const wrap = wrapRef.current;
const tilt = tiltRef.current;

const setX = gsap.quickTo(tilt, "rotationY", { duration: 0.7, ease: "expo.out" });
const setY = gsap.quickTo(tilt, "rotationX", { duration: 0.7, ease: "expo.out" });

wrap.addEventListener("mousemove", (e) => {
  const r = wrap.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 to 0.5
  const py = (e.clientY - r.top) / r.height - 0.5;
  setX(px * 18);   // tilt up to ±18deg
  setY(-py * 12);  // tilt up to ±12deg
});

wrap.addEventListener("mouseleave", () => {
  setX(0);
  setY(0);
});
```

`gsap.quickTo` is critical here — it creates a single optimized tween instance that gets updated repeatedly, avoiding the overhead of creating a new tween per mousemove event.

The parent needs `[perspective:1200px]` (Tailwind arbitrary value), the child needs `[transform-style:preserve-3d]`.

### 7. Looping pulse (Scroll cue)

```ts
gsap.to("[data-scroll-cue]", {
  y: 18,
  duration: 1.4,
  ease: "expo.inOut",
  repeat: -1,
  yoyo: true,
});
```

The `yoyo: true` + `repeat: -1` creates a continuous bounce. `expo.inOut` makes the ease look like breathing — slow at the extremes, fast in the middle.

### 8. Marquee (CSS-only, no GSAP needed)

Used in: nav announcement bar, manifesto background. Pure CSS for performance.

```css
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

Duplicate the content twice (`{[1, 2].map(...)}`) and animate from 0 to -50% so the loop is seamless.

### 9. Hover-flip card image

Used in: ProductCard. Primary image fades out, hover image fades in, both scale on hover.

```html
<div class="group">
  <div class="transition-all duration-700 group-hover:scale-110 group-hover:opacity-0">
    <!-- primary -->
  </div>
  <div class="opacity-0 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100">
    <!-- hover variant -->
  </div>
</div>
```

CSS transitions are enough here — no GSAP needed. The double-image swap creates a punchy "the card just flipped" feel.

## 🚨 Anti-patterns

Don't do these. They look amateur or break performance.

- **Don't animate `width`/`height`/`top`/`left`** — animate `transform` and `opacity` only. They composite on the GPU; the rest force layout.
- **Don't `gsap.to("*")` without scoping** — use `gsap.context()` or restrict the selector to a section root.
- **Don't add new ScrollTriggers on rerenders.** In React islands, use `gsap.context(() => { ... }, ref)` in a `useEffect` and call `ctx.revert()` on cleanup.
- **Don't initialize a second smooth-scroll library.** Lenis is global. Adding Locomotive or Smoothie or framer-motion-scroll breaks ScrollTrigger sync.
- **Don't use `ease: "linear"` on reveals.** They look mechanical. Use `expo.out` or `power3.out`.
- **Don't tween on a `display: none` element** — set `visibility: hidden` or `opacity: 0` instead. Display none doesn't animate.
- **Don't forget reduced-motion fallbacks.** Wrap risky animations in:

```ts
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) return; // skip the animation entirely or use a simple opacity fade
```

## ♿ Reduced motion strategy

The strategy: motion that *adds context* stays, motion that *creates effect* disappears.

| Animation | Reduced-motion behavior |
|---|---|
| Lenis smooth scroll | Auto-destroyed (handled in `SmoothScroll.tsx`) |
| Text reveals | Replaced with instant `opacity` fade |
| Scroll-batched cards | Instant `opacity: 1` (no slide-up) |
| Looping pulse | Disabled |
| Tilt gallery | Disabled mouse tracking; static image |
| Marquee | Pause animation (already handled via `prefers-reduced-motion` CSS query in global.css) |
| Cursor | Stays — it's positional, not motion-effect |

The `prefers-reduced-motion: reduce` block in `global.css` sets all `animation-duration` and `transition-duration` to `0.01ms` as a safety net.

## 🎨 Combining motion + design tokens

CSS variables and GSAP easings should match. If you create a new easing, define it in *both* places:

```css
/* global.css @theme */
--ease-snap-out: cubic-bezier(0.22, 1, 0.36, 1);
```

```ts
// motion.ts
export const EASE = {
  ...existing,
  snapOut: "cubic-bezier(0.22, 1, 0.36, 1)",
};
```

This keeps CSS transitions and JS-driven animations visually consistent.

## 📚 References

- [GSAP docs](https://greensock.com/docs/v3) — official
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/) — official
- [Lenis docs](https://github.com/darkroomengineering/lenis) — smooth scroll
- [Motion design principles (Material)](https://m3.material.io/styles/motion/overview) — easing theory
- [Refactoring UI — Animation chapter](https://www.refactoringui.com/) — when not to animate
