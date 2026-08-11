/* =========================================================
   NPT48 — Scroll pop-in utility
   Observes [data-pop] elements and adds .in-view when they
   scroll into view. No-ops immediately under prefers-reduced-motion.
   ========================================================= */
(function (window) {
  function initPopIn() {
    var items = document.querySelectorAll('[data-pop]');
    if (!items.length) return;

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }

    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  window.NPT48_POPIN = { init: initPopIn };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopIn);
  } else {
    initPopIn();
  }
})(window);
