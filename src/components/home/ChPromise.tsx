'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const WORDS  = ['cleaner.', 'greener.', 'better.']
const COLORS = ['#FFFFFF', '#FFFFFF', '#F7B538']  // cleaner: white, greener: white, better: gold

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
    if (!spacerRef.current || !stageRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: spacerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: stageRef.current,
        pinSpacing: false,
        // Pre-apply the pin a frame early — Lenis drives ScrollTrigger with a
        // frame of latency, so fast scrolls otherwise overshoot the pin start
        // and snap back (the "stuck" feel at chapter entry).
        anticipatePin: 1,
        refreshPriority: 2,
        onUpdate(self) {
          const p = self.progress
          if      (p >= 0.66) setIndex(2)
          else if (p >= 0.33) setIndex(1)
          else                setIndex(0)
        },
      })
    }, spacerRef)
    // Re-measure once the pin exists so start/end match the painted layout.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(raf)
      ctx.revert()
    }
  }, [])



  return (
    <section id="ch-promise">
      <div ref={spacerRef} className="relative h-[300vh]">
        <div
          ref={stageRef}
          className="pointer-events-none relative flex h-[100svh] md:h-screen items-center justify-center overflow-hidden bg-black"
        >
          {/* Subtle ambient gold glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 px-6 text-center">
            <p
              className="select-none font-display font-black leading-[1.08]"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.03em' }}
              aria-label="This is something cleaner, greener, better."
            >
              {/* Permanent line */}
              <span className="block text-[#FFFFFF]">This is something</span>

              {/* Scroll-driven word */}
              <span
                className="relative block overflow-hidden"
                style={{ height: 'clamp(4.5rem, 12vw, 11rem)' }}
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
