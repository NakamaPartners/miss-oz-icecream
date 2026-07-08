export default function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-[var(--berry)] text-[var(--cream)] text-center py-2.5 px-4 text-[15px] tracking-[1px]">
        <em className="font-script not-italic text-[var(--pink)] text-[18px] mr-2">Small batch. Real ingredients.</em>
        Lots of love since 2007
        <a href="https://instagram.com/missozicecreamcafe" target="_blank" rel="noopener" className="ml-3 inline-block opacity-70 hover:opacity-100 transition-opacity cursor-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
      </div>
      <nav className="sticky top-0 z-[500] flex items-center justify-between px-[5vw] py-3 bg-[rgba(242,225,194,0.96)] backdrop-blur-[10px] border-b border-[rgba(28,13,12,0.1)]">
        <a href="/" className="flex items-center gap-3 cursor-none">
          <img
            src="/images/logo-icon.png"
            alt="Miss Oz Ice Cream"
            className="h-[52px] w-[52px] object-contain"
            style={{ mixBlendMode: 'multiply' }}
          />
          <span className="font-script text-[28px] text-[var(--berry)] leading-none hidden sm:block">Miss Oz</span>
        </a>
        <div className="flex items-center gap-5 text-[15px] font-semibold tracking-[0.3px]">
          <span onClick={() => scrollTo('about')} className="hidden md:inline-block text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors cursor-none">About</span>
          <span onClick={() => scrollTo('menu')} className="hidden md:inline-block text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors cursor-none">Menu</span>
          <span onClick={() => scrollTo('wholesale')} className="hidden md:inline-block text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors cursor-none">Wholesale</span>
          <span onClick={() => scrollTo('events')} className="hidden md:inline-block text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors cursor-none">Events</span>
          <span onClick={() => scrollTo('contact')} className="hidden md:inline-block text-[var(--cocoa)] hover:text-[var(--berry)] transition-colors cursor-none">Contact</span>
          <div className="clickable bg-[var(--cocoa)] text-[var(--cream)] py-2.5 px-6 rounded-full text-[14px] tracking-[1px] hover:bg-[var(--berry)] transition-colors cursor-none">Order Online</div>
        </div>
      </nav>
    </>
  );
}
