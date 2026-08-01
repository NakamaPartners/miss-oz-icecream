import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bunting } from './Decor';
import OrderChooser from './OrderChooser';

/* Full-width homepage slideshow — real storefront photos */
const SLIDES: { src: string; alt: string; pos?: string }[] = [
  {
    src: '/images/slide-cones.webp',
    alt: 'Two waffle cones with scoops of marionberry ice cream held up inside the shop',
    pos: 'center 55%',
  },
  {
    src: '/images/slide-counter.webp',
    alt: 'Inside the parlor — the glowing MISS OZ marquee letters above the chalkboard flavor menu and the striped ice cream counter',
    pos: 'center 62%',
  },
  {
    src: '/images/storefront-photo-wide2.webp',
    alt: "The Miss Oz storefront in Portland's Pearl District — a corner shop with a neon Open sign in the window, lantern lights glowing inside, and a bike parked out front",
  },
  {
    src: '/images/slide-corner.webp',
    alt: 'The brick corner of the shop at dusk, with a glowing ice cream cone sculpture of string lights above the awning and the pink Miss Oz sidewalk sign out front',
    pos: 'center 62%',
  },
  {
    src: '/images/slide-sidewalk.webp',
    alt: 'The tree-lined Pearl District sidewalk outside the cafe, with the pink Miss Oz sign and Ice Cream & Coffee painted on the window',
    pos: 'center 60%',
  },
];

const NAV = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Menu', target: 'menu' },
  { label: 'Order Online', target: 'menu' },
  { label: 'Wholesale', target: 'wholesale' },
  { label: 'Event', target: 'events' },
  { label: 'Contact', target: 'contact' },
];

type Tone = 'cream' | 'teal' | 'pink' | 'gold';

const TONES: Record<Tone, { bg: string; border: string; title: string; desc: string; eyebrow: string; scrim: string; bgimg: string }> = {
  cream: { bg: 'var(--paper)', border: 'var(--teal-deep)', title: 'var(--cocoa)', desc: 'var(--cocoa)', eyebrow: 'var(--teal-deep)', scrim: 'rgba(239,226,196,0.42)', bgimg: '/images/panelbg-cream.webp' },
  teal: { bg: 'var(--teal-deep)', border: 'var(--gold)', title: 'var(--cream-hi)', desc: 'var(--gold-hi)', eyebrow: 'var(--gold-hi)', scrim: 'rgba(23,63,60,0.5)', bgimg: '/images/panelbg-teal.webp' },
  pink: { bg: 'var(--pink)', border: 'var(--berry)', title: 'var(--berry-deep)', desc: 'var(--cocoa)', eyebrow: 'var(--berry)', scrim: 'rgba(234,184,206,0.4)', bgimg: '/images/panelbg-pink.webp' },
  gold: { bg: 'var(--gold)', border: 'var(--brick)', title: 'var(--cocoa)', desc: 'var(--cocoa)', eyebrow: 'var(--cocoa)', scrim: 'rgba(199,154,59,0.48)', bgimg: '/images/panelbg-gold.webp' },
};

const panels: { title: string; sub: string; desc: string; target: string; tone: Tone; img: string }[] = [
  { title: 'Handmade Ice Cream', sub: 'Small batch, big heart', desc: 'Classic recipes, real flavor', target: 'menu', tone: 'cream', img: '/images/panel-icecream.webp' },
  { title: 'Vote the Next Flavor', sub: 'Next flavor', desc: 'You decide what\'s next', target: 'vote', tone: 'pink', img: '/images/panel-vote.webp' },
];

const FLAVORS: { name: string; desc: string }[] = [
  { name: 'Mexican Vanilla', desc: 'Creamy classic with real vanilla' },
  { name: 'Matcha', desc: 'Premium green tea, earthy & smooth' },
  { name: 'Kulfi', desc: 'Traditional Indian cardamom & pistachio' },
  { name: 'Birthday Cake', desc: 'Sweet cake batter with rainbow sprinkles' },
  { name: 'Butter Pecan', desc: 'Toasted pecans in buttery cream' },
  { name: 'Salty Caramel', desc: 'Buttery caramel with sea salt' },
  { name: 'Mint Chip', desc: 'Cool mint with dark chocolate chips' },
  { name: 'Coffee Crackle', desc: 'Coffee ice cream with chocolate crackle' },
  { name: 'Fresh Banana', desc: 'Real banana. Naturally sweet' },
  { name: 'Belgian Chocolate', desc: 'Smooth & rich Belgian chocolate' },
  { name: 'Cookies & Cream', desc: 'Chocolate cookies in sweet cream' },
  { name: 'Marionberry', desc: 'Oregon marionberries in creamy goodness' },
];

