# Site governance and house style

This file records the public-safe rules for maintaining **kurnikwok.com** consistently over time.

It is for website governance, editorial alignment and SEO harmonisation only. It must not contain protected implementation material.

## 1. Core site architecture

The site has three public roles:

1. **Website pages** — reader entry, plain-language explanation, comparison, routing and bounded public evaluation.
2. **Papers** — formal DOI-backed public sources for category definition and capability evidence.
3. **Protected-stage route** — the boundary for any implementation-level discussion.

The website must remain independently readable but not independently authoritative where a formal paper is the controlling public source.

## 2. Formal source hierarchy

Use this hierarchy when deciding where content belongs:

| Content type | Primary location |
|---|---|
| Formal category definition | Category definition paper |
| Formal capability evidence | Capability evidence paper |
| Plain-language explanation | Website concept pages |
| Adjacent-category comparison | Comparison page |
| Evidence-instance overview | Project-managing shaped intelligence page |
| Public evaluation route | Public evaluation map |
| Term lookup | Glossary |
| Reader support | FAQ |
| Implementation-level boundary | Protected-stage discussion page |

Website pages may summarise or route to papers, but should not become substitute papers.

## 3. Canonical page roles

Each page should have one primary role.

| Page | Primary role |
|---|---|
| `/` | Brand and reader-entry route |
| `/ai-shaping/` | Exact-term category definition page for AI shaping |
| `/ai-shaping-in-5-minutes/` | Plain-English first read |
| `/ai-shaping-vs-prompts-agents-automation/` | Adjacent-category comparison shortcut |
| `/ai-shaping-intelligence/` | Reusable shaping capability concept |
| `/shaped-intelligence/` | Domain-facing reusable capability concept |
| `/productive-ai-work/` | Productive AI work outcome concept |
| `/work-burden-shift/` | Mechanism and public evidence signal |
| `/project-managing-shaped-intelligence/` | Public evidence-instance overview |
| `/operating-model-design/` | Operating-model context |
| `/public-evaluation-map/` | Public route map and stop rules |
| `/papers/` | Papers index and citation route |
| `/papers/ai-shaping/` | Category definition paper landing page |
| `/papers/ai-shaping-intelligence-in-practice/` | Capability evidence paper landing page |
| `/faq/` | Question-and-answer support |
| `/glossary/` | Term lookup |
| `/about/` | Author and development-context page |
| `/protected-stage-discussion/` | Protected-stage boundary and the only routine direct-email route |
| `/sitemap/` | Human-readable site map |

Do not add a new page unless it answers a distinct reader intent.

## 4. Contact and protected-stage route rules

The public website is category-first, not personal-sales-first. Direct email should not appear as a routine global footer item or general public-page CTA.

Public pages should normally route implementation-level enquiries to the **Protected-stage discussion** page rather than directly to email. This keeps the reader sequence clear: category understanding, public evidence review, public/protected boundary, then protected-stage discussion where appropriate.

Direct email may appear only in limited contexts:

- on the **Protected-stage discussion** page;
- in formal published artefacts where author/contact metadata is part of the publication record;
- in exceptional maintenance, legal or administrative contexts where direct contact is necessary.

Use **Protected-stage discussion** as the preferred implementation-level CTA outside the protected-stage page. Avoid routine public-page CTAs such as “email”, “contact”, “get in touch” or visible email-address buttons.

## 5. Paper-funnel rules

The website should route readers to the papers without repeatedly pushing the same link on the same page.

Preferred pattern:

- One primary next step per page.
- Up to three links in a `Read next` block.
- Use internal paper landing pages for ordinary routing.
- Concentrate DOI, PDF and citation details on the papers index and individual paper landing pages.
- Keep the public evaluation map as the route for evidence/boundary readers.

Use consistent labels:

| Source or route | Preferred label |
|---|---|
| Formal category source | Category definition paper |
| Formal capability-evidence source | Capability evidence paper |
| Papers index page | Papers index |
| Public route | Public evaluation map |
| Protected route | Protected-stage discussion |

Avoid excessive same-page repetition of paper links, DOI links or public/protected boundary warnings.

## 6. Boundary discipline

Every page should preserve the public/protected boundary.

Standard public boundary principle:

> Public pages explain concepts, category distinctions, evidence routes and reader pathways only. They are not implementation guidance, deployment assurance, reproducibility proof, product-performance assurance, method transfer or commercial-use rights.

Page-specific boundary labels:

| Page type | Boundary emphasis |
|---|---|
| Concept pages | Public concept only |
| Comparison page | Category comparison only |
| Evidence overview | Public evidence-instance overview only |
| Public evaluation map | Public evaluation route only |
| Paper pages | Formal public source, not implementation guidance |
| Protected-stage page | Implementation-level review requires agreed protections |

Do not publish protected method details, including private prompts, control files, schemas, validation mechanics, route controls, continuity structures, private artefacts or implementation materials.

## 7. Harmonisation principle

Harmonisation is structural, not reductive.

Do:

- preserve all core arguments, terms, boundaries and claims;
- move content to the page where it best serves the reader;
- compress repeated material when it appears too many times on the same page;
- make each page role clear;
- keep terminology consistent.

Do not:

- remove a concept merely because it appears elsewhere;
- create a second formal source outside the papers;
- duplicate long paper arguments on website pages;
- add sales claims, implementation claims or unsupported evidence claims.

