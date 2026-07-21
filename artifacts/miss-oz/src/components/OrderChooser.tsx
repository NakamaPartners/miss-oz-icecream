/**
 * OrderChooser — inline platform picker for delivery orders.
 * Renders a trigger button; clicking it reveals GrubHub and Uber Eats choices.
 * Each choice opens in a new tab.
 */
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DELIVERY_PLATFORMS } from '../lib/delivery';

interface Props {
  /** Visual style of the trigger button */
  variant?: 'dark' | 'cream' | 'light';
  /** Text shown on the trigger before a platform is chosen */
  label?: string;
  className?: string;
}

export default function OrderChooser({
  variant = 'dark',
  label = 'Order Online',
  className = '',
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const triggerBase =
    'inline-flex items-center gap-2 rounded-full font-semibold tracking-[1px] uppercase transition-all duration-200 mech-btn focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2';

  const triggerStyles: Record<string, string> = {
    dark:  `py-4 px-10 text-[17px] bg-[var(--cocoa)] text-[var(--cream)] border-2 border-transparent hover:bg-[var(--berry)] focus-visible:ring-[var(--cream)] focus-visible:ring-offset-transparent`,
    cream: `py-[12px] px-7 text-[13px] bg-[var(--cream-hi)] text-[var(--berry-deep)] hover:bg-[var(--gold-hi)] focus-visible:ring-[var(--gold-hi)] focus-visible:ring-offset-[#1d2622]`,
    light: `py-[11px] px-[26px] text-[14px] bg-[var(--cocoa)] text-[var(--cream)] hover:bg-[var(--berry)] focus-visible:ring-[var(--gold)] focus-visible:ring-offset-transparent`,
  };

  const platformColors: Record<string, { bg: string; hover: string; text: string }> = {
    grubhub:  { bg: '#F63440', hover: '#d92b36', text: '#fff' },
    ubereats: { bg: '#06C167', hover: '#05a857', text: '#fff' },
  };

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className={`${triggerBase} ${triggerStyles[variant]}`}
      >
        {label}
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[11px] leading-none"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label="Choose a delivery platform"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute z-50 mt-2 left-1/2 -translate-x-1/2 w-[230px] rounded-[14px] overflow-hidden"
            style={{
              background: 'var(--cream-hi)',
              boxShadow: '0 10px 32px rgba(28,13,12,0.28), 0 0 0 1.5px rgba(28,13,12,0.12)',
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-[10px] text-center text-[10px] tracking-[3px] uppercase font-bold text-[var(--cocoa)] opacity-55 border-b border-[rgba(28,13,12,0.1)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Order on
            </div>

            {/* Platform buttons */}
            {DELIVERY_PLATFORMS.map((p) => {
              const c = platformColors[p.id];
              return (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="option"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-5 py-[15px] text-[15px] font-bold transition-colors border-b border-[rgba(28,13,12,0.08)] last:border-0"
                  style={{
                    color: c.bg,
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '0.3px',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = c.bg;
                    (e.currentTarget as HTMLElement).style.color = c.text;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '';
                    (e.currentTarget as HTMLElement).style.color = c.bg;
                  }}
                >
                  <span>{p.name}</span>
                  <span aria-hidden="true" className="text-[13px] opacity-60">→</span>
                </a>
              );
            })}

            {/* Tip */}
            <div
              className="px-4 py-[9px] text-center text-[10px] italic text-[var(--cocoa)] opacity-40"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Opens in a new tab
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
