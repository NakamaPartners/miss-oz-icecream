import { motion } from 'framer-motion';

const CARDS = [
  {
    title: 'Small-Batch Scoops',
    desc: 'Marionberry, Thai iced tea, kulfi, coffee crackle, summer rose & friends',
    image: '/images/marionberry.png',
    bg: 'var(--berry)'
  },
  {
    title: 'Croffles',
    desc: 'Croissant waffles — Oreo pop, brunost, fresh cream, fudge drizzle',
    image: '/images/croffle.png',
    bg: 'var(--gold)'
  },
  {
    title: 'Coffee & Drinks',
    desc: 'Espresso drinks, floats, and something warm for the rainy days',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
    bg: 'var(--pink)'
  },
  {
    title: 'Cookies & Cakes',
    desc: 'Basque cheesecake, fresh cookies, and seasonal bakes',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80',
    bg: 'var(--berry-deep)'
  }
];

export default function Menu() {
  return (
    <>
      <section className="text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--cream-hi)]">
        <motion.span 
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="block text-[12px] md:text-[13px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] mb-3.5"
        >
          Made on-site daily
        </motion.span>
        <motion.span 
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          className="block font-script text-[var(--berry-deep)] text-[clamp(32px,3.8vw,44px)] mb-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]"
        >
          from the case
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-normal uppercase text-[clamp(44px,6.6vw,84px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
        >
          The Menu
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
          className="italic max-w-[520px] mx-auto text-[19px] text-[#1d0e0d]"
        >
          Every flavor made in-house. Ask for a sample — we insist.
        </motion.p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[30px] max-w-[1100px] mx-auto mt-[46px]">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[var(--cream-hi)] border-2 border-[var(--cocoa)] rounded-[20px] p-[28px] text-center shadow-[6px_6px_0_var(--cocoa)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_var(--cocoa)] transition-all duration-250 cursor-none"
            >
              <div 
                className="h-[160px] rounded-[12px] mb-[18px] flex items-center justify-center border-2 border-[var(--cocoa)] bg-cover bg-center overflow-hidden" 
                style={{ backgroundColor: card.bg, backgroundImage: `url(${card.image})` }}
              />
              <h4 className="font-display font-normal text-[23px] mb-[5px] text-[var(--cocoa)]">{card.title}</h4>
              <div className="text-[16px] italic text-[#33231e]">{card.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awning Divider */}
      <div className="flex h-[48px]" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span 
            key={i} 
            className="flex-1 rounded-b-[28px]" 
            style={{
              background: i % 2 === 0 ? 'var(--berry)' : 'var(--cream-hi)',
              border: i % 2 !== 0 ? '1px solid rgba(36,17,16,0.1)' : 'none',
              borderTop: 'none'
            }}
          />
        ))}
      </div>
    </>
  );
}
