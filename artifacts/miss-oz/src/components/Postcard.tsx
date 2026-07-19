import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bunting } from './Decor';

/* Full-width homepage slideshow — real storefront photos with short brand slogans */
const SLIDES: { src: string; alt: string; slogan: string; pos?: string }[] = [
  {
    src: '/images/storefront-photo-wide2.webp',
    alt: "The Miss Oz storefront in Portland's Pearl District — a corner shop with a neon Open sign in the window, lantern lights glowing inside, and a bike parked out front",
    slogan: 'Small Batch, Big Heart',
  },
  {
    src: '/images/slide-corner.webp',
    alt: 'The brick corner of the shop at dusk, with a glowing ice cream cone sculpture of string lights above the awning and the pink Miss Oz sidewalk sign out front',
    slogan: 'On the Corner Since 2007',
    pos: 'center 62%',
  },
  {
    src: '/images/slide-counter.webp',
    alt: 'Inside the parlor — the glowing MISS OZ marquee letters above the chalkboard flavor menu and the striped ice cream counter',
    slogan: 'Made On-Site, All Natural',
    pos: 'center 38%',
  },
  {
    src: '/images/slide-cones.webp',
    alt: 'Two hand-dipped waffle cones with scoops of marionberry and ube ice cream, held up under the string lights by the pick-up sign',
    slogan: 'Hand-Dipped to Order',
    pos: 'center 55%',
  },
  {
    src: '/images/slide-sidewalk.webp',
    alt: 'The tree-lined Pearl District sidewalk outside the cafe, with the pink Miss Oz sign and Ice Cream & Coffee painted on the window',
    slogan: 'Come Slow Down With Us',
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
  { title: 'Handmade Ice Cream', sub: 'Small batch, big heart', desc: 'Classic recipes, real flavor', target: 'menu', tone: 'cream', img: '/images/panel-icecream.png' },
  { title: 'Pickup or Delivery', sub: "We've got you", desc: 'Uber Eats · DoorDash · Grubhub', target: 'menu', tone: 'teal', img: '/images/panel-delivery.png' },
  { title: 'Vote the Next Flavor', sub: 'Next flavor', desc: 'You decide what’s next', target: 'vote', tone: 'pink', img: '/images/panel-vote.png' },
  { title: 'Vintage Vibes', sub: 'Sweet times', desc: 'Slow down, stay awhile', target: 'about', tone: 'gold', img: '/images/panel-vibes.png' },
];

const FLAVORS = [
  'Mexican Vanilla',
  'Mint Chip',
  'Horchata Cookie',
  'Coffee Crackle',
  'Matcha',
  'Fresh Banana',
  'Salty Caramel',
  'Honey',
  'Kulfi',
  'Belgian Chocolate',
  'Birthday Cake',
  'Cookies & Cream',
  'Thai Iced Tea',
  'Peanut Butter Fudge',
  'Butter Pecan',
  'Marionberry',
];

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
  'linear-gradient(to bottom, transparent 0%, black 7%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)';

export default function Postcard() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500);
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

      {/* MASTHEAD — official logo centered, supporting text + navigation integrated around it */}
      <header className="relative z-20 mx-auto max-w-[1200px] px-[4vw] mt-[10px] sm:mt-[20px] mb-[clamp(18px,2.6vw,32px)]">
        {/* top double rule */}
        <div className="w-full border-t-[2.5px] border-b-[1px] border-[var(--cocoa)] h-[5px] sm:h-[7px] opacity-70 mb-[clamp(14px,2vw,24px)]" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-x-[clamp(20px,3vw,44px)] gap-y-4"
        >
          {/* left — supporting text + first half of the nav */}
          <div className="order-2 md:order-1 flex flex-col items-center md:items-end text-center md:text-right gap-[10px]">
            <span
              className="text-[9px] sm:text-[10px] tracking-[3px] sm:tracking-[4px] uppercase text-[var(--berry-deep)] opacity-80"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
            >
              Est. 2007 · Portland, Oregon
            </span>
            <span className="hidden md:inline-block w-[110px] h-px bg-[var(--cocoa)] opacity-35" aria-hidden="true" />
            <nav aria-label="Primary" className="flex flex-wrap justify-center md:justify-end items-center gap-x-[clamp(14px,1.6vw,24px)] gap-y-2">
              {NAV.slice(0, 3).map((n) => (
                <a
                  key={n.label}
                  href={hrefFor(n.target)}
                  onClick={(e) => handleNav(e, n.target)}
                  className="text-[11px] sm:text-[12px] tracking-[2.5px] uppercase font-bold text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          {/* center — the official logo */}
          <div className="order-1 md:order-2 flex justify-center">
            <h1 className="m-0">
              <img
                src="/images/logo-official.png"
                alt="Miss Oz — Ice Cream Cafe, Portland Oregon"
                className="w-[clamp(170px,22vw,250px)] h-auto"
                style={{ filter: 'drop-shadow(0 3px 8px rgba(93,26,58,0.18))' }}
              />
            </h1>
          </div>

          {/* right — supporting text + second half of the nav */}
          <div className="order-3 flex flex-col items-center md:items-start text-center md:text-left gap-[10px]">
            <span
              className="flex items-center gap-[8px] text-[9px] sm:text-[10px] tracking-[3px] sm:tracking-[4px] uppercase text-[var(--cocoa)]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
            >
              Ice Cream
              <span className="text-[var(--berry)] text-[8px] leading-none rotate-45 inline-block" aria-hidden="true">◆</span>
              Dessert Cafe
            </span>
            <span className="hidden md:inline-block w-[110px] h-px bg-[var(--cocoa)] opacity-35" aria-hidden="true" />
            <nav aria-label="Primary continued" className="flex flex-wrap justify-center md:justify-start items-center gap-x-[clamp(14px,1.6vw,24px)] gap-y-2">
              {NAV.slice(3).map((n) => (
                <a
                  key={n.label}
                  href={hrefFor(n.target)}
                  onClick={(e) => handleNav(e, n.target)}
                  className="text-[11px] sm:text-[12px] tracking-[2.5px] uppercase font-bold text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* bottom hairline */}
        <div className="w-full border-t border-[var(--cocoa)] opacity-35 mt-[clamp(14px,2vw,24px)]" aria-hidden="true" />
      </header>

      {/* HERO SCENE — storefront photos, slightly inset so the branding above stays the lead */}
      <div className="relative w-full z-0 pointer-events-none">
        <div
          className="w-full relative max-w-[800px] mx-auto px-[4vw] sm:px-0"
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
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.alt}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 0.95, scale: 1.06 }}
                exit={{ opacity: 0, scale: 1.07 }}
                transition={{
                  opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
                  scale: { duration: 7, ease: 'linear' },
                }}
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply sepia-[12%] saturate-[0.92] contrast-[1.04]"
                style={{ objectPosition: current.pos ?? 'center' }}
              />
            </AnimatePresence>

            {/* Soft vignette so the slogan reads against any photo */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[42%] pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(24,10,14,0.72) 0%, rgba(24,10,14,0.42) 42%, rgba(24,10,14,0) 100%)',
              }}
            />

            {/* Slogan over the lower part of each photo */}
            <div className="absolute left-0 right-0 bottom-[clamp(30px,5vw,58px)] flex justify-center px-6" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current.slogan}
                  initial={{ opacity: 0, y: 22, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* small gold eyebrow */}
                  <span
                    className="mb-[8px] flex items-center gap-[10px] text-[var(--gold-hi)]"
                    style={{ textShadow: '0 1px 3px rgba(20,10,8,0.8)' }}
                  >
                    <span className="inline-block w-[30px] h-px bg-[var(--gold-hi)] opacity-70" />
                    <span className="text-[9px] leading-none rotate-45 inline-block">◆</span>
                    <span className="inline-block w-[30px] h-px bg-[var(--gold-hi)] opacity-70" />
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(28px, 4vw, 54px)',
                      letterSpacing: '0.015em',
                      lineHeight: 1.08,
                      background:
                        'linear-gradient(180deg, #fdf6e3 0%, #f7e8c4 55%, #e8c98c 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      filter:
                        'drop-shadow(0 2px 0 rgba(74,26,36,0.55)) drop-shadow(0 4px 10px rgba(20,10,8,0.75)) drop-shadow(0 12px 34px rgba(20,10,8,0.55))',
                    }}
                  >
                    {current.slogan}
                  </span>
                  <span
                    className="mt-[9px] flex items-center gap-2 text-[var(--gold-hi)]"
                    style={{ textShadow: '0 1px 3px rgba(20,10,8,0.8)' }}
                  >
                    <span className="inline-block w-[56px] h-px bg-gradient-to-r from-transparent to-[var(--gold-hi)] opacity-90" />
                    <span className="text-[12px] leading-none">✦</span>
                    <span className="inline-block w-[56px] h-px bg-gradient-to-l from-transparent to-[var(--gold-hi)] opacity-90" />
                  </span>
                </motion.span>
              </AnimatePresence>
            </div>

            {/* slide dots */}
            <div
              className="absolute left-0 right-0 bottom-[clamp(12px,2vw,24px)] flex justify-center gap-[7px] pointer-events-auto"
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
                  className="w-[9px] h-[9px] rounded-full border border-[var(--cream-hi)] transition-opacity"
                  style={{
                    background: i === slide ? 'var(--cream-hi)' : 'transparent',
                    opacity: i === slide ? 1 : 0.55,
                    boxShadow: '0 1px 3px rgba(20,10,8,0.6)',
                  }}
                />
              ))}
            </div>
          </div>
          {/* Soft color wash linking the ink to the paper tone */}
          <div className="absolute inset-0 bg-[var(--gold)] opacity-[0.12] mix-blend-color pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {/* SECTION PANELS — poster-like taped cards, click to explore */}
      <div className="relative z-20 mx-auto max-w-[1080px] px-[4vw] sm:px-0 mt-[clamp(18px,2.4vw,30px)]">
        <div className="flex items-center justify-center gap-3 mb-[clamp(14px,1.8vw,22px)]">
          <span className="w-10 h-px bg-[var(--gold)] opacity-60" aria-hidden="true" />
          <span className="text-[var(--berry-deep)] text-[12px] tracking-[4px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Step Inside</span>
          <span className="w-10 h-px bg-[var(--gold)] opacity-60" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] lg:grid-cols-[230px_1fr] gap-[clamp(16px,2vw,26px)] items-stretch">
          {/* Chalkboard easel navigation — like the old parlor sign by the door */}
          <nav
            aria-label="Site sections"
            className="relative mx-auto w-full max-w-[300px] md:max-w-none md:flex md:flex-col md:pb-[26px]"
          >
            {/* easel legs */}
            <div aria-hidden="true" className="hidden md:block absolute -bottom-[26px] left-[24px] w-[10px] h-[44px] rotate-[9deg] rounded-[2px]" style={{ background: 'linear-gradient(160deg, #8a3030, #5f1f1f)' }} />
            <div aria-hidden="true" className="hidden md:block absolute -bottom-[26px] right-[24px] w-[10px] h-[44px] -rotate-[9deg] rounded-[2px]" style={{ background: 'linear-gradient(160deg, #8a3030, #5f1f1f)' }} />
            {/* little striped parlor awning over the sign */}
            <div aria-hidden="true" className="relative z-10 mx-[6px] -mb-[3px]">
              <div
                className="h-[14px] rounded-t-[6px]"
                style={{
                  background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 22px, var(--teal-deep) 22px 44px)',
                  boxShadow: 'inset 0 -4px 8px rgba(28,13,12,0.28), 0 3px 8px rgba(0,0,0,0.3)',
                }}
              />
              <div
                className="h-[9px]"
                style={{
                  background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 22px, var(--teal-deep) 22px 44px)',
                  WebkitMaskImage: 'radial-gradient(11px at 50% 0, #000 98%, transparent 100%)',
                  maskImage: 'radial-gradient(11px at 50% 0, #000 98%, transparent 100%)',
                  WebkitMaskSize: '22px 100%',
                  maskSize: '22px 100%',
                  WebkitMaskRepeat: 'repeat-x',
                  maskRepeat: 'repeat-x',
                  filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.25))',
                }}
              />
            </div>
            {/* wooden frame */}
            <div
              className="relative rounded-[8px] p-[9px] md:flex-1 md:flex"
              style={{
                background: 'linear-gradient(160deg, #6b4a2e, #4b3120 55%, #5d3f27)',
                boxShadow: '0 18px 40px rgba(28,13,12,0.35), inset 0 0 0 1.5px rgba(227,180,76,0.45), inset 0 2px 5px rgba(255,255,255,0.12)',
              }}
            >
              <div
                className="rounded-[4px] px-4 py-6 md:flex-1 flex flex-row md:flex-col flex-wrap items-center justify-center gap-x-5 gap-y-[14px] md:gap-y-[22px]"
                style={{
                  background:
                    'radial-gradient(120% 90% at 30% 20%, rgba(255,255,255,0.06), transparent 60%), linear-gradient(160deg, #1c4a46 0%, #143633 55%, #1a423e 100%)',
                  boxShadow: 'inset 0 0 0 1.5px rgba(28,13,12,0.6), inset 0 0 24px rgba(0,0,0,0.35)',
                }}
              >
                {NAV.map((item, i) => (
                  <a
                    key={item.label}
                    href={hrefFor(item.target)}
                    onClick={(e) => handleNav(e, item.target)}
                    className="nav-link transition-colors text-center focus-visible:outline-none focus-visible:text-[var(--gold-hi)]"
                    style={{
                      fontFamily: i === 0 ? 'var(--font-sans)' : i % 2 === 0 ? 'var(--font-script-alt)' : 'var(--font-sans)',
                      fontSize: i === 0 ? 15 : i % 2 === 0 ? 20 : 14,
                      letterSpacing: i % 2 === 0 && i !== 0 ? '0.5px' : '2px',
                      textTransform: i % 2 === 0 && i !== 0 ? 'none' : 'uppercase',
                      fontWeight: 700,
                      color: i === 0 ? '#f3ead6' : i % 3 === 0 ? 'var(--pink)' : i % 2 === 0 ? 'var(--gold-hi)' : '#e9e0cc',
                      textShadow: '0 0 10px rgba(243,234,214,0.15)',
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Big wood-framed board: menu board in the middle, chalkboard welcome panel on the right */}
          <div className="relative">
          {/* striped parlor awning over the big board */}
          <div aria-hidden="true" className="relative z-10 mx-[8px] -mb-[3px]">
            <div
              className="h-[22px] md:h-[26px] rounded-t-[8px]"
              style={{
                background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 36px, var(--berry-deep) 36px 72px)',
                boxShadow: 'inset 0 -6px 11px rgba(28,13,12,0.28), 0 4px 10px rgba(0,0,0,0.32)',
              }}
            />
            <div
              className="h-[12px] md:h-[14px]"
              style={{
                background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 36px, var(--berry-deep) 36px 72px)',
                WebkitMaskImage: 'radial-gradient(18px at 50% 0, #000 98%, transparent 100%)',
                maskImage: 'radial-gradient(18px at 50% 0, #000 98%, transparent 100%)',
                WebkitMaskSize: '36px 100%',
                maskSize: '36px 100%',
                WebkitMaskRepeat: 'repeat-x',
                maskRepeat: 'repeat-x',
                filter: 'drop-shadow(0 4px 5px rgba(0,0,0,0.28))',
              }}
            />
          </div>
          <div
            className="relative rounded-b-[10px] p-[10px] md:p-[12px]"
            style={{
              background: 'linear-gradient(160deg, #6b4a2e, #4b3120 55%, #5d3f27)',
              boxShadow:
                '0 26px 60px rgba(28,13,12,0.4), inset 0 0 0 2px rgba(227,180,76,0.5), inset 0 2px 6px rgba(255,255,255,0.12), inset 0 -3px 8px rgba(0,0,0,0.4)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] rounded-[5px] overflow-hidden" style={{ boxShadow: 'inset 0 0 0 1.5px rgba(28,13,12,0.6)' }}>
              {/* MIDDLE — big chalkboard menu board */}
              <div
                className="relative flex flex-col items-center px-[24px] md:px-[36px] py-[34px] md:py-[42px]"
                style={{
                  background:
                    'radial-gradient(120% 90% at 35% 15%, rgba(255,255,255,0.05), transparent 60%), linear-gradient(160deg, #24302a 0%, #1c2521 55%, #212c26 100%)',
                  boxShadow: 'inset 0 0 28px rgba(0,0,0,0.4)',
                }}
              >
                {/* arched board header */}
                <div
                  className="w-full max-w-[430px] text-center pt-[22px] pb-[16px] px-4"
                  style={{
                    borderRadius: '50% 50% 6px 6px / 42% 42% 6px 6px',
                    boxShadow: 'inset 0 0 0 2px rgba(227,180,76,0.55), inset 0 0 22px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="text-[var(--gold-hi)] leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,2.6vw,36px)', textShadow: '0 0 14px rgba(227,180,76,0.3)' }}>
                    Miss Oz
                  </div>
                  <div className="mt-[6px] text-[11px] tracking-[4px] uppercase font-bold text-[#f3ead6] opacity-85" style={{ fontFamily: 'var(--font-sans)' }}>
                    Ice Cream &amp; Sorbet
                  </div>
                  <div className="mt-[4px] text-[var(--pink)]" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(17px,1.7vw,21px)', textShadow: '0 0 10px rgba(240,170,190,0.25)' }}>
                    homemade flavors
                  </div>
                </div>

                {/* chalk flavor list — copied from the flavor boards in the shop photos */}
                <ul className="mt-[22px] w-full max-w-[430px] flex-1 content-center grid grid-cols-2 gap-x-[26px] gap-y-[10px] text-left">
                  {FLAVORS.map((f, i) => (
                    <li
                      key={f}
                      className="leading-snug"
                      style={{
                        fontFamily: i % 5 === 2 ? 'var(--font-script-alt)' : 'var(--font-sans)',
                        fontSize: i % 5 === 2 ? 17 : 13.5,
                        letterSpacing: i % 5 === 2 ? '0.4px' : '1.6px',
                        textTransform: i % 5 === 2 ? 'none' : 'uppercase',
                        fontWeight: 600,
                        color: i % 4 === 1 ? 'var(--gold-hi)' : i % 4 === 3 ? 'var(--pink)' : '#ece3cd',
                        textShadow: '0 0 8px rgba(243,234,214,0.12)',
                      }}
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-[14px] flex items-center gap-3 text-[var(--gold-hi)] opacity-80" aria-hidden="true">
                  <span className="h-px w-12" style={{ background: 'currentColor' }} />
                  <span className="text-[11px]">✦</span>
                  <span className="h-px w-12" style={{ background: 'currentColor' }} />
                </div>
                <div className="mt-[10px] text-[11px] tracking-[3px] uppercase font-bold text-[#e9e0cc] opacity-70 text-center" style={{ fontFamily: 'var(--font-sans)' }}>
                  Churned fresh · rotating case
                </div>
              </div>

              {/* RIGHT — berry-painted welcome panel */}
              <div
                className="flex flex-col items-center justify-center text-center px-[26px] md:px-[34px] py-[38px] md:py-[46px]"
                style={{
                  background:
                    'radial-gradient(120% 90% at 30% 20%, rgba(255,255,255,0.07), transparent 60%), linear-gradient(160deg, #5e2334 0%, #491a29 55%, #55202f 100%)',
                  boxShadow: 'inset 0 0 24px rgba(0,0,0,0.35), inset 1.5px 0 0 rgba(227,180,76,0.35)',
                }}
              >
                <div
                  className="text-[var(--gold-hi)] leading-[1.06]"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,2.4vw,32px)', textShadow: '0 0 12px rgba(227,180,76,0.25)' }}
                >
                  ~ Come Slow Down ~
                  <br />
                  With Us!
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-[#e9e0cc] max-w-[320px]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Handmade ice cream in small batches — classic recipes, real flavor. Pickup or delivery on Uber&nbsp;Eats, DoorDash &amp; Grubhub, or come vote the next flavor.
                </p>
                <div className="mt-5 text-[var(--pink)]" style={{ fontFamily: 'var(--font-script-alt)', fontSize: 21, textShadow: '0 0 10px rgba(240,170,190,0.25)' }}>
                  Miss Oz Ice Cream &amp; Dessert Cafe
                </div>
                <div className="mt-4 text-[13px] tracking-[2px] uppercase font-bold text-[#f3ead6] opacity-80" style={{ fontFamily: 'var(--font-sans)' }}>
                  ~ Est. 2007 ~
                </div>
                <a
                  href="#menu"
                  onClick={(e) => handleNav(e, 'menu')}
                  className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-[12px] text-[13px] font-bold tracking-[1.5px] uppercase text-[var(--berry-deep)] bg-[var(--cream-hi)] transition-transform duration-200 mech-btn hover:bg-[var(--gold-hi)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-hi)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1d2622]"
                >
                  Place an Order
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          </div>
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
