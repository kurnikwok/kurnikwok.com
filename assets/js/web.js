(() => {
  const routes = Object.freeze([
  {
    "path": "/",
    "label": "Home",
    "group": "Start",
    "parent": null,
    "primary": null,
    "sequence": 1,
    "sitemap": true
  },
  {
    "path": "/ai-shaping-in-5-minutes/",
    "label": "AI shaping in 5 minutes",
    "group": "Start",
    "parent": "/",
    "primary": "/ai-shaping-in-5-minutes/",
    "sequence": 2,
    "sitemap": true
  },
  {
    "path": "/ai-shaping/",
    "label": "AI shaping",
    "group": "Core concepts",
    "parent": "/",
    "primary": "/ai-shaping/",
    "sequence": 3,
    "sitemap": true
  },
  {
    "path": "/ai-shaping-practice/",
    "label": "AI Shaping practice",
    "group": "Core concepts",
    "parent": "/ai-shaping/",
    "primary": "/ai-shaping/",
    "sequence": 4,
    "sitemap": true
  },
  {
    "path": "/productive-ai-work/",
    "label": "Productive AI work",
    "group": "Core concepts",
    "parent": "/ai-shaping/",
    "primary": "/ai-shaping/",
    "sequence": 5,
    "sitemap": true
  },
  {
    "path": "/work-burden-shift/",
    "label": "Work-burden shift",
    "group": "Core concepts",
    "parent": "/ai-shaping/",
    "primary": "/work-burden-shift/",
    "sequence": 6,
    "sitemap": true
  },
  {
    "path": "/ai-shaping-intelligence/",
    "label": "AI-shaping intelligence",
    "group": "Core concepts",
    "parent": "/ai-shaping/",
    "primary": "/ai-shaping/",
    "sequence": 7,
    "sitemap": true
  },
  {
    "path": "/shaped-intelligence/",
    "label": "Shaped intelligence",
    "group": "Core concepts",
    "parent": "/ai-shaping/",
    "primary": "/ai-shaping/",
    "sequence": 8,
    "sitemap": true
  },
  {
    "path": "/operating-model-design/",
    "label": "Operating-model design",
    "group": "Core concepts",
    "parent": "/ai-shaping/",
    "primary": "/operating-model-design/",
    "sequence": 9,
    "sitemap": true
  },
  {
    "path": "/compare/",
    "label": "Compare AI shaping",
    "group": "Compare",
    "parent": "/",
    "primary": null,
    "sequence": 10,
    "sitemap": true
  },
  {
    "path": "/ai-shaping-discipline-operating-model-framework-method/",
    "label": "Discipline, operating model, framework or method?",
    "group": "Compare",
    "parent": "/compare/",
    "primary": null,
    "sequence": 11,
    "sitemap": true
  },
  {
    "path": "/specification-led-vs-iterative-ai-work/",
    "label": "Specification-led AI work vs Iterative AI work",
    "group": "Compare",
    "parent": "/compare/",
    "primary": null,
    "sequence": 12,
    "sitemap": true
  },
  {
    "path": "/ai-shaping-vs-prompts-agents-automation/",
    "label": "AI shaping vs prompts, agents and automation",
    "group": "Compare",
    "parent": "/compare/",
    "primary": null,
    "sequence": 13,
    "sitemap": true
  },
  {
    "path": "/ai-shaping-adjacent-frameworks/",
    "label": "AI shaping and adjacent AI frameworks",
    "group": "Compare",
    "parent": "/compare/",
    "primary": null,
    "sequence": 14,
    "sitemap": true
  },
  {
    "path": "/evidence/",
    "label": "Evidence overview",
    "group": "Evidence",
    "parent": "/",
    "primary": "/evidence/",
    "sequence": 15,
    "sitemap": true
  },
  {
    "path": "/web-developing-shaped-intelligence/",
    "label": "Public web-developing shaped intelligence",
    "group": "Evidence",
    "parent": "/evidence/",
    "primary": "/evidence/",
    "sequence": 16,
    "sitemap": true
  },
  {
    "path": "/publication-co-evolution/",
    "label": "Publication co-evolution",
    "group": "Evidence",
    "parent": "/evidence/",
    "primary": "/evidence/",
    "sequence": 17,
    "sitemap": true
  },
  {
    "path": "/ai-shaping-intelligence-evidence/",
    "label": "AI-shaping intelligence evidence",
    "group": "Evidence",
    "parent": "/evidence/",
    "primary": "/evidence/",
    "sequence": 18,
    "sitemap": true
  },
  {
    "path": "/project-managing-shaped-intelligence/",
    "label": "Project-managing shaped intelligence",
    "group": "Evidence",
    "parent": "/evidence/",
    "primary": "/evidence/",
    "sequence": 19,
    "sitemap": true
  },
  {
    "path": "/public-evaluation-map/",
    "label": "Public evaluation map",
    "group": "Evidence",
    "parent": "/evidence/",
    "primary": "/evidence/",
    "sequence": 20,
    "sitemap": true
  },
  {
    "path": "/planned-capability-directions/",
    "label": "Planned capability directions",
    "group": "Plan",
    "parent": "/",
    "primary": null,
    "sequence": 21,
    "sitemap": true
  },
  {
    "path": "/papers/",
    "label": "Papers",
    "group": "Papers",
    "parent": "/",
    "primary": "/papers/",
    "sequence": 22,
    "sitemap": true
  },
  {
    "path": "/papers/ai-shaping/",
    "label": "Category definition paper",
    "group": "Papers",
    "parent": "/papers/",
    "primary": "/papers/",
    "sequence": 23,
    "sitemap": true
  },
  {
    "path": "/papers/ai-shaping-intelligence-in-practice/",
    "label": "Capability evidence paper",
    "group": "Papers",
    "parent": "/papers/",
    "primary": "/papers/",
    "sequence": 24,
    "sitemap": true
  },
  {
    "path": "/protected-stage-discussion/",
    "label": "Protected-stage discussion",
    "group": "Boundary",
    "parent": "/",
    "primary": null,
    "sequence": 25,
    "sitemap": true
  },
  {
    "path": "/faq/",
    "label": "FAQ",
    "group": "Reference",
    "parent": "/",
    "primary": null,
    "sequence": 26,
    "sitemap": true
  },
  {
    "path": "/glossary/",
    "label": "Glossary",
    "group": "Reference",
    "parent": "/",
    "primary": "/glossary/",
    "sequence": 27,
    "sitemap": true
  },
  {
    "path": "/about/",
    "label": "About",
    "group": "Reference",
    "parent": "/",
    "primary": null,
    "sequence": 28,
    "sitemap": true
  },
  {
    "path": "/sitemap/",
    "label": "Site map",
    "group": "Reference",
    "parent": "/",
    "primary": null,
    "sequence": 29,
    "sitemap": true
  }
]);

  window.siteConfig = Object.freeze({
    siteType: 'web',
    release: Object.freeze({
      visibleLabel: 'Site',
      ariaLabel: 'Website release',
      version: 'v1.17'
    }),
    routes
  });
})();
