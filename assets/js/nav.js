/* =========================================================
   NPT48 — Shared Header / Footer Injection & Interactions
   ========================================================= */
(function () {
  var NAV_LINKS = [
    { href: './', page: 'index', label: 'Home' },
    { href: 'profile', page: 'profile', label: 'Profile' },
    { href: 'discography', page: 'discography', label: 'Discography' },
    { href: 'about', page: 'about', label: 'About' }
  ];

  var TICKER_ITEMS = [
    { href: '#', text: 'NPT48 OFFICIAL SITE IS NOW LIVE' },
    { href: '#', text: '1ST SINGLE "KAZE WO MATSU" COMING SOON' },
    { href: '#', text: 'FROM THE MOUNTAINS TO THE SEA' }
  ];

  var ICON_XMARK = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_INSTAGRAM = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>';
  var ICON_YOUTUBE = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor"/></svg>';
  var ICON_TIKTOK = '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.4 2 1.9 3.6 4 3.9v3.1c-1.5-.1-2.9-.6-4-1.4v6.6a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.2a2.6 2.6 0 1 0 1.8 2.5V3h3z"/></svg>';

  function currentPage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var name = path.replace('.html', '');
    return name === '' ? 'index' : name;
  }

  function navLinksHTML(linkClass) {
    return NAV_LINKS.map(function (l) {
      return '<a href="' + l.href + '" class="' + linkClass + '" data-page="' + l.page + '">' + l.label + '</a>';
    }).join('');
  }

  function tickerTrackHTML() {
    var itemsHTML = TICKER_ITEMS.map(function (item) {
      return '<a href="' + item.href + '">' + item.text + '</a>';
    }).join('');
    // Duplicated once so the -50% translateX loop is seamless.
    return itemsHTML + itemsHTML;
  }

  function injectHeader() {
    var mount = document.getElementById('site-header');
    if (!mount) return;

    mount.innerHTML =
      '<div class="site-ticker">' +
        '<span class="ticker-label">Today</span>' +
        '<div class="ticker-track-wrap"><div class="ticker-track">' + tickerTrackHTML() + '</div></div>' +
      '</div>' +
      '<header class="site-header">' +
        '<div class="site-header-inner">' +
          '<a href="./" class="site-logo">' +
            '<img class="logo-img" src="assets/images/logo.png" alt="NPT48" width="500" height="500">' +
            '<span class="logo-sub">Official Site</span>' +
          '</a>' +
          '<nav class="site-nav" aria-label="Main navigation">' + navLinksHTML('') + '</nav>' +
          '<div class="header-actions">' +
            '<a href="about" class="header-cta">About NPT48</a>' +
            '<button type="button" class="nav-hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="mobile-nav-backdrop" id="mobileNavBackdrop"></div>' +
      '<aside class="mobile-nav-panel" id="mobileNavPanel">' +
        '<button type="button" class="mobile-nav-close" id="mobileNavClose" aria-label="Close menu">' + ICON_XMARK + '</button>' +
        '<nav class="mobile-nav-links" aria-label="Mobile navigation">' + navLinksHTML('') + '</nav>' +
        '<a href="about" class="mobile-nav-cta">About NPT48</a>' +
      '</aside>';

    markActiveLinks();
    wireHeaderEvents();
  }

  function injectFooter() {
    var mount = document.getElementById('site-footer');
    if (!mount) return;

    mount.innerHTML =
      '<footer class="site-footer-v2">' +
        '<div class="footer-inner-v2">' +
          '<div class="footer-social-row">' +
            '<a href="https://www.instagram.com/npt48official/" class="social-btn-icon" aria-label="Instagram" target="_blank" rel="noopener">' + ICON_INSTAGRAM + '</a>' +
            '<a href="https://www.youtube.com/@NPT48OfficialYouTubeChannel" class="social-btn-icon" aria-label="YouTube" target="_blank" rel="noopener">' + ICON_YOUTUBE + '</a>' +
            '<a href="https://www.tiktok.com/@npt48_official" class="social-btn-icon" aria-label="TikTok" target="_blank" rel="noopener">' + ICON_TIKTOK + '</a>' +
          '</div>' +

          '<a href="./" class="footer-emblem"><img src="assets/images/logo.png" alt="NPT48" width="500" height="500" loading="lazy" decoding="async"></a>' +

          '<div class="footer-banner-grid">' +
            '<a href="profile" class="footer-banner-card">' +
              '<span class="fb-card-title">Profile</span>' +
              '<span class="fb-card-sub">Meet the Members</span>' +
            '</a>' +
            '<a href="discography" class="footer-banner-card">' +
              '<span class="fb-card-title">Discography</span>' +
              '<span class="fb-card-sub">Music &amp; Releases</span>' +
            '</a>' +
            '<a href="about" class="footer-banner-card">' +
              '<span class="fb-card-title">About</span>' +
              '<span class="fb-card-sub">Our Story</span>' +
            '</a>' +
            '<a href="https://www.akb48.co.jp/" target="_blank" rel="noopener" class="footer-banner-card">' +
              '<span class="fb-card-title">AKB48 Group</span>' +
              '<span class="fb-card-sub">Official Site</span>' +
            '</a>' +
          '</div>' +

          '<div class="footer-contact-grid">' +
            '<a href="#" class="footer-contact-card">Contact Us</a>' +
            '<a href="#" class="footer-contact-card">Privacy Policy &amp; Terms of Use</a>' +
          '</div>' +

          '<div class="footer-org-line">NPT48</div>' +
          '<div class="footer-copyright">&copy; 2026 NPT48. All rights reserved.</div>' +
        '</div>' +
      '</footer>';
  }

  function markActiveLinks() {
    var page = currentPage();
    document.querySelectorAll('.site-nav a, .mobile-nav-links a').forEach(function (a) {
      if (a.getAttribute('data-page') === page) {
        a.classList.add('active');
      }
    });
  }

  function closeMobileMenu() {
    var panel = document.getElementById('mobileNavPanel');
    var backdrop = document.getElementById('mobileNavBackdrop');
    var hamburger = document.getElementById('navHamburger');
    if (panel) panel.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMobileMenu() {
    var panel = document.getElementById('mobileNavPanel');
    var backdrop = document.getElementById('mobileNavBackdrop');
    var hamburger = document.getElementById('navHamburger');
    if (panel) panel.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function wireHeaderEvents() {
    var hamburger = document.getElementById('navHamburger');
    var closeBtn = document.getElementById('mobileNavClose');
    var backdrop = document.getElementById('mobileNavBackdrop');
    var panel = document.getElementById('mobileNavPanel');

    if (hamburger) hamburger.addEventListener('click', openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (backdrop) backdrop.addEventListener('click', closeMobileMenu);
    if (panel) {
      panel.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMobileMenu);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  // Header can be injected immediately (its placeholder is right after <body>).
  injectHeader();

  // Footer placeholder sits at the end of <body>; inject once DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }
})();
