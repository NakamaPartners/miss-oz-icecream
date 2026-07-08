import { useState, useEffect, useRef } from 'react';

const FLAVORS = [
  {
    title: 'Marionberry',
    kicker: 'hand crafted',
    sub: 'Deep Oregon berry, churned in small batches right in the shop.',
    bg: '#EAB8CE',
    blob: '#8C2A54',
    photo: '/images/cone-marionberry.png',
    ink: '#241110',
    shadow: 'rgba(255,255,255,0.4)',
    tag: 'the OG',
  },
  {
    title: 'Thai Iced Tea',
    kicker: 'parlor favorite',
    sub: 'Sweet, spiced, and impossible to have just once.',
    bg: '#E3B44C',
    blob: '#5E1735',
    photo: '/images/cone-orange.png',
    ink: '#241110',
    shadow: 'rgba(251,242,223,0.5)',
    tag: 'sells out. often.',
  },
  {
    title: 'Oreo Croffle Pop',
    kicker: 'fresh from the iron',
    sub: 'Croissant-waffle, cookies, cream — the neighborhood legend.',
    bg: '#8C2A54',
    blob: '#EAB8CE',
    photo: '/images/cone-strawberry.png',
    ink: '#F2E1C2',
    shadow: 'rgba(36,17,16,0.45)',
    tag: 'neighborhood legend',
  },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [artOpacity, setArtOpacity] = useState(1);
  const [artRotate, setArtRotate] = useState(-3);
  const [artScale, setArtScale] = useState(1);
  const [blobTransform, setBlobTransform] = useState('rotate(-4deg) scale(1)');
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idxRef = useRef(0);

  const f = FLAVORS[idx];

  function spin(dir: number, currentIdx: number) {
    setArtOpacity(0);
    setArtRotate(dir * 14);
    setArtScale(0.7);
    setBlobTransform(`rotate(${dir * 10 - 4}deg) scale(0.92)`);
    setTimeout(() => {
      const nextIdx = (currentIdx + dir + FLAVORS.length) % FLAVORS.length;
      idxRef.current = nextIdx;
      setIdx(nextIdx);
      setArtOpacity(1);
      setArtRotate(nextIdx % 2 === 0 ? -3 : 3);
      setArtScale(1);
      setBlobTransform('rotate(-4deg) scale(1)');
    }, 230);
  }

  function go(dir: number) {
    if (autoRef.current) clearInterval(autoRef.current);
    spin(dir, idxRef.current);
    autoRef.current = setInterval(() => spin(1, idxRef.current), 5500);
  }

  useEffect(() => {
    autoRef.current = setInterval(() => spin(1, idxRef.current), 5500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  return (
    <div
      id="hero"
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-[5vw] pt-10 pb-[120px] text-center"
      style={{ background: f.bg, transition: 'background 0.7s ease' }}
    >
      {/* Floating SVG decorators */}
      <svg className="floater absolute z-10 hidden md:block" data-speed="0.5" data-rot="14"
        style={{ top: '34%', left: '4%', width: 70, height: 90 }} viewBox="0 0 60 80" aria-hidden="true">
        <path d="M18 34 L42 34 L31 74 L29 74 Z" fill="none" stroke="#241110" strokeWidth="3" strokeLinejoin="round"/>
        <circle cx="30" cy="22" r="14" fill="none" stroke="#241110" strokeWidth="3"/>
      </svg>
      <svg className="floater absolute z-10" data-speed="0.75" data-rot="-18"
        style={{ top: '30%', right: '4%', width: 54, height: 54 }} viewBox="0 0 46 46" aria-hidden="true">
        <circle cx="20" cy="28" r="11" fill="none" stroke="#241110" strokeWidth="3"/>
        <path d="M26 18 Q34 6 40 8" fill="none" stroke="#241110" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <svg className="floater absolute z-10" data-speed="0.6" data-rot="10"
        style={{ bottom: '22%', left: '10%', width: 50, height: 50 }} viewBox="0 0 46 46" aria-hidden="true">
        <path d="M23 4 L27 17 L41 17 L30 25 L34 39 L23 30 L12 39 L16 25 L5 17 L19 17 Z" fill="none" stroke="#241110" strokeWidth="3" strokeLinejoin="round"/>
      </svg>

      <span className="block text-[13px] tracking-[5px] uppercase font-bold mb-3.5" style={{ color: f.ink, opacity: 0.85 }}>
        Small batch · Portland, Oregon
      </span>

      <div
        className="text-[clamp(28px,4vw,40px)] mb-1 relative z-40"
        style={{ fontFamily: "'Yellowtail', cursive", color: f.ink, opacity: 0.95, transition: 'color 0.5s ease' }}
      >
        {f.kicker}
      </div>

      <h1
        className="max-w-[94vw] relative z-10 -mb-[14px]"
        style={{
          fontFamily: "'Macklin Display', 'Playfair Display', serif",
          fontWeight: 700,
          fontStyle: 'italic',
          fontSize: 'clamp(38px, 9.5vw, 122px)',
          lineHeight: 1.0,
          letterSpacing: '0.5px',
          color: f.ink,
          textShadow: `4px 4px 0 ${f.shadow}`,
          transition: 'color 0.5s ease, text-shadow 0.5s ease',
        }}
      >
        {f.title}
      </h1>

      {/* Stage */}
      <div
        className="relative flex items-center justify-center z-20"
        style={{ margin: '-30px 0 10px', width: 'min(430px, 88vw)', height: 'min(430px, 88vw)' }}
      >
        {/* Twinkle stars */}
        <svg style={{ position: 'absolute', top: '6%', right: '2%', zIndex: 3, animation: 'twinkle 2.2s infinite' }} width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill="#241110"/></svg>
        <svg style={{ position: 'absolute', bottom: '10%', left: '0%', zIndex: 3, animation: 'twinkle 2.8s infinite 0.7s' }} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill="#241110"/></svg>
        <svg style={{ position: 'absolute', top: '16%', left: '6%', zIndex: 3, animation: 'twinkle 3.1s infinite 1.2s' }} width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill="#241110"/></svg>

        {/* Flavor tag pill */}
        <div style={{
          position: 'absolute', top: '-6px', left: '-14px', zIndex: 4,
          background: 'var(--cocoa)', color: 'var(--cream)',
          fontFamily: "'Yellowtail', cursive", fontSize: 19,
          padding: '8px 18px', borderRadius: 22,
          transform: 'rotate(-8deg)', boxShadow: '4px 4px 0 rgba(36,17,16,0.25)',
        }}>
          {f.tag}
        </div>

        {/* Spinning badge */}
        <svg style={{ position: 'absolute', bottom: -26, right: -26, zIndex: 4, width: 104, height: 104, animation: 'spinbadge 14s linear infinite' }} viewBox="0 0 100 100" aria-hidden="true">
          <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>
          <circle cx="50" cy="50" r="49" fill="var(--cream)" stroke="#241110" strokeWidth="2"/>
          <text style={{ fontFamily: "'EB Garamond', serif", fontSize: 11.5, letterSpacing: '2.5px', fontWeight: 600, textTransform: 'uppercase', fill: '#241110' }}>
            <textPath href="#circ">Miss Oz · est. 2007 · Portland · scoops · croffles ·</textPath>
          </text>
          <circle cx="50" cy="50" r="7" fill="#8C2A54"/>
        </svg>

        {/* Side vine decorators */}
        <svg className="hidden md:block" style={{ position: 'absolute', left: -56, top: '38%', zIndex: 3 }} width="40" height="46" viewBox="0 0 40 46" aria-hidden="true"><path d="M34 6 Q22 12 30 23 M28 26 Q14 30 22 40" fill="none" stroke="#241110" strokeWidth="3.5" strokeLinecap="round"/></svg>
        <svg className="hidden md:block" style={{ position: 'absolute', right: -56, top: '38%', zIndex: 3, transform: 'scaleX(-1)' }} width="40" height="46" viewBox="0 0 40 46" aria-hidden="true"><path d="M34 6 Q22 12 30 23 M28 26 Q14 30 22 40" fill="none" stroke="#241110" strokeWidth="3.5" strokeLinecap="round"/></svg>

        {/* Blob */}
        <div
          className="absolute inset-[6%] z-10"
          style={{
            background: f.blob,
            opacity: 0.5,
            animation: 'blobmorph 7s ease-in-out infinite',
            transform: blobTransform,
            transition: 'background 0.7s ease, transform 0.7s ease',
          }}
        />

        {/* Ice cream cone photo */}
        <img
          src={f.photo}
          alt={f.title}
          className="absolute z-20"
          style={{
            inset: '5%',
            width: '90%',
            height: '90%',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            filter: 'drop-shadow(4px 8px 16px rgba(36,17,16,0.3))',
            animation: 'bob 4s ease-in-out infinite',
            opacity: artOpacity,
            transform: `rotate(${artRotate}deg) scale(${artScale})`,
            transition: 'transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.3s ease',
          }}
        />
      </div>

      <div
        className="text-[21px] max-w-[460px] mx-auto mt-[14px] mb-[24px] italic font-semibold relative z-30"
        style={{ color: f.ink, transition: 'color 0.5s ease' }}
      >
        {f.sub}
      </div>

      <button
        type="button"
        className="inline-block bg-[var(--cocoa)] text-[var(--cream)] py-4 px-10 rounded-[30px] text-[17px] tracking-[1.5px] font-semibold uppercase border-2 border-transparent z-30 hover:bg-[var(--berry)] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--cream)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        Order Online
      </button>

      {/* Dots */}
      <div className="flex gap-[10px] justify-center mt-[24px] z-30">
        {FLAVORS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show ${FLAVORS[i].title}`}
            aria-current={i === idx}
            onClick={() => { if (autoRef.current) clearInterval(autoRef.current); idxRef.current = i; setIdx(i); setArtOpacity(1); setArtRotate(i % 2 === 0 ? -3 : 3); setArtScale(1); }}
            className="w-[11px] h-[11px] rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cocoa)] focus-visible:ring-offset-2"
            style={{ background: i === idx ? 'var(--cocoa)' : 'rgba(36,17,16,0.25)', transform: i === idx ? 'scale(1.3)' : 'scale(1)' }}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <button
        type="button"
        aria-label="Previous flavor"
        onClick={() => go(-1)}
        className="absolute left-[5vw] top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-2 border-[var(--cream)] text-[var(--cream)] bg-[var(--cocoa)] z-30 hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--cream)]"
        style={{ width: 58, height: 58, fontSize: 22 }}
      >←</button>
      <button
        type="button"
        aria-label="Next flavor"
        onClick={() => go(1)}
        className="absolute right-[5vw] top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-2 border-[var(--cream)] text-[var(--cream)] bg-[var(--cocoa)] z-30 hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--cream)]"
        style={{ width: 58, height: 58, fontSize: 22 }}
      >→</button>

      {/* Scallop bottom */}
      <div className="clip-scallop absolute bottom-[-1px] left-0 right-0 h-[46px] z-40" />
    </div>
  );
}
