'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const WORDS  = ['cleaner.', 'greener.', 'better.']
const COLORS = ['#FBB034', '#FBB034', '#FFFFFF']  // gold, gold, white

export default function ChPromise() {
  const shouldReduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const prevIndex = useRef(0)
  const spacerRef = useRef<HTMLDivElement>(null)
  const stageRef  = useRef<HTMLDivElement>(null)

  // Direction the word should slide in/out: +1 scrolling down, -1 scrolling up.
  // Computed from the previous index so the reverse scroll animates correctly.
  const direction = index >= prevIndex.current ? 1 : -1
  useEffect(() => { prevIndex.current = index }, [index])

  // Pinned, scroll-scrubbed word swap — same behaviour as the solar (Machine) section.
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
      <section id="ch-promise" className="flex min-h-[60vh] items-center justify-center bg-black py-24">
        <p className="text-center font-display font-black leading-snug" style={{ fontSize: 'clamp(3rem,8vw,6rem)' }}>
          <span className="block text-[#FBB034]">This is something</span>
          <span className="block text-white">better.</span>
        </p>
      </section>
    )
  }

  return (
    <section id="ch-promise">
      <div ref={spacerRef} className="relative h-[300vh]">
        <div
          ref={stageRef}
          className="relative flex h-screen items-center justify-center overflow-hidden bg-black"
        >
          {/* Subtle ambient gold glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(251,176,52,0.06) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 px-6 text-center">
            <p
              className="select-none font-display font-black leading-[1.08]"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.03em' }}
              aria-label="This is something cleaner, greener, better."
            >
              {/* Permanent line */}
              <span className="block text-[#FBB034]">This is something</span>

              {/* Scroll-driven word */}
              <span
                className="relative block overflow-hidden"
                style={{ height: 'clamp(4rem, 11.5vw, 10.5rem)' }}
              >
                <AnimatePresence custom={direction}>
                  <motion.span
                    key={index}
                    custom={direction}
                    className="absolute inset-x-0 flex justify-center"
                    style={{ color: COLORS[index] }}
                    variants={{
                      enter:  (d: number) => ({ y: `${d * 100}%`,  opacity: 0 }),
                      center: { y: '0%', opacity: 1 },
                      exit:   (d: number) => ({ y: `${-d * 100}%`, opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
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
