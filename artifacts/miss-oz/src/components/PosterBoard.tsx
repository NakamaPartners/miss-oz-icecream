const scrollTo = (id: string) => {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const NAV = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Menu', target: 'menu' },
  { label: 'Order Online', target: 'menu' },
  { label: 'Wholesale', target: 'wholesale' },
  { label: 'Event', target: 'events' },
  { label: 'Contact', target: 'contact' },
];

const CARDS = [
  {
    title: 'Next Flavor Vote!',
    caption: 'You decide · What\u2019s next',
    img: '/images/card-vote.png',
    target: 'vote',
    ribbon: 'Vote',
    bg: 'var(--pink)', fg: 'var(--berry-deep)', muted: 'var(--berry)',
  },
  {
    title: 'Handmade Ice Cream & Desserts',
    caption: 'Classic recipes · Fresh · Real flavor',
    img: '/images/card-handmade.png',
    target: 'menu',
    ribbon: 'Menu',
    bg: 'var(--paper-hi)', fg: 'var(--berry-deep)', muted: 'var(--cocoa)',
  },
  {
    title: 'Pickup or Delivery',
    caption: 'Uber Eats · Doordash · Grubhub',
    img: '/images/card-delivery.png',
    target: 'menu',
    ribbon: "We\u2019ve got you",
    bg: 'var(--teal)', fg: 'var(--cream-hi)', muted: 'rgba(246,237,214,0.8)',
  },
  {
    title: 'Sundae Specials',
    caption: 'Slow down, stay awhile',
    img: '/images/card-sundae.png',
    target: 'menu',
    ribbon: 'Specials',
    bg: 'var(--gold-hi)', fg: 'var(--cocoa)', muted: 'var(--berry-deep)',
  },
  {
    title: 'Vintage Vibes',
    caption: 'Est. 2007 · Pearl District',
    img: '/images/card-parlor.png',
    target: 'about',
    ribbon: 'Sweet times',
    bg: 'var(--cocoa)', fg: 'var(--cream-hi)', muted: 'rgba(246,237,214,0.75)',
  },
];

function Bulbs() {
  return (
    <>
      <div className="bulbstrip bulbstrip-h top" aria-hidden="true"><span className="bulbs bulbs-a" /><span className="bulbs bulbs-b" /></div>
      <div className="bulbstrip bulbstrip-h bottom" aria-hidden="true"><span className="bulbs bulbs-a" /><span className="bulbs bulbs-b" /></div>
      <div className="bulbstrip bulbstrip-v left" aria-hidden="true"><span className="bulbs bulbs-a" /><span className="bulbs bulbs-b" /></div>
      <div className="bulbstrip bulbstrip-v right" aria-hidden="true"><span className="bulbs bulbs-a" /><span className="bulbs bulbs-b" /></div>
    </>
  );
}

function Star({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="inline-block align-middle">
      <path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill="currentColor" />
    </svg>
  );
}

