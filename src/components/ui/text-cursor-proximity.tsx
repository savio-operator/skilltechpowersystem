"use client"
/* eslint-disable react-hooks/rules-of-hooks */
// Letters react to cursor proximity. The per-letter useMotionValue/useTransform
// calls run inside maps, but the letter count is stable per mount, so hook order
// is preserved — the rules-of-hooks lint is disabled intentionally for this file.

import React, { CSSProperties, forwardRef, useEffect, useRef } from "react"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"

// Helper type that makes all properties of CSSProperties accept number | string
type CSSPropertiesWithValues = {
  [K in keyof CSSProperties]: string | number
}

interface StyleValue<T extends keyof CSSPropertiesWithValues> {
  from: CSSPropertiesWithValues[T]
  to: CSSPropertiesWithValues[T]
}

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  styles: Partial<{
    [K in keyof CSSPropertiesWithValues]: StyleValue<K>
  }>
  containerRef: React.RefObject<HTMLDivElement>
  radius?: number
  falloff?: "linear" | "exponential" | "gaussian"
}

const TextCursorProximity = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      label,
      styles,
      containerRef,
      radius = 50,
      falloff = "linear",
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
    const mousePositionRef = useMousePositionRef(containerRef)

    // Create a motion value for each letter's proximity
    const letterProximities = useRef(
      Array(label.replace(/\s/g, "").length)
        .fill(0)
        .map(() => useMotionValue(0))
    )

    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    const calculateFalloff = (distance: number): number => {
      const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1)

      switch (falloff) {
        case "exponential":
          return Math.pow(normalizedDistance, 2)
        case "gaussian":
          return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2)
        case "linear":
        default:
          return normalizedDistance
      }
    }

    // Letter centres are static relative to the container, so measure them once
    // (and again on resize / after web-font swap) instead of calling
    // getBoundingClientRect per letter per frame — ~30 forced reflows/frame.
    const letterCenters = useRef<({ x: number; y: number } | null)[]>([])
    useEffect(() => {
      const measure = () => {
        const container = containerRef.current
        if (!container) return
        const containerRect = container.getBoundingClientRect()
        letterCenters.current = letterRefs.current.map((el) => {
          if (!el) return null
          const rect = el.getBoundingClientRect()
          return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          }
        })
      }
      measure()
      document.fonts?.ready.then(measure).catch(() => {})
      window.addEventListener("resize", measure)
      return () => window.removeEventListener("resize", measure)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [label])

    const lastMouse = useRef({ x: NaN, y: NaN })
    useAnimationFrame(() => {
      const { x: mouseX, y: mouseY } = mousePositionRef.current
      // Nothing to update while the cursor is still.
      if (mouseX === lastMouse.current.x && mouseY === lastMouse.current.y) return
      lastMouse.current = { x: mouseX, y: mouseY }

      letterCenters.current.forEach((center, index) => {
        if (!center) return
        const distance = calculateDistance(mouseX, mouseY, center.x, center.y)
        const proximity = calculateFalloff(distance)
        letterProximities.current[index].set(proximity)
      })
    })

    const words = label.split(" ")
    let letterIndex = 0

    return (
      <span
        ref={ref}
        className={`${className} inline`}
        onClick={onClick}
        {...props}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((letter) => {
              const currentLetterIndex = letterIndex++
              const proximity = letterProximities.current[currentLetterIndex]

              // Create transformed values for each style property
              const transformedStyles = Object.entries(styles).reduce((acc, [key, value]) => {
                const v = value as { from: string | number; to: string | number }
                acc[key] = useTransform(proximity, [0, 1], [v.from, v.to])
                return acc
              }, {} as Record<string, any>)

              return (
                <motion.span
                  key={currentLetterIndex}
                  ref={(el: HTMLSpanElement | null) => {
                    letterRefs.current[currentLetterIndex] = el
                  }}
                  className="inline-block"
                  aria-hidden="true"
                  style={transformedStyles}
                >
                  {letter}
                </motion.span>
              )
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    )
  }
)

TextCursorProximity.displayName = "TextCursorProximity"
export default TextCursorProximity
