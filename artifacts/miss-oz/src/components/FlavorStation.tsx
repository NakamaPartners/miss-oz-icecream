import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, animate, AnimatePresence } from 'framer-motion';

// ─── Config ──────────────────────────────────────────────────────────────────
const FLAVOR = {
  name:        'Coconut Sorbet',
  status:      'coming-soon' as 'new' | 'coming-soon',
  headline:    'Pure Coconut',
  script:      'something fresh is coming',
  description: 'Smooth and creamy dairy-free sorbet, made with real coconut milk and cream. No shortcuts.',
  tags:        ['Dairy-free', 'Coconut milk & cream'],
  poster:      '/images/coconut-sorbet-poster_2.jpg',
};

const CARDS = [
  { name: 'Licorice',       note: 'dark, bold, beautifully old-school',       bg: '#E9E3E5', symbol: '●' },
  { name: 'Vietnam Coffee', note: 'deep roast with a creamy condensed finish', bg: '#EAD8BE', symbol: '☕' },
  { name: 'Honey Lavender', note: 'wildflower honey with a soft floral bloom', bg: '#E6DDF4', symbol: '✿' },
];
const SEED_VOTES = [84, 121, 63];
const VOTE_KEY   = 'missoz-flavor-vote-v3';

const macklin = { fontFamily: 'var(--font-groovy)', fontWeight: 400, fontStyle: 'italic' as const };

