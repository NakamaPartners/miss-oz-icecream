import { motion } from 'framer-motion';

const macklin = { fontFamily: 'var(--font-groovy)', fontWeight: 400, fontStyle: 'italic' as const };
const PUMPKIN = '#C0512A';

function Sparkle({ size = 22, color = PUMPKIN, delay = 0, className = '', style = {} as React.CSSProperties }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      className={className}
      style={{ animation: `twinkle 2.6s ${delay}s infinite`, ...style }}
    >
      <path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill={color} />
    </svg>
  );
}

export default function FlavorDrop() {
  return (
    <section
      className="parlour-paper relative overflow-hidden py-[84px] md:py-[128px] px-[6vw]"
      style={{
        backgroundColor: 'var(--cream-hi)',
        backgroundImage:
          'linear-gradient(rgba(243,235,215,0.72), rgba(243,235,215,0.72)), url(/images/seasonbg-autumn.webp)',
        backgroundSize: 'auto, 640px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,360px)_1fr] gap-12 md:gap-[72px] items-center max-w-[1060px] mx-auto">
        {/* Framed seasonal poster — a lit lobby card */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-[min(340px,84vw)]"
        >
          {/* warm glow, as if the frame is lit */}
          <div
            className="absolute -inset-6 rounded-[30px] blur-2xl -z-0"
            style={{ background: 'radial-gradient(60% 55% at 50% 42%, rgba(216,124,58,0.42), transparent 70%)' }}
            aria-hidden="true"
          />

          {/* the frame */}
          <div
            className="relative z-10 rounded-[8px] p-[9px]"
            style={{
              background: 'linear-gradient(150deg, #23100e, #3a1c17 55%, #23100e)',
              boxShadow: '0 24px 54px rgba(28,13,12,0.4), inset 0 0 0 1px rgba(255,244,214,0.14)',
            }}
          >
            <div className="rounded-[4px] p-[6px]" style={{ background: 'var(--cream-hi)' }}>
              <img
                src="/images/seasonal-pumpkin-poster.webp"
                alt="Seasonal flavor poster — housemade small-batch pumpkin ice cream at Miss Oz"
                className="block w-full h-auto rounded-[2px]"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(28,13,12,0.12)' }}
              />
            </div>
          </div>

          {/* hanging SEASONAL enamel tab */}
          <div
            className="absolute z-20 -top-4 left-5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[2px] text-[var(--cream-hi)] py-1.5 px-3 rounded-[3px] -rotate-2"
            style={{ background: PUMPKIN, boxShadow: '0 4px 12px rgba(28,13,12,0.35), inset 0 0 0 1px rgba(255,244,214,0.35)', fontFamily: 'var(--font-sans)' }}
          >
            <span className="w-[7px] h-[7px] rounded-full bg-[var(--cream-hi)] animate-pulse" /> Seasonal
          </div>

          {/* Yum! script accent */}
          <div
            className="absolute z-20 -right-4 -bottom-5 font-script text-[36px] text-[var(--berry)] -rotate-6 select-none"
            style={{ textShadow: '2px 2px 0 var(--cream-hi)' }}
            aria-hidden="true"
          >
            Yum! Yum!
          </div>
          <Sparkle size={26} color="var(--gold-hi)" delay={0.4} className="absolute z-20 -left-4 top-8" />
        </motion.div>

        {/* Copy */}
        <div className="relative text-center md:text-left">
          <Sparkle size={20} delay={0} className="hidden md:block absolute -top-4 right-10" />
          <Sparkle size={16} color="var(--berry)" delay={0.8} className="hidden md:block absolute top-8 -right-2" />

          <motion.span
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[12px] tracking-[4px] uppercase font-bold mb-3"
            style={{ color: PUMPKIN }}
          >
            <Sparkle size={15} delay={0.2} /> New Flavor Alert <Sparkle size={15} delay={0.6} />
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
            className="block font-script text-[var(--berry-deep)] text-[clamp(28px,3.4vw,40px)] mb-1"
          >
            fresh from the churn
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.14 }}
            className="text-[clamp(40px,5.6vw,74px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
            style={macklin}
          >
            Pumpkin, officially
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="italic text-[18px] leading-relaxed text-[#1d0e0d] opacity-85 max-w-[440px] mx-auto md:mx-0"
          >
            Housemade pumpkin ice cream, churned in small batches — with a pumpkin puréed latte to match. Here for the season, gone when the leaves are.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-7 flex flex-wrap gap-3 justify-center md:justify-start"
          >
            <span className="py-2 px-4 rounded-full text-[14px] font-semibold text-[var(--cream-hi)]" style={{ background: 'var(--cocoa)' }}>🎃 Pumpkin ice cream</span>
            <span className="py-2 px-4 rounded-full text-[14px] font-semibold text-[var(--cocoa)]" style={{ background: 'var(--gold-hi)' }}>☕ Pumpkin latte</span>
          </motion.div>
        </div>
      </div>

      {/* Checkerboard strip — a nod to the parlour floor */}
      <div className="checker-strip absolute bottom-0 left-0 right-0 h-[22px]" aria-hidden="true" />
    </section>
  );
}
