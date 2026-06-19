# Tasks: Phase 6 Quality Tooling View

## Review Workload Forecast

| Field                   | Value             |
| ----------------------- | ----------------- |
| Estimated changed lines | 260-360           |
| 400-line budget risk    | Medium            |
| Chained PRs recommended | No                |
| Suggested split         | Single PR         |
| Delivery strategy       | single-pr-default |
| Chain strategy          | pending           |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal                            | Likely PR | Notes                                                   |
| ---- | ------------------------------- | --------- | ------------------------------------------------------- |
| 1    | Foundation + page composition   | PR 1      | Base route, catalog, and server components              |
| 2    | Localization + metadata + tests | PR 1      | Same PR; keep message updates and verification together |

## Phase 1: Foundation / Data Model

- [ ] 1.1 Create `components/quality/quality-catalog.ts` with ordered section IDs, tool catalog, default/optional status, roles, flags, and official HTTPS URLs.
- [ ] 1.2 Define shared quality page types in `components/quality/quality-catalog.ts` or adjacent `*.ts` exports for message shape, section copy, and link metadata.
- [ ] 1.3 Add the EN/ES quality message keys to `messages/en.json` and `messages/es.json` in a shape that matches the catalog contract.

## Phase 2: Core Implementation

- [ ] 2.1 Build `components/quality/quality-tool-card.tsx` for status badge, optional flag pill, utility copy, and safe external link rendering.
- [ ] 2.2 Build `components/quality/quality-view.tsx` to render the overview plus sections in the fixed order: quality gates → commit hygiene → CI confidence → runtime insight.
- [ ] 2.3 Mark React Doctor and React Scan as default quality-gate tools; mark Vitest, commitlint, and Playwright optional with `--unit`, `--commitlint`, and `--e2e`.

## Phase 3: Integration / Wiring

- [ ] 3.1 Replace `app/[locale]/quality/page.tsx` placeholder content with the server-first `QualityView` inside `PageShell` using async locale params.
- [ ] 3.2 Update `generateMetadata` in `app/[locale]/quality/page.tsx` to read `Metadata.quality` for EN/ES title and description.
- [ ] 3.3 Update `messages/en.d.json.ts` if needed so the localized quality message shape compiles cleanly.

## Phase 4: Testing / Verification

- [ ] 4.1 Add `tests/unit/quality-view.test.tsx` for EN/ES rendering, exact section order, default-vs-optional labels, and flag mapping.
- [ ] 4.2 Extend `tests/unit/localized-pages.test.tsx` to replace placeholder assertions with the new `/quality` copy and headings.
- [ ] 4.3 Add `tests/e2e/quality-view.spec.ts` to verify `/en/quality` and `/es/quality`, official-only hosts, and `target="_blank"` plus `rel="noreferrer noopener"`.

## Phase 5: Cleanup / Documentation

- [ ] 5.1 Remove any dead placeholder-only helpers or obsolete quality-page assertions left behind by the route replacement.
- [ ] 5.2 Run formatting and review the final copy for neutral/professional ES wording and official-link consistency.
