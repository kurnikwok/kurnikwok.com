(() => {
  const path = normalisePath(window.location.pathname);
  if (['/glossary/', '/faq/', '/sitemap/'].includes(path)) return;

  const main = document.querySelector('main');
  if (!main) return;

  /*
   * Popovers are intended as lightweight help in ordinary prose.
   * Suppress them in components that already define, compare, route or
   * explain glossary terms, so readers do not get definition-on-definition.
   */
  const EXCLUDED_SELECTOR = [
    'a', 'button', 'input', 'textarea', 'select', 'option',
    'script', 'style', 'code', 'pre', 'kbd', 'samp',
    'nav', 'header', 'footer',
    'summary', 'details', 'details > summary',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    'dl', 'dt', 'dd',
    'figure', 'figcaption',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    '.breadcrumbs', '.eyebrow', '.badge',
    '.sitemap-card', '.sitemap-grid', '.link-note',
    '.figure-section', '.concept-diagram', '.figure-card', '.diagram-note',
    '.actions',
    '.no-glossary-popovers', '[data-no-glossary-popovers]'
  ].join(',');

  const popover = document.createElement('div');
  popover.className = 'glossary-popover';
  popover.id = 'glossary-popover';
  popover.setAttribute('role', 'tooltip');
  popover.hidden = true;
  popover.innerHTML = '<strong></strong><p></p><a href="/glossary/">Open definition</a>';
  document.body.appendChild(popover);

  const titleEl = popover.querySelector('strong');
  const bodyEl = popover.querySelector('p');
  const linkEl = popover.querySelector('a');
  let activeTerm = null;
  let hideTimer = 0;
  let lastPointerType = 'mouse';

  loadGlossaryTerms().then((terms) => {
    if (!terms.length) return;
    annotateTerms(terms);
    bindPopoverEvents();
  }).catch(() => {});

  function normalisePath(value) {
    let p = value || '/';
    p = p.replace(/\/index\.html$/i, '/');
    if (!p.endsWith('/')) p += '/';
    return p;
  }

  async function loadGlossaryTerms() {
    const response = await fetch('/glossary/', { cache: 'force-cache' });
    if (!response.ok) return [];
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const terms = Array.from(doc.querySelectorAll('dl dt')).map((dt) => {
      const name = (dt.textContent || '').trim().replace(/\s+/g, ' ');
      const dd = dt.nextElementSibling && dt.nextElementSibling.tagName.toLowerCase() === 'dd' ? dt.nextElementSibling : null;
      const a = dt.querySelector('a');
      const definition = dd ? (dd.textContent || '').trim().replace(/\s+/g, ' ') : '';
      const url = a ? a.getAttribute('href') : `/glossary/#${dt.id}`;
      return { id: dt.id, name, definition, url };
    }).filter((term) => term.id && term.name && term.definition);

    const currentSlug = path.split('/').filter(Boolean).pop() || '';
    return terms
      .filter((term) => term.id !== currentSlug)
      .sort((a, b) => b.name.length - a.name.length);
  }

  function annotateTerms(terms) {
    const used = new Set();
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.closest(EXCLUDED_SELECTOR)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);

    for (const textNode of nodes) {
      if (!textNode.isConnected) continue;
      const frag = buildFragment(textNode.nodeValue, terms, used);
      if (frag) textNode.replaceWith(frag);
      if (used.size >= terms.length) break;
    }
  }

  function buildFragment(text, terms, used) {
    let cursor = 0;
    let changed = false;
    const frag = document.createDocumentFragment();

    while (cursor < text.length) {
      const found = findNextTerm(text, cursor, terms, used);
      if (!found) break;

      if (found.start > cursor) frag.appendChild(document.createTextNode(text.slice(cursor, found.start)));
      const punctuation = getAttachedPunctuation(text, found.end);
      frag.appendChild(makeTermPhrase(found.term, text.slice(found.start, found.end), punctuation));
      used.add(found.term.id);
      cursor = found.end + punctuation.length;
      changed = true;
    }

    if (!changed) return null;
    if (cursor < text.length) frag.appendChild(document.createTextNode(text.slice(cursor)));
    return frag;
  }

  function findNextTerm(text, startAt, terms, used) {
    let best = null;
    const segment = text.slice(startAt);

    for (const term of terms) {
      if (used.has(term.id)) continue;
      const match = matchTerm(segment, term.name);
      if (!match) continue;
      const start = startAt + match.index;
      const end = start + match.text.length;
      if (!best || start < best.start || (start === best.start && term.name.length > best.term.name.length)) {
        best = { term, start, end };
      }
    }
    return best;
  }

  function matchTerm(text, termName) {
    const escaped = termName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^A-Za-z0-9-])(${escaped})(?=$|[^A-Za-z0-9-])`, 'i');
    const match = regex.exec(text);
    if (!match) return null;
    return { index: match.index + match[1].length, text: match[2] };
  }

  function getAttachedPunctuation(text, index) {
    const char = text.charAt(index);
    return /^[,.;:!?]$/.test(char) ? char : '';
  }

  function makeTermPhrase(term, label, punctuation = '') {
    const button = makeButton(term, label);
    if (!punctuation) return button;

    const span = document.createElement('span');
    span.className = 'glossary-term-phrase';
    span.appendChild(button);
    span.appendChild(document.createTextNode(punctuation));
    return span;
  }

  function makeButton(term, label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'glossary-term';
    button.textContent = label;
    button.dataset.term = term.name;
    button.dataset.definition = term.definition;
    button.dataset.url = term.url;
    button.setAttribute('aria-describedby', popover.id);
    button.setAttribute('aria-expanded', 'false');
    return button;
  }

  function bindPopoverEvents() {
    document.addEventListener('pointerdown', (event) => {
      lastPointerType = event.pointerType || 'mouse';
    });

    document.addEventListener('pointerover', (event) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      const target = event.target.closest && event.target.closest('.glossary-term');
      if (target) showPopover(target);
    });

    document.addEventListener('pointerout', (event) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      const target = event.target.closest && event.target.closest('.glossary-term');
      if (!target) return;
      if (event.relatedTarget && popover.contains(event.relatedTarget)) return;
      scheduleHide();
    });

    popover.addEventListener('pointerover', () => clearTimeout(hideTimer));
    popover.addEventListener('pointerout', (event) => {
      if (event.relatedTarget && event.relatedTarget.closest && event.relatedTarget.closest('.glossary-term')) return;
      scheduleHide();
    });

    document.addEventListener('focusin', (event) => {
      const target = event.target.closest && event.target.closest('.glossary-term');
      if (target) showPopover(target);
    });

    document.addEventListener('click', (event) => {
      const target = event.target.closest && event.target.closest('.glossary-term');
      if (target) {
        if (lastPointerType === 'touch' && activeTerm === target && !popover.hidden) {
          hidePopover();
        } else {
          showPopover(target);
        }
        event.preventDefault();
        return;
      }
      if (!popover.contains(event.target)) hidePopover();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') hidePopover();
    });

    window.addEventListener('scroll', hidePopover, { passive: true });
    window.addEventListener('resize', hidePopover);
  }

  function showPopover(target) {
    clearTimeout(hideTimer);
    if (activeTerm && activeTerm !== target) activeTerm.setAttribute('aria-expanded', 'false');
    activeTerm = target;
    titleEl.textContent = target.dataset.term || '';
    bodyEl.textContent = target.dataset.definition || '';
    linkEl.href = target.dataset.url || '/glossary/';
    popover.hidden = false;
    target.setAttribute('aria-expanded', 'true');
    positionPopover(target);
  }

  function positionPopover(target) {
    const gap = 8;
    const margin = 16;
    const rect = target.getBoundingClientRect();
    const popRect = popover.getBoundingClientRect();
    let left = window.scrollX + rect.left;
    let top = window.scrollY + rect.bottom + gap;
    const maxLeft = window.scrollX + window.innerWidth - popRect.width - margin;

    left = Math.max(window.scrollX + margin, Math.min(left, maxLeft));
    if (top + popRect.height > window.scrollY + window.innerHeight - margin) {
      top = Math.max(window.scrollY + margin, window.scrollY + rect.top - popRect.height - gap);
    }

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hidePopover, 140);
  }

  function hidePopover() {
    clearTimeout(hideTimer);
    if (activeTerm) activeTerm.setAttribute('aria-expanded', 'false');
    activeTerm = null;
    popover.hidden = true;
  }
})();
