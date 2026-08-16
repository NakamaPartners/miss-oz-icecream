import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, animate, AnimatePresence } from 'framer-motion';

// ─── Featured Flavor Config ───────────────────────────────────────────────────
// To swap the featured flavor, update only this object.
const FLAVOR = {
  name:        'Coconut Sorbet',
  status:      'coming-soon' as 'new' | 'coming-soon',
  script:      'something fresh is coming',
  headline:    'Pure Coconut',
  description: 'Smooth and creamy dairy-free sorbet made with natural coconut milk and coconut cream.',
  tags: [
    { label: 'Dairy-free' },
    { label: 'Coconut milk & cream' },
  ],
  poster:      '/images/coconut-sorbet-poster_2.jpg',
  accent:      '#2B8A84',
  badgeFrom:   '#6ECBC4',
  badgeTo:     '#1A6460',
  glow:        'rgba(43,138,132,0.35)',
  bgOverlay:   'rgba(234,248,246,0.76)',
};
// ─────────────────────────────────────────────────────────────────────────────

// ─── Vote Candidates ──────────────────────────────────────────────────────────
const macklin = { fontFamily: 'var(--font-groovy)', fontWeight: 400, fontStyle: 'italic' as const };

const CARDS = [
  { name: 'Ube Honeycomb',        note: 'purple, golden, a little dramatic', bg: 'var(--cream-hi)', img: '/images/flavor-ube.webp' },
  { name: 'Rose & Pistachio',     note: 'the summer rose, all grown up',      bg: '#F6D9E4',         img: '/images/flavor-rose.webp' },
  { name: 'Brown Butter Croffle', note: 'the croffle, but frozen',            bg: '#F0E2C4',         img: '/images/flavor-croffle.webp' },
];
const SEED_VOTES = [84, 121, 63];
const VOTE_KEY = 'missoz-flavor-vote-v2';
// ─────────────────────────────────────────────────────────────────────────────

