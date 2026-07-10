import { motion, useReducedMotion } from 'framer-motion';

const items = [
  { price: '$130', name: '2.5 gal ice cream', note: 'Any flavor on the case list · churned to order' },
  { price: '$80', name: 'Whole Basque cheesecake', note: 'Burnt-top, 10" round · serves ~14' },
  { price: '$15', name: 'Chocolate chip cookie dough', note: 'Six pre-portioned pucks · bake off fresh' },
];

export default function Wholesale() {
  const reduce = useReducedMotion();
  const rise = {
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
  };

  return (
    <section
      id="wholesale"
      className="relative overflow-hidden text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--berry)] text-[var(--cream)]"
    >
      {/* diner-table vignette + warm pool of light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(68% 58% at 50% 44%, rgba(227,180,76,0.13), transparent 72%), radial-gradient(120% 100% at 50% 50%, transparent 54%, rgba(0,0,0,0.38))' }}
      />

      <div className="relative">
        <motion.span
          {...rise}
          transition={{ duration: 0.7 }}
          className="block text-[12px] tracking-[5px] uppercase font-bold text-[var(--cream)] opacity-60 mb-6"
        >
          Wholesale Program
        </motion.span>

        {/* ===== Open menu book ===== */}
        <motion.div {...rise} transition={{ duration: 0.7, delay: 0.1 }} className="relative mx-auto max-w-[840px]">
          {/* MENU tab riding the top of the cover */}
          <div
            className="relative z-20 mx-auto -mb-[9px] w-fit px-6 py-1.5 rounded-t-[8px] text-[12px] tracking-[4px] uppercase font-bold text-[var(--cream-hi)]"
            style={{ background: 'var(--cocoa)', boxShadow: 'inset 0 0 0 1.5px var(--gold)', fontFamily: 'var(--font-sans)' }}
          >
            ✦&nbsp;&nbsp;Menu&nbsp;&nbsp;✦
          </div>

          {/* leather-look cover */}
          <div
            className="relative rounded-[12px] p-[10px] md:p-[14px]"
            style={{ background: 'linear-gradient(160deg, var(--berry-deep), #3a0e20)', boxShadow: '0 34px 80px rgba(0,0,0,0.55), inset 0 0 0 2px var(--gold), inset 0 0 0 4px var(--berry-deep)' }}
          >
            <div className="relative grid md:grid-cols-2 rounded-[5px] overflow-hidden">
              {/* spine crease */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[8px] z-10"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(28,13,12,0.34) 42%, rgba(28,13,12,0.34) 58%, transparent)' }}
              />

              {/* LEFT PAGE — title */}
              <div className="menu-page menu-page-l flex flex-col items-center justify-center text-center px-[26px] md:px-[42px] py-[42px] md:py-[56px]">
                <span className="flex items-center gap-2 text-[var(--gold)] text-[11px] tracking-[4px] uppercase font-bold mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
                  ✦ Est. 2007 ✦
                </span>
                <span className="text-[var(--berry)]" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(21px,2.8vw,29px)' }}>
                  for shops &amp; restaurants
                </span>
                <h2 className="text-[var(--berry-deep)] leading-[0.95] my-1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,66px)' }}>
                  Wholesale
                </h2>
                <div className="flex items-center justify-center gap-3 my-3 text-[var(--gold)]" aria-hidden="true">
                  <span className="h-px w-10" style={{ background: 'currentColor', opacity: 0.55 }} />
                  <span className="text-[13px]">✦</span>
                  <span className="h-px w-10" style={{ background: 'currentColor', opacity: 0.55 }} />
                </div>
                <p className="italic max-w-[300px] text-[15px] text-[var(--cocoa)] opacity-75" style={{ fontFamily: 'var(--font-sans)' }}>
                  The same small-batch case, in sizes built for your menu.
                </p>

                {/* trade-counter seal */}
                <div
                  className="mt-7 relative flex items-center justify-center rounded-full"
                  style={{ width: 78, height: 78, background: 'var(--berry)', boxShadow: '0 8px 18px rgba(28,13,12,0.3)' }}
                >
                  <svg width="78" height="78" viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0">
                    <defs><path id="wholeseal" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" /></defs>
                    <text style={{ fontFamily: "'EB Garamond', serif", fontSize: 10, letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase', fill: 'var(--cream)' }}>
                      <textPath href="#wholeseal">· trade counter · est. 2007 ·</textPath>
                    </text>
                  </svg>
                  <svg width="24" height="28" viewBox="0 0 26 30" aria-hidden="true">
                    <circle cx="13" cy="9" r="7" fill="none" stroke="var(--cream)" strokeWidth="2" />
                    <path d="M6 15 L20 15 L13 29 Z" fill="none" stroke="var(--cream)" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* RIGHT PAGE — price list */}
              <div className="menu-page menu-page-r text-left px-[26px] md:px-[42px] py-[42px] md:py-[56px] text-[var(--cocoa)]">
                <div className="text-center text-[var(--berry-deep)]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,30px)' }}>
                  Trade Price List
                </div>

                <div className="flex items-center justify-center gap-3 mt-4 mb-5 text-[var(--gold)]" aria-hidden="true">
                  <span className="h-px w-12 md:w-16" style={{ background: 'currentColor', opacity: 0.55 }} />
                  <span className="text-[13px]">✦</span>
                  <span className="h-px w-12 md:w-16" style={{ background: 'currentColor', opacity: 0.55 }} />
                </div>

                <ul>
                  {items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={reduce ? false : { opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                      className={`flex items-baseline gap-3 py-[16px] ${i > 0 ? 'border-t border-[rgba(199,154,59,0.35)]' : ''}`}
                    >
                      <div className="min-w-0">
                        <div className="text-[18px] md:text-[20px] text-[var(--cocoa)] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{item.name}</div>
                        <div className="italic text-[13px] text-[var(--cocoa)] opacity-60 leading-snug mt-[2px]" style={{ fontFamily: 'var(--font-sans)' }}>{item.note}</div>
                      </div>
                      <span aria-hidden="true" className="flex-1 self-end mb-[7px] border-b border-dotted border-[rgba(28,13,12,0.32)]" />
                      <div className="text-[28px] md:text-[32px] text-[var(--berry)] leading-none whitespace-nowrap" style={{ fontFamily: 'var(--font-display)', textShadow: '1px 1px 0 rgba(199,154,59,0.35)' }}>
                        {item.price}
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-[rgba(199,154,59,0.35)] text-[12px] tracking-[1px] uppercase font-semibold text-[var(--cocoa)] opacity-55 text-center" style={{ fontFamily: 'var(--font-sans)' }}>
                  Small batches · churned fresh in the Pearl District
                </div>

                <div className="mt-7 text-center">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-[13px] text-[14px] font-bold tracking-[1px] uppercase text-[var(--cream)] bg-[var(--berry)] transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-hi)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cream)]"
                    style={{ boxShadow: '0 8px 20px rgba(28,13,12,0.25)' }}
                  >
                    Open a wholesale account
                    <span aria-hidden="true">→</span>
                  </button>
                  <div className="mt-3 text-[12.5px] italic text-[var(--cocoa)] opacity-55" style={{ fontFamily: 'var(--font-sans)' }}>
                    Or say hello at @missozicecreamcafe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
