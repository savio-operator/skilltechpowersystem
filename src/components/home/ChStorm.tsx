'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import LightningCanvas from '@/components/ui/LightningCanvas'
import { HOME } from '@/content/home'
import { mobileResponsiveSrc } from '@/lib/responsiveImages'

export default function ChStorm() {
  const ref          = useRef<HTMLElement>(null)
  const flashRef     = useRef<HTMLDivElement>(null)
  const isInView     = useInView(ref, { once: true, amount: 0.3 })
  const shouldReduce = useReducedMotion()

  const headline = HOME.storm.headline
  const mobileStormImage = mobileResponsiveSrc(HOME.storm.image)
  // Split headline into lines for the reveal animation
  const lines = headline.split('. ').map((l, i, arr) => i < arr.length - 1 ? l + '.' : l)

  return (
    <section
      id="ch-storm"
      ref={ref}
      className="relative z-10 min-h-screen flex items-center overflow-hidden"
    >
      {/* Storm bg */}
      <div className="absolute inset-0 bg-cinematic-storm">
        <picture>
          {mobileStormImage && <source media="(max-width: 767px)" srcSet={mobileStormImage} />}
          <Image
            src={HOME.storm.image}
            alt={HOME.storm.imageAlt}
            fill
            className="object-cover opacity-40"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        </picture>
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

      {/* Editorial left-side rule */}
      <motion.div
        className="absolute left-[clamp(1.5rem,6vw,7rem)] top-16 bottom-16 w-[1px] bg-gradient-to-b from-transparent via-amber/30 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ originY: 0 }}
      />

      {/* Content */}
      <div className="relative z-30 max-w-2xl px-6 md:px-[clamp(1.5rem,6vw,7rem)] py-24">
        {/* Eyebrow */}
        <motion.p
          className="chapter-eyebrow"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {HOME.storm.eyebrow}
        </motion.p>

        {/* Headline — line-by-line clip reveal */}
        <h2
          className="font-display font-black text-paper mb-5 leading-tight"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
        >
          {shouldReduce ? (
            <span dangerouslySetInnerHTML={{ __html: HOME.storm.headline.replace(
              /And unforgiving\./,
              '<em class="not-italic text-sky-blue">And unforgiving.</em>'
            )}} />
          ) : (
            isInView && lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className={`block ${line.includes('unforgiving') ? 'text-amber' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))
          )}
        </h2>

        {/* Body */}
        <motion.p
          className="text-warm-grey leading-relaxed mb-8 max-w-lg"
          style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          {HOME.storm.body}
        </motion.p>

        {/* Feature pills */}
        <motion.div
          className="flex flex-wrap gap-4 md:gap-6"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          {HOME.storm.features.map((feat, i) => (
            <motion.div
              key={feat}
              className="flex items-center gap-2.5 text-sm text-paper font-medium"
              initial={shouldReduce ? false : { opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.8 + i * 0.08 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber shadow-[0_0_8px_theme(colors.amber)] shrink-0" />
              {feat}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
