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

  function fetchSheet(sheetName) {
    if (!isConfigured()) {
      return Promise.reject(new Error('SCRIPT_URL not configured'));
    }
    var url = SCRIPT_URL + '?sheet=' + encodeURIComponent(sheetName);
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('Network error: ' + res.status);
      return res.json();
    });
  }

  window.NPT48_DATA = {
    isConfigured: isConfigured,
    getDirectImgLink: getDirectImgLink,
    fetchSheet: fetchSheet
  };
})(window);
