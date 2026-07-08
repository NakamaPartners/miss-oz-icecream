import { useState, useEffect } from 'react';

const SONGS = [
  'Dream a Little Dream of Me · Ella Fitzgerald',
  'La Vie en Rose · Édith Piaf',
  'Fly Me to the Moon · Frank Sinatra',
  'Beyond the Sea · Bobby Darin',
  "Can't Help Falling in Love · Elvis",
  'La Mer · Charles Trenet',
];

export default function NowPlaying() {
  const [playing, setPlaying] = useState(true);
  const [song, setSong] = useState(0);
  const [open, setOpen] = useState(false);
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    // Auto-open once shortly after load, then let the user control it
    const t = setTimeout(() => setOpen(true), 3200);
    const t2 = setTimeout(() => setOpen(false), 9000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    // Respect reduced-motion: don't auto-cycle song titles
    if (!playing || reduced) return;
    const t = setInterval(() => setSong((s) => (s + 1) % SONGS.length), 6500);
    return () => clearInterval(t);
  }, [playing, reduced]);

  const animate = playing && !reduced;

  return (
    <div className="fixed bottom-5 left-5 z-[600] hidden sm:flex items-center" aria-hidden="false">
      <div
        className="flex items-center gap-3 pl-3 pr-1 py-1.5 rounded-full transition-all duration-500 ease-out overflow-hidden"
        style={{
          background: 'rgba(28,13,12,0.92)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 10px 30px rgba(28,13,12,0.35)',
          maxWidth: open ? 340 : 66,
        }}
        onMouseEnter={() => setOpen(true)}
      >
        {/* Text panel */}
        <div className="flex flex-col justify-center min-w-0 pl-1" style={{ order: 1 }}>
          <span className="text-[9px] tracking-[3px] uppercase font-bold text-[var(--gold-hi)] leading-none mb-1 whitespace-nowrap">
            {playing ? 'Now Playing' : 'Paused'}
          </span>
          <span className="text-[12.5px] text-[var(--cream)] leading-tight truncate" style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', maxWidth: 210 }}>
            {SONGS[song]}
          </span>
        </div>

        {/* Equalizer */}
        <div className="flex items-end gap-[3px] h-[20px] mr-1" style={{ order: 2 }} aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-[var(--pink)]"
              style={{
                height: '100%',
                transformOrigin: 'bottom',
                animation: animate ? `eq 0.9s ${i * 0.18}s ease-in-out infinite` : 'none',
                transform: animate ? undefined : 'scaleY(0.25)',
              }}
            />
          ))}
        </div>

        {/* Spinning vinyl (click to toggle) */}
        <button
          onClick={() => setPlaying((p) => !p)}
          className="clickable relative shrink-0 rounded-full cursor-none"
          style={{ order: 3, width: 54, height: 54 }}
          aria-label={playing ? 'Pause the parlor music' : 'Play the parlor music'}
          title={playing ? 'Pause' : 'Play'}
        >
          <svg
            viewBox="0 0 100 100"
            width="54"
            height="54"
            style={{ animation: 'spinbadge 4s linear infinite', animationPlayState: animate ? 'running' : 'paused' }}
          >
            <circle cx="50" cy="50" r="48" fill="#140807" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(242,225,194,0.12)" strokeWidth="1" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(242,225,194,0.12)" strokeWidth="1" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(242,225,194,0.12)" strokeWidth="1" />
            <circle cx="50" cy="50" r="18" fill="#8C2A54" />
            <circle cx="50" cy="50" r="17" fill="none" stroke="#E3B44C" strokeWidth="1" opacity="0.7" />
            <circle cx="50" cy="50" r="3.5" fill="#140807" />
          </svg>
          {/* subtle sheen */}
          <span className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.22), transparent 45%)' }} />
        </button>
      </div>
    </div>
  );
}
