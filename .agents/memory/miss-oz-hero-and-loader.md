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

**Current hero = stacked, top-to-bottom** (`Postcard.tsx`): (1) slim teal nav bar (anchor links,
reduced-motion-aware `handleNav` smooth scroll); (2) a HORIZONTAL vintage scene image
`/images/hero-parlor.png` framed by the blinking marquee **bulb border** (`.poster-frame` + 4
`.bulbstrip`s, cream inner frame, `.filmgrain`), `object-cover` `aspect-[4/3] sm:aspect-[16/9]`, with
the "Miss Oz" wordmark (Est 2007 eyebrow / `--font-script` h1 / teal cafe pill) OVERLAID as absolute
DOM text in the open sky top-right, cream-offset text-shadow for a painted-sign look (the sole `<h1>`;
image `alt` describes the scene, not the wordmark); (4) a "Step Inside" row of 4 vintage
color-blocked section panels (`TONES` map: cream/teal/pink/gold bg+border+text; each an `<a>` with
eyebrow + display title + italic desc + hover-nudge "→", linking via `handleNav` to real sections —
Handmade→#menu, Pickup/Delivery→#menu, Vote→#vote, Vintage Vibes→#about); (5) a brick bottom ribbon ("Locally Owned ★ Small Business ★ Big Heart ★
@missozicecream"). **Why:** user wanted the wordmark above the image, the vintage image as a
standalone horizontal banner ON TOP OF (not inside) the menu, and the menu as its own rectangular
section — "make it feel natural". Full hero-progression of rejected directions: bulb-frame 3-panel
poster → compact horizontal poster → single-photo postcard w/ CSS overlay text → one baked-in-text AI
poster → crossfading interactive flavor-photo menu → lit all-in-one menu board → THIS stacked
image-over-menu layout (approved). NOTE a separate `FlavorDrop` "#menu" section still exists deeper on
the page; the hero's "See the full menu" links to it (not a conflict).

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
