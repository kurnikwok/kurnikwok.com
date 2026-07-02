# Kurni Kwok — AI Shaping

This repository contains the static GitHub Pages website for **kurnikwok.com**.

The site is the public reader layer for AI shaping. It gives readers a clear route from plain-language orientation, through concept pages and comparison pages, to DOI-backed papers and the protected-stage boundary.

## Site model

The site is deliberately layered:

| Layer | Role |
|---|---|
| Homepage and start page | Fast orientation for cold readers. |
| Concept pages | Explain one public concept at a time. |
| Comparison, FAQ and glossary | Reduce repeated explanation by giving canonical comparison, question and term-lookup homes. |
| Evidence and public evaluation pages | Route public-stage evidence review without turning the site into implementation guidance. |
| Paper pages | Point to the DOI-backed formal public record. |
| Protected-stage discussion | Hold the boundary for method-level, collaboration-level or commercial review. |
| Repository governance | Preserve consistency, public-stage limits, SEO metadata discipline and maintenance discipline over time. |

## Public page title and H1 discipline

Every indexable public HTML page should have one unique `<title>` and one visible `<h1>`.

- The **title** is the search-result promise: concise, descriptive, unique and aligned with the page's search intent.
- The **H1** is the landing-page promise: the first visible orientation line for a cold reader.
- The title and H1 should share the same primary entity, but they do not need to be identical.
- Concept pages should avoid label-only H1s where the page can state the term's function or reader outcome.

Preferred pattern:

```text
Title: Primary phrase — page role / differentiator · Kurni Kwok
H1: Primary phrase + reader outcome or page promise
```

## Hero diagram system

The site uses page-specific hero diagrams to improve reader orientation and search alignment. Concept pages use concept-stack diagrams where the highlighted box matches the page's primary keyword. Paper, public-evaluation and protected-stage pages use paper-route diagrams so readers can distinguish category definition, capability evidence, public-stage evaluation and protected-stage discussion. Evidence-instance pages use evidence transformation diagrams, and mechanism pages use before/after diagrams where that gives the reader the clearest mental picture.

The site prefers one stable, universal hero image per assigned page that works in both light and dark presentation contexts. Avoid separate light/dark image variants unless there is a documented accessibility or legibility reason.

Where two AI-shaping diagrams serve different purposes, filenames should distinguish the page hero from the supporting concept-stack image; for example, use `ai-shaping-hero-work-pattern-diagram.png` for the `/ai-shaping/` hero and `ai-shaping-discipline-concept-stack-diagram.png` for the full discipline stack.

Hero image assignments, captions, alt text and filename rules are governed in `docs/site-governance.md`.

Supporting diagrams should follow the same filename and public-reference discipline as hero diagrams: one stable public filename, descriptive alt text, accurate dimensions and no stale light/dark variant references.


## Site icon and favicon system

The site uses a simplified AI-shaping site icon for browser tabs, bookmarks, Apple touch icons and Safari pinned tabs.

Favicon and site-icon assets are site-wide identity assets, not page-specific hero diagrams. They should be stable, simple, public-safe and recognisable at small sizes.

Canonical favicon files and HTML head rules are governed in `docs/site-governance.md`.


## Formal source hierarchy

The website is a guided interpretation and routing layer. It must not become a substitute formal source.

Formal public sources remain the DOI-backed papers linked from the site:

- **AI Shaping: Turning General-Purpose AI into Productive AI Work**
- **AI-Shaping Intelligence in Practice: Evidence from Project-Managing Shaped Intelligence**

Use the website to orient, explain, route and frame. Use the papers for formal category definition, capability evidence, versioning and citation.

### AI-shaping intelligence wording rule

Describe AI-shaping intelligence as a dual capability. It both builds, improves and renews its own shaping pattern, and uses that pattern to produce shaped intelligence. Where the paper-surface terms are needed, use **self-shaping capability** and **domain-shaping capability** as a pair. Do not present either side as the whole of AI-shaping intelligence.

## Public/protected boundary

Public website pages may explain concepts, route readers, summarise public evidence boundaries and link to the papers. They must not disclose protected method details, private prompts, control files, schemas, validation mechanics, route controls, continuity structures, private artefacts or implementation materials.

Implementation-level discussion belongs only in a protected-stage process with agreed purpose, confidentiality, ownership, scope and permitted use.

Direct email exposure is intentionally limited. Public pages should route implementation-level enquiries through the protected-stage discussion page rather than repeating the email address across the site.

## Markdown and source-document policy

`README.md`, `README-upload.txt` and files under `docs/` are repository-maintenance artefacts. They may be publicly accessible because the repository is public, but they are not part of the public reader journey and should not be linked from public navigation or included in the XML sitemap.

If a governance or repository note needs to become a reader-facing page, convert it into a governed HTML page with a title, H1, canonical URL, metadata, sitemap decision and public/protected boundary review.

## Maintenance workflow

Before changing public pages, read:

```text
docs/site-governance.md
```

Recommended update order:

1. Check whether the proposed change belongs on the website, in a paper landing page, in the glossary, in the FAQ, or only in governance.
2. Confirm the page's primary reader question, title, H1, meta description, canonical URL and Open Graph/Twitter titles.
3. Update canonical sources first: glossary for definitions, protected-stage page for boundary wording, papers pages for formal-source routing.
4. Update individual public pages only for their primary reader question.
5. Check sitemap, navigation, metadata, internal links and boundary language.
6. Check route-link polish: when a page names another site layer or route, make that named route clickable unless an adjacent link already serves the same purpose.
7. Check visual-link polish: inline route links should use standard link styling, not bold emphasis, unless the bold text is a label, heading or card title.
8. Check reference-page polish: glossary duplicates, FAQ grouping, repeated labels and route clarity.
9. Do a final public-repository caution check before committing.

## Repository guide

Key files and folders:

```text
index.html
404.html
.nojekyll
robots.txt
sitemap.xml
assets/
papers/
docs/
```

`README.md` and `docs/` are repository documentation. They support maintenance discipline; they are not implementation material.

## Deployment

This is a static site. Upload the repository contents to the GitHub Pages repository root.
