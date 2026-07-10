---
name: Miss Oz hero + intro loader
description: How to visually verify the Miss Oz site despite its intro splash, and the hero layout constraint that caused overlap.
---

# Verifying the Miss Oz site visually

The site mounts a fixed full-screen intro splash for ~1.5s (Loader component, z-999). The
Screenshot tool captures immediately on a fresh load, so it almost always catches the splash
("Miss Oz / est. 2007") instead of the page.

**To screenshot actual content:** temporarily flip the Loader's initial `useState(true)` → `false`,
screenshot, then flip it back. Don't forget to restore it.

**Current hero = a minimal, semi-interactive vintage MENU board** (`Postcard.tsx`). Minimal HTML
header (Est 2007, "Miss Oz" `--font-script` wordmark, teal cafe bar) + a framed menu card: a large
horizontal featured photo (crossfades via framer `AnimatePresence`) beside an interactive list of 4
flavor `<button>`s (hover/focus/click → `setActive`, `aria-pressed`, decorative `alt=""` thumbs) +
the slim anchor nav below. Featured images: `/images/flavor-{marionberry,thaitea,kulfi,coffee}.png`.
**Why:** the user rejected the fully-baked-in AI poster as "too obviously AI-generated" and asked for
WAY more minimalistic, horizontal, vintage, ≤3 objects per image, with the rest of the space being a
"menu with vintage images that is semi interactive". Full hero-progression of rejected directions:
bulb-frame 3-panel poster → compact horizontal poster → single-photo postcard w/ CSS overlay text →
one baked-in-text AI poster → THIS interactive menu (approved). NOTE a separate `FlavorDrop` "#menu"
section still exists deeper on the page; the hero's "See the full menu" links to it (not a conflict).

**Minimal vintage product photos read as far less "AI":** `generateImage` at `resolution:"high"`
with a "minimal 1960s Kodachrome studio photo, SINGLE scoop in one coupe glass, plain aged-cream
backdrop, lots of negative space, heavy film grain, ≤2 objects, no text" prompt gives clean,
consistent, believable vintage shots. Keep the framing identical across flavors for consistency.
Output is ~square (1024²); for a horizontal frame use `object-cover` (single centered subject, no
text to crop). Busy multi-object baked-text posters are what looked obviously AI-generated.

**Grain knobs:** global `.grain-overlay` opacity and `.filmgrain` opacity (both in `index.css`) —
raise them when the user asks for "more grainy". The old poster CSS
(`.poster-frame/.poster-stage/.vpanel/.marquee-sign/.bulbstrip`, `.postcard-scrim/-aged`,
`.photo-vintage`) and `PosterBoard.tsx`/`Nav.tsx`/`Hero.tsx` are dead — hero copy is no longer HTML
text, so `--font-script`/`--font-groovy` wordmark styling no longer applies to the hero.

**Below-the-fold sections still can't be screenshotted in one shot** (tool captures from top, can't
scroll). To review lower sections (Story, FlavorDrop, Wholesale, etc.), temporarily gate the poster
render in `home.tsx` (e.g. `{false && <PosterBoard />}`), screenshot tall, then restore.

# Hero layout constraint (overlap bug)

**Rule:** keep the hero as a single centered flex column with normal spacing — do NOT use negative
margins to pull the flavor title, tag badge, and cone stage together.

**Why:** an earlier version used `-mb` on the giant italic `<h1>` plus a negative `margin` on the
cone stage and pinned the flavor "tag" pill onto the stage. At large clamp() font sizes the title
collided with both the pill and the cone. User reported it as "texts overlapping / awkward."

**How to apply:** the flavor tag belongs BELOW the title as its own centered element; cap the h1 at
~clamp(40px,8.2vw,100px) with line-height ~1.06. Decorative motion (sunburst/seal spins, bob,
twinkle, marquee) must stay gated behind `@media (prefers-reduced-motion: reduce)` (CSS uses
`#hero * { animation: none !important }`) and the auto-advancing carousel interval is skipped when
that media query matches.

# Hero title transition "tear" glitch

**Rule:** do NOT CSS-`transition` the flavor `<h1>`'s `text-shadow` during the carousel change —
transition only `color`. Let the shadow snap.

**Why:** the giant groovy italic title has a hard-offset `text-shadow`. Animating text-shadow while
the flavor swaps (layered with the sunburst spin / blob morph / cone bob and the `overflow-hidden`
hero) produced torn, ghosted shadow fragments across the word — user reported it as a "text error
when it changes." The torn color matched the shadow color exactly (white for Marionberry).

**How to apply:** in Hero.tsx the h1 style must keep a static `textShadow` but its `transition` must
list `color` only, never `text-shadow`. Animating text-shadow is a known repaint-artifact source.
