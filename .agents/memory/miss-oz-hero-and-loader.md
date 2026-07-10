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

**Current hero = a LIT vintage menu board with a blinking marquee bulb border** (`Postcard.tsx`).
Minimal HTML header (Est 2007, "Miss Oz" `--font-script` wordmark, teal cafe bar) ABOVE a
`.poster-frame` board that contains: 4 `.bulbstrip`s (the blinking light border), a `.poster-stage`
inner board holding a teal nav bar (anchor links, reduced-motion-aware `handleNav` smooth scroll), a
2-col grid (left = ONE fixed minimal vintage scene `/images/icecream-scene-b.png` in a `.vpanel` +
`.filmgrain`; right = a plain non-interactive flavor menu list with CSS `group-hover` highlight), and
a brick bottom ribbon ("Locally Owned ★ Small Business ★ Big Heart ★ @missozicecream").
**Why:** user shared a reference of a horizontal vintage menu board (bulb border, top nav, panels,
bottom ribbon) and asked to match it, keep ONE minimal vintage image (a "scenery with ice cream and
the icecream arrow lights thing"), and give the hero a light border that blinks on/off alternating.
Full hero-progression of rejected directions: bulb-frame 3-panel poster → compact horizontal poster
→ single-photo postcard w/ CSS overlay text → one baked-in-text AI poster → crossfading interactive
flavor-photo menu → THIS lit menu board (approved). NOTE a separate `FlavorDrop` "#menu" section
still exists deeper on the page; the hero's "See the full menu" links to it (not a conflict).

**The blinking bulb border is REUSED existing CSS**, not new: `.poster-frame` + `.bulbstrip`
(`-h.top/.bottom`, `-v.left/.right`) each with two children `.bulbs.bulbs-a` + `.bulbs.bulbs-b`
(radial-gradient dots, offset half a bulb, `@keyframes bulbblink` + `animation-delay` = adjacent
bulbs alternate on/off), plus `.poster-stage`, `.vpanel`, `.marquee-sign` — all already in
`index.css` with a `prefers-reduced-motion` block that quiets the bulbs. This system had been dead
code from an earlier rejected `PosterBoard`; it was revived here. `Nav.tsx`/`Hero.tsx`/`Menu.tsx`
remain dead.

**A single fixed vintage SCENE reads as minimal & on-brand:** `generateImage` at `resolution:"high"`
with a "minimal vintage screen-print travel-poster illustration, a retro 'ICE CREAM' arrow sign with
light bulbs + one ice cream cone, flat dusk sky + low treeline, muted teal/cream/brick palette,
grainy, lots of negative space, few objects" prompt renders the short "ICE CREAM" sign text cleanly
and matches the site palette. The illustration variant beat the photographic one for cohesion.
Output is ~square (1024²); display via `object-cover` in a wide `.vpanel` (sign upper-left, cone
right → cropping top/bottom is safe).

**Grain knobs:** global `.grain-overlay` opacity and `.filmgrain` opacity (both in `index.css`) —
raise them when the user asks for "more grainy".

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
