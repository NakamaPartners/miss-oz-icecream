import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      <section className="py-[80px] md:py-[130px] px-[6vw] bg-[var(--cream-hi)]">
        <div className="max-w-[640px] mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="block text-[12px] md:text-[13px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] mb-3.5"
          >
            Newsletter
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            className="block font-script text-[var(--berry-deep)] text-[clamp(32px,3.8vw,44px)] mb-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]"
          >
            stay sweet
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-normal uppercase text-[clamp(44px,6.6vw,84px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
          >
            Join the Mailing List
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            className="italic mb-[24px] text-[19px] text-[#1d0e0d]"
          >
            New flavors, vote results, and parlor news. No noise.
          </motion.p>
          
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            {submitted ? (
              <div className="font-script text-[28px] text-[var(--berry)]">Thanks for joining us!</div>
            ) : (
              <>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email here*"
                  required
                  className="font-sans w-full p-[17px_20px] border-[2.5px] border-[var(--cocoa)] bg-white rounded-[12px] text-[17px] mb-[16px] text-[var(--cocoa)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] cursor-auto"
                />
                <button type="submit" className="inline-block bg-[var(--berry)] text-[var(--cream)] py-[16px] px-[46px] rounded-[30px] text-[16px] tracking-[2px] uppercase font-semibold shadow-[5px_5px_0_var(--cocoa)] hover:translate-y-[2px] hover:shadow-[3px_3px_0_var(--cocoa)] transition-all">
                  Subscribe
                </button>
              </>
            )}
          </motion.form>
        </div>
      </section>

      {/* Order Platforms Strip */}
      <div className="bg-[var(--cream-hi)] py-[34px] px-[6vw] text-center border-t border-[rgba(36,17,16,0.12)]">
        <span className="block text-[12px] md:text-[13px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] mb-[18px]">
          Order Miss Oz on
        </span>
        <div className="flex gap-[44px] justify-center flex-wrap font-display text-[22px] text-[var(--cocoa)] opacity-85">
          <span>UberEats</span>
          <span>GrubHub</span>
          <span>DoorDash</span>
        </div>
      </div>
    </>
  );
}
