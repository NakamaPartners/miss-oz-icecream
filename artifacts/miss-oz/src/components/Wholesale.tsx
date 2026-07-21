import { motion, useReducedMotion } from 'framer-motion';
import { Bunting, Starburst } from './Decor';
import InquireForm from './InquireForm';

const items = [
  { price: '$130', name: '2.5 gal ice cream', note: 'Any flavor on the case list · churned to order' },
  { price: '$80', name: 'Whole Basque cheesecake', note: 'Burnt-top, 10" round · serves ~14' },
  { price: '$15', name: 'Chocolate chip cookie dough', note: 'Six pre-portioned pucks · bake off fresh' },
];

/** Scalloped parlor awning in cream + berry stripes */
function Awning() {
  const stripes =
    'repeating-linear-gradient(90deg, var(--cream-hi) 0 44px, var(--berry-deep) 44px 88px)';
  return (
    <div aria-hidden="true" className="relative z-20 -mb-[2px]">
      {/* awning body */}
      <div
        className="h-[34px] md:h-[42px] rounded-t-[10px]"
        style={{
          background: stripes,
          boxShadow: 'inset 0 -8px 14px rgba(28,13,12,0.28), 0 6px 14px rgba(0,0,0,0.35)',
        }}
      />
      {/* scalloped edge */}
      <div
        className="h-[16px] md:h-[20px]"
        style={{
          background: stripes,
          WebkitMaskImage: 'radial-gradient(22px at 50% 0, #000 98%, transparent 100%)',
          maskImage: 'radial-gradient(22px at 50% 0, #000 98%, transparent 100%)',
          WebkitMaskSize: '44px 100%',
          maskSize: '44px 100%',
          WebkitMaskPosition: '0 0',
          maskPosition: '0 0',
          WebkitMaskRepeat: 'repeat-x',
          maskRepeat: 'repeat-x',
          filter: 'drop-shadow(0 5px 6px rgba(0,0,0,0.3))',
        }}
      />
    </div>
  );
}

