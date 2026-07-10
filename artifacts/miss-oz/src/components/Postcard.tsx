import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

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
  { name: 'Marionberry', note: 'Oregon berries, swirled tart & sweet', price: '$6', img: '/images/flavor-marionberry.png' },
  { name: 'Thai Iced Tea', note: 'Spiced black tea & sweet cream', price: '$6', img: '/images/flavor-thaitea.png' },
  { name: 'Pistachio Kulfi', note: 'Cardamom & pistachio, slow-churned', price: '$6.5', img: '/images/flavor-kulfi.png' },
  { name: 'Stumptown Coffee', note: 'Cold-brew roast, small batch', price: '$6', img: '/images/flavor-coffee.png' },
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
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = flavors[active];

  return (
    <section
      id="home"
      className="parlour-paper relative overflow-hidden px-[5vw] pt-[clamp(28px,4vw,56px)] pb-[clamp(16px,2vw,28px)] bg-[var(--cream-hi)]"
      aria-label="Miss Oz Ice Cream & Dessert Cafe"
    >
      {/* minimal vintage header */}
      <div className="text-center mb-[clamp(20px,3vw,36px)]">
        <span className="flex items-center justify-center gap-2 text-[var(--gold)] text-[11px] tracking-[4px] uppercase font-bold mb-1" style={{ fontFamily: 'var(--font-sans)' }}>
          ✦ Est. 2007 · Pearl District ✦
        </span>
        <h1 className="leading-none text-[var(--berry)]" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(46px,8vw,88px)' }}>
          Miss&nbsp;Oz
        </h1>
        <span className="inline-block mt-2 px-4 py-1 rounded-[4px] text-[var(--cream-hi)] text-[11px] sm:text-[13px] tracking-[3px] uppercase font-bold" style={{ background: 'var(--teal-deep)', fontFamily: 'var(--font-sans)' }}>
          Ice Cream &amp; Dessert Cafe
        </span>
      </div>

      {/* menu board: featured photo + interactive list */}
      <div
        className="relative mx-auto max-w-[1080px] rounded-[12px] p-[clamp(14px,2vw,26px)]"
        style={{ background: 'linear-gradient(180deg, var(--cream-hi), var(--cream))', boxShadow: '0 22px 55px rgba(28,13,12,0.28), inset 0 0 0 1.5px var(--gold), inset 0 0 0 4px var(--cream-hi), inset 0 0 0 5.5px rgba(199,154,59,0.45)' }}
      >
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-[clamp(16px,2.4vw,34px)] items-stretch">
          {/* featured vintage photo (horizontal, swaps with selection) */}
          <div className="flex flex-col">
            <div
              className="relative overflow-hidden rounded-[8px] aspect-[16/10] bg-[var(--paper)]"
              style={{ border: '6px solid var(--cream)', boxShadow: 'inset 0 0 0 1px rgba(199,154,59,0.5), 0 10px 26px rgba(28,13,12,0.22)' }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.img}
                  src={current.img}
                  alt={`${current.name} — ${current.note}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.01 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: 'easeOut' }}
                />
              </AnimatePresence>
              <div className="filmgrain" aria-hidden="true" />
            </div>

            {/* caption for the featured scoop */}
            <div className="mt-3 flex items-baseline gap-3 px-1">
              <div className="min-w-0">
                <div className="text-[var(--cocoa)] leading-tight text-[22px] md:text-[26px]" style={{ fontFamily: 'var(--font-display)' }}>{current.name}</div>
                <div className="italic text-[13.5px] text-[var(--cocoa)] opacity-65 leading-snug" style={{ fontFamily: 'var(--font-sans)' }}>{current.note}</div>
              </div>
              <span aria-hidden="true" className="flex-1 self-end mb-[6px] border-b border-dotted border-[rgba(28,13,12,0.3)]" />
              <div className="text-[var(--berry)] leading-none text-[26px] md:text-[30px] whitespace-nowrap" style={{ fontFamily: 'var(--font-display)', textShadow: '1px 1px 0 rgba(199,154,59,0.35)' }}>{current.price}</div>
            </div>
          </div>

          {/* interactive flavor menu */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2 text-[var(--gold)]" aria-hidden="true">
              <span className="text-[var(--berry-deep)] text-[14px] tracking-[3px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Today at the Counter</span>
              <span className="flex-1 h-px" style={{ background: 'currentColor', opacity: 0.5 }} />
            </div>

            <ul className="flex flex-col" role="list">
              {flavors.map((f, i) => {
                const on = i === active;
                return (
                  <li key={f.name}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="w-full text-left flex items-center gap-3 py-[11px] px-2 rounded-[6px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-hi)]"
                      style={{ background: on ? 'rgba(140,42,84,0.08)' : 'transparent' }}
                    >
                      <img
                        src={f.img}
                        alt=""
                        aria-hidden="true"
                        className="w-11 h-11 rounded-full object-cover shrink-0 transition-transform duration-200"
                        style={{ border: '2px solid var(--cream)', boxShadow: '0 2px 6px rgba(28,13,12,0.22)', transform: on ? 'scale(1.08)' : 'scale(1)' }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="leading-tight text-[17px] md:text-[19px]" style={{ fontFamily: 'var(--font-display)', color: on ? 'var(--berry)' : 'var(--cocoa)' }}>{f.name}</div>
                        <div className="italic text-[12.5px] text-[var(--cocoa)] opacity-60 leading-snug truncate" style={{ fontFamily: 'var(--font-sans)' }}>{f.note}</div>
                      </div>
                      <span className="text-[18px] md:text-[20px] whitespace-nowrap" style={{ fontFamily: 'var(--font-display)', color: on ? 'var(--berry)' : 'var(--cocoa)', opacity: on ? 1 : 0.7 }}>{f.price}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto pt-4">
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
        </div>
      </div>

      {/* slim vintage nav */}
      <nav
        className="mx-auto max-w-[1080px] mt-5 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 rounded-[6px] px-3 py-2 border-2"
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
