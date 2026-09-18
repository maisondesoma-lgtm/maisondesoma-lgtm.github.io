/* scroll reveal */
const revealEls = document.querySelectorAll(
  '.work__header, .project-row, .about__left, .about__right, .contact__top, .contact__bottom'
);

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = `${i * 60}ms`;
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 }
);

revealEls.forEach((el) => {
  el.classList.add('reveal');
  io.observe(el);
});

/* project row hover color */
document.querySelectorAll('.project-row').forEach((row) => {
  const color = row.dataset.color;
  row.addEventListener('mouseenter', () => {
    row.style.setProperty('--row-bg', color);
  });
});
