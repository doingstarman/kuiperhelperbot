(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    try {
      tg.expand();
      tg.ready();
      tg.disableVerticalSwipes?.();
    } catch {}
  }

  const view = document.getElementById('view');
  const backBtn = document.getElementById('backBtn');

  const routes = {
    home() {
      view.innerHTML = `
        <section class="card">
          <p class="muted">Добро пожаловать в мою мини‑страницу.</p>
        </section>
        <button class="btn3d" data-nav="contact">Связь со мной</button>
        <button class="btn3d" data-nav="links">Интересные ссылки</button>
      `;
    },
    contact() {
      const link = window.APP_LINKS?.CONTACT_TG_URL || '#';
      view.innerHTML = `
        <section class="card">
          <p>Написать в Telegram: <strong>@${window.APP_LINKS?.TG_USERNAME || ''}</strong></p>
        </section>
        <a class="btn3d" href="${link}">Открыть чат в Telegram</a>
      `;
    },
    links() {
      const { KUIPER_URL, GITHUB_URL, INSTAGRAM_URL } = window.APP_LINKS || {};
      view.innerHTML = `
        <section class="card">
          <p class="muted">Ссылки на проекты и соцсети</p>
        </section>
        <a class="btn3d btn-kuiper" href="${KUIPER_URL}" target="_blank" rel="noopener">Сайт Kuiper Belt</a>
        <a class="btn3d btn-github" href="${GITHUB_URL}" target="_blank" rel="noopener">GitHub</a>
        <a class="btn3d btn-ig" href="${INSTAGRAM_URL}" target="_blank" rel="noopener">Instagram</a>
      `;
    }
  };

  function render() {
    const hash = location.hash.replace('#','') || 'home';
    routes[hash]?.();
    backBtn.style.visibility = hash === 'home' ? 'hidden' : 'visible';
  }

  // Navigation handlers
  view.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-nav]');
    if (!btn) return;
    const to = btn.getAttribute('data-nav');
    location.hash = `#${to}`;
  });

  backBtn.addEventListener('click', () => {
    const hash = location.hash.replace('#','') || 'home';
    if (hash === 'home') return;
    history.back();
    // fallback
    setTimeout(() => { if (!location.hash) render(); }, 150);
  });

  window.addEventListener('hashchange', render);
  render();
})();

