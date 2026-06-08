'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import OdometerCounter  from '@/components/ui/OdometerCounter'
import ErnakulamMap     from '@/components/ui/ErnakulamMap'
import PortfolioTrack   from '@/components/ui/PortfolioTrack'
import { HOME }         from '@/content/home'
import { TESTIMONIALS } from '@/content/testimonials'

export default function ChProof() {
  const ref          = useRef<HTMLElement>(null)
  const isInView     = useInView(ref, { once: true, amount: 0.1 })
  const shouldReduce = useReducedMotion()

  const fadeUp = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial:    { opacity: 0, y: 28 },
          animate:    isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
        }

  return (
    <section id="ch-proof" ref={ref} className="py-20 md:py-28 bg-navy-deep">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <motion.p className="chapter-eyebrow" {...fadeUp(0)}>
          {HOME.proof.eyebrow}
        </motion.p>
        <motion.h2
          className="font-display font-black text-balance mb-14 max-w-2xl"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          {...fadeUp(0.06)}
        >
          {HOME.proof.headline}
        </motion.h2>

        {/* Counters */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          {...fadeUp(0.1)}
        >
          {HOME.proof.counters.map((c) => (
            <div
              key={c.id}
              className="border border-white/6 rounded-lg p-5 bg-white/[0.02]"
            >
              <OdometerCounter
                target={c.target}
                suffix={c.suffix}
                className="block font-mono font-bold text-amber leading-none mb-1.5"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' } as React.CSSProperties}
              />
              <span className="text-warm-grey text-xs leading-snug">{c.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div className="mb-20" {...fadeUp(0.14)}>
          <p className="text-warm-grey mb-6 max-w-md leading-relaxed">{HOME.proof.mapCaption}</p>
          <ErnakulamMap />
        </motion.div>

        {/* Portfolio */}
        <motion.div className="mb-20" {...fadeUp(0.18)}>
          <div className="flex items-baseline gap-4 mb-4">
            <h3 className="font-display font-bold text-xl md:text-2xl text-paper">Recent installations</h3>
            <span className="font-mono text-[0.68rem] text-warm-grey tracking-wider hidden sm:block">
              drag to explore
            </span>
          </div>
          <PortfolioTrack />
        </motion.div>

        {/* Testimonials */}
        <motion.div {...fadeUp(0.22)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                className="rounded-xl border border-white/6 bg-white/[0.02] p-6 flex flex-col gap-4"
                initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.28 + i * 0.1 }}
              >
                <p className="text-warm-grey text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <span className="block text-paper text-sm font-semibold">{t.name}</span>
                  <span className="block font-mono text-[0.65rem] text-warm-grey tracking-wider mt-0.5">
                    {t.location} · {t.system} · {t.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
