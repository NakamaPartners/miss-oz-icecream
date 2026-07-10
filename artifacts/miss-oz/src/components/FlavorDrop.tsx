import { motion } from 'framer-motion';

const macklin = { fontFamily: 'var(--font-groovy)', fontWeight: 400, fontStyle: 'italic' as const };
const PUMPKIN = '#E8722C';

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
    <section className="parlour-paper relative overflow-hidden py-[80px] md:py-[120px] px-[6vw] bg-[var(--cream-hi)]">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,340px)_1fr] gap-10 md:gap-[64px] items-center max-w-[1040px] mx-auto">
        {/* Reel */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-[min(300px,80vw)]"
        >
          <div
            className="relative rounded-[26px] overflow-hidden bg-black"
            style={{ boxShadow: '0 20px 50px rgba(28,13,12,0.28)', border: '5px solid #140807', aspectRatio: '9 / 16' }}
          >
            <video
              src="/video/pumpkin-drop.mp4"
              poster="/video/pumpkin-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {/* seasonal tag */}
            <div
              className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[1.5px] text-white py-1 px-2.5 rounded-full"
              style={{ background: PUMPKIN, boxShadow: '0 3px 10px rgba(0,0,0,0.25)' }}
            >
              <span className="w-[7px] h-[7px] rounded-full bg-white animate-pulse" /> Seasonal
            </div>
          </div>

          {/* Yum! script accent */}
          <div
            className="absolute -right-5 -bottom-3 font-script text-[34px] text-[var(--berry)] -rotate-6 select-none"
            style={{ textShadow: '2px 2px 0 var(--cream-hi)' }}
            aria-hidden="true"
          >
            Yum! Yum!
          </div>
          <Sparkle size={26} color="var(--gold-hi)" delay={0.4} className="absolute -left-4 top-6" />
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
            <span className="py-2 px-4 rounded-full text-[14px] font-semibold text-white" style={{ background: 'var(--cocoa)' }}>🎃 Pumpkin ice cream</span>
            <span className="py-2 px-4 rounded-full text-[14px] font-semibold text-[var(--cocoa)]" style={{ background: 'var(--gold-hi)' }}>☕ Pumpkin latte</span>
          </motion.div>
        </div>
      </div>

      {/* Checkerboard strip — a nod to the reel's footer */}
      <div className="checker-strip absolute bottom-0 left-0 right-0 h-[22px]" aria-hidden="true" />
    </section>
  );
}
