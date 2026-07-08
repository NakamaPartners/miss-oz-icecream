import { motion } from 'framer-motion';

export default function Events() {
  return (
    <section className="text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--pink)]">
      <motion.span 
        initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="block text-[12px] md:text-[13px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] mb-3.5"
      >
        Private events
      </motion.span>
      <motion.span 
        initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
        className="block font-script text-[var(--berry-deep)] text-[clamp(32px,3.8vw,44px)] mb-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]"
      >
        celebrate with us
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
        className="font-display font-normal uppercase text-[clamp(44px,6.6vw,84px)] leading-[0.98] mb-5 text-[var(--cocoa)] drop-shadow-[4px_4px_0_rgba(255,255,255,0.55)]"
      >
        Parties & Weddings
      </motion.h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[30px] max-w-[940px] mx-auto mt-[40px]">
        <motion.div 
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[var(--cream-hi)] border-[2.5px] border-[var(--cocoa)] rounded-[18px] p-[34px] text-center shadow-[7px_7px_0_var(--cocoa)]"
        >
          <h4 className="font-display font-normal text-[27px] mb-[10px] text-[var(--cocoa)]">Private Parties</h4>
          <p className="italic text-[17px] text-[#1d0e0d]">Scoop bars, croffle stations, and the parlor all to yourselves — old music included.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[var(--cream-hi)] border-[2.5px] border-[var(--cocoa)] rounded-[18px] p-[34px] text-center shadow-[7px_7px_0_var(--cocoa)]"
        >
          <h4 className="font-display font-normal text-[27px] mb-[10px] text-[var(--cocoa)]">Weddings</h4>
          <p className="italic text-[17px] text-[#1d0e0d]">Small-batch flavors for your big day, from dessert tables to late-night cones.</p>
        </motion.div>
      </div>
    </section>
  );
}
