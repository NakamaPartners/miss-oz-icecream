import { motion } from 'framer-motion';
import { Bunting, Starburst } from './Decor';

const macklin = { fontFamily: 'var(--font-groovy)', fontWeight: 400, fontStyle: 'italic' };

export default function Events() {
  return (
    <section id="events" className="parlour-paper relative overflow-hidden text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--pink)]">
      <Bunting className="absolute top-0 left-0 right-0" />
      <Starburst size={150} color="var(--berry)" className="pointer-events-none absolute -bottom-8 -left-8 opacity-[0.10] hidden md:block" />
      <Starburst size={120} color="var(--berry)" className="pointer-events-none absolute top-[86px] right-[4vw] opacity-[0.10] hidden md:block" />
      <motion.span
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="block text-[12px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] opacity-60 mb-3"
      >
        Private events
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
        className="block font-script text-[var(--berry-deep)] text-[clamp(30px,3.5vw,42px)] mb-2"
      >
        celebrate with us
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
        className="text-[clamp(42px,6vw,80px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
        style={macklin}
      >
        Parties & Weddings
      </motion.h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[20px] max-w-[940px] mx-auto mt-[40px]">
        {[
          {
            title: 'Private Parties',
            body: 'Scoop bars, croffle stations, and the parlor all to yourselves — old music included.',
          },
          {
            title: 'Weddings',
            body: 'Small-batch flavors for your big day, from dessert tables to late-night cones.',
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
            className="relative rounded-[8px] p-[36px] pt-[40px] text-center bg-[var(--cream-hi)]"
            style={{ boxShadow: '0 10px 30px rgba(28,13,12,0.16)', border: '1.5px solid var(--gold)' }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-[8px] rounded-[5px] border border-[rgba(199,154,59,0.5)]" />
            <div className="flex items-center justify-center gap-2 mb-3 text-[var(--gold)]" aria-hidden="true">
              <span className="h-px w-8" style={{ background: 'currentColor', opacity: 0.6 }} />
              <span className="text-[12px]">✦</span>
              <span className="h-px w-8" style={{ background: 'currentColor', opacity: 0.6 }} />
            </div>
            <h4 className="font-display font-normal text-[24px] mb-[10px] text-[var(--cocoa)]">{card.title}</h4>
            <p className="italic text-[17px] text-[#1d0e0d] leading-relaxed opacity-80">{card.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
