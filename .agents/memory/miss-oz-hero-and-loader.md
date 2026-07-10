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

**Current hero = ONE fully AI-generated vintage poster image with ALL text baked in** (`Postcard.tsx`
renders `/images/hero-poster-b.png` full-width inside the `.postcard` cream frame + a `.filmgrain`
overlay, with the slim HTML nav "menu" bar below). **Why:** the user rejected CSS/HTML text over a
photo as "not vintage" — they explicitly wanted the text image-generated so it captures the vintage
feel, and wanted the whole scene (vintage van, string lights, lit ice cream parlour, sundae) in one
grainy poster. The generated poster spells the copy correctly (Miss Oz, Est 2007, Ice Cream &
Dessert Cafe, Small Batch Big Heart, Where Sweet Memories Begin, Life is better with ice cream).
Full poster copy lives in the img `alt` for accessibility. Progression of rejected heroes: bulb-frame
3-panel poster → compact horizontal poster → single-photo postcard with CSS overlay text → THIS
baked-in poster (approved direction).

**Generating baked-in-text posters works well here:** `generateImage` at `resolution:"high"` with
a 1950s screen-printed-advertisement prompt renders short poster copy cleanly. Generate 2 variants
in parallel and pick the one with the best text + scene. Output is ~square (1024²) — display it
full-width (`block w-full h-auto`), never `object-cover` (crops the baked text).

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
