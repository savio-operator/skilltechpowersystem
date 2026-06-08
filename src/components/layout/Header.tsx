'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'
import { SITE } from '@/content/site'
import { SERVICE_LIST } from '@/content/services'

const NAV_LINKS = [
  { href: '/#ch-machine', label: 'Systems'   },
  { href: '/#ch-math',    label: 'Savings'   },
  { href: '/projects',    label: 'Portfolio' },
  { href: '/about',       label: 'About'     },
]

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [svcOpen,    setSvcOpen]    = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waHref = SITE.whatsapp.number
    ? `https://wa.me/${SITE.whatsapp.number}?text=${SITE.whatsapp.message}`
    : `mailto:${SITE.email}`

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy-deep/90 backdrop-blur-md border-b border-white/5 py-3'
          : 'py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <ShieldLogo />
          <span className="font-display font-black text-sm tracking-[0.12em] text-paper">SKILLTECH</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 ml-auto" aria-label="Main navigation">
          {/* Services dropdown */}
          <div className="relative" onMouseEnter={() => setSvcOpen(true)} onMouseLeave={() => setSvcOpen(false)}>
            <button className="text-sm text-warm-grey hover:text-paper transition-colors duration-200 flex items-center gap-1">
              Services
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={cn('transition-transform', svcOpen && 'rotate-180')}>
                <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </button>
            <AnimatePresence>
              {svcOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-navy-deep/95 backdrop-blur-md border border-white/8 rounded-xl p-2 shadow-2xl"
                >
                  {SERVICE_LIST.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/${s.slug}`}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-warm-grey hover:text-paper hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <span className="text-amber text-xs">—</span>
                      {s.shortName}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-warm-grey hover:text-paper transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={waHref}
          target="_blank" rel="noopener noreferrer"
          data-event="whatsapp-click"
          className="hidden md:flex items-center gap-2 ml-4 px-4 py-2 bg-[#25D366] text-white text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto p-3 min-h-[44px] min-w-[44px] flex flex-col items-center justify-center text-warm-grey"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={cn('block w-5 h-px bg-current transition-all', mobileOpen ? 'rotate-45 translate-y-px' : '-translate-y-1')} />
          <span className={cn('block w-5 h-px bg-current transition-all', mobileOpen ? 'opacity-0' : 'opacity-100')} />
          <span className={cn('block w-5 h-px bg-current transition-all', mobileOpen ? '-rotate-45 -translate-y-px' : 'translate-y-1')} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-deep/95 backdrop-blur-md border-t border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col px-5 py-4 gap-1">
              <p className="font-mono text-[0.6rem] tracking-widest text-warm-grey/50 uppercase px-3 pt-2 pb-1">Services</p>
              {SERVICE_LIST.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="px-3 py-3 text-sm text-warm-grey hover:text-paper transition-colors rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.shortName}
                </Link>
              ))}
              <div className="my-2 border-t border-white/5" />
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-3 text-base text-warm-grey hover:text-paper transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={waHref}
                target="_blank" rel="noopener noreferrer"
                data-event="whatsapp-click"
                className="flex items-center gap-2 mt-3 px-4 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-md w-full justify-center"
              >
                <WhatsAppIcon />
                Get a Quote on WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function ShieldLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 2L4 8v10c0 8.5 6 16.5 14 19 8-2.5 14-10.5 14-19V8L18 2z" fill="#1A1105" stroke="#FBB034" strokeWidth="1.5"/>
      <circle cx="18" cy="17" r="8" stroke="#D4920A" strokeWidth="1" fill="none"/>
      <line x1="10" y1="17" x2="26" y2="17" stroke="#D4920A" strokeWidth="0.8" opacity="0.6"/>
      <line x1="18" y1="9"  x2="18" y2="25" stroke="#D4920A" strokeWidth="0.8" opacity="0.6"/>
      <ellipse cx="18" cy="17" rx="4" ry="8" stroke="#D4920A" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M16 6l-1.5 5.5h3L15.5 18l4.5-1-2 8" stroke="#FBB034" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
