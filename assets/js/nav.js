/* =========================================================
   NPT48 — Floating navbar, bottom-sheet menu & postcard footer
   ========================================================= */
(function () {
  var NAV_LINKS = [
    { href: 'index.html', page: 'index', label: 'หน้าแรก', icon: 'fa-house' },
    { href: 'schedule.html', page: 'schedule', label: 'ตารางงาน', icon: 'fa-calendar-days' },
    { href: 'profile.html', page: 'profile', label: 'โปรไฟล์สมาชิก', icon: 'fa-users' },
    { href: 'discography.html', page: 'discography', label: 'ผลงานเพลง', icon: 'fa-compact-disc' },
    { href: 'about.html', page: 'about', label: 'เกี่ยวกับวง', icon: 'fa-mountain' }
  ];

  var NEWS_ITEMS = [
    'NPT48 Official Site เปิดตัวแล้ว!',
    'ติดตามข่าวสารเร็วๆ นี้',
    '1st Single "Kaze Wo Matsu" กำลังมา'
  ];

  function currentPage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var name = path.replace('.html', '');
    return name === '' ? 'index' : name;
  }

  function navLinksHTML(withIcon) {
    return NAV_LINKS.map(function (l) {
      var icon = withIcon ? '<i class="fas ' + l.icon + '" aria-hidden="true"></i> ' : '';
      return '<a href="' + l.href + '" data-page="' + l.page + '">' + icon + l.label + '</a>';
    }).join('');
  }

  function injectNavbar() {
    var mount = document.getElementById('site-header');
    if (!mount) return;

    mount.innerHTML =
      '<div class="scrap-bg" aria-hidden="true">' +
        '<span style="top:8%;left:6%"><i class="fas fa-water"></i></span><span style="top:60%;left:2%"><i class="fas fa-star"></i></span>' +
        '<span style="top:20%;right:5%"><i class="fas fa-mountain"></i></span><span style="top:75%;right:8%"><i class="fas fa-cloud"></i></span>' +
      '</div>' +
      '<div class="navbar-wrap">' +
        '<nav class="navbar" aria-label="Main navigation">' +
          '<span class="news-sticker" id="newsSticker"></span>' +
          '<a href="index.html" class="navbar-logo">' +
            '<img src="assets/images/logo.png" alt="NPT48">' +
            '<span>NPT48</span>' +
          '</a>' +
          '<div class="navbar-links">' + navLinksHTML(false) + '</div>' +
          '<button type="button" class="navbar-burger" id="navBurger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
        '</nav>' +
      '</div>' +
      '<div class="sheet-backdrop" id="sheetBackdrop"></div>' +
      '<div class="mobile-sheet" id="mobileSheet">' +
        '<div class="sheet-handle"></div>' +
        '<nav class="sheet-links" aria-label="Mobile navigation">' + navLinksHTML(true) + '</nav>' +
      '</div>';

    markActiveLinks();
    wireNavbarEvents();
    startNewsRotation();
  }

  function injectFooter() {
    var mount = document.getElementById('site-footer');
    if (!mount) return;

    mount.innerHTML =
      '<footer class="footer-postcard">' +
        '<div class="scrap-bg" aria-hidden="true">' +
          '<span style="top:10%;left:8%"><i class="fas fa-mountain"></i></span><span style="top:70%;left:4%"><i class="fas fa-star"></i></span>' +
          '<span style="top:15%;right:6%"><i class="fas fa-water"></i></span><span style="top:65%;right:10%"><i class="fas fa-cloud"></i></span>' +
        '</div>' +
        '<div class="footer-grid">' +
          '<div class="footer-top">' +
            '<div>' +
              '<div class="footer-brand">NPT48 OFFICIAL SITE</div>' +
              '<div class="footer-note font-accent">จากขุนเขาสู่ท้องทะเล เสียงเพลงจากธรรมชาติ</div>' +
            '</div>' +
            '<div class="footer-social">' +
              '<a href="#" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>' +
              '<a href="#" target="_blank" aria-label="X">' +
                '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
              '</a>' +
              '<a href="#" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>' +
              '<a href="#" target="_blank" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>' +
              '<a href="#" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<div>' +
              '<ul class="footer-links">' +
                '<li><a href="about.html">เกี่ยวกับวง</a></li>' +
                '<li><a href="#">นโยบายความเป็นส่วนตัว</a></li>' +
                '<li><a href="#">ข้อกำหนดการใช้งาน</a></li>' +
                '<li><a href="#">ติดต่อเรา</a></li>' +
              '</ul>' +
              '<div class="footer-copyright">&copy; 2026 NPT48. สงวนลิขสิทธิ์ทุกประการ</div>' +
            '</div>' +
            '<button type="button" class="top-btn" id="topBtn" aria-label="กลับด้านบน"><i class="fas fa-arrow-up"></i></button>' +
          '</div>' +
        '</div>' +
      '</footer>';

    var topBtn = document.getElementById('topBtn');
    if (topBtn) {
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function markActiveLinks() {
    var page = currentPage();
    document.querySelectorAll('.navbar-links a, .sheet-links a').forEach(function (a) {
      if (a.getAttribute('data-page') === page) a.classList.add('active');
    });
  }

  function startNewsRotation() {
    var el = document.getElementById('newsSticker');
    if (!el) return;
    var i = 0;
    el.textContent = NEWS_ITEMS[0];
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    setInterval(function () {
      i = (i + 1) % NEWS_ITEMS.length;
      el.style.opacity = 0;
      setTimeout(function () {
        el.textContent = NEWS_ITEMS[i];
        el.style.opacity = 1;
      }, 220);
    }, 3800);
  }

  function closeSheet() {
    var sheet = document.getElementById('mobileSheet');
    var backdrop = document.getElementById('sheetBackdrop');
    var burger = document.getElementById('navBurger');
    if (sheet) sheet.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openSheet() {
    var sheet = document.getElementById('mobileSheet');
    var backdrop = document.getElementById('sheetBackdrop');
    var burger = document.getElementById('navBurger');
    if (sheet) sheet.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function wireNavbarEvents() {
    var burger = document.getElementById('navBurger');
    var backdrop = document.getElementById('sheetBackdrop');
    var sheet = document.getElementById('mobileSheet');

    if (burger) burger.addEventListener('click', openSheet);
    if (backdrop) backdrop.addEventListener('click', closeSheet);
    if (sheet) {
      sheet.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeSheet); });
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });
  }

  injectNavbar();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }
})();
