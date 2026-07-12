'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS } from '@/content/projects'
import Image from 'next/image'
import { mobileResponsiveSrc } from '@/lib/responsiveImages'

export default function PortfolioTrack() {
  const trackRef  = useRef<HTMLDivElement>(null)
  const [isDrag,  setIsDrag]  = useState(false)
  const startX    = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDrag(true)
    startX.current    = e.pageX - (trackRef.current?.offsetLeft ?? 0)
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0
  }
  const onMouseUp   = () => setIsDrag(false)
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDrag || !trackRef.current) return
    e.preventDefault()
    const x    = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.6
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current     = e.touches[0].pageX
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return
    const dx = startX.current - e.touches[0].pageX
    trackRef.current.scrollLeft = scrollLeft.current + dx
  }

  const typeLabel: Record<string, string> = {
    'grid-tie':   'Grid-tie',
    'hybrid':     'Hybrid',
    'off-grid':   'Off-grid',
    'commercial': 'Commercial',
  }

  return (
    <div
      ref={trackRef}
      className={`flex gap-4 overflow-x-auto pb-4 scrollbar-hide select-none ${isDrag ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {PROJECTS.map((project) => {
        const mobileImage = mobileResponsiveSrc(project.image)
        return (
        <motion.div
          key={project.id}
          className="shrink-0 w-[260px] md:w-[300px] rounded-xl overflow-hidden border border-white/6 bg-white/[0.03]"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          draggable={false}
        >
          {/* Image or gradient placeholder */}
          <div
            className="relative h-48 overflow-hidden"
            style={{
              background: `linear-gradient(145deg, hsl(${project.hue}, 30%, 12%), hsl(${project.hue}, 50%, 8%))`,
            }}
          >
            {/* Grid overlay for placeholder */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg,rgba(74,144,217,0.07) 0,rgba(74,144,217,0.07) 1px,transparent 1px,transparent 20px),repeating-linear-gradient(90deg,rgba(74,144,217,0.07) 0,rgba(74,144,217,0.07) 1px,transparent 1px,transparent 20px)',
              }}
            />
            {/* Real image (shown if file exists — next/image falls back to alt gracefully) */}
            <picture>
              {mobileImage && <source media="(max-width: 767px)" srcSet={mobileImage} />}
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                className="object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            </picture>
          </div>

          <div className="p-4 flex flex-col gap-1">
            <span className="font-mono text-[0.68rem] tracking-wider text-amber">
              {project.capacity} · {typeLabel[project.type]}
            </span>
            <span className="text-sm font-semibold text-paper">{project.location}</span>
            <span className="font-mono text-[0.68rem] text-warm-grey">{project.year}</span>
          </div>
        </motion.div>
        )
      })}
    </div>
  )
}
