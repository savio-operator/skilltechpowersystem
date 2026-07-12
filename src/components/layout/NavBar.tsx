"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

// Sections with a dark #1A1828 background — the nav switches to light ink while
// it sits over one of these so its labels/icons stay visible.
const DARK_SECTIONS = new Set(['ch-promise', 'ch-machine', 'ch-services', 'ch-math', 'ch-proof', 'ch-invitation'])

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [activeUrl, setActiveUrl] = useState(items[0].url)
  const [onDark, setOnDark] = useState(false)

  useEffect(() => {
    // On a sub-page, highlight the nav item whose route matches. (Skip this on
    // the home page, where "/" would match Home and short-circuit scroll-spy.)
    if (pathname !== "/") {
      const pageMatch = items.find((it) => it.url === pathname)
      if (pageMatch) setActiveUrl(pageMatch.url)
      setOnDark(false)
      return
    }

    // On the home page, scroll-spy across the in-page section anchors so the
    // active item follows your scroll position.
    const anchored = items
      .filter((it) => it.url.startsWith("/#"))
      .map((it) => ({ url: it.url, id: it.url.slice(2) }))

    // rAF-throttled so the per-section measurements run at most once per frame.
    let ticking = false
    let raf = 0
    const compute = () => {
      ticking = false
      const marker = window.scrollY + window.innerHeight * 0.35
      let current = items[0].url // default: Home (top of page)
      for (const { url, id } of anchored) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= marker) current = url
      }
      setActiveUrl(current)

      // Adaptive ink: probe the section sitting where the nav bar renders
      // (top on desktop, bottom on mobile) and flip to light ink over dark ones.
      const probeY = window.matchMedia("(min-width: 640px)").matches ? 48 : window.innerHeight - 48
      let dark = false
      DARK_SECTIONS.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.top <= probeY && r.bottom >= probeY) dark = true
      })
      setOnDark(dark)
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pathname, items])

  return (
    <div
      className={cn(
        // `sm:bottom-auto` is critical: without it, bottom-0 + sm:top-0 both
        // apply on desktop and stretch this fixed wrapper to full viewport
        // height — an invisible z-50 column that swallowed clicks down the
        // centre of the page (calculator slider, footer CTA, middle cards).
        "fixed bottom-0 sm:top-0 sm:bottom-auto left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-0.5 sm:gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeUrl === item.url

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveUrl(item.url)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-3 py-2 sm:px-6 rounded-full transition-colors",
                // Adaptive ink: navy over light sections, light over dark ones
                onDark ? "text-white/75 hover:text-white" : "text-[#1A1828]/70 hover:text-[#1A1828]",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
