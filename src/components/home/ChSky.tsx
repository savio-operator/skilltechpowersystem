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
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={shouldReduce ? {} : { y: bgY }}
      >
        {/* Cinematic gradient placeholder — real photo replaces this */}
        <div className="absolute inset-0 bg-cinematic-sky" />
        <Image
          src={HOME.hero.image}
          alt={HOME.hero.imageAlt}
          fill
          priority
          className="object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 via-transparent to-navy-deep/65" />
        {/* Warm amber light band */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber/5 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 md:px-[clamp(1.5rem,6vw,7rem)] max-w-5xl w-full"
        style={shouldReduce ? {} : { opacity: contentOp, y: contentY }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="font-mono text-[0.72rem] tracking-[0.15em] text-warm-grey uppercase">
            {HOME.hero.eyebrow}
          </span>
          <span className="font-mono text-[0.62rem] tracking-[0.15em] text-amber border border-amber/30 px-2 py-0.5 rounded-sm">
            {HOME.hero.badge}
          </span>
        </motion.div>

        {/* Headline — letters react to cursor proximity */}
        <h1 className="font-display font-black leading-none tracking-tight mb-6 text-balance text-paper"
            style={{ fontSize: 'clamp(3rem, 9.5vw, 8.5rem)' }}>
          <TextCursorProximity
            label={HOME.hero.headline.join(' ')}
            containerRef={ref as RefObject<HTMLDivElement>}
            radius={140}
            falloff="gaussian"
            className=""
            styles={{ color: { from: '#1A1828', to: '#FFFFFF' } }}
          />
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
    </section>
  )
}
