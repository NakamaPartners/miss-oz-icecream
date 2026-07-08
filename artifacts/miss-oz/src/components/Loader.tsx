import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, visibility: 'hidden' }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 bg-[var(--berry-deep)] flex flex-col items-center justify-center z-[999]"
        >
          <div className="font-script text-[var(--pink)] text-[72px]">Miss Oz</div>
          <div className="text-[var(--gold-hi)] text-[14px] tracking-[5px] mt-3.5 uppercase font-semibold">
            est. 2007 · Portland, Oregon
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
