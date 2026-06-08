'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import LightningCanvas from '@/components/ui/LightningCanvas'
import { HOME } from '@/content/home'

export default function ChStorm() {
  const ref          = useRef<HTMLElement>(null)
  const flashRef     = useRef<HTMLDivElement>(null)
  const isInView     = useInView(ref, { once: true, amount: 0.3 })
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="ch-storm"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Storm bg */}
      <div className="absolute inset-0 bg-cinematic-storm">
        <Image
          src={HOME.storm.image}
          alt={HOME.storm.imageAlt}
          fill
          className="object-cover opacity-40"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/60 via-transparent to-[#050810]/60" />
      </div>

      {/* Lightning canvas */}
      {!shouldReduce && <LightningCanvas flashRef={flashRef} />}

      {/* Screen flash overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white pointer-events-none z-20"
        style={{ opacity: 0, transition: 'opacity 0.25s' }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-30 max-w-2xl px-6 md:px-[clamp(1.5rem,6vw,7rem)] py-24"
        initial={shouldReduce ? false : { opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <p className="chapter-eyebrow">{HOME.storm.eyebrow}</p>
        <h2
          className="font-display font-black text-paper mb-5 leading-tight"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          dangerouslySetInnerHTML={{
            __html: HOME.storm.headline.replace(
              /And unforgiving\./,
              '<em class="not-italic text-sky-blue">And unforgiving.</em>'
            ),
          }}
        />
        <p className="text-warm-grey leading-relaxed mb-8 max-w-lg" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}>
          {HOME.storm.body}
        </p>

        <div className="flex flex-wrap gap-4 md:gap-6">
          {HOME.storm.features.map((feat) => (
            <div key={feat} className="flex items-center gap-2.5 text-sm text-paper font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-blue shadow-[0_0_8px_theme(colors.sky-blue)] shrink-0" />
              {feat}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
