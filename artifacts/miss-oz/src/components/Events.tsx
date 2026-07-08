import { motion } from 'framer-motion';

const macklin = { fontFamily: "'Macklin Display', 'Playfair Display', serif", fontWeight: 700, fontStyle: 'italic' };

export default function Events() {
  return (
    <section id="events" className="text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--pink)]">
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
            className="bg-white rounded-[14px] p-[36px] text-center"
            style={{ boxShadow: '0 4px 24px rgba(28,13,12,0.10)' }}
          >
            <h4 className="font-display font-normal text-[24px] mb-[10px] text-[var(--cocoa)]">{card.title}</h4>
            <p className="italic text-[17px] text-[#1d0e0d] leading-relaxed opacity-80">{card.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
