import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type InquiryType = 'wholesale' | 'event' | 'general';

interface Props {
  type: InquiryType;
  /** Label for the trigger button */
  submitLabel?: string;
  /** Tailwind/CSS classes for the trigger button */
  buttonClassName?: string;
  /** When true, renders form fields with light text/borders for dark backgrounds */
  darkBg?: boolean;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function InquireForm({
  type,
  submitLabel = 'Send inquiry',
  buttonClassName = '',
  darkBg = false,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus('sending');
    try {
      // Use BASE_URL so the path is correct in both Replit dev and Vercel deploy
      const base = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';
      const res = await fetch(`${base}/api/inquire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: phone || undefined, type, message }),
      });
      if (!res.ok) throw new Error('server error');
      setStatus('success');
      setName(''); setEmail(''); setPhone(''); setMessage('');
    } catch {
      setStatus('error');
    }
  }

  function reset() {
    setStatus('idle');
    setOpen(false);
  }

  // Light-on-dark vs dark-on-light field styles
  const inputClass = darkBg
    ? 'w-full bg-transparent border-b-2 border-[rgba(243,234,214,0.35)] pb-[5px] text-[17px] text-[#f3ead6] placeholder:text-[rgba(243,234,214,0.4)] placeholder:italic focus:outline-none focus:border-[var(--gold-hi)] transition-colors px-1 py-1 rounded-sm'
    : 'w-full bg-transparent border-b-2 border-[rgba(28,13,12,0.25)] pb-[5px] text-[17px] text-[var(--cocoa)] placeholder:text-[rgba(28,13,12,0.35)] placeholder:italic focus:outline-none focus:border-[var(--berry)] transition-colors px-1 py-1 rounded-sm';

  const labelClass = darkBg
    ? 'block text-[11px] tracking-[3px] uppercase font-bold text-[#f3ead6] opacity-70 mb-1'
    : 'block text-[11px] tracking-[3px] uppercase font-bold text-[var(--cocoa)] opacity-60 mb-1';

  const textareaClass = darkBg
    ? 'w-full bg-transparent border border-[rgba(243,234,214,0.28)] rounded-[6px] px-3 py-2 text-[16px] leading-[1.6] text-[#f3ead6] placeholder:text-[rgba(243,234,214,0.4)] placeholder:italic focus:outline-none focus:border-[var(--gold-hi)] transition-colors resize-none'
    : 'w-full bg-transparent border border-[rgba(28,13,12,0.2)] rounded-[6px] px-3 py-2 text-[16px] leading-[1.6] text-[var(--cocoa)] placeholder:text-[rgba(28,13,12,0.35)] placeholder:italic focus:outline-none focus:border-[var(--berry)] transition-colors resize-none';

  const cancelClass = darkBg
    ? 'text-[12px] tracking-[2px] uppercase underline text-[#f3ead6] opacity-50 hover:opacity-90 transition-opacity'
    : 'text-[12px] tracking-[2px] uppercase underline opacity-50 hover:opacity-90 transition-opacity';

  return (
    <div className="mt-6">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="trigger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
            onClick={() => setOpen(true)}
            className={buttonClassName}
          >
            {submitLabel}
            <span aria-hidden="true"> →</span>
          </motion.button>
        ) : status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div
              className="text-[22px] mb-2"
              aria-live="polite"
              style={{
                fontFamily: 'var(--font-script)',
                color: darkBg ? '#f3ead6' : 'var(--berry)',
              }}
            >
              Message received ♥
            </div>
            <p
              className="text-[14px] italic mb-4"
              style={{
                fontFamily: 'var(--font-sans)',
                color: darkBg ? 'rgba(243,234,214,0.7)' : 'rgba(28,13,12,0.6)',
              }}
            >
              We'll be in touch soon.
            </p>
            <button
              type="button"
              onClick={reset}
              className={cancelClass}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Close
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onSubmit={handleSubmit}
            className="max-w-[460px] mx-auto text-left"
          >
            <div className="mb-5">
              <label className={labelClass}>Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                required
                placeholder="Name or business name"
                className={inputClass}
              />
            </div>
            <div className="mb-5">
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={120}
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
            <div className="mb-5">
              <label className={labelClass}>
                Phone{' '}
                <span
                  className="normal-case font-normal"
                  style={{ opacity: 0.6 }}
                >
                  (optional)
                </span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={30}
                placeholder="503-555-0100"
                className={inputClass}
              />
            </div>
            <div className="mb-6">
              <label className={labelClass}>Tell us more</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1200}
                rows={4}
                required
                placeholder={
                  type === 'wholesale'
                    ? 'What products are you interested in, quantities, timeline…'
                    : type === 'event'
                    ? 'Date, number of guests, type of event…'
                    : 'How can we help?'
                }
                className={textareaClass}
              />
            </div>

            {status === 'error' && (
              <p className="text-[13px] text-red-400 mb-4 italic" role="alert">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="submit"
                disabled={status === 'sending' || !name.trim() || !email.trim() || !message.trim()}
                className="bg-[var(--cocoa)] text-[var(--cream)] py-[11px] px-[26px] rounded-full text-[14px] font-semibold tracking-[0.5px] mech-btn hover:bg-[var(--berry)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--gold)]"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <button
                type="button"
                onClick={reset}
                className={cancelClass}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
