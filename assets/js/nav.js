/* =========================================================
   NPT48 — Shared chrome: fixed white header with caps nav and
   blue pill buttons, a full-screen menu on small screens, and
   the footer (page-top, SNS icons, logo, AKB48 Group, links).
   ========================================================= */
(function () {
  var NAV_LINKS = [
    { href: 'profile', page: 'profile', label: 'PROFILE', sub: 'โปรไฟล์สมาชิก' },
    { href: 'discography', page: 'discography', label: 'DISCOGRAPHY', sub: 'ผลงานเพลง' },
    { href: './#movie', page: 'movie', label: 'MOVIE', sub: 'วิดีโอ' },
    { href: 'about', page: 'about', label: 'ABOUT', sub: 'เกี่ยวกับวง' }
  ];

  var SOCIALS = {
    instagram: 'https://www.instagram.com/npt48official/',
    youtube: 'https://www.youtube.com/@NPT48OfficialYouTubeChannel',
    tiktok: 'https://www.tiktok.com/@npt48_official'
  };

  var GROUPS = [
    ['https://www.akb48.co.jp/', 'akb48', 'AKB48'],
    ['https://www.ske48.co.jp/', 'ske48', 'SKE48'],
    ['https://nmb48.com/', 'nmb48', 'NMB48'],
    ['http://www.hkt48.jp/', 'hkt48', 'HKT48'],
    ['https://ngt48.jp/', 'ngt48', 'NGT48'],
    ['https://www.stu48.com/', 'stu48', 'STU48'],
    ['https://www.jkt48.com/', 'jkt48', 'JKT48'],
    ['https://www.bnk48.com/', 'bnk48', 'BNK48'],
    ['https://weibo.com/akb48teamsh', 'tsh48', 'TSH48'],
    ['https://www.tpe48.tw/', 'tpe48', 'TPE48'],
    ['https://www.cgm48official.com/', 'cgm48', 'CGM48'],
    ['https://klp48.my/', 'klp48', 'KLP48']
  ];

  // Full-colour brand marks for the footer SNS row
  var SNS_ICON = {
    youtube: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="7" width="28" height="18" rx="5" fill="#ff0000"/><path d="M13 11.5v9l8-4.5z" fill="#fff"/></svg>',
    instagram: '<svg viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="igGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#feda75"/><stop offset=".35" stop-color="#fa7e1e"/><stop offset=".65" stop-color="#d62976"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs><rect x="3" y="3" width="26" height="26" rx="8" fill="url(#igGrad)"/><circle cx="16" cy="16" r="6" fill="none" stroke="#fff" stroke-width="2.4"/><circle cx="23" cy="9" r="1.6" fill="#fff"/></svg>',
    tiktok: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M21.5 4c.5 2.7 2.5 4.8 5.3 5.2v4.1c-2-.1-3.8-.8-5.3-1.9v8.8a7.6 7.6 0 1 1-7.6-7.6c.4 0 .8 0 1.2.1v4.2a3.5 3.5 0 1 0 2.4 3.3V4h4z" fill="#111"/></svg>',
    web: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="6" width="24" height="20" rx="2" fill="none" stroke="#111" stroke-width="2"/><path d="M4 12h24M9 17h7M9 21h10" stroke="#111" stroke-width="2"/></svg>'
  };

  var ICON_UP = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg>';

  function currentPage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var name = path.replace('.html', '');
    return name === '' ? 'index' : name;
  }

  function buttonsHTML() {
    return '<div class="toolbar-buttons">' +
      '<a class="toolbar-button" href="' + SOCIALS.instagram + '" target="_blank" rel="noopener">FOLLOW</a>' +
      '<a class="toolbar-button" href="' + SOCIALS.youtube + '" target="_blank" rel="noopener">YOUTUBE</a>' +
    '</div>';
  }

  function injectHeader() {
    var mount = document.getElementById('site-header');
    if (!mount) return;

    mount.innerHTML =
      '<header class="site-header">' +
        '<div class="toolbar">' +
          '<a href="./" class="brand" aria-label="NPT48 home">' +
            '<img src="assets/images/logo.png" alt="" width="500" height="500">' +
            '<span class="brand-text"><b>NPT48</b>OFFICIAL SITE</span>' +
          '</a>' +
          '<nav class="main-nav" aria-label="Main navigation">' +
            NAV_LINKS.map(function (l) {
              return '<a href="' + l.href + '" data-page="' + l.page + '">' + l.label + '</a>';
            }).join('') +
          '</nav>' +
          buttonsHTML() +
          '<button type="button" class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</header>' +
      '<div class="mobile-menu" id="mobileMenu" aria-label="Site menu">' +
        '<nav aria-label="Main navigation">' +
          '<a href="./" data-page="index">HOME<small>หน้าแรก</small></a>' +
          NAV_LINKS.map(function (l) {
            return '<a href="' + l.href + '" data-page="' + l.page + '">' + l.label + '<small>' + l.sub + '</small></a>';
          }).join('') +
        '</nav>' +
        buttonsHTML() +
      '</div>';

    markActiveLinks();
    wireMenu();
  }

  function injectFooter() {
    var mount = document.getElementById('site-footer');
    if (!mount) return;

    var sns = [
      ['./', SNS_ICON.web, 'Official Website', false],
      [SOCIALS.youtube, SNS_ICON.youtube, 'YouTube', true],
      [SOCIALS.instagram, SNS_ICON.instagram, 'Instagram', true],
      [SOCIALS.tiktok, SNS_ICON.tiktok, 'TikTok', true]
    ].map(function (s) {
      return '<a href="' + s[0] + '"' + (s[3] ? ' target="_blank" rel="noopener"' : '') + '>' + s[1] + '<span>' + s[2] + '</span></a>';
    }).join('');

    var logos = GROUPS.map(function (g) {
      return '<a href="' + g[0] + '" target="_blank" rel="noopener"><img src="https://s.akb48.co.jp/v2/index/img/g_' + g[1] + '.png?ver=53" alt="' + g[2] + '" width="100" height="140" loading="lazy" decoding="async"></a>';
    }).join('');

    mount.innerHTML =
      '<footer class="site-footer">' +
        '<button type="button" class="page-top" id="pageTop" aria-label="Back to top">' + ICON_UP + '</button>' +
        '<div class="sns">' + sns + '</div>' +
        '<a href="./" class="footer-logo" aria-label="NPT48 home"><img src="assets/images/logo.png" alt="NPT48" width="500" height="500" loading="lazy"></a>' +
        '<div class="group-label">AKB48 GROUP</div>' +
        '<div class="logo-grid">' + logos + '</div>' +
        '<nav class="footer-menu" aria-label="Footer">' +
          '<a href="about">เกี่ยวกับ NPT48</a><a href="profile">Profile</a><a href="discography">Discography</a><a href="./#movie">Movie</a>' +
        '</nav>' +
        '<div class="footer-copy">&copy; 2026 NPT48. All Rights Reserved.</div>' +
      '</footer>';

    document.getElementById('pageTop').addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function markActiveLinks() {
    var page = currentPage();
    document.querySelectorAll('.main-nav a, .mobile-menu a').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-page') === page);
    });
  }

  function wireMenu() {
    var btn = document.getElementById('menuToggle');
    var menu = document.getElementById('mobileMenu');

    function setOpen(open) {
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    btn.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('menu-open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setOpen(false);
    });
  }

  function wireScrollState() {
    function update() {
      document.body.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // Header can be injected immediately (its placeholder is right after <body>).
  injectHeader();

  function onReady() {
    injectFooter();
    wireScrollState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
