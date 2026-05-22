# Brand Reference — ALL CAPS

> Voice, tone, typography, color, and copy guidelines. This is the source of truth for anything that goes in front of a customer.

## 🎯 What ALL CAPS is

A premium caps & headwear label that ships limited drops of 200 units. Brooklyn, Tokyo, Berlin workshops. Hand-finished. Names on the lining. Sold out is the goal, not the surprise.

**Positioning:** anti-corporate cap brand. The opposite of the influencer-gifted, infinite-restock, drop-culture-cosplay competitors.

## 🗣 Voice attributes

### Bold
**We are:** confident without hedging, declarative, willing to take a stance.
**We are not:** loud for the sake of loud, aggressive, or arrogant.
**Sounds like:** *"Eight pieces. Two hundred made. When they're gone, they're history."*
**Does NOT sound like:** *"Our exclusive limited-edition drops feature elevated craftsmanship."*

### Direct
**We are:** plain-spoken, short sentences, no buzzwords.
**We are not:** rude or curt — clarity over politeness, but not at the expense of warmth.
**Sounds like:** *"We email when drops go live. That's it."*
**Does NOT sound like:** *"Subscribe to our newsletter for curated content and exclusive offers."*

### Irreverent
**We are:** willing to call out industry BS (influencer gifting, fake limited drops, "elevated" everything).
**We are not:** snarky, mean-spirited, or punching down.
**Sounds like:** *"No '5 ways to style your cap' newsletters. You're welcome."*
**Does NOT sound like:** *"Other brands are okay. We're just better."*

### Athletic-confident
**We are:** sport-coded, drop-culture-coded, swagger that's earned.
**We are not:** bro-y, gym-bro, or jock culture.
**Sounds like:** *"Heads up. Caps on. Volume loud."*
**Does NOT sound like:** *"Crush your day with confidence."*

### Premium without being precious
**We are:** quality-obsessed, willing to talk about materials and craft.
**We are not:** stuffy, French-luxury-house, or finger-on-the-pulse-trendy.
**Sounds like:** *"Heavy 100% cotton twill. Structured six-panel crown. Built to outlast the trend."*
**Does NOT sound like:** *"Crafted from the finest artisanal fabrics for the discerning gentleman."*

## ✍️ Tone adaptation

| Context | Dial it up | Dial it down |
|---|---|---|
| Hero / landing | **Bold + Direct** | Premium |
| Product description | **Premium + Direct** | Irreverent |
| About / story | **Direct + Irreverent** | Bold |
| Newsletter | **Irreverent + Direct** | Premium |
| Support / FAQ | **Direct** | Bold |
| Cart / checkout | **Direct** | All others |
| 404 / error | **Irreverent + Bold** | Premium |
| Press release | **Premium + Direct** | Irreverent |

The voice stays the same. Tone is the dial.

## 🚫 Words and phrases to avoid

| Avoid | Use instead |
|---|---|
| "Member-only", "exclusive access" | "Insiders get first dibs", "Early drops" |
| "Curated", "carefully crafted", "elevated" | Just describe it. "Hand-stitched in Brooklyn." |
| "Game-changing", "revolutionary", "next-gen" | Be specific about what's actually different |
| "Customers love us" | Show the numbers. Skip the framing. |
| "Click here", "Learn more" | "Shop Drop 02", "Read the story" |
| "Subscribe to our newsletter" | "Join the drop list", "Get first dibs" |
| "Limited edition" (when restocking) | Don't say it if you don't mean it |
| "Influencer collab", "as seen on" | We don't gift to influencers. Don't fake it. |
| "Crush", "smash", "destroy", "kill it" | Real confidence doesn't need violence verbs |
| Generic adjectives ("amazing", "incredible") | Specific verbs and nouns |

## ✅ Words and phrases that ARE us

- **Drop, edition, run, batch** — for product releases
- **Built, stitched, cut, finished** — for production verbs
- **Loud, sharp, bold, heavy** — for product/brand adjectives
- **Workshop, line, lining, brim, crown, panel** — concrete cap vocabulary
- **Brooklyn, Tokyo, Berlin** — the three workshops, name them often
- **200 made, sold out, gone, history** — scarcity vocabulary
- **Insider, first dibs, drop list** — early-access vocabulary

## 🎨 Visual identity

### Color palette

| Token | Hex | Usage |
|---|---|---|
| `--color-yellow` | `#FFCC00` | Primary brand. CTAs, highlights, accent type, drop tags. |
| `--color-black` | `#0A0A0A` | Anchor background. Default body bg. |
| `--color-ink` | `#1A1A1A` | Section variant. Slightly lighter than black for contrast. |
| `--color-graphite` | `#2A2A2A` | Card backgrounds, inputs. |
| `--color-bone` | `#F5F5F0` | Primary text on dark. Soft, not pure white. |
| `--color-cream` | `#FAF7EC` | Warmer surface variant. |
| `--color-red` | `#FF2D2D` | Accent. Sale tags, NEW/HOT badges, sold-out, drop callouts. |
| `--color-red-deep` | `#CC1F1F` | Pressed/active red state. |

