// Mobile menu
const nav = document.querySelector('.nav');
const btn = document.querySelector('.menu-btn');
btn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});

// Years of service, always current
document.querySelectorAll('[data-years]').forEach(el => el.dataset.count = new Date().getFullYear() - 2007);
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// Scroll reveal + count-up
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target;
  el.classList.add('in');
  if (el.dataset.count) {
    const end = +el.dataset.count, t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / 1400, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  io.unobserve(el);
}), { threshold: .2 });
document.querySelectorAll('.reveal,[data-count]').forEach(el => io.observe(el));

// Floating donate appears only after the hero, so it never covers the first screen
const fab = document.querySelector('.float-donate');
addEventListener('scroll', () => fab?.classList.toggle('show', scrollY > 700), { passive: true });