const MENU_CATEGORIES = ['Ice Cream', 'Sorbet', 'Sundaes', 'Croffle & Dessert', 'Drinks', 'Whole Cakes', 'Wholesale'];

const hrefFor = (t: string) => (t === 'home' ? '#home' : `#${t}`);

function handleNav(e: React.MouseEvent<HTMLAnchorElement>, target: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth';
  e.preventDefault();
  if (target === 'home') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const el = document.getElementById(target);
  if (el) {
    el.scrollIntoView({ behavior });
    // keep keyboard/screen-reader focus in sync with the scroll destination
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
}

/* Soft ink-on-paper fade on all four edges of the hero scene */
const HERO_MASK =
  'linear-gradient(to bottom, transparent 0%, black 2.5%, black 96%, transparent 100%), linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)';

export default function Postcard() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 11000);
    return () => clearInterval(t);
  }, [paused, slide]);

  const current = SLIDES[slide];

  return (
    <section
      id="home"
      className="relative pt-[clamp(40px,6vw,80px)] pb-[clamp(30px,5vw,60px)] overflow-hidden"
      aria-label="Miss Oz Ice Cream & Dessert Cafe"
    >
      {/* Bunting hanging below the global border */}
      <div
        className="absolute left-0 right-0 z-10 pointer-events-none"
        style={{ top: 'clamp(14px, 2vw, 26px)' }}
        aria-hidden="true"
      >
        <Bunting />
      </div>

      {/* MASTHEAD — logo centered large, all nav on one horizontal line */}
      <header className="relative z-20 mx-auto max-w-[1200px] px-[4vw] mt-[6px] sm:mt-[12px] mb-[clamp(14px,2vw,24px)]">
        {/* top double rule */}
        <div className="w-full border-t-[2.5px] border-b-[1px] border-[var(--cocoa)] h-[5px] sm:h-[7px] opacity-70" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="grid items-center"
          style={{ minHeight: 'clamp(120px,16vw,200px)', gridTemplateColumns: '1fr auto 1fr' }}
        >
          {/* left nav — HOME ABOUT MENU */}
          <nav aria-label="Primary" className="flex items-center justify-between gap-x-[clamp(18px,2.2vw,36px)] z-10">
            {NAV.slice(0, 3).map((n) => (
              <a
                key={n.label}
                href={hrefFor(n.target)}
                onClick={(e) => handleNav(e, n.target)}
                className="whitespace-nowrap text-[11px] sm:text-[12px] tracking-[2.5px] uppercase font-bold text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* center — logo in normal flow so it can't overlap nav items */}
          <div className="flex-none z-10 px-[clamp(12px,2vw,32px)]">
            <img
              src="/images/logo-official.webp"
              alt="Miss Oz — Ice Cream Cafe, Portland Oregon"
              className="w-[clamp(140px,16vw,210px)] h-auto"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(93,26,58,0.18))' }}
            />
          </div>

          {/* right nav — ORDER ONLINE WHOLESALE EVENT CONTACT all on one line */}
          <nav aria-label="Primary continued" className="flex items-center justify-between gap-x-[clamp(18px,2.2vw,36px)] z-10">
            {NAV.slice(3).map((n) => (
              <a
                key={n.label}
                href={hrefFor(n.target)}
                onClick={(e) => handleNav(e, n.target)}
                className="whitespace-nowrap text-[11px] sm:text-[12px] tracking-[2.5px] uppercase font-bold text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </motion.div>

        {/* bottom hairline */}
        <div className="w-full border-t border-[var(--cocoa)] opacity-35" aria-hidden="true" />
      </header>

      {/* HERO SCENE — composite: cone foreground left + rotating café backdrop right.
          z-[955] lifts the photo above the fixed paper (940) / grain (950) overlays so it stays
          bright and natural, while staying below the marquee frame (960). */}
      <div className="relative w-full z-[955] pointer-events-none">
        <div
          className="w-full relative max-w-[1200px] mx-auto px-[4vw]"
          style={{
            maskImage: HERO_MASK,
            WebkitMaskImage: HERO_MASK,
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        >
          {/* 16:7 aspect mirrors the wide-cinema feel of the reference */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/7] overflow-hidden">

            {/* ── LAYER 1: rotating café backdrop ── */}
            <AnimatePresence initial={false}>
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.alt}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1.06 }}
                exit={{ opacity: 0, scale: 1.07 }}
                transition={{
                  opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
                  scale: { duration: 8, ease: 'linear' },
                }}
                className="absolute inset-0 w-full h-full object-cover saturate-[1.05] contrast-[1.03]"
                style={{ objectPosition: current.pos ?? 'center' }}
              />
            </AnimatePresence>

            {/* ── LAYER 2: soft darkening behind the text ── */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 55% 70% at 50% 52%, rgba(20,8,12,0.6) 0%, rgba(20,8,12,0.34) 55%, transparent 100%)',
              }}
            />

            {/* ── LAYER 3: brand text — centered over the slideshow ── */}
            <div
              className="absolute flex flex-col items-center text-center pointer-events-none left-[8%] right-[8%] sm:left-[18%] sm:right-[18%]"
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              {/* Miss Oz — Higante display, gold, matching the logo lettering */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(44px,6.8vw,96px)',
                  lineHeight: 1,
                  color: '#EBC77F',
                  textShadow: '0 2px 22px rgba(20,8,12,0.6), 0 3px 6px rgba(20,8,12,0.45)',
                }}
              >
                Miss Oz
              </div>
              {/* Tagline — cream script */}
              <div
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(17px,2.3vw,32px)',
                  color: 'var(--cream-hi)',
                  textShadow: '0 1px 10px rgba(20,8,12,0.65)',
                  marginTop: 'clamp(2px,0.4vw,6px)',
                }}
              >
                Sweet Memories Start Here.
              </div>
              {/* Subtext — two lines, cream small caps */}
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(9px,0.72vw,10px)',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'rgba(251,242,223,0.92)',
                  textShadow: '0 1px 6px rgba(20,8,12,0.75)',
                  marginTop: 'clamp(8px,1vw,14px)',
                  lineHeight: 1.9,
                }}
              >
                Small Batch Ice Cream &amp; Handmade Desserts
                <br />
                Since 2007
              </div>
              {/* CTA buttons */}
              <div className="flex flex-wrap justify-center gap-[clamp(8px,0.8vw,12px)] mt-[clamp(12px,1.6vw,20px)] pointer-events-auto">
                <a
                  href="#menu"
                  onClick={(e) => handleNav(e, 'menu')}
                  className="inline-flex items-center justify-center min-h-[44px] rounded-full bg-[var(--berry-deep)] text-[#fbf2df] font-bold tracking-[2px] uppercase transition-all duration-200 hover:bg-[var(--berry)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  style={{ fontSize: 'clamp(10px,0.82vw,11px)', padding: 'clamp(9px,0.9vw,11px) clamp(18px,1.8vw,26px)', border: '1px solid rgba(251,242,223,0.35)' }}
                >
                  View Menu
                </a>
                <button
                  type="button"
                  onClick={() => { window.open('https://www.ubereats.com/store/miss-oz-ice-cream-cafe-aka-cool-moon-ice-cream/YEfj7ZgZS2m7Wm2og7PphQ', '_blank', 'noopener'); }}
                  className="inline-flex items-center justify-center min-h-[44px] rounded-full bg-[var(--berry-deep)] text-[#fbf2df] font-bold tracking-[2px] uppercase transition-all duration-200 hover:bg-[var(--berry)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  style={{ fontSize: 'clamp(10px,0.82vw,11px)', padding: 'clamp(9px,0.9vw,11px) clamp(18px,1.8vw,26px)', border: '1px solid rgba(251,242,223,0.35)' }}
                >
                  Order Online
                </button>
              </div>
            </div>

            {/* ── slide dots — bottom-center horizontal row, like the reference ── */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-[clamp(10px,1.6vw,20px)] flex flex-row gap-[8px] pointer-events-auto"
              aria-label="Storefront slideshow controls"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  aria-current={i === slide}
                  aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
                  onClick={() => setSlide(i)}
                  className="w-[9px] h-[9px] rounded-full transition-all duration-300"
                  style={{
                    background: i === slide ? '#F4A9C7' : 'rgba(244,169,199,0.4)',
                    transform: i === slide ? 'scale(1.3)' : 'scale(1)',
                    boxShadow: i === slide ? '0 0 0 2px rgba(244,169,199,0.3)' : '0 1px 3px rgba(20,8,12,0.4)',
                  }}
                />
              ))}
            </div>
          </div>

        </div>

        {/* "PORTLAND'S HOMEGROWN ICE CREAM CAFE" — dark ribbon below the hero photo */}
        <div
          className="mx-auto max-w-[1200px] px-[4vw] sm:px-[4vw]"
          aria-hidden="true"
        >
          <div
            className="flex items-center justify-center gap-[clamp(10px,2vw,24px)] py-[10px]"
            style={{ background: 'var(--cocoa)' }}
          >
            <span className="w-6 sm:w-10 h-px bg-[var(--gold-hi)] opacity-50" />
            <span
              className="text-[var(--cream-hi)] tracking-[3.5px] sm:tracking-[5px] uppercase font-bold"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(8px,0.85vw,11px)' }}
            >
              Portland's Homegrown Ice Cream Cafe
            </span>
            <span className="w-6 sm:w-10 h-px bg-[var(--gold-hi)] opacity-50" />
          </div>
        </div>
      </div>

      {/* SECTION PANELS — poster-like taped cards, click to explore */}
      <div className="relative z-20 mx-auto max-w-[1080px] px-[4vw] sm:px-0 mt-[clamp(18px,2.4vw,30px)]">
        <div className="flex items-center justify-center gap-3 mb-[clamp(14px,1.8vw,22px)]">
          <span className="w-10 h-px bg-[var(--gold)] opacity-60" aria-hidden="true" />
          <span className="text-[var(--berry-deep)] text-[12px] tracking-[4px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Step Inside</span>
          <span className="w-10 h-px bg-[var(--gold)] opacity-60" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_250px] lg:grid-cols-[220px_1fr_280px] gap-[clamp(14px,1.8vw,22px)] items-stretch">

          {/* LEFT — forest-green menu category card with striped awning (decorative list, like a painted parlor sign) */}
          <aside aria-label="Menu categories" className="relative mx-auto w-full max-w-[320px] md:max-w-none flex flex-col">
            {/* striped awning — cream + forest green */}
            <div aria-hidden="true" className="relative z-10 -mb-[2px]">
              <div className="h-[14px] rounded-t-[10px]" style={{ background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 22px, #1F4A3D 22px 44px)', boxShadow: 'inset 0 -4px 8px rgba(28,13,12,0.2), 0 3px 8px rgba(0,0,0,0.18)' }} />
              <div className="h-[9px]" style={{ background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 22px, #1F4A3D 22px 44px)', WebkitMaskImage: 'radial-gradient(11px at 50% 0, #000 98%, transparent 100%)', maskImage: 'radial-gradient(11px at 50% 0, #000 98%, transparent 100%)', WebkitMaskSize: '22px 100%', maskSize: '22px 100%', WebkitMaskRepeat: 'repeat-x', maskRepeat: 'repeat-x', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.18))' }} />
            </div>
            <div
              className="flex-1 flex flex-col items-center rounded-b-[12px] px-5 py-[clamp(24px,2.6vw,36px)]"
              style={{
                background: 'radial-gradient(120% 90% at 30% 15%, rgba(255,255,255,0.06), transparent 60%), linear-gradient(165deg, #245445 0%, #1B4136 55%, #1F4A3D 100%)',
                boxShadow: '0 14px 34px rgba(28,13,12,0.25), inset 0 0 0 1.5px rgba(242,225,194,0.28)',
              }}
            >
              {/* inner hairline frame like the reference */}
              <div className="flex-1 w-full flex flex-col items-center justify-center rounded-[6px] px-4 py-[clamp(20px,2.2vw,30px)]"
                style={{ boxShadow: 'inset 0 0 0 1.5px rgba(242,225,194,0.45)' }}>
                {MENU_CATEGORIES.map((c, i) => (
                  <div key={c} className="flex flex-col items-center w-full">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-[var(--pink)] opacity-70 my-[clamp(6px,0.7vw,10px)]" style={{ fontSize: 9 }}>✦</span>
                    )}
                    <span
                      className="text-center font-bold uppercase tracking-[3px] text-[#F2E1C2]"
                      style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(12px,1.05vw,14px)' }}
                    >
                      {c}
                    </span>
                  </div>
                ))}
                {/* cone icon */}
                <svg aria-hidden="true" width="26" height="38" viewBox="0 0 26 38" className="mt-[clamp(12px,1.4vw,20px)] opacity-90">
                  <path d="M5 14 Q5 4 13 4 Q21 4 21 14" fill="none" stroke="#F4A9C7" strokeWidth="1.4" />
                  <path d="M5 14 Q7 12 9 14 Q11 12 13 14 Q15 12 17 14 Q19 12 21 14" fill="none" stroke="#F4A9C7" strokeWidth="1.2" />
                  <path d="M5 14 L13 36 L21 14 Z" fill="none" stroke="#F2E1C2" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M7.5 19 L18.5 19 M9.5 24 L16.5 24" stroke="#F2E1C2" strokeWidth="1" opacity="0.7" />
                </svg>
                <div className="mt-[clamp(8px,0.9vw,12px)] text-center leading-snug text-[var(--pink)]"
                  style={{ fontFamily: "'Lemongrass', cursive", fontSize: 'clamp(19px,1.7vw,24px)' }}>
                  Small Batch
                  <br />
                  Big Heart
                </div>
              </div>
            </div>
          </aside>

          {/* CENTER — cream "Ice Cream Flavors" panel */}
          <section
            aria-label="Ice cream flavors"
            className="relative flex flex-col rounded-[10px] px-[clamp(18px,2.6vw,42px)] py-[clamp(22px,2.6vw,36px)]"
            style={{
              background: 'linear-gradient(180deg, #FBF4E6, #F7EDDA)',
              boxShadow: '0 14px 34px rgba(28,13,12,0.18), inset 0 0 0 1px rgba(94,23,53,0.25), inset 0 0 0 5px rgba(251,244,230,1), inset 0 0 0 6px rgba(94,23,53,0.15)',
            }}
          >
            {/* header */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <h3 className="uppercase font-bold tracking-[4px] text-[#3B1E2B]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.6vw,22px)' }}>
                  Ice Cream Flavors
                </h3>
                <span aria-hidden="true" className="text-[10px] text-[var(--pink)]">✦</span>
              </div>
              <div className="mt-[5px] text-[var(--marionberry)]" style={{ fontFamily: "'Lemongrass', cursive", fontStyle: 'italic', fontSize: 'clamp(18px,1.7vw,24px)' }}>
                Handmade in Small Batches
              </div>
            </div>

            {/* two-column flavor list — each column has hairline dividers between items */}
            <div className="mt-[clamp(18px,2.2vw,28px)] flex-1 flex flex-col md:flex-row gap-x-[clamp(20px,3vw,40px)] gap-y-0">
              {[FLAVORS.slice(0, 6), FLAVORS.slice(6)].map((col, ci) => (
                <div key={ci} className="flex-1 flex flex-col">
                  {col.map((f, i) => (
                    <div
                      key={f.name}
                      className="flex items-start gap-[10px] py-[clamp(10px,1.1vw,15px)]"
                      style={{ borderTop: i > 0 ? '1px solid rgba(94,23,53,0.1)' : 'none' }}
                    >
                      <span aria-hidden="true" className="text-[var(--pink)] mt-[5px] shrink-0" style={{ fontSize: 8 }}>●</span>
                      <div>
                        <div className="uppercase font-bold tracking-[2px] text-[#3B1E2B]" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(11px,0.95vw,13px)' }}>
                          {f.name}
                        </div>
                        <div className="mt-[3px] leading-snug text-[#6E5A54]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.85vw,12px)' }}>
                          {f.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* dotted divider */}
            <div aria-hidden="true" className="mt-[clamp(16px,2vw,24px)] h-px w-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(94,23,53,0.35) 0 4px, transparent 4px 9px)' }} />

            {/* bottom callouts */}
            <div className="mt-[clamp(14px,1.8vw,22px)] grid grid-cols-1 sm:grid-cols-2 gap-[clamp(14px,2vw,28px)]">
              <div className="flex items-start gap-3">
                <svg aria-hidden="true" width="30" height="34" viewBox="0 0 30 34" className="shrink-0 mt-[2px]">
                  <rect x="6" y="9" width="18" height="22" rx="3" fill="none" stroke="var(--marionberry)" strokeWidth="1.5" />
                  <path d="M9 9 V6 a3 3 0 0 1 3-3 h6 a3 3 0 0 1 3 3 V9" fill="none" stroke="var(--marionberry)" strokeWidth="1.5" />
                  <path d="M15 17.5 c-1.8-2.4-5.4-.6-4.2 2 c.9 1.9 4.2 3.8 4.2 3.8 s3.3-1.9 4.2-3.8 c1.2-2.6-2.4-4.4-4.2-2Z" fill="none" stroke="var(--pink)" strokeWidth="1.3" />
                </svg>
                <div>
                  <div className="uppercase font-bold tracking-[2px] text-[#3B1E2B]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.85vw,12px)' }}>Churned Fresh</div>
                  <div className="mt-[2px] leading-snug text-[#6E5A54]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,0.8vw,11.5px)' }}>
                    We make our ice cream in small batches every week for the best flavor and texture.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg aria-hidden="true" width="32" height="34" viewBox="0 0 32 34" className="shrink-0 mt-[2px]">
                  <rect x="3" y="8" width="26" height="20" rx="2.5" fill="none" stroke="var(--marionberry)" strokeWidth="1.5" />
                  <path d="M3 16 h26" stroke="var(--marionberry)" strokeWidth="1.3" />
                  <circle cx="10" cy="22" r="2.2" fill="none" stroke="var(--pink)" strokeWidth="1.2" />
                  <circle cx="16" cy="22" r="2.2" fill="none" stroke="var(--pink)" strokeWidth="1.2" />
                  <circle cx="22" cy="22" r="2.2" fill="none" stroke="var(--pink)" strokeWidth="1.2" />
                </svg>
                <div>
                  <div className="uppercase font-bold tracking-[2px] text-[#3B1E2B]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.85vw,12px)' }}>Rotating Case</div>
                  <div className="mt-[2px] leading-snug text-[#6E5A54]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,0.8vw,11.5px)' }}>
                    Seasonal flavors rotate throughout the year. Ask what's new!
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT — plum "Come Slow Down" card with striped awning */}
          <div className="relative mx-auto w-full max-w-[340px] md:max-w-none flex flex-col">
            {/* striped awning — cream + deep berry */}
            <div aria-hidden="true" className="relative z-10 -mb-[2px]">
              <div className="h-[14px] rounded-t-[10px]" style={{ background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 22px, var(--berry-deep) 22px 44px)', boxShadow: 'inset 0 -4px 8px rgba(28,13,12,0.2), 0 3px 8px rgba(0,0,0,0.18)' }} />
              <div className="h-[9px]" style={{ background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 22px, var(--berry-deep) 22px 44px)', WebkitMaskImage: 'radial-gradient(11px at 50% 0, #000 98%, transparent 100%)', maskImage: 'radial-gradient(11px at 50% 0, #000 98%, transparent 100%)', WebkitMaskSize: '22px 100%', maskSize: '22px 100%', WebkitMaskRepeat: 'repeat-x', maskRepeat: 'repeat-x', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.18))' }} />
            </div>
            <div
              className="flex-1 flex flex-col items-center text-center rounded-b-[12px] px-[clamp(18px,1.8vw,26px)] py-[clamp(24px,2.6vw,36px)]"
              style={{
                background: 'radial-gradient(120% 90% at 30% 15%, rgba(255,255,255,0.06), transparent 60%), linear-gradient(165deg, #5E1735 0%, #471027 55%, #55142F 100%)',
                boxShadow: '0 14px 34px rgba(28,13,12,0.3), inset 0 0 0 1.5px rgba(242,225,194,0.3)',
              }}
            >
              <div className="flex-1 w-full flex flex-col items-center justify-center rounded-[6px] px-[clamp(14px,1.6vw,22px)] py-[clamp(22px,2.4vw,32px)]"
                style={{ boxShadow: 'inset 0 0 0 1.5px rgba(242,225,194,0.4)' }}>

                {/* title */}
                <div
                  className="text-center leading-[1.2] text-[#F2E1C2]"
                  style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 'clamp(28px,2.6vw,38px)' }}
                >
                  ~ Come Slow
                  <br />Down ~
                  <br />With Us!
                </div>

                {/* heart */}
                <span aria-hidden="true" className="mt-[clamp(10px,1.1vw,16px)] text-[var(--pink)]" style={{ fontSize: 16 }}>♥</span>

                {/* block 1 */}
                <p className="mt-[clamp(10px,1.1vw,16px)] text-center leading-relaxed text-[#EFD9C9]"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,0.95vw,14px)' }}>
                  Handmade ice cream in small batches using classic recipes and real ingredients.
                </p>

                {/* diamond divider */}
                <div aria-hidden="true" className="my-[clamp(10px,1.1vw,16px)] flex items-center gap-2 w-[75%]">
                  <span className="flex-1 h-px" style={{ background: 'rgba(242,225,194,0.35)' }} />
                  <span className="text-[#F2E1C2] opacity-60" style={{ fontSize: 8 }}>✦</span>
                  <span className="flex-1 h-px" style={{ background: 'rgba(242,225,194,0.35)' }} />
                </div>

                {/* block 2 */}
                <p className="text-center leading-relaxed text-[#EFD9C9]"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,0.95vw,14px)' }}>
                  Pickup or delivery available on Uber&nbsp;Eats, DoorDash &amp; Grubhub.
                </p>

                {/* diamond divider */}
                <div aria-hidden="true" className="my-[clamp(10px,1.1vw,16px)] flex items-center gap-2 w-[75%]">
                  <span className="flex-1 h-px" style={{ background: 'rgba(242,225,194,0.35)' }} />
                  <span className="text-[#F2E1C2] opacity-60" style={{ fontSize: 8 }}>✦</span>
                  <span className="flex-1 h-px" style={{ background: 'rgba(242,225,194,0.35)' }} />
                </div>

                {/* block 3 */}
                <p className="text-center leading-relaxed text-[#EFD9C9]"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,0.95vw,14px)' }}>
                  We love our community and your suggestions!
                </p>

                {/* notched "ticket" button — double border frame */}
                {(() => {
                  const notch = (n: number) =>
                    `polygon(${n}px 0%,calc(100% - ${n}px) 0%,100% ${n}px,100% calc(100% - ${n}px),calc(100% - ${n}px) 100%,${n}px 100%,0% calc(100% - ${n}px),0% ${n}px)`;
                  return (
                    <a
                      href="#order"
                      onClick={(e) => { e.preventDefault(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="mt-[clamp(16px,1.8vw,24px)] w-full block"
                      style={{ clipPath: notch(7), background: '#3B1020', padding: '1.5px' }}
                    >
                      {/* cream gap */}
                      <div style={{ clipPath: notch(5), background: '#F5EADA', padding: '4px' }}>
                        {/* inner border */}
                        <div style={{ clipPath: notch(3), background: '#3B1020', padding: '1.5px' }}>
                          {/* cream fill + text */}
                          <div
                            className="flex items-center justify-center gap-3 whitespace-nowrap uppercase"
                            style={{
                              clipPath: notch(2),
                              background: '#F5EADA',
                              padding: '11px 16px',
                              fontFamily: 'var(--font-sans)',
                              fontSize: 'clamp(10px,0.82vw,12px)',
                              fontWeight: 700,
                              letterSpacing: '3px',
                              color: '#3B1020',
                            }}
                          >
                            Place an Order
                            <span aria-hidden="true">→</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })()}
              </div>
            </div>
          </div>

        </div>

        {/* footer strip — "Sweet Memories Start Here." */}
        <div className="mt-[clamp(18px,2.2vw,28px)] flex items-center justify-center gap-4 text-center">
          <svg aria-hidden="true" width="22" height="32" viewBox="0 0 20 30" className="opacity-80 shrink-0">
            <circle cx="10" cy="8" r="6.5" fill="none" stroke="var(--marionberry)" strokeWidth="1.4" />
            <path d="M3.8 13 L10 28.5 L16.2 13" fill="none" stroke="var(--marionberry)" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          <div>
            <div className="uppercase font-bold tracking-[3px] text-[#3B1E2B]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(11px,1vw,14px)' }}>
              Sweet Memories Start Here.
            </div>
            <div className="mt-[3px] text-[#6E5A54]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,0.85vw,12px)' }}>
              Thank you for supporting our family-run shop since 2007.
            </div>
          </div>
          <svg aria-hidden="true" width="30" height="30" viewBox="0 0 32 32" className="opacity-80 shrink-0">
            <path d="M4 12 h24 M6 12 v14 h20 v-14" fill="none" stroke="var(--marionberry)" strokeWidth="1.4" />
            <path d="M4 12 L7 6 h18 l3 6" fill="none" stroke="var(--marionberry)" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M12 26 v-8 h8 v8" fill="none" stroke="var(--pink)" strokeWidth="1.3" />
          </svg>
        </div>

        {/* original Step Inside poster cards */}
        <div className="mt-[clamp(16px,2.2vw,26px)] grid grid-cols-1 sm:grid-cols-2 gap-[clamp(12px,1.6vw,20px)]">
          {panels.map((p) => {
            const t = TONES[p.tone];
            return (
              <a
                key={p.title}
                href={hrefFor(p.target)}
                onClick={(e) => handleNav(e, p.target)}
                aria-label={`${p.title} — go to the ${p.target} section`}
                className="group relative flex items-stretch gap-3 rounded-[7px] border-2 p-[clamp(15px,1.7vw,20px)] min-h-[168px] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--gold)]"
                style={{
                  backgroundColor: t.bg,
                  backgroundImage: `linear-gradient(${t.scrim}, ${t.scrim}), url(${t.bgimg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  borderColor: t.border,
                  boxShadow: 'inset 0 0 0 2px rgba(255,244,214,0.35), 0 6px 16px rgba(28,13,12,0.2)',
                }}
              >
                <div className="tape-strip tape-peel top-[-8px] left-1/2 -translate-x-1/2 rotate-2" aria-hidden="true" />
                <div className="flex flex-col justify-between flex-1 min-w-0 pt-2">
                  <div>
                    <span className="block text-[10.5px] tracking-[3px] uppercase font-bold mb-1.5" style={{ color: t.eyebrow, fontFamily: 'var(--font-sans)' }}>{p.sub}</span>
                    <span className="block leading-[1.03] text-[clamp(21px,1.9vw,26px)]" style={{ color: t.title, fontFamily: 'var(--font-display)' }}>{p.title}</span>
                  </div>
                  <span className="mt-4 flex items-center gap-1.5 italic text-[12.5px] opacity-90" style={{ color: t.desc, fontFamily: 'var(--font-sans)' }}>
                    {p.desc}
                    <span aria-hidden="true" className="not-italic inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </div>
                <img
                  src={p.img}
                  alt=""
                  aria-hidden="true"
                  className="shrink-0 self-center w-[clamp(92px,11vw,128px)] h-auto object-contain transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-2"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(28,13,12,0.35))' }}
                />
              </a>
            );
          })}
        </div>

        {/* bottom ribbon */}
        <div
          className="mt-[clamp(14px,2vw,22px)] rounded-[5px] px-3 py-3 text-center border-2 ticket-notch relative"
          style={{ background: 'var(--brick)', borderColor: 'var(--gold-hi)', boxShadow: '0 6px 16px rgba(28,13,12,0.25)' }}
        >
          <div className="absolute inset-1 stitch-border border-[rgba(255,244,214,0.4)] pointer-events-none rounded-[2px]" aria-hidden="true" />
          <span className="text-[var(--cream-hi)] text-[11px] sm:text-[12.5px] tracking-[2px] uppercase font-bold relative z-10" style={{ fontFamily: 'var(--font-sans)', textShadow: '1px 1px 0 rgba(28,13,12,0.2)' }}>
            Locally Owned <span className="text-[var(--gold-hi)] mx-1">★</span> Small Business <span className="text-[var(--gold-hi)] mx-1">★</span> Big Heart <span className="text-[var(--gold-hi)] mx-1">★</span> @missozicecream
          </span>
        </div>
      </div>
    </section>
  );
}
