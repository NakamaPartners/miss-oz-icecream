import { motion } from 'framer-motion';

const macklin = { fontFamily: "'Macklin Display', 'Playfair Display', serif", fontWeight: 700, fontStyle: 'italic' as const };

export default function Story() {
  return (
    <section className="py-[90px] md:py-[140px] px-[6vw] relative bg-[var(--cream)]">
      <div className="max-w-[760px] mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="block text-[12px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] opacity-60 mb-3"
        >
          Pull up a stool
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="block font-script text-[var(--berry-deep)] text-[clamp(30px,3.6vw,44px)] mb-2"
        >
          a Pearl District story
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[clamp(38px,6vw,80px)] leading-[1.0] mb-8 text-[var(--cocoa)]"
          style={macklin}
        >
          Seventeen years by the fountain
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.25 }} className="mb-[18px] leading-[1.85] text-[19px] text-[#1d0e0d]">
          For 17 years we served this neighborhood as Cool Moon Ice Cream, scooping beside the Jamison Square fountain — made on-site, in small batches, with all natural ingredients.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.32 }} className="mb-2 leading-[1.85] text-[19px] text-[#1d0e0d]">
          Now we're Miss Oz, named after our beloved dog and everything she stood for: nature, animals, and slowing down for the sweet parts. Same hands, same traditions, new chapter.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.38 }} className="mb-2 leading-[1.85] text-[19px] text-[#1d0e0d]">
          Push open the door and it's the same as it's always been — cones hand-dipped to order, a record turning in the corner, and a stool with your name on it. No rush here. Stay as long as you like.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto my-8 h-px w-[120px] bg-[var(--gold)] opacity-60"
          aria-hidden="true"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5 }}
          className="font-script text-[clamp(28px,3.4vw,40px)] text-[var(--berry)] leading-snug"
        >
          Come slow down with us. The old music's already playing.
        </motion.p>
      </div>
    </section>
  );
}
