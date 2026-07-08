import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const NOTES = [
  {
    bg: '#F6D9E4',
    text: `"We've been coming since our daughter was in a stroller. She's in high school now and still orders the marionberry."`,
    who: "— A Pearl District regular",
    rotate: -1
  },
  {
    bg: '#F0E2C4',
    text: `"The croffle changed my personality. I tell everyone at work about this place."`,
    who: "— Croffle convert, NW Johnson St.",
    rotate: 2
  },
  {
    bg: '#EAB8CE',
    text: `"It feels like an ice cream parlor from a movie. The music, the light, all of it. We slow down every time."`,
    who: "— Saturday afternoon visitor",
    rotate: -1.5
  }
];

export default function SweetNotes() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Pre-compute all transforms at top level — never inside .map() or helper functions
  const y0 = useTransform(scrollYProgress, [0, 0.15], [100, 0]);
  const opacity0 = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const scale0 = useTransform(scrollYProgress, [0, 0.15], [0.95, 1]);

  const y1 = useTransform(scrollYProgress, [0.3, 0.45], [100, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const scale1 = useTransform(scrollYProgress, [0.3, 0.45], [0.95, 1]);

  const y2 = useTransform(scrollYProgress, [0.6, 0.75], [100, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const scale2 = useTransform(scrollYProgress, [0.6, 0.75], [0.95, 1]);

  const noteStyles = [
    { y: y0, opacity: opacity0, scale: scale0 },
    { y: y1, opacity: opacity1, scale: scale1 },
    { y: y2, opacity: opacity2, scale: scale2 },
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] md:h-[340vh] bg-[var(--cream)]">
      <div className="sticky top-0 h-[100vh] flex flex-col items-center justify-center overflow-hidden">
        
        <div className="text-center mb-[30px] z-0">
          <span className="block text-[12px] md:text-[13px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] mb-3.5">Kind words</span>
          <span className="block font-script text-[var(--berry-deep)] text-[clamp(32px,3.8vw,44px)] mb-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">from the neighborhood</span>
          <h2 className="font-display font-normal uppercase text-[clamp(44px,6.6vw,84px)] leading-[0.98] text-[var(--cocoa)]">Sweet Notes</h2>
        </div>

        <div className="relative w-full flex justify-center items-center h-[300px]">
          {NOTES.map((note, i) => {
            const styles = noteStyles[i];
            return (
              <motion.div 
                key={i}
                style={{ 
                  y: styles.y, 
                  opacity: styles.opacity, 
                  scale: styles.scale,
                  rotate: note.rotate,
                  background: note.bg,
                  zIndex: i + 10
                }}
                className="absolute w-[min(460px,84vw)] p-[26px_22px] md:p-[34px_32px] rounded-[6px] shadow-[0_14px_30px_rgba(36,17,16,0.25)] text-[17px] md:text-[19px] leading-[1.6] italic"
              >
                <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 -rotate-2 w-[90px] h-[24px] bg-[rgba(199,154,59,0.4)]" />
                <p className="text-[#1d0e0d]">{note.text}</p>
                <span className="font-script not-italic text-[22px] block mt-[14px] text-[var(--berry-deep)]">
                  {note.who}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
