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

export default function ChMachine() {
  const spacerRef    = useRef<HTMLDivElement>(null)
  const stageRef     = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const [activeIdx,  setActiveIdx]  = useState(-1)
  const [labelVis,   setLabelVis]   = useState(false)

  useEffect(() => {
    if (shouldReduce) { setActiveIdx(3); setLabelVis(true); return }
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
                const p = self.progress
                panelState.scrollProgress = p
                setLabelVis(p > 0.02)
                if      (p >= 0.82) setActiveIdx(3)
                else if (p >= 0.65) setActiveIdx(2)
                else if (p >= 0.52) setActiveIdx(1)
                else if (p >= 0.40) setActiveIdx(0)
                else                setActiveIdx(-1)
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
      <div ref={spacerRef} className="relative h-[500vh]">
        <div
          ref={stageRef}
          className="h-screen overflow-hidden flex flex-col items-center justify-center bg-navy-deep"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(26,24,40,0.06) 0%, transparent 70%), #FBB034',
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

          {/* Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 w-full max-w-5xl px-6 md:px-12 items-center">
            {/* Panel */}
            <div className="flex items-center justify-center h-[220px] xs:h-[270px] sm:h-[320px] md:h-[460px]">
              <SolarPanel3D />
            </div>

            {/* Callouts */}
            <div className="flex flex-col gap-5 md:gap-6">
              {HOME.machine.callouts.map((c, i) => (
                <motion.div
                  key={c.num}
                  className="flex gap-4"
                  animate={{
                    opacity: i <= activeIdx ? 1 : 0,
                    x:       i <= activeIdx ? 0 : 28,
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-mono text-[0.65rem] text-amber pt-1 shrink-0">{c.num}</span>
                  <div>
                    <strong className="block font-display font-bold text-[1rem] md:text-lg text-paper leading-tight">
                      {c.title}
                    </strong>
                    <span className="text-warm-grey text-sm leading-relaxed">{c.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
