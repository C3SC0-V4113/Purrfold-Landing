# Tasks: Phase 1 Localized Routing & SEO

## Review Workload Forecast

| Field                   | Value                                         |
| ----------------------- | --------------------------------------------- |
| Estimated changed lines | 650-850                                       |
| 800-line budget risk    | Medium                                        |
| Chained PRs recommended | Yes                                           |
| Suggested split         | PR 1 routing foundation → PR 2 SEO, E2E, docs |
| Delivery strategy       | ask-always                                    |
| Chain strategy          | pending                                       |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
800-line budget risk: Medium

### Suggested Work Units

| Unit | Goal                                                            | Likely PR | Notes                                                                                                  |
| ---- | --------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| 1    | Add `next-intl`, locale routing, localized pages, unit coverage | PR 1      | Keep ADR with the routing decision; commit seed `feat(i18n): add localized routing and SEO foundation` |
| 2    | Add metadata, sitemap, redirect E2E, and doc sync               | PR 2      | Depends on PR 1; finish with `npm run check` and `npm run test:e2e`                                    |

## Phase 1: Foundation / RED

- [x] 1.1 Update `package.json`, `next.config.ts`, and `tsconfig.json` for `next-intl`; create `i18n/routing.ts` and `i18n/request.ts` as the shared locale contract.
- [x] 1.2 Write failing helper tests in `tests/unit/i18n-routing.test.ts` for `en/es`, Phase 1 paths, preserved-path switching, alternates, and `/fr/install` → `/en/install` fallback.
- [x] 1.3 Write failing render tests in `tests/unit/localized-pages.test.tsx` for `/en` and `/es` navigation plus one placeholder page per locale.
- [x] 1.4 Create `docs/adr/0001-i18n-and-routing.md` as Proposed, documenting `next-intl`, prefixed routes, proxy ownership, and rejected alternatives.

## Phase 2: Routing / GREEN

- [x] 2.1 Create `proxy.ts` to negotiate `/` by `Accept-Language`, preserve unsupported-locale paths, and bypass assets, `robots.txt`, and `sitemap.xml`.
- [x] 2.2 Refactor `app/layout.tsx` and `app/page.tsx` so root stays a thin handoff and localized content moves under `app/[locale]/layout.tsx` and `app/[locale]/page.tsx`.
- [x] 2.3 Add `app/[locale]/install/page.tsx`, `skills/page.tsx`, `quality/page.tsx`, and `ecosystem/page.tsx` with minimal localized title, description, and CTA/context.
- [x] 2.4 Add `messages/en.json` and `messages/es.json`, plus a path-preserving locale switch and base nav links including GitHub, shadcn, and Next.js.

## Phase 3: SEO / Integration

- [x] 3.1 Add shared metadata builders in `app/[locale]/layout.tsx` and route pages so EN/ES titles, descriptions, canonical URLs, and hreflang alternates come from `i18n/routing.ts`.
- [x] 3.2 Create `app/sitemap.ts` from the same route source and add unit coverage in `tests/unit/sitemap.test.ts` for both homes and all localized deep routes.
- [x] 3.3 Add `tests/e2e/localized-routing.spec.ts` for `/en`, `/es`, root redirects, deep-route switching, and stable role-based navigation assertions.

## Phase 4: Verification / Docs / Review

- [x] 4.1 Update `README.md` with localized route purpose, i18n/ADR references, and verification commands including `npm run check` and `npm run test:e2e`.
- [x] 4.2 Update `DESIGN.md` and `AGENTS.md` with Phase 1 routing, sober Spanish-content constraints, `proxy.ts`/async-params reminders, and agent verification expectations.
- [x] 4.3 Run `npm run check` and `npm run test:e2e`; fix regressions until localized routing, metadata, and redirects pass.
- [ ] 4.4 Do a fresh review of the full diff before commit/PR, confirm work-unit split, and only then prepare the Phase 1 commit/PR(s).
