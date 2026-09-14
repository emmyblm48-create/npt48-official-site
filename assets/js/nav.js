/* =========================================================
   NPT48 — Shared Header / Footer Injection & Interactions
   ========================================================= */
(function () {
  var NAV_LINKS = [
    { href: 'index.html', page: 'index', label: 'Home' },
    { href: 'profile.html', page: 'profile', label: 'Profile' },
    { href: 'discography.html', page: 'discography', label: 'Discography' },
    { href: 'about.html', page: 'about', label: 'About' }
  ];

  var TICKER_ITEMS = [
    { href: '#', text: 'NPT48 OFFICIAL SITE IS NOW LIVE' },
    { href: '#', text: '1ST SINGLE "KAZE WO MATSU" COMING SOON' },
    { href: '#', text: 'FROM THE MOUNTAINS TO THE SEA' }
  ];

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
          '<a href="index.html" class="site-logo">' +
            '<img class="logo-img" src="assets/images/logo.png" alt="NPT48">' +
            '<span class="logo-sub">Official Site</span>' +
          '</a>' +
          '<nav class="site-nav" aria-label="Main navigation">' + navLinksHTML('') + '</nav>' +
          '<div class="header-actions">' +
            '<a href="about.html" class="header-cta">About NPT48</a>' +
            '<button type="button" class="nav-hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="mobile-nav-backdrop" id="mobileNavBackdrop"></div>' +
      '<aside class="mobile-nav-panel" id="mobileNavPanel">' +
        '<button type="button" class="mobile-nav-close" id="mobileNavClose" aria-label="Close menu"><i class="fas fa-xmark" aria-hidden="true"></i></button>' +
        '<nav class="mobile-nav-links" aria-label="Mobile navigation">' + navLinksHTML('') + '</nav>' +
        '<a href="about.html" class="mobile-nav-cta">About NPT48</a>' +
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
            '<a href="https://www.instagram.com/npt48official/" class="social-btn-icon" aria-label="Instagram" target="_blank" rel="noopener"><i class="fab fa-instagram"></i></a>' +
            '<a href="https://www.youtube.com/@NPT48OfficialYouTubeChannel" class="social-btn-icon" aria-label="YouTube" target="_blank" rel="noopener"><i class="fab fa-youtube"></i></a>' +
            '<a href="https://www.tiktok.com/@npt48_official" class="social-btn-icon" aria-label="TikTok" target="_blank" rel="noopener"><i class="fab fa-tiktok"></i></a>' +
          '</div>' +

          '<a href="index.html" class="footer-emblem"><img src="assets/images/logo.png" alt="NPT48"></a>' +

          '<div class="footer-banner-grid">' +
            '<a href="profile.html" class="footer-banner-card">' +
              '<span class="fb-card-title">Profile</span>' +
              '<span class="fb-card-sub">Meet the Members</span>' +
            '</a>' +
            '<a href="discography.html" class="footer-banner-card">' +
              '<span class="fb-card-title">Discography</span>' +
              '<span class="fb-card-sub">Music &amp; Releases</span>' +
            '</a>' +
            '<a href="about.html" class="footer-banner-card">' +
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
