import { useState } from 'react';
import { motion } from 'framer-motion';

const macklin = { fontFamily: "'Macklin Display', 'Playfair Display', serif", fontWeight: 700, fontStyle: 'italic' };

const CARDS = [
  { name: 'Ube Honeycomb',        note: 'purple, golden, a little dramatic',   bg: 'var(--cream-hi)' },
  { name: 'Rose & Pistachio',     note: 'the summer rose, all grown up',        bg: '#F6D9E4'         },
  { name: 'Brown Butter Croffle', note: 'the croffle, but frozen',              bg: '#F0E2C4'         },
];

export default function VoteFlavor() {
  const [votes, setVotes] = useState([4, 6, 3]);
  const [voted, setVoted] = useState<boolean[]>([false, false, false]);

  const total = votes.reduce((a, b) => a + b, 0);

  function handleVote(i: number) {
    const next = [...votes]; next[i]++;
    setVotes(next);
    const nv = [...voted]; nv[i] = true;
    setVoted(nv);
  }

  return (
    <section className="text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--cream)]">
      <motion.span
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="block text-[12px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] opacity-60 mb-3"
      >
        Community
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
        className="block font-script text-[var(--berry-deep)] text-[clamp(30px,3.5vw,42px)] mb-2"
      >
        you decide
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
        className="text-[clamp(42px,6vw,80px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
        style={macklin}
      >
        Vote for the Next Flavor
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
        className="italic text-[18px] text-[#1d0e0d] opacity-80"
      >
        Every couple of months, the neighborhood picks what we churn next.
      </motion.p>

      <div className="flex gap-[20px] flex-wrap justify-center max-w-[1000px] mx-auto mt-[44px]">
        {CARDS.map((card, i) => {
          const pct = total ? Math.round((votes[i] / total) * 100) : 0;
          return (
            <motion.div
              key={i}
              data-flavor={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-[14px] p-[28px] w-full md:w-[290px] text-center"
              style={{
                background: card.bg,
                boxShadow: '0 4px 20px rgba(28,13,12,0.09)',
                border: '1px solid rgba(28,13,12,0.07)',
              }}
            >
              <h4 className="font-display font-normal text-[22px] mb-[5px] text-[var(--cocoa)]">{card.name}</h4>
              <div className="font-script text-[20px] text-[var(--berry)] mb-[16px]">{card.note}</div>

              <button
                onClick={() => handleVote(i)}
                className="vote-btn clickable font-sans bg-[var(--cocoa)] text-[var(--cream)] border-none py-[11px] px-[28px] rounded-full text-[15px] font-semibold tracking-[0.5px] hover:bg-[var(--berry)] transition-colors"
              >
                {voted[i] ? 'Voted ♥' : 'Vote'}
              </button>

              <div className="h-[6px] bg-[rgba(28,13,12,0.10)] rounded-full mt-[16px] overflow-hidden">
                <div
                  className="h-full bg-[var(--berry)] transition-all duration-[600ms] ease-out rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-[14px] mt-[8px] text-[var(--cocoa)] opacity-70">
                {pct}% of {total} votes
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
