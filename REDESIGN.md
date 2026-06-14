# Skilltech Power System — Full Redesign Brief & Questionnaire

> **Goal:** Re-skin the entire site from the current **dark cinematic warm-brown/amber** theme to a **clean light theme** using the new brand palette. This document maps every section that exists today, explains its current look + animation + data, and asks the questions I need answered before touching code.
>
> **How to use this:** Answer inline under each `❓` question (just type below it). You don't need to answer all at once — section by section is fine. Anything you leave blank, I'll use the recommended default noted in `→ Default:`.

---

## 0. The new color system

**Target ratio (60-30-10 style):**

| Share | Hex | Role |
|------:|-----|------|
| **50%** | `#FFFFFF` | Dominant background / surfaces / negative space |
| **30%** | `#1A2B43` | Deep navy — text, headers, footer, dark sections |
| **20%** | `#F7B538` | Gold — accents, CTAs, highlights, animation glow |

This is a **major inversion** of today's design. Right now the whole site is dark (near-black `#0D0A01` backgrounds, paper-white text, amber `#FBB034` accents). The new direction makes **white the canvas**, navy the ink, and gold the spark.

**What this affects globally** (today's values → proposed):

| Token (tailwind) | Today | Proposed |
|---|---|---|
| `amber` accent | `#FBB034` | `#F7B538` |
| `navy.deep` (page bg) | `#0D0A01` | `#FFFFFF` (flip to light) |
| `navy.DEFAULT` | `#1A1105` | `#1A2B43` |
| `paper` (body text) | `#FBF8F0` | `#1A2B43` on light / `#FFFFFF` on dark |
| `warm-grey` (muted text) | `#9A8870` | a cool grey, e.g. `#5C6B7F` |
| `sky-blue` / `blue-word` accents | warm golds | navy or gold |
| Scrollbar, gradients, glows | warm brown | navy/gold on white |

❓ **0.1 — Overall mood:** The new palette reads bright, corporate, trustworthy (think modern fintech/clean-energy). The current site is moody and cinematic. Do you want to **keep the cinematic feel but on a light base** (dramatic, high-contrast, big type, kept animations), or go **fully clean/minimal/corporate** (calmer, more whitespace, fewer dramatic scroll effects)?
→ Default: keep cinematic energy, light base.

❓ **0.2 — Dark sections allowed?** A pure-white site often still uses navy "anchor" sections (hero, footer, one mid-page band) for drama and to hit the 30% navy share. Are navy full-bleed sections OK, or do you want white-dominant **everywhere** with navy only as text/borders?
→ Default: a few navy anchor sections (hero + footer + storm) for the 30%.

❓ **0.3 — Gold usage:** Should gold `#F7B538` stay an **accent only** (CTAs, underlines, icons, numbers), or also appear as **large fills** (full gold sections/buttons)?
→ Default: accent + primary CTA fills only.

❓ **0.4 — Keep the WhatsApp green?** Today CTAs use WhatsApp green `#25D366`. Keep green for WA buttons, or restyle them gold/navy to match the new palette?
→ Default: keep green only for the literal WhatsApp icon button; make other CTAs navy/gold.

❓ **0.5 — Typography:** Current fonts are **Sora** (display/headings), **Archivo** (body), **JetBrains Mono** (labels/numbers). Keep these, or change for the new look?
→ Default: keep all three.

---

## 1. Header / Navigation
**File:** `src/components/layout/Header.tsx`

**Today:** Fixed transparent bar that turns dark-blurred (`navy-deep/90`) on scroll. Shield logo + "SKILLTECH" wordmark in paper-white. Nav links in warm-grey → paper on hover. "Services" dropdown listing all services. Green WhatsApp button. Mobile hamburger → dark slide-down menu.

❓ **1.1 — Bar style:** On a light site, header options are: (a) **white bar** with subtle shadow on scroll, (b) **navy bar** (stays dark for contrast against white page), (c) transparent → white on scroll. Which?
→ Default: (a) transparent over hero → white-with-shadow on scroll.

❓ **1.2 — Logo:** The shield logo is currently navy fill + amber strokes. On a white header it needs a light-bg version. Do you have a **proper logo file** (SVG/PNG), or should I keep recoloring the built-in shield SVG (navy `#1A2B43` + gold `#F7B538`)?
→ Default: recolor the built-in shield to navy/gold.

❓ **1.3 — Nav links to keep:** Currently: Services ▾, Systems, Savings, Portfolio, About. Add/remove/reorder anything (e.g. add "Contact", "Subsidy Guide")?
→ Default: keep as-is, add nothing.

❓ **1.4 — CTA button:** Keep the green WhatsApp button, or switch the primary header CTA to a gold "Get a Quote" button (with WhatsApp as secondary)?
→ Default: gold "Get a Quote" + keep small green WA icon.

---

## 2. Hero — "The Sky" (Ch.01)
**Files:** `src/components/home/ChSky.tsx`, content in `src/content/home.ts → hero`

**Today:** Full-screen dark cinematic gradient + golden-hour roof photo, dark overlay. Headline **"The power / comes from / above."** — last word in amber, each word clip-path reveals on load. Eyebrow "Ernakulam · Kottayam · Idukki · Kerala" + "EST. 2015" badge. Subline about being a complete power-systems company. Animated scroll cue. Parallax background on scroll.

❓ **2.1 — Hero background:** Keep a **photo hero** (needs a real golden-hour roof photo — currently a placeholder gradient), or go **navy solid / navy-gradient** hero with no photo, or **white** hero with an illustration/3D element?
→ Default: navy hero with gold accents + photo if you provide one.

❓ **2.2 — Headline text:** Keep **"The power comes from above."**? Or new headline? (Give me exact words + which word should be gold.)
→ Default: keep, gold on "above."

❓ **2.3 — Subline:** Keep *"Complete power-systems company — solar, lightning protection, earthing, battery backup & AMC"*? Edit?
→ Default: keep.

❓ **2.4 — Eyebrow + badge:** Keep "Ernakulam · Kottayam · Idukki · Kerala" and "EST. 2015"? (Note: `site.ts` says established **2015** but the proof counters say **11 years** and founder has **15+ years** — want me to reconcile these?)
→ Default: keep, and reconcile years (see Q6.2).

❓ **2.5 — Word-reveal animation:** Keep the clip-path word-by-word reveal + parallax + scroll cue, just recolored? Or simplify?
→ Default: keep, recolored.

❓ **2.6 — Hero CTA:** Currently the hero has **no button** (just a scroll cue). Add a primary CTA button (e.g. "Get a free assessment")?
→ Default: add one gold CTA + keep scroll cue.

---

## 3. The Promise (Ch.02)
**Files:** `src/components/home/ChPromise.tsx`, content `home.ts → promise`

**Today:** A **scroll-pinned** section (300vh tall). Big text **"This is something"** with a cycling word below — **cleaner. → greener. → better.** — driven by scroll position. Last word "better." is amber. Dark background, ambient amber glow.

❓ **3.1 — Keep this section?** It's a pure brand/emotion moment with no info. Keep it, or cut it for a more corporate feel?
→ Default: keep.

❓ **3.2 — Words:** Keep "cleaner / greener / better"? Different three words?
→ Default: keep.

❓ **3.3 — Treatment:** On light theme this could be **navy text on white** with the final word in gold, or stay a **navy section** with white text. Which?
→ Default: white bg, navy text, gold final word.

---

## 4. The Machine (Ch.03) — solar system breakdown
**Files:** `src/components/home/ChMachine.tsx`, `src/components/ui/SolarPanel3D.tsx`, content `home.ts → machine`

**Today:** A **500vh scroll-pinned** section. A **3D solar panel** (Three.js) sits center; as you scroll, 4 callouts reveal one by one:
1. Monocrystalline Solar Panels (Adani · Waaree · UTL · Luminous — 25-yr warranty)
2. Hybrid / Grid-tie Inverter (Luminous · Deye · Growatt · UTL)
3. Bi-directional Meter (KSEB net-metering)
4. ₹0 electricity bill (5 kW home, payback 4–5 yrs)

❓ **4.1 — Keep the 3D panel + scroll-reveal?** This is the most animation-heavy section. Keep the 3D model (recolor its glow to gold), or replace with a simpler static diagram / image?
→ Default: keep 3D, recolor to navy/gold.

❓ **4.2 — The 4 callouts:** Are the **brand names** (Adani, Waaree, UTL, Luminous, Deye, Growatt) still accurate? Update any?
→ Default: keep as listed.

❓ **4.3 — Payback claim:** "payback in 4–5 years" and "₹0 electricity bill" — keep these claims?
→ Default: keep.

---

## 5. The Math (Ch.04) — savings calculator
**Files:** `src/components/home/ChMath.tsx`, `src/components/ui/SavingsCalculator.tsx`, content `home.ts → math`

**Today:** Headline **"Your bill. Our math."** + an interactive **slider calculator**. User moves a slider → sees projected solar savings. Built on these assumptions (in `home.ts`):

| Assumption | Value |
|---|---|
| Tariff | ₹4.50 / unit (Ernakulam LT domestic) |
| Peak sun hours | 5.5 / day |
| Installed cost | ₹45,000 / kW (post-subsidy) |
| MNRE subsidy | 30% |
| Typical system | 5 kW ≈ ₹5 lakh |

❓ **5.1 — Keep the calculator?** It's interactive and a strong lead tool. Keep (recolored), or replace with static "typical savings" cards?
→ Default: keep, recolored.

❓ **5.2 — Numbers accurate?** Are the tariff (₹4.50), cost/kW (₹45,000), 5.5 peak hours, and 30% subsidy still correct for 2026? (Note: copy elsewhere says "2025" / "subsidy in 2025" — should I update to 2026?)
→ Default: keep numbers, update year references to 2026.

❓ **5.3 — Headline:** Keep "Your bill. Our math."?
→ Default: keep.

---

## 6. The Storm (Ch.05) — lightning / protection
**Files:** `src/components/home/ChStorm.tsx`, `src/components/ui/LightningCanvas.tsx`, content `home.ts → storm`

**Today:** Dark dramatic section with a **canvas lightning animation** (real animated lightning bolts + screen-flash effect) over a storm-cloud photo. Headline *"Kerala's skies are beautiful. **And unforgiving.**"* (second part highlighted). Body about monsoon protection. 3 feature dots: ESE Lightning Arrester · DC+AC Surge Protection · IS 3043 Earthing. Seasonal CTA (April–June lightning season).

❓ **6.1 — This section is inherently dark/dramatic.** On a light site this is the natural **navy anchor section**. Keep it dark navy with gold lightning, or rework lighter?
→ Default: keep dark (navy `#1A2B43` bg), recolor lightning to gold/white.

❓ **6.2 — Lightning animation:** Keep the animated lightning canvas + flash? (It's a signature effect.)
→ Default: keep, recolored.

❓ **6.3 — Copy:** Keep headline + body + the 3 protection features as-is?
→ Default: keep.

---

## 7. The Proof (Ch.06) — stats, map, portfolio, testimonials
**Files:** `src/components/home/ChProof.tsx`, `ui/OdometerCounter.tsx`, `ui/ErnakulamMap.tsx`, `ui/PortfolioTrack.tsx`, content `home.ts → proof`, `content/testimonials.ts`, `content/projects.ts`

**Today, four blocks:**
- **Animated counters** (odometer roll-up): 50+ installs · 100kW+ commissioned · 11 years · 25kW largest project
- **Ernakulam map** — animated dots, "every dot is a household powered by the sun"
- **Portfolio track** — draggable horizontal strip of recent installs (`projects.ts`)
- **Testimonials** — 3 cards (currently **placeholder names** in `testimonials.ts`)

❓ **7.1 — Counter numbers:** Are 50+ installs / 100kW+ / 11 years / 25kW largest still accurate? (And "11 years" vs "EST 2015" = 11 yrs by 2026 ✓, but founder exp is "15+ years" — clarify which to show where.)
→ Default: keep numbers; show "11 years" as company age.

❓ **7.2 — Testimonials:** These are **placeholders** right now. Do you have **real customer names + quotes** to drop in? (Name, location, system size, year, quote × 3.)
→ Default: leave placeholders, flag as TODO.

❓ **7.3 — Map:** Keep the animated dot-map (recolored navy/gold)? Real installation locations, or decorative?
→ Default: keep, decorative dots, recolored.

❓ **7.4 — Portfolio photos:** `projects.ts` uses placeholder images. Do you have **real installation photos** + details (location, kW, date)?
→ Default: keep placeholders, flag as TODO.

---

## 8. The Invitation / Footer (Ch.07)
**Files:** `src/components/home/ChInvitation.tsx`, content `home.ts → footer`, `content/site.ts`

**Today:** Full-screen dusk section. Logo + "SKILLTECH POWER SYSTEM". Big promise line **"Sun above. Savings below."** Green WhatsApp CTA. Contact grid (email, phone, area, hours), services list, copyright + certifications (MNRE Channel Partner · KSEB Empanelled Contractor).

❓ **8.1 — Footer treatment:** Natural **navy footer** (white text) to anchor the 30%, or white footer with navy text?
→ Default: navy `#1A2B43` footer.

❓ **8.2 — Footer/contact data — these are blank or placeholder in `site.ts`. Please confirm:**
- ❓ Phone number? *(currently empty)*
- ❓ WhatsApp number? *(env var, currently empty)*
- ❓ Exact office address + PIN? *(currently "Ernakulam District, Kerala")*
- ❓ Social links — Facebook / Instagram / YouTube? *(empty)*
- ❓ Business hours — keep "Mon–Sat, 9am–6pm IST"?
- ❓ Certifications — keep "MNRE Channel Partner · KSEB Empanelled Contractor"? Add "ISO 9001:2015" (currently disabled)?
→ Default: leave blanks as TODO, keep hours + 2 certs.

❓ **8.3 — Promise line:** Keep "Sun above. Savings below."?
→ Default: keep.

---

## 9. Service pages (×8) + their animations
**Files:** `src/components/layout/ServicePage.tsx` (shared template), `src/content/services.ts`, animations in `src/components/animations/`

**Today:** Each service page = dark template with a **spotlight effect** + a **custom circuit-style animation** (CPU-architecture lines with amber particles), description, "what's included" list, indicative pricing, FAQ accordion, WhatsApp CTA.

**The 8 services + their animation components:**

| Service | Anim file | Today's animation |
|---|---|---|
| Solar Installation | `SolarAnim.tsx` | animated solar cells |
| Battery & Inverter | `BatteryAnim.tsx` | circuit + amber particles |
| EV Charger | `EVAnim.tsx` | circuit + charge-flow particles |
| Earthing System | `EarthingAnim.tsx` | circuit + amber particles |
| Lightning Arrester | `LightningAnim.tsx` | bolt-flash animation |
| Solar Water Heater | `WaterHeaterAnim.tsx` | heat-wave animation |
| Commercial | `CommercialAnim.tsx` | scan-beam animation |
| AMC Service | `AMCAnim.tsx` | service/maintenance animation |

❓ **9.1 — Animations on light bg:** All 8 animations are designed for **dark backgrounds** (glowing amber particles on near-black). On a white service page they'll need rework. Options: (a) keep each animation inside a **navy card** on the white page (least work, keeps the glow), (b) **invert** each animation to work on white (navy lines, gold particles), or (c) **simplify** to clean static icons/illustrations. Which?
→ Default: (a) navy cards on white — keeps the signature glow, fastest.

❓ **9.2 — Keep all 8 animations?** Or drop any in favor of a real photo for that service?
→ Default: keep all 8.

❓ **9.3 — Service page layout:** Today it's a narrow single-column dark page. Want a richer light layout (hero image + 2-column, related services, etc.), or keep the simple template recolored?
→ Default: keep simple template, recolored to light.

❓ **9.4 — Service data (`services.ts`):** Each service has a tagline, description, features list, **indicative pricing**, and FAQ. Two questions:
- ❓ Keep showing **public pricing**? (e.g. "Typical 5 kW from ₹5 lakh", AMC pricing, etc.) Or hide prices and push to "request a quote"?
- ❓ Are all the **brand names, warranties, and FAQ answers** still accurate for 2026?
→ Default: keep pricing visible, keep FAQ content, update "2025" → "2026".

---

## 10. Other pages

**Today these exist:** About, Projects, Contact (with form), Subsidy Guide, Commercial, plus auto-generated `/service-areas/[area]` pages and the 8 service pages.

❓ **10.1 — About** (`/about`): Keep current content, recolored? Anything to add (team photos, founder story, the "15+ years" experience)?
→ Default: recolor only.

❓ **10.2 — Contact** (`/contact`): Form posts via **Resend** to `skilltechpowersystem@gmail.com`. Keep form fields as-is (name, phone, service, location, message), recolored? Confirm recipient email?
→ Default: recolor, keep fields + recipient.

❓ **10.3 — Subsidy Guide** (`/subsidy-guide`): Keep the MNRE subsidy explainer content, recolored? Numbers still current for 2026?
→ Default: recolor, update year.

❓ **10.4 — Service-area pages:** Auto-generated per area from `areas.ts` (Ernakulam/Kottayam/Idukki). Keep as-is, recolored? Note: `areas.ts` says Kottayam & Idukki area lists need expanding — want me to flag the gaps?
→ Default: recolor, flag area-list TODOs.

---

## 11. Cross-cutting / global elements

❓ **11.1 — WhatsApp float button** (`WhatsAppFloat.tsx`): floating green bubble bottom-right. Keep green, or restyle?
→ Default: keep green.

❓ **11.2 — Spline 3D scene:** Recent commit added an interactive Spline scene. Keep it, recolored to navy/gold if possible?
→ Default: keep if it recolors cleanly, else drop on light theme.

❓ **11.3 — Smooth scroll (Lenis) + GSAP pinning:** The scroll-pinned sections (Promise, Machine) are heavy. Keep all the scroll choreography, or lighten for performance/simplicity on the new design?
→ Default: keep.

❓ **11.4 — SEO/meta:** OG images, titles, JSON-LD reference the current brand. Keep all copy, just update any year/contact data?
→ Default: keep, sync data.

---

## 12. Logistics

❓ **12.1 — Scope & order:** Should I do this as **(a) one big global re-skin** (tailwind tokens + globals first, then fix each section), or **(b) section-by-section** with you reviewing each before the next?
→ Default: (a) global tokens first for instant 80%, then polish section-by-section.

❓ **12.2 — Branch:** Work on a new branch (e.g. `redesign/light-navy-gold`) and open a PR, or commit to `main`?
→ Default: new branch + PR.

❓ **12.3 — Reference:** Do you have a **reference site, Figma, or screenshot** for the look you want? (Hugely speeds this up.) Drop a link or file.

❓ **12.4 — Anything NOT to touch?** Any section you're happy with as-is and want left alone?

---

### Summary of what I need most (the blockers)
1. **0.1 / 0.2** — cinematic-on-light vs. fully clean, and whether dark anchor sections are allowed.
2. **9.1** — how to handle the 8 dark service animations on a white page.
3. **8.2** — the real contact data (phone, WhatsApp, address, socials).
4. **12.3** — any reference/Figma for the target look.

Everything else has a sensible default and I can proceed without it.
