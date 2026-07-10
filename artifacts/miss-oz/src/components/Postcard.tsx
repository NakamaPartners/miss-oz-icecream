const NAV = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Menu', target: 'menu' },
  { label: 'Order Online', target: 'menu' },
  { label: 'Wholesale', target: 'wholesale' },
  { label: 'Event', target: 'events' },
  { label: 'Contact', target: 'contact' },
];

const flavors = [
  { name: 'Marionberry', note: 'Oregon berries, swirled tart & sweet', price: '$6' },
  { name: 'Thai Iced Tea', note: 'Spiced black tea & sweet cream', price: '$6' },
  { name: 'Pistachio Kulfi', note: 'Cardamom & pistachio, slow-churned', price: '$6.5' },
  { name: 'Stumptown Coffee', note: 'Cold-brew roast, small batch', price: '$6' },
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
      {/* wordmark, above the hero image */}
      <div className="text-center mb-[clamp(16px,2.2vw,26px)]">
        <span className="block text-[var(--gold)] text-[11px] tracking-[4px] uppercase font-bold mb-1" style={{ fontFamily: 'var(--font-sans)' }}>
          ✦ Est. 2007 · Pearl District ✦
        </span>
        <h1 className="leading-none text-[var(--berry)]" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(44px,7.5vw,84px)' }}>
          Miss&nbsp;Oz
        </h1>
        <span className="inline-block mt-2 px-4 py-1 rounded-[4px] text-[var(--cream-hi)] text-[11px] sm:text-[13px] tracking-[3px] uppercase font-bold" style={{ background: 'var(--teal-deep)', fontFamily: 'var(--font-sans)' }}>
          Ice Cream &amp; Dessert Cafe
        </span>
      </div>

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
          className="relative overflow-hidden rounded-[6px] aspect-[4/3] sm:aspect-[16/9]"
          style={{ border: '5px solid var(--cream)', boxShadow: 'inset 0 0 0 1px rgba(199,154,59,0.55), 0 10px 26px rgba(28,13,12,0.3)' }}
        >
          <img
            src="/images/hero-parlor.png"
            alt="Vintage scene — a glowing ICE CREAM arrow sign pointing toward a little striped-awning ice cream parlor at dusk"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="filmgrain" aria-hidden="true" />
        </div>
      </div>

      {/* MENU — its own rectangular section, on top of nothing but below the image */}
      <div
        className="mx-auto max-w-[1080px] mt-[clamp(18px,2.4vw,30px)] rounded-[8px] p-[clamp(18px,2.6vw,34px)]"
        style={{ background: 'linear-gradient(180deg, var(--cream-hi), var(--cream))', boxShadow: '0 14px 34px rgba(28,13,12,0.16), inset 0 0 0 1.5px var(--gold), inset 0 0 0 4px var(--cream-hi), inset 0 0 0 5.5px rgba(199,154,59,0.4)' }}
      >
        <div className="flex items-center gap-3 mb-[clamp(12px,1.6vw,20px)]">
          <span className="text-[var(--berry-deep)] text-[13px] tracking-[3px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Today at the Counter</span>
          <span className="flex-1 h-px bg-[var(--gold)] opacity-60" aria-hidden="true" />
        </div>

        <ul className="grid sm:grid-cols-2 gap-x-[clamp(24px,4vw,56px)] gap-y-1" role="list">
          {flavors.map((f) => (
            <li key={f.name} className="py-[11px] border-b border-[rgba(28,13,12,0.1)]">
              <div className="flex items-baseline gap-2">
                <span className="text-[18px] md:text-[20px] leading-tight text-[var(--cocoa)]" style={{ fontFamily: 'var(--font-display)' }}>{f.name}</span>
                <span aria-hidden="true" className="flex-1 self-end mb-[5px] border-b border-dotted border-[rgba(28,13,12,0.3)]" />
                <span className="text-[18px] md:text-[20px] whitespace-nowrap text-[var(--berry)]" style={{ fontFamily: 'var(--font-display)', textShadow: '1px 1px 0 rgba(199,154,59,0.3)' }}>{f.price}</span>
              </div>
              <p className="italic text-[13px] text-[var(--cocoa)] opacity-65 leading-snug mt-0.5" style={{ fontFamily: 'var(--font-sans)' }}>{f.note}</p>
            </li>
          ))}
        </ul>

        <div className="mt-[clamp(14px,1.8vw,22px)]">
          <a
            href="#menu"
            onClick={(e) => handleNav(e, 'menu')}
            className="inline-flex items-center gap-2 text-[13px] tracking-[1.5px] uppercase font-bold text-[var(--berry)] hover:text-[var(--berry-deep)] transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            See the full menu <span aria-hidden="true">→</span>
          </a>
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
