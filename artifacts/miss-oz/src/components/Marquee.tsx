const ITEMS: { text: string; script?: boolean }[] = [
  { text: 'Marionberry' },
  { text: 'since 2007', script: true },
  { text: 'Thai Iced Tea' },
  { text: 'made on-site', script: true },
  { text: 'Croffles' },
  { text: 'all natural', script: true },
  { text: 'Kulfi' },
  { text: 'Pearl District', script: true },
];

export default function Marquee() {
  return (
    <div aria-hidden="true" className="relative z-10">
      <div className="checker-floor h-[14px]" />
      <div className="overflow-hidden bg-[var(--cocoa)] py-5">
        <div className="flex gap-8 w-max items-center animate-[mq_32s_linear_infinite]">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex gap-8 items-center">
              {ITEMS.map((item, i) => (
                <span key={i} className="flex gap-8 items-center">
                  {item.script ? (
                    <span className="font-script text-[var(--gold-hi)] font-normal text-[21px] md:text-[28px] whitespace-nowrap">{item.text}</span>
                  ) : (
                    <span className="font-display font-normal uppercase text-[19px] md:text-[26px] text-[var(--cream)] tracking-[1px] whitespace-nowrap">{item.text}</span>
                  )}
                  <span className="text-[var(--gold-hi)] text-[14px] md:text-[16px]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="checker-floor h-[14px]" />
    </div>
  );
}
