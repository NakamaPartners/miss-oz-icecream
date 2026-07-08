export default function Footer() {
  return (
    <footer id="contact" className="bg-[var(--cocoa)] text-[var(--cream)] pt-[120px] pb-[44px] px-[6vw] relative mt-[80px]">
      <div className="absolute top-[-1px] left-0 right-0 h-[46px] clip-scallop-top" aria-hidden="true"></div>
      
      <div className="font-serif italic font-bold text-[clamp(52px,9vw,116px)] leading-[1.02] mb-[10px]">
        Sweet Memories<br />
        <em className="not-italic text-[var(--gold-hi)]">Begin Here.</em>
      </div>
      <span className="font-script text-[28px] md:text-[36px] text-[var(--pink)] mb-[60px] inline-block">
        — Miss Oz & the whole parlor
      </span>

      <div className="flex justify-between flex-wrap gap-[26px] md:gap-[34px] border-t border-[rgba(242,225,194,0.3)] pt-[34px] text-[16px]">
        <div className="min-w-[40%] md:min-w-0">
          <h5 className="text-[var(--gold-hi)] tracking-[3px] font-semibold uppercase text-[13px] mb-[12px]">Address</h5>
          <p className="leading-[1.8] text-[#EFE2CE]">1105 NW Johnson St.<br />Portland, OR 97209</p>
        </div>
        <div className="min-w-[40%] md:min-w-0">
          <h5 className="text-[var(--gold-hi)] tracking-[3px] font-semibold uppercase text-[13px] mb-[12px]">Hours</h5>
          <p className="leading-[1.8] text-[#EFE2CE]">Mon–Fri 12–9pm<br />Sat–Sun 11am–10pm<br />Closed Tuesdays</p>
        </div>
        <div className="min-w-[40%] md:min-w-0">
          <h5 className="text-[var(--gold-hi)] tracking-[3px] font-semibold uppercase text-[13px] mb-[12px]">Follow</h5>
          <p className="leading-[1.8] text-[#EFE2CE]">
            <a href="#" className="block hover:text-[var(--gold-hi)] transition-colors cursor-none">Instagram</a>
            <a href="#" className="block hover:text-[var(--gold-hi)] transition-colors cursor-none">Facebook</a>
            <a href="#" className="block hover:text-[var(--gold-hi)] transition-colors cursor-none">TikTok</a>
          </p>
        </div>
      </div>

      <div className="mt-[60px] text-[14px] text-[rgba(242,225,194,0.6)] font-sans">
        © {new Date().getFullYear()} Miss Oz Ice Cream & Dessert. Small batch since 2007.
      </div>
    </footer>
  );
}
