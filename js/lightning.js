/* lightning.js — Canvas lightning strike system for CH5: THE STORM */
(function () {
  'use strict';

  window.initLightning = function () {
    const canvas = document.getElementById('lightningCanvas');
    const flash  = document.getElementById('stormFlash');
    const section = document.getElementById('ch-storm');
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    let W, H, animId, strikesRemaining, strikePause;

    function resize() {
      W = canvas.width  = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    /* ---------- Lightning algorithm ---------- */
    function jitter(max) { return (Math.random() - 0.5) * max; }

    function drawSegments(x1, y1, x2, y2, roughness, depth) {
      if (depth > 4 || Math.abs(y2 - y1) < 2) {
        ctx.lineTo(x2, y2);
        return;
      }
      const mx = (x1 + x2) / 2 + jitter(roughness);
      const my = (y1 + y2) / 2 + jitter(roughness * 0.3);
      drawSegments(x1, y1, mx, my, roughness / 1.8, depth + 1);
      drawSegments(mx, my, x2, y2, roughness / 1.8, depth + 1);
    }

    function drawBolt(x1, y1, x2, y2, alpha, lineWidth, roughness) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = '#c8e0ff';
      ctx.lineWidth   = lineWidth;
      ctx.shadowColor = '#4A90D9';
      ctx.shadowBlur  = 18;
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      drawSegments(x1, y1, x2, y2, roughness, 0);
      ctx.stroke();

      /* Bright core */
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth   = lineWidth * 0.35;
      ctx.shadowBlur  = 6;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      drawSegments(x1, y1, x2, y2, roughness, 0);
      ctx.stroke();
      ctx.restore();
    }

    function spawnBranches(x1, y1, x2, y2, depth) {
      if (depth >= 2) return;
      const numBranches = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < numBranches; i++) {
        const t = 0.3 + Math.random() * 0.5;
        const bx = x1 + (x2 - x1) * t + jitter(40);
        const by = y1 + (y2 - y1) * t + jitter(10);
        const ex = bx + jitter(120 / (depth + 1));
        const ey = by + (y2 - by) * (0.4 + Math.random() * 0.4);
        const alpha = 0.3 - depth * 0.1;
        drawBolt(bx, by, ex, ey, alpha, 1.2 - depth * 0.3, 60 - depth * 15);
        spawnBranches(bx, by, ex, ey, depth + 1);
      }
    }

    /* ---------- Strike sequence ---------- */
    function strike() {
      ctx.clearRect(0, 0, W, H);
      const startX = W * (0.25 + Math.random() * 0.5);
      const endX   = startX + jitter(80);
      const rough  = 90;

      /* Main bolt */
      drawBolt(startX, 0, endX, H * (0.6 + Math.random() * 0.35), 0.85, 2.5, rough);
      spawnBranches(startX, 0, endX, H * 0.65, 0);

      /* Screen flash */
      gsap.to(flash, {
        opacity: 0.18,
        duration: 0.04,
        onComplete: () => gsap.to(flash, { opacity: 0, duration: 0.25 }),
      });

      /* Fade bolt out */
      gsap.to(canvas, {
        opacity: 0,
        duration: 0.18,
        delay: 0.05,
        onComplete: () => {
          ctx.clearRect(0, 0, W, H);
          gsap.set(canvas, { opacity: 1 });

          strikesRemaining--;
          if (strikesRemaining > 0) {
            strikePause = 300 + Math.random() * 900;
            setTimeout(strike, strikePause);
          }
        },
      });
    }

    function triggerStorm() {
      strikesRemaining = 3 + Math.floor(Math.random() * 3);
      /* Small initial delay for drama */
      setTimeout(strike, 600);
    }

    /* ---------- ScrollTrigger activation ---------- */
    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      once: true,
      onEnter: triggerStorm,
    });

    /* Re-trigger on repeated visits (not once — keep storm alive on scroll) */
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnterBack: triggerStorm,
    });
  };

})();
