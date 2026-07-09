import { motion, useReducedMotion } from 'framer-motion';

const macklin = { fontFamily: "'Macklin Display', 'Playfair Display', serif", fontWeight: 700, fontStyle: 'italic' };

const items = [
  { price: '$130', name: '2.5 gal ice cream', note: 'Any flavor on the case list · churned to order' },
  { price: '$80', name: 'Whole Basque cheesecake', note: 'Burnt-top, 10" round · serves ~14' },
  { price: '$15', name: 'Chocolate chip cookie dough', note: 'Six pre-portioned pucks · bake off fresh' },
];

export default function Wholesale() {
  const reduce = useReducedMotion();
  const rise = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
  };

  return (
    <section
      id="wholesale"
      className="relative overflow-hidden text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--berry)] text-[var(--cream)]"
    >
      {/* soft radial glow behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 55% at 50% 42%, rgba(227,180,76,0.14), transparent 70%)' }}
      />

      <div className="relative">
        <motion.span {...rise} transition={{ duration: 0.7 }}
          className="block text-[12px] tracking-[5px] uppercase font-bold text-[var(--cream)] opacity-60 mb-3">
          Wholesale program
        </motion.span>
        <motion.span {...rise} transition={{ duration: 0.7, delay: 0.1 }}
          className="block font-script text-[var(--pink)] text-[clamp(30px,3.5vw,42px)] mb-2"
          style={{ textShadow: '1px 1px 0 var(--berry-deep)' }}>
          for shops &amp; restaurants
        </motion.span>
        <motion.h2 {...rise} transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[clamp(42px,6vw,80px)] leading-[0.98] mb-5 text-[var(--cream)]"
          style={{ ...macklin, textShadow: '2px 2px 0 rgba(28,13,12,0.35)' }}>
          Wholesale
        </motion.h2>
        <motion.p {...rise} transition={{ duration: 0.7, delay: 0.2 }}
          className="italic max-w-[520px] mx-auto text-[18px] text-[var(--cream)] opacity-80">
          The same small-batch case, in sizes built for your menu.
        </motion.p>

        {/* Trade price-list ledger card */}
        <motion.div
          {...rise}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="relative mx-auto mt-[64px] max-w-[620px] text-[var(--cocoa)]"
        >
          {/* wax seal riding the top edge */}
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[38px] z-10">
            <div className="relative flex items-center justify-center rounded-full"
              style={{ width: 76, height: 76, background: 'var(--berry)', boxShadow: '0 8px 20px rgba(28,13,12,0.28)' }}>
              <svg width="76" height="76" viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0">
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

          {/* paper */}
          <div
            className="rounded-[16px] pt-[52px] pb-[36px] px-[28px] md:px-[48px]"
            style={{
              background: 'linear-gradient(180deg, var(--cream-hi), var(--cream))',
              boxShadow: '0 24px 60px rgba(28,13,12,0.38)',
            }}
          >
            {/* double-rule inner frame */}
            <div
              className="rounded-[10px] pt-[30px] pb-[26px] px-[22px] md:px-[36px]"
              style={{ border: '1.5px solid var(--gold)', boxShadow: 'inset 0 0 0 4px var(--cream-hi), inset 0 0 0 5.5px rgba(199,154,59,0.5)' }}
            >
              <div style={{ ...macklin }} className="text-[var(--berry-deep)] text-[clamp(22px,3vw,30px)] leading-none">
                Trade Price List
              </div>

              {/* divider */}
              <div className="flex items-center justify-center gap-3 mt-4 mb-7 text-[var(--gold)]" aria-hidden="true">
                <span className="h-px w-12 md:w-20" style={{ background: 'currentColor', opacity: 0.55 }} />
                <span className="text-[13px]">✦</span>
                <span className="h-px w-12 md:w-20" style={{ background: 'currentColor', opacity: 0.55 }} />
              </div>

              {/* ledger rows with dotted leaders */}
              <ul className="text-left">
                {items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: reduce ? 0 : -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                    className={`flex items-baseline gap-3 py-[18px] ${i > 0 ? 'border-t border-[rgba(199,154,59,0.3)]' : ''}`}
                  >
                    <div className="min-w-0">
                      <div className="font-display text-[19px] md:text-[21px] text-[var(--cocoa)] leading-tight">{item.name}</div>
                      <div className="italic text-[13.5px] text-[var(--cocoa)] opacity-60 leading-snug mt-[2px]">{item.note}</div>
                    </div>
                    <span aria-hidden="true" className="flex-1 self-end mb-[6px] border-b border-dotted border-[rgba(28,13,12,0.32)]" />
                    <div className="font-display text-[30px] md:text-[34px] text-[var(--berry)] leading-none whitespace-nowrap"
                      style={{ textShadow: '1px 1px 0 rgba(199,154,59,0.35)' }}>
                      {item.price}
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* footer note */}
              <div className="mt-6 pt-5 border-t border-[rgba(199,154,59,0.3)] text-[13px] tracking-[1px] uppercase font-semibold text-[var(--cocoa)] opacity-55">
                Small batches · churned fresh in the Pearl District
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full px-8 py-[14px] text-[15px] font-bold tracking-[1px] uppercase text-[var(--cream)] bg-[var(--berry)] transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-hi)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cream)]"
                style={{ boxShadow: '0 8px 20px rgba(28,13,12,0.25)' }}
              >
                Open a wholesale account
                <span aria-hidden="true">→</span>
              </button>
              <div className="mt-3 text-[13px] italic text-[var(--cocoa)] opacity-55">
                Or say hello at @missozicecreamcafe
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