// 16-point starburst polygon
const BURST = `polygon(${Array.from({ length: 32 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 32;
  const r = i % 2 === 0 ? 50 : 41;
  return `${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`;
}).join(',')})`;

function Sparkle({ size = 22, color = FLAVOR.accent, delay = 0, className = '', style = {} as React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      className={className}
      style={{ animation: `twinkle 2.6s ${delay}s infinite`, ...style }}>
      <path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill={color} />
    </svg>
  );
}

function CountUp({ to, reduce, suffix = '' }: { to: number; reduce: boolean; suffix?: string }) {
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) { setVal(to); return; }
    const controls = animate(0, to, { duration: 0.9, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [to, reduce]);
  return <>{val}{suffix}</>;
}

async function fetchResults(): Promise<Record<string, number>> {
  const res = await fetch('/api/results');
  if (!res.ok) throw new Error('fetch failed');
  const data = await res.json() as { votes: Record<string, number> };
  return data.votes;
}
async function postVote(flavor: string): Promise<void> {
  const res = await fetch('/api/vote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ flavor }) });
  if (!res.ok) throw new Error('vote failed');
}

export default function FlavorStation() {
  const reduce = !!useReducedMotion();
  const badge = FLAVOR.status === 'new' ? { top: 'New!', bottom: 'This Season' } : { top: 'Soon!', bottom: 'Coming' };

  // Vote state
  const [votes, setVotes] = useState<number[]>(SEED_VOTES);
  const [choice, setChoice] = useState<number | null>(null);
  const [burst, setBurst] = useState<number | null>(null);
  const burstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = votes.reduce((a, b) => a + b, 0);
  const leader = votes.indexOf(Math.max(...votes));
  const revealed = choice !== null;

  useEffect(() => () => { if (burstTimer.current) clearTimeout(burstTimer.current); }, []);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(VOTE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { choice?: unknown };
      if (typeof saved.choice === 'number' && saved.choice >= 0 && saved.choice <= 2) setChoice(saved.choice);
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    fetchResults().then((apiVotes) => {
      const counts = CARDS.map((c) => apiVotes[c.name] ?? 0);
      if (counts.some((v) => v > 0)) setVotes(counts);
    }).catch(() => {});
  }, []);

  async function handleVote(i: number) {
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
      className="parlour-paper relative overflow-hidden"
      style={{
        backgroundColor: 'var(--cream-hi)',
        backgroundImage: `linear-gradient(${FLAVOR.bgOverlay}, ${FLAVOR.bgOverlay}), url(/images/seasonbg-autumn.webp)`,
        backgroundSize: 'auto, 640px',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* ══════════════════════════════════════════════════════════
          ACT 1 — FEATURED FLAVOR SPOTLIGHT
      ══════════════════════════════════════════════════════════ */}
      <div className="px-[6vw] pt-[84px] md:pt-[112px] pb-[72px] md:pb-[96px]">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,360px)_1fr] gap-12 md:gap-[72px] items-center max-w-[1240px] mx-auto">

          {/* ── Framed seasonal poster ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-[min(340px,84vw)]"
          >
            <div className="absolute -inset-6 rounded-[30px] blur-2xl -z-0"
              style={{ background: `radial-gradient(60% 55% at 50% 42%, ${FLAVOR.glow}, transparent 70%)` }}
              aria-hidden="true" />

            {/* dark wood frame */}
            <div className="poster-lift group relative z-10 rounded-[8px] p-[9px]"
              style={{
                background: 'linear-gradient(150deg, #23100e, #3a1c17 55%, #23100e)',
                boxShadow: '0 24px 54px rgba(28,13,12,0.4), inset 0 0 0 1px rgba(255,244,214,0.14)',
              }}>
              <div className="tape-strip tape-peel top-[-10px] right-[10%] rotate-3" aria-hidden="true" />
              <div className="tape-strip tape-peel top-[-6px]  left-[10%] -rotate-6" aria-hidden="true" />
              <div className="rounded-[4px] p-[6px]" style={{ background: 'var(--cream-hi)' }}>
                {FLAVOR.poster ? (
                  <img loading="lazy" decoding="async" src={FLAVOR.poster}
                    alt={`${FLAVOR.name} — seasonal flavor at Miss Oz`}
                    className="block w-full h-auto rounded-[2px]"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(28,13,12,0.12)' }} />
                ) : (
                  <div className="w-full rounded-[2px] flex flex-col items-center justify-center gap-6 py-16 px-8"
                    style={{ minHeight: '320px', background: `linear-gradient(165deg, ${FLAVOR.accent}28 0%, #152F26 65%)`, boxShadow: 'inset 0 0 0 1px rgba(28,13,12,0.12)' }}>
                    <div className="text-center leading-[1.1]" style={{ fontFamily: "'Cookie', cursive", fontSize: 'clamp(28px,8vw,42px)', color: 'var(--cream-hi)' }}>{FLAVOR.name}</div>
                    <div className="text-center tracking-[4px] uppercase" style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, color: FLAVOR.accent }}>
                      ✦&nbsp;{FLAVOR.status === 'coming-soon' ? 'Coming Soon' : 'Now Available'}&nbsp;✦
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* starburst badge */}
            <div className="absolute z-20 -top-7 left-1 -rotate-12 motion-safe:animate-[newBadgeSwing_3.5s_ease-in-out_infinite]"
              style={{ filter: 'drop-shadow(0 6px 12px rgba(28,13,12,0.4))' }}>
              <div className="relative flex items-center justify-center w-[92px] h-[92px]"
                style={{ background: `radial-gradient(circle at 38% 32%, ${FLAVOR.badgeFrom} 0%, ${FLAVOR.badgeTo} 100%)`, clipPath: BURST }}>
                <div className="flex flex-col items-center justify-center w-[62px] h-[62px] rounded-full text-center leading-none"
                  style={{ border: '1.5px dashed var(--cream-hi)' }}>
                  <span aria-hidden="true" className="text-[var(--gold-hi)] text-[10px] leading-none">★</span>
                  <span className="uppercase text-[var(--cream-hi)] mt-[3px]"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '17px', letterSpacing: '1px', textShadow: '1px 1px 0 rgba(28,13,12,0.35)' }}>
                    {badge.top}
                  </span>
                  <span className="uppercase text-[var(--cream-hi)] opacity-80 mt-[2px] tracking-[1.5px]"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '6.5px', fontWeight: 700 }}>
                    {badge.bottom}
                  </span>
                </div>
              </div>
            </div>

            {/* Yum! accent */}
            <div className="absolute z-20 -right-4 -bottom-5 font-script text-[36px] text-[var(--berry)] -rotate-6 select-none"
              style={{ textShadow: '2px 2px 0 var(--cream-hi)' }} aria-hidden="true">Yum! Yum!</div>
            <Sparkle size={26} color="var(--gold-hi)" delay={0.4} className="absolute z-20 -left-4 top-8" />
          </motion.div>

          {/* ── Copy block ── */}
          <div className="relative text-center md:text-left">
            <Sparkle size={20} delay={0} className="hidden md:block absolute -top-4 right-10" />
            <Sparkle size={16} color="var(--berry)" delay={0.8} className="hidden md:block absolute top-8 -right-2" />

            <motion.span
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-[12px] tracking-[4px] uppercase font-bold mb-3"
              style={{ color: FLAVOR.accent }}
            >
              <Sparkle size={15} delay={0.2} /> New Flavor Alert <Sparkle size={15} delay={0.6} />
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
              className="block font-script text-[var(--berry-deep)] text-[clamp(28px,3.4vw,40px)] mb-1"
            >{FLAVOR.script}</motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.14 }}
              className="text-[clamp(40px,5.6vw,74px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
              style={{ fontFamily: 'var(--font-groovy)', fontWeight: 400, fontStyle: 'italic' }}
            >{FLAVOR.headline}</motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="italic text-[18px] leading-relaxed text-[#1d0e0d] opacity-85 max-w-[440px] mx-auto md:mx-0"
            >{FLAVOR.description}</motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-7 flex flex-wrap gap-3 justify-center md:justify-start"
            >
              {FLAVOR.tags.map((tag) => (
                <span key={tag.label} className="py-2 px-4 rounded-full text-[14px] font-semibold text-[var(--cream-hi)] border-[1.5px] shadow-sm"
                  style={{ background: FLAVOR.accent, borderColor: FLAVOR.badgeTo }}>
                  {tag.label}
                </span>
              ))}
            </motion.div>

            {/* Bridge teaser — links the two acts visually */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.38 }}
              className="mt-10 hidden md:flex items-center gap-3"
            >
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${FLAVOR.accent}60)` }} />
              <span className="text-[11px] tracking-[3px] uppercase font-bold opacity-60" style={{ color: FLAVOR.accent }}>
                while you wait, cast your vote ↓
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          ORNAMENTAL DIVIDER
      ══════════════════════════════════════════════════════════ */}
      <div className="relative px-[6vw] py-0" aria-hidden="true">
        <div className="max-w-[1240px] mx-auto flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(94,23,53,0.25))' }} />
          <div className="flex items-center gap-3 px-4">
            <span className="text-[var(--gold)] text-[10px]">✦</span>
            <span className="text-[11px] tracking-[4px] uppercase font-bold text-[var(--cocoa)] opacity-50">Flavor Lab</span>
            <span className="text-[var(--pink)] text-[12px]">♥</span>
            <span className="text-[11px] tracking-[4px] uppercase font-bold text-[var(--cocoa)] opacity-50">Community Vote</span>
            <span className="text-[var(--gold)] text-[10px]">✦</span>
          </div>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(94,23,53,0.25))' }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          ACT 2 — VOTE FOR THE NEXT FLAVOR
      ══════════════════════════════════════════════════════════ */}
      <div id="vote" className="px-[6vw] pt-[56px] md:pt-[72px] pb-[96px] md:pb-[128px] text-center" style={{ scrollMarginTop: '32px' }}>

        {/* Section header */}
        <motion.span
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="block text-[12px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] opacity-60 mb-3"
        >Community</motion.span>
        <motion.span
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="block font-script text-[var(--berry-deep)] text-[clamp(30px,3.5vw,42px)] mb-2"
        >you decide</motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[clamp(42px,6vw,80px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
          style={macklin}
        >Vote for the Next Flavor</motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="italic text-[18px] text-[#1d0e0d] opacity-80 max-w-[520px] mx-auto"
        >
          {revealed
            ? 'Tallied! We churn the winner next month — thanks for the vote.'
            : 'Every couple of months, the neighborhood picks what we churn next. One vote each.'}
        </motion.p>

        {/* Vote cards */}
        <div className="flex gap-[22px] flex-wrap justify-center items-stretch max-w-[1160px] mx-auto mt-[46px]">
          {CARDS.map((card, i) => {
            const pct = total ? Math.round((votes[i] / total) * 100) : 0;
            const isChoice = choice === i;
            const isLeader = revealed && i === leader;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                animate={isChoice && !reduce ? { scale: [1, 1.05, 1] } : {}}
                className="bulbframe relative rounded-[16px] p-[15px] w-full md:w-[290px] flex"
                style={{
                  background: 'var(--teal-deep)',
                  boxShadow: isLeader
                    ? '0 12px 34px rgba(140,42,84,0.34), 0 0 0 2px var(--gold-hi)'
                    : '0 6px 20px rgba(28,13,12,0.28)',
                  transition: 'box-shadow 0.5s ease',
                }}
              >
                <AnimatePresence>
                  {isLeader && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, rotate: -6 }}
                      animate={{ opacity: 1, y: 0, rotate: -6 }}
                      transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 16 }}
                      className="absolute -top-[14px] -right-[10px] z-20 px-[14px] py-[6px] rounded-full text-[11px] tracking-[1.5px] uppercase font-bold text-[var(--cream-hi)]"
                      style={{ background: 'var(--berry-deep)', border: '1.5px solid var(--gold-hi)', boxShadow: '0 4px 12px rgba(28,13,12,0.25)' }}
                    >★ Now leading</motion.div>
                  )}
                </AnimatePresence>

                <div className="relative z-[1] flex flex-col text-center w-full rounded-[10px] px-[22px] pt-[22px] pb-[24px] overflow-hidden"
                  style={{ background: card.bg, boxShadow: 'inset 0 0 0 1px rgba(28,13,12,0.06)' }}>
                  <div className="absolute top-2 bottom-2 left-[6px] w-[14px] punch-holes opacity-60" aria-hidden="true" />
                  <div className="absolute top-2 bottom-2 right-[6px] w-[14px] punch-holes opacity-60" aria-hidden="true" />

                  <img loading="lazy" decoding="async" src={card.img} alt="" aria-hidden="true"
                    className="mx-auto w-[clamp(118px,58%,148px)] h-auto object-contain mb-[6px]"
                    style={{ filter: 'drop-shadow(0 4px 6px rgba(28,13,12,0.3))' }} />

                  <h3 className="font-normal text-[23px] mt-[6px] mb-[4px] text-[var(--cocoa)] relative z-10" style={macklin}>{card.name}</h3>
                  <div className="font-script-alt text-[20px] text-[var(--berry)] mb-[18px] relative z-10">{card.note}</div>

                  {burst === i && !reduce && (
                    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-30">
                      {Array.from({ length: 10 }).map((_, s) => {
                        const ang = (s / 10) * Math.PI * 2;
                        return (
                          <motion.span key={s} className="absolute text-[15px]"
                            initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                            animate={{ opacity: 0, x: Math.cos(ang) * 90, y: Math.sin(ang) * 90, scale: 1.15 }}
                            transition={{ duration: 0.85, ease: 'easeOut' }}
                            style={{ color: s % 2 ? 'var(--gold-hi)' : 'var(--berry)' }}>
                            {s % 3 === 0 ? '♥' : '✦'}
                          </motion.span>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-auto relative z-10 min-h-[64px] flex items-center justify-center">
                    {!revealed ? (
                      <button onClick={() => handleVote(i)}
                        className="relative vote-btn clickable font-sans bg-[var(--cocoa)] text-[var(--cream)] border-none py-[12px] px-[30px] rounded-full text-[15px] font-semibold tracking-[0.5px] mech-btn hover:bg-[var(--berry)] hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--berry)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
                        Vote for this
                        {burst === i && !reduce && [...Array(12)].map((_, j) => {
                          const angle = (j * 30 + Math.random() * 20 - 10) * (Math.PI / 180);
                          const dist = 50 + Math.random() * 30;
                          const colors = ['var(--berry)', 'var(--gold-hi)', 'var(--cream-hi)'];
                          return (
                            <span key={j} className="sprinkle"
                              style={{ '--tx': Math.cos(angle) * dist + 'px', '--ty': Math.sin(angle) * dist + 'px', '--r': Math.random() * 360 + 'deg', backgroundColor: colors[j % colors.length] } as React.CSSProperties} />
                          );
                        })}
                      </button>
                    ) : (
                      <div>
                        <div aria-hidden={!isChoice} className="text-[13px] font-bold tracking-[1px] uppercase mb-[12px]"
                          style={{ color: isChoice ? 'var(--berry-deep)' : 'transparent' }}>
                          {isChoice ? '♥ Your pick' : '\u00A0'}
                        </div>
                        <div className="flex items-baseline justify-center gap-[8px] mb-[10px]">
                          <span className="text-[34px] leading-none text-[var(--cocoa)]" style={macklin}>
                            <CountUp to={pct} reduce={reduce} suffix="%" />
                          </span>
                        </div>
                        <div className="h-[9px] bg-[rgba(28,13,12,0.12)] rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full"
                            style={{ background: isLeader ? 'var(--gold)' : 'var(--berry)' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={reduce ? { duration: 0 } : { duration: 0.9, ease: 'easeOut', delay: 0.15 }} />
                        </div>
                        <div className="text-[13px] mt-[8px] text-[var(--cocoa)] opacity-70">
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
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-[34px] text-[14px] tracking-[2px] uppercase font-semibold text-[var(--cocoa)] opacity-55"
        >{total.toLocaleString()} neighbors have voted</motion.div>
      </div>

      {/* Checkerboard parlour-floor strip */}
      <div className="checker-strip absolute bottom-0 left-0 right-0 h-[22px]" aria-hidden="true" />
    </section>
  );
}
