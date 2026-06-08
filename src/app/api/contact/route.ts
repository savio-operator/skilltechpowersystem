import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, area, message } = body as Record<string, string>

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 })
    }

    // Resend email delivery (requires RESEND_API_KEY in .env.local)
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey && apiKey !== 're_xxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)

      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL ?? 'noreply@skilltechpowersystem.com',
        to:   process.env.CONTACT_RECIPIENT_EMAIL ?? 'saviojossy0509@gmail.com',
        subject: `Solar enquiry from ${name} — ${area || 'Location not specified'}`,
        html: `
          <h2 style="font-family:sans-serif">New solar enquiry</h2>
          <table style="font-family:sans-serif;font-size:14px;line-height:1.6">
            <tr><td style="width:100px;color:#888">Name</td><td>${name}</td></tr>
            <tr><td style="color:#888">Phone</td><td>${phone}</td></tr>
            <tr><td style="color:#888">Area</td><td>${area || '—'}</td></tr>
            <tr><td style="color:#888">Message</td><td>${message || '—'}</td></tr>
          </table>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact route]', err)
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 })
  }
}
