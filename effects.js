/* Subtle AI motion: neural-network canvas in the hero, count-up numbers. Respects reduced motion. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  function hexToRgb(hex) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(h, 16);
    return isNaN(n) ? [184, 137, 43] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  /* ---------- network canvas ---------- */
  var canvas = document.querySelector("canvas.fx");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var nodes = [], mouse = { x: -999, y: -999 }, running = false, raf = 0, rgb = hexToRgb(cssVar("--gold", "#B8892B"));
    var LINK = 150;

    function resize() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(26, Math.min(64, Math.round((w * h) / 16000)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28, r: 1.2 + Math.random() * 1.6 });
      }
      rgb = hexToRgb(cssVar("--gold", "#B8892B"));
      draw(0);
    }

    function draw(step) {
      ctx.clearRect(0, 0, w, h);
      var i, j, a, b, dx, dy, d, alpha;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        if (step) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
          dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120 && d > 0) { a.x += (dx / d) * 0.6; a.y += (dy / d) * 0.6; }
        }
      }
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            alpha = (1 - d / LINK) * 0.32;
            ctx.strokeStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
        var near = d < 160 ? 1 - d / 160 : 0;
        ctx.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + (0.45 + near * 0.5) + ")";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r + near * 1.6, 0, 6.2832); ctx.fill();
        if (near > 0.35) {
          ctx.strokeStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + near * 0.5 + ")";
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }

    function loop() { if (!running) return; draw(1); raf = requestAnimationFrame(loop); }
    function start() { if (reduce || running) return; running = true; raf = requestAnimationFrame(loop); }
    function stop() { running = false; cancelAnimationFrame(raf); }

    window.addEventListener("resize", resize);
    canvas.parentElement.addEventListener("mousemove", function (e) {
      var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    canvas.parentElement.addEventListener("mouseleave", function () { mouse.x = mouse.y = -999; });
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { es[0].isIntersecting ? start() : stop(); }).observe(canvas);
    } else { start(); }
    new MutationObserver(function () { rgb = hexToRgb(cssVar("--gold", "#B8892B")); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var upd = function () { setTimeout(function () { rgb = hexToRgb(cssVar("--gold", "#B8892B")); draw(0); }, 50); };
      mq.addEventListener ? mq.addEventListener("change", upd) : mq.addListener(upd);
    }
    resize();
  }

  /* ---------- count-up numbers (final text is already in the HTML) ---------- */
  if (!reduce) {
    document.querySelectorAll(".creds b, .stats li b").forEach(function (el) {
      var m = el.textContent.match(/^([\d,]+)(.*)$/);
      if (!m) return;
      var end = parseInt(m[1].replace(/,/g, ""), 10), suffix = m[2], t0 = null, dur = 1100;
      function fmt(n) { return n >= 1000 ? n.toLocaleString("en-US") : String(n); }
      function tick(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(end * e)) + suffix;
        if (p < 1) requestAnimationFrame(tick); else el.textContent = m[1] + suffix;
      }
      requestAnimationFrame(tick);
    });
  }
})();
