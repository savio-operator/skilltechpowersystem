'use client'
import { motion, useReducedMotion } from 'framer-motion'

// Each promise word is now its own full-screen page (no scroll-pinned cycling).
const PAGES = [
  { word: 'cleaner.', color: '#000000' },  // black on gold
  { word: 'greener.', color: '#000000' },  // black on gold
  { word: 'better.',  color: '#FFFFFF' },  // white on gold
]

export default function ChPromise() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="ch-promise">
      {PAGES.map((p) => (
        <div
          key={p.word}
          className="relative flex h-screen items-center justify-center overflow-hidden bg-navy-deep px-6"
        >
          {/* Subtle ambient depth */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(26,24,40,0.06) 0%, transparent 70%)',
            }}
          />

          <motion.p
            className="relative z-10 select-none text-center font-display font-black leading-[1.08]"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.03em' }}
            aria-label={`This is something ${p.word}`}
            initial={shouldReduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[#1A1828]">This is something</span>
            <span className="block" style={{ color: p.color }}>{p.word}</span>
          </motion.p>
        </div>
      ))}
    </section>
  )
}
