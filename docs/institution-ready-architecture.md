# Wild Washington Institution-Ready Refactor

This document captures the structural direction introduced in the institution-ready refactor so future sessions can extend the project without undoing the public-program framing.

## Revised Site Map

- `/`
  - Public homepage with mission, audiences, featured wildlife stories, trust markers, and support path
- `/explore`
  - Public wildlife browse surface
- `/species/[slug]`
  - Species story, evidence, map, learning, sources, and action paths
- `/compare`
  - Cross-species comparison experience
- `/learn`
  - Audience-first learning hub
- `/learn/[slug]/[audience]`
  - Lesson detail route
- `/conservation-action`
  - Stewardship and action pathways
- `/about-data`
  - Data sources, methodology, confidence, and limitations
- `/about`
  - Project overview, mission, and program rationale
- `/institutional-use`
  - Museum, educator, and nonprofit adoption guidance
- `/partnerships`
  - Credits, collaboration model, and partner pathways
- `/accessibility`
  - Accessibility statement and ongoing commitments
- `/support`
  - Donation and stewardship support framing

Legacy aliases should continue to resolve:

- `/dashboard` -> `/explore`
- `/conservation` -> `/conservation-action`
- `/methodology` -> `/about-data`

## Content Architecture Direction

- `lib/data/source-data.ts`
  - Raw species source records
- `lib/data/species.ts`
  - Adapted species collection
- `lib/data/learning.ts`
  - Audience labels, descriptions, and lesson builders
- `lib/data/site-content.ts`
  - Derived UI helpers tied to species records
- `lib/data/institutional-content.ts`
  - Public-program navigation, homepage framing, support copy, governance signals, and institutional content

## Component Boundaries

- `components/species/*`
  - Domain-specific species and chart components
- `components/site/PageHero.tsx`
  - Shared editorial page hero pattern
- `components/site/SectionIntro.tsx`
  - Shared section heading pattern
- `components/site/ContentCard.tsx`
  - Shared informational card and route card pattern
- `components/site/CallToActionBand.tsx`
  - Shared donor, partner, or next-step CTA band

## Maintainability Notes

- Prefer extending structured content in `lib/data/institutional-content.ts` before hard-coding new public-program copy into routes.
- Keep redirects for legacy product-language routes until external links, search indexing, and partner references are updated.
- Continue moving large authored content toward flat-file or CMS-friendly collections once schema validation and editorial workflow are chosen.

## Follow-On Phases

1. Add stronger automated validation for structured content and species adapters.
2. Externalize authored institutional content into flat files or collections.
3. Add tests for route redirects, site metadata, and key accessibility paths.
4. Expand chart and map accessibility with richer text alternatives and optional tabular views.
