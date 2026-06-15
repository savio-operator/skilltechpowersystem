'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FAQS } from '@/content/faq'

// Decorative golden-ratio spiral, recoloured for the light navy/gold theme.
// (Adapted from the supplied snippet — dev controls / randomiser removed.)
const SPIRAL = {
  points:     520,
  dotRadius:  1.6,
  duration:   3.2,
  color:      '#FFFFFF',  // gold dots on dark
  opacityMin: 0.18,
  opacityMax: 0.55,
  sizeMin:    0.6,
  sizeMax:    1.4,
}

export default function ChFAQ() {
  const spiralRef    = useRef<HTMLDivElement | null>(null)
  const shouldReduce = useReducedMotion()
  const [query, setQuery] = useState('')

  // Build the spiral SVG and mount it
  useEffect(() => {
    if (!spiralRef.current) return

    const SIZE         = 560
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
    const N            = SPIRAL.points
    const DOT          = SPIRAL.dotRadius
    const CENTER       = SIZE / 2
    const MAX_R        = CENTER - 4 - DOT

    const svgNS = 'http://www.w3.org/2000/svg'
    const svg   = document.createElementNS(svgNS, 'svg')
    svg.setAttribute('width', String(SIZE))
    svg.setAttribute('height', String(SIZE))
    svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`)

    for (let i = 0; i < N; i++) {
      const idx   = i + 0.5
      const frac  = idx / N
      const r     = Math.sqrt(frac) * MAX_R
      const theta = idx * GOLDEN_ANGLE
      const x     = CENTER + r * Math.cos(theta)
      const y     = CENTER + r * Math.sin(theta)

      const c = document.createElementNS(svgNS, 'circle')
      c.setAttribute('cx', x.toFixed(3))
      c.setAttribute('cy', y.toFixed(3))
      c.setAttribute('r', String(DOT))
      c.setAttribute('fill', SPIRAL.color)
      c.setAttribute('opacity', '0.5')

      if (!shouldReduce) {
        const animR = document.createElementNS(svgNS, 'animate')
        animR.setAttribute('attributeName', 'r')
        animR.setAttribute('values', `${DOT * SPIRAL.sizeMin};${DOT * SPIRAL.sizeMax};${DOT * SPIRAL.sizeMin}`)
        animR.setAttribute('dur', `${SPIRAL.duration}s`)
        animR.setAttribute('begin', `${(frac * SPIRAL.duration).toFixed(3)}s`)
        animR.setAttribute('repeatCount', 'indefinite')
        animR.setAttribute('calcMode', 'spline')
        animR.setAttribute('keySplines', '0.4 0 0.6 1;0.4 0 0.6 1')
        c.appendChild(animR)

        const animO = document.createElementNS(svgNS, 'animate')
        animO.setAttribute('attributeName', 'opacity')
        animO.setAttribute('values', `${SPIRAL.opacityMin};${SPIRAL.opacityMax};${SPIRAL.opacityMin}`)
        animO.setAttribute('dur', `${SPIRAL.duration}s`)
        animO.setAttribute('begin', `${(frac * SPIRAL.duration).toFixed(3)}s`)
        animO.setAttribute('repeatCount', 'indefinite')
        animO.setAttribute('calcMode', 'spline')
        animO.setAttribute('keySplines', '0.4 0 0.6 1;0.4 0 0.6 1')
        c.appendChild(animO)
      }

      svg.appendChild(c)
    }

    spiralRef.current.innerHTML = ''
    spiralRef.current.appendChild(svg)
  }, [shouldReduce])

  const filtered = query
    ? FAQS.filter(({ q, a }) => (q + a).toLowerCase().includes(query.toLowerCase()))
    : FAQS

  return (
    <section id="ch-faq" className="relative z-10 overflow-hidden section-invert py-20 md:py-28">
      {/* Background spiral */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,1),rgba(0,0,0,0.15)_55%,transparent_75%)]"
        aria-hidden="true"
      >
        <div ref={spiralRef} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-6 border-b border-white/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="chapter-eyebrow">CH.07 / THE QUESTIONS</p>
            <h2
              className="font-display font-black leading-none text-paper"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              You asked.
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-warm-grey">
              Straight answers on cost, subsidy, KSEB net-metering and what to expect.
            </p>
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            aria-label="Search FAQs"
            className="h-11 w-full rounded-xl border border-white/20 bg-white/5 px-4 text-sm text-paper outline-none transition placeholder:text-warm-grey focus:border-[#FFFFFF] sm:w-64"
          />
        </header>

        {/* FAQ grid */}
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-warm-grey">
            No questions match “{query}”. Try a different word — or just message us on WhatsApp.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filtered.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="group relative self-start overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#FFFFFF]/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-amber">{String(index).padStart(2, '0')}</span>
          <h3 className="font-display text-base font-semibold leading-tight text-paper md:text-lg">{q}</h3>
        </div>
        <span className="ml-4 shrink-0 text-lg text-warm-grey transition group-hover:text-[#FFFFFF]">
          {open ? '–' : '+'}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm leading-relaxed text-warm-grey">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
