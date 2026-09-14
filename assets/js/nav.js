/* =========================================================
   NPT48 — Shared Header / Footer Injection & Interactions
   ========================================================= */
(function () {
  var NAV_LINKS = [
    { href: 'index.html', page: 'index', label: 'Home' },
    { href: 'schedule.html', page: 'schedule', label: 'Schedule' },
    { href: 'profile.html', page: 'profile', label: 'Members' },
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
            '<span class="logo-badge"><img class="logo-img" src="assets/images/logo.png" alt="NPT48"></span>' +
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
      '<footer class="ske-footer">' +
        '<div class="footer-inner">' +
          '<div class="footer-top">' +
            '<div>' +
              '<h2 class="footer-brand-title">NPT48</h2>' +
              '<p class="footer-brand-desc">From the mountains to the sea — a nonprofit Thai virtual idol group.</p>' +
            '</div>' +
            '<div class="footer-nav-cols">' +
              '<div>' +
                '<div class="footer-col-title">Explore</div>' +
                '<ul class="footer-links-list">' +
                  '<li><a href="schedule.html">Schedule</a></li>' +
                  '<li><a href="profile.html">Members</a></li>' +
                  '<li><a href="discography.html">Discography</a></li>' +
                  '<li><a href="about.html">About</a></li>' +
                '</ul>' +
              '</div>' +
              '<div>' +
                '<div class="footer-col-title">Connect</div>' +
                '<ul class="footer-links-list">' +
                  '<li><a href="#">Privacy Policy</a></li>' +
                  '<li><a href="#">Terms of Use</a></li>' +
                  '<li><a href="#">Contact Us</a></li>' +
                '</ul>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom-row">' +
            '<div class="footer-social-row">' +
              '<a href="#" class="social-btn-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>' +
              '<a href="#" class="social-btn-icon" aria-label="X">' +
                '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
              '</a>' +
              '<a href="#" class="social-btn-icon" aria-label="YouTube"><i class="fab fa-youtube"></i></a>' +
              '<a href="#" class="social-btn-icon" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>' +
              '<a href="#" class="social-btn-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>' +
            '</div>' +
            '<div class="copyright-text">&copy; 2026 NPT48. All rights reserved.</div>' +
            '<button type="button" class="page-top-btn" id="pageTopBtn">' +
              '<span>Page Top</span><i class="fas fa-arrow-up" aria-hidden="true"></i>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</footer>';

    var topBtn = document.getElementById('pageTopBtn');
    if (topBtn) {
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
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
