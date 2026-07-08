import { useState } from 'react';
import { motion } from 'framer-motion';

const INITIAL_FLAVORS = [
  { id: 1, name: 'Ube Honeycomb', note: 'purple, golden, a little dramatic', bg: 'var(--cream-hi)', rotate: -1.2, votes: 142 },
  { id: 2, name: 'Rose & Pistachio', note: 'the summer rose, all grown up', bg: '#F6D9E4', rotate: 1.4, votes: 310 },
  { id: 3, name: 'Brown Butter Croffle', note: 'the croffle, but frozen', bg: '#F0E2C4', rotate: -0.6, votes: 521 }
];

export default function VoteFlavor() {
  const [flavors, setFlavors] = useState(INITIAL_FLAVORS);
  const [hasVoted, setHasVoted] = useState(false);

  const totalVotes = flavors.reduce((acc, f) => acc + f.votes, 0);

  const handleVote = (id: number) => {
    if (hasVoted) return;
    setFlavors(prev => prev.map(f => f.id === id ? { ...f, votes: f.votes + 1 } : f));
    setHasVoted(true);
  };

  return (
    <section className="text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--cream)]">
      <motion.span 
        initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="block text-[12px] md:text-[13px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] mb-3.5"
      >
        Community
      </motion.span>
      <motion.span 
        initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
        className="block font-script text-[var(--berry-deep)] text-[clamp(32px,3.8vw,44px)] mb-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]"
      >
        you decide
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
        className="font-display font-normal uppercase text-[clamp(44px,6.6vw,84px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
      >
        Vote for the Next Flavor
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
        className="italic text-[19px] text-[#1d0e0d]"
      >
        Every couple of months, the neighborhood picks what we churn next.
      </motion.p>

      <div className="flex gap-[28px] flex-wrap justify-center max-w-[1000px] mx-auto mt-[44px]">
        {flavors.map((f, i) => {
          const pct = Math.round((f.votes / (totalVotes || 1)) * 100);
          
          return (
            <motion.div 
              key={f.id}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-[2.5px] border-[var(--cocoa)] rounded-[18px] p-[28px] w-full md:w-[290px] text-center shadow-[7px_7px_0_var(--cocoa)] flex flex-col items-center"
              style={{ background: f.bg, transform: `rotate(${f.rotate}deg)` }}
            >
              <h4 className="font-display font-normal text-[24px] mb-[6px] text-[var(--cocoa)]">{f.name}</h4>
              <div className="font-script text-[21px] text-[var(--berry)] mb-[16px]">{f.note}</div>
              
              <button 
                onClick={() => handleVote(f.id)}
                disabled={hasVoted}
                className="font-sans bg-[var(--cocoa)] text-[var(--cream)] border-none py-[12px] px-[30px] rounded-[26px] text-[17px] font-semibold tracking-[0.5px] disabled:opacity-50 hover:bg-[var(--berry)] transition-colors cursor-none mb-auto"
              >
                {hasVoted ? 'Voted' : 'Vote'}
              </button>

              <div className="w-full mt-[16px]">
                <div className="h-[10px] bg-[rgba(36,17,16,0.14)] rounded-[5px] overflow-hidden">
                  <div className="h-full bg-[var(--berry)] transition-all duration-700 ease-out" style={{ width: `${hasVoted ? pct : 0}%` }}></div>
                </div>
                <div className="text-[15px] mt-[7px] font-semibold text-[var(--cocoa)]">
                  {hasVoted ? `${pct}%` : '—'}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
