import { motion } from 'framer-motion';

const macklin = { fontFamily: "'Macklin Display', 'Playfair Display', serif", fontWeight: 700, fontStyle: 'italic' };

export default function Wholesale() {
  return (
    <section id="wholesale" className="text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--berry)] text-[var(--cream)]">
      <motion.span
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="block text-[12px] tracking-[5px] uppercase font-bold text-[var(--cream)] opacity-60 mb-3"
      >
        Wholesale program
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
        className="block font-script text-[var(--pink)] text-[clamp(30px,3.5vw,42px)] mb-2"
        style={{ textShadow: '1px 1px 0 var(--berry-deep)' }}
      >
        for shops & restaurants
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
        className="text-[clamp(42px,6vw,80px)] leading-[0.98] mb-5 text-[var(--cream)]"
        style={{ ...macklin, textShadow: '2px 2px 0 rgba(28,13,12,0.35)' }}
      >
        Wholesale
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
        className="italic max-w-[520px] mx-auto text-[18px] text-[var(--cream)] opacity-80"
      >
        The same small-batch case, in sizes built for your menu.
      </motion.p>

      <div className="flex gap-[20px] flex-wrap justify-center max-w-[1000px] mx-auto mt-[44px] mb-[30px]">
        {[
          { price: '$130', label: '2.5 gal ice cream' },
          { price: '$80', label: 'Whole Basque cheesecake' },
          { price: '$15', label: 'Chocolate chip cookie dough · 6 pieces' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="flex-1 min-w-full md:min-w-[250px] text-center rounded-[14px] py-[30px] px-[28px]"
            style={{
              background: 'rgba(0,0,0,0.18)',
              border: '1px solid rgba(227,180,76,0.35)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div className="font-display font-normal text-[50px] text-[var(--gold-hi)] leading-none mb-3">{item.price}</div>
            <div className="text-[16px] font-medium text-[var(--cream)] opacity-90 leading-snug">{item.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
        className="flex justify-center gap-[32px] mt-[20px]" aria-hidden="true"
      >
        {[0, 0.6, 1.1, 1.7, 0.3].map((delay, i) => (
          <span key={i} className="w-[12px] h-[12px] rounded-full bg-[var(--gold-hi)]" style={{ animation: `flicker 2.6s ${delay}s infinite`, boxShadow: '0 0 14px 4px rgba(227,180,76,0.5)' }} />
        ))}
      </motion.div>
    </section>
  );
}
