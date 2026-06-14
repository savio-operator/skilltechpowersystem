'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SavingsCalculator from '@/components/ui/SavingsCalculator'
import { HOME } from '@/content/home'

export default function ChMath() {
  const ref          = useRef<HTMLElement>(null)
  const isInView     = useInView(ref, { once: true, amount: 0.2 })
  const shouldReduce = useReducedMotion()

  const fadeUp = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial:   { opacity: 0, y: 32 },
          animate:   isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
        }

  return (
    <section
      id="ch-math"
      ref={ref}
      className="py-20 md:py-28 section-invert"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <motion.p className="chapter-eyebrow" {...fadeUp(0)}>
          {HOME.math.eyebrow}
        </motion.p>
        <motion.h2
          className="font-display font-black text-balance mb-3 leading-none"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          {...fadeUp(0.08)}
        >
          {HOME.math.headline}
        </motion.h2>
        <motion.p className="text-warm-grey mb-10 leading-relaxed" {...fadeUp(0.14)}>
          {HOME.math.sub}
        </motion.p>

        <motion.div {...fadeUp(0.2)}>
          <SavingsCalculator />
        </motion.div>
      </div>
    </section>
  )
}
