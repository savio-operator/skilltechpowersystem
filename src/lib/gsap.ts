'use client'
// Single shared GSAP instance. Every consumer (LenisProvider, pinned home
// chapters, FlowArt) imports from here so ScrollTrigger registers exactly once
// and pin creation is synchronous — the per-component dynamic import() races
// made trigger creation order (and therefore refresh order) nondeterministic.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  // Address-bar show/hide on mobile fires resize; a full refresh() re-measures
  // both 300vh pinned sections mid-gesture — the main mobile stuck/jump cause.
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export { gsap, ScrollTrigger }
