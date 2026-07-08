import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLAVORS = [
  { 
    id: 1, 
    name: 'Marionberry', 
    tag: 'the OG', 
    bg: 'var(--berry)', 
    image: '/images/marionberry.png', 
    desc: 'Deep Oregon berry, churned in small batches right in the shop.' 
  },
  { 
    id: 2, 
    name: 'Thai Iced Tea', 
    tag: 'made on-site', 
    bg: 'var(--gold)', 
    image: '/images/thai-tea.png', 
    desc: 'Rich black tea and sweet cream, steeped to perfection.' 
  },
  { 
    id: 3, 
    name: 'Croffle', 
    tag: 'all natural', 
    bg: 'var(--pink)', 
    image: '/images/croffle.png', 
    desc: 'Golden croissant waffle, baked fresh and topped with sweet cream.' 
  },
  { 
    id: 4, 
    name: 'Kulfi', 
    tag: 'pearl district', 
    bg: 'var(--berry-deep)', 
    image: '/images/kulfi.png', 
    desc: 'Cardamom, pistachio, and saffron in a dense, slow-melting treat.' 
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const current = FLAVORS[index];

  const next = () => setIndex((i) => (i + 1) % FLAVORS.length);
  const prev = () => setIndex((i) => (i - 1 + FLAVORS.length) % FLAVORS.length);

  return (
    <div 
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-[5vw] pt-10 pb-[120px] text-center transition-colors duration-700 ease-in-out" 
      style={{ background: current.bg }}
    >
      {/* Floating SVGs */}
      <svg className="absolute z-10 w-[70px] h-[90px] top-[34%] left-[4%] hidden md:block" viewBox="0 0 60 80" aria-hidden="true" style={{ transform: 'rotate(14deg)' }}>
        <path d="M18 34 L42 34 L31 74 L29 74 Z" fill="none" stroke="#241110" strokeWidth="3" strokeLinejoin="round"/>
        <circle cx="30" cy="22" r="14" fill="none" stroke="#241110" strokeWidth="3"/>
      </svg>
      <svg className="absolute z-10 w-[54px] h-[54px] top-[30%] right-[4%]" viewBox="0 0 46 46" aria-hidden="true" style={{ transform: 'rotate(-18deg)' }}>
        <circle cx="20" cy="28" r="11" fill="none" stroke="#241110" strokeWidth="3"/>
        <path d="M26 18 Q34 6 40 8" fill="none" stroke="#241110" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <svg className="absolute z-10 w-[50px] h-[50px] bottom-[22%] left-[10%]" viewBox="0 0 46 46" aria-hidden="true" style={{ transform: 'rotate(10deg)' }}>
        <path d="M23 4 L27 17 L41 17 L30 25 L34 39 L23 30 L12 39 L16 25 L5 17 L19 17 Z" fill="none" stroke="#241110" strokeWidth="3" strokeLinejoin="round"/>
      </svg>

      <span className="block text-[13px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] mb-3.5 opacity-85">
        Small batch · Portland, Oregon
      </span>
      
      <motion.div 
        key={current.tag} 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 0.95, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="font-script text-[clamp(28px,4vw,40px)] mb-1 text-[var(--cream)] relative z-40"
      >
        {current.tag}
      </motion.div>
      
      <motion.h1 
        key={current.name} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.6 }}
        className="font-display font-normal uppercase text-[clamp(38px,9.5vw,122px)] leading-none max-w-[94vw] text-[var(--cocoa)] tracking-[0.5px] -mb-[14px] relative z-10 drop-shadow-[4px_4px_0_rgba(255,255,255,0.35)]"
      >
        {current.name}
      </motion.h1>

      <div className="relative mx-auto mt-[-30px] mb-2.5 w-[min(430px,88vw)] h-[min(430px,88vw)] flex items-center justify-center z-20">
        
        {/* Twinkle Stars */}
        <svg className="absolute top-[6%] right-[2%] z-30 animate-[twinkle_2.2s_infinite]" width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill="#241110"/></svg>
        <svg className="absolute bottom-[10%] left-[0%] z-30 animate-[twinkle_2.8s_infinite_0.7s]" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill="#241110"/></svg>
        <svg className="absolute top-[16%] left-[6%] z-30 animate-[twinkle_3.1s_infinite_1.2s]" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill="#241110"/></svg>

        {/* Badge and side decor */}
        <svg className="absolute -bottom-[26px] -right-[26px] z-40 w-[104px] h-[104px] animate-[spinbadge_14s_linear_infinite]" viewBox="0 0 100 100" aria-hidden="true">
          <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>
          <circle cx="50" cy="50" r="49" fill="var(--cream)" stroke="#241110" strokeWidth="2"/>
          <text style={{ fontFamily: "'EB Garamond', serif", fontSize: "11.5px", letterSpacing: "2.5px", fontWeight: 600, textTransform: "uppercase", fill: "#241110" }}>
            <textPath href="#circ">Miss Oz · est. 2007 · Portland · scoops · croffles ·</textPath>
          </text>
          <circle cx="50" cy="50" r="7" fill="#8C2A54"/>
        </svg>

        <svg className="absolute -left-[56px] top-[38%] z-30 hidden md:block" width="40" height="46" viewBox="0 0 40 46" aria-hidden="true"><path d="M34 6 Q22 12 30 23 M28 26 Q14 30 22 40" fill="none" stroke="#241110" strokeWidth="3.5" strokeLinecap="round"/></svg>
        <svg className="absolute -right-[56px] top-[38%] z-30 hidden md:block" style={{ transform: "scaleX(-1)" }} width="40" height="46" viewBox="0 0 40 46" aria-hidden="true"><path d="M34 6 Q22 12 30 23 M28 26 Q14 30 22 40" fill="none" stroke="#241110" strokeWidth="3.5" strokeLinecap="round"/></svg>

        {/* Blob Background */}
        <div className="absolute inset-[6%] opacity-50 z-10 animate-[blobmorph_7s_ease-in-out_infinite] -rotate-3 transition-colors duration-700" style={{ background: current.bg, filter: 'brightness(1.1) saturate(1.2)' }}></div>
        
        {/* Product Art */}
        <AnimatePresence mode="wait">
          <motion.img 
            key={current.image}
            src={current.image}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-[8%] object-contain mix-blend-multiply drop-shadow-2xl animate-[bob_4s_ease-in-out_infinite] z-20 w-full h-full"
          />
        </AnimatePresence>
      </div>

      <motion.div 
        key={current.desc} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.6 }}
        className="text-[21px] max-w-[460px] mx-auto mt-3.5 mb-6 italic font-semibold text-[var(--cocoa)] relative z-30"
      >
        {current.desc}
      </motion.div>

      <button className="inline-block bg-[var(--cocoa)] text-[var(--cream)] py-4 px-10 rounded-[30px] text-[17px] tracking-[1.5px] font-semibold uppercase border-2 border-transparent hover:bg-[var(--cream)] hover:text-[var(--cocoa)] hover:border-[var(--cocoa)] transition-all cursor-none z-30">
        Order Online
      </button>

      <div className="flex gap-2.5 justify-center mt-6 z-30">
        {FLAVORS.map((_, i) => (
          <div 
            key={i} 
            className={`w-[11px] h-[11px] rounded-full transition-all duration-300 cursor-none ${i === index ? 'bg-[var(--cocoa)] scale-[1.3]' : 'bg-[rgba(36,17,16,0.25)] hover:bg-[rgba(36,17,16,0.4)]'}`} 
            onClick={() => setIndex(i)} 
          />
        ))}
      </div>

      <div onClick={prev} className="absolute left-[5vw] top-1/2 -translate-y-1/2 w-[46px] md:w-[58px] h-[46px] md:h-[58px] rounded-full bg-[var(--cocoa)] text-[var(--cream)] flex items-center justify-center text-[18px] md:text-[22px] z-30 border-2 border-[var(--cream)] hover:scale-110 transition-transform cursor-none">←</div>
      <div onClick={next} className="absolute right-[5vw] top-1/2 -translate-y-1/2 w-[46px] md:w-[58px] h-[46px] md:h-[58px] rounded-full bg-[var(--cocoa)] text-[var(--cream)] flex items-center justify-center text-[18px] md:text-[22px] z-30 border-2 border-[var(--cream)] hover:scale-110 transition-transform cursor-none">→</div>

      <div className="absolute bottom-[-1px] left-0 right-0 h-[46px] clip-scallop z-40" />
    </div>
  );
}
