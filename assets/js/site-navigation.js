(() => {
  const header = document.querySelector('.site-header');
  const shell = document.querySelector('[data-primary-nav-shell]');
  const nav = document.querySelector('[data-primary-nav]');
  const toggle = document.querySelector('.all-pages-toggle');
  const panel = document.getElementById('all-pages-panel');
  const closeButton = panel ? panel.querySelector('.all-pages-close') : null;
  const backdrop = document.createElement('div');
  backdrop.className = 'all-pages-backdrop';
  backdrop.hidden = true;
  backdrop.setAttribute('aria-hidden', 'true');

  if (!header || !shell || !nav || !toggle || !panel) return;

  document.body.appendChild(backdrop);

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
  backdrop.addEventListener('click', closeMenu);
  backdrop.addEventListener('touchmove', preventDefault, { passive: false });
  backdrop.addEventListener('wheel', preventDefault, { passive: false });

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
    document.documentElement.classList.add('all-pages-open');
    document.body.classList.add('all-pages-open');
    header.classList.add('all-pages-open');
    backdrop.hidden = false;
    updateMenuGeometry();
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    attachViewportListener();
    attachWindowScrollListener();
    window.requestAnimationFrame(updateMenuGeometry);
  }

  function closeMenu(options = {}) {
    panel.hidden = true;
    backdrop.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('all-pages-open');
    document.body.classList.remove('all-pages-open');
    header.classList.remove('all-pages-open');
    detachViewportListener();
    detachWindowScrollListener();
    updateMenuGeometry();
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
    const headerRect = header.getBoundingClientRect();
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const navBottom = Math.max(0, headerRect.bottom);
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

  function preventDefault(event) {
    event.preventDefault();
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