export default function PosterBoard() {
  return (
    <section className="poster-frame" aria-label="Miss Oz Ice Cream & Dessert Cafe">
      <Bulbs />
      <div className="poster-stage">
        {/* Main three-panel masthead */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,2fr)_minmax(0,1.02fr)] gap-3 lg:gap-4 lg:h-[clamp(300px,33vw,450px)]">
          {/* LEFT — illustrated Portland scene + ICE CREAM sign */}
          <div className="vpanel relative overflow-hidden min-h-[190px] lg:min-h-0">
            <img src="/images/hero-cone-scene.png" alt="A vintage travel-poster illustration of a triple-scoop ice cream cone in front of Mount Hood, a waterfall and pine forest" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} />
            <div className="filmgrain" aria-hidden="true" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(23,63,60,0.22), transparent 45%), radial-gradient(120% 90% at 50% 50%, transparent 62%, rgba(28,13,12,0.24))' }} />
            {/* Vertical ICE CREAM marquee sign */}
            <div className="marquee-sign absolute left-2.5 top-3 bottom-3 w-[44px] lg:w-[50px] flex items-center justify-center">
              <span className="blade-text text-[var(--cream-hi)] font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,1.5vw,22px)' }}>
                ICE&nbsp;CREAM
              </span>
            </div>
            {/* Made in Portland stamp */}
            <div className="vstamp absolute bottom-2.5 right-2.5 flex flex-col items-center justify-center text-center leading-none" style={{ width: 62, height: 62, background: 'rgba(246,237,214,0.92)', color: 'var(--berry)' }}>
              <span className="text-[7px] tracking-[1px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Made in</span>
              <span className="text-[10px] tracking-[0.5px] uppercase font-bold leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>Portland<br />Oregon</span>
            </div>
          </div>

          {/* CENTER — masthead banner */}
          <div className="vpanel flex flex-col items-center justify-center text-center px-3 py-3 lg:py-4" style={{ background: 'var(--paper-hi)' }}>
            <div className="flex items-center gap-2 text-[var(--brick)]">
              <Star size={10} />
              <span className="text-[10px] sm:text-[12px] tracking-[4px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Est. 2007</span>
              <Star size={10} />
            </div>
            <div className="text-[var(--berry-deep)] mt-0.5" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(18px,2.3vw,30px)' }}>
              Small Batch · Big Heart
            </div>
            <h1 className="wordmark-oz leading-[0.86] my-0.5" style={{ fontFamily: 'var(--font-groovy)', fontStyle: 'italic', fontSize: 'clamp(54px,8.4vw,120px)' }}>
              Miss Oz
            </h1>
            <div
              className="text-[var(--cream-hi)] font-bold uppercase px-5 py-1 rounded-[4px]"
              style={{ background: 'var(--teal)', fontFamily: 'var(--font-sans)', letterSpacing: 'clamp(1px,0.5vw,5px)', fontSize: 'clamp(13px,1.7vw,22px)' }}
            >
              Ice Cream &amp; Dessert Cafe
            </div>
            <div className="text-[var(--berry-deep)] mt-1.5" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(20px,2.6vw,36px)' }}>
              Where Sweet Memories Begin
            </div>
            <div
              className="mt-2.5 inline-block px-6 py-1.5 text-[10px] sm:text-[12px] tracking-[2.5px] uppercase"
              style={{
                background: 'var(--brick)', color: 'var(--cream-hi)', fontFamily: 'var(--font-sans)', fontWeight: 600,
                clipPath: 'polygon(4% 0, 96% 0, 100% 50%, 96% 100%, 4% 100%, 0 50%)',
              }}
            >
              Everything we serve is made from scratch since 2007
            </div>
          </div>

          {/* RIGHT — dusty red panel with the Oz mascot */}
          <div className="vpanel relative flex flex-col items-center justify-start text-center px-3 py-3 overflow-hidden min-h-[220px] lg:min-h-0" style={{ background: 'var(--brick)' }}>
            <span className="text-[10px] tracking-[3px] uppercase text-[var(--cream-hi)] font-bold opacity-90" style={{ fontFamily: 'var(--font-sans)' }}>We sell</span>
            <div className="uppercase leading-[0.92] text-[var(--cream-hi)]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px,1.9vw,30px)' }}>
              Time &amp; Space<br /><span className="text-[10px] tracking-[3px] font-normal opacity-80" style={{ fontFamily: 'var(--font-sans)' }}>of</span><br />Happiness
            </div>
            <span className="text-[var(--cream-hi)] -mt-0.5" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(16px,1.5vw,24px)' }}>through ice cream</span>
            <div className="relative flex-1 min-h-[90px] w-full flex items-end justify-center">
              <img src="/images/oz-dog.png" alt="Oz, the Cavalier King Charles Spaniel mascot" className="max-h-[150px] w-auto object-contain" style={{ filter: 'drop-shadow(2px 5px 8px rgba(28,13,12,0.4))' }} />
              <div className="vstamp absolute top-1 right-1 flex items-center justify-center text-center" style={{ width: 42, height: 42, background: 'var(--gold-hi)', color: 'var(--brick-deep)' }}>
                <span className="text-[9px] tracking-[0.5px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>Meet<br />Oz</span>
              </div>
            </div>
            <div className="mt-1 px-4 py-1 rounded-[4px] text-[9px] sm:text-[11px] tracking-[2px] uppercase font-bold" style={{ background: 'var(--teal)', color: 'var(--cream-hi)', fontFamily: 'var(--font-sans)' }}>
              Life is better with ice cream
            </div>
          </div>
        </div>

        {/* Nav bar */}
        <nav
          className="shrink-0 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 rounded-[6px] px-3 py-2 border-2"
          style={{ background: 'var(--teal-deep)', borderColor: 'var(--gold)' }}
        >
          {NAV.map((item, i) => (
            <span key={item.label} className="flex items-center">
              {i > 0 && <span className="text-[var(--gold-hi)] mx-1 sm:mx-2 text-[10px]">♥</span>}
              <button
                type="button"
                onClick={() => scrollTo(item.target)}
                className="text-[var(--cream-hi)] hover:text-[var(--gold-hi)] transition-colors uppercase tracking-[1.5px] text-[11px] sm:text-[13px] font-bold focus-visible:outline-none focus-visible:text-[var(--gold-hi)] focus-visible:underline underline-offset-4"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {item.label}
              </button>
            </span>
          ))}
        </nav>

        {/* Menu preview cards */}
        <div className="shrink-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {CARDS.map((card) => (
            <button
              key={card.title}
              type="button"
              onClick={() => scrollTo(card.target)}
              className="vpanel group text-left overflow-hidden transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--gold-hi)]"
              style={{ background: card.bg }}
            >
              <div className="relative h-[62px] sm:h-[76px] overflow-hidden">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <span
                  className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.5px] font-bold"
                  style={{ background: 'var(--cocoa)', color: 'var(--cream)', fontFamily: 'var(--font-sans)' }}
                >
                  {card.ribbon}
                </span>
              </div>
              <div className="px-2.5 py-2 border-t-2" style={{ borderColor: 'var(--teal-deep)' }}>
                <h3
                  className="leading-tight uppercase font-bold text-[10.5px] sm:text-[12px]"
                  style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.5px', color: card.fg }}
                >
                  {card.title}
                </h3>
                <p className="text-[9px] sm:text-[10px] mt-0.5 leading-snug" style={{ fontFamily: 'var(--font-sans)', color: card.muted }}>
                  {card.caption}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom strip */}
        <div
          className="shrink-0 flex flex-wrap items-center justify-between gap-2 rounded-[6px] px-4 py-1.5 border-2"
          style={{ background: 'var(--teal-deep)', borderColor: 'var(--gold)', color: 'var(--cream-hi)' }}
        >
          <span className="flex items-center gap-2 text-[10px] sm:text-[12px] tracking-[2px] uppercase font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
            <Star size={10} /> Locally owned · Small business · Big heart
          </span>
          <a
            href="https://instagram.com/missozicecreamcafe"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1.5 text-[10px] sm:text-[12px] tracking-[1px] uppercase font-bold opacity-90 hover:opacity-100 transition-opacity"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            @missozicecream
          </a>
        </div>
      </div>
    </section>
  );
}
