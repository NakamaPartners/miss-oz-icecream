import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, animate, AnimatePresence } from 'framer-motion';

// ─── Featured Flavor Config ─────────────────────────────────────────────────
const FLAVOR = {
  name:        'Coconut Sorbet',
  status:      'coming-soon' as 'new' | 'coming-soon',
  script:      'something fresh is coming',
  headline:    'Pure Coconut',
  description: 'Smooth and creamy dairy-free sorbet made with natural coconut milk and coconut cream.',
  tags:        [{ label: 'Dairy-free' }, { label: 'Coconut milk & cream' }],
  poster:      '/images/coconut-sorbet-poster_2.jpg',
  accent:      '#2B8A84',
  badgeFrom:   '#6ECBC4',
  badgeTo:     '#1A6460',
  glow:        'rgba(43,138,132,0.35)',
  bgOverlay:   'rgba(236,249,247,0.82)',
};

// ─── Vote Candidates ─────────────────────────────────────────────────────────
const macklin = { fontFamily: 'var(--font-groovy)', fontWeight: 400, fontStyle: 'italic' as const };

const CARDS = [
  { name: 'Ube Honeycomb',        note: 'purple, golden, a little dramatic', bg: 'var(--cream-hi)', img: '/images/flavor-ube.webp' },
  { name: 'Rose & Pistachio',     note: 'the summer rose, all grown up',      bg: '#F6D9E4',         img: '/images/flavor-rose.webp' },
  { name: 'Brown Butter Croffle', note: 'the croffle, but frozen',            bg: '#F0E2C4',         img: '/images/flavor-croffle.webp' },
];
const SEED_VOTES = [84, 121, 63];
const VOTE_KEY   = 'missoz-flavor-vote-v2';

// 16-point starburst polygon
const BURST = `polygon(${Array.from({ length: 32 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 32;
  const r = i % 2 === 0 ? 50 : 41;
  return `${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`;
}).join(',')})`;

function Sparkle({ size = 22, color = FLAVOR.accent, delay = 0, className = '', style = {} as React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      className={className} style={{ animation: `twinkle 2.6s ${delay}s infinite`, ...style }}>
      <path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill={color} />
    </svg>
  );
}

function CountUp({ to, reduce, suffix = '' }: { to: number; reduce: boolean; suffix?: string }) {
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) { setVal(to); return; }
    const ctrl = animate(0, to, { duration: 0.9, ease: 'easeOut', onUpdate: v => setVal(Math.round(v)) });
    return () => ctrl.stop();
  }, [to, reduce]);
  return <>{val}{suffix}</>;
}

