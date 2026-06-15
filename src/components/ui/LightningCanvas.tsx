'use client'
import { useEffect, useRef, useCallback } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

interface Props {
  flashRef: React.RefObject<HTMLDivElement | null>
}

export default function LightningCanvas({ flashRef }: Props) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const sectionRef   = useRef<HTMLDivElement>(null)
  const isInView     = useInView(sectionRef, { once: false, amount: 0.4 })
  const hasTriggered = useRef(false)
  const shouldReduce = useReducedMotion()

  const jitter = (max: number) => (Math.random() - 0.5) * max

  const drawSegments = useCallback(
    (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, roughness: number, depth: number) => {
      if (depth > 4 || Math.abs(y2 - y1) < 2) { ctx.lineTo(x2, y2); return }
      const mx = (x1 + x2) / 2 + jitter(roughness)
      const my = (y1 + y2) / 2 + jitter(roughness * 0.3)
      drawSegments(ctx, x1, y1, mx, my, roughness / 1.8, depth + 1)
      drawSegments(ctx, mx, my, x2, y2, roughness / 1.8, depth + 1)
    },
    []
  )

  const drawBolt = useCallback(
    (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, alpha: number, lineWidth: number, roughness: number) => {
      ctx.save()
      ctx.globalAlpha  = alpha
      ctx.strokeStyle  = '#c8e0ff'
      ctx.lineWidth    = lineWidth
      ctx.shadowColor  = '#FFFFFF'
      ctx.shadowBlur   = 20
      ctx.lineCap      = 'round'
      ctx.beginPath(); ctx.moveTo(x1, y1)
      drawSegments(ctx, x1, y1, x2, y2, roughness, 0)
      ctx.stroke()
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = lineWidth * 0.35; ctx.shadowBlur = 6
      ctx.beginPath(); ctx.moveTo(x1, y1)
      drawSegments(ctx, x1, y1, x2, y2, roughness, 0)
      ctx.stroke()
      ctx.restore()
    },
    [drawSegments]
  )

  const spawnBranches = useCallback(
    (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, H: number, depth: number) => {
      if (depth >= 2) return
      const n = 1 + Math.floor(Math.random() * 2)
      for (let i = 0; i < n; i++) {
        const t  = 0.3 + Math.random() * 0.5
        const bx = x1 + (x2 - x1) * t + jitter(40)
        const by = y1 + (y2 - y1) * t + jitter(10)
        const ex = bx + jitter(120 / (depth + 1))
        const ey = Math.min(H, by + (y2 - by) * (0.4 + Math.random() * 0.4))
        drawBolt(ctx, bx, by, ex, ey, 0.3 - depth * 0.1, 1.2 - depth * 0.3, 60 - depth * 15)
        spawnBranches(ctx, bx, by, ex, ey, H, depth + 1)
      }
    },
    [drawBolt]
  )

  const strike = useCallback(
    (strikesLeft: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const W = canvas.width, H = canvas.height

      ctx.clearRect(0, 0, W, H)
      const sx = W * (0.25 + Math.random() * 0.5)
      const ex = sx + jitter(80)
      drawBolt(ctx, sx, 0, ex, H * (0.6 + Math.random() * 0.35), 0.85, 2.5, 90)
      spawnBranches(ctx, sx, 0, ex, H * 0.65, H, 0)

      if (flashRef.current) {
        flashRef.current.style.opacity = '0.18'
        setTimeout(() => { if (flashRef.current) flashRef.current.style.opacity = '0' }, 80)
      }

      canvas.style.opacity = '1'
      setTimeout(() => {
        canvas.style.transition = 'opacity 0.18s'
        canvas.style.opacity    = '0'
        setTimeout(() => {
          ctx.clearRect(0, 0, W, H)
          canvas.style.transition = ''
          canvas.style.opacity    = '1'
          if (strikesLeft > 1) {
            setTimeout(() => strike(strikesLeft - 1), 300 + Math.random() * 900)
          }
        }, 180)
      }, 60)
    },
    [drawBolt, spawnBranches, flashRef]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const parent = canvas.parentElement
      if (parent) { canvas.width = parent.offsetWidth; canvas.height = parent.offsetHeight }
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    if (!isInView || shouldReduce) return
    if (hasTriggered.current) return
    hasTriggered.current = true
    setTimeout(() => strike(3 + Math.floor(Math.random() * 3)), 600)
  }, [isInView, strike, shouldReduce])

  // Reset trigger when section leaves view so it fires again on re-entry
  useEffect(() => {
    if (!isInView) hasTriggered.current = false
  }, [isInView])

  return (
    <div ref={sectionRef} className="absolute inset-0 pointer-events-none z-10">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
    </div>
  )
}
