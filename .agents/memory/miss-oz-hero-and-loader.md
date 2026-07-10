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
`/images/hero-parlor-v2.png` framed by the blinking marquee **bulb border** (`.poster-frame` + 4
`.bulbstrip`s, cream inner frame, `.filmgrain`), `object-cover` `aspect-[5/4] sm:aspect-[4/3]` (source is a SQUARE 1024² — a wider
container like 16/9 or 3/2 crops the sign/awning; keep the frame taller/nearer square to "zoom out" and show the whole scene), — the branding is BAKED INTO the illustration: an L-SHAPED (bent) bulb-lit marquee arrow whose face reads "MISS OZ", with an "EST. 2007" ribbon banner across the top and a hanging "SCOOPED FRESH DAILY" board; the parlor building carries an "ICE CREAM" board. There is NO DOM wordmark overlay; the
sole `<h1>` is a visually-hidden `sr-only` heading ("Miss Oz — Ice Cream & Dessert Cafe") and the
image `alt` describes the branded sign. **Cache-bust:** when swapping the hero, RENAME the file (e.g. `hero-parlor.png`→`hero-parlor-v2.png`) and update the `src` — reusing the same filename left users seeing the stale cached image. **Baked text note:** `generateImage` renders short block capitals ("MISS OZ", "EST. 2007", "SCOOPED FRESH DAILY") cleanly — generate ~2 candidates and pick the correctly-spelled one; script/cursive baked text is still unreliable, so keep sign lettering blocky;
then a "Step Inside" **2-up card grid** (`grid-cols-1 sm:grid-cols-2`) — each card is a native `<a>`
row with text left + a transparent vintage cutout illustration right (`public/images/panel-*.png`:
cone/van/sundae/milkshake, generated with `removeBackground:true`; images are decorative — `alt=""`
+ `aria-hidden`, link keeps its `aria-label`). Note: `removeBackground` can silently fail and leave a
solid bg — inspect each cutout and regenerate on a plain white bg if so; (4) a "Step Inside" row of 4 vintage
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

# Vintage bulb-lit vote cards

The "Vote for the Next Flavor" cards (`VoteFlavor.tsx`) are vintage bulb-lit ballots: an outer
`--teal-deep` frame with class `.bulbframe` (new in `index.css`: a `::after` drawing blinking cream
bulbs around the inner edge, quieted under `prefers-reduced-motion`) wrapping a light inner panel that
holds a transparent vintage flavor illustration (`/images/flavor-{ube,rose,croffle}.png`, decorative
`alt=""`+`aria-hidden`) + name + note + vote button/results. **Why a DARK frame:** the marquee bulbs
are cream (`#FFF3CE`), so they only read against a dark band — put bulbs on teal, not on the light card
face. Reuse `.bulbframe` for any future card that needs the lights.

# "Step Inside" panel vintage backgrounds

Each panel `<a>` has a faded tone-on-tone vintage wallpaper behind it (`/images/panelbg-{cream,teal,pink,gold}.webp`) applied via CSS `backgroundImage: linear-gradient(scrim,scrim), url(bg)` — the `scrim` (a semi-transparent tone-color rgba in the `TONES` map) sits OVER the image to keep the eyebrow/title/desc text legible; the foreground icon `<img>` stays on top. **Why WebP + resized:** the generated backgrounds were ~2MB PNGs each (~8MB above-the-fold) — a real LCP regression flagged in review. Convert decorative bg art with `magick <png> -resize 800x800 -quality 68 <webp>` (drops to ~15-30KB each). Rule: any decorative full-bleed background must be compressed WebP, never a raw multi-MB generated PNG.

# Seasonal display (FlavorDrop) = framed vintage lobby card

The seasonal section (`FlavorDrop.tsx`, the `#menu` div) was originally a modern phone-style autoplay VIDEO reel — user called it "trash" and wanted vintage. Now it's a static vintage screen-print POSTER (`/images/seasonal-pumpkin-poster.webp`) presented as a lit lobby card: dark cocoa frame + cream mat around the `<img>`, a decorative radial "lit" glow behind (`-z-0`, aria-hidden), a hanging "SEASONAL" enamel tab + "Yum! Yum!" script accent (`z-20`, above the `z-10` frame). Section backdrop is a faded tone-on-tone autumn wallpaper (`/images/seasonbg-autumn.webp`) under a cream scrim so the right-column copy stays legible. The old `public/video/pumpkin-drop.mp4` + `pumpkin-poster.jpg` were deleted. **Why:** poster-in-a-frame reads far more vintage than a social-media video reel. Generated posters with SHORT block/serif lettering ("SEASONAL", "PUMPKIN", "HOUSEMADE · SMALL BATCH") come out crisp — this one nailed it first try.

# Story section mascot + background cutouts

The "our story" section (`Story.tsx`, `#about`) has a rubber-hose vintage cartoon "ice cream man" (`/images/ice-cream-man.webp`) peeking from the bottom-left behind the aged-paper card: a `motion.div` positioned `absolute bottom-left z-0 pointer-events-none hidden lg:block` (card is `z-10` so he peeks from behind), one-time `whileInView` entrance + an idle vertical bob gated by `useReducedMotion()` (set `animate`/`transition` to `undefined` when reduced).

**`removeImageBackground` silently fails** — it returned an outputPath but the flat background was still fully present. For a flat/near-uniform generated background, chroma-key with ImageMagick instead: generate the character on a FLAT solid pale background with generous margin, then `magick in.png -alpha on -channel RGBA -fuzz 18% -fill none -draw "alpha 0,0 floodfill" -draw "alpha W-1,0 floodfill" -draw "alpha 0,H-1 floodfill" -draw "alpha W-1,H-1 floodfill" +channel -trim +repage -resize NxN out.webp`. Flood-fill from the 4 corners (not global color replace) so same-colored areas inside the character aren't punched out. **Always visually inspect the cutout** — both AI removal and chroma-key can leave halos or holes.

# Full-page aged-parchment wash (killing flat cream)

Flat `--cream` gutters/sections read too modern. Fix: a real seamless paper texture (`/images/paper-texture.webp`) applied as a **fixed full-viewport overlay** (`.paper-overlay`) with `mix-blend-mode: multiply`, `opacity ~0.5`, `background-size: cover`, `pointer-events: none`, added as a `<div>` inside `<main>` next to the existing `.grain-overlay`. Multiplying a light parchment over the whole comp warms/ages every surface at once (gutters, cream sections, even the hero) without editing each section's bg. **Z-index invariant:** loader splash (`z-[999]`) must stay above both overlays; paper-overlay `z-940` sits just under grain-overlay `z-950`. **Why:** one global overlay is far less work and more cohesive than retinting each section; multiply is the right blend since the texture is light. Generate the texture with EVEN lighting / no dark vignette so it doesn't darken screen edges.

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
