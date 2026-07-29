/* =========================================================
   NPT48 — Language Dictionary & Apply Helper
   Supported: th (default), en, ja
   ========================================================= */
(function (window) {
  var STORAGE_KEY = 'npt48_lang';
  var DEFAULT_LANG = 'en';

  var translations = {
    th: {
      nav_home: "หน้าแรก",
      nav_about: "เกี่ยวกับวง",
      nav_profile: "โปรไฟล์สมาชิก",
      nav_discography: "ผลงานเพลง",
      badge_release: "วางจำหน่าย",

      footer_privacy: "นโยบายความเป็นส่วนตัว",
      footer_terms: "ข้อกำหนดการใช้งาน",
      footer_contact: "ติดต่อเรา",
      footer_rights: "สงวนลิขสิทธิ์ทุกประการ",
      footer_pagetop: "กลับด้านบน",
      ticker_label: "ข่าวล่าสุด",

      today_label: "วันนี้ของ NPT48",
      badge_media: "สื่อ",
      badge_live: "ไลฟ์",
      badge_event: "อีเวนต์",
      more_label: "ดูเพิ่มเติม",
      members_title: "สมาชิก",
      members_cta: "ดูสมาชิกทั้งหมด",

      about_header: "เกี่ยวกับเรา",
      about_p1: "NPT48 คือกลุ่มไอดอลที่ได้แรงบันดาลใจจากธรรมชาติของภูเขาและท้องทะเล",
      about_p2: "NPT48 นำเสนอดนตรีและการแสดงที่ถ่ายทอดความรู้สึกเย็นสบายของขุนเขาและความสดชื่นของท้องทะเล ผ่านสีประจำวง #66cbff ที่สื่อถึงท้องฟ้าและผืนน้ำอันกว้างใหญ่",
      about_p3: "คำว่า “ธรรมชาติ” สื่อถึงความเรียบง่าย ความจริงใจ และการเติบโตไปพร้อมกับสภาพแวดล้อมรอบตัว NPT48 จึงเป็นพื้นที่สร้างสรรค์ที่สมาชิกได้เรียนรู้ แสดงออกถึงตัวตน และเติบโตไปพร้อมกับเหล่าแฟนคลับ",
      about_p4: "กลุ่มมุ่งเน้นการแสดงที่จริงใจและเข้าถึงง่าย พร้อมส่งต่อพลังบวก ความสดชื่น และรอยยิ้มแบบธรรมชาติสู่ผู้ชมทุกที่",
      about_slogan: "NPT48 – จากขุนเขาสู่ท้องทะเล เสียงเพลงจากธรรมชาติ",

      profile_header: "โปรไฟล์สมาชิก",
      tab_all: "ทั้งหมด",
      loading_text: "กำลังโหลดข้อมูล NPT48...",
      load_error: "ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่ภายหลัง",
      back_btn: "ย้อนกลับ",
      btn_profile: "โปรไฟล์",
      label_generation: "รุ่น",
      label_team: "ทีม",
      label_birthday: "วันเกิด",
      label_oshimark: "โอชิมาร์ค",
      label_province: "จังหวัด",
      label_bloodtype: "กรุ๊ปเลือด",
      label_like: "สิ่งที่ชอบ",
      label_hobby: "งานอดิเรก",

      disco_header: "ผลงานเพลง",
      filter_all: "ทั้งหมด",
      filter_single: "ซิงเกิล",
      filter_album: "อัลบั้ม",
      watch_mv: "ชม MV"
    },

    en: {
      nav_home: "HOME",
      nav_about: "ABOUT NPT48?",
      nav_profile: "PROFILE",
      nav_discography: "DISCOGRAPHY",
      badge_release: "RELEASE",

      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_rights: "All Rights Reserved.",
      footer_pagetop: "PAGE TOP",
      ticker_label: "LATEST UPDATES",

      today_label: "TODAY'S NPT48",
      badge_media: "MEDIA",
      badge_live: "LIVE",
      badge_event: "EVENT",
      more_label: "MORE",
      members_title: "MEMBERS",
      members_cta: "SEE ALL MEMBERS",

      about_header: "ABOUT",
      about_p1: "NPT48 is an idol group inspired by the mountains and the sea.",
      about_p2: "NPT48 brings music and performances that carry the cool calm of the mountains and the freshness of the ocean, expressed through our brand color #66cbff — the color of open sky and water.",
      about_p3: "The word “Nature” represents simplicity, sincerity, and growing together with the world around us. NPT48 serves as a creative space where members can learn, express themselves, and grow alongside their fans.",
      about_p4: "The group focuses on sincere, approachable performances, sharing positive energy, freshness, and natural smiles with audiences everywhere.",
      about_slogan: "NPT48 – From the mountains to the sea, songs from nature.",

      profile_header: "PROFILE",
      tab_all: "ALL",
      loading_text: "LOADING NPT48...",
      load_error: "Unable to load data. Please try again later.",
      back_btn: "BACK",
      btn_profile: "PROFILE",
      label_generation: "Generation",
      label_team: "Team",
      label_birthday: "Birthday",
      label_oshimark: "Oshimark",
      label_province: "Province",
      label_bloodtype: "Blood Type",
      label_like: "Like",
      label_hobby: "Hobby",

      disco_header: "DISCOGRAPHY",
      filter_all: "ALL",
      filter_single: "SINGLE",
      filter_album: "ALBUM",
      watch_mv: "WATCH MV"
    },

    ja: {
      nav_home: "ホーム",
      nav_about: "概要",
      nav_profile: "メンバー",
      nav_discography: "ディスコグラフィー",
      badge_release: "リリース",

      footer_privacy: "プライバシーポリシー",
      footer_terms: "利用規約",
      footer_contact: "お問い合わせ",
      footer_rights: "無断複写・転載を禁じます。",
      footer_pagetop: "ページトップ",
      ticker_label: "最新情報",

      today_label: "本日のNPT48",
      badge_media: "メディア",
      badge_live: "ライブ",
      badge_event: "イベント",
      more_label: "もっと見る",
      members_title: "メンバー",
      members_cta: "メンバー一覧を見る",

      about_header: "概要",
      about_p1: "NPT48は、山と海からインスピレーションを受けたアイドルグループです。",
      about_p2: "NPT48は、山の涼やかな静けさと海の爽やかさを、ブランドカラー#66cbff — 広い空と水の色 — を通じて音楽とパフォーマンスに表現します。",
      about_p3: "「自然」という言葉は、シンプルさ、誠実さ、そして周りの環境と共に成長することを表しています。NPT48はメンバーが学び、自分を表現し、ファンと共に成長していく創造的な場所です。",
      about_p4: "グループは誠実で親しみやすいパフォーマンスを大切にし、前向きなエネルギーと爽やかさ、自然な笑顔を世界中の観客と分かち合うことを目指しています。",
      about_slogan: "NPT48 – 山から海へ、自然が奏でる歌。",

      profile_header: "メンバープロフィール",
      tab_all: "すべて",
      loading_text: "読み込み中...",
      load_error: "データを読み込めませんでした。後でもう一度お試しください。",
      back_btn: "戻る",
      btn_profile: "プロフィール",
      label_generation: "期生",
      label_team: "チーム",
      label_birthday: "誕生日",
      label_oshimark: "推しマーク",
      label_province: "出身",
      label_bloodtype: "血液型",
      label_like: "好きなもの",
      label_hobby: "趣味",

      disco_header: "ディスコグラフィー",
      filter_all: "すべて",
      filter_single: "シングル",
      filter_album: "アルバム",
      watch_mv: "MVを見る"
    }
  };

  function getLang() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    if (!translations[lang]) lang = DEFAULT_LANG;
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyLang(lang);
  }

  function t(key, lang) {
    lang = lang || getLang();
    var dict = translations[lang] || translations[DEFAULT_LANG];
    return dict[key] || translations[DEFAULT_LANG][key] || key;
  }

  function applyLang(lang) {
    if (!translations[lang]) lang = DEFAULT_LANG;
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.textContent = t(key, lang);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder'), lang));
    });

    document.dispatchEvent(new CustomEvent('npt48:langchange', { detail: { lang: lang } }));
  }

  window.NPT48_I18N = {
    translations: translations,
    getLang: getLang,
    setLang: setLang,
    applyLang: applyLang,
    t: t
  };
})(window);
