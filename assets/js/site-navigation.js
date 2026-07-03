(() => {
  const header = document.querySelector('.site-header');
  const shell = document.querySelector('[data-primary-nav-shell]');
  const topbar = header ? header.querySelector('.topbar') || header : null;
  const nav = document.querySelector('[data-primary-nav]');
  const toggle = document.querySelector('.all-pages-toggle');
  const panel = document.getElementById('all-pages-panel');
  const closeButton = panel ? panel.querySelector('.all-pages-close') : null;

  if (!header || !topbar || !shell || !nav || !toggle || !panel) return;

  let viewportListenerAttached = false;
  let windowScrollListenerAttached = false;

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
    if (event.target.closest('a')) closeMenu({ skipFocus: true });
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
    updateMenuGeometry();
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    attachViewportListener();
    attachWindowScrollListener();
    window.requestAnimationFrame(updateMenuGeometry);
  }

  function closeMenu(options = {}) {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    detachViewportListener();
    detachWindowScrollListener();
    if (!options.skipFocus) toggle.focus({ preventScroll: true });
  }

  function updateNavFadeState() {
    const tolerance = 2;
    const canScrollLeft = nav.scrollLeft > tolerance;
    const canScrollRight = nav.scrollLeft + nav.clientWidth < nav.scrollWidth - tolerance;
    shell.classList.toggle('can-scroll-left', canScrollLeft);
    shell.classList.toggle('can-scroll-right', canScrollRight);
  }

  function updateMenuGeometry() {
    const topbarRect = topbar.getBoundingClientRect();
    const viewport = window.visualViewport;
    const viewportHeight = viewport ? viewport.height : window.innerHeight;
    const viewportWidth = viewport ? viewport.width : window.innerWidth;
    const panelGap = 8;
    const navBottom = Math.max(0, topbarRect.bottom) + panelGap;
    const menuLeft = Math.max(0, topbarRect.left);
    const menuWidth = Math.max(0, Math.min(topbarRect.width, viewportWidth - menuLeft));
    document.documentElement.style.setProperty('--site-nav-bottom', `${navBottom}px`);
    document.documentElement.style.setProperty('--site-menu-left', `${menuLeft}px`);
    document.documentElement.style.setProperty('--site-menu-width', `${menuWidth}px`);
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

  function attachWindowScrollListener() {
    if (windowScrollListenerAttached) return;
    window.addEventListener('scroll', updateMenuGeometry, { passive: true });
    windowScrollListenerAttached = true;
  }

  function detachWindowScrollListener() {
    if (!windowScrollListenerAttached) return;
    window.removeEventListener('scroll', updateMenuGeometry);
    windowScrollListenerAttached = false;
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
