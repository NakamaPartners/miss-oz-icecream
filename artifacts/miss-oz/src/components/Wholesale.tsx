import { motion } from 'framer-motion';

export default function Wholesale() {
  return (
    <section className="text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--berry)] text-[var(--cream)]">
      <motion.span 
        initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="block text-[12px] md:text-[13px] tracking-[5px] uppercase font-bold text-[var(--cream)] opacity-80 mb-3.5"
      >
        Wholesale program
      </motion.span>
      <motion.span 
        initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
        className="block font-script text-[var(--pink)] text-[clamp(32px,3.8vw,44px)] mb-1 drop-shadow-[2px_2px_0_var(--berry-deep)]"
      >
        for shops & restaurants
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
        className="font-display font-normal uppercase text-[clamp(44px,6.6vw,84px)] leading-[0.98] mb-5 text-[var(--cream)] drop-shadow-[4px_4px_0_var(--berry-deep)]"
      >
        Wholesale
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
        className="italic max-w-[520px] mx-auto text-[19px] text-[var(--cream)]"
      >
        The same small-batch case, in sizes built for your menu.
      </motion.p>

      <div className="flex gap-[28px] flex-wrap justify-center max-w-[1000px] mx-auto mt-[44px] mb-[30px]">
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-[var(--berry-deep)] border-[2.5px] border-[var(--gold-hi)] rounded-[18px] py-[34px] px-[28px] flex-1 min-w-full md:min-w-[250px] text-center shadow-[7px_7px_0_rgba(36,17,16,0.4)]">
          <div className="font-display text-[54px] text-[var(--gold-hi)]">$130</div>
          <div className="text-[18px] mt-2 font-semibold">2.5 gal ice cream</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-[var(--berry-deep)] border-[2.5px] border-[var(--gold-hi)] rounded-[18px] py-[34px] px-[28px] flex-1 min-w-full md:min-w-[250px] text-center shadow-[7px_7px_0_rgba(36,17,16,0.4)]">
          <div className="font-display text-[54px] text-[var(--gold-hi)]">$80</div>
          <div className="text-[18px] mt-2 font-semibold">Whole Basque cheesecake</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-[var(--berry-deep)] border-[2.5px] border-[var(--gold-hi)] rounded-[18px] py-[34px] px-[28px] flex-1 min-w-full md:min-w-[250px] text-center shadow-[7px_7px_0_rgba(36,17,16,0.4)]">
          <div className="font-display text-[54px] text-[var(--gold-hi)]">$15</div>
          <div className="text-[18px] mt-2 font-semibold">Chocolate chip cookie dough · 6 pieces</div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
        className="flex justify-center gap-[38px] mt-[14px]" aria-hidden="true"
      >
        <span className="w-[15px] h-[15px] rounded-full bg-[var(--gold-hi)] shadow-[0_0_20px_6px_rgba(227,180,76,0.6)] animate-[flicker_2.6s_infinite]"></span>
        <span className="w-[15px] h-[15px] rounded-full bg-[var(--gold-hi)] shadow-[0_0_20px_6px_rgba(227,180,76,0.6)] animate-[flicker_2.6s_infinite_0.6s]"></span>
        <span className="w-[15px] h-[15px] rounded-full bg-[var(--gold-hi)] shadow-[0_0_20px_6px_rgba(227,180,76,0.6)] animate-[flicker_2.6s_infinite_1.1s]"></span>
        <span className="w-[15px] h-[15px] rounded-full bg-[var(--gold-hi)] shadow-[0_0_20px_6px_rgba(227,180,76,0.6)] animate-[flicker_2.6s_infinite_1.7s]"></span>
        <span className="w-[15px] h-[15px] rounded-full bg-[var(--gold-hi)] shadow-[0_0_20px_6px_rgba(227,180,76,0.6)] animate-[flicker_2.6s_infinite_0.3s]"></span>
      </motion.div>
    </section>
  );
}
