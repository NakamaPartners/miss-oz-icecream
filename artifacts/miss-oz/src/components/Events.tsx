import { motion } from 'framer-motion';
import { Bunting, Starburst } from './Decor';
import InquireForm from './InquireForm';

const macklin = { fontFamily: 'var(--font-groovy)', fontWeight: 400, fontStyle: 'italic' };

export default function Events() {
  return (
    <section id="events" className="parlour-paper relative overflow-hidden text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--pink)]">
      <Bunting className="absolute top-0 left-0 right-0" />
      <Starburst size={150} color="var(--berry)" className="pointer-events-none absolute -bottom-8 -left-8 opacity-[0.10] hidden md:block" />
      <Starburst size={120} color="var(--berry)" className="pointer-events-none absolute top-[86px] right-[4vw] opacity-[0.10] hidden md:block" />
      <motion.span
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
        className="block font-script text-[var(--berry-deep)] text-[clamp(30px,3.5vw,42px)] mb-2"
      >
        coming soon
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
        className="text-[clamp(42px,6vw,80px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
        style={macklin}
      >
        Event Catering
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-[28px] max-w-[720px] text-[20px] md:text-[24px] leading-relaxed text-[var(--cocoa)]"
      >
        Event Catering will launch in Summer 2027.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
        className="mx-auto mt-[12px] max-w-[620px] italic text-[16px] md:text-[18px] leading-relaxed text-[var(--cocoa)] opacity-75"
      >
        We’re preparing a new way to bring Miss Oz treats to your celebrations. In the meantime, tell us about your event so we can start planning.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-[48px] text-center"
      >
        <InquireForm
          type="event"
          submitLabel="Inquire about your event"
          buttonClassName="inline-flex items-center gap-2 rounded-full px-7 py-[13px] text-[14px] font-bold tracking-[1px] uppercase text-[var(--cream-hi)] bg-[var(--cocoa)] transition-transform duration-200 mech-btn hover:bg-[var(--berry-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--pink)]"
        />
      </motion.div>
    </section>
  );
}