async function fetchResults() {
  const res = await fetch('/api/results');
  if (!res.ok) throw new Error();
  return ((await res.json()) as { votes: Record<string, number> }).votes;
}
async function postVote(flavor: string) {
  await fetch('/api/vote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ flavor }) });
}

export default function FlavorStation() {
  const reduce = !!useReducedMotion();
  const badge  = FLAVOR.status === 'new' ? { top: 'New!', bottom: 'This Season' } : { top: 'Soon!', bottom: 'Coming' };

  const [votes, setVotes]   = useState<number[]>(SEED_VOTES);
  const [choice, setChoice] = useState<number | null>(null);
  const [burst,  setBurst]  = useState<number | null>(null);
  const burstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total    = votes.reduce((a, b) => a + b, 0);
  const leader   = votes.indexOf(Math.max(...votes));
  const revealed = choice !== null;

  useEffect(() => () => { if (burstTimer.current) clearTimeout(burstTimer.current); }, []);
  useEffect(() => {
    try {
      const { choice: c } = JSON.parse(localStorage.getItem(VOTE_KEY) ?? '{}') as { choice?: unknown };
      if (typeof c === 'number' && c >= 0 && c <= 2) setChoice(c);
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    fetchResults().then(api => {
      const counts = CARDS.map(c => api[c.name] ?? 0);
      if (counts.some(v => v > 0)) setVotes(counts);
    }).catch(() => {});
  }, []);

  function handleVote(i: number) {
    if (revealed) return;
    setVotes(votes.map((v, idx) => idx === i ? v + 1 : v));
    setChoice(i);
    try { localStorage.setItem(VOTE_KEY, JSON.stringify({ choice: i })); } catch { /* ignore */ }
    setBurst(i);
    if (!reduce) {
      if (burstTimer.current) clearTimeout(burstTimer.current);
      burstTimer.current = setTimeout(() => setBurst(null), 900);
    }
    postVote(CARDS[i].name).catch(() => {});
  }

  return (
    <section
      className="parlour-paper relative overflow-hidden px-[6vw] py-[80px] md:py-[112px]"
      style={{
        backgroundColor: 'var(--cream-hi)',
        backgroundImage: `linear-gradient(${FLAVOR.bgOverlay}, ${FLAVOR.bgOverlay}), url(/images/seasonbg-autumn.webp)`,
        backgroundSize: 'auto, 640px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-[72px]">

          {/* ═══════════════════════════════════════════════
              LEFT COLUMN
              Poster (top) + community vote seal (bottom)
              Together they anchor the full section height.
          ═══════════════════════════════════════════════ */}
          <div className="flex flex-col items-center gap-8">

            {/* Poster frame */}
            <motion.div
              initial={{ opacity: 0, y: 28, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[300px]"
            >
              {/* glow halo */}
              <div className="absolute -inset-6 rounded-[30px] blur-2xl -z-0"
                style={{ background: `radial-gradient(60% 55% at 50% 42%, ${FLAVOR.glow}, transparent 70%)` }}
                aria-hidden="true" />

              {/* wood frame */}
              <div className="poster-lift relative z-10 rounded-[8px] p-[9px]"
                style={{
                  background: 'linear-gradient(150deg, #23100e, #3a1c17 55%, #23100e)',
                  boxShadow: '0 22px 50px rgba(28,13,12,0.4), inset 0 0 0 1px rgba(255,244,214,0.14)',
                }}>
                <div className="tape-strip tape-peel top-[-10px] right-[10%] rotate-3" aria-hidden="true" />
                <div className="tape-strip tape-peel top-[-6px] left-[10%] -rotate-6" aria-hidden="true" />
                <div className="rounded-[4px] p-[5px]" style={{ background: 'var(--cream-hi)' }}>
                  <img loading="lazy" decoding="async" src={FLAVOR.poster}
                    alt={`${FLAVOR.name} — seasonal flavor at Miss Oz`}
                    className="block w-full h-auto rounded-[2px]"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(28,13,12,0.12)' }} />
                </div>
              </div>

              {/* starburst badge */}
              <div className="absolute z-20 -top-6 left-0 -rotate-12 motion-safe:animate-[newBadgeSwing_3.5s_ease-in-out_infinite]"
                style={{ filter: 'drop-shadow(0 5px 10px rgba(28,13,12,0.38))' }}>
                <div className="relative flex items-center justify-center w-[82px] h-[82px]"
                  style={{ background: `radial-gradient(circle at 38% 32%, ${FLAVOR.badgeFrom} 0%, ${FLAVOR.badgeTo} 100%)`, clipPath: BURST }}>
                  <div className="flex flex-col items-center justify-center w-[56px] h-[56px] rounded-full text-center leading-none"
                    style={{ border: '1.5px dashed var(--cream-hi)' }}>
                    <span aria-hidden="true" className="text-[var(--gold-hi)] text-[9px] leading-none">★</span>
                    <span className="uppercase text-[var(--cream-hi)] mt-[2px]"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '15px', letterSpacing: '1px', textShadow: '1px 1px 0 rgba(28,13,12,0.35)' }}>
                      {badge.top}
                    </span>
                    <span className="uppercase text-[var(--cream-hi)] opacity-80 mt-[2px] tracking-[1.5px]"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '5.5px', fontWeight: 700 }}>
                      {badge.bottom}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute z-20 -right-3 -bottom-4 font-script text-[30px] text-[var(--berry)] -rotate-6 select-none"
                style={{ textShadow: '1px 1px 0 var(--cream-hi)' }} aria-hidden="true">Yum! Yum!</div>
              <Sparkle size={20} color="var(--gold-hi)" delay={0.4} className="absolute z-20 -left-3 top-8" />
            </motion.div>

            {/* Community vote seal — fills column height, ties poster to vote section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5, type: 'spring', stiffness: 160, damping: 18 }}
              className="relative flex items-center justify-center w-[118px] h-[118px] rounded-full select-none"
              style={{
                background: `radial-gradient(circle at 38% 32%, ${FLAVOR.badgeFrom}28 0%, transparent 70%)`,
                border: `1.5px dashed ${FLAVOR.accent}70`,
                boxShadow: `0 4px 24px ${FLAVOR.glow}`,
              }}
              aria-hidden="true"
            >
              <div className="text-center">
                <div className="leading-none font-script text-[32px]" style={{ color: FLAVOR.accent }}>
                  <CountUp to={total} reduce={reduce} />
                </div>
                <div className="text-[7.5px] tracking-[2.5px] uppercase font-bold mt-[5px] leading-[1.4]"
                  style={{ fontFamily: 'var(--font-sans)', color: FLAVOR.accent, opacity: 0.72 }}>
                  neighbors<br />have voted
                </div>
              </div>
              <Sparkle size={9} color={FLAVOR.accent} delay={0.3} className="absolute -top-1 right-4" style={{ opacity: 0.65 }} />
              <Sparkle size={7} color="var(--gold-hi)" delay={1.4} className="absolute bottom-1 -left-1" style={{ opacity: 0.65 }} />
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════
              RIGHT COLUMN
              One continuous editorial flow — no dividers.
              Featured flavor flows straight into vote section
              the way a magazine article changes subject.
          ═══════════════════════════════════════════════ */}
          <div className="relative">
            <Sparkle size={16} delay={0}   className="hidden md:block absolute -top-2 right-6" />
            <Sparkle size={12} color="var(--berry)" delay={0.9} className="hidden md:block absolute top-8 -right-1" />

            {/* ── Featured Flavor ── */}
            <motion.span
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[10.5px] tracking-[4px] uppercase font-bold mb-[10px]"
              style={{ color: FLAVOR.accent }}
            >
              <Sparkle size={11} delay={0.2} /> New Flavor Alert <Sparkle size={11} delay={0.7} />
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.06 }}
              className="block font-script text-[var(--berry-deep)] text-[clamp(24px,2.8vw,36px)] leading-snug mb-[2px]"
            >{FLAVOR.script}</motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.11 }}
              className="text-[clamp(44px,5.4vw,70px)] leading-[0.95] mb-[14px] text-[var(--cocoa)]"
              style={macklin}
            >{FLAVOR.headline}</motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.17 }}
              className="text-[17px] italic leading-relaxed text-[#1d0e0d] opacity-78 max-w-[400px] mb-[14px]"
            >{FLAVOR.description}</motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.22 }}
              className="flex flex-wrap gap-[10px] mb-[36px]"
            >
              {FLAVOR.tags.map(tag => (
                <span key={tag.label}
                  className="py-[6px] px-[16px] rounded-full text-[12.5px] font-semibold text-[var(--cream-hi)]"
                  style={{ background: FLAVOR.accent, border: `1.5px solid ${FLAVOR.badgeTo}` }}>
                  {tag.label}
                </span>
              ))}
            </motion.div>

            {/* Inline ornament — typography breath, NOT a section divider */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.28 }}
              className="flex items-center gap-3 mb-[22px]"
            >
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${FLAVOR.accent}40, transparent)` }} />
              <Sparkle size={10} color={FLAVOR.accent} delay={0.5} style={{ opacity: 0.55 }} />
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, ${FLAVOR.accent}40, transparent)` }} />
            </motion.div>

            {/* ── Vote section — continues the story, no restart ── */}
            <div id="vote" style={{ scrollMarginTop: '32px' }}>

              <motion.span
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.06 }}
                className="block font-script text-[var(--berry-deep)] text-[clamp(22px,2.5vw,30px)] leading-snug mb-[4px]"
              >you decide what comes next</motion.span>

              <motion.p
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
                className="text-[15px] italic text-[#1d0e0d] opacity-65 mb-[22px]"
              >
                {revealed
                  ? 'Tallied! We churn the winner next month — thanks for the vote.'
                  : 'Every couple of months, the neighborhood picks what we churn next. One vote each.'}
              </motion.p>

              {/* Vote cards — 3 columns filling the right column */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[13px]">
                {CARDS.map((card, i) => {
                  const pct      = total ? Math.round((votes[i] / total) * 100) : 0;
                  const isChoice = choice === i;
                  const isLeader = revealed && i === leader;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.18 + i * 0.07 }}
                      animate={isChoice && !reduce ? { scale: [1, 1.03, 1] } : {}}
                      className="bulbframe relative rounded-[13px] p-[11px] flex"
                      style={{
                        background: 'var(--teal-deep)',
                        boxShadow: isLeader
                          ? '0 10px 26px rgba(140,42,84,0.3), 0 0 0 2px var(--gold-hi)'
                          : '0 4px 14px rgba(28,13,12,0.22)',
                        transition: 'box-shadow 0.5s ease',
                      }}
                    >
                      <AnimatePresence>
                        {isLeader && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, rotate: -6 }}
                            animate={{ opacity: 1, y: 0, rotate: -6 }}
                            transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 16 }}
                            className="absolute -top-[11px] -right-[8px] z-20 px-[9px] py-[3px] rounded-full text-[9px] tracking-[1px] uppercase font-bold text-[var(--cream-hi)]"
                            style={{ background: 'var(--berry-deep)', border: '1.5px solid var(--gold-hi)' }}
                          >★ Leading</motion.div>
                        )}
                      </AnimatePresence>

                      <div className="relative z-[1] flex flex-col text-center w-full rounded-[8px] px-[12px] pt-[14px] pb-[14px] overflow-hidden"
                        style={{ background: card.bg, boxShadow: 'inset 0 0 0 1px rgba(28,13,12,0.06)' }}>
                        <div className="absolute top-1 bottom-1 left-[4px] w-[9px] punch-holes opacity-45" aria-hidden="true" />
                        <div className="absolute top-1 bottom-1 right-[4px] w-[9px] punch-holes opacity-45" aria-hidden="true" />

                        <img loading="lazy" decoding="async" src={card.img} alt="" aria-hidden="true"
                          className="mx-auto w-[clamp(68px,44%,100px)] h-auto object-contain mb-[4px]"
                          style={{ filter: 'drop-shadow(0 3px 5px rgba(28,13,12,0.25))' }} />

                        <h4 className="font-normal text-[17px] mt-[3px] mb-[2px] text-[var(--cocoa)] leading-tight" style={macklin}>
                          {card.name}
                        </h4>
                        <div className="font-script-alt text-[13px] text-[var(--berry)] mb-[12px] leading-snug">
                          {card.note}
                        </div>

                        {/* Sparkle burst */}
                        {burst === i && !reduce && (
                          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-30">
                            {Array.from({ length: 8 }).map((_, s) => {
                              const ang = (s / 8) * Math.PI * 2;
                              return (
                                <motion.span key={s} className="absolute text-[12px]"
                                  initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                                  animate={{ opacity: 0, x: Math.cos(ang)*65, y: Math.sin(ang)*65, scale: 1 }}
                                  transition={{ duration: 0.8, ease: 'easeOut' }}
                                  style={{ color: s % 2 ? 'var(--gold-hi)' : 'var(--berry)' }}>
                                  {s % 3 === 0 ? '♥' : '✦'}
                                </motion.span>
                              );
                            })}
                          </div>
                        )}

                        <div className="mt-auto relative z-10 min-h-[52px] flex items-center justify-center">
                          {!revealed ? (
                            <button onClick={() => handleVote(i)}
                              className="relative vote-btn clickable font-sans bg-[var(--cocoa)] text-[var(--cream)] border-none py-[9px] px-[18px] rounded-full text-[12.5px] font-semibold tracking-[0.4px] mech-btn hover:bg-[var(--berry)] hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--berry)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
                              Vote for this
                              {burst === i && !reduce && [...Array(10)].map((_, j) => {
                                const angle = (j * 36 + Math.random() * 18 - 9) * (Math.PI / 180);
                                const dist  = 38 + Math.random() * 22;
                                const colors = ['var(--berry)', 'var(--gold-hi)', 'var(--cream-hi)'];
                                return (
                                  <span key={j} className="sprinkle"
                                    style={{ '--tx': Math.cos(angle)*dist+'px', '--ty': Math.sin(angle)*dist+'px', '--r': Math.random()*360+'deg', backgroundColor: colors[j%colors.length] } as React.CSSProperties} />
                                );
                              })}
                            </button>
                          ) : (
                            <div className="w-full">
                              <div className="text-[11px] font-bold tracking-[1px] uppercase mb-[8px]"
                                style={{ color: isChoice ? 'var(--berry-deep)' : 'transparent' }}>
                                {isChoice ? '♥ Your pick' : '\u00A0'}
                              </div>
                              <div className="text-[26px] leading-none text-[var(--cocoa)] mb-[8px]" style={macklin}>
                                <CountUp to={pct} reduce={reduce} suffix="%" />
                              </div>
                              <div className="h-[7px] bg-[rgba(28,13,12,0.11)] rounded-full overflow-hidden">
                                <motion.div className="h-full rounded-full"
                                  style={{ background: isLeader ? 'var(--gold)' : 'var(--berry)' }}
                                  initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                                  transition={reduce ? { duration: 0 } : { duration: 0.9, ease: 'easeOut', delay: 0.15 }} />
                              </div>
                              <div className="text-[11px] mt-[6px] text-[var(--cocoa)] opacity-60">
                                <CountUp to={votes[i]} reduce={reduce} /> votes
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkerboard strip */}
      <div className="checker-strip absolute bottom-0 left-0 right-0 h-[22px]" aria-hidden="true" />
    </section>
  );
}
