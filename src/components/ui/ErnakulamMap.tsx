'use client'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { AREAS } from '@/content/areas'

const DOTS = AREAS.filter((a) => a.mapDot).map((a) => ({
  key:  a.slug,
  name: a.name,
  cx:   a.mapDot!.cx,
  cy:   a.mapDot!.cy,
}))

// Extra installation dots (not main town centres — pad the map)
const EXTRA_DOTS = [
  { key: 'x1', name: '', cx: 178, cy: 258 },
  { key: 'x2', name: '', cx: 248, cy: 302 },
  { key: 'x3', name: '', cx: 148, cy: 312 },
  { key: 'x4', name: '', cx: 132, cy: 352 },
  { key: 'x5', name: '', cx: 268, cy: 152 },
]

const ALL_DOTS = [...DOTS, ...EXTRA_DOTS]

export default function ErnakulamMap() {
  const ref         = useRef<SVGSVGElement>(null)
  const isInView    = useInView(ref, { once: true, amount: 0.3 })
  const shouldReduce = useReducedMotion()
  const [litCount,  setLitCount]  = useState(0)
  const timerFired  = useRef(false)

  if (isInView && !timerFired.current) {
    timerFired.current = true
    const delay = shouldReduce ? 0 : 1
    if (typeof window !== 'undefined') {
      ALL_DOTS.forEach((_, i) => {
        setTimeout(() => setLitCount((n) => n + 1), delay + i * (shouldReduce ? 0 : 110))
      })
    }
  }

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 500"
      fill="none"
      className="w-full h-auto max-w-xs"
      aria-label="Map of Ernakulam showing solar installation locations"
    >
      {/* District fill */}
      <path
        d="M120,40 L180,20 L240,30 L300,50 L350,80 L370,130 L380,180 L360,240 L340,300 L300,360 L260,420 L220,460 L180,480 L140,460 L110,420 L90,370 L80,310 L85,250 L90,190 L95,140 L105,90 Z"
        fill="rgba(44,74,124,0.1)"
        stroke="#2C4A7C"
        strokeWidth="1.5"
      />
      {/* Water body */}
      <path d="M90,205 L80,245 L76,272 L82,292 L92,282 L98,252 L100,220 Z" fill="rgba(10,25,50,0.5)" />
      {/* Division lines */}
      {[
        'M200,25 L185,470',
        'M100,205 L368,235',
        'M135,325 L345,302',
      ].map((d, i) => (
        <path key={i} d={d} stroke="rgba(44,74,124,0.2)" strokeWidth="0.5" strokeDasharray="3 4" />
      ))}

      {/* Town dots */}
      {ALL_DOTS.map((dot, i) => (
        <g key={dot.key}>
          {/* Glow ring */}
          <circle
            cx={dot.cx} cy={dot.cy} r={i < DOTS.length ? 10 : 8}
            fill="rgba(245,166,35,0)"
            style={{
              fill: litCount > i ? 'rgba(245,166,35,0.12)' : 'transparent',
              transition: 'fill 0.4s',
            }}
          />
          <circle
            cx={dot.cx} cy={dot.cy}
            r={i < DOTS.length ? 5 : 3}
            style={{
              fill:         litCount > i ? '#F5A623' : 'rgba(44,74,124,0.4)',
              stroke:       litCount > i ? 'rgba(245,166,35,0.5)' : 'rgba(74,144,217,0.3)',
              strokeWidth:  1,
              filter:       litCount > i ? 'drop-shadow(0 0 5px rgba(245,166,35,0.6))' : 'none',
              transition:   'fill 0.4s, filter 0.4s',
            }}
          />
          {dot.name && (
            <text
              x={dot.cx + 8} y={dot.cy + 3}
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="7"
              style={{
                fill:       litCount > i ? 'rgba(138,147,163,0.8)' : 'transparent',
                transition: 'fill 0.4s',
              }}
            >
              {dot.name}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}
