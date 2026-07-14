import { Bunting } from './Decor';

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

const hrefFor = (t: string) => (t === 'home' ? '#home' : `#${t}`);

function handleNav(e: React.MouseEvent<HTMLAnchorElement>, target: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth';
  e.preventDefault();
  if (target === 'home') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(target)?.scrollIntoView({ behavior });
}

/* Soft ink-on-paper fade on all four edges of the hero scene */
const HERO_MASK =
  'linear-gradient(to bottom, transparent 0%, black 7%, black 88%, transparent 100%), linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)';

export default function Postcard() {
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

      <div className="relative z-20 mx-auto max-w-[1200px] px-[4vw]">
        {/* MASTHEAD: editorial double rules framing the nav */}
        <div className="flex flex-col items-center mt-[10px] sm:mt-[20px] mb-[20px] sm:mb-[30px] relative z-20">
          <div className="w-full border-t-[2.5px] border-b-[1px] border-[var(--cocoa)] h-[5px] sm:h-[7px] mb-3 sm:mb-4 opacity-70" aria-hidden="true" />

          <nav className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-2">
            {NAV.map((item, i) => (
              <span key={item.label} className="flex items-center">
                {i > 0 && <span className="text-[var(--gold)] mx-2 sm:mx-4 text-[10px] sm:text-[11px] opacity-70" aria-hidden="true">✦</span>}
                <a
                  href={hrefFor(item.target)}
                  onClick={(e) => handleNav(e, item.target)}
                  className="nav-link text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors uppercase tracking-[3px] sm:tracking-[5px] text-[11px] sm:text-[13px] font-bold focus-visible:outline-none focus-visible:text-[var(--berry)] opacity-90 hover:opacity-100"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {item.label}
                </a>
              </span>
            ))}
          </nav>

          <div className="w-full border-t-[1px] border-b-[2.5px] border-[var(--cocoa)] h-[5px] sm:h-[7px] mt-3 sm:mt-4 opacity-70" aria-hidden="true" />
        </div>
      </div>

      {/* HERO SCENE — the full, uncropped illustration printed straight onto the paper,
          fading softly into the page on all four edges */}
      <div className="relative w-full z-0 pointer-events-none -mt-2 sm:-mt-4">
        <div
          className="w-full relative max-w-[1000px] mx-auto"
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
          <img
            src="/images/storefront-photo-wide.webp"
            alt="The real Miss Oz storefront in Portland's Pearl District — a corner shop with a neon Open sign in the window, lantern lights glowing inside, a plant-filled balcony above, and a bike parked out front"
            className="w-full h-auto mix-blend-multiply sepia-[12%] saturate-[0.92] contrast-[1.04] opacity-95"
          />
          {/* Soft color wash linking the ink to the paper tone */}
          <div className="absolute inset-0 bg-[var(--gold)] opacity-[0.12] mix-blend-color pointer-events-none" aria-hidden="true" />
        </div>
        <h1 className="sr-only">Miss Oz — Ice Cream &amp; Dessert Cafe</h1>
      </div>

      {/* SECTION PANELS — poster-like taped cards, click to explore */}
      <div className="relative z-20 mx-auto max-w-[1080px] px-[4vw] sm:px-0 mt-[clamp(18px,2.4vw,30px)]">
        <div className="flex items-center justify-center gap-3 mb-[clamp(14px,1.8vw,22px)]">
          <span className="w-10 h-px bg-[var(--gold)] opacity-60" aria-hidden="true" />
          <span className="text-[var(--berry-deep)] text-[12px] tracking-[4px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Step Inside</span>
          <span className="w-10 h-px bg-[var(--gold)] opacity-60" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(12px,1.6vw,20px)]">
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
