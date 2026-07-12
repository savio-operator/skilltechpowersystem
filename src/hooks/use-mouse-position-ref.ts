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
    // Touch devices get nothing from cursor proximity, and the touchmove
    // handler's getBoundingClientRect forces layout on every scroll frame.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const update = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = { x: x - rect.left, y: y - rect.top }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouse = (e: MouseEvent) => update(e.clientX, e.clientY)

    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [containerRef])

  return positionRef
}
