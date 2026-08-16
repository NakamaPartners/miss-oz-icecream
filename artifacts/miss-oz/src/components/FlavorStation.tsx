import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, animate, AnimatePresence } from 'framer-motion';

// ─── Featured Flavor Config ─────────────────────────────────────────────────
const FLAVOR = {
  name:        'Coconut Sorbet',
  status:      'coming-soon' as 'new' | 'coming-soon',
  script:      'something fresh is coming',
  headline:    'Pure Coconut',
  description: 'Smooth and creamy dairy-free sorbet — made with real coconut milk and cream.',
  tags:        [{ label: 'Dairy-free' }, { label: 'Coconut milk & cream' }],
  poster:      '/images/coconut-sorbet-poster_2.jpg',
  accent:      '#2B8A84',
  badgeFrom:   '#6ECBC4',
  badgeTo:     '#1A6460',
  glow:        'rgba(43,138,132,0.32)',
  bgOverlay:   'rgba(236,249,247,0.84)',
};

const macklin = { fontFamily: 'var(--font-groovy)', fontWeight: 400, fontStyle: 'italic' as const };

// ─── Vote Candidates ─────────────────────────────────────────────────────────
const CARDS = [
  { name: 'Ube Honeycomb',        note: 'purple, golden, a little dramatic', bg: 'var(--cream-hi)', img: '/images/flavor-ube.webp' },
  { name: 'Rose & Pistachio',     note: 'the summer rose, all grown up',      bg: '#F6D9E4',         img: '/images/flavor-rose.webp' },
  { name: 'Brown Butter Croffle', note: 'the croffle, but frozen',            bg: '#F0E2C4',         img: '/images/flavor-croffle.webp' },
];
const SEED_VOTES = [84, 121, 63];
const VOTE_KEY   = 'missoz-flavor-vote-v2';

