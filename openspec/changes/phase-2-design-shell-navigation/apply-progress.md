# Apply Progress: Phase 2 Design Shell Navigation

## Status

- Slice: 1 of 2
- Delivery: chained PR slice (`stacked-to-main`)
- Mode: Strict TDD
- Scope status: slice 1 implementation and targeted verification complete

## Completed Tasks

- [x] 1.1 Create `tests/unit/theme-switcher.test.tsx` for dropdown labels, theme selection, and route-stable behavior.
- [x] 1.2 Create `tests/unit/language-switcher.test.tsx` for locale options and `router.replace` path/query/hash preservation.
- [x] 1.3 Create `tests/e2e/mobile-navigation.spec.ts` for mobile sheet open/close and GitHub/shadcn/Next.js href placement.
- [x] 2.1 Add `components/ui/navigation-menu.tsx` from shadcn base-rhea and verify the generated API matches Next.js `Link` composition.
- [x] 2.2 Refactor `components/base-navigation.tsx` desktop nav to `NavigationMenu`, keep `Sheet` mobile nav, and reduce navbar externals to GitHub only.
- [x] 2.3 Update `app/[locale]/page.tsx` and `messages/en.json`, `messages/es.json` with a localized home foundations section for shadcn and Next.js links.
- [x] 3.1 Reconcile nav labels, icon affordances, and safe external-link attributes across desktop/mobile/header/home states in `components/base-navigation.tsx`.
- [x] 3.2 Review client boundaries and localized routing assumptions so nav, theme, and language controls stay compatible with Next.js 16 patterns.

## Deferred to Slice 2

- [ ] 2.4 Add minimal shared motion tokens and reduced-motion guards in `app/globals.css` only.
- [ ] 4.1 Create `docs/adr/0002-design-system-boundaries.md` for shadcn/base-rhea boundaries, Base UI `render`, lucide usage, motion limits, and MCP importance.
- [ ] 4.2 Update `docs/adr/0001-i18n-and-routing.md`, `AGENTS.md`, and `README.md` to align ADR status and document repo-level `opencode.json` shadcn MCP enablement.
- [ ] 5.1 Run full-change verification including `npm run test:e2e`.
- [ ] 5.2 Capture final verification notes for the whole change before archive/verify handoff.

## TDD Cycle Evidence

| Task | RED                                                                                                                                                            | GREEN                                                                                                                                                              | REFACTOR                                                                                                  |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| 1.1  | Existing `tests/unit/theme-switcher.test.tsx` was already present on resume and serves as the regression spec for theme behavior.                              | `npm run test -- tests/unit/theme-switcher.test.tsx` passed during resumed apply and again inside `npm run test`.                                                  | Import order and formatting aligned with repo rules.                                                      |
| 1.2  | Existing `tests/unit/language-switcher.test.tsx` was already present on resume and serves as the regression spec for locale preservation.                      | `npm run test -- tests/unit/language-switcher.test.tsx` passed during resumed apply and again inside `npm run test`.                                               | Test kept after lint/format cleanup.                                                                      |
| 1.3  | Existing `tests/e2e/mobile-navigation.spec.ts` was already present on resume and defines the mobile/external-link contract.                                    | `CI=1 npx playwright test tests/e2e/mobile-navigation.spec.ts --project=chromium --workers=1` passed.                                                              | Spec formatted and retained as the focused slice-1 browser proof.                                         |
| 2.1  | `npm run test -- tests/unit/localized-pages.test.tsx` failed before the fix because `BaseNavigation` could not render the partial desktop nav integration.     | `components/ui/navigation-menu.tsx` now provides the shadcn/base wrapper used by the desktop header; localized page tests pass.                                    | Generated file was normalized to repo formatting and client-component conventions.                        |
| 2.2  | Targeted unit tests and Playwright failed before the fix because the navbar used an invalid GitHub icon export and the resumed nav integration was incomplete. | Desktop nav now uses `NavigationMenu`, mobile `Sheet` remains intact, and GitHub is the only navbar external link. Targeted unit/E2E and full `npm run test` pass. | Import order, icon choice, and nav styling were cleaned up after the root-cause fix.                      |
| 2.3  | `tests/unit/localized-pages.test.tsx` initially failed while the home/nav split was still inconsistent.                                                        | Localized home foundations links render on `/en` and `/es`, and both unit plus targeted routing E2E checks pass.                                                   | `PageShell` usage was refactored to nested children so lint passes cleanly.                               |
| 3.1  | Same RED as 2.2/2.3: partial slice state failed localized page rendering before nav reconciliation.                                                            | Desktop/mobile/header/home states now share GitHub-only navbar external behavior with safe `target`/`rel` attributes.                                              | External-link affordances were simplified to lucide `GitBranchIcon` + `ExternalLinkIcon`.                 |
| 3.2  | Same RED as 2.1-2.3: partial integration failed until routing/client boundaries were reconciled.                                                               | `npm run lint`, `npm run typecheck`, `npm run test`, and `CI=1 npx playwright test tests/e2e/localized-routing.spec.ts --project=chromium --workers=1` all pass.   | Next.js 16 route usage stayed server-safe on the page and client-only in the navigation/switcher islands. |

## Verification Notes

- Port 3100 listener check passed before browser work; only transient `TIME_WAIT` entries appeared during retries.
- `npm run lint` ✅
- `npm run typecheck` ✅
- `npm run format:check` ✅
- `npm run test` ✅
- `CI=1 npx playwright test tests/e2e/mobile-navigation.spec.ts --project=chromium --workers=1` ✅
- `CI=1 npx playwright test tests/e2e/localized-routing.spec.ts --project=chromium --workers=1` ✅
- `npm run check` ✅

## Notes for Slice 2

- Motion tokens were intentionally left out of slice 1 to keep the review boundary focused on nav/home/test coherence after the incident audit.
- ADR and repo-doc updates remain intentionally unchecked so slice 2 can land docs/decision work separately.
- `npm run test:e2e` remains deferred because the incident follow-up explicitly required targeted Chromium checks instead of the full browser suite.
