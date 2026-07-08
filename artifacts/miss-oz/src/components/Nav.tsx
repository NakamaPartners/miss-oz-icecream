export default function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-[var(--cocoa)] text-[var(--cream)] text-center py-2.5 px-4 text-[15px] tracking-[1px]">
        <em className="font-script not-italic text-[var(--pink)] text-[18px] mr-2">Small batch. Real ingredients.</em>
        Lots of love since 2007
      </div>
      <nav className="sticky top-0 z-[500] flex items-center justify-between px-[5vw] py-3.5 bg-[rgba(242,225,194,0.94)] backdrop-blur-[8px] border-b-2 border-[var(--cocoa)]">
        <div className="font-script text-[40px] text-[var(--berry)] leading-none">Miss Oz</div>
        <div className="flex items-center gap-6 text-[16px] font-semibold">
          <span onClick={() => scrollTo('about')} className="hidden md:inline-block hover:text-[var(--berry)] transition-colors cursor-none">About</span>
          <span onClick={() => scrollTo('menu')} className="hidden md:inline-block hover:text-[var(--berry)] transition-colors cursor-none">Menu</span>
          <span onClick={() => scrollTo('wholesale')} className="hidden md:inline-block hover:text-[var(--berry)] transition-colors cursor-none">Wholesale</span>
          <span onClick={() => scrollTo('events')} className="hidden md:inline-block hover:text-[var(--berry)] transition-colors cursor-none">Events</span>
          <span onClick={() => scrollTo('contact')} className="hidden md:inline-block hover:text-[var(--berry)] transition-colors cursor-none">Contact</span>
          <div className="bg-[var(--cocoa)] text-[var(--cream)] py-3 px-[26px] rounded-[28px] text-[15px] tracking-[1px] hover:bg-[var(--berry)] transition-colors cursor-none">Order Online</div>
        </div>
      </nav>
    </>
  );
}
