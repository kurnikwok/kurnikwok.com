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
| Repository governance | Preserve consistency, public-stage limits and maintenance discipline over time. |

## Formal source hierarchy

The website is a guided interpretation and routing layer. It must not become a substitute formal source.

Formal public sources remain the DOI-backed papers linked from the site:

- **AI Shaping: Turning General-Purpose AI into Productive AI Work**
- **AI-Shaping Intelligence in Practice: Evidence from Project-Managing Shaped Intelligence**

Use the website to orient, explain, route and frame. Use the papers for formal category definition, capability evidence, versioning and citation.

## Public/protected boundary

Public website pages may explain concepts, route readers, summarise public evidence boundaries and link to the papers. They must not disclose protected method details, private prompts, control files, schemas, validation mechanics, route controls, continuity structures, private artefacts or implementation materials.

Implementation-level discussion belongs only in a protected-stage process with agreed purpose, confidentiality, ownership, scope and permitted use.

Direct email exposure is intentionally limited. Public pages should route implementation-level enquiries through the protected-stage discussion page rather than repeating the email address across the site.

## Maintenance workflow

Before changing public pages, read:

```text
docs/site-governance.md
```

Recommended update order:

1. Check whether the proposed change belongs on the website, in a paper landing page, in the glossary, in the FAQ, or only in governance.
2. Update canonical sources first: glossary for definitions, protected-stage page for boundary wording, papers pages for formal-source routing.
3. Update individual public pages only for their primary reader question.
4. Check sitemap, navigation, metadata, internal links and boundary language.
5. Do a final public-repository caution check before committing.

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
