# Kurni Kwok — AI Shaping

This repository contains the static GitHub Pages website for **kurnikwok.com**.

The site provides public concept pages, paper landing pages, evaluation-route pages and protected-stage boundary information for AI shaping, AI-shaping intelligence, shaped intelligence and productive AI work.

## Site purpose

The website is a public reader-entry and routing layer. It helps readers understand the AI shaping concept, compare it with adjacent AI categories, find the DOI-backed papers and understand where public material stops.

The formal public sources remain the DOI-backed papers linked from the site:

- **AI Shaping: Turning General-Purpose AI into Productive AI Work**
- **AI-Shaping Intelligence in Practice: Evidence from Project-Managing Shaped Intelligence**

## Public/protected boundary

Public website pages may explain concepts, route readers, summarise public evidence boundaries and link to the papers. They must not disclose protected method details, private prompts, control files, schemas, validation mechanics, route controls, continuity structures, private artefacts or implementation materials.

Implementation-level discussion belongs only in a protected-stage process with agreed purpose, confidentiality, ownership, scope and permitted use.

## Repository guide

Key files and folders:

```text
index.html
404.html
CNAME
robots.txt
sitemap.xml
assets/
papers/
docs/
```

The `docs/` folder contains public-safe development guidance for maintaining the site consistently.

## Development guidance

Before adding or changing pages, read:

```text
docs/site-governance.md
```

That file sets the public-safe house style for page roles, paper routing, SEO metadata, internal links, writing tone, visual style and harmonisation expectations.

## Deployment

This is a static site. Upload the repository contents to the GitHub Pages repository root. The live site is served from the HTML files and folders in this repository.

`README.md` and the files in `docs/` are repository documentation. They do not change the public website unless linked or otherwise exposed through site navigation.
