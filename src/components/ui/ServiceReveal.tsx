'use client'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  delay?: number
  /** Optional clip-path reveal for large headings */
  clipReveal?: boolean
  /** Element to render as — use 'li' inside a <ul> to keep valid markup */
  as?: 'div' | 'li'
  className?: string
}

/**
 * Lightweight scroll-reveal wrapper used on Service pages.
 * Fades + slides up when the element enters the viewport.
 */
export default function ServiceReveal({
  children,
  delay = 0,
  clipReveal = false,
  as = 'div',
  className,
}: Props) {
  const ref = useRef<any>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return as === 'li'
      ? <li ref={ref} className={className}>{children}</li>
      : <div ref={ref} className={className}>{children}</div>
  }

  // clip-path reveal is only meaningful for block headings (div)
  if (clipReveal && as === 'div') {
    return (
      <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
        <motion.div
          initial={{ y: '105%', opacity: 0 }}
          animate={isInView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  const MotionTag = as === 'li' ? motion.li : motion.div

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}
