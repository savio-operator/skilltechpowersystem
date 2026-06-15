'use client'
import { useRef, type RefObject } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { HOME } from '@/content/home'
import TextCursorProximity from '@/components/ui/text-cursor-proximity'

export default function ChSky() {
  const ref          = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bgY       = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOp = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const contentY  = useTransform(scrollYProgress, [0, 0.6], ['0%', '-8%'])

  return (
    <section ref={ref} id="ch-sky" className="relative h-screen min-h-[600px] overflow-hidden flex items-center">
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0"
        style={shouldReduce ? {} : { y: bgY }}
      >
        <div className="absolute inset-0 bg-cinematic-sky" />
        <Image
          src={HOME.hero.image}
          alt={HOME.hero.imageAlt}
          fill
          priority
          className="object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
        {/* Layered dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 via-transparent to-navy-deep/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        {/* Subtle warm amber vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber/5 to-transparent" />
      </motion.div>

      {/* Horizontal rule — Tresmares style editorial line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 md:px-[clamp(1.5rem,6vw,7rem)] max-w-5xl w-full"
        style={shouldReduce ? {} : { opacity: contentOp, y: contentY }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="font-mono text-[0.72rem] tracking-[0.15em] text-warm-grey uppercase">
            {HOME.hero.eyebrow}
          </span>
          <span className="h-px w-8 bg-amber/50" aria-hidden="true" />
          <span className="font-mono text-[0.62rem] tracking-[0.15em] text-amber border border-amber/30 px-2 py-0.5 rounded-sm">
            {HOME.hero.badge}
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal + cursor proximity */}
        <h1
          className="font-display font-black leading-none tracking-tight mb-6 text-balance text-paper"
          style={{ fontSize: 'clamp(3rem, 9.5vw, 8.5rem)' }}
        >
          {shouldReduce ? (
            HOME.hero.headline.join(' ')
          ) : (
            <TextCursorProximity
              label={HOME.hero.headline.join(' ')}
              containerRef={ref as RefObject<HTMLDivElement>}
              radius={140}
              falloff="gaussian"
              className=""
              styles={{ color: { from: '#000000', to: '#FF1E1E' } }}
            />
          )}
        </h1>

        {/* Subline */}
        <motion.p
          className="text-warm-grey max-w-lg leading-relaxed mb-10"
          style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          {HOME.hero.sub}
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="flex items-center gap-3"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          aria-hidden="true"
        >
          <span className="font-mono text-[0.68rem] tracking-[0.15em] text-warm-grey uppercase">
            Scroll to begin
          </span>
          <div className="w-7 h-7 border border-warm-grey/30 rounded-full flex items-center justify-center animate-arrow-bounce">
            <div className="w-1.5 h-1.5 border-r border-b border-warm-grey -translate-y-px rotate-45" />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom editorial line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber/20 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      />
    </section>
  )
}
