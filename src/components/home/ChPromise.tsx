'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const WORDS  = ['cleaner.', 'greener.', 'better.']
const COLORS = ['#FBF8F0', '#FBF8F0', '#FBB034']

export default function ChPromise() {
  const shouldReduce = useReducedMotion()
  const [index, setIndex]   = useState(0)
  const spacerRef = useRef<HTMLDivElement>(null)
  const stageRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldReduce) return
    if (!spacerRef.current || !stageRef.current) return

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: spacerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            pin: stageRef.current,
            pinSpacing: false,
            onUpdate(self) {
              const p = self.progress
              if      (p >= 0.66) setIndex(2)
              else if (p >= 0.33) setIndex(1)
              else                setIndex(0)
            },
          })
        }, spacerRef)

        return () => ctx.revert()
      }
    )
  }, [shouldReduce])

  if (shouldReduce) {
    return (
      <section id="ch-promise" className="py-24 bg-navy-deep flex items-center justify-center min-h-[40vh]">
        <p className="font-display font-black text-4xl text-paper text-center leading-snug">
          This is something<br /><span className="text-amber">better.</span>
        </p>
      </section>
    )
  }

  return (
    <section id="ch-promise">
      <div ref={spacerRef} className="relative h-[300vh]">
        <div
          ref={stageRef}
          className="relative flex h-screen items-center justify-center bg-navy-deep overflow-hidden"
        >
          {/* Subtle ambient glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(251,176,52,0.04) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 px-6 text-center">
            <p
              className="font-display font-black leading-[1.08] select-none"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.03em' }}
              aria-label="This is something cleaner, greener, better."
            >
              <span className="text-warm-grey block">This is something</span>

              <span
                className="relative block overflow-hidden"
                style={{ height: 'clamp(4rem, 11.5vw, 10.5rem)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    className="absolute inset-x-0 flex justify-center"
                    style={{ color: COLORS[index] }}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%',   opacity: 1 }}
                    exit={{    y: '-100%', opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18 }}
                  >
                    {WORDS[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
