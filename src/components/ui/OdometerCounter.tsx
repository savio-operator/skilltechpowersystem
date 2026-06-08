'use client'
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

interface Props {
  target:  number
  suffix?: string
  className?: string
}

export default function OdometerCounter({ target, suffix = '', className }: Props) {
  const ref             = useRef<HTMLSpanElement>(null)
  const isInView        = useInView(ref, { once: true, amount: 0.5 })
  const shouldReduce    = useReducedMotion()
  const hasAnimated     = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current || !ref.current) return
    hasAnimated.current = true

    if (shouldReduce) {
      ref.current.textContent = target.toLocaleString('en-IN') + suffix
      return
    }

    const controls = animate(0, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent =
            Math.round(value).toLocaleString('en-IN') + suffix
        }
      },
    })
    return () => controls.stop()
  }, [isInView, target, suffix, shouldReduce])

  return (
    <span ref={ref} className={className} aria-label={`${target}${suffix}`}>
      0
    </span>
  )
}
