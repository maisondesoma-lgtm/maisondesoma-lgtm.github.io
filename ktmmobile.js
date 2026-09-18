/* kt M mobile — shared event data + common UI behaviour.
   Used by work-02.html (main) and ktm-event.html (detail). */
(function (global) {
  var IMG = 'images/ktmmobile/web/';

  // pc/mo: bleed colour behind the main banner art; theme: glyph colour for
  // the slider controls over it; listOnly: no main banner, list + detail only
  var events = [
    { n: '01', cat: '기획전', title: 'M마켓 상품권 실속전',        caption: '모바일 상품권 실속전 OPEN!',                     pc: '#fdc6ce', mo: '#fdc6ce', theme: 'light', ext: 'webp' },
    { n: '02', cat: '기획전', title: '밸런스게임 최대 35만원',      caption: '밸런스게임 참여하면 최대 35만원',                 pc: '#bccbf0', mo: '#bccbf0', theme: 'light', ext: 'gif'  },
    { n: '03', cat: '기획전', title: '아이폰 16 자급제 최대 20만원', caption: '아이폰 16 자급제 시리즈',                        pc: '#ffffff', mo: '#ffffff', theme: 'light', ext: 'webp' },
    { n: '04', cat: '기획전', title: '친구초대 리워드 X2배',        caption: '지금 친구초대하면 추천 리워드가 X2배!',           pc: '#ffe500', mo: '#ffe500', theme: 'light', ext: 'webp' },
    { n: '05', cat: '서비스', title: '캐치콜 플러스',               caption: '놓친 전화도 문자로 딱! 캐치콜 플러스',            pc: '#f8f8f8', mo: '#f8f8f8', theme: 'light', ext: 'webp' },
    { n: '06', cat: '요금제', title: '최저가 완전 무제한',           caption: '모두다 마음 놓고 쓰는 최저가 완전 무제한!',        pc: '#f9f9f9', mo: '#f9f9f9', theme: 'light', ext: 'webp' },
    { n: '07', cat: '요금제', title: '메가박스 요금제',              caption: '매월 영화 무료+콤보 할인',                       pc: '#060b29', mo: '#060b29', theme: 'dark',  ext: 'webp' },
    { n: '08', cat: '요금제', title: 'M모바일 오대장 요금제',        caption: '매일 쓰는 브랜드, 매달 할인 받는 오대장 요금제',   pc: '#141414', mo: '#141414', theme: 'dark',  ext: 'webp' },
    { n: '09', cat: '요금제', title: '월 2천원대 초알뜰 요금제',     caption: '월 2천원대 요금제로 똑똑하게 알뜰하게',           pc: '#1a62ff', mo: '#1a62ff', theme: 'dark',  ext: 'webp' },
    { n: '10', cat: '요금제', title: '가족 가입 5만원 증정',         caption: '지금 가족과 함께 가입하면 5만원 증정!',           pc: '#fade74', mo: '#fade74', theme: 'light', ext: 'webp' },
    { n: '11', cat: '제휴',   title: '모아진 매거진 구독 0원',       caption: '국내외 매거진 구독 0원!',                        pc: '#000000', mo: '#000000', theme: 'dark',  ext: 'webp' },
    { n: '12', cat: '제휴',   title: '올영/다이소 5천P 혜택',        caption: '무제한 요금제 반값으로 쓰자!',                    pc: '#111111', mo: '#111111', theme: 'dark',  ext: 'webp' },
    { n: '13', cat: '제휴',   title: '후후 안심직거래 보험',         caption: '후후 안심직거래 보험',                            listOnly: true }
  ];

  function byNo(n) {
    for (var i = 0; i < events.length; i++) if (events[i].n === n) return events[i];
    return null;
  }

  function detailUrl(e) { return 'ktm-event.html?e=' + e.n; }

  /* back-to-top: appears once you are a screen down, returns you to the top */
  function initTopButton() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'km-top';
    btn.setAttribute('aria-label', '맨 위로');
    btn.innerHTML = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
      '<path d="M8 13V3.5M3.5 8 8 3.5 12.5 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '<span class="c-hidden">맨 위로</span>';
    document.body.appendChild(btn);

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    var ticking = false;
    function update() {
      btn.classList.toggle('is-shown', window.scrollY > window.innerHeight * 0.6);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  global.KTM = { IMG: IMG, events: events, byNo: byNo, detailUrl: detailUrl, initTopButton: initTopButton };
})(window);
