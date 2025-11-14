/* js/include.js */
(async function () {
  // Inject partials
  async function inject(selector, url) {
    const host = document.querySelector(selector);
    if (!host) return;
    const res = await fetch(url, { cache: "no-cache" });
    host.innerHTML = await res.text();
  }

  await inject('#site-header', 'partials/navbar.html');
  await inject('#site-footer', 'partials/footer.html');

  // After navbar is in DOM:
  const root = document.documentElement; // toggle .dark on <html>
  const btn = document.getElementById('theme-toggle');

  // Apply persisted theme
  const saved = localStorage.getItem('theme') || 'light';
  const applyTheme = (t) => {
    const isDark = t === 'dark';
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (btn) btn.setAttribute('aria-pressed', String(isDark));
  };
  applyTheme(saved);

  // Toggle handler
  if (btn) {
    btn.addEventListener('click', () => {
      applyTheme(root.classList.contains('dark') ? 'light' : 'dark');
    });
  }

  // Mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a[data-route]').forEach(a => {
    if (a.getAttribute('data-route') === path) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
