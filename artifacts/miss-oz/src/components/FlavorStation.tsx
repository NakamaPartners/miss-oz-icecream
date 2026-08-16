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
  bgOverlay:   'rgba(234,248,246,0.80)',
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
    const controls = animate(0, to, { duration: 0.9, ease: 'easeOut', onUpdate: v => setVal(Math.round(v)) });
    return () => controls.stop();
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
      className="parlour-paper relative overflow-hidden px-[6vw] pt-[84px] md:pt-[108px] pb-[100px] md:pb-[136px]"
      style={{
        backgroundColor: 'var(--cream-hi)',
        backgroundImage: `linear-gradient(${FLAVOR.bgOverlay}, ${FLAVOR.bgOverlay}), url(/images/seasonbg-autumn.webp)`,
        backgroundSize: 'auto, 640px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="max-w-[1240px] mx-auto">

        {/* ══════════════════════════════════════════════════════
            BAND 1 — FEATURED FLAVOR SPOTLIGHT
            Poster left · Flavor copy right — balanced heights
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,340px)_1fr] gap-10 md:gap-[72px] items-center">

          {/* ── Framed poster ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-[min(320px,80vw)]"
          >
            <div className="absolute -inset-6 rounded-[30px] blur-2xl -z-0"
              style={{ background: `radial-gradient(60% 55% at 50% 42%, ${FLAVOR.glow}, transparent 70%)` }}
              aria-hidden="true" />

            <div className="poster-lift group relative z-10 rounded-[8px] p-[9px]"
              style={{
                background: 'linear-gradient(150deg, #23100e, #3a1c17 55%, #23100e)',
                boxShadow: '0 24px 54px rgba(28,13,12,0.4), inset 0 0 0 1px rgba(255,244,214,0.14)',
              }}>
              <div className="tape-strip tape-peel top-[-10px] right-[10%] rotate-3" aria-hidden="true" />
              <div className="tape-strip tape-peel top-[-6px] left-[10%] -rotate-6" aria-hidden="true" />
              <div className="rounded-[4px] p-[6px]" style={{ background: 'var(--cream-hi)' }}>
                {FLAVOR.poster ? (
                  <img loading="lazy" decoding="async" src={FLAVOR.poster}
                    alt={`${FLAVOR.name} — seasonal flavor at Miss Oz`}
                    className="block w-full h-auto rounded-[2px]"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(28,13,12,0.12)' }} />
                ) : (
                  <div className="w-full rounded-[2px] flex flex-col items-center justify-center gap-6 py-16 px-8"
                    style={{ minHeight: '300px', background: `linear-gradient(165deg, ${FLAVOR.accent}28 0%, #152F26 65%)` }}>
                    <div className="text-center" style={{ fontFamily: "'Cookie', cursive", fontSize: 'clamp(28px,8vw,42px)', color: 'var(--cream-hi)' }}>
                      {FLAVOR.name}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Starburst badge */}
            <div className="absolute z-20 -top-7 left-1 -rotate-12 motion-safe:animate-[newBadgeSwing_3.5s_ease-in-out_infinite]"
              style={{ filter: 'drop-shadow(0 6px 12px rgba(28,13,12,0.4))' }}>
              <div className="relative flex items-center justify-center w-[88px] h-[88px]"
                style={{ background: `radial-gradient(circle at 38% 32%, ${FLAVOR.badgeFrom} 0%, ${FLAVOR.badgeTo} 100%)`, clipPath: BURST }}>
                <div className="flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full text-center leading-none"
                  style={{ border: '1.5px dashed var(--cream-hi)' }}>
                  <span aria-hidden="true" className="text-[var(--gold-hi)] text-[10px] leading-none">★</span>
                  <span className="uppercase text-[var(--cream-hi)] mt-[3px]"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '16px', letterSpacing: '1px', textShadow: '1px 1px 0 rgba(28,13,12,0.35)' }}>
                    {badge.top}
                  </span>
                  <span className="uppercase text-[var(--cream-hi)] opacity-80 mt-[2px] tracking-[1.5px]"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '6px', fontWeight: 700 }}>
                    {badge.bottom}
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute z-20 -right-4 -bottom-5 font-script text-[34px] text-[var(--berry)] -rotate-6 select-none"
              style={{ textShadow: '2px 2px 0 var(--cream-hi)' }} aria-hidden="true">Yum! Yum!</div>
            <Sparkle size={24} color="var(--gold-hi)" delay={0.4} className="absolute z-20 -left-4 top-8" />
          </motion.div>

          {/* ── Flavor copy ── */}
          <div className="relative text-left">
            <Sparkle size={18} delay={0}   className="hidden md:block absolute -top-3 right-8" />
            <Sparkle size={14} color="var(--berry)" delay={0.9} className="hidden md:block absolute top-8 -right-1" />

            <motion.span
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 text-[11px] tracking-[4px] uppercase font-bold mb-3"
              style={{ color: FLAVOR.accent }}
            >
              <Sparkle size={12} delay={0.2} /> New Flavor Alert <Sparkle size={12} delay={0.7} />
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.07 }}
              className="block font-script text-[var(--berry-deep)] text-[clamp(26px,3vw,38px)] mb-1 leading-snug"
            >{FLAVOR.script}</motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.12 }}
              className="text-[clamp(44px,5.6vw,72px)] leading-[0.96] mb-4 text-[var(--cocoa)]"
              style={macklin}
            >{FLAVOR.headline}</motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.18 }}
              className="italic text-[18px] leading-relaxed text-[#1d0e0d] opacity-80 max-w-[420px] mb-5"
            >{FLAVOR.description}</motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.24 }}
              className="flex flex-wrap gap-3"
            >
              {FLAVOR.tags.map(tag => (
                <span key={tag.label}
                  className="py-[7px] px-[18px] rounded-full text-[13px] font-semibold text-[var(--cream-hi)] border-[1.5px]"
                  style={{ background: FLAVOR.accent, borderColor: FLAVOR.badgeTo }}>
                  {tag.label}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            BRIDGE — full-width, reads as a sentence not a divider
        ══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-5 my-[56px] md:my-[72px]"
        >
          <div className="flex-1 border-t border-dashed" style={{ borderColor: `${FLAVOR.accent}55` }} />
          <div className="flex items-center gap-3 shrink-0">
            <Sparkle size={12} color="var(--gold-hi)" delay={0} />
            <span className="font-script text-[clamp(18px,1.8vw,24px)] text-[var(--berry-deep)] opacity-75 select-none">
              and next month's flavor? that's on you
            </span>
            <Sparkle size={12} color="var(--berry)" delay={1.1} />
          </div>
          <div className="flex-1 border-t border-dashed" style={{ borderColor: `${FLAVOR.accent}55` }} />
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            BAND 2 — VOTE SECTION (full-width, centered)
        ══════════════════════════════════════════════════════ */}
        <div id="vote" className="text-center" style={{ scrollMarginTop: '32px' }}>

          <motion.span
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="block font-script text-[var(--berry-deep)] text-[clamp(24px,2.8vw,36px)] mb-1"
          >you decide</motion.span>

          <motion.h3
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
            className="text-[clamp(38px,5vw,64px)] leading-[0.97] mb-4 text-[var(--cocoa)]"
            style={macklin}
          >Vote for the Next Flavor</motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.14 }}
            className="italic text-[17px] text-[#1d0e0d] opacity-75 mb-[40px] max-w-[480px] mx-auto"
          >
            {revealed
              ? 'Tallied! We churn the winner next month — thanks for the vote.'
              : 'Every couple of months, the neighborhood picks what we churn next. One vote each.'}
          </motion.p>

          {/* Vote cards — full width, 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px] md:gap-[24px]">
            {CARDS.map((card, i) => {
              const pct      = total ? Math.round((votes[i] / total) * 100) : 0;
              const isChoice = choice === i;
              const isLeader = revealed && i === leader;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  animate={isChoice && !reduce ? { scale: [1, 1.04, 1] } : {}}
                  className="bulbframe relative rounded-[16px] p-[14px] flex"
                  style={{
                    background: 'var(--teal-deep)',
                    boxShadow: isLeader
                      ? '0 12px 32px rgba(140,42,84,0.32), 0 0 0 2px var(--gold-hi)'
                      : '0 5px 18px rgba(28,13,12,0.24)',
                    transition: 'box-shadow 0.5s ease',
                  }}
                >
                  <AnimatePresence>
                    {isLeader && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, rotate: -6 }}
                        animate={{ opacity: 1, y: 0, rotate: -6 }}
                        transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 16 }}
                        className="absolute -top-[13px] -right-[9px] z-20 px-[12px] py-[5px] rounded-full text-[10px] tracking-[1.5px] uppercase font-bold text-[var(--cream-hi)]"
                        style={{ background: 'var(--berry-deep)', border: '1.5px solid var(--gold-hi)', boxShadow: '0 3px 10px rgba(28,13,12,0.2)' }}
                      >★ Now leading</motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative z-[1] flex flex-col text-center w-full rounded-[10px] px-[20px] pt-[20px] pb-[22px] overflow-hidden"
                    style={{ background: card.bg, boxShadow: 'inset 0 0 0 1px rgba(28,13,12,0.06)' }}>
                    <div className="absolute top-2 bottom-2 left-[6px] w-[12px] punch-holes opacity-55" aria-hidden="true" />
                    <div className="absolute top-2 bottom-2 right-[6px] w-[12px] punch-holes opacity-55" aria-hidden="true" />

                    <img loading="lazy" decoding="async" src={card.img} alt="" aria-hidden="true"
                      className="mx-auto w-[clamp(90px,50%,130px)] h-auto object-contain mb-[6px]"
                      style={{ filter: 'drop-shadow(0 4px 6px rgba(28,13,12,0.28))' }} />

                    <h4 className="font-normal text-[22px] mt-[4px] mb-[3px] text-[var(--cocoa)]" style={macklin}>{card.name}</h4>
                    <div className="font-script-alt text-[18px] text-[var(--berry)] mb-[18px]">{card.note}</div>

                    {burst === i && !reduce && (
                      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-30">
                        {Array.from({ length: 10 }).map((_, s) => {
                          const ang = (s / 10) * Math.PI * 2;
                          return (
                            <motion.span key={s} className="absolute text-[14px]"
                              initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                              animate={{ opacity: 0, x: Math.cos(ang) * 80, y: Math.sin(ang) * 80, scale: 1.1 }}
                              transition={{ duration: 0.85, ease: 'easeOut' }}
                              style={{ color: s % 2 ? 'var(--gold-hi)' : 'var(--berry)' }}>
                              {s % 3 === 0 ? '♥' : '✦'}
                            </motion.span>
                          );
                        })}
                      </div>
                    )}

                    <div className="mt-auto relative z-10 min-h-[62px] flex items-center justify-center">
                      {!revealed ? (
                        <button onClick={() => handleVote(i)}
                          className="relative vote-btn clickable font-sans bg-[var(--cocoa)] text-[var(--cream)] border-none py-[11px] px-[28px] rounded-full text-[14px] font-semibold tracking-[0.5px] mech-btn hover:bg-[var(--berry)] hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--berry)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
                          Vote for this
                          {burst === i && !reduce && [...Array(12)].map((_, j) => {
                            const angle = (j * 30 + Math.random() * 20 - 10) * (Math.PI / 180);
                            const dist  = 48 + Math.random() * 28;
                            const colors = ['var(--berry)', 'var(--gold-hi)', 'var(--cream-hi)'];
                            return (
                              <span key={j} className="sprinkle"
                                style={{ '--tx': Math.cos(angle)*dist+'px', '--ty': Math.sin(angle)*dist+'px', '--r': Math.random()*360+'deg', backgroundColor: colors[j%colors.length] } as React.CSSProperties} />
                            );
                          })}
                        </button>
                      ) : (
                        <div className="w-full">
                          <div className="text-[12px] font-bold tracking-[1px] uppercase mb-[10px]"
                            style={{ color: isChoice ? 'var(--berry-deep)' : 'transparent' }}>
                            {isChoice ? '♥ Your pick' : '\u00A0'}
                          </div>
                          <div className="flex items-baseline justify-center gap-2 mb-[10px]">
                            <span className="text-[32px] leading-none text-[var(--cocoa)]" style={macklin}>
                              <CountUp to={pct} reduce={reduce} suffix="%" />
                            </span>
                          </div>
                          <div className="h-[8px] bg-[rgba(28,13,12,0.12)] rounded-full overflow-hidden">
                            <motion.div className="h-full rounded-full"
                              style={{ background: isLeader ? 'var(--gold)' : 'var(--berry)' }}
                              initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                              transition={reduce ? { duration: 0 } : { duration: 0.9, ease: 'easeOut', delay: 0.15 }} />
                          </div>
                          <div className="text-[12px] mt-[7px] text-[var(--cocoa)] opacity-65">
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

          {/* Running total */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-[26px] text-[13px] tracking-[2px] uppercase font-semibold text-[var(--cocoa)] opacity-45"
          >{total.toLocaleString()} neighbors have voted</motion.div>
        </div>

      </div>

      {/* Checkerboard parlour-floor strip */}
      <div className="checker-strip absolute bottom-0 left-0 right-0 h-[22px]" aria-hidden="true" />
    </section>
  );
}
