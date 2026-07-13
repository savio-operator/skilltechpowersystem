'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { HOME } from '@/content/home'
import { panelState } from '@/lib/panelState'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SolarPanel3DFallback } from '@/components/ui/SolarPanel3D'

const SolarPanel3D = dynamic(() => import('@/components/ui/SolarPanel3D'), {
  ssr: false,
  loading: () => <SolarPanel3DFallback />,
})

// Cinematic scroll-pinned 3D panel with the "Inside the System" callouts living
// beside it — right column on desktop, below the panel on mobile — each callout
// scrub-revealed as the pinned section plays through. (Replaces the separate
// ChSystems section that used to duplicate these below.)
export default function ChMachine() {
  const spacerRef    = useRef<HTMLDivElement>(null)
  const stageRef     = useRef<HTMLDivElement>(null)
  const calloutsRef  = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const [labelVis,   setLabelVis]   = useState(false)
  // Drives the r3f frameloop: render only while the pinned section is active.
  const [panelActive, setPanelActive] = useState(true)
  // Skip the WebGL canvas on small / touch / reduced-motion devices — the
  // continuous useFrame render is the main source of mobile frame drops.
  const [lite, setLite] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setLite(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!spacerRef.current || !stageRef.current) return

    const ctx = gsap.context(() => {
      const proxy = { v: 0 }

      gsap.to(proxy, {
        v: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: spacerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          // scrub:true — Lenis's eased scroll is already the smoothing layer;
          // stacking a 1.2s scrub on top compounds to ~2.4s of lag inside the
          // pin, which reads as "stuck".
          scrub: true,
          pin: stageRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          refreshPriority: 1,
          onUpdate(self) {
            panelState.scrollProgress = self.progress
            setLabelVis(self.progress > 0.02)
          },
          // Pause the 3D render loop while this chapter is offscreen.
          onToggle(self) {
            setPanelActive(self.isActive)
          },
        },
      })

      // Callouts reveal one by one as the pinned panel plays through —
      // scrubbed to scroll so they track finger position, not a timer.
      const items = calloutsRef.current?.querySelectorAll<HTMLElement>('[data-callout]')
      if (items?.length) {
        gsap.fromTo(items,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            ease: 'none',
            stagger: 0.16,
            scrollTrigger: {
              trigger: spacerRef.current,
              start: 'top top',
              end: '75% bottom',
              scrub: true,
            },
          }
        )
      }
    }, spacerRef)
    // Re-measure once the pin exists so start/end match the painted layout.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(raf)
      ctx.revert()
    }
  }, [])

  return (
    <section id="ch-machine">
      <div ref={spacerRef} className="relative h-[300vh]">
        <div
          ref={stageRef}
          // Decorative, scroll-pinned stage with no interactive elements.
          className="section-invert pointer-events-none h-[100svh] md:h-screen overflow-hidden flex flex-col items-center"
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

          {/* Panel + callouts: stacked on mobile, side-by-side from md up */}
          <div className="flex h-full w-full max-w-6xl flex-col items-center justify-center gap-2 px-5 pt-8 pb-4 md:flex-row md:gap-10 md:px-10 md:pt-16 md:pb-6">
            {/* 3D panel */}
            <div className="flex w-full flex-1 items-center justify-center h-[25vh] min-h-[160px] max-h-[240px] xs:h-[30vh] sm:h-[36vh] md:h-[540px] md:max-h-[70vh]">
              {lite ? <SolarPanel3DFallback /> : <SolarPanel3D active={panelActive} />}
            </div>

            {/* Inside-the-system callouts — scrub-revealed */}
            <div ref={calloutsRef} className="pointer-events-auto w-full max-w-md shrink-0 overflow-y-auto max-h-[40vh] md:w-[380px] md:max-w-none md:max-h-none md:overflow-visible">
              <p data-callout className="chapter-eyebrow !mb-2 md:!mb-3">
                CH.03a / INSIDE THE SYSTEM
              </p>
              <h2
                data-callout
                className="mb-3 font-display font-black leading-tight text-paper md:mb-6"
                style={{ fontSize: 'clamp(1.35rem, 4.5vw, 2.5rem)' }}
              >
                What goes on your roof.
              </h2>

              <div className="space-y-2 md:space-y-3.5">
                {HOME.machine.callouts.map((c) => (
                  <div
                    key={c.num}
                    data-callout
                    className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 md:gap-4 md:rounded-2xl md:px-5 md:py-4"
                  >
                    <span className="shrink-0 pt-0.5 font-mono text-[0.65rem] text-amber md:text-[0.7rem]">
                      {c.num}
                    </span>
                    <div>
                      <strong className="block font-display text-[0.85rem] font-bold leading-tight text-paper md:text-base">
                        {c.title}
                      </strong>
                      <span className="text-[0.72rem] leading-snug text-warm-grey md:text-sm md:leading-relaxed">
                        {c.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
