# Tasks: Phase 2 Design Shell Navigation

## Review Workload Forecast

| Field                   | Value                                                          |
| ----------------------- | -------------------------------------------------------------- |
| Estimated changed lines | 520-760                                                        |
| 800-line budget risk    | Medium                                                         |
| 400-line budget risk    | High                                                           |
| Chained PRs recommended | Yes                                                            |
| Suggested split         | PR 1 shell UI + tests -> PR 2 motion + docs/ADR + verification |
| Delivery strategy       | force-chained                                                  |
| Chain strategy          | stacked-to-main                                                |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal                                                  | Likely PR | Notes                                                                         |
| ---- | ----------------------------------------------------- | --------- | ----------------------------------------------------------------------------- |
| 1    | Desktop/mobile nav and home foundations               | PR 1      | Include RED/GREEN unit + targeted E2E updates                                 |
| 2    | Motion tokens, ADR/docs alignment, final verification | PR 2      | Depends on PR 1; keep README/AGENTS/ADR and `npm run check` evidence together |

## Phase 1: Foundation / RED

- [x] 1.1 Create `tests/unit/theme-switcher.test.tsx` for dropdown labels, theme selection, and route-stable behavior.
- [x] 1.2 Create `tests/unit/language-switcher.test.tsx` for locale options and `router.replace` path/query/hash preservation.
- [x] 1.3 Create `tests/e2e/mobile-navigation.spec.ts` for mobile sheet open/close and GitHub/shadcn/Next.js href placement.

## Phase 2: Core Shell Implementation / GREEN

- [x] 2.1 Add `components/ui/navigation-menu.tsx` from shadcn base-rhea and verify the generated API matches Next.js `Link` composition.
- [x] 2.2 Refactor `components/base-navigation.tsx` desktop nav to `NavigationMenu`, keep `Sheet` mobile nav, and reduce navbar externals to GitHub only.
- [x] 2.3 Update `app/[locale]/page.tsx` and `messages/en.json`, `messages/es.json` with a localized home foundations section for shadcn and Next.js links.
- [x] 2.4 Add minimal shared motion tokens and reduced-motion guards in `app/globals.css` only.

## Phase 3: Integration / REFACTOR

- [x] 3.1 Reconcile nav labels, icon affordances, and safe external-link attributes across desktop/mobile/header/home states in `components/base-navigation.tsx`.
- [x] 3.2 Review client boundaries and localized routing assumptions so nav, theme, and language controls stay compatible with Next.js 16 patterns.

## Phase 4: Documentation / Decisions

- [x] 4.1 Create `docs/adr/0002-design-system-boundaries.md` for shadcn/base-rhea boundaries, Base UI `render`, lucide usage, motion limits, and MCP importance.
- [x] 4.2 Update `docs/adr/0001-i18n-and-routing.md`, `AGENTS.md`, and `README.md` to align ADR status and document repo-level `opencode.json` shadcn MCP enablement.

## Phase 5: Verification

- [x] 5.1 Run `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm run test`, targeted Chromium mobile-navigation E2E, `npm run doctor`, and `npm run check` per the approved apply gate.
- [x] 5.2 Capture verification notes against spec scenarios before `sdd-apply` is considered complete.
