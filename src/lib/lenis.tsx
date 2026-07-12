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
  // Per-route scroll positions so Back/Forward can restore instead of resetting.
  const positions = useRef<Map<string, number>>(new Map())
  const navType = useRef<'push' | 'pop'>('push')

  useEffect(() => {
    // Next App Router can otherwise restore the previous scroll position, which
    // fights Lenis and lands you mid-page; we manage scroll ourselves below.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    // Mark Back/Forward navigations so we restore their scroll rather than reset.
    const onPop = () => { navType.current = 'pop' }
    window.addEventListener('popstate', onPop)

    // Dynamically import GSAP so it never runs server-side
    let cancelled = false
    let removeTicker: (() => void) | null = null
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
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
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      removeTicker = () => gsap.ticker.remove(tick)
    })

    return () => {
      cancelled = true
      window.removeEventListener('popstate', onPop)
      removeTicker?.()
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  // On client-side navigation: forward (push) jumps to the top so the new page
  // starts at its first reveal; Back/Forward (pop) restores the saved position
  // so it doesn't feel like a full refresh. ScrollTrigger is recalced after.
  useEffect(() => {
    const targetY = navType.current === 'pop' ? positions.current.get(pathname) ?? 0 : 0
    navType.current = 'push'

    const apply = () => {
      const lenis = lenisRef.current
      if (lenis) lenis.scrollTo(targetY, { immediate: true, force: true })
      else window.scrollTo(0, targetY)
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    if (targetY === 0) {
      apply()
      timers.push(setTimeout(() => { stRef.current?.refresh(); apply() }, 100))
    } else {
      // Back/Forward restore: the heavy GSAP-pinned page establishes its full
      // scroll height over a few frames, so retry until we actually land on the
      // saved position (or give up after ~700ms).
      let tries = 0
      const restore = () => {
        stRef.current?.refresh()
        apply()
        tries += 1
        if (Math.abs(window.scrollY - targetY) > 4 && tries < 9) {
          timers.push(setTimeout(restore, 80))
        }
      }
      timers.push(setTimeout(restore, 50))
    }

    return () => {
      timers.forEach(clearTimeout)
      // Save the scroll position of the page we're leaving.
      positions.current.set(pathname, window.scrollY)
    }
  }, [pathname])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}

export const useLenis = () => useContext(LenisContext)