**Rule of thumb:** yellow is the hero — about 5-10% of any view. Red is a callout — under 2%. Black/ink/graphite are the canvas. Bone is the type.

### Typography

| Token | Family | Use |
|---|---|---|
| `--font-display` | Anton (fallback Bebas Neue) | All H1, H2, oversized hero type, CTAs, eyebrows |
| `--font-sans` | Inter | Body text, paragraphs, descriptions, UI labels |
| `--font-mono` | JetBrains Mono | Eyebrows, metadata, drop tags, prices in some contexts |

**Scale (use `clamp` for fluid type):**
- Hero: `clamp(4rem, 13vw, 13rem)` — display, line-height 0.85
- H2: `clamp(2.5rem, 7vw, 7rem)` — display, line-height 0.9
- H3: `clamp(2rem, 4.5vw, 4rem)` — display
- Body: `1rem` (16px) base, `1.125rem` (18px) for important paragraphs
- Eyebrow / mono: `0.75rem` (12px), tracking widest, uppercase

### Treatment patterns

- **All-caps headlines** — literally. The brand name pun.
- **Italic yellow words** — used to add emphasis on the second or third word of a tight headline. E.g. "**HEADS UP. CAPS ON.** *VOLUME LOUD.*" — the *italic yellow* word is the punctum.
- **Stroked outline type** — used for the third line of a 3-line hero, e.g. `text-stroke` utility. Provides visual hierarchy without screaming twice.
- **Big background wordmarks** — at ~5-8% opacity, used to add depth in footer, manifesto, newsletter sections.
- **Marquees** — yellow announcement bar with star bullets, sliding horizontally.
- **Noise overlay** — `.noise-overlay` class adds subtle SVG noise at 20-30% opacity for tactile feel.

## 📝 Copy guardrails

### Headlines
- Max 3 words per line
- Period-ended (not exclamation) — confidence doesn't shout
- 2 or 3 lines, not 1, not 4

### Body copy
- Lead with the concrete fact, not the feeling
- "We email when drops go live. That's it." > "Get exclusive access to limited releases."
- Embrace incomplete sentences as rhythm devices
- One idea per paragraph

### Product taglines
- Under 8 words
- Two-clause structures work great: "Soft on top. Sharp underneath." / "Forged. Not folded."
- Single-clause works too: "Lock it in." / "Mesh meets menace."

### Calls to action
- Verb + specific thing: "SHOP DROP 02" > "Click here"
- All caps in button copy, with monospaced or display font, wide letter-spacing

### Numbers and dates
- Numerals always, no spelling out ("200 made", not "two hundred")
- Dates: `MAY 12, 2026` in mono, all caps
- Prices: `$65` no decimal if whole, `$65.00` only in cart subtotals

### Punctuation
- Em dash: ` — ` with spaces on both sides
- Period in headlines, never multiple
- Ampersand (`&`) only when space-constrained; "and" otherwise
- Oxford comma: yes

## 🧭 Brand pillars (for messaging)

1. **200 or less.** Every drop is 200 units, capped, on purpose.
2. **Names on the lining.** Whoever stitched it gets credit. Workers paid fairly.
3. **Built to beat up.** Designed to look better with wear, not worse.
4. **Zero BS marketing.** No influencer gifting, no fake limited drops with restocks.

Tie new messaging back to at least one pillar.

## 🔁 Examples (good → bad)

> ✅ "Built in Brooklyn. Cut sharp. Stitched louder."
> ❌ "Crafted with care in Brooklyn by artisan hands."

> ✅ "Sold out is the goal. Not the surprise."
> ❌ "Our limited drops sell out fast — get yours before they're gone!"

> ✅ "INSIDERS GET FIRST DIBS"
> ❌ "VIP MEMBERS ONLY ACCESS"

> ✅ "Real caps get better with damage."
> ❌ "Our caps develop a beautiful patina over time."

> ✅ "Eight pieces, two hundred made, when they're gone they're gone."
> ❌ "Our latest collection features 8 exclusive limited-edition styles."

## 🧰 Tools

- **`/brand-review`** — Claude Code skill that audits a piece of copy against this doc and flags deviations by severity.
- When writing or editing copy, paste it into chat and ask: *"Run /brand-review on this."*

## 📌 Quick checklist before shipping copy

- [ ] Is it under the word limit for its slot? (Headlines: max 3 words/line)
- [ ] Are any banned phrases present? (See "avoid" table)
- [ ] Does it tie back to at least one pillar?
- [ ] Is the tone dialed correctly for the context?
- [ ] Numerals not spelled out?
- [ ] Headlines end with period, not exclamation?
- [ ] CTAs are verb + specific thing?
