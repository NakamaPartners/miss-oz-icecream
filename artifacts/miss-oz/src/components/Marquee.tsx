export default function Marquee() {
  // Scrolling brand ribbon — Portland roots, handmade, est. 2007.
  const segment = (
    <>
      <span className="font-script text-[var(--gold-hi)] font-normal text-[28px] md:text-[38px] whitespace-nowrap"
        style={{ textShadow: '0 0 14px rgba(227,180,76,0.75), 0 0 28px rgba(227,180,76,0.4)' }}>
        Portland's Own
      </span>
      <span className="text-[var(--gold-hi)] text-[16px] md:text-[20px]"
        style={{ textShadow: '0 0 8px rgba(227,180,76,0.8)' }}>✦</span>
      <span className="font-display font-normal uppercase text-[22px] md:text-[30px] text-[var(--cream)] tracking-[3px] whitespace-nowrap"
        style={{ textShadow: '0 0 12px rgba(242,225,194,0.55), 0 0 26px rgba(242,225,194,0.3)' }}>
        Ice Cream Cafe
        <span className="ml-2 not-uppercase" style={{ color: 'var(--pink)', textShadow: '0 0 10px rgba(244,169,199,0.7)' }}>♥</span>
      </span>
      <span className="text-[var(--gold-hi)] text-[16px] md:text-[20px]"
        style={{ textShadow: '0 0 8px rgba(227,180,76,0.8)' }}>✦</span>
      <span className="font-display font-normal uppercase text-[18px] md:text-[24px] text-[var(--cream)] tracking-[4px] whitespace-nowrap"
        style={{ textShadow: '0 0 10px rgba(242,225,194,0.4)' }}>
        Est. 2007
      </span>
      <span className="text-[var(--gold-hi)] text-[16px] md:text-[20px]"
        style={{ textShadow: '0 0 8px rgba(227,180,76,0.8)' }}>✦</span>
    </>
  );

  return (
    <div aria-hidden="true" className="relative z-10">
      <div className="checker-floor h-[14px]" />
      <div className="h-[4px] bg-[var(--gold)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.5)] relative z-20" />
      <div className="overflow-hidden py-7 shadow-[inset_0_8px_24px_rgba(0,0,0,0.8),inset_0_-8px_24px_rgba(0,0,0,0.8)]"
        style={{ background: '#110505' }}>
        <div className="mq-track flex gap-10 w-max items-center animate-[mq_22s_linear_infinite]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-10 items-center">
              {segment}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[4px] bg-[var(--gold)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_-2px_4px_rgba(0,0,0,0.5)] relative z-20" />
      <div className="checker-floor h-[14px]" />
    </div>
  );
}
