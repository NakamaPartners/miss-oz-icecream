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
    src: '/images/slide-interior-bar.webp',
    alt: 'The Miss Oz interior — chalkboard menus, colorful bunting, pendant lights, and a full display case of flavors behind the counter',
    pos: 'center 58%',
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
    src: '/images/slide-counter.webp',
    alt: 'The Miss Oz ice cream counter — illuminated Miss Oz sign, chalkboard menus, string lights, and glass display cases',
    pos: 'center 48%',
  },
];

const NAV = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Wholesale', target: 'wholesale' },
  { label: 'Event', target: 'events' },
  { label: 'Contact', target: 'contact' },
];
// Desktop header split: NAV.slice(0, 2) → left | NAV.slice(2) → right

type Tone = 'cream' | 'teal' | 'pink' | 'gold';

const TONES: Record<Tone, { bg: string; border: string; title: string; desc: string; eyebrow: string; scrim: string; bgimg: string }> = {
  cream: { bg: 'var(--paper)', border: 'var(--teal-deep)', title: 'var(--cocoa)', desc: 'var(--cocoa)', eyebrow: 'var(--teal-deep)', scrim: 'rgba(239,226,196,0.42)', bgimg: '/images/panelbg-cream.webp' },
  teal: { bg: 'var(--teal-deep)', border: 'var(--gold)', title: 'var(--cream-hi)', desc: 'var(--gold-hi)', eyebrow: 'var(--gold-hi)', scrim: 'rgba(23,63,60,0.5)', bgimg: '/images/panelbg-teal.webp' },
  pink: { bg: 'var(--pink)', border: 'var(--berry)', title: 'var(--berry-deep)', desc: 'var(--cocoa)', eyebrow: 'var(--berry)', scrim: 'rgba(234,184,206,0.4)', bgimg: '/images/panelbg-pink.webp' },
  gold: { bg: 'var(--gold)', border: 'var(--brick)', title: 'var(--cocoa)', desc: 'var(--cocoa)', eyebrow: 'var(--cocoa)', scrim: 'rgba(199,154,59,0.48)', bgimg: '/images/panelbg-gold.webp' },
};


const FLAVORS: { name: string; desc: string }[] = [
  { name: 'Mexican Vanilla', desc: 'Extra rich vanilla flavor from 4-fold vanilla extract.' },
  { name: 'Matcha', desc: 'Ceremonial-grade matcha with an earthy, smooth flavor.' },
  { name: 'Kulfi', desc: 'Traditional Indian cardamom & pistachio' },
  { name: 'Birthday Cake', desc: 'Sweet yellow cake with confetti sprinkles.' },
  { name: 'Butter Pecan', desc: 'Toasted pecans in our house-made Scotch sauce.' },
  { name: 'Salty Caramel', desc: 'Buttery caramel with sea salt' },
  { name: 'Mint Chip', desc: 'Fresh mint steeped with loose-leaf tea and mixed with semi-sweet chocolate chips.' },
  { name: 'Coffee Crackle', desc: 'Coffee ice cream with chocolate crackle' },
  { name: 'Fresh Banana', desc: 'Real banana. Naturally sweet' },
  { name: 'Belgian Chocolate', desc: 'House-made chocolate base with premium Sudan cocoa powder.' },
  { name: 'Cookies & Cream', desc: 'Oreo cookies folded into sweet cream.' },
  { name: 'Marionberry', desc: 'Oregon marionberries in creamy goodness' },
];

const MENU_CATEGORIES = ['Flavors', 'Sundaes', 'Croffles & Desserts', 'Drinks', 'Whole Cakes'];

type MenuItem = { name: string; note?: string; details?: string[] };
const MENU_ITEMS: Record<string, MenuItem[]> = {
  Sundaes: [
    { name: 'Rose City Banana Split', note: 'Vanilla, strawberry, and chocolate ice cream with three different sauces, topped with whipped cream, sprinkles, and cherries.' },
  ],
  Drinks: [
    { name: 'Root Beer Float', note: 'Creamy house vanilla in an icy frosted mug' },
    { name: 'Coke Float', note: 'Classic cola with a generous scoop — simple perfection' },
    { name: 'Milkshakes', note: 'Blended thick & rich in any of our rotating flavors' },
  ],
  'Whole Cakes': [
    {
      name: 'Original Basque Cheesecake',
      details: ['6" — $45', '8" — $60 (8 slices)', '10" — $75 (12 slices)'],
    },
  ],
};

const UBEREATS_URL = 'https://www.ubereats.com/store/miss-oz-ice-cream-cafe-aka-cool-moon-ice-creams/YEfj7ZgZS2m7Wm2og7PphQ';

const hrefFor = (t: string) => (t === 'ubereats' ? UBEREATS_URL : t === 'home' ? '#home' : `#${t}`);

