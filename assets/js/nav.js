/* =========================================================
   NPT48 — Shared Header / Footer Injection & Interactions
   ========================================================= */
(function () {
  var NAV_LINKS = [
    { href: 'index.html', page: 'index', key: 'nav_home' },
    { href: 'profile.html', page: 'profile', key: 'nav_profile' },
    { href: 'discography.html', page: 'discography', key: 'nav_discography' },
    { href: 'about.html', page: 'about', key: 'nav_about' }
  ];

  var LANGS = [
    { code: 'en', label: 'English' },
    { code: 'th', label: 'ไทย' },
    { code: 'jp', label: '日本語' }
  ];

  /* Edit these to point at real posts once NPT48's socials are live. */
  var TICKER_ITEMS = [
    { href: '#', text: 'NPT48 Official Site is now open!' },
    { href: '#', text: 'ติดตามข่าวสารและกิจกรรมของ NPT48 เร็วๆ นี้' },
    { href: 'https://www.youtube.com/playlist?list=PLScxUR4izfcadj6vcix9YuvIJrkTI85X-', text: 'NPT48 1st Single "Kaze Wo Matsu" — coming soon' }
  ];

  function currentPage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var name = path.replace('.html', '');
    return name === '' ? 'index' : name;
  }

  function navLinksHTML(linkClass) {
    return NAV_LINKS.map(function (l) {
      return '<a href="' + l.href + '" class="' + linkClass + '" data-page="' + l.page + '" data-i18n="' + l.key + '">' + l.key + '</a>';
    }).join('');
  }

  function langMenuHTML(btnClass) {
    return LANGS.map(function (l) {
      return '<button type="button" class="' + btnClass + '" data-lang="' + l.code + '">' + l.label + '</button>';
    }).join('');
  }

  function tickerTrackHTML() {
    var itemsHTML = TICKER_ITEMS.map(function (item) {
      return '<a href="' + item.href + '" target="_blank" rel="noopener">' + item.text + '</a>';
    }).join('');
    // Duplicated once so the -50% translateX loop is seamless.
    return itemsHTML + itemsHTML;
  }

  function injectHeader() {
    var mount = document.getElementById('site-header');
    if (!mount) return;

    mount.innerHTML =
      '<div class="npt-bg-decor"><span class="b1"></span><span class="b2"></span><span class="b3"></span><span class="b4"></span></div>' +
      '<div class="site-ticker">' +
        '<span class="ticker-label" data-i18n="ticker_label">LATEST UPDATES</span>' +
        '<div class="ticker-track-wrap"><div class="ticker-track">' + tickerTrackHTML() + '</div></div>' +
      '</div>' +
      '<header class="site-header">' +
        '<div class="site-header-inner">' +
          '<a href="index.html" class="site-logo">' +
            '<img class="logo-img" src="assets/images/logo.png" alt="NPT48">' +
            '<span class="logo-sub">OFFICIAL SITE</span>' +
          '</a>' +
          '<nav class="site-nav" aria-label="Main navigation">' + navLinksHTML('') + '</nav>' +
          '<div class="header-actions">' +
            '<div class="lang-switch" id="langSwitch">' +
              '<button type="button" class="lang-btn" id="langBtn" aria-haspopup="true" aria-expanded="false">' +
                '<i class="fas fa-globe" aria-hidden="true"></i><span id="langBtnLabel">TH</span><i class="fas fa-chevron-down lang-caret" aria-hidden="true"></i>' +
              '</button>' +
              '<div class="lang-menu" id="langMenu" role="menu">' + langMenuHTML('lang-menu-item') + '</div>' +
            '</div>' +
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
        '<div class="mobile-lang-row">' + langMenuHTML('') + '</div>' +
      '</aside>';

    markActiveLinks();
    wireHeaderEvents();
  }

  function injectFooter() {
    var mount = document.getElementById('site-footer');
    if (!mount) return;

    mount.innerHTML =
      '<footer class="site-footer-wrap">' +
        '<div class="footer-inner">' +
          '<h2 class="footer-brand-title">NPT48 OFFICIAL SITE</h2>' +
          '<div class="footer-social-row">' +
            '<a href="#" target="_blank" class="social-btn-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>' +
            '<a href="#" target="_blank" class="social-btn-icon" aria-label="X">' +
              '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
            '</a>' +
            '<a href="#" target="_blank" class="social-btn-icon" aria-label="YouTube"><i class="fab fa-youtube"></i></a>' +
            '<a href="#" target="_blank" class="social-btn-icon" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>' +
            '<a href="#" target="_blank" class="social-btn-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>' +
          '</div>' +
          '<div class="footer-bottom-row">' +
            '<div>' +
              '<ul class="footer-links-list">' +
                '<li><a href="about.html" data-i18n="nav_about">About NPT48</a></li>' +
                '<li><a href="#" data-i18n="footer_privacy">Privacy Policy</a></li>' +
                '<li><a href="#" data-i18n="footer_terms">Terms of Service</a></li>' +
                '<li><a href="#" data-i18n="footer_contact">Contact Us</a></li>' +
              '</ul>' +
              '<div class="copyright-text">&copy; 2026 NPT48. <span data-i18n="footer_rights">All Rights Reserved.</span></div>' +
            '</div>' +
            '<button type="button" class="page-top-btn" id="pageTopBtn">' +
              '<span data-i18n="footer_pagetop">PAGE TOP</span><i class="fas fa-arrow-up" aria-hidden="true"></i>' +
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

    if (window.NPT48_I18N) window.NPT48_I18N.applyLang(window.NPT48_I18N.getLang());
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

  function closeLangMenu() {
    var wrap = document.getElementById('langSwitch');
    var btn = document.getElementById('langBtn');
    if (wrap) wrap.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function updateLangUI(lang) {
    var label = document.getElementById('langBtnLabel');
    if (label) label.textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-menu-item, .mobile-lang-row button').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  function wireHeaderEvents() {
    var hamburger = document.getElementById('navHamburger');
    var closeBtn = document.getElementById('mobileNavClose');
    var backdrop = document.getElementById('mobileNavBackdrop');
    var panel = document.getElementById('mobileNavPanel');
    var langBtn = document.getElementById('langBtn');
    var langSwitch = document.getElementById('langSwitch');

    if (hamburger) hamburger.addEventListener('click', openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (backdrop) backdrop.addEventListener('click', closeMobileMenu);
    if (panel) {
      panel.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMobileMenu);
      });
    }

    if (langBtn && langSwitch) {
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = langSwitch.classList.toggle('open');
        langBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      document.addEventListener('click', function (e) {
        if (!langSwitch.contains(e.target)) closeLangMenu();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
        closeLangMenu();
      }
    });

    document.querySelectorAll('.lang-menu-item, .mobile-lang-row button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        if (window.NPT48_I18N) window.NPT48_I18N.setLang(lang);
        updateLangUI(lang);
        closeLangMenu();
        closeMobileMenu();
      });
    });

    if (window.NPT48_I18N) updateLangUI(window.NPT48_I18N.getLang());
  }

  // Header can be injected immediately (its placeholder is right after <body>).
  injectHeader();
  if (window.NPT48_I18N) window.NPT48_I18N.applyLang(window.NPT48_I18N.getLang());

  // Footer placeholder sits at the end of <body>; inject once DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }
})();
