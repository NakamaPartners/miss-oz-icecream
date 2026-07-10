const NAV = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Menu', target: 'menu' },
  { label: 'Order Online', target: 'menu' },
  { label: 'Wholesale', target: 'wholesale' },
  { label: 'Event', target: 'events' },
  { label: 'Contact', target: 'contact' },
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

export default function Postcard() {
  return (
    <section id="home" className="relative px-[4vw] pt-[clamp(24px,4vw,56px)] pb-[clamp(14px,2vw,26px)]" style={{ background: 'var(--cocoa)' }} aria-label="Miss Oz Ice Cream & Dessert Cafe">
      <div className="postcard relative mx-auto max-w-[980px]">
        <img
          src="/images/hero-poster-b.png"
          alt="Vintage Miss Oz Ice Cream & Dessert Cafe advertisement poster — established 2007, small batch big heart, showing an old ice cream delivery van in front of a lit-up parlour with string lights and a three-scoop sundae. Where sweet memories begin. Life is better with ice cream."
          className="block w-full h-auto"
        />
        <div className="filmgrain" aria-hidden="true" />
      </div>

      {/* Slim vintage nav */}
      <nav
        className="mx-auto max-w-[980px] mt-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 rounded-[6px] px-3 py-2 border-2"
        style={{ background: 'var(--teal-deep)', borderColor: 'var(--gold)' }}
      >
        {NAV.map((item, i) => (
          <span key={item.label} className="flex items-center">
            {i > 0 && <span className="text-[var(--gold-hi)] mx-1 sm:mx-2 text-[10px]">♥</span>}
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
    </section>
  );
}
