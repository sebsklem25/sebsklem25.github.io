/* js/include.js */
(async function () {
  // ------- Inject partials -------
  async function inject(selector, url) {
    const host = document.querySelector(selector);
    if (!host) return;
    const res = await fetch(url, { cache: "no-cache" });
    host.innerHTML = await res.text();
  }

  // Wait for navbar + footer to load
  await inject("#site-header", "partials/navbar.html");
  await inject("#site-footer", "partials/footer.html");

  // ------- Theme toggle (emoji + persistence) -------
  const root = document.documentElement; // we toggle .dark on <html>
  const btn = document.getElementById("theme-toggle");

  if (btn) {
    const stored = localStorage.getItem("theme");
    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = stored || (systemPrefersDark ? "dark" : "light");

    function applyTheme(theme) {
      const isDark = theme === "dark";

      // Toggle class on <html>
      root.classList.toggle("dark", isDark);

      // Update button state
      btn.dataset.theme = theme;
      btn.setAttribute("aria-pressed", String(isDark));

      if (isDark) {
        btn.textContent = "🌙";
        btn.setAttribute("aria-label", "Use light theme");
      } else {
        btn.textContent = "🌞";
        btn.setAttribute("aria-label", "Use dark theme");
      }

      // Remember choice
      localStorage.setItem("theme", theme);
    }

    // Initial load
    applyTheme(initialTheme);

    // On click, flip between light/dark
    btn.addEventListener("click", () => {
      const next = btn.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  // ------- Mark active nav link -------
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a[data-route]").forEach((a) => {
    if (a.getAttribute("data-route") === path) {
      a.setAttribute("aria-current", "page");
    }
  });

  // ------- Footer year -------
  const y = document.getElementById("year");
  if (y) {
    y.textContent = new Date().getFullYear();
  }
})();
