/* Project page accordion — one page open at a time, opened from the top of
   its image — plus the back-to-top button. Shared by proj-01 … proj-06. */
(function () {
  var NAV = 64;

  document.querySelectorAll('.wp-acc__head').forEach(function (head) {
    head.addEventListener('click', function () {
      var item = head.parentElement;
      var open = !item.classList.contains('is-open');

      document.querySelectorAll('.wp-acc__item').forEach(function (other) {
        if (other === item || !other.classList.contains('is-open')) return;
        // collapse without animating: an animated collapse above would
        // slide the page while we are scrolling to the new one
        other.classList.add('is-instant');
        other.classList.remove('is-open');
        void other.offsetHeight;
        other.classList.remove('is-instant');
        other.querySelector('.wp-acc__head').setAttribute('aria-expanded', 'false');
      });

      item.classList.toggle('is-open', open);
      head.setAttribute('aria-expanded', open ? 'true' : 'false');

      if (!open) return;

      // Bring the top of the image to the top of the screen. The panel is
      // still collapsed at this point, so the page may be too short to
      // scroll that far — finish the move once it has expanded.
      var panel = item.querySelector('.wp-acc__panel');
      var toTop = function () {
        // measure the item, not the bar: once the bar is stuck under the nav
        // it always reads 64 and we would think we were already there
        window.scrollTo({ top: item.getBoundingClientRect().top + window.scrollY - NAV, behavior: 'smooth' });
      };
      panel.addEventListener('transitionend', function done(e) {
        if (e.propertyName !== 'grid-template-rows') return;
        panel.removeEventListener('transitionend', done);
        toTop();
      });
      toTop();
    });
  });

  /* back to top — appears once you are a screen down */
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'wp-top';
  btn.setAttribute('aria-label', '맨 위로');
  btn.innerHTML = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
    '<path d="M8 13V3.5M3.5 8 8 3.5 12.5 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.body.appendChild(btn);

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  var ticking = false;
  function update() {
  var footer = document.querySelector('.wp-nav-footer');
  var scrolledEnough = window.scrollY > window.innerHeight * 0.6;
  var footerVisible = false;

  if (footer) {
    var footerTop = footer.getBoundingClientRect().top;
    footerVisible = footerTop < window.innerHeight;
  }

  btn.classList.toggle('is-shown', scrolledEnough && !footerVisible);
  ticking = false;
}
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });
  update();
})();
