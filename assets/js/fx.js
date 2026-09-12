/* =========================================================
   NPT48 — Holo interaction layer
   Cursor glow + 3D holo-tilt for photocards ([data-idx] / .tilt).
   No-ops on touch devices and under prefers-reduced-motion.
   ========================================================= */
(function (window, document) {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;

  function initCursorGlow() {
    if (reduced || isTouch) return;
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    var x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y;
    var raf = null;

    function loop() {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      glow.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener('pointermove', function (e) {
      x = e.clientX; y = e.clientY;
      glow.classList.add('on');
    }, { passive: true });
    document.addEventListener('mouseleave', function () { glow.classList.remove('on'); });
    if (!raf) raf = requestAnimationFrame(loop);
  }

  function initTilt() {
    if (reduced || isTouch) return;
    var items = document.querySelectorAll('.tilt');
    items.forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        var rx = (py - 0.5) * -12;
        var ry = (px - 0.5) * 14;
        el.style.transform = 'perspective(700px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-6px)';
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
      });
    });
  }

  // Re-run tilt binding whenever data-driven grids re-render (event fired by page scripts).
  window.NPT48_FX = { initTilt: initTilt };

  function boot() {
    initCursorGlow();
    initTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
