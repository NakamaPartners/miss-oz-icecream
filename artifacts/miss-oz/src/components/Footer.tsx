export default function Footer() {
  return (
    <footer id="contact" className="bg-[var(--cocoa)] text-[var(--cream)] pt-[120px] pb-[44px] px-[6vw] relative mt-[80px]">
      <div className="clip-scallop-top absolute top-[-1px] left-0 right-0 h-[46px]" aria-hidden="true" />

      <div
        className="font-serif italic font-bold leading-[1.02] mb-[10px]"
        style={{ fontSize: 'clamp(52px, 9vw, 116px)' }}
      >
        Sweet Memories<br />
        <em className="not-italic text-[var(--gold-hi)]">Begin Here.</em>
      </div>

      <span className="font-script text-[var(--pink)] mb-[60px] inline-block" style={{ fontSize: 36 }}>
        — Miss Oz &amp; the whole parlor
      </span>

      <div className="flex justify-between flex-wrap gap-[34px] border-t border-[rgba(242,225,194,0.3)] pt-[34px] text-[16px]">
        <div>
          <h5 className="text-[var(--gold-hi)] tracking-[3px] font-semibold uppercase text-[13px] mb-[12px]">Address</h5>
          <p className="leading-[1.8] text-[#EFE2CE]">1105 NW Johnson St.<br />Portland, OR 97209</p>
        </div>
        <div>
          <h5 className="text-[var(--gold-hi)] tracking-[3px] font-semibold uppercase text-[13px] mb-[12px]">Contact</h5>
          <p className="leading-[1.8] text-[#EFE2CE]">bluecanvascorp@gmail.com<br />Tel: 503-224-2021</p>
        </div>
        <div>
          <h5 className="text-[var(--gold-hi)] tracking-[3px] font-semibold uppercase text-[13px] mb-[12px]">Hours</h5>
          <p className="leading-[1.8] text-[#EFE2CE]">Open Daily<br />11AM – 10PM</p>
        </div>
        <div>
          <h5 className="text-[var(--gold-hi)] tracking-[3px] font-semibold uppercase text-[13px] mb-[12px]">Follow</h5>
          <p className="leading-[1.8] text-[#EFE2CE]">@missozicecreamcafe<br />UberEats · GrubHub · DoorDash</p>
        </div>
      </div>
    </footer>
  );
}
