import { useEffect, useRef, type RefObject } from 'react'

/**
 * Tracks the mouse (and touch) position in a ref — relative to `containerRef`
 * when provided, otherwise in viewport coordinates. Returns a ref so consumers
 * can read the latest position inside an animation frame without re-rendering.
 */
export function useMousePositionRef(
  containerRef?: RefObject<HTMLElement>,
) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const update = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = { x: x - rect.left, y: y - rect.top }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouse = (e: MouseEvent) => update(e.clientX, e.clientY)
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) update(t.clientX, t.clientY)
    }

    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('touchmove', handleTouch)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('touchmove', handleTouch)
    }
  }, [containerRef])

  return positionRef
}
