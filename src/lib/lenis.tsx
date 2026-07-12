'use client'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const LenisContext = createContext<Lenis | null>(null)

const storageKey = (path: string) => `scroll:${path}`

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  // State (not just the ref) so consumers of useLenis() get the live instance —
  // a ref in the provider `value` is evaluated once at render and stays null.
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const pathname = usePathname()
  // Per-route scroll positions so Back/Forward can restore instead of resetting.
  // Saved EAGERLY on every scroll (keyed by the path being scrolled), because by
  // the time a route-change effect/cleanup runs, the scroll is already reset.
  const positions = useRef<Map<string, number>>(new Map())
  const currentPath = useRef(pathname)
  const navType = useRef<'push' | 'pop'>('push')
  // While a pop-restore is in flight, suppress saving so the restore's own
  // intermediate scrolls don't overwrite the position we're restoring to.
  const restoring = useRef(false)

  useEffect(() => {
    // Next App Router can otherwise restore the previous scroll position, which
    // fires before the pinned triggers rebuild and fights Lenis; we manage
    // scroll ourselves below.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    // Mark Back/Forward navigations so we restore their scroll rather than reset.
    const onPop = () => { navType.current = 'pop' }
    window.addEventListener('popstate', onPop)

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = instance
    setLenis(instance)

    // Keep ScrollTrigger in sync and record the live position for the CURRENT
    // path (memory + sessionStorage, so it survives a reload of the other page).
    let lastSaved = -1
    const onScroll = () => {
      ScrollTrigger.update()
      if (restoring.current) return
      const y = window.scrollY
      positions.current.set(currentPath.current, y)
      if (Math.abs(y - lastSaved) > 4) {
        lastSaved = y
        try { sessionStorage.setItem(storageKey(currentPath.current), String(y)) } catch {}
      }
    }
    instance.on('scroll', onScroll)

    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    // Clamp (rather than disable) lag smoothing: with it fully off, any long
    // frame makes the eased scroll + scrubbed pins snap forward by the whole
    // stalled delta — reads as "stuck, then jumped". Full disable is only
    // needed for scrollerProxy setups; here Lenis owns the scroll.
    gsap.ticker.lagSmoothing(1000, 16)

    return () => {
      window.removeEventListener('popstate', onPop)
      gsap.ticker.remove(tick)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  // On client-side navigation: forward (push) jumps to the top so the new page
  // starts at its first reveal; Back/Forward (pop) restores the saved position.
  useEffect(() => {
    const saved =
      positions.current.get(pathname) ??
      Number(sessionStorage.getItem(storageKey(pathname)) ?? 0)
    const targetY = navType.current === 'pop' ? (Number.isFinite(saved) ? saved : 0) : 0
    navType.current = 'push'
    currentPath.current = pathname

    const jumpTo = (y: number) => {
      const l = lenisRef.current
      if (l) l.scrollTo(y, { immediate: true, force: true })
      else window.scrollTo(0, y)
    }

    if (targetY === 0) {
      jumpTo(0)
      // One deferred refresh once the new page has painted, so trigger
      // positions match the real layout.
      const t = setTimeout(() => { ScrollTrigger.refresh(); jumpTo(0) }, 100)
      return () => {
        clearTimeout(t)
        restoring.current = false
      }
    }

    // Back/Forward restore. The pinned home page grows its scroll height over
    // several frames (dynamic 3D imports, images), so: pause Lenis, re-apply
    // the target whenever the document height actually changes (refresh only
    // then — each refresh is a full re-measure of both pins and is exactly
    // what used to thrash layout 9× in a row), and stop as soon as the user
    // scrolls themselves or a hard timeout passes.
    restoring.current = true
    lenisRef.current?.stop()

    let lastHeight = 0
    let raf = 0
    let done = false
    const finish = () => {
      if (done) return
      done = true
      ro.disconnect()
      clearTimeout(hardStop)
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', onUserInput)
      window.removeEventListener('touchstart', onUserInput)
      lenisRef.current?.start()
      restoring.current = false
    }
    const onUserInput = () => finish()

    const settle = () => {
      const height = document.documentElement.scrollHeight
      if (height !== lastHeight) {
        lastHeight = height
        ScrollTrigger.refresh()
      }
      jumpTo(targetY)
      // Height stable and we're on target (or as far as the page can scroll).
      const maxY = height - window.innerHeight
      if (Math.abs(window.scrollY - Math.min(targetY, maxY)) <= 4 && height === document.documentElement.scrollHeight) {
        finish()
      }
    }

    // rAF-debounced ResizeObserver: fires on late content (3D canvas, images)
    // without polling on a timer.
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(settle)
    })
    ro.observe(document.body)
    raf = requestAnimationFrame(settle)

    const hardStop = setTimeout(finish, 1500)
    window.addEventListener('wheel', onUserInput, { passive: true, once: true })
    window.addEventListener('touchstart', onUserInput, { passive: true, once: true })

    return finish
  }, [pathname])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}

export const useLenis = () => useContext(LenisContext)
