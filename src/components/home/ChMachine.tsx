'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { HOME } from '@/content/home'
import { panelState } from '@/lib/panelState'
import { SolarPanel3DFallback } from '@/components/ui/SolarPanel3D'

const SolarPanel3D = dynamic(() => import('@/components/ui/SolarPanel3D'), {
  ssr: false,
  loading: () => <SolarPanel3DFallback />,
})

// Cinematic scroll-pinned 3D panel. The component callouts that used to sit in
// the right column now live in their own section below (ChSystems); the panel
// is centred to fill the space.
export default function ChMachine() {
  const spacerRef    = useRef<HTMLDivElement>(null)
  const stageRef     = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const [labelVis,   setLabelVis]   = useState(false)

  useEffect(() => {
    if (shouldReduce) { panelState.scrollProgress = 1; setLabelVis(true); return }
    if (!spacerRef.current || !stageRef.current) return

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
          const proxy = { v: 0 }

          gsap.to(proxy, {
            v: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: spacerRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.2,
              pin: stageRef.current,
              pinSpacing: false,
              onUpdate(self) {
                panelState.scrollProgress = self.progress
                setLabelVis(self.progress > 0.02)
              },
            },
          })
        }, spacerRef)

        return () => ctx.revert()
      }
    )
  }, [shouldReduce])

  return (
    <section id="ch-machine">
      <div ref={spacerRef} className="relative h-[300vh]">
        <div
          ref={stageRef}
          // Decorative, scroll-pinned stage with no interactive elements.
          className="section-invert pointer-events-none h-screen overflow-hidden flex flex-col items-center justify-center"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%), #1A1828',
          }}
        >
          {/* Chapter label */}
          <motion.div
            className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[0.62rem] tracking-[0.2em] text-warm-grey"
            animate={{ opacity: labelVis ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            aria-hidden="true"
          >
            {HOME.machine.eyebrow}
          </motion.div>

          {/* Centred 3D panel */}
          <div className="flex items-center justify-center w-full max-w-3xl px-6 h-[300px] xs:h-[360px] sm:h-[440px] md:h-[540px]">
            <SolarPanel3D />
          </div>
        </div>
      </div>
    </section>
  )
}
