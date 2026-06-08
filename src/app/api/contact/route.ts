import { NextResponse } from 'next/server'

// In-memory rate limiter: max 3 requests per IP per 10 minutes
const RATE_MAP = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 3
const RATE_WINDOW = 10 * 60 * 1000  // 10 min

function getRateLimitKey(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? 'unknown'
}

function isRateLimited(key: string): boolean {
  const now  = Date.now()
  const slot = RATE_MAP.get(key)
  if (!slot || now > slot.reset) {
    RATE_MAP.set(key, { count: 1, reset: now + RATE_WINDOW })
    return false
  }
  slot.count++
  return slot.count > RATE_LIMIT
}

function sanitize(s: unknown): string {
  if (typeof s !== 'string') return ''
  return s.replace(/<[^>]*>/g, '').trim().slice(0, 2000)
}

export async function POST(request: Request) {
  try {
    // Rate limit
    if (isRateLimited(getRateLimitKey(request))) {
      return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
    }

    const body = await request.json()

    // Honeypot check
    if (body._hp) {
      return NextResponse.json({ success: true })  // silent discard
    }

    const name    = sanitize(body.name)
    const phone   = sanitize(body.phone)
    const area    = sanitize(body.area)
    const service = sanitize(body.service)
    const message = sanitize(body.message)

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 })
    }
    if (!/^[+\d\s()-]{7,20}$/.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json({ error: 'Invalid phone number.' }, { status: 400 })
    }

    const recipient = process.env.CONTACT_RECIPIENT_EMAIL ?? 'skilltechpowersystem@gmail.com'
    const fromAddr  = process.env.CONTACT_FROM_EMAIL      ?? 'noreply@skilltechpowersystem.in'

    const htmlBody = `
      <div style="font-family:sans-serif;max-width:520px;background:#f9f9f9;border-radius:8px;padding:24px">
        <h2 style="margin:0 0 16px;color:#1A1105">New solar enquiry — Skilltech Power System</h2>
        <table style="font-size:14px;line-height:1.8;width:100%">
          <tr><td style="width:110px;color:#888;padding:4px 0">Name</td><td><strong>${name}</strong></td></tr>
          <tr><td style="color:#888;padding:4px 0">Phone</td><td><a href="tel:${phone}" style="color:#1A1105">${phone}</a></td></tr>
          <tr><td style="color:#888;padding:4px 0">Service</td><td>${service || '—'}</td></tr>
          <tr><td style="color:#888;padding:4px 0">Area</td><td>${area || '—'}</td></tr>
          <tr><td style="color:#888;padding:4px 0">Message</td><td>${message || '—'}</td></tr>
        </table>
        <p style="margin-top:20px;font-size:12px;color:#aaa">Submitted via skilltechpowersystem.in contact form</p>
      </div>
    `

    const apiKey = process.env.RESEND_API_KEY
    if (apiKey && !apiKey.startsWith('re_xxx')) {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from:    fromAddr,
        to:      recipient,
        subject: `Solar enquiry: ${service || 'General'} — ${name} (${area || 'location n/a'})`,
        html:    htmlBody,
        replyTo: undefined,
      })
    } else {
      // Dev fallback: log to server console
      console.log('[contact]', { name, phone, service, area, message })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact route]', err)
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 })
  }
}
