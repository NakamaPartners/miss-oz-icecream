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
