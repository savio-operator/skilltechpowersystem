'use client'
import { useState } from 'react'
import Link from 'next/link'
import { SITE } from '@/content/site'
import { AREAS } from '@/content/areas'
import { SERVICE_LIST } from '@/content/services'

const INITIAL = { name: '', phone: '', area: '', service: '', message: '', _hp: '' }

export default function ContactPage() {
  const [form,   setForm]   = useState(INITIAL)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const set = (k: keyof typeof INITIAL) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form._hp) return  // honeypot — silently discard bots
    if (!form.name.trim() || !form.phone.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) {
        // fire analytics event
        if (typeof window !== 'undefined' && (window as any).va) {
          ;(window as any).va('event', { name: 'form-submit' })
        }
      }
    } catch {
      setStatus('error')
    }
  }

  const waHref = SITE.whatsapp.number
    ? `https://wa.me/${SITE.whatsapp.number}?text=Hi%20Skilltech%2C%20I%27d%20like%20a%20free%20solar%20assessment.`
    : '#'

  return (
    <main className="min-h-screen bg-navy-deep pt-24">
      <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
        <Link href="/" className="font-mono text-xs text-warm-grey hover:text-amber transition-colors mb-8 block">← Home</Link>
        <h1 className="font-display font-black text-paper mb-2 leading-none" style={{ fontSize: 'clamp(2.5rem,7vw,4rem)' }}>
          Get in Touch
        </h1>
        <p className="text-warm-grey mb-10">Free survey · no obligation · we respond same day.</p>

        {status === 'sent' ? (
          <div className="rounded-xl border border-amber/30 bg-amber/[0.08] p-8 text-center">
            <p className="text-amber font-bold text-lg mb-2">Message sent!</p>
            <p className="text-warm-grey text-sm mb-6">We&apos;ll get back to you within a few hours.</p>
            {SITE.whatsapp.number && (
              <a href={waHref} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold rounded-lg px-5 py-2.5 text-sm hover:opacity-90 transition-opacity">
                <WAIcon /> Or WhatsApp us for a faster reply
              </a>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="_hp"
              value={form._hp}
              onChange={set('_hp')}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div>
              <label htmlFor="name" className="block font-mono text-[0.68rem] tracking-wider text-warm-grey uppercase mb-1.5">Your name *</label>
              <input
                id="name" type="text" placeholder="Rajan Varghese" required
                className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-paper placeholder-warm-grey/40 focus:outline-none focus:border-amber/40 transition-colors"
                value={form.name} onChange={set('name')}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block font-mono text-[0.68rem] tracking-wider text-warm-grey uppercase mb-1.5">Phone number *</label>
              <input
                id="phone" type="tel" placeholder="+91 98XXX XXXXX" required
                className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-paper placeholder-warm-grey/40 focus:outline-none focus:border-amber/40 transition-colors"
                value={form.phone} onChange={set('phone')}
              />
            </div>

            <div>
              <label htmlFor="service" className="block font-mono text-[0.68rem] tracking-wider text-warm-grey uppercase mb-1.5">Service interested in *</label>
              <select
                id="service" required
                className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-paper focus:outline-none focus:border-amber/40 transition-colors"
                value={form.service} onChange={set('service')}
              >
                <option value="">Select service</option>
                {SERVICE_LIST.map((s) => (
                  <option key={s.slug} value={s.shortName}>{s.name}</option>
                ))}
                <option value="Not sure">Not sure — need advice</option>
              </select>
            </div>

            <div>
              <label htmlFor="area" className="block font-mono text-[0.68rem] tracking-wider text-warm-grey uppercase mb-1.5">Your area *</label>
              <select
                id="area" required
                className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-paper focus:outline-none focus:border-amber/40 transition-colors"
                value={form.area} onChange={set('area')}
              >
                <option value="">Select area</option>
                {AREAS.map((a) => <option key={a.slug} value={`${a.name}, ${a.district}`}>{a.name} — {a.district}</option>)}
                <option value="Other">Other location</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-[0.68rem] tracking-wider text-warm-grey uppercase mb-1.5">Message (optional)</label>
              <textarea
                id="message" rows={4} placeholder="Roof type, current bill, any questions..."
                className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-paper placeholder-warm-grey/40 focus:outline-none focus:border-amber/40 transition-colors resize-none"
                value={form.message} onChange={set('message')}
              />
            </div>

            <button
              type="submit" disabled={status === 'sending'}
              className="w-full bg-amber text-navy-deep font-bold rounded-lg py-3.5 hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </button>

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong.{' '}
                {SITE.whatsapp.number && (
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="underline">Try WhatsApp instead.</a>
                )}
              </p>
            )}
          </form>
        )}

        {/* Direct contact options */}
        <div className="mt-10 border-t border-white/6 pt-8 space-y-4">
          {SITE.whatsapp.number && (
            <a
              href={waHref}
              target="_blank" rel="noopener noreferrer"
              data-event="whatsapp-click"
              className="flex items-center gap-3 p-4 rounded-lg border border-white/6 hover:border-[#25D366]/30 transition-colors"
            >
              <span className="text-[#25D366]"><WAIcon /></span>
              <div>
                <p className="text-sm font-semibold text-paper">WhatsApp</p>
                <p className="text-xs text-warm-grey">Fastest response — usually within the hour</p>
              </div>
            </a>
          )}
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-3 p-4 rounded-lg border border-white/6 hover:border-amber/20 transition-colors"
          >
            <span className="text-amber text-lg">✉</span>
            <div>
              <p className="text-sm font-semibold text-paper">{SITE.email}</p>
              <p className="text-xs text-warm-grey">We reply within a few hours on working days</p>
            </div>
          </a>
          {SITE.phone && (
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-3 p-4 rounded-lg border border-white/6 hover:border-amber/20 transition-colors"
            >
              <span className="text-amber text-lg">☎</span>
              <div>
                <p className="text-sm font-semibold text-paper">{SITE.phone}</p>
                <p className="text-xs text-warm-grey">{SITE.hours}</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </main>
  )
}

function WAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
