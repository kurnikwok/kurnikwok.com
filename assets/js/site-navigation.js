(() => {
  const header = document.querySelector('.site-header');
  const shell = document.querySelector('[data-primary-nav-shell]');
  const nav = document.querySelector('[data-primary-nav]');
  const toggle = document.querySelector('.all-pages-toggle');
  const panel = document.getElementById('all-pages-panel');
  const closeButton = panel ? panel.querySelector('.all-pages-close') : null;

  if (!header || !shell || !nav || !toggle || !panel) return;

  let savedScrollY = 0;
  let viewportListenerAttached = false;

  markCurrentPanelLink();
  updateNavFadeState();
  updateMenuGeometry();

  nav.addEventListener('scroll', updateNavFadeState, { passive: true });
  window.addEventListener('resize', () => {
    updateNavFadeState();
    updateMenuGeometry();
  }, { passive: true });

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') closeMenu();
    else openMenu();
  });

  if (closeButton) closeButton.addEventListener('click', closeMenu);

  panel.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (panel.hidden) return;
    if (shell.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) closeMenu();
  });

  function openMenu() {
    savedScrollY = window.scrollY || window.pageYOffset || 0;
    updateMenuGeometry();
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('nav-menu-open');
    document.body.classList.add('nav-menu-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    attachViewportListener();
  }

  function closeMenu() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    detachViewportListener();
    document.documentElement.classList.remove('nav-menu-open');
    document.body.classList.remove('nav-menu-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, savedScrollY);
    toggle.focus({ preventScroll: true });
  }

  function updateNavFadeState() {
    const tolerance = 2;
    const canScrollLeft = nav.scrollLeft > tolerance;
    const canScrollRight = nav.scrollLeft + nav.clientWidth < nav.scrollWidth - tolerance;
    shell.classList.toggle('can-scroll-left', canScrollLeft);
    shell.classList.toggle('can-scroll-right', canScrollRight);
  }

  function updateMenuGeometry() {
    const headerRect = header.getBoundingClientRect();
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const navBottom = Math.max(0, headerRect.bottom) + 8;
    document.documentElement.style.setProperty('--site-nav-bottom', `${navBottom}px`);
    document.documentElement.style.setProperty('--vvh', `${viewportHeight}px`);
  }

  function attachViewportListener() {
    if (viewportListenerAttached || !window.visualViewport) return;
    window.visualViewport.addEventListener('resize', updateMenuGeometry);
    window.visualViewport.addEventListener('scroll', updateMenuGeometry);
    viewportListenerAttached = true;
  }

  function detachViewportListener() {
    if (!viewportListenerAttached || !window.visualViewport) return;
    window.visualViewport.removeEventListener('resize', updateMenuGeometry);
    window.visualViewport.removeEventListener('scroll', updateMenuGeometry);
    viewportListenerAttached = false;
  }

  function markCurrentPanelLink() {
    const currentPath = normalisePath(window.location.pathname);
    panel.querySelectorAll('a[href^="/"]').forEach((link) => {
      if (normalisePath(link.getAttribute('href')) === currentPath) link.setAttribute('aria-current', 'page');
    });
  }

  function normalisePath(value) {
    let p = value || '/';
    p = p.replace(/\/index\.html$/i, '/');
    if (!p.endsWith('/')) p += '/';
    return p;
  }
})();