## 8. Coherence QA

Before publishing site updates, run a coherence pass across changed pages and high-traffic pages.

Check that:

- headings match the content below them;
- numbered, quantified or scope-setting labels remain accurate;
- page roles are preserved;
- terminology follows the canonical terms in this guide;
- public/protected boundary language remains intact;
- paper-routing links remain clear without becoming repetitive;
- metadata, H1s and internal links support the page's primary role.

This pass is normative and structural, not reductive. Do not force paragraph merging, argument deletion or concept compression merely to satisfy a heading or shorten a page. If the content structure is better as multiple paragraphs, update the heading instead.

## 9. Core terminology

Use these terms consistently:

- AI shaping
- AI-shaping intelligence
- shaped intelligence
- productive AI work
- work burden
- work-burden shift
- project-managing shaped intelligence
- public-stage material
- protected-stage discussion

Do not casually replace these with looser synonyms where precision matters.

## 10. Writing style

Use a clear, public-facing, precise style.

Preferred tone:

- direct;
- bounded;
- explanatory;
- calm;
- non-promotional;
- concrete before abstract where possible.

Avoid:

- hype;
- inflated claims;
- unsupported superiority language;
- unnecessary jargon;
- repeating the same disclaimer multiple times on one page;
- making the website sound like a product launch if the page is a category or evidence route.

Use Australian English where relevant.

## 11. Visual and layout conventions

Use one shared design system across the site, with different intensity by page type. The homepage may be more visually directive; concept, evidence, paper and reference pages should remain calmer and more text-led.

Keep the visual system simple and consistent:

- responsive light/dark design;
- readable line lengths;
- clear section headings;
- consistent badges, cards, buttons, callouts and boundary boxes;
- no decorative complexity that distracts from the public route;
- maintain accessibility basics such as readable contrast, useful link text, focus states and image `alt` text.

Use cards for reader routing on web pages where route choice is the main task. Use tables for dense comparisons, formal boundary distinctions and paper-like material where row/column comparison reduces cognitive load.

Site-wide label rule: when linking to `/protected-stage-discussion/` in navigation, footers or route cards, use **Protected-stage discussion** rather than the clipped label **Protected-stage**.

Footer contact rule: do not include direct email in the routine global footer. Use the footer for navigation to category, paper, evidence and protected-stage routes.

Preferred visual hierarchy:

| Element | Use |
|---|---|
| Primary button | Best first click for the current page |
| Secondary button | Important supporting reader path |
| Contact/protected-stage button | Link to the Protected-stage discussion page outside that page; direct email only on the protected-stage page |
| Badge | Page role, route type or evidence boundary label |
| Card | Skimmable reader choice or distinct concept block |
| Boundary/callout box | Public-stage limit, stop rule or non-implementation warning |

Preferred page-template intensity:

| Page type | Treatment |
|---|---|
| Homepage | Strong hero, clear CTA hierarchy, route cards and prominent compact concept stack |
| Concept pages | Consistent page-role intro, plain explanation, then fuller concept detail |
| Evidence/boundary pages | Strong public-stage role, stop rule and protected-stage boundary treatment |
| Paper pages | Formal source framing, citation route and limited summary |
| Reference pages | Simple lookup structure, compact headings and restrained cards |

## 12. SEO metadata conventions

Each page should have a clear primary search intent.

Title pattern:

```text
[Primary query] — [Page role] · [AI Shaping or Kurni Kwok]
```

Use **AI Shaping** as the suffix for category/concept/comparison pages. Use **Kurni Kwok** where authorship, paper identity or protected-stage contact is central.

Each page should have:

- one unique `<title>`;
- one unique `<meta name="description">`;
- one clear H1 aligned with the page role;
- a self-referencing canonical URL;
- Open Graph and Twitter metadata;
- JSON-LD where useful;
- inclusion in `sitemap.xml` unless there is a specific reason to exclude it.

The `/ai-shaping/` page is the exact-term definition page for **AI shaping**. Other pages should support it rather than compete with it.

## 13. Internal linking conventions

Use descriptive anchor text.

Preferred examples:

- AI shaping category definition
- AI shaping vs prompts, agents and automation
- work-burden shift
- project-managing shaped intelligence
- Category definition paper
- Capability evidence paper
- Public evaluation map
- Protected-stage discussion

Avoid vague anchors such as “click here”, “read more” or “this page” where a descriptive link would help the reader and search engines.

## 14. Future-page checklist

Before creating a new page, check:

- What distinct reader question does this page answer?
- Which existing page is the canonical source for the concept?
- Which paper, if any, is the formal source?
- What is the page’s primary SEO intent?
- What is the single primary next step?
- Does the page preserve the public/protected boundary?
- Is any repeated content necessary for reader orientation, or should it link back instead?
- Do headings, labels and numbered claims match the content below them?
- Does the page avoid protected implementation detail?

## 15. Public repository caution

The repository is public. Treat everything committed here as publicly disclosed.

Do not commit:

- protected method details;
- private prompts;
- internal control files;
- schemas or validation mechanics;
- private source material;
- confidential business material;
- unpublished implementation artefacts;
- credentials, tokens or private contact data.

If a future development note would reveal protected method detail, keep it out of this repository.
