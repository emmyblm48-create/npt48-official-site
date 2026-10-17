/* =========================================================
   NPT48 — Shared chrome, modelled on the ≠ME official site:
   a fixed thin wordmark top-left, a "≠"-style menu button
   top-right that opens a full-screen diagonal sky-blue menu,
   and a pale-grey footer (SNS circles, logo, AKB48 Group, links).
   ========================================================= */
(function () {
  var NAV_LINKS = [
    { href: './', page: 'index', label: 'HOME' },
    { href: './#news', page: 'news', label: 'NEWS' },
    { href: 'profile', page: 'profile', label: 'PROFILE' },
    { href: 'discography', page: 'discography', label: 'DISCOGRAPHY' },
    { href: './#movie', page: 'movie', label: 'MOVIE' },
    { href: 'about', page: 'about', label: 'ABOUT NPT48' }
  ];

  var SOCIALS = {
    instagram: 'https://www.instagram.com/npt48official/',
    youtube: 'https://www.youtube.com/@NPT48OfficialYouTubeChannel',
    tiktok: 'https://www.tiktok.com/@npt48_official'
  };

  // Footer banners (≠ME-style row). A banner with no URL shows as a plain image.
  var SHOP_URL = '';
  var BANNERS = [
    [SOCIALS.youtube, 'assets/images/bnr-youtube.webp', 'NPT48 YouTube'],
    [SHOP_URL, 'assets/images/bnr-shop.webp', 'NPT48 Official Shop']
  ];

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

  // Single-colour glyphs (they take currentColor)
  var ICON = {
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.1 2c.4 2.1 1.9 3.6 4 3.9v3.1a7 7 0 0 1-4-1.4v6.6a5.7 5.7 0 1 1-5.7-5.7l.9.1v3.2a2.6 2.6 0 1 0 1.8 2.4V2z"/></svg>'
  };
  window.NPT48_ICONS = ICON;

  function currentPage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var name = path.replace('.html', '');
    return name === '' ? 'index' : name;
  }

  function snsLinks(cls) {
    return '<ul class="' + cls + '">' +
      [['youtube', 'YouTube'], ['instagram', 'Instagram'], ['tiktok', 'TikTok']].map(function (s) {
        return '<li><a href="' + SOCIALS[s[0]] + '" target="_blank" rel="noopener" aria-label="' + s[1] + '">' + ICON[s[0]] + '</a></li>';
      }).join('') +
    '</ul>';
  }
  window.NPT48_SNS = snsLinks;

  function injectHeader() {
    var mount = document.getElementById('site-header');
    if (!mount) return;
    var page = currentPage();
    if (page === 'index') document.body.classList.add('is-home');

    mount.innerHTML =
      '<header class="site-header">' +
        '<a href="./" class="brand" aria-label="NPT48 home"><img src="assets/images/logo.png" alt="" width="500" height="500"><span>NPT48</span></a>' +
        '<button type="button" class="nav-btn" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="siteMenu"><span></span><span></span></button>' +
      '</header>' +
      '<div class="site-menu" id="siteMenu" aria-label="Site menu">' +
        '<div class="site-menu-logo"><b>NPT48</b><small>New Planet 48</small></div>' +
        '<nav class="site-menu-nav" aria-label="Main navigation">' +
          '<ul>' + NAV_LINKS.map(function (l, i) {
            return '<li style="--i:' + i + '"><a href="' + l.href + '" data-page="' + l.page + '"><span>' + l.label + '</span></a></li>';
          }).join('') + '</ul>' +
          snsLinks('site-menu-sns') +
        '</nav>' +
      '</div>';

    document.querySelectorAll('.site-menu-nav a').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-page') === page);
    });
    wireMenu();
  }

  function injectFooter() {
    var mount = document.getElementById('site-footer');
    if (!mount) return;

    var logos = GROUPS.map(function (g) {
      return '<a href="' + g[0] + '" target="_blank" rel="noopener"><img src="https://s.akb48.co.jp/v2/index/img/g_' + g[1] + '.png?ver=53" alt="' + g[2] + '" width="100" height="140" loading="lazy" decoding="async"></a>';
    }).join('');

    mount.innerHTML =
      '<div class="sns-block">' + snsLinks('sns-circles') + '</div>' +
      '<footer class="site-footer">' +
        '<a href="./" class="footer-logo" aria-label="NPT48 home"><img src="assets/images/logo.png" alt="NPT48" width="500" height="500" loading="lazy"></a>' +
        '<div class="group-label">AKB48 GROUP</div>' +
        '<div class="logo-grid">' + logos + '</div>' +
        '<ul class="bnr-list">' + BANNERS.map(function (b) {
          var img = '<img src="' + b[1] + '" alt="' + b[2] + '" width="2000" height="533" loading="lazy" decoding="async">';
          return '<li>' + (b[0] ? '<a href="' + b[0] + '" target="_blank" rel="noopener">' + img + '</a>' : img) + '</li>';
        }).join('') + '</ul>' +
        '<div class="footer-info">' +
          '<nav class="footer-menu" aria-label="Footer">' +
            '<a href="about">ABOUT NPT48</a><a href="profile">PROFILE</a><a href="discography">DISCOGRAPHY</a><a href="./#movie">MOVIE</a>' +
          '</nav>' +
          '<div class="footer-copy">&copy; 2026 NPT48. All Rights Reserved.</div>' +
        '</div>' +
      '</footer>';
  }

  function wireMenu() {
    var btn = document.getElementById('menuToggle');
    var menu = document.getElementById('siteMenu');

    function setOpen(open) {
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    btn.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('menu-open'));
    });
    menu.addEventListener('click', function (e) {
      // Clicking a link or the empty backdrop closes the menu
      if (e.target.closest('a') || !e.target.closest('.site-menu-nav, .site-menu-logo')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setOpen(false);
    });
  }

  // On the home page the wordmark only appears once the hero has scrolled away
  function wireScrollState() {
    function update() {
      document.body.classList.toggle('is-scrolled', window.scrollY > window.innerHeight * 0.6);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // Header can be injected immediately (its placeholder is right after <body>).
  injectHeader();

  function onReady() {
    injectFooter();
    wireScrollState();
    document.body.classList.add('loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
