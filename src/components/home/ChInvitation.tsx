'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/content/site'
import { HOME } from '@/content/home'
import { SERVICE_LIST } from '@/content/services'

const SERVICE_LABELS = SERVICE_LIST.map((s) => s.shortName)

export default function ChInvitation() {
  const ref          = useRef<HTMLElement>(null)
  const isInView     = useInView(ref, { once: true, amount: 0.2 })
  const shouldReduce = useReducedMotion()
  const waHref = `https://wa.me/${SITE.whatsapp.number}?text=${SITE.whatsapp.message}`

  const fadeUp = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial:    { opacity: 0, y: 24 },
          animate:    isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
        }

  return (
    <footer id="ch-invitation" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dusk bg */}
      <div className="absolute inset-0 bg-cinematic-dusk">
        <Image
          src={HOME.footer.image}
          alt={HOME.footer.imageAlt}
          fill
          className="object-cover opacity-35"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-10 pt-24 pb-[max(6rem,calc(env(safe-area-inset-bottom,0px)+6rem))] flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <motion.div className="flex items-center" {...fadeUp(0)}>
          <Image
            src="/images/cinematic/logo.png"
            alt="Skilltech Power System"
            width={170}
            height={111}
            className="h-14 w-auto"
          />
        </motion.div>

        {/* Promise */}
        <motion.p
          className="font-display font-black text-paper text-balance leading-none"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)' }}
          {...fadeUp(0.08)}
        >
          {HOME.footer.promise}
        </motion.p>

        {/* WhatsApp CTA */}
        <motion.a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-bold rounded-lg shadow-[0_4px_24px_rgba(37,211,102,0.25)] px-8 py-4 text-base hover:shadow-[0_8px_36px_rgba(37,211,102,0.35)] transition-shadow"
          whileHover={shouldReduce ? {} : { scale: 1.04, y: -2 }}
          whileTap={shouldReduce ? {} : { scale: 0.97 }}
          {...fadeUp(0.14)}
        >
          <WhatsAppIcon />
          Start on WhatsApp
        </motion.a>

        {/* Meta grid */}
        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 text-left border-t border-white/6 pt-10 mt-2"
          {...fadeUp(0.2)}
        >
          {/* Contact */}
          <div className="flex flex-col gap-3">
            {[
              { label: 'Email', val: SITE.email,             href: `mailto:${SITE.email}` },
              { label: 'Phone', val: SITE.phone || '—',     href: SITE.phone ? `tel:${(SITE.phone as string).replace(/\s/g, '')}` : undefined },
              { label: 'Area',  val: SITE.address.display,  href: undefined },
              { label: 'Hours', val: SITE.hours,            href: undefined },
            ].map(({ label, val, href }) => (
              <div key={label} className="flex gap-4 items-baseline">
                <span className="font-mono text-[0.62rem] tracking-[0.12em] text-warm-grey min-w-[48px]">{label}</span>
                {href
                  ? <a href={href} className="text-sm text-paper hover:text-amber transition-colors">{val}</a>
                  : <span className="text-sm text-paper">{val}</span>
                }
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <span className="block font-mono text-[0.62rem] tracking-[0.12em] text-warm-grey mb-3">Services</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {SERVICE_LABELS.map((name) => (
                <span key={name} className="text-sm text-warm-grey">{name}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Fine print */}
        <div className="flex flex-wrap gap-4 justify-center border-t border-white/4 pt-6 w-full">
          <span className="font-mono text-[0.6rem] text-warm-grey/50">
            © {new Date().getFullYear()} Skilltech Power System · Ernakulam, Kerala
          </span>
          <span className="font-mono text-[0.6rem] text-warm-grey/50">
            {SITE.certifications.join(' · ')}
          </span>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
