# Wild Washington Release Backlog

This backlog turns the release review into session-sized Codex work. The goal is to move Wild Washington from a strong prototype to a polished, scalable public release that can expand from Washington to additional states and eventually a national footprint.

## Working Rules For Every Session

- Review the current repo state before editing anything.
- Do not overwrite unrelated uncommitted changes.
- Keep the session scoped to its assigned outcome.
- Verify changes with `npm run lint`, `npm run build`, and any relevant tests when available.
- Update docs when a session changes architecture, content structure, or release process.

## Priority Summary

### P0

- Session 2: Design System Foundation
- Session 3: Homepage Competition Pass
- Session 5: Species Detail Page Redesign
- Session 7: Learning Hub Information Architecture
- Session 10: SEO, Social, and Public Release Essentials
- Session 11: Quality and CI Baseline

### P1

- Session 4: Dashboard UX Upgrade
- Session 6: Chart and Comparison Product Pass
- Session 8: Data Model for Multi-State Scaling

### P2

- Session 1: Product Audit to Ticket Breakdown
- Session 9: Content Externalization Strategy
- Session 12: Performance and Observability Pass

## Recommended Order

1. Session 1
2. Session 2
3. Session 3
4. Session 4
5. Session 5
6. Session 6
7. Session 7
8. Session 10
9. Session 11
10. Session 8
11. Session 9
12. Session 12

## Session Backlog

### Session 1: Product Audit to Ticket Breakdown

Goal:
Turn the release assessment into concrete implementation tickets inside the repo.

Deliverables:
- `docs/release-plan.md`
- `docs/backlog.md`
- Prioritized ticket list with `P0`, `P1`, and `P2`

Acceptance criteria:
- Every ticket has a clear outcome, scope, affected routes or components, and definition of done.
- Product, design, content, and engineering work are separated clearly.

Suggested starting points:
- `app/page.tsx`
- `app/species/[slug]/page.tsx`
- `app/learn/page.tsx`
- `lib/data/species.ts`

### Session 2: Design System Foundation

Goal:
Create a cohesive design system instead of page-by-page styling.

Deliverables:
- Typography tokens
- Spacing and layout scale
- Surface and card variants
- CTA styles
- Form control styles
- Reusable heading classes

Acceptance criteria:
- `hero-title` and `section-title` are explicitly defined and used consistently.
- Visual hierarchy is stronger on desktop and mobile.
- Shared styles reduce duplication across routes.

Suggested starting points:
- `app/globals.css`
- `app/layout.tsx`
- Shared UI components

### Session 3: Homepage Competition Pass

Goal:
Make the landing page more distinctive, memorable, and competition-ready.

Deliverables:
- Stronger hero hierarchy
- Sharper value proposition
- Improved CTA grouping
- Tighter stat section
- More curated featured-species presentation

Acceptance criteria:
- The above-the-fold experience explains what the product is, why it matters, and where to go next quickly.
- The page feels more intentional and less template-like.

Suggested starting point:
- `app/page.tsx`

### Session 4: Dashboard UX Upgrade

Goal:
Turn the dashboard into a better browsing and discovery experience.

Deliverables:
- Better filter and search controls
- Clear empty state
- Sorting or grouping support
- Improved result-count treatment
- More scannable species cards

Acceptance criteria:
- Users can quickly find species by name, group, or trend.
- Cards emphasize insight over paragraph density.

Suggested starting points:
- `app/dashboard/page.tsx`
- `components/species/SpeciesExplorer.tsx`
- `components/species/SpeciesCard.tsx`

### Session 5: Species Detail Page Redesign

Goal:
Reduce density and improve storytelling on each species page.

Deliverables:
- Progressive disclosure layout
- Cleaner overview panel
- Insight-first chart framing
- Better map framing
- Smarter grouping of supporting content

Acceptance criteria:
- The first screen communicates overview, current status, and the main takeaway.
- Lower-priority sections no longer compete equally for attention.

