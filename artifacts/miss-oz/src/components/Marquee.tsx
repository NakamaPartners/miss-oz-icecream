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
      <div className="h-[4px] bg-[var(--gold)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.5)] relative z-20" aria-hidden="true" />
      <div className="overflow-hidden py-6 shadow-[inset_0_8px_24px_rgba(0,0,0,0.8),inset_0_-8px_24px_rgba(0,0,0,0.8)]" style={{ background: '#110505' }}>
        <div className="mq-track flex gap-8 w-max items-center animate-[mq_32s_linear_infinite]">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex gap-8 items-center">
              {ITEMS.map((item, i) => (
                <span key={i} className="flex gap-8 items-center">
                  {item.script ? (
                    <span className="font-script text-[var(--gold-hi)] font-normal text-[22px] md:text-[30px] whitespace-nowrap" style={{ textShadow: '0 0 12px rgba(227,180,76,0.7), 0 0 24px rgba(227,180,76,0.4)' }}>{item.text}</span>
                  ) : (
                    <span className="font-display font-normal uppercase text-[20px] md:text-[28px] text-[var(--cream)] tracking-[1px] whitespace-nowrap" style={{ textShadow: '0 0 12px rgba(242,225,194,0.5), 0 0 24px rgba(242,225,194,0.3)' }}>{item.text}</span>
                  )}
                  <span className="text-[var(--gold-hi)] text-[14px] md:text-[16px]" style={{ textShadow: '0 0 8px rgba(227,180,76,0.8)' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[4px] bg-[var(--gold)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_-2px_4px_rgba(0,0,0,0.5)] relative z-20" aria-hidden="true" />
      <div className="checker-floor h-[14px]" />
    </div>
  );
}
