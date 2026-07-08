import { useState } from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  { name: 'Ube Honeycomb',       note: 'purple, golden, a little dramatic',   bg: 'var(--cream-hi)', rotate: -1.2 },
  { name: 'Rose & Pistachio',    note: 'the summer rose, all grown up',        bg: '#F6D9E4',          rotate:  1.4 },
  { name: 'Brown Butter Croffle',note: 'the croffle, but frozen',              bg: '#F0E2C4',          rotate: -0.6 },
];

export default function VoteFlavor() {
  const [votes, setVotes] = useState([4, 6, 3]);
  const [voted, setVoted] = useState<boolean[]>([false, false, false]);

  const total = votes.reduce((a, b) => a + b, 0);

  function handleVote(i: number) {
    const next = [...votes];
    next[i]++;
    setVotes(next);
    const nextVoted = [...voted];
    nextVoted[i] = true;
    setVoted(nextVoted);
  }

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
        {CARDS.map((card, i) => {
          const pct = total ? Math.round((votes[i] / total) * 100) : 0;
          return (
            <motion.div
              key={i}
              data-flavor={i}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-[2.5px] border-[var(--cocoa)] rounded-[18px] p-[28px] w-full md:w-[290px] text-center shadow-[7px_7px_0_var(--cocoa)]"
              style={{ background: card.bg, transform: `rotate(${card.rotate}deg)` }}
            >
              <h4 className="font-display font-normal text-[24px] mb-[6px] text-[var(--cocoa)]">{card.name}</h4>
              <div className="font-script text-[21px] text-[var(--berry)] mb-[16px]">{card.note}</div>

              <button
                onClick={() => handleVote(i)}
                className="vote-btn clickable font-sans bg-[var(--cocoa)] text-[var(--cream)] border-none py-[12px] px-[30px] rounded-[26px] text-[17px] font-semibold tracking-[0.5px] cursor-none"
              >
                {voted[i] ? 'Voted ♥' : 'Vote'}
              </button>

              <div className="h-[10px] bg-[rgba(36,17,16,0.14)] rounded-[5px] mt-[16px] overflow-hidden">
                <div
                  className="h-full bg-[var(--berry)] transition-all duration-[600ms] ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-[15px] mt-[7px] font-semibold text-[var(--cocoa)]">
                {pct}% of {total} votes
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
