'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue, useReducedMotion } from 'framer-motion'
import { HOME } from '@/content/home'

/* Each word occupies 1/3 of the scroll range */
function WordFrame({
  word, bg, color, scrollYProgress, index, total,
}: {
  word: string; bg: string; color: string
  scrollYProgress: MotionValue<number>; index: number; total: number
}) {
  const seg   = 1 / total
  const start = index * seg
  const end   = (index + 1) * seg

  const opacity  = useTransform(scrollYProgress, [start, start + seg * 0.18, end - seg * 0.18, end], [0, 1, 1, 0])
  const clipPath = useTransform(
    scrollYProgress,
    [start, start + seg * 0.28],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  )

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, backgroundColor: bg }}
      aria-hidden={index > 0}
    >
      <motion.span
        className="font-display font-black leading-none select-none px-8"
        style={{
          color,
          clipPath,
          fontSize: 'clamp(4.5rem, 18vw, 16rem)',
          letterSpacing: '-0.03em',
        }}
      >
        {word}
      </motion.span>
    </motion.div>
  )
}

export default function ChPromise() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  if (shouldReduce) {
    return (
      <section id="ch-promise" className="py-24 bg-navy-deep flex items-center justify-center min-h-[40vh]">
        <p className="font-display font-black text-4xl text-paper text-center leading-snug">
          Greener.<br />Cleaner.<br /><span className="text-amber">Better.</span>
        </p>
      </section>
    )
  }

  return (
    /* Tall spacer creates the scroll space for the pinned stage */
    <div ref={containerRef} id="ch-promise" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden" aria-label="Greener. Cleaner. Better.">
        <p className="sr-only">Greener. Cleaner. Better.</p>
        {HOME.promise.map((item, i) => (
          <WordFrame
            key={item.word}
            word={item.word}
            bg={item.bg}
            color={item.color}
            scrollYProgress={scrollYProgress}
            index={i}
            total={HOME.promise.length}
          />
        ))}
      </div>
    </div>
  )
}
