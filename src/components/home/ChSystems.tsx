'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { HOME } from '@/content/home'

// The solar-system breakdown that used to sit beside the 3D panel, now its own
// section directly below the Machine. Mount-revealed (reliable) rather than
// scroll-observer gated.
export default function ChSystems() {
  const shouldReduce = useReducedMotion()

  const fade = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial:    { opacity: 0, y: 24 },
          animate:    { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
        }

  return (
    <section id="ch-systems" className="relative z-10 bg-navy-deep py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <motion.p className="chapter-eyebrow" {...fade(0)}>
          CH.03a / INSIDE THE SYSTEM
        </motion.p>
        <motion.h2
          className="mb-10 max-w-2xl font-display font-black text-balance text-paper"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
          {...fade(0.06)}
        >
          What goes on your roof.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HOME.machine.callouts.map((c, i) => (
            <motion.div
              key={c.num}
              className="flex gap-4 rounded-2xl border border-black/10 bg-black/[0.03] p-5 transition hover:border-black/25 hover:bg-black/[0.05]"
              {...fade(0.1 + i * 0.06)}
            >
              <span className="font-mono text-[0.7rem] text-amber pt-1 shrink-0">{c.num}</span>
              <div>
                <strong className="block font-display font-bold text-lg text-paper leading-tight">
                  {c.title}
                </strong>
                <span className="text-warm-grey text-sm leading-relaxed">{c.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
