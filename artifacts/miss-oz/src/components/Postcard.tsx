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
  { label: 'Menu', target: 'step-inside' },
  { label: 'Order Online', target: 'ubereats' },
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

const UBEREATS_URL = 'https://www.ubereats.com/store/miss-oz-ice-cream-cafe-aka-cool-moon-ice-creams/YEfj7ZgZS2m7Wm2og7PphQ';

const hrefFor = (t: string) => (t === 'ubereats' ? UBEREATS_URL : t === 'home' ? '#home' : `#${t}`);

function handleNav(e: React.MouseEvent<HTMLAnchorElement>, target: string) {
  if (target === 'ubereats') return; // let the browser open the external link
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
      <header className="relative z-20 mx-auto max-w-[1400px] px-[4vw] mt-[6px] sm:mt-[12px] mb-[clamp(64px,8.5vw,116px)]">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative grid items-stretch"
          style={{
            gridTemplateColumns: 'minmax(0,1fr) clamp(200px,22vw,260px) minmax(0,1fr)',
            minHeight: 'clamp(84px,9.5vw,112px)',
            overflow: 'visible',
          }}
        >
          {/* LEFT — rules stop before the logo; nav vertically centered between them */}
          <div className="flex flex-col justify-center py-[clamp(10px,1.1vw,14px)]" style={{ borderTop: '1.5px solid var(--marionberry)', borderBottom: '1.5px solid var(--marionberry)' }}>
            <div className="flex items-center justify-center gap-[clamp(14px,2.6vw,44px)]">
            <nav aria-label="Primary" className="flex items-center justify-center gap-[clamp(14px,2.6vw,44px)]">
              {NAV.slice(0, 3).map((n) => (
                <a
                  key={n.label}
                  href={hrefFor(n.target)}
                  onClick={(e) => handleNav(e, n.target)}
                  className="whitespace-nowrap uppercase font-bold text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,0.95vw,12px)', letterSpacing: 'clamp(1.5px,0.2vw,2.5px)' }}
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <a
              href="#oz"
              onClick={(e) => handleNav(e, 'oz')}
              className="group relative text-center leading-snug hidden md:block cursor-pointer transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
              style={{
                fontFamily: 'var(--font-sans)',
                color: '#9A6E0B',
                letterSpacing: '2px',
                fontSize: 'clamp(9px,0.75vw,11px)',
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
            >
              <span aria-hidden="true" className="absolute -top-[10px] -left-[12px] text-[9px] text-[var(--gold,#B8860B)]" style={{ animation: 'twinkle 2.6s 0s infinite' }}>✦</span>
              <span aria-hidden="true" className="absolute -bottom-[9px] -right-[10px] text-[8px] text-[var(--berry)]" style={{ animation: 'twinkle 2.6s 0.9s infinite' }}>✦</span>
              <span aria-hidden="true" className="absolute -top-[8px] -right-[16px] text-[7px] text-[var(--gold,#B8860B)]" style={{ animation: 'twinkle 2.6s 1.7s infinite' }}>✦</span>
              <span className="block transition-colors group-hover:text-[var(--berry)] meet-oz-wiggle">
                Small Batch Big Heart
                <br />
                <span className="inline-block mt-[2px] tracking-[1.5px] text-[var(--berry)] group-hover:text-[var(--gold,#B8860B)]">
                  <span aria-hidden="true" className="inline-block mr-[3px] meet-oz-heart">♥</span>
                  Meet Oz!
                  <span aria-hidden="true" className="inline-block ml-[3px] meet-oz-arrow">→</span>
                </span>
              </span>
            </a>
            </div>
          </div>

          {/* CENTER — open gap; logo absolutely anchored */}
          <div aria-hidden="true" />

          {/* RIGHT — rules stop before the logo; nav vertically centered between them */}
          <div className="flex flex-col justify-center py-[clamp(10px,1.1vw,14px)]" style={{ borderTop: '1.5px solid var(--marionberry)', borderBottom: '1.5px solid var(--marionberry)' }}>
            <nav aria-label="Primary continued" className="flex items-center justify-center gap-[clamp(10px,1.8vw,30px)]">
              {NAV.slice(3).map((n) => (
                <a
                  key={n.label}
                  href={hrefFor(n.target)}
                  {...(n.target === 'ubereats' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={(e) => handleNav(e, n.target)}
                  className="whitespace-nowrap uppercase font-bold text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,0.95vw,12px)', letterSpacing: 'clamp(1.5px,0.2vw,2.5px)' }}
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          {/* LOGO + TAGLINE — absolutely centered, filling the open middle gap */}
          <div
            className="absolute left-1/2 top-1/2 z-20 flex flex-col items-center"
            style={{ transform: 'translate(-52.18%, -50%)', overflow: 'visible' }}
          >
            <img
              src="/images/logo-official.webp"
              alt="Miss Oz — Ice Cream Cafe, Portland Oregon"
              className="h-auto"
              style={{ width: 'clamp(220px,23.5vw,290px)', filter: 'drop-shadow(0 2px 10px rgba(93,26,58,0.18))' }}
            />
          </div>
        </motion.div>
      </header>

      {/* HERO SCENE — composite: cone foreground left + rotating café backdrop right.
          z-[955] lifts the photo above the fixed paper (940) / grain (950) overlays so it stays
          bright and natural, while staying below the marquee frame (960). */}
      <div className="relative w-full z-[955] pointer-events-none">
        <div
          className="w-full relative max-w-[1400px] mx-auto px-[4vw]"
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
                  fontSize: 'clamp(56px,8.8vw,126px)',
                  lineHeight: 1,
                  color: '#EBC77F',
                  WebkitTextStroke: 'clamp(6px,0.8vw,12px) var(--berry)',
                  paintOrder: 'stroke fill',
                  textShadow: '0 2px 22px rgba(20,8,12,0.6), 0 3px 6px rgba(20,8,12,0.45)',
                }}
              >
                <span style={{ fontSize: '1.18em' }}>M</span>iss <span style={{ fontSize: '1.18em' }}>O</span>z
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
                  fontFamily: "'Libertinus Math', serif",
                  fontSize: 'clamp(12px,1.15vw,17px)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: '#EBC77F',
                  textShadow: '0 1px 6px rgba(20,8,12,0.75)',
                  marginTop: 'clamp(8px,1vw,14px)',
                }}
              >
                Small Batch Ice Cream &amp; Handmade Desserts
              </div>
              <div
                className="flex items-center justify-center gap-[clamp(10px,1vw,16px)]"
                style={{
                  fontFamily: "'Libertinus Math', serif",
                  fontSize: 'clamp(11px,1vw,15px)',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'rgba(251,242,223,0.95)',
                  textShadow: '0 1px 6px rgba(20,8,12,0.75)',
                  marginTop: 'clamp(6px,0.7vw,10px)',
                }}
              >
                <span aria-hidden="true" className="inline-block h-px w-[clamp(24px,3vw,48px)]" style={{ background: 'rgba(251,242,223,0.6)' }} />
                Since 2007
                <span aria-hidden="true" className="inline-block h-px w-[clamp(24px,3vw,48px)]" style={{ background: 'rgba(251,242,223,0.6)' }} />
              </div>
              <div aria-hidden="true" style={{ color: '#F4A9C7', fontSize: 'clamp(11px,1vw,15px)', marginTop: 'clamp(6px,0.7vw,10px)', textShadow: '0 1px 6px rgba(20,8,12,0.6)' }}>♥</div>
              {/* CTA buttons */}
              <div className="flex flex-wrap justify-center gap-[clamp(8px,0.8vw,12px)] mt-[clamp(12px,1.6vw,20px)] pointer-events-auto">
                <a
                  href="#menu"
                  onClick={(e) => handleNav(e, 'menu')}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--berry-deep)] text-[#fbf2df] font-bold tracking-[2px] uppercase transition-all duration-200 hover:bg-[var(--berry)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  style={{ fontFamily: "'Libertinus Math', serif", fontSize: 'clamp(11px,0.95vw,14px)', padding: '9px clamp(20px,1.9vw,30px)', border: '1px solid rgba(251,242,223,0.25)' }}
                >
                  View Menu
                </a>
                <button
                  type="button"
                  onClick={() => { window.open('https://www.ubereats.com/store/miss-oz-ice-cream-cafe-aka-cool-moon-ice-cream/YEfj7ZgZS2m7Wm2og7PphQ', '_blank', 'noopener'); }}
                  className="inline-flex items-center justify-center rounded-full text-[#fbf2df] font-bold tracking-[2px] uppercase transition-all duration-200 hover:bg-[rgba(251,242,223,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  style={{ fontFamily: "'Libertinus Math', serif", fontSize: 'clamp(11px,0.95vw,14px)', padding: '9px clamp(20px,1.9vw,30px)', border: '1.5px solid rgba(251,242,223,0.7)' }}
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
          className="mx-auto max-w-[1400px] px-[4vw] sm:px-[4vw]"
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
      <div id="step-inside" className="relative z-20 mx-auto max-w-[1300px] px-[4vw] sm:px-0 mt-[clamp(18px,2.4vw,30px)]" style={{ scrollMarginTop: '24px' }}>
        <div className="flex items-center justify-center gap-3 mb-[clamp(14px,1.8vw,22px)]">
          <span className="w-10 h-px bg-[var(--gold)] opacity-60" aria-hidden="true" />
          <span className="text-[var(--berry-deep)] text-[12px] tracking-[4px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Step Inside</span>
          <span className="w-10 h-px bg-[var(--gold)] opacity-60" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[270px_1fr_270px] lg:grid-cols-[302px_1fr_302px] gap-[clamp(14px,1.8vw,22px)] items-stretch">

          {/* LEFT — forest-green menu category card with striped awning (decorative list, like a painted parlor sign) */}
          <aside aria-label="Menu categories" className="relative mx-auto w-full max-w-[320px] md:max-w-none flex flex-col">
            {/* striped awning — cream + marionberry */}
            <div aria-hidden="true" className="relative z-10 -mb-[2px]">
              <div className="h-[14px] rounded-t-[10px]" style={{ background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 22px, var(--berry-deep) 22px 44px)', boxShadow: 'inset 0 -4px 8px rgba(28,13,12,0.2), 0 3px 8px rgba(0,0,0,0.18)' }} />
              <div className="h-[9px]" style={{ background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 22px, var(--berry-deep) 22px 44px)', WebkitMaskImage: 'radial-gradient(11px at 50% 0, #000 98%, transparent 100%)', maskImage: 'radial-gradient(11px at 50% 0, #000 98%, transparent 100%)', WebkitMaskSize: '22px 100%', maskSize: '22px 100%', WebkitMaskRepeat: 'repeat-x', maskRepeat: 'repeat-x', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.18))' }} />
            </div>
            <div
              className="flex-1 flex flex-col items-center rounded-b-[12px] px-3 py-[clamp(14px,1.6vw,20px)]"
              style={{
                background: 'linear-gradient(165deg, #17352B 0%, #122B23 55%, #16332A 100%)',
                boxShadow: '0 14px 34px rgba(28,13,12,0.3), inset 0 0 0 1.5px rgba(242,225,194,0.3)',
              }}
            >
              {/* inner frame — double tan lines with chamfered "dent" corners, lighter green inside */}
              <div className="flex-1 w-full flex flex-col" style={{ background: 'rgba(242,225,194,0.55)', clipPath: 'polygon(22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px), 0 22px)', padding: '1px' }}>
                <div className="flex-1 flex flex-col" style={{ background: '#152F26', clipPath: 'polygon(21px 0, calc(100% - 21px) 0, 100% 21px, 100% calc(100% - 21px), calc(100% - 21px) 100%, 21px 100%, 0 calc(100% - 21px), 0 21px)', padding: '3px' }}>
                  <div className="flex-1 flex flex-col" style={{ background: 'rgba(242,225,194,0.8)', clipPath: 'polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)', padding: '1px' }}>
              <div className="flex-1 w-full flex flex-col items-center justify-center px-4 py-[clamp(18px,2vw,28px)]"
                style={{
                  background: 'radial-gradient(120% 90% at 30% 15%, rgba(255,255,255,0.07), transparent 60%), linear-gradient(165deg, #2B5D4C 0%, #224C3E 55%, #275544 100%)',
                  clipPath: 'polygon(17px 0, calc(100% - 17px) 0, 100% 17px, 100% calc(100% - 17px), calc(100% - 17px) 100%, 17px 100%, 0 calc(100% - 17px), 0 17px)',
                  gap: 'clamp(18px,2.2vw,30px)',
                }}>

                {/* category list */}
                <div className="w-full flex flex-col items-center pt-[clamp(14px,1.6vw,22px)]">
                  {MENU_CATEGORIES.map((c, i) => (
                    <div key={c} className="flex flex-col items-center w-full">
                      {i > 0 && (
                        <span aria-hidden="true" className="text-[var(--pink)] opacity-75 my-[clamp(9px,1vw,14px)]" style={{ fontSize: 10 }}>✦</span>
                      )}
                      <span
                        className="text-center font-bold uppercase tracking-[3.5px] text-[#F2E1C2]"
                        style={{ fontFamily: "'Libertinus Math', serif", fontSize: 'clamp(15px,1.35vw,19px)' }}
                      >
                        {c}
                      </span>
                    </div>
                  ))}
                </div>

                {/* cone icon + tagline */}
                <div className="flex flex-col items-center mt-[clamp(14px,1.6vw,22px)]">
                  <img
                    src="/images/icon-icecream-cone.png"
                    alt=""
                    aria-hidden="true"
                    style={{ width: 'clamp(46px,5vw,66px)', height: 'auto' }}
                  />
                  <div className="mt-[clamp(7px,0.8vw,11px)] text-center text-[var(--pink)]"
                    style={{ fontFamily: "'Cookie', cursive", fontSize: 'clamp(24px,2.2vw,32px)', lineHeight: 0.95 }}>
                    Small Batch
                    <br />
                    Big Heart
                  </div>
                </div>

              </div>
                  </div>
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
                <span aria-hidden="true" className="text-[10px] text-[var(--pink)]">✦</span>
                <h3 className="uppercase font-bold tracking-[4px] text-[#3B1E2B]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px,1.9vw,26px)' }}>
                  Ice Cream Flavors
                </h3>
                <span aria-hidden="true" className="text-[10px] text-[var(--pink)]">✦</span>
              </div>
              <div className="mt-0 text-[var(--marionberry)]" style={{ fontFamily: "'Cookie', cursive", fontStyle: 'normal', fontSize: 'clamp(23px,2.1vw,31px)', lineHeight: 1, marginTop: '-2px' }}>
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
                        <div className="uppercase font-bold tracking-[2px] text-[#3B1E2B]" style={{ fontFamily: "'Libertinus Math', serif", fontSize: 'clamp(11px,0.95vw,13px)' }}>
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
                <img src="/images/icon-milk.png" alt="" aria-hidden="true" className="shrink-0 mt-[2px]" style={{ width: 'clamp(30px,2.6vw,36px)', height: 'auto' }} />
                <div>
                  <div className="uppercase font-bold tracking-[2px] text-[#3B1E2B]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.85vw,12px)' }}>Churned Fresh</div>
                  <div className="mt-[2px] leading-snug text-[#6E5A54]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,0.8vw,11.5px)' }}>
                    We make our ice cream in small batches every week for the best flavor and texture.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <img src="/images/icon-seasons.png" alt="" aria-hidden="true" className="shrink-0 mt-[2px]" style={{ width: 'clamp(30px,2.6vw,36px)', height: 'auto' }} />
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
                  Pickup or delivery available on Uber&nbsp;Eats &amp; Grubhub.
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

                {/* vintage admission-ticket CTA — side notches + perforated inner line */}
                <a
                  href={UBEREATS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-[clamp(16px,1.8vw,24px)] w-full block transition-transform duration-200 hover:-translate-y-[3px] hover:scale-[1.03] active:scale-[0.98]"
                  style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }}
                >
                  <span
                    className="block relative overflow-hidden ticket-shine motion-safe:animate-[ticketFloat_4s_ease-in-out_infinite]"
                    style={{
                      background: 'linear-gradient(180deg, #F7EDDD 0%, #F2E4CC 100%)',
                      borderRadius: '6px',
                      padding: '5px',
                      WebkitMaskImage:
                        'radial-gradient(circle 8px at 0 50%, transparent 96%, #000 100%), radial-gradient(circle 8px at 100% 50%, transparent 96%, #000 100%)',
                      maskImage:
                        'radial-gradient(circle 8px at 0 50%, transparent 96%, #000 100%), radial-gradient(circle 8px at 100% 50%, transparent 96%, #000 100%)',
                      WebkitMaskComposite: 'source-in',
                      maskComposite: 'intersect',
                    }}
                  >
                    <span
                      className="flex flex-col items-center justify-center"
                      style={{ border: '1.5px dashed rgba(59,16,32,0.55)', borderRadius: '4px', padding: '11px 22px 12px' }}
                    >
                      <span
                        className="uppercase whitespace-nowrap"
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '7px', letterSpacing: '1px', fontWeight: 700, color: 'rgba(59,16,32,0.55)' }}
                      >
                        ✦ Admit One Sweet Tooth ✦
                      </span>
                      <span
                        className="flex items-center gap-2 whitespace-nowrap uppercase"
                        style={{
                          fontFamily: "'DM Serif Display', serif",
                          fontSize: 'clamp(11px,0.85vw,13px)',
                          letterSpacing: '1.5px',
                          color: '#3B1020',
                          lineHeight: 1.3,
                        }}
                      >
                        Place an Order
                        <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">→</span>
                      </span>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* footer strip — "Sweet Memories Start Here." */}
        <div className="mt-[clamp(18px,2.2vw,28px)] flex items-center justify-center gap-4 text-center">
          <img src="/images/icon-icecream-cup.png" alt="" aria-hidden="true" className="shrink-0" style={{ width: 'clamp(34px,3vw,42px)', height: 'auto' }} />
          <div>
            <div className="uppercase font-bold tracking-[3px] text-[#3B1E2B]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(11px,1vw,14px)' }}>
              Sweet Memories Start Here.
            </div>
            <div className="mt-[3px] text-[#6E5A54]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,0.85vw,12px)' }}>
              Thank you for supporting our family-run shop since 2007.
            </div>
          </div>
          <img src="/images/icon-icecream-cart.png" alt="" aria-hidden="true" className="shrink-0" style={{ width: 'clamp(34px,3vw,42px)', height: 'auto' }} />
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