function BasqueCheesecakeIllustration() {
  return (
    <svg viewBox="0 0 180 150" role="img" aria-label="Illustration of a Basque cheesecake" className="w-full h-full">
      <ellipse cx="90" cy="126" rx="68" ry="13" fill="#6b3a3b" opacity=".14" />
      <path d="M28 112c5 9 29 16 62 16s57-7 62-16l-4-16H32Z" fill="#e5c992" stroke="#6b3a3b" strokeWidth="3" />
      <path d="M32 97c0-15 26-28 58-28s58 13 58 28-26 24-58 24-58-9-58-24Z" fill="#dcae68" stroke="#6b3a3b" strokeWidth="3" />
      <path d="M37 91c4-16 25-29 53-29s49 13 53 29c-12 8-30 12-53 12s-41-4-53-12Z" fill="#70402f" stroke="#48252a" strokeWidth="3" />
      <path d="M48 82c9-10 23-15 42-15 18 0 32 5 42 15-12 5-26 8-42 8-17 0-31-3-42-8Z" fill="#9a5b3d" opacity=".7" />
      <path d="M64 76c5-5 8-8 10-13M91 83c-2-7 0-13 4-19M116 79c-2-4-2-8 0-12" fill="none" stroke="#e0a56b" strokeWidth="3" strokeLinecap="round" opacity=".75" />
      <circle cx="137" cy="48" r="10" fill="#9b3553" stroke="#6b3a3b" strokeWidth="2" />
      <path d="M133 45c3-4 7-4 9-1" fill="none" stroke="#f4d9a0" strokeWidth="2" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

function scrollToId(target: string, behavior: ScrollBehavior = 'smooth') {
  if (target === 'home') { window.scrollTo({ top: 0, behavior }); return; }
  const el = document.getElementById(target);
  if (!el) return;
  // Capture position at click-time so mid-scroll layout shifts (framer-motion) can't redirect us
  const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
  window.scrollTo({ top, behavior });
}

function handleNav(e: React.MouseEvent<HTMLAnchorElement>, target: string) {
  if (target === 'ubereats') return;
  e.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  scrollToId(target, reduce ? 'auto' : 'smooth');
}

/* Soft ink-on-paper fade on all four edges of the hero scene */
const HERO_MASK =
  'linear-gradient(to bottom, transparent 0%, black 2.5%, black 96%, transparent 100%), linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)';

export default function Postcard() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Flavors');
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const close = (e: MediaQueryListEvent) => { if (e.matches) setMenuOpen(false); };
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsHeaderScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 11000);
    return () => clearInterval(t);
  }, [paused, slide]);

  // Prevent page scrolling behind the fixed mobile menu overlay
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const current = SLIDES[slide];

  return (
    <section
      id="home"
      className="relative pt-0 md:pt-[clamp(56px,7.5vw,100px)] pb-[clamp(30px,5vw,60px)] overflow-hidden"
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

      {/* MASTHEAD — desktop only; mobile nav overlays the hero photo */}
      <div aria-hidden="true" className="hidden md:block h-[clamp(160px,18.2vw,232px)]" />
      <header
        className="fixed top-0 left-0 right-0 z-[970] mx-auto max-w-[1400px] px-[4vw] hidden md:block transition-[padding,background-color,box-shadow] duration-300 ease-out"
        style={{
          paddingTop: isHeaderScrolled ? '7px' : '12px',
          paddingBottom: isHeaderScrolled ? '7px' : '16px',
          background: isHeaderScrolled ? 'rgba(242,225,194,0.98)' : 'rgba(242,225,194,0.94)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: isHeaderScrolled ? '0 6px 22px rgba(20,8,12,0.2)' : '0 5px 18px rgba(20,8,12,0.12)',
        }}
      >

        {/* ── DESKTOP HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative hidden md:grid items-stretch transition-[grid-template-columns,min-height] duration-300 ease-out"
          style={{
            gridTemplateColumns: isHeaderScrolled
              ? 'minmax(0,1fr) clamp(104px,12vw,140px) minmax(0,1fr)'
              : 'minmax(0,1fr) clamp(200px,22vw,260px) minmax(0,1fr)',
            minHeight: isHeaderScrolled ? '68px' : 'clamp(84px,9.5vw,112px)',
            overflow: 'visible',
          }}
        >
          {/* LEFT */}
          <div className="flex flex-col justify-center py-[clamp(10px,1.1vw,14px)]" style={{ borderTop: '1.5px solid var(--marionberry)', borderBottom: '1.5px solid var(--marionberry)' }}>
            <div className="flex items-center justify-center gap-[clamp(14px,2.6vw,44px)]">
            <nav aria-label="Primary" className="flex items-center justify-center gap-[clamp(14px,2.6vw,44px)]">
              {NAV.slice(0, 2).map((n) => (
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
                Small Batch, Big Heart
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

          {/* CENTER — open gap */}
          <div aria-hidden="true" />

          {/* RIGHT */}
          <div className="flex flex-col justify-center py-[clamp(10px,1.1vw,14px)]" style={{ borderTop: '1.5px solid var(--marionberry)', borderBottom: '1.5px solid var(--marionberry)' }}>
            <nav aria-label="Primary continued" className="flex items-center justify-center gap-[clamp(10px,1.8vw,30px)]">
              {NAV.slice(2).map((n) => (
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

          {/* LOGO — absolutely centered */}
          <div
            className="absolute left-1/2 z-20 flex flex-col items-center transition-[top,transform] duration-300 ease-out"
            style={{
              top: isHeaderScrolled ? '50%' : '0',
              transform: isHeaderScrolled ? 'translate(-52.18%, -50%)' : 'translate(-52.18%, 0)',
              overflow: 'visible',
            }}
          >
            <img
              src="/images/logo-official.webp"
              alt="Miss Oz — Ice Cream Cafe, Portland Oregon"
              className="h-auto transition-[width] duration-300 ease-out"
              style={{
                width: isHeaderScrolled ? 'clamp(64px,6.2vw,78px)' : 'clamp(220px,23.5vw,290px)',
                filter: 'drop-shadow(0 2px 10px rgba(93,26,58,0.18))',
              }}
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
          <div className="relative w-full aspect-[5/8] sm:aspect-[4/3] md:aspect-[16/7] overflow-hidden">

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
              className="absolute flex flex-col items-center text-center pointer-events-none left-[4%] right-[4%] sm:left-[18%] sm:right-[18%]"
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
                  WebkitTextStroke: 'clamp(3px,0.45vw,7px) var(--berry)',
                  paintOrder: 'stroke fill',
                  filter: 'drop-shadow(0 4px 5px rgba(20,8,12,0.45))',
                }}
              >
                <span style={{ fontSize: '1.18em', position: 'relative', zIndex: 2, display: 'inline-block', verticalAlign: 'baseline' }}>M</span>
                <span style={{ position: 'relative', zIndex: 1, display: 'inline-block' }}>iss</span>
                {' '}
                <span style={{ fontSize: '1.18em', position: 'relative', zIndex: 2, display: 'inline-block', verticalAlign: 'baseline' }}>O</span>
                <span style={{ position: 'relative', zIndex: 1, display: 'inline-block' }}>z</span>
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
              {/* Subtext — hidden on mobile (too long to fit), shown sm+ */}
              <div
                className="hidden sm:block"
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
                Ice Cream &amp; Handmade Desserts · Portland, Oregon
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
              {/* CTA button */}
              <div className="flex justify-center mt-[clamp(12px,1.6vw,20px)] pointer-events-auto">
                <a
                  href="#step-inside"
                  onClick={(e) => handleNav(e, 'step-inside')}
                  className="group relative inline-flex items-center justify-center gap-[clamp(6px,0.6vw,9px)] rounded-full overflow-hidden font-bold uppercase tracking-[2.5px] text-[#FBF2DF] transition-all duration-300 hover:scale-[1.06] hover:-translate-y-[2px] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  style={{
                    fontFamily: "'Libertinus Math', serif",
                    fontSize: 'clamp(11px,0.95vw,14px)',
                    padding: 'clamp(10px,1vw,13px) clamp(26px,2.4vw,40px)',
                    background: 'linear-gradient(145deg, #943260 0%, #5E1735 52%, #481027 100%)',
                    border: '1.5px solid rgba(251,242,223,0.38)',
                    boxShadow: '0 8px 28px rgba(94,23,53,0.55), 0 2px 8px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,244,214,0.18)',
                  }}
                >
                  {/* shine sweep on hover */}
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,244,214,0.14), transparent)' }}
                    aria-hidden="true"
                  />
                  View Menu
                  <span
                    aria-hidden="true"
                    className="inline-block not-italic transition-transform duration-200 group-hover:translate-x-[3px]"
                    style={{ color: 'var(--gold-hi)', fontSize: '0.88em', marginLeft: '-2px' }}
                  >→</span>
                </a>
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

            {/* ── MOBILE: hamburger + logo overlaid on hero photo ── */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden fixed top-4 left-4 z-[970] flex flex-col justify-center items-center gap-[5px] w-[42px] h-[42px] rounded-xl pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              style={{ background: 'rgba(242,225,194,0.88)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            >
              <span className="block h-[2px] w-[18px] bg-[var(--cocoa)] rounded-full transition-all duration-300 origin-center" style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span className="block h-[2px] w-[18px] bg-[var(--cocoa)] rounded-full transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block h-[2px] w-[18px] bg-[var(--cocoa)] rounded-full transition-all duration-300 origin-center" style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
            <div className="md:hidden fixed top-3 left-1/2 -translate-x-1/2 z-[970] pointer-events-none">
              <img
                src="/images/logo-official.webp"
                alt="Miss Oz — Ice Cream Cafe, Portland Oregon"
                className="h-auto"
                style={{ width: '88px', filter: 'drop-shadow(0 2px 10px rgba(20,8,12,0.35))' }}
              />
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
              className="text-[var(--cream-hi)] tracking-[1.5px] sm:tracking-[5px] uppercase font-bold whitespace-nowrap"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(8px,0.85vw,11px)' }}
            >
              Portland's Homegrown Ice Cream Cafe
            </span>
            <span className="w-6 sm:w-10 h-px bg-[var(--gold-hi)] opacity-50" />
          </div>
        </div>
      </div>

      {/* MOBILE MENU — fixed full-screen overlay, slides in from top */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            className="md:hidden fixed inset-0 z-[980] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            {/* Tap-outside-to-close backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(20,8,12,0.72)' }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              aria-label="Mobile navigation"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-110%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 36, mass: 0.85 }}
              className="relative flex flex-col items-center gap-0 pt-14 pb-8 px-6 rounded-b-[24px]"
              style={{ background: 'rgba(242,225,194,0.98)', boxShadow: '0 12px 40px rgba(20,8,12,0.28)' }}
            >
              {/* ✕ close */}
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-[var(--cocoa)] hover:bg-[rgba(178,78,121,0.08)] transition-colors text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              >✕</button>
              {/* small logo */}
              <motion.img
                src="/images/logo-official.webp"
                alt=""
                aria-hidden="true"
                className="h-auto mb-5"
                style={{ width: '68px', opacity: 0.88 }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 0.88, scale: 1 }}
                transition={{ delay: 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              {NAV.map((n, idx) => (
                <motion.a
                  key={n.label}
                  href={hrefFor(n.target)}
                  {...(n.target === 'ubereats' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.09 + idx * 0.045, duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    document.body.style.overflow = '';
                    handleNav(e, n.target);
                    setMenuOpen(false);
                  }}
                  className="w-full text-center py-3.5 uppercase font-bold text-[var(--cocoa)] hover:text-[var(--berry)] hover:bg-[rgba(178,78,121,0.06)] transition-colors rounded-md"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', letterSpacing: '2.5px' }}
                >
                  {n.label}
                </motion.a>
              ))}
              <motion.a
                href={hrefFor('oz')}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.09 + NAV.length * 0.045, duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => {
                  document.body.style.overflow = '';
                  handleNav(e, 'oz');
                  setMenuOpen(false);
                }}
                className="w-full text-center py-3.5 font-bold hover:bg-[rgba(178,78,121,0.06)] transition-colors rounded-md"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--berry)', letterSpacing: '1.5px' }}
              >
                ♥ Meet Oz!
              </motion.a>
              <motion.div
                aria-hidden="true"
                className="w-12 h-px bg-[var(--marionberry)] opacity-30 my-3"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 0.3, scaleX: 1 }}
                transition={{ delay: 0.09 + (NAV.length + 1) * 0.045, duration: 0.3 }}
              />
              <motion.a
                href={UBEREATS_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.09 + (NAV.length + 2) * 0.045, duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-full bg-[var(--berry-deep)] text-[var(--cream-hi)] font-bold uppercase tracking-[2px] text-[11px] px-7 py-3 transition-colors hover:bg-[var(--berry)]"
                style={{ fontFamily: 'var(--font-sans)' }}
                onClick={() => setMenuOpen(false)}
              >
                Place an Order
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION PANELS — poster-like taped cards, click to explore */}
      <div id="step-inside" className="relative z-20 mx-auto max-w-[1300px] px-[4vw] sm:px-0 mt-[clamp(18px,2.4vw,30px)]" style={{ scrollMarginTop: '32px' }}>
        <div className="flex items-center justify-center gap-3 mb-[clamp(14px,1.8vw,22px)]">
          <span className="w-10 h-px bg-[var(--gold)] opacity-60" aria-hidden="true" />
          <span className="text-[var(--berry-deep)] text-[12px] tracking-[4px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Step Inside</span>
          <span className="w-10 h-px bg-[var(--gold)] opacity-60" aria-hidden="true" />
        </div>

        {/* MOBILE: striped awning + green category strip — visible only on mobile */}
        <div className="md:hidden">
          {/* awning — same cream+berry alternating stripe + scalloped edge as desktop panels */}
          <div aria-hidden="true" className="relative z-10 -mb-[2px]">
            <div
              className="h-[14px] rounded-t-[10px]"
              style={{
                background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 22px, var(--berry-deep) 22px 44px)',
                boxShadow: 'inset 0 -4px 8px rgba(28,13,12,0.2), 0 3px 8px rgba(0,0,0,0.18)',
              }}
            />
            <div
              className="h-[9px]"
              style={{
                background: 'repeating-linear-gradient(90deg, var(--cream-hi) 0 22px, var(--berry-deep) 22px 44px)',
                WebkitMaskImage: 'radial-gradient(11px at 50% 0, #000 98%, transparent 100%)',
                maskImage: 'radial-gradient(11px at 50% 0, #000 98%, transparent 100%)',
                WebkitMaskSize: '22px 100%',
                maskSize: '22px 100%',
                WebkitMaskRepeat: 'repeat-x',
                maskRepeat: 'repeat-x',
                filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.18))',
              } as React.CSSProperties}
            />
          </div>
          {/* forest-green bar with horizontally scrollable category buttons */}
          <div
            className="px-3 py-[10px]"
            style={{ background: 'linear-gradient(180deg, #1D4234 0%, #152B23 100%)' }}
          >
            <div
              className="flex gap-[7px] overflow-x-auto"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
            >
              {MENU_CATEGORIES.map((c) => {
                const active = activeCategory === c;
                return (
                  <motion.button
                    key={c}
                    type="button"
                    onClick={() => setActiveCategory(c)}
                    whileTap={{ scale: 0.93 }}
                    className="relative shrink-0 font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                    style={{
                      fontFamily: "'Libertinus Math', serif",
                      fontSize: '10px',
                      letterSpacing: '2px',
                      padding: '6px 13px',
                      borderRadius: '999px',
                      whiteSpace: 'nowrap',
                      color: active ? '#152F26' : 'rgba(242,225,194,0.85)',
                      border: '1.5px solid transparent',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {active && (
                      <motion.span
                        layoutId="mobile-pill-active"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #FFE099 0%, #FFD068 100%)',
                          boxShadow: '0 2px 14px rgba(255,209,104,0.4)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative">{c}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[270px_1fr_270px] lg:grid-cols-[302px_1fr_302px] gap-[clamp(14px,1.8vw,22px)] items-stretch">

          {/* LEFT — forest-green menu category card with striped awning (decorative list, like a painted parlor sign) */}
          <aside aria-label="Menu categories" className="relative mx-auto w-full max-w-[320px] md:max-w-none hidden md:flex flex-col">
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

                {/* category buttons */}
                <nav aria-label="Menu categories" className="w-full flex flex-col items-center pt-[clamp(14px,1.6vw,22px)]">
                  {MENU_CATEGORIES.map((c, i) => {
                    const active = activeCategory === c;
                    return (
                      <div key={c} className="flex flex-col items-center w-full">
                        {i > 0 && (
                          <span aria-hidden="true" className="text-[var(--pink)] opacity-75 my-[clamp(9px,1vw,14px)]" style={{ fontSize: 10 }}>✦</span>
                        )}
                        <motion.button
                          type="button"
                          aria-pressed={active}
                          onClick={() => setActiveCategory(c)}
                          whileTap={{ scale: 0.95 }}
                          className="relative w-full text-center font-bold uppercase tracking-[3px] rounded-[6px] px-2 py-[7px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                          style={{
                            fontFamily: "'Libertinus Math', serif",
                            fontSize: 'clamp(14px,1.25vw,18px)',
                            color: active ? '#FFD98A' : 'rgba(242,225,194,0.78)',
                            textShadow: active ? '0 0 20px rgba(255,217,138,0.55)' : undefined,
                            transition: 'color 0.28s ease, text-shadow 0.28s ease',
                          }}
                        >
                          {active && (
                            <motion.span
                              layoutId="desk-cat-active"
                              className="absolute inset-0 rounded-[6px]"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255,217,138,0.22) 0%, rgba(255,217,138,0.07) 100%)',
                                boxShadow: 'inset 0 0 0 1px rgba(255,217,138,0.36)',
                              }}
                              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                            />
                          )}
                          <span className="relative inline-flex items-center justify-center gap-[6px]">
                            {active && <span aria-hidden="true" className="text-[8px] opacity-70">✦</span>}
                            {c}
                            {active && <span aria-hidden="true" className="text-[8px] opacity-70">✦</span>}
                          </span>
                        </motion.button>
                      </div>
                    );
                  })}
                </nav>

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
                    Made with
                    <br />
                    Love
                  </div>
                </div>

              </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* CENTER — interactive menu panel, content driven by selected category */}
          <section
            aria-label="Menu"
            className="relative flex flex-col rounded-t-none rounded-b-[10px] md:rounded-[10px] overflow-hidden px-[clamp(18px,2.6vw,42px)] py-[clamp(22px,2.6vw,36px)]"
            style={{
              background: 'linear-gradient(180deg, #FBF4E6, #F7EDDA)',
              boxShadow: '0 14px 34px rgba(28,13,12,0.18), inset 0 0 0 1px rgba(94,23,53,0.25), inset 0 0 0 5px rgba(251,244,230,1), inset 0 0 0 6px rgba(94,23,53,0.15)',
            }}
          >
            {/* All 5 tabs render simultaneously in the same CSS grid cell.
                Height is always locked to the tallest tab (Flavors).
                Inactive tabs crossfade via opacity/filter — no mount/unmount, no height jump. */}
            <div className="flex-1 grid" style={{ gridTemplateColumns: '1fr', gridTemplateRows: 'auto' }}>
              {MENU_CATEGORIES.map((cat) => {
                const isActive = cat === activeCategory;
                return (
                  <motion.div
                    key={cat}
                    className="flex flex-col"
                    style={{ gridArea: '1 / 1', height: '100%', pointerEvents: isActive ? 'auto' : 'none' } as React.CSSProperties}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      filter: isActive ? 'blur(0px)' : 'blur(6px)',
                    }}
                    transition={{
                      opacity: { duration: isActive ? 0.42 : 0.14, ease: isActive ? [0.16, 1, 0.3, 1] : 'easeIn' },
                      filter: { duration: isActive ? 0.42 : 0.14 },
                    }}
                    aria-hidden={!isActive}
                  >
                    {/* ── header ── */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span aria-hidden="true" className="text-[10px] text-[var(--pink)]">✦</span>
                        <h3 className="uppercase font-bold tracking-[4px] text-[#3B1E2B]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px,1.9vw,26px)' }}>
                          {cat === 'Flavors' ? 'Ice Cream Flavors' : cat}
                        </h3>
                        <span aria-hidden="true" className="text-[10px] text-[var(--pink)]">✦</span>
                      </div>
                      {cat === 'Flavors' && (
                        <div className="text-[var(--marionberry)]" style={{ fontFamily: "'Cookie', cursive", fontSize: 'clamp(23px,2.1vw,31px)', lineHeight: 1, marginTop: '-2px' }}>
                          Handmade in Small Batches
                        </div>
                      )}
                    </div>

                    {/* ── FLAVORS ── */}
                    {cat === 'Flavors' && (
                      <>
                        <div className="mt-[clamp(18px,2.2vw,28px)] flex-1 flex flex-col md:flex-row gap-x-[clamp(20px,3vw,40px)] gap-y-0">
                          {[FLAVORS.slice(0, 6), FLAVORS.slice(6)].map((col, ci) => (
                            <div key={ci} className="flex-1 flex flex-col">
                              {col.map((f, i) => (
                                <div key={f.name} className="flex items-start gap-[10px] py-[clamp(10px,1.1vw,15px)]" style={{ borderTop: i > 0 ? '1px solid rgba(94,23,53,0.1)' : 'none' }}>
                                  <span aria-hidden="true" className="text-[var(--pink)] mt-[5px] shrink-0" style={{ fontSize: 8 }}>●</span>
                                  <div>
                                    <div className="uppercase font-bold tracking-[2px] text-[#3B1E2B]" style={{ fontFamily: "'Libertinus Math', serif", fontSize: 'clamp(11px,0.95vw,13px)' }}>{f.name}</div>
                                    <div className="mt-[3px] leading-snug text-[#6E5A54]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.85vw,12px)' }}>{f.desc}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div aria-hidden="true" className="mt-[clamp(16px,2vw,24px)] h-px w-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(94,23,53,0.35) 0 4px, transparent 4px 9px)' }} />
                        <p className="mt-[clamp(10px,1.2vw,16px)] text-center text-[#6E5A54]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.9vw,12.5px)' }}>
                          We rotate approximately 20 flavors — selection changes with the season.
                        </p>
                        <a href={UBEREATS_URL} target="_blank" rel="noopener noreferrer"
                          className="mt-[clamp(10px,1.2vw,16px)] self-center inline-flex items-center gap-1.5 rounded-full bg-[var(--berry-deep)] text-[var(--cream-hi)] font-bold uppercase tracking-[2px] transition-colors hover:bg-[var(--berry)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                          style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,0.85vw,12px)', padding: '8px 22px' }}>
                          See full menu on Uber Eats →
                        </a>
                      </>
                    )}

                    {/* ── CROFFLES & DESSERTS ── */}
                    {cat === 'Croffles & Desserts' && (
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="mt-[clamp(16px,2vw,24px)] flex flex-col">
                          {[
                            { name: 'Brunost', note: 'Plain croffle with a mini scoop of vanilla ice cream, drizzle with Norwegian brown cheese.' },
                            { name: 'Fresh Banana', note: 'Warm croffle with fresh banana slices and a mini scoop of vanilla ice cream.' },
                            { name: 'Strawberry', note: 'Fresh strawberries with whipped cream and a mini scoop of vanilla ice cream.' },
                            { name: 'Nutella', note: 'Warm croffle spread with creamy Nutella and a mini scoop of vanilla ice cream.' },
                            { name: 'Oreo', note: 'Crushed Oreo cookies with sweet cream and a mini scoop of vanilla ice cream.' },
                            { name: 'Tiramisu', note: 'Espresso-soaked croffle with mascarpone cream and a dusting of cocoa.' },
                            { name: 'Fresh Cream', note: 'Warm croffle topped with freshly whipped cream and a mini scoop of vanilla ice cream.' },
                            { name: 'Plain', note: 'Classic plain croffle, baked fresh and served warm.' },
                            { name: 'Seasonal Dessert Board', note: "Rotating specials — ask your scooper for today's selection" },
                          ].map((item, i) => (
                            <div key={item.name} className="flex items-start gap-[10px] py-[clamp(11px,1.3vw,17px)]" style={{ borderTop: i > 0 ? '1px solid rgba(94,23,53,0.1)' : 'none' }}>
                              <span aria-hidden="true" className="text-[var(--pink)] mt-[5px] shrink-0" style={{ fontSize: 9 }}>●</span>
                              <div>
                                <div className="uppercase font-bold tracking-[2px] text-[#3B1E2B]" style={{ fontFamily: "'Libertinus Math', serif", fontSize: 'clamp(12px,1.05vw,15px)' }}>{item.name}</div>
                                <div className="mt-[4px] leading-snug text-[#6E5A54] italic" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.85vw,12px)' }}>{item.note}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div aria-hidden="true" className="mt-[clamp(16px,2vw,22px)] h-px w-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(94,23,53,0.35) 0 4px, transparent 4px 9px)' }} />
                          <div className="mt-[clamp(14px,1.8vw,20px)] rounded-[8px] px-[clamp(14px,1.8vw,22px)] py-[clamp(13px,1.6vw,19px)] text-center" style={{ background: 'rgba(94,23,53,0.05)', border: '1px dashed rgba(94,23,53,0.2)' }}>
                            <div className="text-[var(--marionberry)]" style={{ fontFamily: "'Cookie', cursive", fontSize: 'clamp(20px,1.8vw,26px)', lineHeight: 1.1 }}>always housemade, never rushed</div>
                            <p className="mt-[8px] text-[#6E5A54] leading-relaxed" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.9vw,12.5px)' }}>Our dessert menu rotates with the season. See the full current selection on Uber Eats.</p>
                            <a href={UBEREATS_URL} target="_blank" rel="noopener noreferrer"
                              className="mt-[clamp(10px,1.2vw,14px)] inline-flex items-center gap-1.5 rounded-full bg-[var(--berry-deep)] text-[var(--cream-hi)] font-bold uppercase tracking-[2px] transition-colors hover:bg-[var(--berry)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                              style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,0.85vw,12px)', padding: '8px 22px' }}>
                              Browse on Uber Eats →
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── SUNDAES ── */}
                    {cat === 'Sundaes' && (
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="mt-[clamp(18px,2.2vw,28px)] flex-1 flex items-center">
                          {MENU_ITEMS['Sundaes'].map(item => (
                            <div key={item.name} className="w-full overflow-hidden rounded-[12px]" style={{ background: 'linear-gradient(135deg, rgba(234,184,206,0.34), rgba(227,180,76,0.16))', border: '1px solid rgba(94,23,53,0.2)', boxShadow: '0 12px 28px rgba(94,23,53,0.14)' }}>
                              <div className="grid grid-cols-1 sm:grid-cols-[minmax(145px,0.82fr)_1fr] min-h-[270px]">
                                <div className="relative min-h-[205px] sm:min-h-0 overflow-hidden">
                                  <img loading="lazy" decoding="async" src="/images/card-sundae.webp" alt="Vintage illustration of a cherry-topped ice cream sundae" className="absolute inset-0 w-full h-full object-cover" />
                                  <div className="absolute left-3 top-3 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[2px] text-[#3B1E2B]" style={{ background: 'rgba(251,244,230,0.9)', border: '1px solid rgba(94,23,53,0.2)', fontFamily: 'var(--font-sans)' }}>A Portland classic</div>
                                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16" style={{ background: 'linear-gradient(transparent, rgba(59,30,43,0.38))' }} />
                                </div>
                                <div className="flex flex-col justify-center px-[clamp(18px,2.5vw,34px)] py-[clamp(20px,2.5vw,32px)] text-center sm:text-left">
                                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[var(--pink)] text-[10px] uppercase tracking-[3px] font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
                                    <span aria-hidden="true">✦</span> The signature split <span aria-hidden="true">✦</span>
                                  </div>
                                  <div className="mt-[8px] uppercase font-bold tracking-[2.5px] text-[#3B1E2B]" style={{ fontFamily: "'Libertinus Math', serif", fontSize: 'clamp(17px,1.65vw,24px)' }}>{item.name}</div>
                                  <div className="mt-[7px] text-[var(--marionberry)]" style={{ fontFamily: "'Cookie', cursive", fontSize: 'clamp(22px,2vw,30px)', lineHeight: 1 }}>Three scoops. Pure joy.</div>
                                  {item.note && <div className="mt-[11px] leading-relaxed text-[#6E5A54] italic" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(11px,0.9vw,13px)' }}>{item.note}</div>}
                                  <div className="mt-[16px] flex flex-wrap justify-center sm:justify-start gap-[7px]">
                                    {['Vanilla', 'Strawberry', 'Chocolate', 'Three sauces'].map(tag => (
                                      <span key={tag} className="rounded-full px-3 py-[5px] text-[10px] font-semibold uppercase tracking-[1px] text-[#3B1E2B]" style={{ background: 'rgba(251,244,230,0.72)', border: '1px solid rgba(94,23,53,0.15)', fontFamily: 'var(--font-sans)' }}>{tag}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div aria-hidden="true" className="mt-[clamp(16px,2vw,22px)] h-px w-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(94,23,53,0.35) 0 4px, transparent 4px 9px)' }} />
                          <div className="mt-[clamp(14px,1.8vw,20px)] rounded-[8px] px-[clamp(14px,1.8vw,22px)] py-[clamp(13px,1.6vw,19px)] text-center" style={{ background: 'rgba(94,23,53,0.05)', border: '1px dashed rgba(94,23,53,0.2)' }}>
                            <div className="text-[var(--marionberry)]" style={{ fontFamily: "'Cookie', cursive", fontSize: 'clamp(20px,1.8vw,26px)', lineHeight: 1.1 }}>Make it your own</div>
                            <p className="mt-[8px] text-[#6E5A54] leading-relaxed" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.9vw,12.5px)' }}>
                              Add a second scoop, swap the base flavor, or upgrade with house-made hot fudge or berry compote. Ask your scooper — we love a custom order!
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── DRINKS ── */}
                    {cat === 'Drinks' && (
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="mt-[clamp(18px,2.2vw,28px)] flex flex-col">
                          {MENU_ITEMS['Drinks'].map((item, i) => (
                            <div key={item.name} className="flex items-start gap-[10px] py-[clamp(12px,1.4vw,19px)]" style={{ borderTop: i > 0 ? '1px solid rgba(94,23,53,0.1)' : 'none' }}>
                              <span aria-hidden="true" className="text-[var(--pink)] mt-[5px] shrink-0" style={{ fontSize: 9 }}>●</span>
                              <div>
                                <div className="uppercase font-bold tracking-[2px] text-[#3B1E2B]" style={{ fontFamily: "'Libertinus Math', serif", fontSize: 'clamp(12px,1.05vw,15px)' }}>{item.name}</div>
                                {item.note && <div className="mt-[4px] leading-snug text-[#6E5A54] italic" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.85vw,12px)' }}>{item.note}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div aria-hidden="true" className="mt-[clamp(16px,2vw,22px)] h-px w-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(94,23,53,0.35) 0 4px, transparent 4px 9px)' }} />
                          <div className="mt-[clamp(14px,1.8vw,20px)] rounded-[8px] px-[clamp(14px,1.8vw,22px)] py-[clamp(13px,1.6vw,19px)] text-center" style={{ background: 'rgba(94,23,53,0.05)', border: '1px dashed rgba(94,23,53,0.2)' }}>
                            <div className="text-[var(--marionberry)]" style={{ fontFamily: "'Cookie', cursive", fontSize: 'clamp(20px,1.8vw,26px)', lineHeight: 1.1 }}>Seasonal Specials</div>
                            <p className="mt-[8px] text-[#6E5A54] leading-relaxed" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.9vw,12.5px)' }}>
                              Thai Iced Tea · Lychee Soda · House Lemonade — our seasonal drinks rotate, so ask your scooper what's fresh today.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── WHOLE CAKES ── */}
                    {cat === 'Whole Cakes' && (
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="mt-[clamp(18px,2.2vw,28px)] flex-1 flex items-center">
                          {MENU_ITEMS['Whole Cakes'].map((item, i) => (
                            <div key={item.name} className="w-full rounded-[12px] p-[clamp(16px,2.2vw,30px)]" style={{ background: 'linear-gradient(135deg, rgba(227,180,76,0.14), rgba(234,184,206,0.2))', border: '1px solid rgba(94,23,53,0.2)', boxShadow: '0 10px 24px rgba(94,23,53,0.1)' }}>
                              <div className="flex flex-col sm:flex-row items-center gap-[clamp(15px,2vw,28px)]">
                                <div className="shrink-0 w-[clamp(122px,13vw,168px)] h-[clamp(108px,11vw,142px)] rounded-full flex items-center justify-center" style={{ background: 'rgba(251,244,230,0.72)', border: '1px dashed rgba(94,23,53,0.25)' }}>
                                  <BasqueCheesecakeIllustration />
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                  <div className="uppercase font-bold tracking-[2.5px] text-[#3B1E2B]" style={{ fontFamily: "'Libertinus Math', serif", fontSize: 'clamp(15px,1.45vw,21px)' }}>{item.name}</div>
                                  <div className="mt-[6px] text-[var(--marionberry)]" style={{ fontFamily: "'Cookie', cursive", fontSize: 'clamp(21px,2vw,30px)', lineHeight: 1 }}>Original recipe · baked slow</div>
                                  <div className="mt-[8px] text-[#6E5A54] leading-snug" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(11px,0.9vw,13px)' }}>Rich, caramelized, and creamy at the center. Choose your size:</div>
                                </div>
                              </div>
                              {item.details && (
                                <div className="mt-[clamp(18px,2vw,26px)] grid grid-cols-3 gap-[8px]">
                                  {item.details.map(detail => {
                                    const [size, ...priceParts] = detail.split(' — ');
                                    return (
                                      <div key={detail} className="rounded-[8px] py-[9px] px-[4px] text-center" style={{ background: 'rgba(251,244,230,0.76)', border: '1px solid rgba(94,23,53,0.14)' }}>
                                        <div className="font-bold text-[#3B1E2B]" style={{ fontFamily: "'Libertinus Math', serif", fontSize: 'clamp(12px,1.15vw,16px)' }}>{size}</div>
                                        <div className="mt-[2px] text-[var(--marionberry)] font-bold" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,1vw,15px)' }}>{priceParts.join(' — ')}</div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div>
                          <div aria-hidden="true" className="mt-[clamp(16px,2vw,22px)] h-px w-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(94,23,53,0.35) 0 4px, transparent 4px 9px)' }} />
                          <div className="mt-[clamp(14px,1.8vw,20px)] rounded-[8px] px-[clamp(14px,1.8vw,22px)] py-[clamp(13px,1.6vw,19px)] text-center" style={{ background: 'rgba(94,23,53,0.05)', border: '1px dashed rgba(94,23,53,0.2)' }}>
                            <div className="text-[var(--marionberry)]" style={{ fontFamily: "'Cookie', cursive", fontSize: 'clamp(20px,1.8vw,26px)', lineHeight: 1.1 }}>Basque Cheesecake Orders</div>
                            <p className="mt-[8px] text-[#6E5A54] leading-relaxed" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10.5px,0.9vw,12.5px)' }}>
                              Our Original Basque Cheesecake is available in three sizes. Reserve at least one week in advance.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* RIGHT — plum "Come Slow Down" card with striped awning */}
          <div className="relative mx-auto w-full max-w-[340px] md:max-w-none hidden md:flex flex-col">
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
                  Churned fresh every week using classic recipes and real ingredients — no shortcuts.
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

        {/* bottom ribbon */}
        <div
          className="mt-[clamp(14px,2vw,22px)] rounded-[5px] px-3 py-3 text-center border-2 ticket-notch relative"
          style={{ background: 'var(--brick)', borderColor: 'var(--gold-hi)', boxShadow: '0 6px 16px rgba(28,13,12,0.25)' }}
        >
          <div className="absolute inset-1 stitch-border border-[rgba(255,244,214,0.4)] pointer-events-none rounded-[2px]" aria-hidden="true" />
          <span className="text-[var(--cream-hi)] text-[11px] sm:text-[12.5px] tracking-[2px] uppercase font-bold relative z-10" style={{ fontFamily: 'var(--font-sans)', textShadow: '1px 1px 0 rgba(28,13,12,0.2)' }}>
            Locally Owned <span className="text-[var(--gold-hi)] mx-1">★</span> Small Business <span className="text-[var(--gold-hi)] mx-1">★</span> @missozicecream
          </span>
        </div>
      </div>
    </section>
  );
}
