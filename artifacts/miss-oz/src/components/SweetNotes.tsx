import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const macklin = { fontFamily: "'Macklin Display', 'Playfair Display', serif", fontWeight: 700, fontStyle: 'italic' };

const NOTES = [
  {
    bg: '#F6D9E4',
    text: `"We've been coming since our daughter was in a stroller. She's in high school now and still orders the marionberry."`,
    who: '— A Pearl District regular',
    rotate: -1,
  },
  {
    bg: '#F0E2C4',
    text: `"The croffle changed my personality. I tell everyone at work about this place."`,
    who: '— Croffle convert, NW Johnson St.',
    rotate: 2,
  },
  {
    bg: '#EAB8CE',
    text: `"It feels like an ice cream parlor from a movie. The music, the light, all of it. We slow down every time."`,
    who: '— Saturday afternoon visitor',
    rotate: -1.5,
  },
];

export default function SweetNotes() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const y0 = useTransform(scrollYProgress, [0, 0.15], [100, 0]);
  const opacity0 = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const scale0 = useTransform(scrollYProgress, [0, 0.15], [0.96, 1]);

  const y1 = useTransform(scrollYProgress, [0.3, 0.45], [100, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const scale1 = useTransform(scrollYProgress, [0.3, 0.45], [0.96, 1]);

  const y2 = useTransform(scrollYProgress, [0.6, 0.75], [100, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const scale2 = useTransform(scrollYProgress, [0.6, 0.75], [0.96, 1]);

  const noteStyles = [
    { y: y0, opacity: opacity0, scale: scale0 },
    { y: y1, opacity: opacity1, scale: scale1 },
    { y: y2, opacity: opacity2, scale: scale2 },
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] md:h-[340vh] bg-[var(--cream)]">
      <div className="sticky top-0 h-[100vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-[30px] z-0">
          <span className="block text-[12px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] opacity-60 mb-3">Kind words</span>
          <span className="block font-script text-[var(--berry-deep)] text-[clamp(30px,3.5vw,42px)] mb-2">from the neighborhood</span>
          <h2
            className="text-[clamp(42px,6vw,80px)] leading-[0.98] text-[var(--cocoa)]"
            style={macklin}
          >
            Sweet Notes
          </h2>
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
                  zIndex: i + 10,
                  boxShadow: '0 8px 32px rgba(28,13,12,0.14)',
                }}
                className="absolute w-[min(480px,88vw)] p-[26px_22px] md:p-[36px_34px] rounded-[4px] text-[17px] md:text-[19px] leading-[1.65] italic"
              >
                <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 -rotate-2 w-[80px] h-[20px] bg-[rgba(199,154,59,0.35)] rounded-sm" />
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
