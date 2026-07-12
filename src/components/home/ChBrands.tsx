'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { BRAND_LIST, BRANDS_SECTION } from '@/content/brands'

// CH.05b / THE SOURCES — sits right after the Storm chapter: having shown the
// threat, show the pedigree of what we install against it. Cards expand to the
// full product story so the section stays scannable at a glance.
export default function ChBrands() {
  const ref          = useRef<HTMLElement>(null)
  const isInView     = useInView(ref, { once: true, amount: 0.1 })
  const shouldReduce = useReducedMotion()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section ref={ref} id="ch-brands" className="relative z-10 bg-navy-deep py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="chapter-eyebrow">{BRANDS_SECTION.eyebrow}</p>
        <h2
          className="mb-4 max-w-2xl font-display font-black text-balance text-paper"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
        >
          {BRANDS_SECTION.headline}
        </h2>
        <p className="mb-12 max-w-2xl leading-relaxed text-warm-grey">
          {BRANDS_SECTION.intro}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BRAND_LIST.map((b, i) => {
            const isOpen = open === b.slug
            return (
              <motion.div
                key={b.slug}
                initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className={isOpen ? 'sm:col-span-2 lg:col-span-3' : ''}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : b.slug)}
                  aria-expanded={isOpen}
                  className="group flex h-full w-full flex-col rounded-2xl border border-black/15 bg-black/[0.04] p-6 text-left transition hover:border-black/40 hover:bg-black/[0.07]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-warm-grey">
                      {b.origin}
                    </span>
                    <span className="shrink-0 rounded-full border border-black/20 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-paper">
                      {b.category}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold leading-tight text-paper">
                    {b.shortName}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-warm-grey">
                    {b.blurb}
                  </p>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={shouldReduce ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={shouldReduce ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mb-4 h-[1px] bg-gradient-to-r from-black/25 via-black/10 to-transparent" />

                        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-paper">
                          {b.whyItMatters}
                        </p>

                        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                          {b.products.map((p) => (
                            <div
                              key={p.name}
                              className="rounded-xl border border-black/10 bg-black/[0.03] p-4"
                            >
                              <p className="mb-1 text-sm font-semibold text-paper">{p.name}</p>
                              <p className="text-xs leading-relaxed text-warm-grey">{p.description}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {b.certifications.map((c) => (
                            <span
                              key={c}
                              className="rounded-full border border-black/15 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-warm-grey"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-paper transition group-hover:gap-2.5">
                    {isOpen ? 'Show less' : 'What we source'} <span aria-hidden="true">{isOpen ? '↑' : '→'}</span>
                  </span>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
