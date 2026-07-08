import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setHidden(true);
      return;
    }
    
    const update = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  if (hidden) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full bg-[var(--gold)] opacity-90 pointer-events-none z-[1000]"
      animate={{ x: pos.x - 10, y: pos.y - 10 }}
      transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
    />
  );
}
