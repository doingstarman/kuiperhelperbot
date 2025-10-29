(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    try {
      tg.expand();
      tg.ready();
      tg.disableVerticalSwipes?.();
    } catch (error) {
      console.warn('[miniapp] telegram webapp init failed', error);
    }
  }

  const view = document.getElementById('view');
  const backBtn = document.getElementById('backBtn');
  const header = document.querySelector('.app-header');

  const routes = {
    home() {
      view.innerHTML = `
        <div class="home-screen">
          <header>
            <h1 class="home-title">waitingstarman</h1>
            <p class="home-subtitle">Привет! Выбери, что тебя интересует</p>
          </header>
          <div class="neumo-stack">
            <button class="neumo-button" data-nav="contact"><span>Связь со мной</span></button>
            <button class="neumo-button" data-nav="links"><span>Интересные ссылки</span></button>
          </div>
        </div>
      `;
    },
    contact() {
      const username = window.APP_LINKS?.TG_USERNAME || '';
      const link = window.APP_LINKS?.CONTACT_TG_URL || '#';
      view.innerHTML = `
        <section class="card">
          <p>Нажмите, чтобы написать <strong>@${username}</strong> в Telegram.</p>
        </section>
        <a class="btn3d" href="${link}">Открыть чат</a>
      `;
    },
    links() {
      const { KUIPER_URL, GITHUB_URL, INSTAGRAM_URL } = window.APP_LINKS || {};
      view.innerHTML = `
        <section class="card">
          <p class="muted">Все важные площадки Kuiper Belt — выбирайте и переходите.</p>
        </section>
        <a class="btn3d btn-kuiper" href="${KUIPER_URL}" target="_blank" rel="noopener">Сайт Kuiper Belt</a>
        <a class="btn3d btn-github" href="${GITHUB_URL}" target="_blank" rel="noopener">GitHub</a>
        <a class="btn3d btn-ig" href="${INSTAGRAM_URL}" target="_blank" rel="noopener">Instagram</a>
      `;
    },
  };

  function render() {
    const hash = location.hash.replace('#', '') || 'home';
    routes[hash]?.();
    const isHome = hash === 'home';
    view.classList.toggle('view-home', isHome);
    view.classList.toggle('view-inner', !isHome);
    if (header) {
      header.style.display = isHome ? 'none' : 'flex';
    }
    backBtn.disabled = isHome;
    backBtn.classList.toggle('back-button--disabled', isHome);
  }

  // Navigation handlers
  view.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-nav]');
    if (!btn) return;
    const to = btn.getAttribute('data-nav');
    location.hash = `#${to}`;
  });

  backBtn.addEventListener('click', () => {
    const hash = location.hash.replace('#', '') || 'home';
    if (hash === 'home') return;
    history.back();
    // fallback
    setTimeout(() => {
      if (!location.hash) render();
    }, 150);
  });

  window.addEventListener('hashchange', render);
  render();
})();
