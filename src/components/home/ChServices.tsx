'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { SERVICE_LIST } from '@/content/services'

// CH.03b / EVERYTHING WE DO — solar is the headline act (the Machine chapter),
// but Skilltech is a complete power-systems company. This grid surfaces every
// service so the home page isn't solar-only, each card linking to its page.
export default function ChServices() {
  const ref          = useRef<HTMLElement>(null)
  const isInView     = useInView(ref, { once: true, amount: 0.1 })
  const shouldReduce = useReducedMotion()

  return (
    <section ref={ref} id="ch-services" className="relative z-10 bg-navy-deep py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="chapter-eyebrow">CH.03b / EVERYTHING WE DO</p>
        <h2
          className="mb-4 max-w-2xl font-display font-black text-balance text-paper"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          More than panels.
        </h2>
        <p className="mb-12 max-w-xl leading-relaxed text-warm-grey">
          Skilltech is a complete power-systems company — solar is where most homes
          start, but we cover the whole chain from rooftop to switch.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_LIST.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={shouldReduce ? false : { opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
            >
              <Link
                href={`/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-black/15 bg-black/[0.04] p-6 transition hover:border-black/40 hover:bg-black/[0.07]"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-warm-grey">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="rounded-full border border-black/20 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-paper">
                    {s.shortName}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-lg font-bold leading-tight text-paper">
                  {s.name}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-warm-grey">
                  {s.tagline}
                </p>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-paper transition group-hover:gap-2.5">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
