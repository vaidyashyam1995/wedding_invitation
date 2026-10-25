const target = new Date('2026-11-20T09:57:00+05:30').getTime();
const el = id => document.getElementById(id);
let timer;
function tick() {
  const d = target - Date.now();
  if (d <= 0) {
    el('countdown').innerHTML = '<h2 style="width:100%">❤️ The Wedding Day Has Arrived!</h2>';
    clearInterval(timer);
    return;
  }
  const v = [Math.floor(d / 864e5), Math.floor(d % 864e5 / 36e5), Math.floor(d % 36e5 / 6e4), Math.floor(d % 6e4 / 1e3)];
  ['days', 'hours', 'minutes', 'seconds'].forEach((x, i) => el(x).textContent = String(v[i]).padStart(2, '0'));
}
tick();
timer = setInterval(tick, 1000);

// Scroll reveal
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15 });
  items.forEach(i => io.observe(i));
} else items.forEach(i => i.classList.add('in'));

// Gentle falling marigold petals
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const box = document.getElementById('petals');
  const cols = ['#f2b705', '#e65100', '#ffb300', '#c62828'];
  setInterval(() => {
    if (document.hidden || box.childElementCount > 22) return;
    const p = document.createElement('i');
    p.className = 'petal';
    p.style.cssText = `left:${Math.random() * 100}%;background:${cols[Math.random() * 4 | 0]};` +
      `--dx:${Math.random() * 120 - 60}px;--r:${Math.random() * 720}deg;animation-duration:${8 + Math.random() * 6}s`;
    box.appendChild(p);
    setTimeout(() => p.remove(), 14500);
  }, 700);
}

// Small bells hanging off the side garlands
document.querySelectorAll('.side').forEach(s => {
  for (let y = 150, n = 0; y < innerHeight - 60; y += 170, n++) {
    const b = document.createElement('i');
    b.className = 'bell';
    b.style.top = y + 'px';
    b.style.animationDelay = (-n * .7) + 's';
    s.appendChild(b);
  }
});