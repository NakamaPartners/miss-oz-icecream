import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const macklin = { fontFamily: "'Macklin Display', 'Playfair Display', serif", fontWeight: 700, fontStyle: 'italic' };

type Entry = { id: string; name: string; note: string; when: string };

const SEED: Entry[] = [
  { id: 'seed-1', name: 'The Alvarez family', note: 'Sunday scoops after the farmers market — a tradition since the twins were tiny.', when: 'May 2026' },
  { id: 'seed-2', name: 'Dev & Priya', note: 'First date was a shared marionberry cone. Married now. Still share the cone.', when: 'April 2026' },
  { id: 'seed-3', name: 'Margot from 12th Ave', note: 'The record was playing Ella. I stayed for a second scoop. No regrets.', when: 'March 2026' },
];

const STORAGE_KEY = 'missoz_guestbook_v1';

function makeId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return `gb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function sanitizeEntries(raw: unknown): Entry[] | null {
  if (!Array.isArray(raw)) return null;
  const clean: Entry[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const rec = item as Record<string, unknown>;
    const name = typeof rec.name === 'string' ? rec.name.trim() : '';
    const note = typeof rec.note === 'string' ? rec.note.trim() : '';
    const when = typeof rec.when === 'string' ? rec.when.trim() : '';
    if (!name || !note) continue;
    const id = typeof rec.id === 'string' && rec.id ? rec.id : makeId();
    clean.push({ id, name: name.slice(0, 40), note: note.slice(0, 180), when: when || '—' });
  }
  return clean.length ? clean : null;
}

function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED;
    return sanitizeEntries(JSON.parse(raw)) ?? SEED;
  } catch {
    return SEED;
  }
}

const PAPER_TONES = ['#FBF2DF', '#F6D9E4', '#F0E2C4', '#EAD9C4'];

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>(SEED);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [justSigned, setJustSigned] = useState(false);
  const liveRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  function persist(next: Entry[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(0, 50)));
    } catch {
      /* storage unavailable — keep it in memory for this visit */
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanNote = note.trim();
    if (!cleanName || !cleanNote) return;
    const when = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const next: Entry[] = [{ id: makeId(), name: cleanName, note: cleanNote, when }, ...entries];
    setEntries(next);
    persist(next);
    setName('');
    setNote('');
    setJustSigned(true);
    if (liveRef.current) liveRef.current.textContent = 'Thank you — your note is in the book.';
    window.setTimeout(() => setJustSigned(false), 2600);
  }

  return (
    <section className="relative py-[80px] md:py-[130px] px-[6vw] bg-[var(--cream)] overflow-hidden">
      {/* aged edge vignette for a well-thumbed-book feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 0%, transparent 55%, rgba(28,13,12,0.06) 100%)' }}
      />

      <div className="relative text-center max-w-[720px] mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="block text-[12px] tracking-[5px] uppercase font-bold text-[var(--cocoa)] opacity-60 mb-3"
        >
          Since 2007
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="block font-script text-[var(--berry-deep)] text-[clamp(30px,3.5vw,42px)] mb-2"
        >
          put your name in the book
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[clamp(42px,6vw,80px)] leading-[0.98] mb-5 text-[var(--cocoa)]"
          style={macklin}
        >
          The Parlor Guestbook
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="italic text-[18px] text-[#1d0e0d] opacity-80"
        >
          Every parlor worth its salt keeps a book by the door. Leave a memory, a favorite scoop, or just a hello.
        </motion.p>
      </div>

      {/* Sign-in card, styled like a page from a ledger */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="relative max-w-[560px] mx-auto mt-[44px] rounded-[6px] p-[26px] md:p-[34px] text-left"
        style={{
          background: 'var(--cream-hi)',
          border: '1px solid rgba(28,13,12,0.14)',
          boxShadow: '0 10px 30px rgba(28,13,12,0.10)',
          backgroundImage: 'repeating-linear-gradient(rgba(28,13,12,0.05) 0 1px, transparent 1px 34px)',
        }}
      >
        <label htmlFor="gb-name" className="block text-[12px] tracking-[3px] uppercase font-bold text-[var(--cocoa)] opacity-60 mb-1.5">
          Your name
        </label>
        <input
          id="gb-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          placeholder="e.g. The Alvarez family"
          className="w-full bg-transparent border-b-2 border-[rgba(28,13,12,0.25)] pb-2 mb-6 text-[20px] font-script text-[var(--berry-deep)] placeholder:text-[rgba(28,13,12,0.3)] placeholder:font-sans placeholder:italic placeholder:text-[16px] focus:outline-none focus:border-[var(--berry)] transition-colors"
        />

        <label htmlFor="gb-note" className="block text-[12px] tracking-[3px] uppercase font-bold text-[var(--cocoa)] opacity-60 mb-1.5">
          Leave a note
        </label>
        <textarea
          id="gb-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={180}
          rows={3}
          placeholder="A memory, a favorite flavor, a hello…"
          className="w-full bg-transparent border-2 border-[rgba(28,13,12,0.18)] rounded-[4px] p-3 mb-2 text-[17px] leading-[1.6] text-[#1d0e0d] placeholder:text-[rgba(28,13,12,0.35)] placeholder:italic resize-none focus:outline-none focus:border-[var(--berry)] transition-colors"
        />
        <div className="flex items-center justify-between gap-4 mt-3 flex-wrap">
          <span className="text-[13px] text-[var(--cocoa)] opacity-55 italic">{note.length}/180</span>
          <button
            type="submit"
            disabled={!name.trim() || !note.trim()}
            className="bg-[var(--cocoa)] text-[var(--cream)] py-[12px] px-[30px] rounded-full text-[15px] font-semibold tracking-[0.5px] hover:bg-[var(--berry)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--gold)]"
          >
            {justSigned ? 'Signed ♥' : 'Leave your mark'}
          </button>
        </div>
        <p ref={liveRef} aria-live="polite" className="sr-only" />
      </motion.form>

      <p className="text-center text-[14px] tracking-[2px] uppercase font-bold text-[var(--cocoa)] opacity-45 mt-[38px] mb-[26px]">
        {entries.length} {entries.length === 1 ? 'note' : 'notes'} in the book
      </p>

      {/* The signed pages */}
      <ul className="flex flex-wrap justify-center gap-[18px] max-w-[1000px] mx-auto list-none p-0">
        {entries.slice(0, 9).map((entry, i) => (
          <motion.li
            key={entry.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.06 }}
            className="w-full md:w-[300px] p-[24px] rounded-[4px] text-left"
            style={{
              background: PAPER_TONES[i % PAPER_TONES.length],
              transform: `rotate(${i % 2 === 0 ? -1 : 1.2}deg)`,
              boxShadow: '0 6px 20px rgba(28,13,12,0.10)',
              border: '1px solid rgba(28,13,12,0.06)',
            }}
          >
            <div
              aria-hidden="true"
              className="w-[64px] h-[16px] mx-auto -mt-[34px] mb-3 rounded-sm -rotate-2"
              style={{ background: 'rgba(199,154,59,0.30)' }}
            />
            <p className="text-[16px] leading-[1.6] italic text-[#1d0e0d] mb-3">“{entry.note}”</p>
            <div className="font-script text-[21px] text-[var(--berry-deep)] leading-tight">{entry.name}</div>
            <div className="text-[12px] tracking-[1px] uppercase text-[var(--cocoa)] opacity-50 mt-1">{entry.when}</div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