const chalkboard = {
  background:
    'radial-gradient(120% 90% at 30% 20%, rgba(255,255,255,0.045), transparent 60%), radial-gradient(100% 80% at 75% 80%, rgba(255,255,255,0.035), transparent 55%), linear-gradient(160deg, #263229 0%, #1d2622 55%, #222e28 100%)',
};

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
      <Bunting className="absolute top-0 left-0 right-0 z-10" />
      <Starburst size={180} color="var(--gold)" className="pointer-events-none absolute top-[64px] left-[3vw] opacity-[0.12] hidden md:block" />
      <Starburst size={140} color="var(--gold)" className="pointer-events-none absolute bottom-[64px] right-[4vw] opacity-[0.12] hidden md:block" />
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

        {/* ===== Awning + chalkboard trade board ===== */}
        <motion.div {...rise} transition={{ duration: 0.7, delay: 0.1 }} className="relative mx-auto max-w-[840px]">
          <Awning />

          {/* wooden frame */}
          <div
            className="relative rounded-b-[12px] p-[12px] md:p-[16px]"
            style={{
              background: 'linear-gradient(160deg, #6b4a2e, #4b3120 55%, #5d3f27)',
              boxShadow:
                '0 34px 80px rgba(0,0,0,0.55), inset 0 0 0 2px rgba(227,180,76,0.5), inset 0 2px 6px rgba(255,255,255,0.12), inset 0 -3px 8px rgba(0,0,0,0.4)',
            }}
          >
            <div className="relative grid md:grid-cols-2 rounded-[6px] overflow-hidden" style={{ boxShadow: 'inset 0 0 0 1.5px rgba(28,13,12,0.6)' }}>
              {/* center wooden rail between the two boards */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[10px] z-10"
                style={{ background: 'linear-gradient(90deg, #3c2717, #6b4a2e 45%, #6b4a2e 55%, #3c2717)' }}
              />

              {/* LEFT BOARD — title chalkboard */}
              <div className="flex flex-col items-center justify-center text-center px-[26px] md:px-[42px] py-[42px] md:py-[56px]" style={chalkboard}>
                <span className="flex items-center gap-2 text-[var(--gold-hi)] text-[11px] tracking-[4px] uppercase font-bold mb-2 opacity-90" style={{ fontFamily: 'var(--font-sans)' }}>
                  ✦ Est. 2007 ✦
                </span>
                <span className="text-[var(--pink)]" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(21px,2.8vw,29px)', textShadow: '0 0 10px rgba(240,170,190,0.25)' }}>
                  for shops &amp; restaurants
                </span>
                <h2
                  className="leading-[0.95] my-1 text-[#f3ead6]"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4.6vw,52px)', textShadow: '0 0 14px rgba(243,234,214,0.18), 0 2px 4px rgba(0,0,0,0.45)' }}
                >
                  Wholesale
                </h2>
                <div className="flex items-center justify-center gap-3 my-3 text-[var(--gold-hi)]" aria-hidden="true">
                  <span className="h-px w-10" style={{ background: 'currentColor', opacity: 0.55 }} />
                  <span className="text-[13px]">✦</span>
                  <span className="h-px w-10" style={{ background: 'currentColor', opacity: 0.55 }} />
                </div>
                <p className="italic max-w-[300px] text-[15px] text-[#e9e0cc] opacity-80" style={{ fontFamily: 'var(--font-sans)' }}>
                  The same small-batch case, in sizes built for your menu.
                </p>

                {/* trade-counter seal — chalk circle */}
                <div
                  className="mt-7 relative flex items-center justify-center rounded-full"
                  style={{ width: 78, height: 78, boxShadow: 'inset 0 0 0 2px rgba(243,234,214,0.7)' }}
                >
                  <svg width="78" height="78" viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0">
                    <defs><path id="wholeseal" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" /></defs>
                    <text style={{ fontFamily: "'EB Garamond', serif", fontSize: 10, letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase', fill: '#f3ead6' }}>
                      <textPath href="#wholeseal">· trade counter · est. 2007 ·</textPath>
                    </text>
                  </svg>
                  <svg width="24" height="28" viewBox="0 0 26 30" aria-hidden="true">
                    <circle cx="13" cy="9" r="7" fill="none" stroke="#f3ead6" strokeWidth="2" />
                    <path d="M6 15 L20 15 L13 29 Z" fill="none" stroke="#f3ead6" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* RIGHT BOARD — chalk price list */}
              <div className="text-left px-[26px] md:px-[42px] py-[42px] md:py-[56px]" style={chalkboard}>
                <div
                  className="text-center text-[#f3ead6]"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,30px)', textShadow: '0 0 12px rgba(243,234,214,0.16)' }}
                >
                  Trade Price List
                </div>

                <div className="flex items-center justify-center gap-3 mt-4 mb-5 text-[var(--gold-hi)]" aria-hidden="true">
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
                      className={`flex items-baseline gap-3 py-[16px] ${i > 0 ? 'border-t border-[rgba(243,234,214,0.18)]' : ''}`}
                    >
                      <div className="min-w-0">
                        <div className="text-[18px] md:text-[20px] text-[#f3ead6] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{item.name}</div>
                        <div className="italic text-[13px] text-[#e9e0cc] opacity-65 leading-snug mt-[2px]" style={{ fontFamily: 'var(--font-sans)' }}>{item.note}</div>
                      </div>
                      <span aria-hidden="true" className="flex-1 self-end mb-[7px] border-b border-dotted border-[rgba(243,234,214,0.35)]" />
                      <div
                        className="text-[28px] md:text-[32px] text-[var(--gold-hi)] leading-none whitespace-nowrap"
                        style={{ fontFamily: 'var(--font-display)', textShadow: '0 0 12px rgba(227,180,76,0.3)' }}
                      >
                        {item.price}
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-[rgba(243,234,214,0.18)] text-[12px] tracking-[1px] uppercase font-semibold text-[#e9e0cc] opacity-60 text-center" style={{ fontFamily: 'var(--font-sans)' }}>
                  Small batches · churned fresh in the Pearl District
                </div>

                <div className="mt-7 text-center">
                  <InquireForm
                    type="wholesale"
                    submitLabel="Open a wholesale account"
                    buttonClassName="inline-flex items-center gap-2 rounded-full px-7 py-[13px] text-[14px] font-bold tracking-[1px] uppercase text-[var(--berry-deep)] bg-[var(--cream-hi)] transition-transform duration-200 mech-btn hover:bg-[var(--gold-hi)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-hi)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1d2622]"
                  />
                  <div className="mt-4 text-[12.5px] italic text-[#e9e0cc] opacity-60" style={{ fontFamily: 'var(--font-sans)' }}>
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
