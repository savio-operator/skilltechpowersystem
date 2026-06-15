'use client'
import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  // Hold ScrollTrigger so route changes can refresh pinned-section measurements.
  const stRef = useRef<{ refresh: () => void } | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Next App Router can otherwise restore the previous scroll position, which
    // fights Lenis and lands you mid-page; we manage scroll ourselves below.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Dynamically import GSAP so it never runs server-side
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      stRef.current = ScrollTrigger

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis

      // Keep Lenis + GSAP ScrollTrigger in sync
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    })

    return () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  // On every client-side navigation, jump to the top and recalc pinned triggers
  // for the new page. Without this the new page inherits Lenis' old scroll value
  // and can render scrolled past its reveal animations (looking blank).
  useEffect(() => {
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    const id = setTimeout(() => stRef.current?.refresh(), 100)
    return () => clearTimeout(id)
  }, [pathname])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}

export const useLenis = () => useContext(LenisContext)
