import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, animate, AnimatePresence } from 'framer-motion';

const macklin = { fontFamily: 'var(--font-groovy)', fontWeight: 400, fontStyle: 'italic' as const };

const CARDS = [
  { name: 'Ube Honeycomb',        note: 'purple, golden, a little dramatic', bg: 'var(--cream-hi)', scoop: '#7C5AA6', drip: '#5E3F86' },
  { name: 'Rose & Pistachio',     note: 'the summer rose, all grown up',      bg: '#F6D9E4',         scoop: '#E39BB6', drip: '#8FA36B' },
  { name: 'Brown Butter Croffle', note: 'the croffle, but frozen',            bg: '#F0E2C4',         scoop: '#C79055', drip: '#9A6B37' },
];

/* Animated number that counts up on mount (or jumps instantly under reduced motion) */
function CountUp({ to, reduce, suffix = '' }: { to: number; reduce: boolean; suffix?: string }) {
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) { setVal(to); return; }
    const controls = animate(0, to, {
      duration: 0.9,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [to, reduce]);
  return <>{val}{suffix}</>;
}

/* A little hand-scooped cone glyph, tinted per flavor */
function Scoop({ scoop, drip }: { scoop: string; drip: string }) {
  return (
    <svg width="46" height="52" viewBox="0 0 46 52" aria-hidden="true" className="mx-auto">
      {/* scoop */}
      <circle cx="23" cy="17" r="14" fill={scoop} />
      <circle cx="18" cy="13" r="4" fill="rgba(255,255,255,0.35)" />
      {/* drip */}
      <path d="M14 24 q9 6 18 0" fill="none" stroke={drip} strokeWidth="1.6" opacity="0.5" />
      {/* cone */}
      <path d="M11 27 L35 27 L23 50 Z" fill="var(--gold)" />
      <path d="M16 27 L23 50 M23 27 L23 50 M30 27 L23 50" stroke="rgba(28,13,12,0.28)" strokeWidth="1" />
      <path d="M11 27 L35 27" stroke="rgba(28,13,12,0.28)" strokeWidth="1" />
    </svg>
  );
}

export default function VoteFlavor() {
  const reduce = !!useReducedMotion();
  const [votes, setVotes] = useState([84, 121, 63]);
  const [choice, setChoice] = useState<number | null>(null);
  const [burst, setBurst] = useState<number | null>(null);
  const burstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = votes.reduce((a, b) => a + b, 0);
  const leader = votes.indexOf(Math.max(...votes));
  const revealed = choice !== null;

  useEffect(() => () => { if (burstTimer.current) clearTimeout(burstTimer.current); }, []);

  function handleVote(i: number) {
    if (revealed) return;
    setVotes((prev) => prev.map((v, idx) => (idx === i ? v + 1 : v)));
    setChoice(i);
    setBurst(i);
    if (!reduce) {
      if (burstTimer.current) clearTimeout(burstTimer.current);
      burstTimer.current = setTimeout(() => setBurst(null), 900);
    }
  }

  return (
    <section className="parlour-paper text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--cream)] overflow-hidden">
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
        {revealed
          ? 'Tallied! We churn the winner next month — thanks for the vote.'
          : 'Every couple of months, the neighborhood picks what we churn next. One vote each.'}
      </motion.p>

      <div className="flex gap-[22px] flex-wrap justify-center items-stretch max-w-[1000px] mx-auto mt-[46px]">
        {CARDS.map((card, i) => {
          const pct = total ? Math.round((votes[i] / total) * 100) : 0;
          const isChoice = choice === i;
          const isLeader = revealed && i === leader;
          return (
            <motion.div
              key={i}
              data-flavor={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              animate={isChoice && !reduce ? { scale: [1, 1.05, 1] } : {}}
              className="relative rounded-[16px] p-[28px] pt-[30px] w-full md:w-[290px] text-center flex flex-col"
              style={{
                background: card.bg,
                boxShadow: isLeader
                  ? '0 10px 30px rgba(140,42,84,0.28), 0 0 0 2px var(--gold-hi)'
                  : '0 4px 20px rgba(28,13,12,0.09)',
                border: '1px solid rgba(28,13,12,0.07)',
                transition: 'box-shadow 0.5s ease',
              }}
            >
              {/* Leader ribbon */}
              <AnimatePresence>
                {isLeader && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, rotate: -6 }}
                    animate={{ opacity: 1, y: 0, rotate: -6 }}
                    transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 16 }}
                    className="absolute -top-[14px] -right-[10px] z-20 px-[14px] py-[6px] rounded-full text-[11px] tracking-[1.5px] uppercase font-bold text-[var(--cream-hi)]"
                    style={{ background: 'var(--berry-deep)', border: '1.5px solid var(--gold-hi)', boxShadow: '0 4px 12px rgba(28,13,12,0.25)' }}
                  >
                    ★ Now leading
                  </motion.div>
                )}
              </AnimatePresence>

              <Scoop scoop={card.scoop} drip={card.drip} />

              <h3 className="font-normal text-[23px] mt-[10px] mb-[4px] text-[var(--cocoa)]" style={macklin}>{card.name}</h3>
              <div className="font-script text-[20px] text-[var(--berry)] mb-[18px]">{card.note}</div>

              {/* Sparkle burst on vote */}
              {burst === i && !reduce && (
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-30">
                  {Array.from({ length: 10 }).map((_, s) => {
                    const ang = (s / 10) * Math.PI * 2;
                    return (
                      <motion.span
                        key={s}
                        className="absolute text-[15px]"
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, x: Math.cos(ang) * 90, y: Math.sin(ang) * 90, scale: 1.15 }}
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                        style={{ color: s % 2 ? 'var(--gold-hi)' : 'var(--berry)' }}
                      >
                        {s % 3 === 0 ? '♥' : '✦'}
                      </motion.span>
                    );
                  })}
                </div>
              )}

              {/* Button (before vote) or result (after) */}
              <div className="mt-auto">
                {!revealed ? (
                  <button
                    onClick={() => handleVote(i)}
                    className="vote-btn clickable font-sans bg-[var(--cocoa)] text-[var(--cream)] border-none py-[12px] px-[30px] rounded-full text-[15px] font-semibold tracking-[0.5px] hover:bg-[var(--berry)] hover:scale-[1.04] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--berry)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    Vote for this
                  </button>
                ) : (
                  <div>
                    <div
                      aria-hidden={!isChoice}
                      className="text-[13px] font-bold tracking-[1px] uppercase mb-[12px]"
                      style={{ color: isChoice ? 'var(--berry-deep)' : 'transparent' }}
                    >
                      {isChoice ? '♥ Your pick' : '\u00A0'}
                    </div>
                    <div className="flex items-baseline justify-center gap-[8px] mb-[10px]">
                      <span className="text-[34px] leading-none text-[var(--cocoa)]" style={macklin}>
                        <CountUp to={pct} reduce={reduce} suffix="%" />
                      </span>
                    </div>
                    <div className="h-[9px] bg-[rgba(28,13,12,0.12)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: isLeader ? 'var(--gold)' : 'var(--berry)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={reduce ? { duration: 0 } : { duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                      />
                    </div>
                    <div className="text-[13px] mt-[8px] text-[var(--cocoa)] opacity-70">
                      <CountUp to={votes[i]} reduce={reduce} /> votes
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Running total */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-[34px] text-[14px] tracking-[2px] uppercase font-semibold text-[var(--cocoa)] opacity-55"
      >
        {total.toLocaleString()} neighbors have voted
      </motion.div>
    </section>
  );
}
