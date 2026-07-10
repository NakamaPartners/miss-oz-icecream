const NAV = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Menu', target: 'menu' },
  { label: 'Order Online', target: 'menu' },
  { label: 'Wholesale', target: 'wholesale' },
  { label: 'Event', target: 'events' },
  { label: 'Contact', target: 'contact' },
];

const hrefFor = (t: string) => (t === 'home' ? '#home' : `#${t}`);

function handleNav(e: React.MouseEvent<HTMLAnchorElement>, target: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth';
  e.preventDefault();
  if (target === 'home') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(target)?.scrollIntoView({ behavior });
}

export default function Postcard() {
  return (
    <section id="home" className="relative px-[4vw] pt-[clamp(24px,4vw,56px)] pb-[clamp(14px,2vw,26px)]" style={{ background: 'var(--cocoa)' }} aria-label="Miss Oz Ice Cream & Dessert Cafe">
      <div className="postcard relative flex items-center mx-auto max-w-[1120px] min-h-[clamp(380px,44vw,620px)]">
        <img
          src="/images/postcard-hero.png"
          alt="A vintage postcard photo of a three-scoop ice cream sundae in a fluted glass on a wooden table, with a Pacific Northwest forest, mountain and steel bridge behind it"
          className="photo-vintage absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        <div className="postcard-scrim" aria-hidden="true" />
        <div className="postcard-aged" aria-hidden="true" />
        <div className="filmgrain" aria-hidden="true" />

        {/* Made in Portland stamp */}
        <div
          className="vstamp absolute top-[5%] right-[4%] flex flex-col items-center justify-center text-center leading-none"
          style={{ width: 'clamp(62px,7vw,92px)', height: 'clamp(62px,7vw,92px)', background: 'rgba(244,236,214,0.9)', color: 'var(--brick)' }}
        >
          <span className="uppercase font-bold tracking-[1px]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(7px,0.7vw,9px)' }}>Made in</span>
          <span className="uppercase font-bold leading-tight" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(9px,0.95vw,13px)' }}>Portland<br />Oregon</span>
        </div>

        {/* Text block */}
        <div className="relative z-10 w-full max-w-[600px] px-[clamp(24px,4.5vw,64px)] py-[clamp(28px,4vw,56px)]">
          <div className="flex items-center gap-2 text-[var(--brick)] mb-1">
            <span className="text-[11px]">✦</span>
            <span className="uppercase font-bold tracking-[4px]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(11px,1vw,14px)' }}>Est. 2007</span>
            <span className="text-[11px]">✦</span>
          </div>
          <div className="text-[var(--teal-deep)]" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(20px,2.5vw,34px)' }}>
            Small Batch · Big Heart
          </div>
          <h1 className="text-[var(--berry)] leading-[0.88] my-1" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(56px,9vw,128px)', textShadow: '2px 3px 0 rgba(28,13,12,0.18)' }}>
            Miss Oz
          </h1>
          <div
            className="inline-block text-[var(--cream-hi)] uppercase font-bold px-4 py-1 rounded-[4px]"
            style={{ background: 'var(--teal)', fontFamily: 'var(--font-sans)', letterSpacing: 'clamp(1px,0.4vw,4px)', fontSize: 'clamp(13px,1.5vw,20px)' }}
          >
            Ice Cream &amp; Dessert Cafe
          </div>
          <div className="text-[var(--berry-deep)] mt-2" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(20px,2.4vw,32px)' }}>
            Where Sweet Memories Begin
          </div>
          <p className="text-[var(--cocoa)] mt-2.5 max-w-[380px]" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.3vw,16px)', lineHeight: 1.55 }}>
            Handcrafted ice cream and desserts made from scratch with quality ingredients and a whole lot of love.
          </p>
          <div
            className="inline-block mt-4 px-5 py-1.5 text-[var(--cream-hi)] uppercase font-bold tracking-[2px]"
            style={{ background: 'var(--brick)', fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,1vw,13px)', clipPath: 'polygon(3% 0, 97% 0, 100% 50%, 97% 100%, 3% 100%, 0 50%)' }}
          >
            ✦&nbsp;&nbsp;Life is better with ice cream&nbsp;&nbsp;✦
          </div>
        </div>
      </div>

      {/* Slim vintage nav */}
      <nav
        className="mx-auto max-w-[1120px] mt-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 rounded-[6px] px-3 py-2 border-2"
        style={{ background: 'var(--teal-deep)', borderColor: 'var(--gold)' }}
      >
        {NAV.map((item, i) => (
          <span key={item.label} className="flex items-center">
            {i > 0 && <span className="text-[var(--gold-hi)] mx-1 sm:mx-2 text-[10px]">♥</span>}
            <a
              href={hrefFor(item.target)}
              onClick={(e) => handleNav(e, item.target)}
              className="text-[var(--cream-hi)] hover:text-[var(--gold-hi)] transition-colors uppercase tracking-[1.5px] text-[11px] sm:text-[13px] font-bold focus-visible:outline-none focus-visible:text-[var(--gold-hi)] focus-visible:underline underline-offset-4"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {item.label}
            </a>
          </span>
        ))}
      </nav>
    </section>
  );
}
