# Skilltech Power System — Deployment & Content Guide

## Quick reference

| Task | Command / Where |
|------|----------------|
| Start dev server | `npm run dev` → http://localhost:3000 |
| Check for errors | `npx tsc --noEmit` |
| Production build | `npm run build` |
| Deploy to Vercel | Push to `main` branch (auto-deploys) |

---

## 1. How to update content

All client-facing text, numbers, and links live in `src/content/`. You never need to touch component code to update copy.

### Update site-wide info (email, phone, address, social links)
Edit `src/content/site.ts`

```ts
phone:   '+91 98XXX XXXXX',    // add real number here
address: {
  line1: 'Your street address',
  pin:   '682001',
}
social: {
  facebook:  'https://facebook.com/yourpage',
  instagram: 'https://instagram.com/yourhandle',
}
```

### Update homepage stats (counters)
Edit `src/content/home.ts` → `proof.counters` array.

### Update the savings calculator assumptions
Edit `src/content/home.ts` → `math.calc` (tariff, peak hours, cost/kW, subsidy rate).

### Update/add a service
Edit `src/content/services.ts`. Each service has: name, tagline, description, features, FAQ, image path, pricing.

### Update service areas
Edit `src/content/areas.ts`. Add a new entry to `ERNAKULAM_AREAS`, `KOTTAYAM_AREAS`, or `IDUKKI_AREAS`.  
A new area automatically appears in: the contact form dropdown, the sitemap, the JSON-LD areaServed, and gets its own `/service-areas/[slug]` page.

### Add/update testimonials
Edit `src/content/testimonials.ts`. Replace the `Placeholder Name` entries with real customer names and quotes once confirmed.

### Update project portfolio
Edit `src/content/projects.ts`. Add real installation details and swap the image paths once photos are ready.

---

## 2. How to swap images

Drop images into `public/images/`. Required filenames:

| File | Used for |
|------|----------|
| `hero-golden-hour.jpg` | Homepage hero background |
| `storm-kerala.jpg` | Ch5 storm section |
| `footer-dusk.jpg` | Homepage footer |
| `og-home.jpg` | Open Graph / social share card (1200×630) |
| `project-01.jpg` … `project-06.jpg` | Portfolio grid |
| `service-solar-installation.jpg` | Solar service page |
| `service-lightning.jpg` | Lightning arrester page |
| `service-earthing.jpg` | Earthing page |
| `service-offgrid.jpg` | Off-grid/hybrid page |
| `service-battery-inverter.jpg` | Battery & inverter page |
| `service-amc.jpg` | AMC service page |
| `service-solar-water-heater.jpg` | Solar water heater page |
| `service-ev-charger.jpg` | EV charger page |
| `service-commercial.jpg` | Commercial page |

Vercel automatically optimises all images to AVIF/WebP. Preferred source format: high-quality JPEG, at least 1920px wide for hero shots.

---

## 3. Environment variables (Vercel dashboard)

Go to: **Vercel → Project → Settings → Environment Variables**

Add each variable from `.env.local.example`:

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Yes** | 91XXXXXXXXXX format |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | https://skilltechpowersystem.in |
| `RESEND_API_KEY` | Yes (for email) | Free at resend.com |
| `CONTACT_FROM_EMAIL` | Yes | Verified sender domain |
| `CONTACT_RECIPIENT_EMAIL` | Yes | skilltechpowersystem@gmail.com |
| `GEMINI_KEY_FOR_SKILLTECH` | **Yes (for chat assistant)** | Google AI Studio API key; server-only. Enable it for **Production**. |
| `NEXT_PUBLIC_GA4_ID` | Optional | Google Analytics 4 |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | Optional | Set to `true` to enable |

After adding or changing environment variables, redeploy the latest `main`
deployment so server routes receive the new values. Vercel does not inject new
environment variables into already-built deployments.

---

## 4. Deploy to Vercel (first time)

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the GitHub repo `savio-operator/skilltechpowersystem`
3. Framework: **Next.js** (auto-detected)
4. Add all environment variables (see section 3)
5. Click **Deploy**

Every subsequent push to `main` triggers an automatic redeploy.

---

## 5. Custom domain DNS

Once you have a domain (e.g. `skilltechpowersystem.in`), add these DNS records at your domain registrar:

**Option A — Vercel nameservers (simplest):**
Change your nameservers at the registrar to:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```
Then add the domain in Vercel → Project → Settings → Domains.

**Option B — Keep your registrar, add CNAME:**
| Type | Name | Value |
|------|------|-------|
| `CNAME` | `www` | `cname.vercel-dns.com` |
| `A` | `@` | `76.76.21.21` |

Add both in Vercel → Settings → Domains → `skilltechpowersystem.in` and `www.skilltechpowersystem.in`.  
SSL is issued automatically — no action needed.

---

## 6. How to read leads

**Email:** Contact form submissions land in `skilltechpowersystem@gmail.com` via Resend.  
**WhatsApp:** Direct messages from the WA buttons go to your WhatsApp Business number.

Each email includes: name, phone, service requested, location, and message.

---

## 7. Google Search Console setup

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → URL prefix → `https://skilltechpowersystem.in`
3. Choose **HTML tag** verification method
4. Copy the `content` value (looks like `abc123xyz`)
5. Open `src/app/layout.tsx`, find the comment:
   ```ts
   // verification: { google: 'PASTE_VERIFICATION_CODE_HERE' },
   ```
   Uncomment it and paste your code. Redeploy.
6. Back in Search Console, click **Verify**
7. Submit sitemap: `https://skilltechpowersystem.in/sitemap.xml`

---

## 8. Remaining TODOs (collect from client)

- [ ] Phone number → `src/content/site.ts` `phone`
- [ ] WhatsApp number → Vercel env `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] Exact office address → `src/content/site.ts` `address`
- [ ] Social media links → `src/content/site.ts` `social`
- [ ] Real customer testimonials → `src/content/testimonials.ts`
- [ ] Real installation photos → `public/images/`
- [ ] AMC pricing confirmation → `src/content/services.ts` `amcService.pricing`
- [ ] ISO 9001 cert status → `src/content/site.ts` `certifications`
- [ ] Google Search Console verification code → `src/app/layout.tsx`
- [ ] GA4 Measurement ID → Vercel env `NEXT_PUBLIC_GA4_ID`
- [ ] Kottayam area names to expand → `src/content/areas.ts`
- [ ] Idukki area names to expand → `src/content/areas.ts`
