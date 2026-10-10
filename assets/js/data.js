/* =========================================================
   NPT48 — Google Sheets data source helper
   Replace SCRIPT_URL with the Web App URL from your Apps Script
   deployment (see google-apps-script/Code.gs).
   ========================================================= */
(function (window) {
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4-QEjULha6TiDzBjyaEHYXHVX4DmStBjS2GjxQ3k8_U98r_RON5f8TEVTSFHK1Q/exec';

  function isConfigured() {
    return SCRIPT_URL && SCRIPT_URL.indexOf('http') === 0;
  }

  function getDirectImgLink(url, fallback) {
    fallback = fallback || 'assets/images/logo.png';
    if (!url) return fallback;
    if (url.indexOf('drive.google.com') !== -1) {
      var m = url.match(/[-\w]{25,}/);
      return m ? ('https://lh3.googleusercontent.com/d/' + m[0]) : fallback;
    }
    return url;
  }

  // Google's image hosts intermittently reject bursts of requests. On error,
  // alternate between lh3 and the Drive thumbnail endpoint with a growing
  // back-off, then give up and show the logo.
  var IMG_RETRIES = 4;
  function imgFallback(img) {
    var logo = 'assets/images/logo.png';
    var src = img.getAttribute('src') || '';
    var m = src.match(/(?:googleusercontent\.com\/d\/|thumbnail\?id=)([-\w]{25,})/);
    var tries = Number(img.dataset.retries || 0);
    if (m && tries < IMG_RETRIES) {
      img.dataset.retries = tries + 1;
      var next = tries % 2 === 0
        ? 'https://drive.google.com/thumbnail?id=' + m[1] + '&sz=w1000'
        : 'https://lh3.googleusercontent.com/d/' + m[1] + '=s1000';
      setTimeout(function () { img.src = next; }, 400 * (tries + 1));
    } else if (src.indexOf(logo) === -1) {
      img.src = logo;
    }
  }

  function fetchSheet(sheetName) {
    if (!isConfigured()) {
      return Promise.reject(new Error('SCRIPT_URL not configured'));
    }

    var cacheKey = 'npt48_sheet_' + sheetName;
    try {
      var cached = sessionStorage.getItem(cacheKey);
      if (cached) return Promise.resolve(JSON.parse(cached));
    } catch (e) { /* sessionStorage unavailable or corrupted cache — fall through to fetch */ }

    var url = SCRIPT_URL + '?sheet=' + encodeURIComponent(sheetName);
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('Network error: ' + res.status);
      return res.json();
    }).then(function (data) {
      try { sessionStorage.setItem(cacheKey, JSON.stringify(data)); } catch (e) { /* storage full or unavailable */ }
      return data;
    });
  }

  window.NPT48_DATA = {
    isConfigured: isConfigured,
    getDirectImgLink: getDirectImgLink,
    imgFallback: imgFallback,
    fetchSheet: fetchSheet
  };
})(window);
