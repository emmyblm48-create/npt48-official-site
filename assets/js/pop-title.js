/* =========================================================
   NPT48 — .pop-title (APPLICATION pages, after the BLM48 site):
   one span per letter (data-ch feeds the stacked outline copies
   in site.css) so the letters bounce in one by one, then float.
   ========================================================= */
(function () {
  function splitPopTitles() {
    document.querySelectorAll('.pop-title:not(.is-split)').forEach(function (el) {
      var text = el.textContent.trim();
      el.setAttribute('aria-label', text);
      el.innerHTML = Array.from(text).map(function (ch, i) {
        var safe = ch.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
        return '<span class="pop-ch" aria-hidden="true" data-ch="' + safe + '" style="--i:' + i + '">' + safe + '</span>';
      }).join('');
      el.classList.add('is-split');
      var last = el.lastElementChild;
      if (last) last.addEventListener('animationend', function () { el.classList.add('is-floating'); }, { once: true });
      if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        // Give a fading-in [data-pop] parent a moment to appear first
        var wrap = el.closest('[data-pop]');
        setTimeout(function () { el.classList.add('is-in'); }, wrap && !wrap.classList.contains('in-view') ? 250 : 0);
        io.disconnect();
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', splitPopTitles);
  else splitPopTitles();
})();
