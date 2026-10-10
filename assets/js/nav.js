/* =========================================================
   NPT48 — Shared chrome: striped logo badge, blob MENU button,
   full-screen split menu, wavy footer and page-top button.
   ========================================================= */
(function () {
  var NAV_LINKS = [
    { href: './', page: 'index', label: 'Home', sub: 'หน้าแรก' },
    { href: 'profile', page: 'profile', label: 'Profile', sub: 'โปรไฟล์สมาชิก' },
    { href: 'discography', page: 'discography', label: 'Discography', sub: 'ผลงานเพลง' },
    { href: './#movie', page: 'movie', label: 'Movie', sub: 'วิดีโอ' },
    { href: 'about', page: 'about', label: 'About', sub: 'เกี่ยวกับวง' }
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

  var ICON = {
    instagram: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
    youtube: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor"/></svg>',
    tiktok: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.4 2 1.9 3.6 4 3.9v3.1c-1.5-.1-2.9-.6-4-1.4v6.6a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.2a2.6 2.6 0 1 0 1.8 2.5V3h3z"/></svg>',
    // Ringed-planet emblem: "New Planet"
    emblem: '<svg class="icon" viewBox="0 0 32 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="16" cy="12" r="6.5"/><path d="M9.6 10.2C4.4 11.4 1.6 13.4 2.2 15c.8 2.1 7.4 1.6 14.6-1.1S29.4 7.4 28.7 5.3c-.5-1.5-3.6-1.6-7.8-.6"/><circle cx="27" cy="19" r="1" fill="currentColor" stroke="none"/></svg>',
    up: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 14l6-6 6 6"/></svg>'
  };

  function currentPage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var name = path.replace('.html', '');
    return name === '' ? 'index' : name;
  }

  function navLinksHTML() {
    return NAV_LINKS.map(function (l) {
      return '<a href="' + l.href + '" data-page="' + l.page + '">' + l.label + '<small>' + l.sub + '</small></a>';
    }).join('');
  }

  function topNavHTML() {
    return NAV_LINKS.map(function (l) {
      return '<a href="' + l.href + '" data-page="' + l.page + '"><span class="en">' + l.label + '</span><span class="th">' + l.sub + '</span></a>';
    }).join('');
  }

  function socialRowHTML(extraClass) {
    return '<div class="social-row ' + (extraClass || '') + '">' +
      '<a href="' + SOCIALS.youtube + '" target="_blank" rel="noopener" aria-label="YouTube">' + ICON.youtube + '</a>' +
      '<a href="' + SOCIALS.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICON.instagram + '</a>' +
      '<a href="' + SOCIALS.tiktok + '" target="_blank" rel="noopener" aria-label="TikTok">' + ICON.tiktok + '</a>' +
    '</div>';
  }

  function blobLabel(word) {
    return word.split('').map(function (ch, i) {
      return '<span style="animation-delay:' + (i * 40) + 'ms">' + ch + '</span>';
    }).join('');
  }

  // Fixed night sky behind every page: two twinkling star layers + a few shooting stars
  function injectStarfield() {
    if (document.querySelector('.starfield')) return;
    var sky = document.createElement('div');
    sky.className = 'starfield';
    sky.setAttribute('aria-hidden', 'true');
    sky.innerHTML =
      '<span class="stars stars--small"></span>' +
      '<span class="stars stars--big"></span>' +
      '<span class="shooting-star" style="--x:78%;--y:6%;--dur:11s;--delay:2s"></span>' +
      '<span class="shooting-star" style="--x:42%;--y:2%;--dur:15s;--delay:7s"></span>' +
      '<span class="shooting-star" style="--x:96%;--y:34%;--dur:19s;--delay:12s"></span>';
    document.body.insertBefore(sky, document.body.firstChild);
  }

  function injectHeader() {
    injectStarfield();
    var mount = document.getElementById('site-header');
    if (!mount) return;

    mount.innerHTML =
      '<a href="./" class="brand-badge" aria-label="NPT48 home">' +
        '<img src="assets/images/logo.png" alt="NPT48" width="500" height="500">' +
      '</a>' +
      '<header class="top-header">' +
        '<nav class="top-nav" aria-label="Main navigation">' + topNavHTML() + '</nav>' +
        '<div class="top-actions">' +
          socialRowHTML() +
          '<div class="pill-row">' +
            '<a class="pill pill-yellow" href="' + SOCIALS.instagram + '" target="_blank" rel="noopener">FOLLOW</a>' +
            '<a class="pill" href="' + SOCIALS.youtube + '" target="_blank" rel="noopener">WATCH</a>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<button type="button" class="menu-blob" id="menuBlob" aria-label="Open menu" aria-expanded="false" aria-controls="siteMenu">' +
        '<svg class="blob-shape" viewBox="0 0 128 108" aria-hidden="true"><path d="M24 10 C52 -6 104 0 120 26 C134 50 122 88 96 100 C68 112 30 106 14 86 C-2 66 -2 26 24 10Z"/></svg>' +
        '<span class="menu-blob-label" id="menuBlobLabel" aria-hidden="true">' + blobLabel('MENU') + '</span>' +
      '</button>' +
      '<div class="site-menu" id="siteMenu" role="dialog" aria-modal="true" aria-label="Site menu">' +
        '<div class="site-menu-main">' +
          '<nav class="site-menu-links" aria-label="Main navigation">' + navLinksHTML() + '</nav>' +
          socialRowHTML() +
        '</div>' +
        '<div class="site-menu-side">' +
          '<div class="side-emblem">' + ICON.emblem + '</div>' +
          '<div class="side-title">NPT48 Official</div>' +
          '<div class="pill-row">' +
            '<a class="pill pill-yellow" href="' + SOCIALS.instagram + '" target="_blank" rel="noopener">' + ICON.instagram + 'FOLLOW</a>' +
            '<a class="pill" href="' + SOCIALS.youtube + '" target="_blank" rel="noopener">' + ICON.youtube + 'WATCH</a>' +
          '</div>' +
          '<div class="side-links">' +
            '<a href="profile">MEMBERS</a>' +
            '<a href="discography">RELEASES</a>' +
            '<a href="./#movie">MOVIE</a>' +
            '<a href="about">OUR STORY</a>' +
            '<a href="https://www.akb48.co.jp/" target="_blank" rel="noopener">AKB48 GROUP</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    markActiveLinks();
    wireMenu();
  }

  function injectFooter() {
    var mount = document.getElementById('site-footer');
    if (!mount) return;

    var logos = GROUPS.map(function (g) {
      return '<a href="' + g[0] + '" target="_blank" rel="noopener"><img src="https://s.akb48.co.jp/v2/index/img/g_' + g[1] + '.png?ver=53" alt="' + g[2] + '" width="100" height="140" loading="lazy" decoding="async"></a>';
    }).join('');

    mount.innerHTML =
      '<footer class="site-footer">' +
        '<div class="footer-inner">' +
          '<a href="./" class="footer-logo" aria-label="NPT48 home"><img class="logo-crop" src="assets/images/logo.png" alt="NPT48" width="500" height="500" loading="lazy"></a>' +
          '<div class="footer-tagline">A NEW PLANET, A NEW LIGHT</div>' +
          socialRowHTML('footer-social') +
          '<div class="group-label">AKB48 GROUP</div>' +
          '<div class="logo-grid">' + logos + '</div>' +
          '<nav class="footer-links" aria-label="Footer">' +
            '<a href="./">Home</a><a href="profile">Profile</a><a href="discography">Discography</a><a href="about">About</a>' +
            '<a href="#">Contact Us</a><a href="#">Privacy Policy &amp; Terms</a>' +
          '</nav>' +
          '<div class="footer-copy">&copy; 2026 NPT48. All rights reserved.</div>' +
        '</div>' +
      '</footer>' +
      '<button type="button" class="page-top" id="pageTop" aria-label="Back to top">' + ICON.up + 'PAGE<br>TOP</button>';

    document.getElementById('pageTop').addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function markActiveLinks() {
    var page = currentPage();
    document.querySelectorAll('.site-menu-links a, .top-nav a').forEach(function (a) {
      if (a.getAttribute('data-page') === page) a.classList.add('active');
    });
  }

  function wireMenu() {
    var btn = document.getElementById('menuBlob');
    var label = document.getElementById('menuBlobLabel');
    var menu = document.getElementById('siteMenu');

    function setOpen(open) {
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      label.className = 'menu-blob-label' + (open ? ' is-close' : '');
      label.innerHTML = blobLabel(open ? 'CLOSE' : 'MENU');
      if (open) {
        var first = menu.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      } else {
        btn.focus({ preventScroll: true });
      }
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
    // classList.toggle is a no-op when the state doesn't change, so no rAF throttle needed
    function update() {
      document.body.classList.toggle('is-scrolled', window.scrollY > 120);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  window.NPT48_NAV = { navLinksHTML: navLinksHTML, socialRowHTML: socialRowHTML, emblem: ICON.emblem };

  // Header can be injected immediately (its placeholder is right after <body>).
  injectHeader();

  function onReady() {
    injectFooter();
    wireScrollState();
    // Pages may render a hero nav (home) — mark its active link too.
    markActiveLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
