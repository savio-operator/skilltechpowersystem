/* panel3d.js — CSS 3D solar panel assembly driven by GSAP ScrollTrigger */
(function () {
  'use strict';

  window.initPanel3D = function () {
    const body    = document.getElementById('panelBody');
    const grid    = document.getElementById('panelCellsGrid');
    const jbox    = document.getElementById('panelJunctionBox');
    const spacer  = document.getElementById('machineSpacer');
    const stage   = document.getElementById('machineStage');
    const label   = document.getElementById('machineLabel');
    const callouts = [
      document.getElementById('callout0'),
      document.getElementById('callout1'),
      document.getElementById('callout2'),
      document.getElementById('callout3'),
    ];

    if (!body || !grid) return;

    /* --- Build cell grid (6 cols × 10 rows = 60 cells) --- */
    for (let i = 0; i < 60; i++) {
      const cell = document.createElement('div');
      cell.className = 'panel-cell';
      grid.appendChild(cell);
    }
    const cells = grid.querySelectorAll('.panel-cell');

    /* --- Master timeline (progress 0→1 driven by scroll) --- */
    const tl = gsap.timeline({ paused: true });

    /* Phase 0–0.18: panel rotates from side-on to near-face-on */
    tl.to(body, {
      duration: 0.18,
      rotateY: -10,
      rotateX: -3,
      scale: 1,
      ease: 'power2.out',
    }, 0);

    /* Phase 0.12–0.35: cells populate staggered */
    tl.to(cells, {
      duration: 0.18,
      opacity: 1,
      scale: 1,
      stagger: {
        each: 0.003,
        from: 'start',
      },
      ease: 'power1.out',
    }, 0.10);

    /* Phase 0.30: junction box appears */
    tl.to(jbox, {
      duration: 0.06,
      opacity: 1,
      ease: 'power2.out',
    }, 0.30);

    /* Phase 0.38–0.85: panel settles into slight tilt + callouts fly in */
    tl.to(body, {
      duration: 0.12,
      rotateY: -18,
      rotateX: 5,
      ease: 'power1.inOut',
    }, 0.36);

    /* Callout 0 */
    tl.to(callouts[0], {
      duration: 0.08,
      opacity: 1,
      x: 0,
      ease: 'power2.out',
    }, 0.42);

    /* Callout 1 */
    tl.to(callouts[1], {
      duration: 0.08,
      opacity: 1,
      x: 0,
      ease: 'power2.out',
    }, 0.55);

    /* Callout 2 */
    tl.to(callouts[2], {
      duration: 0.08,
      opacity: 1,
      x: 0,
      ease: 'power2.out',
    }, 0.68);

    /* Callout 3 — amber glow on panel */
    tl.to(callouts[3], {
      duration: 0.08,
      opacity: 1,
      x: 0,
      ease: 'power2.out',
    }, 0.82);

    tl.to(body, {
      duration: 0.10,
      filter: 'drop-shadow(0 0 20px rgba(245,166,35,0.25))',
      ease: 'power2.out',
    }, 0.82);

    /* Chapter label fade */
    tl.to(label, { duration: 0.06, opacity: 1, ease: 'power2.out' }, 0.02);

    /* --- Attach ScrollTrigger scrub --- */
    ScrollTrigger.create({
      trigger: spacer,
      start: 'top top',
      end: 'bottom bottom',
      pin: stage,
      pinSpacing: false,
      scrub: 1.2,
      animation: tl,
      invalidateOnRefresh: true,
    });
  };

})();