// 16-point starburst
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
      className="parlour-paper relative overflow-hidden px-[6vw] py-[76px] md:py-[104px]"
      style={{
        backgroundColor: 'var(--cream-hi)',
        backgroundImage: `linear-gradient(${FLAVOR.bgOverlay}, ${FLAVOR.bgOverlay}), url(/images/seasonbg-autumn.webp)`,
        backgroundSize: 'auto, 640px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="max-w-[1260px] mx-auto">

        {/* ── Single eyebrow for the entire composition ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="text-center mb-[40px] md:mb-[52px]"
        >
          <span className="inline-flex items-center gap-3 text-[10px] tracking-[5px] uppercase font-bold"
            style={{ color: FLAVOR.accent, opacity: 0.7 }}>
            <Sparkle size={10} delay={0} />
            New Flavor Alert · Community Vote
            <Sparkle size={10} delay={1.2} />
          </span>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            THREE-COLUMN EDITORIAL COMPOSITION
            Left: flavor copy  ·  Center: poster  ·  Right: vote cards
            Everything at the same vertical level — one unified panel.
        ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,268px)_1fr] gap-8 md:gap-[52px] items-center">

          {/* ───────────────────────────
              LEFT — Featured Flavor Copy
          ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-left md:text-right"
          >
            <span
              className="block font-script text-[var(--berry-deep)] text-[clamp(22px,2.6vw,32px)] leading-snug mb-[6px]"
            >{FLAVOR.script}</span>

            <h2
              className="text-[clamp(46px,5.8vw,76px)] leading-[0.93] mb-[16px] text-[var(--cocoa)]"
              style={macklin}
            >{FLAVOR.headline}</h2>

            <p className="text-[16px] italic leading-relaxed text-[#1d0e0d] opacity-78 mb-[16px]">
              {FLAVOR.description}
            </p>

            <div className="flex flex-wrap gap-[9px] md:justify-end">
              {FLAVOR.tags.map(tag => (
                <span key={tag.label}
                  className="py-[6px] px-[15px] rounded-full text-[12px] font-semibold text-[var(--cream-hi)]"
                  style={{ background: FLAVOR.accent, border: `1.5px solid ${FLAVOR.badgeTo}` }}>
                  {tag.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ───────────────────────────
              CENTER — Poster (anchor)
          ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full"
          >
            {/* glow halo */}
            <div className="absolute -inset-8 rounded-[30px] blur-2xl -z-0"
              style={{ background: `radial-gradient(55% 50% at 50% 44%, ${FLAVOR.glow}, transparent 70%)` }}
              aria-hidden="true" />

            {/* wood frame */}
            <div className="poster-lift relative z-10 rounded-[8px] p-[10px]"
              style={{
                background: 'linear-gradient(150deg, #23100e, #3a1c17 55%, #23100e)',
                boxShadow: '0 24px 56px rgba(28,13,12,0.45), inset 0 0 0 1px rgba(255,244,214,0.14)',
              }}>
              <div className="tape-strip tape-peel top-[-10px] right-[10%] rotate-3" aria-hidden="true" />
              <div className="tape-strip tape-peel top-[-6px]  left-[10%] -rotate-6" aria-hidden="true" />
              <div className="rounded-[4px] p-[5px]" style={{ background: 'var(--cream-hi)' }}>
                <img loading="lazy" decoding="async" src={FLAVOR.poster}
                  alt={`${FLAVOR.name} — seasonal flavor at Miss Oz`}
                  className="block w-full h-auto rounded-[2px]"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(28,13,12,0.10)' }} />
              </div>
            </div>

            {/* starburst badge */}
            <div className="absolute z-20 -top-6 left-0 -rotate-12 motion-safe:animate-[newBadgeSwing_3.5s_ease-in-out_infinite]"
              style={{ filter: 'drop-shadow(0 5px 11px rgba(28,13,12,0.4))' }}>
              <div className="relative flex items-center justify-center w-[80px] h-[80px]"
                style={{ background: `radial-gradient(circle at 38% 32%, ${FLAVOR.badgeFrom} 0%, ${FLAVOR.badgeTo} 100%)`, clipPath: BURST }}>
                <div className="flex flex-col items-center justify-center w-[54px] h-[54px] rounded-full text-center leading-none"
                  style={{ border: '1.5px dashed var(--cream-hi)' }}>
                  <span aria-hidden="true" className="text-[var(--gold-hi)] text-[9px] leading-none">★</span>
                  <span className="uppercase text-[var(--cream-hi)] mt-[2px]"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '14px', letterSpacing: '1px', textShadow: '1px 1px 0 rgba(28,13,12,0.35)' }}>
                    {badge.top}
                  </span>
                  <span className="uppercase text-[var(--cream-hi)] opacity-80 mt-[2px] tracking-[1.5px]"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '5.5px', fontWeight: 700 }}>
                    {badge.bottom}
                  </span>
                </div>
              </div>
            </div>

            {/* Yum! accent */}
            <div className="absolute z-20 -right-2 -bottom-3 font-script text-[27px] text-[var(--berry)] -rotate-6 select-none"
              style={{ textShadow: '1px 1px 0 var(--cream-hi)' }} aria-hidden="true">Yum! Yum!</div>
            <Sparkle size={18} color="var(--gold-hi)" delay={0.4} className="absolute z-20 -left-2 top-8" />
          </motion.div>

          {/* ───────────────────────────
              RIGHT — Vote Section
              Same typographic rhythm as
              the left column — mirrors it.
          ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            id="vote"
            style={{ scrollMarginTop: '32px' }}
          >
            <span
              className="block font-script text-[var(--berry-deep)] text-[clamp(22px,2.6vw,32px)] leading-snug mb-[6px]"
            >you decide</span>

            <p className="text-[16px] italic text-[#1d0e0d] opacity-68 mb-[18px]">
              {revealed
                ? 'Tallied! We churn the winner next month — thanks for the vote.'
                : 'Every couple of months, the neighborhood picks what we churn next.'}
            </p>

            {/* Horizontal vote cards — compact, stack vertically */}
            <div className="flex flex-col gap-[10px]">
              {CARDS.map((card, i) => {
                const pct      = total ? Math.round((votes[i] / total) * 100) : 0;
                const isChoice = choice === i;
                const isLeader = revealed && i === leader;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.12 + i * 0.07 }}
                    animate={isChoice && !reduce ? { scale: [1, 1.025, 1] } : {}}
                    className="bulbframe relative rounded-[12px] p-[9px]"
                    style={{
                      background: 'var(--teal-deep)',
                      boxShadow: isLeader
                        ? '0 8px 24px rgba(140,42,84,0.28), 0 0 0 1.5px var(--gold-hi)'
                        : '0 3px 12px rgba(28,13,12,0.2)',
                      transition: 'box-shadow 0.45s ease',
                    }}
                  >
                    <AnimatePresence>
                      {isLeader && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, type: 'spring', stiffness: 280, damping: 18 }}
                          className="absolute -top-[10px] -right-[8px] z-20 px-[8px] py-[3px] rounded-full text-[9px] tracking-[1px] uppercase font-bold text-[var(--cream-hi)]"
                          style={{ background: 'var(--berry-deep)', border: '1.5px solid var(--gold-hi)' }}
                        >★ Leading</motion.div>
                      )}
                    </AnimatePresence>

                    {/* Horizontal layout inside the card */}
                    <div className="flex items-center gap-[10px] rounded-[7px] overflow-hidden"
                      style={{ background: card.bg, boxShadow: 'inset 0 0 0 1px rgba(28,13,12,0.06)' }}>

                      {/* Flavor image */}
                      <div className="shrink-0 w-[80px] h-[80px] flex items-center justify-center p-[6px]">
                        <img loading="lazy" decoding="async" src={card.img} alt="" aria-hidden="true"
                          className="w-full h-full object-contain"
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(28,13,12,0.22))' }} />
                      </div>

                      {/* Text + action */}
                      <div className="flex-1 py-[10px] pr-[12px]">
                        <div className="font-normal text-[16px] mb-[1px] text-[var(--cocoa)] leading-tight" style={macklin}>
                          {card.name}
                        </div>
                        <div className="font-script-alt text-[12px] text-[var(--berry)] mb-[8px] leading-snug">
                          {card.note}
                        </div>

                        {/* Sparkle burst */}
                        {burst === i && !reduce && (
                          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-30">
                            {Array.from({ length: 8 }).map((_, s) => {
                              const ang = (s / 8) * Math.PI * 2;
                              return (
                                <motion.span key={s} className="absolute text-[11px]"
                                  initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                                  animate={{ opacity: 0, x: Math.cos(ang)*55, y: Math.sin(ang)*55, scale: 1 }}
                                  transition={{ duration: 0.75, ease: 'easeOut' }}
                                  style={{ color: s % 2 ? 'var(--gold-hi)' : 'var(--berry)' }}>
                                  {s % 3 === 0 ? '♥' : '✦'}
                                </motion.span>
                              );
                            })}
                          </div>
                        )}

                        {!revealed ? (
                          <button onClick={() => handleVote(i)}
                            className="relative vote-btn clickable font-sans bg-[var(--cocoa)] text-[var(--cream)] border-none py-[6px] px-[14px] rounded-full text-[11.5px] font-semibold tracking-[0.4px] mech-btn hover:bg-[var(--berry)] hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--berry)]">
                            Vote for this
                            {burst === i && !reduce && [...Array(8)].map((_, j) => {
                              const angle = (j * 45 + Math.random() * 20 - 10) * (Math.PI / 180);
                              const dist  = 32 + Math.random() * 18;
                              const colors = ['var(--berry)', 'var(--gold-hi)', 'var(--cream-hi)'];
                              return (
                                <span key={j} className="sprinkle"
                                  style={{ '--tx': Math.cos(angle)*dist+'px', '--ty': Math.sin(angle)*dist+'px', '--r': Math.random()*360+'deg', backgroundColor: colors[j%colors.length] } as React.CSSProperties} />
                              );
                            })}
                          </button>
                        ) : (
                          <div className="flex items-center gap-[8px]">
                            <div className="text-[20px] leading-none shrink-0" style={{ ...macklin, color: 'var(--cocoa)' }}>
                              <CountUp to={pct} reduce={reduce} suffix="%" />
                            </div>
                            <div className="flex-1">
                              <div className="h-[5px] bg-[rgba(28,13,12,0.12)] rounded-full overflow-hidden">
                                <motion.div className="h-full rounded-full"
                                  style={{ background: isLeader ? 'var(--gold)' : FLAVOR.accent }}
                                  initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                                  transition={reduce ? { duration: 0 } : { duration: 0.9, ease: 'easeOut', delay: 0.15 }} />
                              </div>
                              <div className="text-[10px] mt-[3px] text-[var(--cocoa)] opacity-55">
                                <CountUp to={votes[i]} reduce={reduce} /> votes
                                {isChoice && <span className="ml-1 text-[var(--berry-deep)] font-bold">· your pick ♥</span>}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Vote total */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-[14px] text-[11px] tracking-[2px] uppercase font-semibold opacity-40"
              style={{ color: FLAVOR.accent }}
            >{total.toLocaleString()} neighbors have voted</motion.div>
          </motion.div>

        </div>
      </div>

      {/* Checkerboard strip */}
      <div className="checker-strip absolute bottom-0 left-0 right-0 h-[22px]" aria-hidden="true" />
    </section>
  );
}