Suggested starting point:
- `app/species/[slug]/page.tsx`

### Session 6: Chart and Comparison Product Pass

Goal:
Make charts and comparisons feel premium and understandable to non-experts.

Deliverables:
- Better annotation and explainer copy
- Improved legend behavior
- Clearer selected-state handling
- Mobile readability improvements

Acceptance criteria:
- Comparison mode explains baseline normalization immediately.
- Single-species charts surface key takeaways before mechanics.

Suggested starting points:
- `components/species/PopulationTrendChart.tsx`
- `components/species/ComparisonExplorer.tsx`
- `app/compare/page.tsx`

### Session 7: Learning Hub Information Architecture

Goal:
Make the learning experience feel guided instead of repetitive.

Deliverables:
- Audience-first or species-first discovery model
- Better lesson browsing flow
- Reduced card-matrix fatigue

Acceptance criteria:
- Users can choose a learning path without scanning every species and audience combination manually.
- The learning hub feels like a structured product area, not a generated listing.

Suggested starting points:
- `app/learn/page.tsx`
- `app/learn/[slug]/[audience]/page.tsx`
- `lib/data/learning.ts`

### Session 8: Data Model for Multi-State Scaling

Goal:
Refactor the data layer so the product can grow beyond Washington.

Deliverables:
- Region or jurisdiction-aware schema
- Cleaner separation between content and presentation
- Migration notes for onboarding additional states

Acceptance criteria:
- Adding another state does not require redesigning app structure.
- Geography-specific copy and data assumptions are easier to isolate.

Suggested starting points:
- `types/species.ts`
- `lib/data/adapters.ts`
- `lib/data/source-data.ts`
- `lib/data/species.ts`

### Session 9: Content Externalization Strategy

Goal:
Prepare the project to move away from large hand-authored TypeScript data files.

Deliverables:
- Recommended storage format
- Import or validation strategy
- Starter refactor if feasible

Acceptance criteria:
- Content can eventually be maintained with less engineering effort.
- Data quality and schema validation improve rather than weaken.

Suggested starting points:
- `lib/data/species-part-1.ts`
- `lib/data/species-part-2.ts`
- `lib/data/species-part-3.ts`
- `lib/data/species-part-4.ts`

### Session 10: SEO, Social, and Public Release Essentials

Goal:
Add discoverability and shareability infrastructure for launch.

Deliverables:
- `sitemap.ts`
- `robots.ts`
- `manifest.ts`
- Open Graph and social-image support
- Better README and launch-facing project description

Acceptance criteria:
- The app has production-grade crawlability and social previews.
- Public metadata is complete and consistent across routes.

Suggested starting points:
- `app/layout.tsx`
- New metadata files under `app`

### Session 11: Quality and CI Baseline

Goal:
Make the project safer to iterate on before launch.

Deliverables:
- Unit tests for adapters and data transforms
- Basic route or component tests
- End-to-end smoke tests
- CI workflow for lint, build, and tests

Acceptance criteria:
- Pull requests automatically run lint, build, and tests.
- Core product flows have smoke-test coverage.

Suggested starting points:
- `package.json`
- Test configuration files
- GitHub workflow files

### Session 12: Performance and Observability Pass

Goal:
Prepare the app for production performance and operational visibility.

Deliverables:
- Bundle or route performance review
- Image and perceived-performance improvements
- Analytics or observability instrumentation
- Monitoring plan documentation

Acceptance criteria:
- Key routes load cleanly on mobile.
- Production issues can be detected and investigated quickly.

Suggested starting points:
- `next.config.ts`
- Image-heavy routes
- New instrumentation files if added

## Definition Of Release Ready

The product is ready for release when:

- The visual system is cohesive and polished.
- The homepage, dashboard, species pages, and learning hub feel intentional and easy to scan.
- Core routes are tested and covered by CI.
- Metadata, sitemap, robots, and social previews are implemented.
- The data model has a documented path for expansion beyond Washington.
- The team can hand off work across multiple Codex sessions without losing context.