// 16-pt starburst
const BURST = `polygon(${Array.from({ length: 32 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 32;
  const r = i % 2 === 0 ? 50 : 41;
  return `${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`;
}).join(',')})`;

function Sparkle({ size = 22, color = '#E3B44C', delay = 0, className = '', style = {} as React.CSSProperties }) {
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

// ─── Component ───────────────────────────────────────────────────────────────
export default function FlavorStation() {
  const reduce = !!useReducedMotion();
  const badgeLabel = FLAVOR.status === 'new' ? { top: 'New!', bottom: 'This Season' } : { top: 'Soon!', bottom: 'Coming' };

  const [votes,    setVotes]    = useState<number[]>(SEED_VOTES);
  const [choice,   setChoice]   = useState<number | null>(null);
  const [burst,    setBurst]    = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
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
    setVotes(v => v.map((n, idx) => idx === i ? n + 1 : n));
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
      className="relative overflow-hidden"
      style={{ background: 'var(--teal-deep)' }}
    >
      {/* Subtle top edge glow */}
      <div className="absolute inset-x-0 top-0 h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(159,212,190,0.35), transparent)' }}
        aria-hidden="true" />

      <div className="max-w-[1260px] mx-auto px-[6vw] py-[80px] md:py-[104px]">

        {/*
          TWO-COLUMN EDITORIAL PANEL
          Left  — featured flavor copy (top) + poster (bottom), uses justify-between
          Right — vote accordion, vertically centered in the same height
        */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 md:gap-[64px] items-stretch">

          {/* ══════════════════════════════════════
              LEFT — Flavor Reveal
          ══════════════════════════════════════ */}
          <div className="flex flex-col gap-0 items-center text-center">

            {/* Eyebrow + script + headline */}
            <motion.div
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* Eyebrow — heboh edition */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 280, damping: 18 }}
                className="inline-flex items-center gap-[10px] mb-[20px] px-[18px] py-[8px] rounded-full relative"
                style={{
                  background: '#E3B44C',
                  boxShadow: '0 0 0 3px rgba(227,180,76,0.25), 0 8px 28px rgba(227,180,76,0.35)',
                  animation: 'eyebrowPulse 2.8s ease-in-out infinite',
                }}
              >
                <span className="text-[11px] tracking-[3px] uppercase font-bold"
                  style={{ color: '#0d2f2b', fontFamily: 'var(--font-sans)' }}>
                  ★ New Flavor Alert ★
                </span>
              </motion.div>

              {/* Script lead */}
              <div
                className="text-[clamp(22px,2.6vw,34px)] leading-[1.1] mb-[6px]"
                style={{ fontFamily: 'var(--font-script)', color: '#E3B44C' }}
              >{FLAVOR.script}</div>

              {/* Groovy headline */}
              <h2
                className="text-[clamp(56px,7vw,96px)] leading-[0.92] mb-[24px]"
                style={{ ...macklin, color: 'var(--cream-hi)', letterSpacing: '-0.02em' }}
              >{FLAVOR.headline}</h2>
            </motion.div>

            {/* Poster — centered below the headline */}
            <motion.div
              initial={{ opacity: 0, y: 36, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative mb-[28px] w-full max-w-[320px]"
            >
              {/* Glow — more vivid on dark bg */}
              <div className="absolute -inset-8 rounded-[40px] blur-3xl -z-0"
                style={{ background: 'radial-gradient(55% 55% at 50% 46%, rgba(43,138,132,0.55), transparent 70%)' }}
                aria-hidden="true" />

              {/* Wood frame */}
              <div className="poster-lift relative z-10 rounded-[9px] p-[10px]"
                style={{
                  background: 'linear-gradient(150deg, #23100e, #3a1c17 55%, #23100e)',
                  boxShadow: '0 28px 64px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,244,214,0.16)',
                }}>
                <div className="tape-strip tape-peel top-[-10px] right-[10%]  rotate-3" aria-hidden="true" />
                <div className="tape-strip tape-peel top-[-6px]  left-[10%] -rotate-6" aria-hidden="true" />
                <div className="rounded-[5px] p-[5px]" style={{ background: 'var(--cream-hi)' }}>
                  <img loading="lazy" decoding="async" src={FLAVOR.poster}
                    alt={`${FLAVOR.name} seasonal flavor poster — Miss Oz Ice Cream`}
                    className="block w-full h-auto rounded-[2px]" />
                </div>
              </div>

              {/* Starburst badge */}
              <div className="absolute z-20 -top-5 left-0 -rotate-12 motion-safe:animate-[newBadgeSwing_3.5s_ease-in-out_infinite]"
                style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.5))' }}>
                <div className="relative flex items-center justify-center w-[82px] h-[82px]"
                  style={{ background: 'radial-gradient(circle at 38% 32%, #6ECBC4 0%, #1A6460 100%)', clipPath: BURST }}>
                  <div className="flex flex-col items-center justify-center w-[56px] h-[56px] rounded-full text-center leading-none"
                    style={{ border: '1.5px dashed var(--cream-hi)' }}>
                    <span className="text-[#E3B44C] text-[9px]">★</span>
                    <span className="uppercase text-[var(--cream-hi)] mt-[2px]"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '14px', letterSpacing: '1px' }}>
                      {badgeLabel.top}
                    </span>
                    <span className="uppercase text-[var(--cream-hi)] opacity-80 mt-[2px] tracking-[1.5px]"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '5.5px', fontWeight: 700 }}>
                      {badgeLabel.bottom}
                    </span>
                  </div>
                </div>
              </div>

              {/* Yum! accent — gold on dark bg */}
              <div className="absolute z-20 -right-2 -bottom-3 -rotate-6 select-none"
                style={{ fontFamily: 'var(--font-script)', fontSize: '28px', color: '#E3B44C', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                aria-hidden="true">Yum! Yum!</div>

              <Sparkle size={18} color="#E3B44C" delay={0.4} className="absolute z-20 -left-2 top-8" />
            </motion.div>

            {/* Description + tags — centered below the poster */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="w-full"
            >
              <p className="text-[15px] italic leading-relaxed mb-[16px] mx-auto max-w-[380px]"
                style={{ color: 'rgba(251,242,223,0.65)' }}>
                {FLAVOR.description}
              </p>
              <div className="flex flex-wrap gap-[9px] justify-center">
                {FLAVOR.tags.map(tag => (
                  <span key={tag}
                    className="py-[5px] px-[14px] rounded-full text-[11.5px] font-semibold"
                    style={{
                      color: '#9FD4BE',
                      background: 'rgba(159,212,190,0.1)',
                      border: '1px solid rgba(159,212,190,0.35)',
                      fontFamily: 'var(--font-sans)',
                    }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════
              RIGHT — Vote Accordion
              Vertically centered in the column.
          ══════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="flex flex-col justify-center gap-[4px]"
            id="vote"
            style={{ scrollMarginTop: '32px' }}
          >
            {/* Display headline */}
            <div className="mb-[18px]">
              <div className="inline-flex items-center gap-[10px] mb-[14px] self-start px-[12px] py-[5px] rounded-full"
                style={{ background: 'rgba(227,180,76,0.1)', border: '1px solid rgba(227,180,76,0.28)' }}>
                <span className="text-[9px] tracking-[4px] uppercase font-bold"
                  style={{ color: '#E3B44C', fontFamily: 'var(--font-sans)' }}>
                  Community Vote
                </span>
              </div>

              <div className="text-[clamp(56px,6.5vw,88px)] leading-[0.88] mb-[14px]"
                style={{ fontFamily: 'var(--font-groovy)', fontStyle: 'italic', color: '#E3B44C', letterSpacing: '-0.02em' }}>
                Vote Now!!
              </div>

              <p className="text-[15px] italic leading-relaxed"
                style={{ color: 'rgba(251,242,223,0.55)' }}>
                {revealed
                  ? 'Tallied — we churn the winner next month. ♥'
                  : 'Every couple of months, the neighborhood picks what we churn next. One vote each.'}
              </p>
            </div>

            {/* ── Accordion ── */}
            <div className="rounded-[16px] overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.11)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}>
              {CARDS.map((card, i) => {
                const pct      = total ? Math.round((votes[i] / total) * 100) : 0;
                const isChoice = choice === i;
                const isLeader = revealed && i === leader;
                const isOpen   = expanded === i;
                const isLast   = i === CARDS.length - 1;

                return (
                  <div key={i}>

                    {/* ── Collapsed row ── */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="w-full flex items-center gap-[12px] px-[16px] py-[13px] text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E3B44C]"
                      style={{ background: isOpen ? 'rgba(255,255,255,0.07)' : 'transparent', cursor: 'pointer' }}
                      aria-expanded={isOpen}
                    >
                      {/* Thumbnail in warm bg */}
                      <div className="shrink-0 w-[40px] h-[40px] rounded-[8px] flex items-center justify-center overflow-hidden"
                        style={{ background: card.bg }}>
                        <span aria-hidden="true"
                          className="leading-none"
                          style={{ fontSize: card.name === 'Licorice' ? '25px' : '24px', color: card.name === 'Licorice' ? '#23100e' : '#5E1735' }}>
                          {card.symbol}
                        </span>
                      </div>

                      {/* Name + note */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[16.5px] leading-tight truncate"
                          style={{ ...macklin, color: 'var(--cream-hi)' }}>
                          {card.name}
                          {isLeader && (
                            <span className="ml-[8px] text-[8.5px] tracking-[1px] uppercase font-bold px-[6px] py-[2px] rounded-full"
                              style={{ background: '#E3B44C', color: 'var(--teal-deep)', verticalAlign: 'middle', fontFamily: 'var(--font-sans)' }}>
                              ★ leading
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] truncate mt-[2px]"
                          style={{ fontFamily: 'var(--font-script-alt)', color: 'rgba(159,212,190,0.75)' }}>
                          {card.note}
                        </div>
                      </div>

                      {/* Toggle icon */}
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="shrink-0 w-[24px] h-[24px] rounded-full flex items-center justify-center text-[15px] font-light leading-none select-none"
                        style={{
                          color: isOpen ? 'var(--teal-deep)' : '#E3B44C',
                          background: isOpen ? '#E3B44C' : 'rgba(227,180,76,0.15)',
                          border: '1.5px solid rgba(227,180,76,0.45)',
                        }}
                        aria-hidden="true"
                      >+</motion.div>
                    </button>

                    {/* ── Expanded card — cream panel pops on dark bg ── */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="expanded"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="px-[12px] pb-[12px]">
                            <div className="relative rounded-[12px] overflow-hidden"
                              style={{
                                background: 'var(--cream-hi)',
                                boxShadow: isLeader
                                  ? '0 12px 36px rgba(0,0,0,0.4), 0 0 0 2px #E3B44C'
                                  : '0 8px 28px rgba(0,0,0,0.35)',
                              }}>

                              <div className="flex items-center gap-[14px] p-[14px]">

                                {/* Larger image */}
                                <div className="shrink-0 w-[88px] h-[88px] rounded-[8px] flex items-center justify-center"
                                  style={{ background: card.bg }}>
                                  <span aria-hidden="true"
                                    className="leading-none"
                                    style={{ fontSize: card.name === 'Licorice' ? '56px' : '48px', color: card.name === 'Licorice' ? '#23100e' : '#5E1735' }}>
                                    {card.symbol}
                                  </span>
                                </div>

                                {/* Details + CTA */}
                                <div className="flex-1 min-w-0">
                                  <div className="text-[19px] leading-tight mb-[3px]"
                                    style={{ ...macklin, color: 'var(--cocoa)' }}>
                                    {card.name}
                                  </div>
                                  <div className="text-[13px] mb-[12px]"
                                    style={{ fontFamily: 'var(--font-script-alt)', color: 'var(--berry)' }}>
                                    {card.note}
                                  </div>

                                  {/* Burst particles */}
                                  {burst === i && !reduce && (
                                    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-30">
                                      {Array.from({ length: 10 }).map((_, s) => {
                                        const ang = (s / 10) * Math.PI * 2;
                                        return (
                                          <motion.span key={s} className="absolute text-[13px]"
                                            initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
                                            animate={{ opacity: 0, x: Math.cos(ang)*68, y: Math.sin(ang)*68, scale: 1 }}
                                            transition={{ duration: 0.85, ease: 'easeOut' }}
                                            style={{ color: s % 2 ? '#E3B44C' : 'var(--berry)' }}>
                                            {s % 3 === 0 ? '♥' : '✦'}
                                          </motion.span>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {!revealed ? (
                                    <button onClick={() => handleVote(i)}
                                      className="relative vote-btn clickable font-sans border-none py-[8px] px-[20px] rounded-full text-[12.5px] font-semibold tracking-[0.4px] mech-btn transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--berry)] hover:-translate-y-0.5"
                                      style={{ background: 'var(--cocoa)', color: 'var(--cream-hi)', fontFamily: 'var(--font-sans)' }}>
                                      Vote for this ♥
                                      {burst === i && !reduce && [...Array(8)].map((_, j) => {
                                        const angle = (j * 45 + Math.random() * 20 - 10) * (Math.PI / 180);
                                        const dist  = 34 + Math.random() * 16;
                                        const colors = ['var(--berry)', '#E3B44C', 'var(--cream-hi)'];
                                        return (
                                          <span key={j} className="sprinkle"
                                            style={{ '--tx': Math.cos(angle)*dist+'px', '--ty': Math.sin(angle)*dist+'px', '--r': Math.random()*360+'deg', backgroundColor: colors[j%colors.length] } as React.CSSProperties} />
                                        );
                                      })}
                                    </button>
                                  ) : (
                                    <div className="flex items-center gap-[10px]">
                                      <div className="text-[26px] leading-none shrink-0"
                                        style={{ ...macklin, color: 'var(--cocoa)' }}>
                                        <CountUp to={pct} reduce={reduce} suffix="%" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="h-[6px] rounded-full overflow-hidden"
                                          style={{ background: 'rgba(28,13,12,0.1)' }}>
                                          <motion.div className="h-full rounded-full"
                                            style={{ background: isLeader ? '#C79A3B' : 'var(--teal)' }}
                                            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                                            transition={reduce ? { duration: 0 } : { duration: 0.9, ease: 'easeOut', delay: 0.1 }} />
                                        </div>
                                        <div className="text-[10.5px] mt-[4px]"
                                          style={{ color: 'var(--cocoa)', opacity: 0.55, fontFamily: 'var(--font-sans)' }}>
                                          <CountUp to={votes[i]} reduce={reduce} /> votes
                                          {isChoice && <span className="ml-1 font-bold" style={{ color: 'var(--berry-deep)', opacity: 1 }}>· your pick ♥</span>}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isLast && (
                      <div className="mx-[16px] h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Vote total */}
            <div className="mt-[14px] text-[10.5px] tracking-[3px] uppercase font-semibold"
              style={{ color: 'rgba(159,212,190,0.5)', fontFamily: 'var(--font-sans)' }}>
              {total.toLocaleString()} neighbors have voted
            </div>
          </motion.div>

        </div>
      </div>

      {/* Checkerboard strip */}
      <div className="checker-strip absolute bottom-0 left-0 right-0 h-[22px]" aria-hidden="true" />
    </section>
  );
}
