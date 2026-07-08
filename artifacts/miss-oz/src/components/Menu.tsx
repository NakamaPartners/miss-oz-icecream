import { motion } from 'framer-motion';

const macklin = { fontFamily: "'Macklin Display', 'Playfair Display', serif", fontWeight: 700, fontStyle: 'italic' };

const CARDS = [
  {
    title: 'Small-Batch Scoops',
    desc: 'Marionberry, Thai iced tea, kulfi, coffee crackle, summer rose & friends',
    image: 'https://homesweetcone.com/wp-content/uploads/2023/12/HSC_photo23-600x400.jpg',
  },
  {
    title: 'Croffles',
    desc: 'Croissant waffles — Oreo pop, brunost, fresh cream, fudge drizzle',
    image: 'https://www.missinthekitchen.com/wp-content/uploads/2024/02/Croffles-Croissant-Waffles-Recipe-photo.jpg',
  },
  {
    title: 'Coffee & Drinks',
    desc: 'Espresso drinks, floats, and something warm for the rainy days',
    image: 'https://pureearthcoffee.com/cdn/shop/articles/pexels-thirdman-8936895.jpg',
  },
  {
    title: 'Cookies & Cakes',
    desc: 'Basque cheesecake, fresh cookies, and seasonal bakes',
    image: 'https://dishnthekitchen.com/wp-content/uploads/2022/03/vertbasquecheesecakesliceright.jpg',
  }
];

export default function Menu() {
  return (
    <>
      <section className="text-center py-[80px] md:py-[130px] px-[6vw] bg-[var(--cream-hi)]">
        <motion.span
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="block text-[12px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] opacity-60 mb-3"
        >
          Made on-site daily
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="block font-script text-[var(--berry-deep)] text-[clamp(30px,3.5vw,42px)] mb-2"
        >
          from the case
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[clamp(42px,6vw,80px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
          style={macklin}
        >
          The Menu
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="italic max-w-[520px] mx-auto text-[19px] text-[#1d0e0d] opacity-80"
        >
          Every flavor made in-house. Ask for a sample — we insist.
        </motion.p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[24px] max-w-[1100px] mx-auto mt-[46px]">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div
                className="bg-white rounded-[16px] overflow-hidden text-left group h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(28,13,12,0.14)]"
                style={{ boxShadow: '0 4px 24px rgba(28,13,12,0.08)', border: '1px solid rgba(28,13,12,0.06)' }}
              >
                <div className="h-[200px] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-display font-normal text-[20px] mb-2 text-[var(--cocoa)]">{card.title}</h4>
                  <div className="text-[15px] italic text-[#5a3e35] leading-relaxed">{card.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Simple divider line instead of cartoony awning */}
      <div className="h-px bg-[rgba(28,13,12,0.08)]" aria-hidden="true" />
    </>
  );
}
