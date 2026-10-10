/* =========================================================
   NPT48 — Motion layer
   Hero entrance after the intro loader, mouse/scroll parallax,
   3D card tilt, a cursor sparkle trail and the PAGE TOP rocket.
   Pairs with the "Motion layer" block in site.css. Everything
   here is skipped under prefers-reduced-motion, and the tilt /
   parallax / sparkles only run with a fine pointer (mouse).
   ========================================================= */
(function (window, document) {
  var root = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Split the hero wordmark ("NPT48") into per-letter spans for the fly-in.
  function splitWordmark() {
    var h1 = document.querySelector('.hero-wordmark');
    if (!h1 || h1.dataset.split) return;
    h1.dataset.split = '1';
    var parts = [].map.call(h1.childNodes, function (n) { return n.textContent.trim(); }).filter(Boolean);
    h1.setAttribute('aria-label', parts.join(' '));
    var first = h1.firstChild;
    if (first && first.nodeType === 3) {
      var letters = first.textContent.trim().split('');
      var wrap = document.createElement('span');
      wrap.className = 'letters';
      wrap.setAttribute('aria-hidden', 'true');
      wrap.innerHTML = letters.map(function (ch, i) {
        return '<span class="ch" style="--i:' + i + '">' + ch + '</span>';
      }).join('');
      h1.replaceChild(wrap, first);
    }
    var sub = h1.querySelector('span:not([aria-hidden]):not(.ch)');
    if (sub) { sub.classList.add('sub'); sub.setAttribute('aria-hidden', 'true'); }
  }

  // Play entrances once the intro loader (home page only) has faded.
  function startWhenLoaderGone() {
    var loader = document.getElementById('siteLoader');
    function go() { requestAnimationFrame(function () { root.classList.add('hero-in'); }); }
    if (!loader) { go(); return; }
    if (loader.classList.contains('is-hidden')) { go(); return; }
    var mo = new MutationObserver(function () {
      if (loader.classList.contains('is-hidden') || !loader.isConnected) { mo.disconnect(); go(); }
    });
    mo.observe(loader, { attributes: true, attributeFilter: ['class'] });
    // Safety net in case the loader script never runs.
    setTimeout(function () { mo.disconnect(); go(); }, 4000);
  }

  // Mouse + scroll parallax: write --mx/--my (-1..1) and --sy (px) on the hero.
  function initParallax() {
    var hero = document.querySelector('.top-hero');
    if (!hero) return;
    var pending = false, mx = 0, my = 0;
    function apply() {
      pending = false;
      hero.style.setProperty('--mx', mx.toFixed(3));
      hero.style.setProperty('--my', my.toFixed(3));
      hero.style.setProperty('--sy', Math.min(window.scrollY, 1200).toFixed(0));
    }
    function queue() { if (!pending) { pending = true; requestAnimationFrame(apply); } }
    if (finePointer) {
      window.addEventListener('pointermove', function (e) {
        mx = (e.clientX / window.innerWidth) * 2 - 1;
        my = (e.clientY / window.innerHeight) * 2 - 1;
        queue();
      }, { passive: true });
    }
    window.addEventListener('scroll', queue, { passive: true });
  }

  // 3D tilt for cards under the mouse (delegated, so data-rendered cards work too).
  var TILT_SELECTOR = '.banner-card, .disco-card-thumb, .movie-thumb';
  function initTilt() {
    var current = null;
    function reset(el) { el.style.transform = ''; }
    document.addEventListener('pointermove', function (e) {
      var el = e.target.closest && e.target.closest(TILT_SELECTOR);
      if (current && current !== el) { reset(current); current = null; }
      if (!el) return;
      current = el;
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      var lift = el.classList.contains('banner-card') ? ' translateY(-4px)' : '';
      el.style.transform = 'perspective(800px) rotateX(' + (-py * 10).toFixed(2) + 'deg) rotateY(' + (px * 12).toFixed(2) + 'deg)' + lift;
    }, { passive: true });
    document.addEventListener('pointerleave', function () { if (current) { reset(current); current = null; } });
  }

  // Sparkle trail behind the cursor (throttled, capped).
  function initSparkles() {
    var COLORS = ['#a2d7f6', '#ffe680', '#ffffff', '#c9b6ff'];
    var last = 0, live = 0, MAX = 28;
    window.addEventListener('pointermove', function (e) {
      var now = performance.now();
      if (now - last < 45 || live >= MAX) return;
      last = now;
      var s = document.createElement('span');
      s.className = 'spark' + (Math.random() < 0.35 ? ' spark--star' : '');
      s.style.left = e.clientX + 'px';
      s.style.top = e.clientY + 'px';
      s.style.setProperty('--spark', COLORS[(Math.random() * COLORS.length) | 0]);
      s.style.setProperty('--sx', ((Math.random() - 0.5) * 30).toFixed(0) + 'px');
      s.style.setProperty('--sy', (8 + Math.random() * 22).toFixed(0) + 'px');
      live++;
      var removed = false;
      function done() { if (removed) return; removed = true; s.remove(); live--; }
      s.addEventListener('animationend', done);
      setTimeout(done, 1000); // fallback if animationend never fires (e.g. tab hidden)
      document.body.appendChild(s);
    }, { passive: true });
  }

  // PAGE TOP: the button "launches" upward while the page scrolls to the top.
  function initRocket() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('#pageTop');
      if (!btn || btn.classList.contains('is-launching')) return;
      btn.classList.add('is-launching');
      function done() {
        btn.removeEventListener('animationend', done);
        btn.classList.remove('is-launching');
      }
      btn.addEventListener('animationend', done);
      setTimeout(done, 1100); // fallback if animationend never fires

    });
  }

  if (reduced) {
    // No hidden-then-animated states: show everything as-is.
    root.classList.add('hero-in');
    return;
  }

  root.classList.add('motion-ready');
  splitWordmark();
  startWhenLoaderGone();
  initParallax();
  initRocket();
  if (finePointer) {
    initTilt();
    initSparkles();
  }
})(window, document);
