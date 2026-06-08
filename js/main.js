/* main.js — Skilltech Power System core animation orchestrator */
(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    initNav();
    initChSky();
    initChPromise();
    if (!reducedMotion) {
      initPanel3D();      /* panel3d.js */
      initLightning();    /* lightning.js */
    }
    initChMath();
    initChProof();
    initPortfolio();
  });

  /* ============================================================
     NAV
     ============================================================ */
  function initNav() {
    const nav = document.getElementById('siteNav');
    if (!nav) return;
    ScrollTrigger.create({
      start: 'top -60',
      onUpdate: (self) => nav.classList.toggle('scrolled', self.progress > 0),
    });
  }

  /* ============================================================
     CH1 — THE SKY: headline reveal + parallax
     ============================================================ */
  function initChSky() {
    const eyebrow   = document.querySelector('.sky-eyebrow');
    const words     = document.querySelectorAll('.sky-word');
    const sub       = document.getElementById('skySub');
    const cue       = document.getElementById('skyScrollCue');
    const bg        = document.getElementById('skyBg');
    const overlay   = document.getElementById('skyLightOverlay');

    if (reducedMotion) return;

    /* Entrance animation */
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    tl.to(words, {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
    }, '-=0.3');
    tl.to(sub, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    tl.to(cue, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2');

    /* Parallax on scroll */
    gsap.to(bg, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#ch-sky',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    /* Light overlay shifts with scroll */
    gsap.to(overlay, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#ch-sky',
        start: 'top top',
        end: '60% top',
        scrub: true,
      },
    });
  }

  /* ============================================================
     CH2 — THE PROMISE: pinned full-bleed word screens
     ============================================================ */
  function initChPromise() {
    const spacer = document.getElementById('promiseSpacer');
    const stage  = document.getElementById('promiseStage');
    const f1 = document.getElementById('pf1');
    const f2 = document.getElementById('pf2');
    const f3 = document.getElementById('pf3');
    if (!spacer || !stage || !f1) return;

    if (reducedMotion) {
      /* Static fallback: show first frame */
      ScrollTrigger.create({
        trigger: spacer,
        start: 'top top',
        end: 'bottom bottom',
        pin: stage,
        pinSpacing: false,
      });
      f1.style.opacity = 1;
      return;
    }

    /* Single timeline scrubbed across the full spacer height.
       Timeline duration = 1. Three acts: each ~0.33 units.
       Each act: word clips in, holds, then fades out. */
    const tl = gsap.timeline({ paused: true });

    function addWordAct(frame, word, startAt) {
      /* Fade frame in */
      tl.to(frame, { opacity: 1, duration: 0.06 }, startAt);
      /* Clip-path reveal left→right */
      tl.fromTo(word,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.10, ease: 'power2.out' },
        startAt + 0.02
      );
      /* Fade frame out */
      tl.to(frame, { opacity: 0, duration: 0.07 }, startAt + 0.26);
    }

    addWordAct(f1, f1.querySelector('.promise-word'), 0);
    addWordAct(f2, f2.querySelector('.promise-word'), 0.33);
    addWordAct(f3, f3.querySelector('.promise-word'), 0.66);

    ScrollTrigger.create({
      trigger: spacer,
      start: 'top top',
      end: 'bottom bottom',
      pin: stage,
      pinSpacing: false,
      scrub: 0.8,
      animation: tl,
      invalidateOnRefresh: true,
    });
  }

  /* ============================================================
     CH4 — THE MATH: calculator + live values
     ============================================================ */
  function initChMath() {
    const slider    = document.getElementById('billSlider');
    const billDisp  = document.getElementById('calcBillDisplay');
    const fill      = document.getElementById('rangeFill');
    const sysSize   = document.getElementById('resSysSize');
    const annual    = document.getElementById('resAnnual');
    const payback   = document.getElementById('resPayback');
    if (!slider) return;

    const TARIFF     = 4.50;   /* ₹/unit Ernakulam avg */
    const PEAK_HOURS = 5.5;    /* per day */
    const COST_PER_KW = 45000; /* ₹ installed, after 30% subsidy */
    const SUBSIDY    = 0.30;

    function fmt(n) {
      return n.toLocaleString('en-IN');
    }

    function calculate(bill) {
      const monthlyUnits  = bill / TARIFF;
      const kw            = Math.max(1, (monthlyUnits / (PEAK_HOURS * 30)) * 1.15);
      const systemCost    = kw * COST_PER_KW * (1 - SUBSIDY);
      const annualSaving  = bill * 12;
      const pb            = systemCost / annualSaving;
      return {
        kw:      Math.round(kw * 10) / 10,
        annual:  annualSaving,
        payback: Math.round(pb * 10) / 10,
      };
    }

    function updateFill(val) {
      const min = +slider.min, max = +slider.max;
      const pct = ((val - min) / (max - min)) * 100;
      if (fill) fill.style.width = pct + '%';
    }

    function animateNum(el, newVal, isFloat) {
      if (reducedMotion) {
        el.textContent = isFloat ? newVal.toFixed(1) : fmt(newVal);
        return;
      }
      const current = parseFloat(el.getAttribute('data-val') || 0);
      gsap.to({ v: current }, {
        v: newVal,
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: function () {
          el.textContent = isFloat
            ? this.targets()[0].v.toFixed(1)
            : fmt(Math.round(this.targets()[0].v));
        },
        onComplete: function () {
          el.setAttribute('data-val', newVal);
        },
      });
    }

    function refresh() {
      const bill   = +slider.value;
      const result = calculate(bill);
      billDisp.textContent = '₹' + fmt(bill);
      updateFill(bill);
      animateNum(sysSize,  result.kw,     true);
      animateNum(annual,   result.annual, false);
      animateNum(payback,  result.payback, true);
    }

    slider.addEventListener('input', refresh);
    refresh(); /* initial paint */

    /* Scroll-in animation for the section */
    if (!reducedMotion) {
      gsap.from('#ch-math .math-inner', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#ch-math',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }
  }

  /* ============================================================
     CH6 — THE PROOF: counters + map dots + testimonials
     ============================================================ */
  function initChProof() {
    /* --- Counters --- */
    const counters = document.querySelectorAll('.proof-num[data-target]');

    ScrollTrigger.create({
      trigger: '#proofCounters',
      start: 'top 80%',
      once: true,
      onEnter: function () {
        counters.forEach(function (el) {
          const target = +el.dataset.target;
          if (reducedMotion) { el.textContent = target.toLocaleString('en-IN'); return; }
          gsap.to({ v: 0 }, {
            v: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].v).toLocaleString('en-IN');
            },
          });
        });
      },
    });

    /* --- Ernakulam map dots --- */
    const dots = document.querySelectorAll('#mapDots .town-dot');
    ScrollTrigger.create({
      trigger: '#ernakulamMap',
      start: 'top 80%',
      once: true,
      onEnter: function () {
        dots.forEach(function (dot, i) {
          setTimeout(function () {
            dot.classList.add('lit');
          }, i * 100 + 200);
        });
      },
    });

    /* --- Testimonials --- */
    const cards = document.querySelectorAll('.testimonial-card');
    if (!reducedMotion) {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.testimonials-section',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    } else {
      cards.forEach(function (c) { c.style.opacity = 1; c.style.transform = 'none'; });
    }
  }

  /* ============================================================
     PORTFOLIO — drag/touch horizontal scroll
     ============================================================ */
  function initPortfolio() {
    const viewport = document.getElementById('portfolioViewport');
    const track    = document.getElementById('portfolioTrack');
    if (!viewport || !track) return;

    let isDragging = false, startX, scrollLeft;

    viewport.addEventListener('mousedown', function (e) {
      isDragging = true;
      startX = e.pageX - viewport.offsetLeft;
      scrollLeft = viewport.scrollLeft;
      viewport.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', function () {
      isDragging = false;
      viewport.style.cursor = 'grab';
    });
    viewport.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      const x    = e.pageX - viewport.offsetLeft;
      const walk = (x - startX) * 1.5;
      viewport.scrollLeft = scrollLeft - walk;
    });

    /* Touch */
    let touchStartX, touchScrollLeft;
    viewport.addEventListener('touchstart', function (e) {
      touchStartX    = e.touches[0].pageX;
      touchScrollLeft = viewport.scrollLeft;
    }, { passive: true });
    viewport.addEventListener('touchmove', function (e) {
      const dx = touchStartX - e.touches[0].pageX;
      viewport.scrollLeft = touchScrollLeft + dx;
    }, { passive: true });

    /* Override CSS overflow for drag — CSS already handles scrolling */
    viewport.style.overflowX = 'scroll';
    viewport.style.scrollbarWidth = 'none';
    viewport.style.msOverflowStyle = 'none';

    /* GSAP magnetic hover on cards (desktop) */
    if (!reducedMotion && window.innerWidth > 768) {
      document.querySelectorAll('.portfolio-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top  + rect.height / 2;
          gsap.to(card, {
            x: (e.clientX - cx) * 0.08,
            y: (e.clientY - cy) * 0.08,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
        card.addEventListener('mouseleave', function () {
          gsap.to(card, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
        });
      });
    }
  }

})();
