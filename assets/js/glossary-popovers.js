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
    '.figure-section', '.figure-card', '.diagram-note',
    '.mini-steps',
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
      const frag = buildFragment(textNode, terms, used);
      if (frag) textNode.replaceWith(frag);
      if (used.size >= terms.length) break;
    }
  }

  function buildFragment(textNode, terms, used) {
    const text = textNode.nodeValue;
    let cursor = 0;
    let changed = false;
    const frag = document.createDocumentFragment();

    while (cursor < text.length) {
      const found = findNextTerm(text, cursor, terms, used);
      if (!found) break;

      if (found.start > cursor) frag.appendChild(document.createTextNode(text.slice(cursor, found.start)));
      let attachment = getAttachedAttachment(text, found.end);
      if (attachment.type === 'none' && found.end === text.length) {
        attachment = getAdjacentAttachedAttachment(textNode);
      }
      frag.appendChild(makeTermPhrase(found.term, text.slice(found.start, found.end), attachment));
      used.add(found.term.id);
      cursor = found.end + attachment.length;
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

  function getAttachedAttachment(text, index) {
    const rest = text.slice(index);

    // Attach standalone closing punctuation to the final word of the trigger.
    // Grammatical connectors remain ordinary text so the browser can wrap
    // phrases such as "and more" according to the surrounding sentence.
    const punctuation = /^([,.;:!?\)\]\}”’])/.exec(rest);
    if (punctuation) {
      return { type: 'punctuation', text: punctuation[1], length: punctuation[1].length };
    }

    return { type: 'none', text: '', length: 0 };
  }

  function getAdjacentAttachedAttachment(textNode) {
    let current = textNode;

    // A glossary term may end inside nested inline wrappers while its closing
    // punctuation begins the immediately adjacent text node outside them.
    // Walk out only through transparent inline wrappers and stop at whitespace,
    // substantive content, interactive elements or a block boundary.
    while (current && current !== main) {
      const next = nextMeaningfulSibling(current);
      if (next) {
        const punctuationNode = leadingPunctuationTextNode(next);
        if (!punctuationNode) return { type: 'none', text: '', length: 0 };

        const punctuation = /^([,.;:!?\)\]\}”’])/.exec(punctuationNode.nodeValue || '');
        if (!punctuation) return { type: 'none', text: '', length: 0 };

        punctuationNode.nodeValue = punctuationNode.nodeValue.slice(punctuation[1].length);
        if (!punctuationNode.nodeValue) punctuationNode.remove();
        return { type: 'punctuation', text: punctuation[1], length: 0 };
      }

      const parent = current.parentElement;
      if (!parent || !isTransparentInlineWrapper(parent)) break;
      current = parent;
    }

    return { type: 'none', text: '', length: 0 };
  }

  function nextMeaningfulSibling(node) {
    let sibling = node.nextSibling;
    while (sibling) {
      if (sibling.nodeType === Node.COMMENT_NODE ||
          (sibling.nodeType === Node.TEXT_NODE && sibling.nodeValue === '')) {
        sibling = sibling.nextSibling;
        continue;
      }
      return sibling;
    }
    return null;
  }

  function leadingPunctuationTextNode(node) {
    if (node.nodeType === Node.TEXT_NODE) return node;
    if (node.nodeType !== Node.ELEMENT_NODE || !isTransparentInlineWrapper(node)) return null;

    let current = node;
    while (current && current.nodeType === Node.ELEMENT_NODE && isTransparentInlineWrapper(current)) {
      let child = current.firstChild;
      while (child && (child.nodeType === Node.COMMENT_NODE ||
             (child.nodeType === Node.TEXT_NODE && child.nodeValue === ''))) {
        child = child.nextSibling;
      }
      if (!child) return null;
      if (child.nodeType === Node.TEXT_NODE) return child;
      if (child.nodeType !== Node.ELEMENT_NODE || !isTransparentInlineWrapper(child)) return null;
      current = child;
    }
    return null;
  }

  function isTransparentInlineWrapper(element) {
    return ['SPAN', 'EM', 'STRONG', 'B', 'I', 'SMALL', 'MARK', 'ABBR', 'SUB', 'SUP', 'S'].includes(element.tagName);
  }

  function makeTermPhrase(term, label, attachment = { type: 'none', text: '', length: 0 }) {
    const frag = document.createDocumentFragment();
    frag.appendChild(makeButton(term, label, attachment));
    return frag;
  }

  function makeButton(term, label, attachment = { type: 'none', text: '', length: 0 }) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'glossary-term';
    button.dataset.term = term.name;
    button.dataset.definition = term.definition;
    button.dataset.url = term.url;
    button.setAttribute('aria-describedby', popover.id);
    button.setAttribute('aria-expanded', 'false');

    appendVisibleTrigger(button, label, attachment);
    return button;
  }

  function appendVisibleTrigger(button, label, attachment) {
    const hasAttachment = attachment && attachment.type !== 'none' && attachment.text;
    if (!hasAttachment) {
      const main = document.createElement('span');
      main.className = 'glossary-term-main';
      main.textContent = label;
      button.appendChild(main);
      return;
    }

    const split = splitFinalToken(label);
    if (split.before) {
      const before = document.createElement('span');
      before.className = 'glossary-term-main';
      before.textContent = split.before;
      button.appendChild(before);
    }

    // Keep the final token and following punctuation in one no-break tail.
    // Grammatical connectors remain outside the trigger and wrap naturally.
    const tail = document.createElement('span');
    tail.className = 'glossary-term-tail';

    const finalToken = document.createElement('span');
    finalToken.className = 'glossary-term-main';
    finalToken.textContent = split.finalToken;
    tail.appendChild(finalToken);

    const attached = document.createElement('span');
    attached.className = 'glossary-term-attachment glossary-term-punctuation';
    attached.textContent = attachment.text;
    tail.appendChild(attached);

    button.appendChild(tail);
  }

  function splitFinalToken(label) {
    const match = /^(.*\s)(\S+)$/.exec(label);
    if (!match) return { before: '', finalToken: label };
    return { before: match[1], finalToken: match[2] };
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
