'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Motion values updated imperatively — no React re-render per mouse move.
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Ring trails the dot with a soft spring.
  const ringX = useSpring(x, { stiffness: 400, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 400, damping: 28, mass: 0.5 })

  useEffect(() => {
    // Only on devices with a fine pointer (no touch).
    if (window.matchMedia('(pointer: coarse)').matches) return
    setIsVisible(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const hit = !!(e.target as HTMLElement).closest('a, button, [role="button"]')
      // Only flips state at element boundaries, not every frame.
      setIsHovering((prev) => (prev === hit ? prev : hit))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (!isVisible) return null

  return (
    <>
      {/* Main dot — tracks the pointer exactly (centred via negative margin
          so it doesn't fight framer-motion's transform). */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-amber"
        style={{ x, y }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isHovering ? 0 : 1 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />

      {/* Outer ring — springy trail, grows + glows over interactive elements. */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] -ml-4 -mt-4 h-8 w-8 rounded-full border bg-amber/5 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? 'rgba(247,181,56,1)' : 'rgba(247,181,56,0.4)',
          backgroundColor: isHovering ? 'rgba(247,181,56,0.15)' : 'rgba(247,181,56,0.05)',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
