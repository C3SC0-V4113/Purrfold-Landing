# Apply Progress: Phase 1 Localized Routing & SEO

## Status

- Change: `phase-1-localized-routing-seo`
- Mode: Strict TDD
- Delivery mode: single PR (`size:exception` approved)
- Progress: 14 / 15 tasks complete
- Remaining task: `4.4` fresh diff review and PR preparation

## Completed Tasks

- [x] 1.1 Update `package.json`, `next.config.ts`, and `tsconfig.json` for `next-intl`; create `i18n/routing.ts` and `i18n/request.ts` as the shared locale contract.
- [x] 1.2 Write failing helper tests in `tests/unit/i18n-routing.test.ts` for `en/es`, Phase 1 paths, preserved-path switching, alternates, and `/fr/install` → `/en/install` fallback.
- [x] 1.3 Write failing render tests in `tests/unit/localized-pages.test.tsx` for `/en` and `/es` navigation plus one placeholder page per locale.
- [x] 1.4 Create `docs/adr/0001-i18n-and-routing.md` as Proposed, documenting `next-intl`, prefixed routes, proxy ownership, and rejected alternatives.
- [x] 2.1 Create `proxy.ts` to negotiate `/` by `Accept-Language`, preserve unsupported-locale paths, and bypass assets, `robots.txt`, and `sitemap.xml`.
- [x] 2.2 Refactor `app/layout.tsx` and `app/page.tsx` so root stays a thin handoff and localized content moves under `app/[locale]/layout.tsx` and `app/[locale]/page.tsx`.
- [x] 2.3 Add `app/[locale]/install/page.tsx`, `skills/page.tsx`, `quality/page.tsx`, and `ecosystem/page.tsx` with minimal localized title, description, and CTA/context.
- [x] 2.4 Add `messages/en.json` and `messages/es.json`, plus a path-preserving locale switch and base nav links including GitHub, shadcn, and Next.js.
- [x] 3.1 Add shared metadata builders in `app/[locale]/layout.tsx` and route pages so EN/ES titles, descriptions, canonical URLs, and hreflang alternates come from `i18n/routing.ts`.
- [x] 3.2 Create `app/sitemap.ts` from the same route source and add unit coverage in `tests/unit/sitemap.test.ts` for both homes and all localized deep routes.
- [x] 3.3 Add `tests/e2e/localized-routing.spec.ts` for `/en`, `/es`, root redirects, deep-route switching, and stable role-based navigation assertions.
- [x] 4.1 Update `README.md` with localized route purpose, i18n/ADR references, and verification commands including `npm run check` and `npm run test:e2e`.
- [x] 4.2 Update `DESIGN.md` and `AGENTS.md` with Phase 1 routing, sober Spanish-content constraints, `proxy.ts`/async-params reminders, and agent verification expectations.
- [x] 4.3 Run `npm run check` and `npm run test:e2e`; fix regressions until localized routing, metadata, and redirects pass.

## Verification

- Fresh blocker-fix verification on 2026-06-14:
  - `npm run format:check` ✅
  - `npm run lint` ✅
  - `npm run typecheck` ✅
  - `npm run test` ✅
  - `npm run check` ✅
  - `CI=1 npx playwright test tests/e2e/localized-routing.spec.ts --project=chromium --workers=1` ✅
  - `npm run test:e2e` ✅

## TDD Cycle Evidence

| Task | RED                                                                                                                   | GREEN                                                                    | REFACTOR                                                                      | Result |
| ---- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------ |
| 1.1  | No red-first evidence captured in this recovery session                                                               | Shared routing contract verified by lint/type/tests                      | Formatting and import cleanup applied                                         | FAILED |
| 1.2  | Existing helper tests were inherited from earlier work, not written red-first in this session                         | `npm run test` passed helper coverage                                    | Formatting cleanup only                                                       | FAILED |
| 1.3  | Updated `home` and localized page tests failed before fixes (`redirect` expectation, `PageProps`, root layout locale) | Targeted unit tests and `npm run test` passed                            | Simplified test helpers and query usage                                       | PASS   |
| 1.4  | Documentation task, no red-first executable test                                                                      | ADR present and reviewed                                                 | Prettier normalization applied                                                | FAILED |
| 2.1  | Existing proxy behavior was already implemented before recovery                                                       | Unit + E2E redirect coverage passed                                      | No functional refactor beyond verification-safe cleanup                       | FAILED |
| 2.2  | Root layout locale test failed before `lang` fix                                                                      | Root layout and redirect tests passed after async locale resolution      | Import/order + formatting cleanup                                             | PASS   |
| 2.3  | Placeholder pages existed before recovery                                                                             | Unit and E2E navigation/route coverage passed                            | Prettier normalization applied                                                | FAILED |
| 2.4  | Existing locale switch/navigation implementation inherited from partial work                                          | Unit and E2E switching coverage passed                                   | Removed `usePathname` rerender warning and stabilized request message loading | FAILED |
| 3.1  | Metadata builder existed before recovery                                                                              | `npm run test` passed sitemap/metadata-adjacent coverage                 | Formatting cleanup only                                                       | FAILED |
| 3.2  | Sitemap implementation existed before recovery                                                                        | Sitemap unit tests passed                                                | Formatting cleanup only                                                       | FAILED |
| 3.3  | Localized routing E2E initially failed on root negotiation harness and strict role matching                           | Targeted Chromium E2E and full cross-browser E2E passed after test fixes | Switched root negotiation assertions to request-level checks for stability    | PASS   |
| 4.1  | Documentation task, no red-first executable test                                                                      | README updated and format-checked                                        | Prettier normalization applied                                                | FAILED |
| 4.2  | Documentation task, no red-first executable test                                                                      | DESIGN + AGENTS updated and format-checked                               | Prettier normalization applied                                                | FAILED |
| 4.3  | Verification surfaced lint/type/E2E/format blockers during recovery                                                   | All required commands now pass                                           | Playwright server config hardened to avoid port reuse hangs                   | PASS   |

## Files Changed in Recovery

- `app/layout.tsx`
- `app/page.tsx`
- `components/language-switcher.tsx`
- `i18n/request.ts`
- `messages/en.d.json.ts`
- `opencode.json`
- `playwright.config.ts`
- `tests/unit/home.test.tsx`
- `tests/unit/localized-pages.test.tsx`
- `tests/unit/root-layout.test.tsx`
- `tests/e2e/localized-routing.spec.ts`
- `README.md`
- `DESIGN.md`
- `AGENTS.md`
- `openspec/config.yaml`
- `openspec/changes/phase-1-localized-routing-seo/tasks.md`

## Deviations

- None in product behavior.
- TDD evidence is partially failed because this session resumed an interrupted implementation and several completed tasks predated the recovery cycle.

## Remaining Work

- [ ] 4.4 Do a fresh review of the full diff before commit/PR, confirm work-unit split, and only then prepare the Phase 1 commit/PR(s).
