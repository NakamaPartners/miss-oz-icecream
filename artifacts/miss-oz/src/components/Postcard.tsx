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

const TONES: Record<Tone, { bg: string; border: string; title: string; desc: string; eyebrow: string }> = {
  cream: { bg: 'var(--paper)', border: 'var(--teal-deep)', title: 'var(--cocoa)', desc: 'var(--cocoa)', eyebrow: 'var(--teal-deep)' },
  teal: { bg: 'var(--teal-deep)', border: 'var(--gold)', title: 'var(--cream-hi)', desc: 'var(--gold-hi)', eyebrow: 'var(--gold-hi)' },
  pink: { bg: 'var(--pink)', border: 'var(--berry)', title: 'var(--berry-deep)', desc: 'var(--cocoa)', eyebrow: 'var(--berry)' },
  gold: { bg: 'var(--gold)', border: 'var(--brick)', title: 'var(--cocoa)', desc: 'var(--cocoa)', eyebrow: 'var(--cocoa)' },
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

function Bulbs() {
  return (
    <>
      <span className="bulbstrip bulbstrip-h top" aria-hidden="true"><span className="bulbs bulbs-a" /><span className="bulbs bulbs-b" /></span>
      <span className="bulbstrip bulbstrip-h bottom" aria-hidden="true"><span className="bulbs bulbs-a" /><span className="bulbs bulbs-b" /></span>
      <span className="bulbstrip bulbstrip-v left" aria-hidden="true"><span className="bulbs bulbs-a" /><span className="bulbs bulbs-b" /></span>
      <span className="bulbstrip bulbstrip-v right" aria-hidden="true"><span className="bulbs bulbs-a" /><span className="bulbs bulbs-b" /></span>
    </>
  );
}

export default function Postcard() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-[4vw] pt-[clamp(26px,4vw,52px)] pb-[clamp(16px,2vw,30px)] bg-[var(--cream-hi)]"
      aria-label="Miss Oz Ice Cream & Dessert Cafe"
    >
      {/* slim nav */}
      <nav
        className="mx-auto max-w-[1080px] mb-[clamp(14px,2vw,22px)] flex flex-wrap items-center justify-center gap-x-1 gap-y-1 rounded-[5px] px-3 py-2 border-2"
        style={{ background: 'var(--teal-deep)', borderColor: 'var(--gold)' }}
      >
        {NAV.map((item, i) => (
          <span key={item.label} className="flex items-center">
            {i > 0 && <span className="text-[var(--gold-hi)] mx-1 sm:mx-2 text-[10px]" aria-hidden="true">★</span>}
            <a
              href={hrefFor(item.target)}
              onClick={(e) => handleNav(e, item.target)}
              className="text-[var(--cream-hi)] hover:text-[var(--gold-hi)] transition-colors uppercase tracking-[1.5px] text-[11px] sm:text-[13px] font-bold focus-visible:outline-none focus-visible:text-[var(--gold-hi)] focus-visible:underline underline-offset-4"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {item.label}
            </a>
          </span>
        ))}
      </nav>

      {/* HERO IMAGE — horizontal vintage scene, framed with the blinking bulb border */}
      <div className="poster-frame mx-auto max-w-[1080px] rounded-[10px]">
        <Bulbs />
        <div
          className="relative overflow-hidden rounded-[6px] aspect-[5/4] sm:aspect-[3/2]"
          style={{ border: '5px solid var(--cream)', boxShadow: 'inset 0 0 0 1px rgba(199,154,59,0.55), 0 10px 26px rgba(28,13,12,0.3)' }}
        >
          <img
            src="/images/hero-parlor.png"
            alt="Vintage dusk scene — a glowing bulb-outlined arrow sign reading Miss Oz above an Ice Cream & Dessert Cafe board, beside a little striped-awning parlor"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* branding now lives in the illustration; keep an accessible page heading */}
          <h1 className="sr-only">Miss Oz — Ice Cream &amp; Dessert Cafe</h1>

          {/* grain over the scene for aged texture */}
          <div className="filmgrain" aria-hidden="true" />
        </div>
      </div>

      {/* SECTION PANELS — vintage cards, click to explore (minimal interaction) */}
      <div className="mx-auto max-w-[1080px] mt-[clamp(18px,2.4vw,30px)]">
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
                style={{ background: t.bg, borderColor: t.border, boxShadow: 'inset 0 0 0 2px rgba(255,244,214,0.35), 0 6px 16px rgba(28,13,12,0.2)' }}
              >
                <div className="flex flex-col justify-between flex-1 min-w-0">
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
      </div>

      {/* bottom ribbon */}
      <div
        className="mx-auto max-w-[1080px] mt-[clamp(14px,2vw,22px)] rounded-[5px] px-3 py-2 text-center border-2"
        style={{ background: 'var(--brick)', borderColor: 'var(--gold-hi)' }}
      >
        <span className="text-[var(--cream-hi)] text-[11px] sm:text-[12.5px] tracking-[2px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
          Locally Owned <span className="text-[var(--gold-hi)] mx-1">★</span> Small Business <span className="text-[var(--gold-hi)] mx-1">★</span> Big Heart <span className="text-[var(--gold-hi)] mx-1">★</span> @missozicecream
        </span>
      </div>
    </section>
  );
}
