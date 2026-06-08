'use client'
import { useState } from 'react'
import Link from 'next/link'
import { SITE } from '@/content/site'
import { AREAS } from '@/content/areas'

export default function ContactPage() {
  const [form,    setForm]    = useState({ name: '', phone: '', area: '', message: '' })
  const [status,  setStatus]  = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-navy-deep pt-24">
      <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
        <Link href="/" className="font-mono text-xs text-warm-grey hover:text-amber transition-colors mb-8 block">← Home</Link>
        <h1 className="font-display font-black text-paper mb-2 leading-none" style={{ fontSize: 'clamp(2.5rem,7vw,4rem)' }}>
          Get in Touch
        </h1>
        <p className="text-warm-grey mb-10">Free survey · no obligation · we respond same day.</p>

        {status === 'sent' ? (
          <div className="rounded-xl border border-amber/30 bg-amber/8 p-8 text-center">
            <p className="text-amber font-bold text-lg mb-2">Message sent!</p>
            <p className="text-warm-grey text-sm">We&apos;ll get back to you within a few hours. Or WhatsApp us for a faster response.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: 'name',  label: 'Your name',    type: 'text',  placeholder: 'Rajan Varghese' },
              { id: 'phone', label: 'Phone number', type: 'tel',   placeholder: '+91 98950 XXXXX' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block font-mono text-[0.68rem] tracking-wider text-warm-grey uppercase mb-1.5">{label}</label>
                <input
                  id={id} type={type} placeholder={placeholder} required
                  className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-paper placeholder-warm-grey/40 focus:outline-none focus:border-amber/40 transition-colors"
                  value={(form as Record<string, string>)[id]}
                  onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                />
              </div>
            ))}

            <div>
              <label htmlFor="area" className="block font-mono text-[0.68rem] tracking-wider text-warm-grey uppercase mb-1.5">Your area</label>
              <select
                id="area" required
                className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-paper focus:outline-none focus:border-amber/40 transition-colors"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
              >
                <option value="">Select area</option>
                {AREAS.map((a) => <option key={a.slug} value={a.name}>{a.name}, {a.district}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-[0.68rem] tracking-wider text-warm-grey uppercase mb-1.5">Message (optional)</label>
              <textarea
                id="message" rows={4} placeholder="Roof type, current bill, any questions..."
                className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-paper placeholder-warm-grey/40 focus:outline-none focus:border-amber/40 transition-colors resize-none"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button
              type="submit" disabled={status === 'sending'}
              className="w-full bg-amber text-navy-deep font-bold rounded-lg py-3.5 hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </button>
            {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Try WhatsApp instead.</p>}
          </form>
        )}

        <div className="mt-10 border-t border-white/6 pt-8">
          <p className="text-sm text-warm-grey mb-3">Prefer a direct chat?</p>
          <a href={`https://wa.me/${SITE.whatsapp.number}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold rounded-lg px-5 py-2.5 hover:opacity-90 transition-opacity text-sm">
            Open WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
