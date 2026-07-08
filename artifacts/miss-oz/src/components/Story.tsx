import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="py-[80px] md:py-[130px] px-[6vw] relative bg-[var(--cream)]">
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 md:gap-[56px] items-center max-w-[1100px] mx-auto">
        <div>
          <motion.span 
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="block text-[12px] md:text-[13px] tracking-[3px] md:tracking-[5px] uppercase font-bold text-[var(--cocoa)] mb-3.5"
          >
            Our story
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            className="block font-script text-[var(--berry-deep)] text-[clamp(32px,3.8vw,44px)] mb-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]"
          >
            a Pearl District story
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-normal uppercase text-[clamp(44px,6.6vw,84px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
          >
            Seventeen years by the fountain
          </motion.h2>
          
          <motion.p initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="mb-[15px] leading-[1.75] text-[19px] text-[#1d0e0d]">
            For 17 years we served this neighborhood as Cool Moon Ice Cream, scooping beside the Jamison Square fountain — made on-site, in small batches, with all natural ingredients.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-[15px] leading-[1.75] text-[19px] text-[#1d0e0d]">
            Now we're Miss Oz, named after our beloved dog and everything she stood for: nature, animals, and slowing down for the sweet parts. Same hands, same traditions, new chapter.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className="font-script text-[27px] text-[var(--berry)] mt-4">
            Come slow down with us. The old music's already playing.
          </motion.p>
        </div>

        <div className="relative h-[320px] md:h-[400px] mt-8 md:mt-0">
          <motion.div style={{ y: y1 }} className="absolute bg-white p-2.5 pb-8 shadow-[0_12px_28px_rgba(36,17,16,0.28)] top-0 left-[6%] w-[150px] md:w-[210px] h-[170px] md:h-[230px] rotate-[-5deg]">
            <div className="w-full h-full bg-[var(--pink)] bg-[url('https://images.unsplash.com/photo-1488900128323-21503983a07e?w=500&q=80')] bg-cover bg-center"></div>
            <div className="font-script text-[17px] text-center mt-[7px]">the parlor, 2007</div>
          </motion.div>
          
          <motion.div style={{ y: y2 }} className="absolute bg-white p-2.5 pb-8 shadow-[0_12px_28px_rgba(36,17,16,0.28)] top-[60px] right-[4%] w-[150px] md:w-[200px] h-[170px] md:h-[220px] rotate-[4deg]">
            <div className="w-full h-full bg-[var(--berry)] bg-[url('https://images.unsplash.com/photo-1516559828984-fb3b99548b21?w=500&q=80')] bg-cover bg-center"></div>
            <div className="font-script text-[17px] text-center mt-[7px]">jamison square</div>
          </motion.div>

          <motion.div style={{ y: y3 }} className="absolute bg-white p-2.5 pb-8 shadow-[0_12px_28px_rgba(36,17,16,0.28)] bottom-0 left-[30%] w-[150px] md:w-[190px] h-[170px] md:h-[200px] rotate-[-2deg]">
            <div className="w-full h-full bg-[var(--gold)] bg-[url('https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80')] bg-cover bg-center"></div>
            <div className="font-script text-[17px] text-center mt-[7px]">miss oz herself ♥</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
