export default function Marquee() {
  return (
    <div className="overflow-hidden bg-[var(--cocoa)] py-5 relative z-10" aria-hidden="true">
      <div className="flex gap-11 w-max items-center animate-[mq_32s_linear_infinite]">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-11 items-center">
            <span className="font-display font-normal uppercase text-[19px] md:text-[26px] text-[var(--cream)] tracking-[1px] whitespace-nowrap">Marionberry</span>
            <span className="font-script text-[var(--gold-hi)] font-normal text-[21px] md:text-[28px] whitespace-nowrap">since 2007</span>
            <span className="font-display font-normal uppercase text-[19px] md:text-[26px] text-[var(--cream)] tracking-[1px] whitespace-nowrap">Thai Iced Tea</span>
            <span className="font-script text-[var(--gold-hi)] font-normal text-[21px] md:text-[28px] whitespace-nowrap">made on-site</span>
            <span className="font-display font-normal uppercase text-[19px] md:text-[26px] text-[var(--cream)] tracking-[1px] whitespace-nowrap">Croffles</span>
            <span className="font-script text-[var(--gold-hi)] font-normal text-[21px] md:text-[28px] whitespace-nowrap">all natural</span>
            <span className="font-display font-normal uppercase text-[19px] md:text-[26px] text-[var(--cream)] tracking-[1px] whitespace-nowrap">Kulfi</span>
            <span className="font-script text-[var(--gold-hi)] font-normal text-[21px] md:text-[28px] whitespace-nowrap">Pearl District</span>
          </div>
        ))}
      </div>
    </div>
  );
}
